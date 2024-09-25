import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import CustomSwitch from "@/components/form/CustomSwitch";
import CustomTextArea from "@/components/form/CustomTextArea";
import { carColorOptions, featuresOptions } from "@/constant/manageCar";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";

const defaultValues = {
  name: "Tesla Model 3",
  description: "An electric car with advanced technology and performance.",
  color: "White",
  isElectric: true,
  features: ["AC", "Bluetooth", "Long Range Battery"],
  pricePerHour: 500,
};

const AddCar = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", marginBottom: "15px" }}
    >
      <Col span={12}>
        <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
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

          {/* multi-select for car features */}
          <CustomSelect
            label="Features"
            name="features"
            options={featuresOptions}
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
