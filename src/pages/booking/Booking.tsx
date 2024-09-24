import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const Booking = () => {
  const defaultValues = {
    email: "johndoe@example.com",
    password: "password123",
  };

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    const code = data?.name;
    const name = nameOptions[Number(code) - 1]?.label;

    const somethingData = {
      name,
      code,
    };
    console.log(somethingData);
  };

  return (
    // <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
    //   <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
    //     <CustomInput
    //       type={"text"}
    //       name={"email"}
    //       placeholderText={"email address"}
    //       label={"Email"}
    //     />
    //     <CustomInput
    //       type={"password"}
    //       name={"password"}
    //       placeholderText={"password"}
    //       label={"Password"}
    //     />
    //     <Button htmlType="submit">Submit</Button>
    //   </CustomForm>
    // </Row>
    <Flex justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Col span={6}>
        <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
          {/* <CustomInput
            type={"text"}
            name={"email"}
            placeholderText={"email address"}
            label={"Email"}
          />
          <CustomInput
            type={"password"}
            name={"password"}
            placeholderText={"password"}
            label={"Password"}
          /> */}
          <CustomSelect label={"Name"} name={"name"} options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default Booking;
