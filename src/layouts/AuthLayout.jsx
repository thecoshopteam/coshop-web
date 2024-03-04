import React from "react";
import PropTypes from "prop-types";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-svh flex-col ">
      <main className="flex flex-1 items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
