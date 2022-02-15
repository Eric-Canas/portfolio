import React, { Component } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ICONS, { EMAIL } from "../../constants/icons";
import { INDEX_PROPS, INDEX_SX } from "../../styles/sx/pageSx";
import { Link, injectIntl } from "gatsby-plugin-intl";

class IndexFooter extends Component {
    constructor(props) {
        super(props);
        //Gatsby-plugin-intl needs this to be used inside MUI as component
        this.Link = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
    }

    render() {
        return (
            <Grid
                container
                component='footer'
                sx={INDEX_SX.FOOTER}>
                <Button
                    component={this.Link}
                    {...INDEX_PROPS.CONTACT_ME_BUTTON}
                    to='/contact-me'
                    sx={INDEX_SX.FOOTER_BUTTON}
                    startIcon={ICONS[EMAIL]}>
                    {this.props.intl.formatMessage({ id: "contact.title" })}
                </Button>
            </Grid>
        );
    }
}
export default injectIntl(IndexFooter);
