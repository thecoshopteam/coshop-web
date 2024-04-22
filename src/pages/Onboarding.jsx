import { useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import OBWelcome from "../components/OBWelcome";
import OBCreateLists from "../components/OBCreateLists";
import OBAddAttributes from "../components/OBAddAttributes";
import OBAddStore from "../components/OBAddStore";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [screen, setScreen] = useState(0);

  const navigate = useNavigate();

  const handleNextClick = () => {
    if (screen === 3) {
      navigate("/");
    } else {
      setScreen(screen + 1);
    }
  };
  return (
    <div className="border-brand/20 flex flex-col items-center rounded-xl border px-10 py-20">
      {screen === 0 && <OBWelcome />}
      {screen === 1 && <OBCreateLists />}
      {screen === 2 && <OBAddAttributes />}
      {screen === 3 && <OBAddStore />}
      <div className="mt-5 flex gap-2">
        <Button
          type="button"
          href="/"
          variant="outlined"
          endIcon={<KeyboardDoubleArrowRightIcon />}
        >
          Skip
        </Button>
        <Button
          type="button"
          onClick={handleNextClick}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
