import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { InputField } from "../../../components/global/InputField";
import { Register, registerSchema } from "../schemas/registerSchema";
import yacht from "../../../assets/yacht.png";
import { Button } from "../../../components/global/Button";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: Register) => console.log(data);

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
                  {...register("name")}
                  label="Name"
                  error={errors.name?.message}
                />
                <InputField
                  {...register("username")}
                  label="Username"
                  error={errors.username?.message}
                />
                <InputField
                  {...register("email")}
                  label="Email"
                  error={errors.email?.message}
                />
                <InputField
                  {...register("password")}
                  isPasswordField
                  label="Password"
                  error={errors.password?.message}
                />
              </div>
              <Button className="mt-3" text="Login" type="submit" />
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
      </section>
    </main>
  );
};
