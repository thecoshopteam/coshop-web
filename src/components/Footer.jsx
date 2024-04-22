import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#f0f0f0",
        padding: "20px",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <Link to="/about-us">About Us</Link>
    </footer>
  );
};

export default Footer;
