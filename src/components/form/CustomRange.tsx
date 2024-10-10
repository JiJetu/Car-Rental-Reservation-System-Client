import { Form, Slider, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

type TCustomRangeProps = {
  label: string;
  name: string;
  min: number;
  max: number;
};

const CustomRange = ({ label, name, min, max }: TCustomRangeProps) => {
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
          <Slider
            range
            min={min}
            max={max}
            defaultValue={[min, max]}
            onChange={field.onChange}
            value={field.value || [min, max]}
          />
          <div className="flex justify-between text-gray-500 dark:text-black">
            <span className="dark:text-white">${min}</span>
            <span className="dark:text-white">${max}</span>
          </div>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomRange;
