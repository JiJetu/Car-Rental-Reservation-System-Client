import { Form, TimePicker, Typography } from "antd";
import { Controller } from "react-hook-form";
import moment from "moment";

const { Text } = Typography;

type TCustomTimeProps = {
  name: string;
  label?: string;
  placeholderText?: string;
  rules?: any;
};

const CustomTime = ({
  name,
  label,
  placeholderText,
  rules,
}: TCustomTimeProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
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
          <TimePicker
            className="w-full"
            {...field}
            id={name}
            size="large"
            placeholder={placeholderText}
            format="HH:mm"
            onChange={(time) => {
              field.onChange(
                time ? moment(time.format("HH:mm"), "HH:mm") : null
              );
            }}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomTime;
