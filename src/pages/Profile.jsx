import React, { useState } from "react";

// MUI component imports
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

// Context imports
import { UserAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUserEmail } = UserAuth();

  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function updateEmail(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      await updateUserEmail(email);
      setMessage("Your email address has been updated!");
    } catch (error) {
      setMessage(
        "An error has occurred. Please make sure you've logged in recently and try again.",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-3xl font-semibold">My Profile</h1>
      <div className="mt-10 space-y-1">
        <h2 className="text-xl font-medium">Email address</h2>
        <form onSubmit={updateEmail} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" variant="outlined" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
          <p className="text-balance text-sm">
            For security reasons, you need to have recently logged in to do this
            action.
          </p>
          {message && <p className="font-semibold">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
