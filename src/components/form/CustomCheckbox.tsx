import { Checkbox, Form, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

type TCustomCheckboxProps = {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
};

const CustomCheckbox = ({ name, label, options }: TCustomCheckboxProps) => {
  return (
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
        >
          <Checkbox.Group
            {...field}
            options={options}
            className="dark:bg-white dark:text-black dark:p-3"
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomCheckbox;
