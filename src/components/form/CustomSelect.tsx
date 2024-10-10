import { Form, Select, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

type TCustomSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  multiple?: boolean;
};

const CustomSelect = ({
  label,
  name,
  options,
  multiple = false,
}: TCustomSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            <Text strong className="dark:text-white">
              {label}
            </Text>
          }
        >
          <Select
            mode={multiple ? "multiple" : undefined}
            // defaultValue={options[0].label}
            style={{ width: "100%" }}
            size="large"
            {...field}
            options={options}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
