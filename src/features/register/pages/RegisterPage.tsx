import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import yacht from "../../../assets/yacht.png";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { useRegister } from "../hooks/useRegister";
import { Register, registerSchema } from "../schemas/registerSchema";
import { PathRoutes } from "../../../routes/pathRoutes";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const regis = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const notify = (text: string, type: "success" | "error") => {
    if (type === "success") {
      setTimeout(() => navigate(PathRoutes.login, { replace: true }), 1000);
      toast.success(text);
      return;
    }

    toast.error(text);
  };

  const onSubmit = (data: Register) => {
    regis.mutate(data, {
      onSuccess: (response) => notify(response.message, "success"),
      onError: (error) =>
        notify(error?.response?.data.errors as string, "error"),
    });
  };

  return (
    <main className="flex min-h-screen">
      {/* LEFT SECTION */}
      <section className="w-2/4 xl:w-2/3 bg-primary hidden md:flex flex-col justify-center items-center rounded-e-[10%]">
        {/* HEADER */}
        <h2 className="text-white font-semibold text-2xl">Boat Ticketing</h2>

        {/* IMAGE */}
        <img
          src={yacht}
          alt="Yacht used for ticketing"
          className="xl:h-[500px] xl:w-[500px] h-[300px] w-[300px]"
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
      <section className="w-full h-screen md:w-2/4 xl:w-1/3 flex flex-col md:justify-center items-center p-16">
        {/* IMAGE BELOW  768px */}
        <img
          src={yacht}
          alt="Yacht used for ticketing"
          className="block md:hidden h-[300px] w-[300px] mb-12"
        />

        <div className="rounded-xl border border-gray-100 shadow-lg w-full p-6">
          {/* HEADER */}
          <h2 className="text-2xl font-semibold">Sign Up</h2>

          {/* FORM */}
          <div className="mt-6 flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <InputField
                  {...register("name")}
                  label="Name"
                  placeholder="Enter name"
                  error={errors.name?.message}
                />
                <InputField
                  {...register("username")}
                  label="Username"
                  placeholder="Enter username"
                  error={errors.username?.message}
                />
                <InputField
                  {...register("email")}
                  label="Email"
                  placeholder="Enter email"
                  error={errors.email?.message}
                />
                <InputField
                  {...register("password")}
                  isPasswordField
                  label="Password"
                  placeholder="Enter password"
                  error={errors.password?.message}
                />
              </div>
              <Button className="mt-3" text="Sign Up" type="submit" />
            </form>

            <p className="text-sm mt-3">
              Already have an account?{" "}
              <span
                onClick={() => navigate(-1)}
                className="text-primary cursor-pointer underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>

        {/* FOOTER BELOW 768px */}
        <footer className="text-black text-sm md:hidden mt-auto">
          &copy; {new Date().getFullYear()} dodeteddydev All rights reserved.
        </footer>
      </section>

      <ToastContainer position="bottom-right" autoClose={1000} />
    </main>
  );
};
