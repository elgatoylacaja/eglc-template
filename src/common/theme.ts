import { createTheme, PaletteOptions } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";
import { createBreakpoints } from "@mui/system";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    gray: string;
  }

  interface Palette {
    gray: string;
  }
}

const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
});

const theme = createTheme({
  breakpoints,
  palette: {
    primary: {
      main: "#5B0099",
    },
    secondary: {
      main: "#EF5C4E",
      light: "#FFECE7",
    },
    gray: "#888686",
  },
  typography: (palette) => {
    return {
      fontFamily: "'Work Sans', sans-serif",
      fontSize: 18,
      fontWeightRegular: 400,
      fontWeightBold: 700,
      allVariants: {
        fontWeight: 400,
        lineHeight: "160%",
        color: "#1d1d1d",
      },
      h1: {
        fontWeight: 600,
        fontSize: "68px",
        color: "#000000",
        lineHeight: "120%",
        [breakpoints.down("sm")]: {
          fontSize: "36px",
        },
      },
      h2: {
        fontFamily: "'Overpass Mono', monospace",
        fontWeight: 500,
        fontSize: "42px",
        lineHeight: "120%",
        [breakpoints.down("sm")]: {
          fontSize: "32px",
        },
      },
      h3: {
        fontFamily: "'Overpass Mono', monospace",
        fontWeight: 500,
        fontSize: "24px",
        textTransform: "uppercase",
        textAlign: "left",
      },
      body1: {
        fontFamily: "'Source Serif Pro', serif",
        lineHeight: "160%",
        fontSize: "24px",
        [breakpoints.down("sm")]: {
          fontSize: "20px",
        },
      },
      body2: {
        fontFamily: "'Source Serif Pro', serif",
        fontSize: "18px",
      },
      "annotation-medium": {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: "16px",
        lineHeight: "120%",
        color: palette.gray,
      },
      "annotation-small": {
        fontFamily: "'Work Sans', sans-serif",
        lineHeight: "120%",
        fontWeight: 500,
        fontSize: "14px",
      },
      label: {
        fontFamily: "'Overpass Mono', monospace",
        lineHeight: "120%",
        fontWeight: 400,
        fontSize: "14px",
      },
      "title-medium": {
        fontFamily: "'Overpass Mono', monospace",
        lineHeight: "120%",
        fontWeight: 400,
        fontSize: "18px",
      },
    };
  },
});

export default theme;
