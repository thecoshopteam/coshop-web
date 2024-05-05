import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: theme.palette.primary.light,
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
