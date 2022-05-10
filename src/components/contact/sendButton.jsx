import React, { Component } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ICONS, { SEND } from "../../constants/icons";
import { CONTACT_FORM_SX } from "../../styles/sx/pageSx";
import { injectIntl } from "gatsby-plugin-intl";

const ARIA_PREFIX = "ariaLabels";
const CONTACT_PREFIX = "contact";

class SendButton extends Component {

    render() {
        const { intl } = this.props;
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
                        endIcon={ICONS[SEND]}
                        aria-label={intl.formatMessage({id: `${ARIA_PREFIX}.sendEmail`})}>
                        {intl.formatMessage({ id: `${CONTACT_PREFIX}.send` })}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(SendButton);
