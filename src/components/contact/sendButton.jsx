import React, { Component } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ICONS, { SEND } from "../../constants/icons";
import { CONTACT_FORM_SX } from "../../styles/sx/pageSx";
import { injectIntl } from "gatsby-plugin-intl";

class SendButton extends Component {

    render() {
        return (
            <Grid item xs={12}>
                <Grid
                    container
                    justifyContent={{
                        xs: "center",
                        sm: "flex-end",
                    }}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={CONTACT_FORM_SX.SEND_BUTTON}
                        endIcon={ICONS[SEND]}>
                        {this.props.intl.formatMessage({ id: "contact.send" })}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(SendButton);
