"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/toast";
import {
  AuthValue,
  emailSignIn,
  emailSignUp,
  googleLogin,
} from "~/lib/auth-client";

const customErrors = {
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Email tersebut sudah memiliki akun",
  INVALID_EMAIL_OR_PASSWORD: "Ups, email atau password kamu salah",
} as const;

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(100, "Nama terlalu panjang")
    .trim(),

  email: z.email("Format email tidak valid").toLowerCase(),

  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[0-9]/, "Harus mengandung angka"),
});

const loginSchema = z.object({
  email: z.email("Format email tidak valid").toLowerCase(),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const handleEmailAuth = async (
  value: AuthValue,
  isSignUp: boolean,
  setIsDisabled: Dispatch<SetStateAction<boolean>>,
  router: ReturnType<typeof useRouter>,
) => {
  setIsDisabled(true);
  try {
    if (isSignUp) {
      const { error } = await emailSignUp(value);

      if (error) {
        const message =
          customErrors[error.code as keyof typeof customErrors] ||
          "Something went wrong.";
        toast.add({
          type: "success",
          description: message,
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Berhasil daftar akun",
      });
      router.push("/");
    } else {
      setIsDisabled(true);
      const { error } = await emailSignIn(value);

      if (error) {
        const message =
          customErrors[error.code as keyof typeof customErrors] ||
          "Something went wrong.";
        toast.add({
          type: "error",
          description: message,
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Berhasil masuk akun",
      });
      router.push("/");
    }
  } catch (error) {
    toast.add({
      type: "error",
      description: `Err: ${(error as Error).message}`,
    });
  } finally {
    setIsDisabled(false);
  }
};

const handleGoogleLogin = async (
  setIsDisabled: Dispatch<SetStateAction<boolean>>,
) => {
  setIsDisabled(true);
  try {
    const { error } = await googleLogin();

    if (error) {
      toast.add({
        type: "error",
        description: error.message,
      });
      return;
    }
  } catch (error) {
    toast.add({
      type: "error",
      description: `Err: ${(error as Error).message}`,
    });
  } finally {
    setIsDisabled(false);
  }
};

const AuthForm = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      ...(isSignUp && { name: "" }),
      email: "",
      password: "",
    },
    validators: {
      onSubmit: isSignUp ? registerSchema : loginSchema,
    },
    onSubmit: async ({ value }) => {
      handleEmailAuth(value, isSignUp, setIsDisabled, router);
    },
  });

  return (
    <form
      id="auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <FieldGroup>
        {isSignUp && (
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Windah Basudara"
                    autoComplete="off"
                    disabled={isDisabled}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        )}

        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="you@email.com"
                  autoComplete="off"
                  type="email"
                  disabled={isDisabled}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="••••••••"
                  autoComplete="off"
                  type="password"
                  disabled={isDisabled}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <Button
        type="submit"
        form="auth-form"
        className="mt-4 w-full rounded-full py-5"
        disabled={isDisabled}
      >
        {}
        {isSignUp ? "Buat akun" : "Masuk"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="border-border w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#FCFCFF] px-3 text-pretty">
            atau masuk dengan
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="hover:text-foreground border-foreground flex h-10 w-full rounded-full"
        onClick={() => handleGoogleLogin(setIsDisabled)}
        disabled={isDisabled}
      >
        <GoogleIcon />
        Google
      </Button>
    </form>
  );
};

const GoogleIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
};

export default AuthForm;
