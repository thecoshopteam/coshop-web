import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Context imports
import { UserAuth } from "../context/AuthContext";

// MUI component imports
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { registerUser } = UserAuth();
  const navigate = useNavigate();

  const handleRegistration = async event => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    try {
      await registerUser(email, password);
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
        <h1 className="mb-10 text-center text-6xl font-bold text-blue-500">
          CoShop
        </h1>
      </div>
      <div>
        <h1 className="mb-10 text-center text-3xl font-bold">
          Register an account
        </h1>
        <form onSubmit={handleRegistration} className="flex flex-col gap-5">
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
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm your password"
            onChange={event => setPasswordConfirmation(event.target.value)}
            required
          />
          {errorMessage && (
            <p className="text-center font-semibold text-red-500">
              {errorMessage}
            </p>
          )}
          <Button type="submit" variant="contained">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="mt-5 text-center">
          Already have an account? Log in{" "}
          <Link to="/login" className="text-blue-600 underline">
            {" "}
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
