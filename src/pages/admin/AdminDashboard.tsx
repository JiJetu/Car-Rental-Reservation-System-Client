import Loading from "@/components/share/Loading";
import useImageUpload from "@/hooks/useImageUpload";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import {
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/user.api";
import { useGetBookingsQuery } from "@/redux/features/user/booking.api";
import { TBooking, TResponse, TUser } from "@/tyeps";
import {
  CarOutlined,
  CheckCircleOutlined,
  EditOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Typography } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import AdminModal from "./AdminModal";
import MetricsCard from "./MetricsCard";
import UserProfile from "@/components/share/UserProfile";

const { Text } = Typography;

const bookingColors = {
  Confirmed: "#4CAF50",
  Canceled: "#F44336",
  Pending: "#FF9800",
  Completed: "#2196F3",
};

const AdminDashboard = () => {
  // const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const { uploadImage, isUploading } = useImageUpload();
  const { data: userInfo, isLoading: userInfoUpdating } =
    useGetUserQuery(undefined);
  const {
    data: userBookingData,
    isFetching,
    isError: isFetchingError,
  } = useGetBookingsQuery(undefined);

  const {
    data: carsData,
    isLoading: carsLoading,
    isError: carsError,
  } = useGetAllCarsQuery([
    { name: "limit", value: 1000 },
    { name: "page", value: 1 },
  ]);
  const {
    data: allUsers,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsersQuery([
    { name: "limit", value: 1000 },
    { name: "page", value: 1 },
  ]);

  // Determine loading and error states
  const loading = carsLoading || usersLoading || userInfoUpdating || isFetching;
  const hasError = carsError || usersError || isFetchingError;

  // admin personal info
  const userData: TUser = userInfo?.data;

  const bookings = userBookingData?.data as TBooking[] | undefined;

  // Calculate booking metrics
  const totalBookings = bookings?.length || 0;
  const paidBookings = bookings?.filter((b) => b.paymentStatus).length || 0;
  const totalPaidCost =
    bookings
      ?.filter((b) => b.paymentStatus)
      .reduce((acc, b) => acc + b.totalCost, 0) || 0;

  // Calculate cars metrics
  const totalCars = carsData?.data?.length || 0;
  const availableCars =
    carsData?.data?.filter((car) => car.status === "available").length || 0;

  // Calculate user metrics
  const totalUsers = allUsers?.data?.length || 0;
  const totalAdmins =
    allUsers?.data?.filter((user) => user.role === "admin").length || 0;

  // pieChart info
  const bookingMetrics = {
    confirmed:
      bookings?.filter(
        (b) => b.bookingConfirm && !b.canceledBooking && !b.paymentStatus
      ).length || 0,
    canceled: bookings?.filter((b) => b.canceledBooking).length || 0,
    pending:
      bookings?.filter((b) => !b.canceledBooking && !b.bookingConfirm).length ||
      0,
    completed: bookings?.filter((b) => b.paymentStatus).length || 0,
  };

  const pieData = [
    {
      name: "Confirmed",
      value: bookingMetrics.confirmed,
      color: bookingColors.Confirmed,
    },
    {
      name: "Canceled",
      value: bookingMetrics.canceled,
      color: bookingColors.Canceled,
    },
    {
      name: "Pending",
      value: bookingMetrics.pending,
      color: bookingColors.Pending,
    },
    {
      name: "Completed",
      value: bookingMetrics.completed,
      color: bookingColors.Completed,
    },
  ];
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

  if (loading) {
    return <Loading />;
  }

  if (hasError) {
    return (
      <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:px-4 md:py-2 bg-gray-50 min-h-screen dark:bg-[#1a1919]">
      <div className="flex justify-between items-center mb-4">
        <Text className="text-xl font-bold dark:text-white">
          Admin Dashboard
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
      <div className="bg-white rounded-lg shadow-md mb-6 flex flex-col md:flex-row-reverse justify-evenly items-center">
        <PieChart width={250} height={250}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <UserProfile userData={userData} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricsCard
          title="Total Bookings"
          value={totalBookings}
          icon={<CheckCircleOutlined />}
        />
        <MetricsCard
          title="Paid Bookings"
          value={paidBookings}
          additionalText={`Total Revenue: $${totalPaidCost.toFixed(2)}`}
          icon={<MoneyCollectOutlined />}
        />
        <MetricsCard
          title="Total Cars"
          value={totalCars}
          icon={<CarOutlined />}
        />
        <MetricsCard
          title="Available Cars"
          value={availableCars}
          icon={<CarOutlined />}
        />
        <MetricsCard
          title="Total Users"
          value={totalUsers}
          icon={<UserOutlined />}
        />
        <MetricsCard
          title="Total Admins"
          value={totalAdmins}
          icon={<UserOutlined />}
        />
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <Text className="text-lg font-bold mb-5">Booking Status Overview</Text>
        <BarChart width={600} height={300} data={pieData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Use the color from each data entry */}
          <Bar dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </div>

      <AdminModal
        isModalVisible={isModalVisible}
        defaultValues={defaultValues}
        isUploading={isUploading}
        onSubmit={onSubmit}
        setIsModalVisible={setIsModalVisible}
        userInfoUpdating={userInfoUpdating}
      />
    </div>
  );
};

export default AdminDashboard;
