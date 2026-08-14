import axios from "axios";

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  error: string | null;
  timestamp: number;
  path: string;
  data: T;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: number;
  path: string;
};

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});
