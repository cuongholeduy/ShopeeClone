import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";

type Rules = { [key in "email" | "password" | "confirm_password"]: RegisterOptions };

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc"
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Email không đúng định dạng"
    },
    minLength: {
      value: 5,
      message: "Độ dài từ 5 - 160 ký tự"
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 5 - 160 ký tự"
    }
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc"
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự"
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự"
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: "Nhập lại password là bắt buộc"
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự"
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự"
    },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "Nhập lại password không khớp"
        : undefined
  }
});

const generalSchema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .min(5, "Độ dài từ 5 - 160 ký tự")
    .max(160, "Độ dài từ 5 - 160 ký tự")
    .email("Email không đúng định dạng"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự"),
  confirm_password: yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự")
    .oneOf([yup.ref("password")], "Nhập lại password không khớp")
});

export const registerSchema = generalSchema;
// export const loginSchema = generalSchema.omit(["confirm_password"]);

export type RegisterSchema = yup.InferType<typeof registerSchema>;
// export type LoginSchema = yup.InferType<typeof loginSchema>;
