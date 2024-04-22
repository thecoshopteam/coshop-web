import { useState } from "react";

// MUI component imports
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

// Context imports
import { UserAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUserEmail, updateUserPassword } = UserAuth();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  async function updateEmail(event) {
    event.preventDefault();
    setEmailMessage("");
    setEmailLoading(true);
    try {
      await updateUserEmail(email);
      setEmailMessage("Your email address has been updated!");
    } catch (error) {
      setEmailMessage(
        "An error has occurred. Please make sure you've logged in recently and try again.",
      );
      console.error(error);
    } finally {
      setEmailLoading(false);
    }
  }

  async function updatePassword(event) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordLoading(true);
    try {
      await updateUserPassword(password);
      setPasswordMessage("Your password has been updated!");
    } catch (error) {
      setPasswordMessage(
        "An error has occurred. Please make sure you've logged in recently and try again.",
      );
      console.error(error);
    } finally {
      setPasswordLoading(false);
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
              onChange={e => setEmail(e.target.value)}
              disabled={emailLoading}
            />
            <Button
              type="submit"
              variant="outlined"
              disabled={emailLoading}
              data-testid="update-email-button"
            >
              {emailLoading ? "Updating..." : "Update"}
            </Button>
          </div>
          <p className="text-balance text-sm font-medium">
            For security reasons, you need to have recently logged in to do this
            action.
          </p>
          {emailMessage && <p className="font-semibold">{emailMessage}</p>}
        </form>
      </div>
      <div className="mt-10 space-y-1">
        <h2 className="text-xl font-medium">Password</h2>
        <form onSubmit={updatePassword} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="password"
              onChange={e => setPassword(e.target.value)}
              disabled={passwordLoading}
            />
            <Button
              type="submit"
              variant="outlined"
              disabled={passwordLoading}
              data-testid="update-password-button"
            >
              {passwordLoading ? "Updating..." : "Update"}
            </Button>
          </div>
          <p className="text-balance text-sm">
            Please ensure your password is at least 8 characters long for
            enhanced security.
          </p>
          <p className="text-balance text-sm font-medium">
            For security reasons, you need to have recently logged in to do this
            action.
          </p>
          {passwordMessage && (
            <p className="font-semibold">{passwordMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
