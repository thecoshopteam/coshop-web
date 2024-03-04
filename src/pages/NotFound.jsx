import React from "react";

// MUI component imports
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-bold">
          Oops! This page doesn&apos;t exist
        </h2>
        <p>The requested page could not be found.</p>
      </div>
      <Button
        href="/"
        type="button"
        variant="contained"
        endIcon={<DashboardIcon />}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
