import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "johndoe@example.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // setLoading(true);
    // Simulate a login API call
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.token);
    console.log({ res }, { user });

    dispatch(setUser({ user: user, token: res.token }));

    // setTimeout(() => {
    //   setLoading(false);
    //   // if (
    //   //   data.email === "user@example.com" &&
    //   //   data.password === "password123"
    //   // ) {
    //   //   Swal.fire({
    //   //     icon: "success",
    //   //     title: "Login Successful",
    //   //     timer: 1500,
    //   //     showConfirmButton: false,
    //   //   });
    //   //   navigate("/dashboard");
    //   // } else {
    //   //   Swal.fire({
    //   //     icon: "error",
    //   //     title: "Invalid email or password",
    //   //     text: "Please check your credentials and try again.",
    //   //     timer: 2000,
    //   //     showConfirmButton: false,
    //   //   });
    //   // }
    // }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
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
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium">Password</label>
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-[#079b62] underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full bg-[#079b62] text-white hover:bg-[#18ac73] font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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
