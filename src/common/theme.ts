import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      main: "#5B0099",
    },
    secondary: {
      main: "#EF5C4E",
      light: "#FFECE7",
    },
  },
  typography: (palette) => {
    return {
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 12,
      fontWeightRegular: 400,
      fontWeightBold: 700,
      allVariants: {
        fontWeight: 400,
        lineHeight: "160%",
        color: "#1d1d1d",
      },
      h1: {
        fontSize: '64px'
      },
      h2: {
        fontSize: '42px'
      }
    };
  },
});

export default theme;
