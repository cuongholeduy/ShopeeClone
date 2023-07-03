import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "react-query"

import { loginSchema, LoginSchema } from "src/utils/rules"
import { login } from "src/apis/auth.api"
import { isAxiosUnprocessableEntityError } from "src/utils/utils"
import { ErrorResponse } from "src/types/utils.type"
import { AppContext } from "src/contexts/app.context"

import Input from "src/components/Input"
import Button from "src/components/Button"

type FormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate("/")
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: "Server"
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className="bg-orange">
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form className="rounded bg-white p-10 shadow-sm" noValidate onSubmit={onSubmit}>
              <div className="text-2xl">Đăng nhập</div>
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
              <div className="mt-3">
                <Button
                  className="flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600"
                  type="submit"
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
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
  )
}
