import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getRules } from "src/utils/rules";

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="bg-orange">
      <div className="max-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" noValidate onSubmit={onSubmit}>
              <div className="text-2xl">Đăng ký</div>
              <div className="mt-7">
                <input
                  type="email"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Email"
                  {...register("email", getRules().email)}
                />
                <div className="ml-1 mt-1 min-h-[1.25rem] text-sm text-red-600">{errors.email?.message}</div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Password"
                  autoComplete="on"
                  {...register("password", getRules().password)}
                />
                <div className="ml-1 mt-1 min-h-[1.25rem] text-sm text-red-600">{errors.password?.message}</div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Confirm password"
                  autoComplete="on"
                  {...register("confirm_password", getRules(getValues).confirm_password)}
                />
                <div className="ml-1 mt-1 min-h-[1.25rem] text-sm text-red-600">{errors.confirm_password?.message}</div>
              </div>
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
