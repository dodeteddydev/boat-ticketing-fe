import { useNavigate } from "react-router";
import yacht from "../../../assets/yacht.png";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { PathRoutes } from "../../../routes/pathRoutes";
import { useForm } from "react-hook-form";
import { Login, loginSchema } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalContext } from "../../../context/useGlobalContext";

export const LoginPage = () => {
  const { setUserStatus } = useGlobalContext();
  const navigate = useNavigate();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const notify = (text: string, type: "success" | "error") => {
    if (type === "success") {
      setTimeout(() => setUserStatus("authorized"), 1000);
      toast.success(text);
      return;
    }

    toast.error(text);
  };

  const onSubmit = (data: Login) => {
    login.mutate(data, {
      onSuccess: (response) => notify(response.message, "success"),
      onError: (error) =>
        notify(error?.response?.data.errors as string, "error"),
    });
  };

  return (
    <main className="flex min-h-screen">
      {/* LEFT SECTION */}
      <section className="w-2/3 bg-primary flex flex-col justify-center items-center rounded-e-[10%]">
        {/* HEADER */}
        <h2 className="text-white font-semibold text-2xl">Boat Ticketing</h2>

        {/* IMAGE */}
        <img
          src={yacht}
          alt="Yacht used for ticketing"
          className="h-1/2 w-1/2"
        />
        <a className="text-xs text-white" href="https://storyset.com/transport">
          Transport illustrations by Storyset
        </a>

        {/* FOOTER */}
        <footer className="text-white text-sm">
          &copy; {new Date().getFullYear()} dodeteddydev All rights reserved.
        </footer>
      </section>

      {/* RIGHT SECTION */}
      <section className="w-1/3 flex justify-center items-center p-16">
        <div className="rounded-xl border border-gray-100 shadow-lg w-full p-6">
          {/* HEADER */}
          <h2 className="text-2xl font-semibold">Login</h2>

          {/* FORM */}
          <div className="mt-6 flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <InputField
                  {...register("identifier")}
                  label="Username or email"
                  error={errors.identifier?.message}
                />
                <InputField
                  {...register("password")}
                  isPasswordField
                  label="Password"
                  error={errors.password?.message}
                />
              </div>
              <p onClick={() => {}} className="text-sm text-end cursor-pointer">
                Forgot Password?
              </p>
              <Button
                disabled={login.isPending}
                className="mt-3"
                text="Login"
                type="submit"
              />
            </form>

            <p className="text-sm mt-3">
              Don't have an account?{" "}
              <span
                onClick={() => navigate(PathRoutes.register)}
                className="text-primary cursor-pointer underline"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" autoClose={1000} />
    </main>
  );
};
