import { Form, Input, Typography } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input;
const { Text } = Typography;

type TCustomTextAreaProps = {
  name: string;
  placeholderText?: string;
  label?: string;
  maxRow?: number;
};

const CustomTextArea = ({
  name,
  label,
  placeholderText,
  maxRow = 2,
}: TCustomTextAreaProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
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
            <TextArea
              {...field}
              placeholder={`Enter your ${placeholderText}`}
              autoSize={{ minRows: 2, maxRows: maxRow }}
            />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomTextArea;
