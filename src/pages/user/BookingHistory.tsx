import CustomForm from "@/components/form/CustomForm";
import CustomTextArea from "@/components/form/CustomTextArea";
import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import { useAddReviewMutation } from "@/redux/features/review/review.api";
import {
  useBookingPaymentMutation,
  useCancelBookingMutation,
  useGetUserBookingQuery,
} from "@/redux/features/user/booking.api";
import { TBooking, TResponse } from "@/tyeps";
import { Form, Modal, Pagination, Rate } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import ReturnedCar from "./ReturnedCar";
import PendingCanceled from "./PendingCanceled";

const BookingHistory = () => {
  const [cancelBooking] = useCancelBookingMutation();
  const [page, setPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const pageSize = 5;
  const [bookingPayment] = useBookingPaymentMutation();
  // Determine cars to display based on the current page

  const {
    data: userBooking,
    isFetching,
    isError,
  } = useGetUserBookingQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const bookings = userBooking?.data as TBooking[] | undefined;

  const sortedPendingPayments = useMemo(() => {
    const pendingPayments =
      bookings?.filter((booking) => !booking.paymentStatus) || [];
    return [...pendingPayments].sort((a, b) => {
      if (!a.canceledBooking) return -1;
      if (!b.canceledBooking) return 1;
      return 0;
    });
  }, [bookings]);

  const paginatedPendingPayments = useMemo(() => {
    const startIndex = (pendingPage - 1) * pageSize;
    const endIndex = pendingPage * pageSize;
    return sortedPendingPayments.slice(startIndex, endIndex);
  }, [sortedPendingPayments, pendingPage, pageSize]);

  const sortedReturnedCars = useMemo(() => {
    const returnedCars =
      bookings?.filter((booking) => booking.paymentStatus) || [];
    return [...returnedCars].sort((a, b) => {
      if (!a.reviewStatus) return -1;
      if (!b.reviewStatus) return 1;
      return 0;
    });
  }, [bookings]);

  const paginatedReturnCars = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return sortedReturnedCars.slice(startIndex, endIndex);
  }, [sortedReturnedCars, page, pageSize]);

  // reset pages when bookings change
  useEffect(() => {
    setPage(1);
    setPendingPage(1);
  }, [bookings]);

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

  const handleBookingPayment = async (id: string) => {
    const toastId = toast.loading("Payment processing....");

    try {
      const res = (await bookingPayment(id)) as TResponse<any>;

      console.log(res);

      if (res?.error) {
        return toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }

      window.location.href = res?.data?.data?.payment_url;

      // toast.success("Payment successfully paid.", {
      //   id: toastId,
      //   duration: 2000,
      // });
    } catch (error) {
      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  const handleSubmitReview = async (data: any) => {
    if (!selectedBookingId) return;

    const toastId = toast.loading("Review saving....");

    const reviewInfo = {
      bookingId: selectedBookingId,
      ...data,
    };

    try {
      const res = (await addReview(reviewInfo)) as TResponse<any>;

      console.log(res);

      if (res?.error) {
        return toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }

      toast.success("Review save successfully.", {
        id: toastId,
        duration: 2000,
      });
      handleCloseModal();
    } catch (error) {
      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        {isFetching ? (
          <Loading />
        ) : bookings?.length === 0 || isError ? (
          <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
            <p>----- You haven't booked any car yet -----</p>
          </div>
        ) : (
          <div>
            {sortedReturnedCars.length > 0 && (
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-800 p-4">
                  Returned Cars
                </h2>
                <ReturnedCar
                  handleOpenModal={handleOpenModal}
                  returnedCars={paginatedReturnCars}
                  setSelectedBookingId={setSelectedBookingId}
                />
                <div className="flex justify-center py-2">
                  <Pagination
                    current={page}
                    onChange={(value) => setPage(value)}
                    pageSize={pageSize}
                    total={sortedReturnedCars?.length}
                    showSizeChanger={false}
                  />
                </div>
              </div>
            )}
            {sortedPendingPayments.length > 0 && (
              <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 p-4">
                  Pending Payments
                </h2>
                <PendingCanceled
                  handleBookingPayment={handleBookingPayment}
                  handleCancelBooking={handleCancelBooking}
                  sortedPendingPayments={paginatedPendingPayments}
                />
                <div className="flex justify-center py-2">
                  <Pagination
                    current={pendingPage}
                    onChange={(value) => setPendingPage(value)}
                    pageSize={pageSize}
                    total={sortedPendingPayments?.length}
                    showSizeChanger={false}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal
        title="Leave a Review"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <CustomForm onSubmit={handleSubmitReview}>
          <Form.Item label="Rating">
            <Controller
              name="rating"
              render={({ field }) => <Rate {...field} />}
            />
          </Form.Item>

          <div className="-mt-3">
            <CustomTextArea
              name="userReview"
              label="Your Review"
              placeholderText="review"
              maxRow={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-700"
            disabled={isLoading}
          >
            Submit Review
          </Button>
        </CustomForm>
      </Modal>
    </>
  );
};

export default BookingHistory;
