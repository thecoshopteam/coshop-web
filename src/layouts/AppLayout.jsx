import PropTypes from "prop-types";
import Navbar from "../shared/Navbar";
import Footer from "../components/Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-grow px-4">{children}</main>
      <Footer />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
