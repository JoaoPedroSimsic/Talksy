import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginState {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
}

function isObjectWithMessage(err: unknown): err is { message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  );
}

function isObjectWithErrors(err: unknown): err is { errors: string[] } {
  return (
    typeof err === "object" &&
    err !== null &&
    "errors" in err &&
    Array.isArray((err as { errors: unknown }).errors) &&
    (err as { errors: unknown[] }).errors.every((item) => typeof item === "string")
  );
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (isObjectWithMessage(err)) return err.message;
  if (isObjectWithErrors(err)) return err.errors.join(", ");
  return "An unexpected error occurred.";
}

const LoginForm: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const backendUrl = "http://localhost:3000";
  const loginEndpoint = `${backendUrl}/auth/login`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prev) => ({
      ...prev,
      [name]: value,
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await axios.post(
        loginEndpoint,
        { email: loginState.email, password: loginState.password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      setLoginState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setLoginState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex items-center justify-center w-3/4 h-3/4">
      <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center w-3/4">
        <label htmlFor="email">E-mail: </label>
        <input
					className="w-full my-2"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={loginState.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password: </label>
        <input
					className="my-2"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={loginState.password}
          onChange={handleInputChange}
          required
        />

        {loginState.error && <p style={{ color: "red" }}>{loginState.error}</p>}

        <button type="submit" disabled={loginState.loading}>
          {loginState.loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
