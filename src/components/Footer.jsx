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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link to="/about-us" style={{ marginRight: "20px" }}>
        About Us
      </Link>
      <Link to="/faq">FAQ</Link>
    </footer>
  );
};

export default Footer;
