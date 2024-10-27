import { useState } from "react";
import { Button, Table, DatePicker, Typography } from "antd";
import { MdCancel } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import Loading from "@/components/share/Loading";
import { useGetBookingsQuery } from "@/redux/features/user/booking.api";
import { TBooking } from "@/tyeps";

const { Text } = Typography;

const AllBookings: React.FC = () => {
  const [searchDate, setSearchDate] = useState<string | null>(null);

  const {
    data: userBooking,
    isFetching,
    isError,
  } = useGetBookingsQuery(
    searchDate ? [{ name: "date", value: searchDate }] : undefined
  );

  const bookings = userBooking?.data as TBooking[] | undefined;

  console.log(bookings);

  const columns = [
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
      render: (_, record: TBooking) => (
        <div className="flex items-center gap-3">
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
      title: "Pick-Up",
      dataIndex: "pickUp",
      key: "pickUp",
      render: (_, record: TBooking) => (
        <>
          <Text>{record.date}</Text>
          <br />
          <Text type="secondary">{record.startTime}</Text>
        </>
      ),
    },
    {
      title: "Drop-Off",
      dataIndex: "dropOff",
      key: "dropOff",
      render: (_, record: TBooking) =>
        record.endTime ? (
          <>
            <Text>{record.date}</Text>
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
      render: (_, record: TBooking) =>
        record.endTime ? (
          <Text>${record.totalCost.toFixed(2)}</Text>
        ) : (
          <Text type="warning">Return car</Text>
        ),
    },
    {
      title: "Options",
      key: "options",
      render: (_, record: TBooking) => (
        <div className="flex gap-2">
          <Button
            icon={<FcApproval />}
            type="primary"
            size="small"
            className="bg-green-600 hover:bg-green-800"
          >
            Approve
          </Button>
          <Button icon={<MdCancel />} type="primary" danger size="small">
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <Text className="text-xl font-bold">Bookings Confirm</Text>
        <DatePicker
          onChange={(date) =>
            setSearchDate(date ? date.format("YYYY-MM-DD") : null)
          }
          placeholder="Search by date"
        />
      </div>

      {isFetching ? (
        <Loading />
      ) : isError || bookings?.length === 0 ? (
        <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
          <p>No bookings found.</p>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={bookings}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
          className="overflow-x-auto"
        />
      )}
    </div>
  );
};

export default AllBookings;
