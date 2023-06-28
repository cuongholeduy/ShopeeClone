import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "src/components/Input";
import { registerSchema, RegisterSchema } from "src/utils/rules";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="bg-orange">
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" noValidate onSubmit={onSubmit}>
              <div className="text-2xl">Đăng ký</div>
              <Input
                className="mt-7"
                type="email"
                placeholder="Email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className="mt-2"
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="on"
                register={register}
                errorMessage={errors.password?.message}
              />
              <Input
                className="mt-2"
                type="password"
                placeholder="Confirm password"
                name="confirm_password"
                autoComplete="on"
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
              <div className="mt-2">
                <button
                  className="w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600"
                  type="submit"
                >
                  Đăng ký
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link to="/login" className="ml-1 text-red-400 hover:text-red-500">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
