import React, { Component } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import ThemeSwitch from "./themeSwitch";
import ExternalLinks from "./externalLinks";
import LanguageSelector from "./languageSelector";
import HideOnScroll from "../general/hideOnScroll";

import { DIRECTION_DOWN } from "../../constants/keys";
import { LAYOUT_HEADER_PROPS, LAYOUT_HEADER_SX } from "../../styles/sx/layoutSx";
import { injectIntl } from "gatsby-plugin-intl";

const ARIA_PREFIX = "ariaLabels";

class Header extends Component {

    render() {
        const { title, openDrawer, intl } = this.props;
        return (
            <HideOnScroll direction={DIRECTION_DOWN}>
                <AppBar position='sticky'>
                    <Toolbar>
                        <IconButton edge='start' onClick={openDrawer}
                        aria-label = {intl.formatMessage({id : `${ARIA_PREFIX}.openMenu`})}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            {...LAYOUT_HEADER_PROPS.TITLE}
                            sx={LAYOUT_HEADER_SX.TITLE}>
                            {title}
                        </Typography>
                        
                        <ThemeSwitch />
                        <LanguageSelector/>
                        
                        <ExternalLinks />
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        );
    }
}
export default injectIntl(Header);
