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

  const handleLogin = async event => {
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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ marginBottom: "100px" }}>
        <h1 className="mb-10 ml-20 text-center text-6xl font-bold text-blue-500 lg:ml-20">
          CoShop
        </h1>
      </div>
      <div className="flex flex-col items-center lg:flex-row">
        <div className="ml-20 lg:mr-0 lg:mt-5">
          <h1 className="mb-10 text-center text-3xl font-bold text-blue-500">
            Shopping made simpler.
          </h1>
          <h2
            style={{
              width: "200px",
              wordWrap: "break-word",
              textAlign: "left",
            }}
            className="text-1xl mb-10 text-center text-black"
          >
            By effortlessly collaborating with friends and family, making list
            sharing a breeze. Stay organized, save time, and simplify your
            shopping routine, all in one app!
          </h2>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <h1 className="mb-10 text-center text-3xl font-bold">
            Log in to your account
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={event => setEmail(event.target.value)}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
