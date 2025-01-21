import { useAuthStore } from "../../hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain 6 character(s)" }),
});

type FormFields = z.infer<typeof schema>;

export const LoginView = () => {
  const { startLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormFields) => {
    startLogin({ ...data });
  };

  return (
    <div className="col-md-6 login-form-1">
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-2">
          <input
            type="text"
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
        <div className="d-grid gap-2">
          <input type="submit" className="btnSubmit" value="Login" />
        </div>
      </form>
    </div>
  );
};
