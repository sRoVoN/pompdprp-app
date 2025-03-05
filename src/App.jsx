import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { blue, green, grey, pink, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
function App() {
  const [backgroundColor, setBackgroundColor] = useState(red[400]);
  const [isRunning, setIsRuning] = useState(false);
  const [timeMin, setTimeMin] = useState(25);
  const [timeSec, setTimeSec] = useState(0);
  const [startBtn, setStartBtn] = useState("START");
  const [startColor, setStartColor] = useState(green[500]);
  const [activeMode, setActiveMode] = useState("pomodoro");

  const handleTimerClick = () => {
    setBackgroundColor(red[400]);
    setTimeMin(25);
    setIsRuning(false);
    setStartBtn("START");
    setStartColor(green[500]);
    setActiveMode("pomodoro")
  };
  const handleShortBreakClick = () => {
    setBackgroundColor(green[200]);
    setTimeMin(5);
    setTimeSec(0);
    setIsRuning(false);
    setStartBtn("START");
    setStartColor(green[500]);
    setActiveMode("shortBreak");
  };
  const handleLongBreakClick = () => {
    setBackgroundColor(blue[200]);
    setTimeMin(15);
    setTimeSec(0);
    setIsRuning(false);
    setStartBtn("START");
    setStartColor(green[500]);
    setActiveMode("longBreak")
  };
  const theme = createTheme({
    typography: {},
  });
  useEffect(() => {
    if (isRunning) {
      const intervalPom = setInterval(() => {
        if (timeSec > 0) {
          setTimeSec((timeSec) => timeSec - 1);
        }
        if (timeSec === 0) {
          setTimeMin((setTimeMin) => timeMin - 1);
          setTimeSec(59);
        }
        if (timeSec === 0 && timeMin === 0) {
          setIsRuning(false);
        }
      }, 1000);
      return () => clearInterval(intervalPom);
    }
  }, [isRunning, timeMin, timeSec]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRuning(false);
      setStartBtn("START");
      setStartColor(green[500]);
    } else {
      setIsRuning(true);
      setStartBtn("PAUSE");
      setStartColor(red[500]);
    }
  };
   const resetTimer = () => {
    setIsRuning(false);
    if (activeMode === "pomodoro") {
      setTimeMin(25);
    } else if (activeMode === "shortBreak") {
      setTimeMin(5);
    } else if (activeMode === "longBreak") {
      setTimeMin(15);
    }
    setTimeSec(0);
    setBackgroundColor(
      activeMode === "pomodoro" ? red[400] : activeMode === "shortBreak" ? green[200] : blue[200]
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 275, background: grey[500] }}>
        <Card sx={{ backgroundColor }}>
          <CardContent>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={handleTimerClick} sx={{ backgroundColor }}>
                Pomodoro
              </Button>
              <Button onClick={handleShortBreakClick} sx={{ backgroundColor }}>
                Short Breack
              </Button>
              <Button onClick={handleLongBreakClick} sx={{ backgroundColor }}>
                Long Break
              </Button>
            </ButtonGroup>
            <Typography variant="h1" color={pink[900]}>
              {timeMin}: {timeSec < 10 ? "0" + timeSec : timeSec}
            </Typography>
            <Button
              variant="outlined"
              onClick={toggleTimer}
              sx={{
                color: "white",
                backgroundColor: startColor,
                marginRight: 2,
              }}
            >
              {startBtn}
            </Button>
            <Button
              variant="outlined"
              onClick={resetTimer}
              sx={{ color: "white" }}
            >
              RESET
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default App;
