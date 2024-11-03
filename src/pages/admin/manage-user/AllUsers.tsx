import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import { userRole } from "@/constant/role";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/user.api";
import { TResponse, TUser } from "@/tyeps";
import { Pagination } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const {
    data: allUsers,
    isFetching,
    isError,
  } = useGetAllUsersQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
  ]);
  const [updateUser] = useUpdateUserMutation();

  const users = allUsers?.data || [];
  const metaData = allUsers?.meta;

  const handleMakeAdmin = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be promoted to admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating user role...");

        try {
          const res = (await updateUser({
            userId,
            data: { role: userRole.ADMIN },
          })) as TResponse<TUser>;

          if (res?.error) {
            return toast.error(res?.error?.data?.message, {
              id: toastId,
              duration: 2000,
            });
          }

          toast.success("User role updated to admin!", {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("Failed to update role", { id: toastId, duration: 2000 });
        }
      }
    });
  };

  const handleBlockUser = async (userId: string, isBlocked: boolean) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${!isBlocked ? "Block" : "Active"} this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${!isBlocked ? "Block" : "Active"} user!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading(
          `${!isBlocked ? "Blocking" : "Activating"} user...`
        );

        try {
          const res = (await updateUser({
            userId,
            data: { isBlocked: !isBlocked },
          })) as TResponse<TUser>;

          if (res?.error) {
            return toast.error(res?.error?.data?.message, {
              id: toastId,
              duration: 2000,
            });
          }
          toast.success(`User is ${!isBlocked ? "Blocked" : "Activated"}!`, {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("Failed to update role", { id: toastId, duration: 2000 });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen dark:bg-[#1a1919]">
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
          <p>Error loading users</p>
        </div>
      ) : users?.length === 0 ? (
        <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
          <p>----No user register yet----</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table-auto w-full">
            <thead className="bg-gray-200 text-gray-700 font-semibold uppercase text-sm">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: TUser, index: number) => (
                <tr
                  key={user?._id}
                  className="text-sm text-gray-700 border-b hover:bg-gray-100"
                >
                  <td className="p-4 ">{index + 1}</td>
                  <td className="p-4 flex items-center justify-start gap-3 ml-10">
                    <div className="avatar w-12 h-12 rounded-full overflow-hidden shadow">
                      <img
                        src={user?.userImage}
                        alt={user?.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user?.name}</p>
                      <p className="text-gray-500">{user?.address}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 text-center">
                    {user.email}
                  </td>
                  <td className="p-4">
                    {user?.role === userRole.ADMIN ? (
                      <p className="text-amber-600 font-semibold text-center">
                        Admin
                      </p>
                    ) : (
                      <p className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-4 rounded-full shadow"
                        >
                          Make Admin
                        </Button>
                        <Button
                          onClick={() => {
                            handleBlockUser(user._id, user?.isBlocked);
                          }}
                          className={`${
                            !user?.isBlocked
                              ? "bg-red-500 hover:bg-red-700"
                              : "bg-purple-500 hover:bg-purple-700"
                          } text-white text-xs py-1 px-4 rounded-full shadow`}
                        >
                          {!user?.isBlocked ? "Block User" : "Activate User"}
                        </Button>
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-end mt-4 p-4 dark:bg-white">
            <Pagination
              current={page}
              onChange={(value) => setPage(value)}
              pageSize={metaData?.limit}
              total={metaData?.total}
              showSizeChanger={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
