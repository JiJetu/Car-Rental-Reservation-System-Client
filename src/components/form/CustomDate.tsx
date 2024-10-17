import { Form, Input, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

type TCustomDateProps = {
  name: string;
  label?: string;
  placeholderText?: string;
  minDate?: string;
  rules?: any;
};

const CustomDate = ({
  name,
  label,
  placeholderText,
  minDate,
  rules,
}: TCustomDateProps) => {
  return (
    <Controller
      name={name}
      rules={rules && rules}
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
            type="date"
            id={name}
            size="large"
            min={minDate}
            placeholder={`Enter your ${placeholderText}`}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomDate;
