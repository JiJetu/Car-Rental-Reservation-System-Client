import { Form, Upload, Button } from "antd";
import { Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";

type TCustomImageFileProps = {
  name: string;
  label?: string;
};

const CustomImageFile = ({ name, label }: TCustomImageFileProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Controller
        name={name}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <Form.Item label={label}>
            <Upload
              {...field}
              accept="image/*"
              beforeUpload={(file) => {
                onChange(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            {value && (
              <div style={{ marginTop: "10px" }}>
                <span>Selected file: {value.name}</span>
                <Button
                  type="link"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    onChange(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomImageFile;
