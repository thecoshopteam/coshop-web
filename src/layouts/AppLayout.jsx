import React from "react";
import PropTypes from "prop-types";

// Shared component imports
import Navbar from "../shared/Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
