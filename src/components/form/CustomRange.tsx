import { Form, Slider } from "antd";
import { Controller } from "react-hook-form";

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
        <Form.Item label={label}>
          <Slider
            range
            min={min}
            max={max}
            defaultValue={[min, max]}
            onChange={field.onChange}
            value={field.value || [min, max]}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CustomRange;
