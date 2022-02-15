import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { GatsbyImage } from "gatsby-plugin-image";
import { AVATAR_SX, INDEX_PROPS } from "../../styles/sx/pageSx";

class IndexHeader extends Component {

    render() {
        const { avatarImage, name, subheader } = this.props;
        return (
            <>
                <Grid
                    container
                    component='header'
                    sx={AVATAR_SX.CONTAINER}
                    spacing={1}>
                    <Grid item>
                        <GatsbyImage
                            image={avatarImage}
                            alt={name}
                            loading='eager'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography {...INDEX_PROPS.SUBHEADER}>
                            {subheader}
                        </Typography>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default IndexHeader;
