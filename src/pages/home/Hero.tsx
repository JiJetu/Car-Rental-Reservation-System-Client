import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomForm from "@/components/form/CustomForm";
import CustomSelect from "@/components/form/CustomSelect";
import { carLocationOptions } from "@/constant/manageCar";
import { Button } from "@/components/ui/button";
import CustomDate from "@/components/form/CustomDate";
import { Col, Row } from "antd";
import bgImage from "../../assets/images/1-19.jpg";

const Hero = () => {
  const [today, setToday] = useState<string>("");
  const [minEndDate, setMinEndDate] = useState<string>("");

  // Initialize today and minimum 4 days end date
  useEffect(() => {
    const todayDate = new Date();
    const todayString = todayDate.toISOString().split("T")[0];
    setToday(todayString);

    todayDate.setDate(todayDate.getDate() + 4);
    const endDateString = todayDate.toISOString().split("T")[0];
    setMinEndDate(endDateString);
  }, []);

  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <section
      className="relative bg-cover bg-center md:h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
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

        <div className="bg-white bg-opacity-20 h-fit md:bg-opacity-90 p-4 md:p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 w-full md:w-[700px] md:max-w-screen mb-2 md:mb-0 text-black">
          {/* Form for searching car */}
          <CustomForm onSubmit={onSubmit}>
            <Row
              gutter={8}
              justify="center"
              align="middle"
              style={{
                width: "100%",
              }}
            >
              <Col span={24} md={{ span: 7 }} className="md:-mb-6 w-full">
                <CustomSelect
                  placeholder="Location"
                  name="location"
                  options={carLocationOptions}
                  rules={{ required: "Location is required" }}
                />
              </Col>

              <Col span={24} md={{ span: 6 }} className="md:-mb-6 w-full">
                <CustomDate
                  name="startDate"
                  placeholderText={today}
                  minDate={today}
                  rules={{ required: "Start date is required" }}
                />
              </Col>

              <Col span={24} md={{ span: 6 }} className="md:-mb-6 w-full">
                <CustomDate
                  name="endDate"
                  placeholderText={minEndDate}
                  minDate={minEndDate}
                  rules={{ required: "End date is required" }}
                />
              </Col>

              <Col span={10} md={{ span: 5 }}>
                <Button
                  type="submit"
                  className="w-full px-6 py-7 bg-[#079b62] dark:bg-black text-white rounded-lg hover:bg-[#18ac73]"
                >
                  Book Now
                </Button>
              </Col>
            </Row>
          </CustomForm>
        </div>
      </div>
    </section>
  );
};

export default Hero;
