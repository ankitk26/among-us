import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "background",
        color: "myGray",
      },
      "*": {
        textDecoration: "none",
        "&:focus": {
          outline: "none",
        },
      },
    },
  },
  fonts: {
    heading: "Work Sans",
    body: "Work Sans",
  },
  colors: {
    brand: {
      500: "#3D5AF1",
      300: "#E8EBFB",
      600: "#3751d9",
    },
    background: "#FCFCFC",
    myGray: "#27272A",
  },
});
