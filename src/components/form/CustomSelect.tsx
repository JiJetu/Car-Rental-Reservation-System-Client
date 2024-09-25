import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

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
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            mode={multiple ? "multiple" : undefined}
            defaultValue={options[0].label}
            style={{ width: "100%" }}
            size="large"
            {...field}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
