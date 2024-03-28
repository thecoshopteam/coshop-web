import React from "react";
import PropTypes from "prop-types";

// Shared component imports
import Navbar from "../shared/Navbar";
import Footer from '../components/Footer';

const AppLayout = ({ children }) => {
  
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
