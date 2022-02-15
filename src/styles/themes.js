import { createTheme } from '@mui/material/styles';

export const DARK = "dark";
export const LIGHT = "light";

const THEMES = {
    [DARK]: createTheme({palette: {
        mode: "dark"
    },
  }),
    [LIGHT]: createTheme({palette: {
        mode: "light"
    },
    }),
};
export default THEMES;