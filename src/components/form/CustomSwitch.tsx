import { Form, Switch } from "antd";
import { Controller } from "react-hook-form";

type TCustomSwitchProps = {
  name: string;
  label?: string;
  defaultChecked?: boolean;
};

const CustomSwitch = ({ name, label, defaultChecked }: TCustomSwitchProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Switch
              checked={field.value}
              onChange={field.onChange}
              defaultChecked={defaultChecked}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomSwitch;
