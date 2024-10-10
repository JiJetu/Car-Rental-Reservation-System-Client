import { Form, Switch, Typography } from "antd";
import { Controller } from "react-hook-form";

const { Text } = Typography;

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
          <Form.Item
            label={
              <Text strong className="dark:text-white">
                {label}
              </Text>
            }
          >
            <Switch {...field} value={defaultChecked} checked={value} />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomSwitch;
