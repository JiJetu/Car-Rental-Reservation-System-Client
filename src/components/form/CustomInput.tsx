import { Form, Input, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

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
          <Form.Item
            label={
              label && (
                <Text strong className="dark:text-white">
                  {label}
                </Text>
              )
            }
            validateStatus={error ? "error" : ""}
          >
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              placeholder={placeholderText && `Enter with ${placeholderText}`}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
