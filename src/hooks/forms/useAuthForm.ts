import { SignInSchema, SignUpSchema } from "#/schemas/auth.schema";
import type { SignInType, SignUpType } from "#/types/auth.type";
import { useForm } from "@tanstack/react-form-start";

export const useAuthForm = () => {
  const signInForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    } as SignInType,
    validators: {
      onChange: SignInSchema,
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
