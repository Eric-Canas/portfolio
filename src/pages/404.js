import React, { Component } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
    AVATAR_SX,
    INDEX_SX,
    NOT_FOUND_PROPS,
    NOT_FOUND_SX,
} from "../styles/sx/pageSx";
import ICONS, { EMAIL, HOME } from "../constants/icons";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import { injectIntl, Link } from "gatsby-plugin-intl";

const INTL_PREFIX = "404";

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.pageProps = props.data.contentfulNotFoundPage;
        this.avatarImage = getImage(this.pageProps.avatar);

        this.HomeLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
        this.ContactLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    }

    render() {
        const { header, subheader } = this.pageProps;
        return (
            <Box component='div' sx={{minHeight : "104.1vh"}}>
                <Grid
                    container
                    sx={AVATAR_SX.CONTAINER}
                    spacing={3}
                    componet='header'>
                    <Grid item sx={NOT_FOUND_SX.AVATAR_GRID_ITEM}>
                        <GatsbyImage image={this.avatarImage} alt={header} />
                    </Grid>
                </Grid>

                <Grid container component='article'>
                    <Grid item xs={12}>
                        <Typography {...NOT_FOUND_PROPS.HEADER}>
                            {header}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography {...NOT_FOUND_PROPS.SUBHEADER}>
                            {subheader}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    component='footer'
                    sx={NOT_FOUND_SX.FOOTER}
                    spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Grid container justifyContent={"center"}>
                            <Button
                                component={this.HomeLink}
                                variant='contained'
                                color='primary'
                                to='/'
                                sx={INDEX_SX.FOOTER_BUTTON}
                                startIcon={ICONS[HOME]}>
                                {this.props.intl.formatMessage({
                                    id: `${INTL_PREFIX}.toHome`,
                                })}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justifyContent={"center"}>
                        <Button
                            component={this.ContactLink}
                            variant='outlined'
                            color='error'
                            to='/contact-me'
                            sx={INDEX_SX.FOOTER_BUTTON}
                            startIcon={ICONS[EMAIL]}>
                            {this.props.intl.formatMessage({
                                id: `${INTL_PREFIX}.notifyAnError`,
                            })}
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}
export default injectIntl(NotFoundPage);

export const query = graphql`
    query NotFoundPageQuery($language: String) {
        contentfulNotFoundPage(node_locale: { eq: $language }) {
            header
            subheader
            avatar {
                ...AvatarImage
            }
        }
    }
`;
