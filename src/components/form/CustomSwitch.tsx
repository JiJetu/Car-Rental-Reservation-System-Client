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
        render={({ field }) => (
          <Form.Item label={label}>
            <Switch
              checked={field.value}
              onChange={field.onChange}
              defaultChecked={defaultChecked}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomSwitch;
