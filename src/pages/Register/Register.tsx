import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "react-query"
import { omit } from "lodash"

import { registerSchema, RegisterSchema } from "src/utils/rules"
import { registerAccount } from "src/apis/auth.api"
import { isAxiosUnprocessableEntityError } from "src/utils/utils"
import { ErrorResponse } from "src/types/utils.type"
import { AppContext } from "src/contexts/app.context"

import Input from "src/components/Input"

type FormData = RegisterSchema

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirm_password">) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"])

    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate("/")
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, "confirm_password">>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, "confirm_password">, {
                message: formError[key as keyof Omit<FormData, "confirm_password">],
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
  )
}
