import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-orange">
      <div className="max-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm">
              <div className="text-2xl">Đăng nhập</div>
              <div className="mt-7">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Email"
                />
                <div className="ml-1 mt-1 min-h-[1rem] text-sm text-red-600"></div>
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                  placeholder="Password"
                  autoComplete="on"
                />
                <div className="ml-1 mt-1 min-h-[1rem] text-sm text-red-600"></div>
              </div>
              <div className="mt-3">
                <button className="w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600">
                  Đăng nhập
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <Link to="/register" className="ml-1 text-red-400 hover:text-red-500">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
