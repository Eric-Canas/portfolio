import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Logo from "./logo";

import { LOGOS_SECTION_PROPS } from "../../../styles/sx/sections/logosSx";

class LogosSection extends Component {

    render() {
        const { header, bigSize, logos } = this.props.data;
        return (
            <Grid container>
                <Typography {...LOGOS_SECTION_PROPS.HEADER_TYPOGRAPHY}>
                    {header}
                </Typography>
                <Grid container {...LOGOS_SECTION_PROPS.LOGOS_GRID}>
                    {logos.map((logo) => (
                        <Logo bigSize={bigSize} logo={logo} key={logo.id} />
                    ))}
                </Grid>
            </Grid>
        );
    }
}
export default LogosSection;
