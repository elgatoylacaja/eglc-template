import { styled } from "@mui/material";

export const ScrollyCardContainer = styled("div")(({ theme }) => ({
  display: "block",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  padding: "100px 0",
  width: '100%',
  border: '1px dashed #c6c6c6'
}));

export const ScrollyCard = styled("div")(({ theme }) => ({
  padding: "24px",
  background: "#fafafa",
  fontSize: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
  borderRadius: "2px",
  width: "100%",
  maxWidth: "400px",
  margin: "auto",
}));
