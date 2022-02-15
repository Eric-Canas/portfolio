import React, { Component } from "react";

import Box from "@mui/material/Box";

import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material";

import THEMES, { DARK, LIGHT } from "../../styles/themes";



export const ThemeContext = React.createContext();

export default function MainWrapper({ ...rest }) {
    //The use media query does not really works until the component is mounted
    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    return <MainWrapperClass {...rest} prefersDark={prefersDark} />;
}

class MainWrapperClass extends Component {
    constructor(props) {
        super(props);
        // If it is saved in the local storage, use it
        let wasDark = "true";
        try {
            wasDark = localStorage.getItem("isDark");
        } catch (e) {
            wasDark = "true";
        }
        // To boolean if it was not null
        if (wasDark) wasDark = wasDark === "true";

        this.isThemeFixed = wasDark !== null;
        // Otherwise, look for the user preference
        this.state = { isDark: wasDark ?? (this.props.prefersDark || false) };

        this.setIsDark = this.setIsDark.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        // Update to the preference (if it is not fixed) the first time the component is rendered
        if (
            !this.isThemeFixed &&
            prevProps.prefersDark !== this.props.prefersDark
        ) {
            this.setState({ isDark: this.props.prefersDark });
        }
    }

    setIsDark(isDark) {
        this.setState({ isDark : isDark });
        this.isThemeFixed = true;
        localStorage.setItem("isDark", isDark);
    }

    render() {
        const { isDark } = this.state;

        return (
            <ThemeContext.Provider
                value={{
                    isSystemDefault: !this.isThemeFixed,
                    isDark: isDark,
                    toggle: () => this.setIsDark(!isDark),
                }}>
                <ThemeProvider theme={THEMES[isDark ? DARK : LIGHT]}>
                    <Box
                        sx={{
                            bgcolor: "background.paper",
                            minHeight: "100vh",
                        }}>
                        {this.props.children}
                    </Box>
                </ThemeProvider>
            </ThemeContext.Provider>
        );
    }
}
