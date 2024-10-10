import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type TSearchFormData = {
  location: string;
  startDate: string;
  endDate: string;
};

const Hero = () => {
  const [today, setToday] = useState<string>("");
  const [minEndDate, setMinEndDate] = useState<string>("");

  // components for react hook form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TSearchFormData>();

  // initialize today and minimum 4 days end date
  useEffect(() => {
    const todayDate = new Date();
    const todayString = todayDate.toISOString().split("T")[0];
    setToday(todayString);

    todayDate.setDate(todayDate.getDate() + 4);
    const endDateString = todayDate.toISOString().split("T")[0];
    setMinEndDate(endDateString);

    setValue("startDate", todayString);
    setValue("endDate", endDateString);
  }, [setValue]);

  const startDate = watch("startDate", today);

  useEffect(() => {
    if (startDate) {
      const fourDaysLater = new Date(startDate);
      fourDaysLater.setDate(fourDaysLater.getDate() + 4);
      const minEndDateString = fourDaysLater.toISOString().split("T")[0];
      setMinEndDate(minEndDateString);

      const endDate = watch("endDate");
      if (endDate && endDate < minEndDateString) {
        setValue("endDate", minEndDateString);
      }
    }
  }, [startDate, setValue, watch]);

  // form submission for react hook form
  const onSubmit: SubmitHandler<TSearchFormData> = (data) => {
    console.log(data);
  };

  return (
    <section
      className="relative bg-cover bg-center md:h-screen"
      style={{
        backgroundImage:
          "url('https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mt-3 md:mt-0 mb-4 md:mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8">
          Find the best cars for your journey and book now!
        </p>

        {/* form for searching car */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row justify-between items-center bg-white bg-opacity-20 h-fit md:bg-opacity-90 p-4 md:p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-4 w-full md:w-fit md:max-w-4xl mb-2 md:mb-0 text-black"
        >
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            placeholder="Enter the location"
            className="p-3 rounded-lg w-full md:w-auto"
          />
          {errors.location && (
            <span className="text-red-500">{errors.location.message}</span>
          )}

          <input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            defaultValue={today}
            min={today}
            className="p-3 rounded-lg w-full md:w-auto"
          />
          {errors.startDate && (
            <span className="text-red-500">{errors.startDate.message}</span>
          )}

          <input
            type="date"
            {...register("endDate", { required: "End date is required" })}
            defaultValue={minEndDate}
            min={minEndDate}
            className="p-3 rounded-lg w-full md:w-auto"
          />
          {errors.endDate && (
            <span className="text-red-500">{errors.endDate.message}</span>
          )}

          <button
            type="submit"
            className="px-6 py-3 bg-[#079b62] dark:bg-black text-white rounded-lg hover:bg-[#18ac73] md:w-auto"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
