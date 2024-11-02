import CustomDate from "@/components/form/CustomDate";
import CustomForm from "@/components/form/CustomForm";
import CustomTime from "@/components/form/CustomTime";
import Loading from "@/components/share/Loading";

import { useReturnCarMutation } from "@/redux/features/admin/carApi";
import { useGetBookingsQuery } from "@/redux/features/user/booking.api";
import { TBooking, TResponse } from "@/tyeps";
import { Button, Col, DatePicker, Modal, Typography } from "antd";
import Table from "antd/es/table";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const { Text } = Typography;

const AllReturnCars = () => {
  const [searchDate, setSearchDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [bookingDate, setBookingDate] = useState<string | null>(null);

  const [returnCar, { isLoading }] = useReturnCarMutation();
  const {
    data: bookingData,
    isFetching,
    isError,
  } = useGetBookingsQuery(
    searchDate ? [{ name: "date", value: searchDate }] : undefined
  );

  const bookings = bookingData?.data as TBooking[] | undefined;
  const returnedCars = bookings?.filter(
    (booking: TBooking) => booking.bookingConfirm
  ) as TBooking[];

  const sortedBookings = returnedCars
    ? [...returnedCars].sort((a, b) => {
        if (!a.endTime) return -1;
        if (!b.endTime) return 1;
        return 0;
      })
    : [];

  const handleReturnCar: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedBookingId) return;

    const endTime = data.endTime.format("HH:mm");

    const toastId = toast.loading("Processing return...");

    try {
      const res = (await returnCar({
        bookingId: selectedBookingId,
        endDate: data.endDate,
        endTime: endTime,
      })) as TResponse<TBooking>;

      console.log(res);

      if (res?.error) {
        return toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Car returned successfully!", { id: toastId });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

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
      render: (_: any, record: TBooking) => (
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
      render: (_: any, record: TBooking) => (
        <>
          <Text>{record.startDate}</Text>
          <br />
          <Text type="secondary">{record.startTime}</Text>
        </>
      ),
    },
    {
      title: "Expected Return",
      dataIndex: "expectedReturn",
      key: "expectedReturn",
      render: (_: any, record: TBooking) => (
        <>
          <Text>{record.expectedEndDate}</Text>
          <br />
          <Text type="secondary">{record.expectedEndTime}</Text>
        </>
      ),
    },
    {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
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
      title: "Return Status",
      key: "returnStatus",
      render: (_: any, record: TBooking) =>
        record.endTime ? (
          <Text type="success">Returned</Text>
        ) : (
          <Button
            onClick={() => {
              setBookingDate(record.startDate);
              setSelectedBookingId(record._id);
              setIsModalOpen(true);
            }}
            type="primary"
            size="small"
          >
            Mark as Returned
          </Button>
        ),
    },
  ];

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <Text className="text-xl font-bold dark:text-white">Returned Cars</Text>

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
      ) : isError || returnedCars?.length === 0 ? (
        <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
          <p>No returned cars found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <Table
            columns={columns.map((col) => ({ ...col, maxWidth: 150 }))}
            dataSource={sortedBookings}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </div>
      )}

      <Modal
        title="Return Car"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CustomForm onSubmit={handleReturnCar}>
          <CustomDate
            name="endDate"
            label="Drop-Off Date"
            placeholderText="Select return date"
            minDate={moment().format(bookingDate!)}
            rules={{ required: "Return date is required" }}
          />
          <CustomTime
            name="endTime"
            label="Drop-Off Time"
            placeholderText="Select return time"
            rules={{ required: "Return time is required" }}
          />
          <Button
            disabled={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full mt-4"
          >
            {isLoading ? "Confirming Return" : "Confirm Return"}
          </Button>
        </CustomForm>
      </Modal>
    </div>
  );
};

export default AllReturnCars;
