import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { toast } from "sonner";

const ForgetPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating....");
    try {
      const res = await forgotPassword(data).unwrap();
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }
      toast.success("Password reset email sent! Check your inbox.", {
        id: toastId,
        duration: 4000,
      });
      window.location.href = "https://mail.google.com/mail/u/0/#inbox";
    } catch (error) {
      toast.error("Failed to send password reset email.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#1a1919]">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1919] p-8 rounded-lg shadow-lg dark:border-2 dark:border-[#4d4b4b]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password?
        </h2>
        <CustomForm onSubmit={handleForgotPassword}>
          <CustomInput
            type="email"
            name="email"
            placeholderText="your email"
            label="Email"
          />
          <Button className="bg-green-600 hover:bg-green-700" type="submit">
            Send Password Reset Link
          </Button>
        </CustomForm>
      </div>
    </div>
  );
};

export default ForgetPassword;
