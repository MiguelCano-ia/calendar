import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuthStore } from "../../hooks";

const schema = z.object({
  name: z.string().min(3, { message: "Name must contain 3 character(s)" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain 6 character(s)" }),
  confirmPassword: z.string(),
});

type FormFields = z.infer<typeof schema>;

export const RegisterView = () => {
  const { startRegister } = useAuthStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormFields) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    startRegister({ ...data });
  };

  return (
    <div className="col-md-6 login-form-2">
      <h3>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <div className="text-danger">{errors.name.message}</div>
          )}
        </div>
        <div className="form-group mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>

        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword.message}</div>
          )}
        </div>
        <div className="d-grid gap-2">
          <input type="submit" className="btnSubmit" value="Crear cuenta" />
        </div>
      </form>
    </div>
  );
};
