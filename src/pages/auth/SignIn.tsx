import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import { TSignInFormValues } from "@/tyeps";

const defaultValues = {
  email: "johndoe@example.com",
  password: "password123",
};

type TValidateErrorProps = {
  data: {
    errorMessages: [];
    message: string;
    stack: string;
    success: boolean;
  };
};

const SignIn = () => {
  const [login, { error }] = useLoginMutation();
  const validateError = error as TValidateErrorProps;
  console.log(validateError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormValues>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TSignInFormValues> = async (data) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token) as TUser;

      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Logged in successful", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#1a1919]">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1919] p-8 rounded-lg shadow-lg dark:border-2 dark:border-[#4d4b4b]">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="input input-bordered w-full dark:text-black"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {validateError?.data?.message === "user not found" && (
              <p className="text-red-500 text-sm">Invalid email</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full dark:text-black"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {validateError?.data?.message === "Invalid password" && (
              <p className="text-red-500 text-sm">
                {validateError?.data?.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-[#079b62] underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full bg-[#079b62] text-white hover:bg-[#18ac73] font-semibold`}
          >
            Sign In
          </Button>
        </form>

        {/* Sign Up Instead Link */}
        <div className="text-center mt-4">
          <p>
            Don't have an account? Then{" "}
            <Link to="/signUp" className="text-[#079b62] underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm">
          <Link to="/privacy" className="text-[#079b62] underline">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms" className="text-[#079b62] underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
