import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Context imports
import { UserAuth } from "../context/AuthContext";

// MUI component imports
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { loginUser } = UserAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage("Error. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-10 text-center text-3xl font-bold">
        Log in to your account
      </h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {errorMessage && (
          <p className="text-center font-semibold text-red-500">
            {errorMessage}
          </p>
        )}
        <Button type="submit" variant="contained">
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>
      <p className="mt-5 text-center">
        Don&apos;t have an account? Create one{" "}
        <Link to="/register" className="text-blue-600 underline">
          {" "}
          here
        </Link>
      </p>
    </div>
  );
};

export default Login;
