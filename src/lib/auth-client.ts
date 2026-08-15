import { createAuthClient } from "better-auth/react";

export type AuthValue = {
  name?: string;
  email: string;
  password: string;
};

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,

  fetchOptions: {
    credentials: "include",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  },
});

export const signOut = async () => {
  const { data: response, error } = await authClient.signOut();
  return { response, error };
};

export const emailSignUp = async (data: AuthValue) => {
  const { data: response, error } = await authClient.signUp.email({
    name: data.name || "",
    email: data.email,
    password: data.password,
  });

  return { response, error };
};

export const emailSignIn = async (data: AuthValue) => {
  const { data: response, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  return { response, error };
};

export const googleLogin = async () => {
  const { data: response, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
    errorCallbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-in`,
  });

  return { response, error };
};
