import CustomForm from "@/components/form/CustomForm";
import CustomImageFile from "@/components/form/CustomImageFile";
import CustomInput from "@/components/form/CustomInput";
import { Button, Modal } from "antd";

type TAdminModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: any;
  onSubmit: any;
  defaultValues: any;
  isUploading: boolean;
  userInfoUpdating: boolean;
};

const AdminModal = ({
  isModalVisible,
  setIsModalVisible,
  onSubmit,
  defaultValues,
  isUploading,
  userInfoUpdating,
}: TAdminModalProps) => {
  return (
    <Modal
      title="Edit Profile"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <CustomInput
          type="text"
          name="name"
          placeholderText="Name"
          label="Name"
        />
        <CustomInput
          type="email"
          name="email"
          placeholderText="Email"
          label="Email"
        />
        <CustomInput
          type="text"
          name="phone"
          placeholderText="Phone"
          label="Phone"
        />
        <CustomInput
          type="text"
          name="address"
          placeholderText="Address"
          label="Address"
        />
        <CustomImageFile name="userImage" label="Upload Profile Picture" />
        <Button
          htmlType="submit"
          type="primary"
          block
          loading={isUploading || userInfoUpdating}
        >
          Update Profile
        </Button>
      </CustomForm>
    </Modal>
  );
};

export default AdminModal;
