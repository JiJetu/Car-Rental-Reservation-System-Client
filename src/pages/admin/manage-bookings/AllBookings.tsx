import { useState } from "react";
import { Button, Table, DatePicker, Typography, Col } from "antd";
import { MdCancel } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import Loading from "@/components/share/Loading";
import {
  useApproveBookingMutation,
  useCancelBookingMutation,
  useGetBookingsQuery,
} from "@/redux/features/user/booking.api";
import { TBooking, TResponse } from "@/tyeps";
import { toast } from "sonner";
import { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";

const { Text } = Typography;

const AllBookings = () => {
  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [approveBooking] = useApproveBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();

  // const {
  //   data: userBooking,
  //   isFetching,
  //   isError,
  // } = useGetBookingsQuery(
  //   searchDate
  //     ? [
  //         { name: "date", value: searchDate },
  //         { name: "bookingConfirm", value: false },
  //         { name: "canceledBooking", value: false },
  //       ]
  //     : [
  //         { name: "bookingConfirm", value: false },
  //         { name: "canceledBooking", value: false },
  //         { name: "bookingConfirm", value: true },
  //         { name: "canceledBooking", value: true },
  //       ]
  // );

  const {
    data: userBooking,
    isFetching,
    isError,
  } = useGetBookingsQuery(
    searchDate ? [{ name: "date", value: searchDate }] : undefined
  );

  const bookings = userBooking?.data as TBooking[] | undefined;

  // Sort bookings to display unapproved and uncanceled bookings first
  const sortedBookings = bookings
    ? [...bookings].sort((a, b) => {
        if (!a.canceledBooking && !a.bookingConfirm) return -1;
        if (!b.canceledBooking && !b.bookingConfirm) return 1;
        return 0;
      })
    : [];

  const handleApproveBooking = async (bookingId: string) => {
    const toastId = toast.loading("Booking approving....");

    try {
      const res = (await approveBooking({ bookingId })) as TResponse<TBooking>;

      console.log(res);

      if (res?.error) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }

      toast.success("Booking approved successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  const handleCancelBooking = async (bookingId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel booking!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Canceling booking....");

        try {
          const res = (await cancelBooking(bookingId)) as TResponse<TBooking>;

          if (res?.error) {
            return toast.error(res?.error?.data?.message, {
              id: toastId,
              duration: 2000,
            });
          }

          toast.success("Booking cancel successfully!", {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("something went wrong", { id: toastId, duration: 2000 });
        }
      }
    });
  };

  const columns: ColumnsType<TBooking> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Car",
      dataIndex: "car",
      key: "car",
      render: (_: any, record: TBooking) => (
        <div className="flex items-center justify-start gap-3">
          <img
            className="w-12 h-12 object-cover rounded"
            src={record.car?.carImage}
            alt={record.car?.name}
          />
          <div>
            <Text strong>{record.car?.name}</Text>
            <br />
            <Text type="secondary">{record.car?.location}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "User Info.",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (_: any, record: TBooking) => (
        <>
          <Text>{record.user.name}</Text>
          <br />
          <Text type="secondary">{record.user.address}</Text>
        </>
      ),
    },
    {
      title: "Pick-Up",
      dataIndex: "pickUp",
      key: "pickUp",
      render: (_: any, record: TBooking) => (
        <>
          <Text>{record.startDate}</Text>
          <br />
          <Text type="secondary">{record.startTime}</Text>
        </>
      ),
    },
    {
      title: "Drop-Off",
      dataIndex: "dropOff",
      key: "dropOff",
      render: (_: any, record: TBooking) =>
        record.endTime ? (
          <>
            <Text>{record.endDate}</Text>
            <br />
            <Text type="secondary">{record.endTime}</Text>
          </>
        ) : (
          <Text type="warning">Updated after returning car</Text>
        ),
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (_: any, record: TBooking) =>
        record.endTime ? (
          <Text>${record.totalCost.toFixed(2)}</Text>
        ) : (
          <Text type="warning">Return car</Text>
        ),
    },
    {
      title: "Options",
      key: "options",
      render: (_: any, record: TBooking) => {
        return record.canceledBooking ? (
          <p className="text-red-500 font-semibold">Canceled</p>
        ) : record.bookingConfirm ? (
          <p className="text-green-600 font-semibold">Approved</p>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => handleApproveBooking(record._id)}
              icon={<FcApproval />}
              type="primary"
              size="small"
              className="bg-green-600 hover:bg-green-800"
            >
              Approve
            </Button>
            <Button
              onClick={() => handleCancelBooking(record._id)}
              icon={<MdCancel />}
              type="primary"
              danger
              size="small"
            >
              Cancel
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <Text className="text-xl font-bold dark:text-white">
          Bookings Confirm
        </Text>

        <Col md={{ span: 8 }}>
          <DatePicker
            onChange={(date) =>
              setSearchDate(date ? date.format("YYYY-MM-DD") : null)
            }
            placeholder="Search by Pick-Up Date"
            style={{ width: "100%" }}
          />
        </Col>
      </div>
      {isFetching ? (
        <Loading />
      ) : isError || bookings?.length === 0 ? (
        <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <Table
            columns={columns.map((col) => ({ ...col, maxWidth: 150 }))}
            dataSource={sortedBookings}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 4 }}
            scroll={{ x: 800 }}
          />
        </div>
      )}
    </div>
  );
};

export default AllBookings;
