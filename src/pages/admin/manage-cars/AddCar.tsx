import CustomForm from "@/components/form/CustomForm";
import CustomImageFile from "@/components/form/CustomImageFile";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  name: "Tesla Model 3",
  shortDescription: "An electric car with advanced technology and performance.",
  description:
    "The Tesla Model 3 is a cutting-edge electric vehicle that represents the pinnacle of automotive technology and performance. With its sleek and modern design, the Model 3 captivates attention on the road while providing an eco-friendly alternative to traditional gasoline-powered cars. Its electric powertrain delivers exhilarating acceleration, allowing drivers to experience a thrilling ride without compromising on sustainability. Inside, the Tesla Model 3 boasts a spacious and minimalist interior, equipped with high-quality materials and advanced technology. The large touchscreen display serves as the control center for all vehicle functions, seamlessly integrating navigation, entertainment, and climate control. With features like Bluetooth connectivity and a premium sound system, passengers can enjoy a comfortable and connected experience.",
  color: "White",
  type: "Hybrid",
  isElectric: true,
  features: ["AC", "Bluetooth", "Long Range Battery"],
  pricePerHour: 500,
};

const AddCar = () => {
  const [addCar] = useAddCarMutation();

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");

    try {
      const formData = new FormData();
      formData.append("image", data.carImage as any);

      const imgRef = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgData = await imgRef.json();
      if (!imgData.success) {
        toast.error("Image upload failed", { id: toastId, duration: 2000 });
        return;
      }

      // image URL
      const imageUrl = imgData.data.url;

      console.log({ imageUrl });

      const carInfo = {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        color: data.color,
        type: data.type,
        status: CarStatus.available,
        isElectric: data.isElectric,
        features: data.features,
        pricePerHour: Number(data.pricePerHour),
        carImage: imageUrl,
      };

      // add car to the database
      const res = (await addCar(carInfo)) as TResponse<TCar>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      }

      toast.success("Car added successfully!", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", marginBottom: "15px" }}
    >
      <Col span={24} md={{ span: 12 }}>
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

          {/* car short description */}
          <CustomTextArea
            name="shortDescription"
            placeholderText="Car Short Description"
            label="Car Short Description"
          />

          {/* car description */}
          <CustomTextArea
            name="description"
            placeholderText="Car Description"
            label="Car Description"
            maxRow={4}
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

          <CustomImageFile name="carImage" label="Upload Car Image" />

          <Button htmlType="submit" type="primary" block>
            Add Car
          </Button>
        </CustomForm>
      </Col>
    </Row>
  );
};

export default AddCar;
