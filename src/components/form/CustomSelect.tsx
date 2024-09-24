import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TCustomSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const CustomSelect = ({ label, name, options }: TCustomSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
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
