import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import CustomSwitch from "@/components/form/CustomSwitch";
import CustomTextArea from "@/components/form/CustomTextArea";
import {
  carColorOptions,
  carFeaturesOptions,
  carTypeOptions,
} from "@/constant/manageCar";
import { useAddCarMutation } from "@/redux/features/admin/carApi";
import { addCarSchema } from "@/schemas/addCarSchema";
import { CarStatus, TCar } from "@/tyeps";
import { TResponse } from "@/tyeps/global";
import { UploadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Upload } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  name: "Tesla Model 3",
  description: "An electric car with advanced technology and performance.",
  color: "White",
  type: "Hybrid",
  isElectric: true,
  features: ["AC", "Bluetooth", "Long Range Battery"],
  pricePerHour: 500,
};

const AddCar = () => {
  const [addCar] = useAddCarMutation();

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    console.log(data, data.type, data.color);
    const carInfo = {
      name: data.name,
      description: data.description,
      color: data.color,
      type: data.type,
      status: CarStatus.available,
      isElectric: data.isElectric,
      features: data.features,
      pricePerHour: Number(data.pricePerHour),
    };

    const tostId = toast.loading("Creating....");

    try {
      const res = (await addCar(carInfo)) as TResponse<TCar>;

      console.log(res);

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: tostId, duration: 2000 });
      } else {
        toast.success(res?.data?.message, { id: tostId, duration: 2000 });
      }
    } catch (error) {
      toast.error("something went wrong", { id: tostId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", marginBottom: "15px" }}
    >
      <Col span={12}>
        <CustomForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(addCarSchema)}
        >
          {/* car name */}
          <CustomInput
            type="text"
            name="name"
            placeholderText="Car Name"
            label="Car Name"
          />

          {/* car description */}
          <CustomTextArea
            name="description"
            placeholderText="Car Description"
            label="Car Description"
          />

          {/* car price perHour */}
          <CustomInput
            type="number"
            name="pricePerHour"
            placeholderText="Price per Hour"
            label="Price per Hour"
          />

          {/* car color */}
          <CustomSelect
            label="Car Color"
            name="color"
            options={carColorOptions}
          />

          {/* car types */}
          <CustomSelect
            label="Type of car"
            name="type"
            options={carTypeOptions}
          />

          {/* multi-select for car features */}
          <CustomSelect
            label="Features"
            name="features"
            options={carFeaturesOptions}
            multiple={true}
          />

          {/* isElectric toggle */}
          <CustomSwitch
            label="Is Electric?"
            name="isElectric"
            defaultChecked={true}
          />

          {/* image upload */}
          <div style={{ marginBottom: "15px" }}>
            <Upload name="carImage" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Car Image</Button>
            </Upload>
          </div>

          <Button htmlType="submit" type="primary" block>
            Add Car
          </Button>
        </CustomForm>
      </Col>
    </Row>
  );
};

export default AddCar;
