import React, { Component } from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { ThemeContext } from "../general/mainWrapper";

import ICONS, { DARK_MODE, LIGHT_MODE } from "../../constants/icons";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "header.themeTooltip";
const ARIA_PREFIX = "ariaLabels";

class ThemeSwitch extends Component {

    render() {
        const { intl } = this.props;
        return (
            <ThemeContext.Consumer>
                {({ isDark, toggle, isSystemDefault }) => (
                    <Tooltip
                        title={`${intl.formatMessage({
                            id: `${INTL_PREFIX}.${isDark ? "dark" : "light"}`,
                        })}
                        ${
                            isSystemDefault
                                ? ` (${intl.formatMessage({
                                      id: `${INTL_PREFIX}.systemDefault`,
                                  })})`
                                : ""
                        }`}
                        arrow>
                        <IconButton onClick={toggle} aria-label = 
                        {intl.formatMessage({id : `${ARIA_PREFIX}.switchTheme`},
                                            {newTheme : intl.formatMessage({
                                                id: `${INTL_PREFIX}.${isDark ? "light" : "dark"}`,
                                            })})}>
                            {ICONS[isDark ? DARK_MODE : LIGHT_MODE]}
                        </IconButton>
                    </Tooltip>
                )}
            </ThemeContext.Consumer>
        );
    }
}
export default injectIntl(ThemeSwitch);
