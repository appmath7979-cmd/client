import { SignInSchema, SignUpSchema } from "#/schemas/auth.schema";
import type { SignInType, SignUpType } from "#/types/auth.type";
import { useForm } from "@tanstack/react-form-start";
import { useToaster } from "../useToaster";

export const useAuthForm = () => {
  const toast = useToaster();

  const signInForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    } as SignInType,
    validators: {
      onChange: SignInSchema,
    },
    onSubmit: async () => {
      toast.success({ message: "success" });
    },
  });

  const signUpForm = useForm({
    defaultValues: {
      username: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    } as SignUpType,
    validators: {
      onChange: SignUpSchema,
    },
  });

  return { signInForm, signUpForm };
};
