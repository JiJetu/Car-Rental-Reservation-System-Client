import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TCustomInputProps = {
  type: string;
  name: string;
  placeholderText?: string;
  label?: string;
};

const CustomInput = ({
  type,
  name,
  placeholderText,
  label,
}: TCustomInputProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label} validateStatus={error ? "error" : ""}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              placeholder={`Enter your ${placeholderText}`}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
