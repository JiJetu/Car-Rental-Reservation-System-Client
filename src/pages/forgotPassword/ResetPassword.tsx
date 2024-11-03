import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [resetPassword] = useResetPasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleResetPassword: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating password...");
    try {
      const userInfo = { email, newPassword: data.newPassword };
      const userData = { userInfo, token };
      console.log(userData);
      const res = await resetPassword(userData).unwrap();

      if (res?.success) {
        toast.success("Password reset successfully!", {
          id: toastId,
          duration: 2000,
        });

        dispatch(logOut());
        navigate("/signIn");
      } else {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to reset password.", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#1a1919]">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1919] p-8 rounded-lg shadow-lg dark:border-2 dark:border-[#4d4b4b]">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <CustomForm onSubmit={handleResetPassword}>
          <CustomInput
            type="password"
            name="newPassword"
            placeholderText="your new password"
            label="New Password"
          />
          <Button className="bg-green-600 hover:bg-green-700" type="submit">
            Reset Password
          </Button>
        </CustomForm>
      </div>
    </div>
  );
};

export default ResetPassword;
