import { useState } from "react";
import { toast } from "sonner";

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (imageFile: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!data.success) {
        toast.error("Image upload failed");
        setIsUploading(false);
        return null;
      }
      setIsUploading(false);
      return data.data.url;
    } catch (error) {
      toast.error("Something went wrong during image upload");
      setIsUploading(false);
      return null;
    }
  };

  return { uploadImage, isUploading };
};

export default useImageUpload;
