import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      className="mt-auto flex w-full justify-center p-5"
      style={{
        backgroundColor: theme.palette.primary.light,
        zIndex: 1000,
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
