import { useState } from "react";
import {
  Button,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

import { toast } from "sonner";
import { useGetUserBookingQuery } from "@/redux/features/user/booking.api";
import useImageUpload from "@/hooks/useImageUpload";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/user.api";
import { TBooking, TResponse, TUser } from "@/tyeps";
import Loading from "@/components/share/Loading";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomImageFile from "@/components/form/CustomImageFile";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import UserProfile from "@/components/share/UserProfile";

const { Text } = Typography;

const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F"];

const UserDashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: userBookingData,
    isFetching,
    isError,
  } = useGetUserBookingQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const { uploadImage, isUploading } = useImageUpload();
  const { data: userInfo, isLoading: userInfoUpdating } =
    useGetUserQuery(undefined);

  const userData: TUser = userInfo?.data;

  const bookings: TBooking[] = userBookingData?.data || [];

  // pieChart info
  const bookingMetrics = {
    confirmed: bookings.filter(
      (b) => b.bookingConfirm && !b.canceledBooking && !b.paymentStatus
    ).length,
    canceled: bookings.filter((b) => b.canceledBooking).length,
    pending: bookings.filter((b) => !b.canceledBooking && !b.bookingConfirm)
      .length,
    completed: bookings.filter((b) => b.paymentStatus).length,
  };
  const pieData = [
    { name: "Confirmed", value: bookingMetrics.confirmed },
    { name: "Canceled", value: bookingMetrics.canceled },
    { name: "pending", value: bookingMetrics.pending },
    { name: "Completed", value: bookingMetrics.completed },
  ];

  const returnedCars =
    bookings?.filter((booking: TBooking) => booking.paymentStatus) || [];

  const defaultValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    userImage: userData?.userImage || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating user information...");
    try {
      let imageUrl = userData.userImage as string | null;
      if (data.userImage) {
        imageUrl = await uploadImage(data.userImage);
        if (!imageUrl) {
          toast.error("Image upload failed", { id: toastId, duration: 2000 });
          return;
        }
      }

      const updatedUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        userImage: imageUrl,
      };

      const res = (await updateUser({
        userId: userData._id,
        data: updatedUser,
      })) as TResponse<TUser>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("User information updated successfully!", {
          id: toastId,
          duration: 2000,
        });
        setIsModalVisible(false);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const columns: TableColumnsType<TBooking> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: TBooking) => (
        <div className="flex items-center justify-start">
          <img
            className="w-20 h-16 object-cover rounded"
            src={record.car?.carImage}
            alt={record.car?.name}
          />
        </div>
      ),
    },
    {
      title: "Car",
      dataIndex: ["car", "name"],
      key: "car",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (totalCost) => `$${totalCost.toFixed(2)}`,
    },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen dark:bg-[#1a1919]">
      <div className="flex justify-between items-center mb-4">
        <Text className="text-xl font-bold dark:text-white">
          User Dashboard
        </Text>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Edit Profile
        </Button>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-evenly">
        <div>
          {bookings.length > 0 && (
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>

        <UserProfile userData={userData} />
      </div>

      {isFetching ? (
        <Loading />
      ) : bookings.length === 0 ? (
        <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
          <p>----No Booking Data----</p>
        </div>
      ) : isError ? (
        <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
          <p>Error loading user data</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <Table
              columns={columns}
              dataSource={returnedCars}
              rowKey={(record) => record._id}
              pagination={false}
              scroll={{ x: 800 }}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                className="dark:bg-white"
                current={page}
                onChange={(value) => setPage(value)}
                pageSize={userBookingData?.meta?.limit}
                total={userBookingData?.meta?.total}
              />
            </div>
          </div>
        </>
      )}

      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <CustomInput
            type="text"
            name="name"
            placeholderText="Name"
            label="Name"
          />
          <CustomInput
            type="email"
            name="email"
            placeholderText="Email"
            label="Email"
          />
          <CustomInput
            type="text"
            name="phone"
            placeholderText="Phone"
            label="Phone"
          />
          <CustomInput
            type="text"
            name="address"
            placeholderText="Address"
            label="Address"
          />
          <CustomImageFile name="userImage" label="Upload Profile Picture" />
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isUploading || userInfoUpdating}
          >
            Update Profile
          </Button>
        </CustomForm>
      </Modal>
    </div>
  );
};

export default UserDashboard;
