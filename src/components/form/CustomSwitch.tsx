import { Form, Switch } from "antd";
import { Controller } from "react-hook-form";

type TCustomSwitchProps = {
  name: string;
  label?: string;
  defaultChecked?: boolean;
};

const CustomSwitch = ({
  name,
  label,
  defaultChecked = false,
}: TCustomSwitchProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        defaultValue={defaultChecked}
        render={({ field: { value, ...field }, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Switch {...field} value={defaultChecked} checked={value} />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomSwitch;
