import { Modal, Button, Row, Col } from "antd";
import CustomForm from "@/components/form/CustomForm";
import CustomImageFile from "@/components/form/CustomImageFile";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import CustomSwitch from "@/components/form/CustomSwitch";
import CustomTextArea from "@/components/form/CustomTextArea";
import {
  carColorOptions,
  carFeaturesOptions,
  carLocationOptions,
  carTypeOptions,
} from "@/constant/manageCar";
import { toast } from "sonner";
import { CarStatus, TCar, TResponse } from "@/tyeps";
import useImageUpload from "@/hooks/useImageUpload";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateCarMutation } from "@/redux/features/admin/carApi";

type TUpdateCarProps = {
  visible: boolean;
  carData: TCar;
  onClose: any;
};

const UpdateCar = ({ visible, carData, onClose }: TUpdateCarProps) => {
  const { uploadImage, isUploading } = useImageUpload();
  const [updateCar] = useUpdateCarMutation();

  const defaultValues = {
    name: carData?.name || "",
    shortDescription: carData?.shortDescription || "",
    description: carData?.description || "",
    color: carData?.color || "",
    location: carData?.location || "",
    type: carData?.type || "",
    isElectric: carData?.isElectric || false,
    features: carData?.features || [],
    pricePerHour: carData?.pricePerHour || 0,
    carImage: carData?.carImage || "",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating....");
    try {
      let imageUrl = carData.carImage as string | null;
      if (data.carImage) {
        imageUrl = await uploadImage(data.carImage);
        if (!imageUrl) {
          toast.error("Image upload failed", { id: toastId, duration: 2000 });
          return;
        }
      }

      const updatedCarData = {
        ...carData,
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        color: data.color,
        location: data.location,
        type: data.type,
        status: CarStatus.available,
        isElectric: data.isElectric,
        features: data.features,
        pricePerHour: Number(data.pricePerHour),
        carImage: imageUrl,
      };

      const res = (await updateCar({
        carId: carData._id,
        data: updatedCarData,
      })) as TResponse<TCar>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      }
      toast.success("Car updated successfully!", {
        id: toastId,
        duration: 2000,
      });
      onClose();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} title="Update Car">
      <Row justify="center" align="middle">
        <Col span={24}>
          <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <CustomInput
              type="text"
              name="name"
              placeholderText="Car Name"
              label="Car Name"
            />
            <CustomTextArea
              name="shortDescription"
              placeholderText="Car Short Description"
              label="Car Short Description"
            />
            <CustomTextArea
              name="description"
              placeholderText="Car Description"
              label="Car Description"
              maxRow={4}
            />
            <CustomInput
              type="number"
              name="pricePerHour"
              placeholderText="Price per Hour"
              label="Price per Hour"
            />
            <CustomSelect
              label="Car Color"
              name="color"
              options={carColorOptions}
            />
            <CustomSelect
              label="Car Location"
              name="location"
              options={carLocationOptions}
            />
            <CustomSelect
              label="Type of car"
              name="type"
              options={carTypeOptions}
            />
            <CustomSelect
              label="Features"
              name="features"
              options={carFeaturesOptions}
              multiple={true}
            />
            <CustomSwitch
              label="Is Electric?"
              name="isElectric"
              defaultChecked={carData?.isElectric}
            />
            <CustomImageFile name="carImage" label="Upload Car Image" />
            <Button
              htmlType="submit"
              type="primary"
              block
              loading={isUploading}
            >
              Update Car
            </Button>
          </CustomForm>
        </Col>
      </Row>
    </Modal>
  );
};

export default UpdateCar;
