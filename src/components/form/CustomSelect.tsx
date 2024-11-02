import { Form, Select, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

type TCustomSelectProps = {
  label?: string;
  placeholder?: string;
  name: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  multiple?: boolean;
  rules?: any;
};

const CustomSelect = ({
  label,
  placeholder,
  name,
  options,
  multiple = false,
  rules,
}: TCustomSelectProps) => {
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
        >
          <Select
            mode={multiple ? "multiple" : undefined}
            // defaultValue={options[0].label}
            style={{ width: "100%", height: "100%" }}
            size="large"
            {...field}
            options={options}
            placeholder={placeholder}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
