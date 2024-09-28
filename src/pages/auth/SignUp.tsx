import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TSignUpFormValues } from "@/tyeps";
import { useSignUpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TSignUpFormValues>();

  const onSubmit: SubmitHandler<TSignUpFormValues> = async (data) => {
    let phoneNumber;

    if (data.phoneNumber === "") {
      phoneNumber = "013244235436";
    } else {
      phoneNumber = data.phoneNumber;
    }

    const toastId = toast.loading("Signing up...");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "user",
        password: data.password,
        phone: phoneNumber,
        address: data.address,
      };

      const res = await signUp(userInfo);
      if (res?.data.success) {
        toast.success("Sign up successful", { id: toastId, duration: 2000 });

        reset({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });
        dispatch(logOut());
        navigate("/signIn");
      }
      console.log(res);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const password = watch("password");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Phone Number (Optional)
            </label>
            <input
              {...register("phoneNumber")}
              className="input input-bordered w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Address</label>
            <input
              {...register("address")}
              className="input input-bordered w-full"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input input-bordered w-full"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("termsAccepted", {
                required: "You must accept the terms and conditions",
              })}
              className="checkbox"
            />
            <span className="ml-2">
              I accept the{" "}
              <Link to="/terms" className="text-[#079b62] underline">
                Terms & Conditions
              </Link>
            </span>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm">
              {errors.termsAccepted.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#079b62] text-white hover:bg-[#18ac73]"
          >
            Sign Up
          </Button>
        </form>

        <div className="text-center mt-4">
          <p>
            Already have an account? Then{" "}
            <Link to="/signIn" className="text-[#079b62] underline">
              Sign In
            </Link>
          </p>
        </div>

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

export default SignUp;
