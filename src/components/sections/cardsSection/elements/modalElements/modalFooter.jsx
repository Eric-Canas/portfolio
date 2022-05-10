import React, { Component } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ICONS from "../../../../../constants/icons";
import {
    MODAL_FOOTER_PROPS,
    MODAL_SX,
} from "../../../../../styles/sx/sections/cardsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "generals";
const ARIA_PREFIX = "ariaLabels";

class ModalFooter extends Component {
    render() {
        const { linkButtons, close, intl } = this.props;
        return (
            <Grid
                container
                {...MODAL_FOOTER_PROPS.WRAPPER}
                sx={MODAL_SX.FOOTER}>
                {linkButtons &&
                    linkButtons.map((button) => {
                        const { type, url, pdf, isPrimary, icon } = button;
                        if (url && pdf)
                            throw new Error(
                                "ModalFooter: Only one of url and pdf can be defined"
                            );
                        return (
                            <Button
                                key={type}
                                variant={isPrimary ? "contained" : "outlined"}
                                startIcon={ICONS[icon]}
                                sx={MODAL_SX.FOOTER_BUTTON}
                                href={url || pdf.file.url}
                                aria-label={intl.formatMessage(
                                    {
                                        id: `${ARIA_PREFIX}.modalButton`,
                                    },
                                    {
                                        type: type,
                                    }
                                )}
                                {...MODAL_FOOTER_PROPS.BUTTON_LINK}>
                                {type}
                            </Button>
                        );
                    })}
                <Button
                    sx={MODAL_SX.FOOTER_BUTTON}
                    onClick={close}
                    aria-label={intl.formatMessage({
                        id: `${ARIA_PREFIX}.closeModal`,
                    })}>
                    {intl.formatMessage({ id: `${INTL_PREFIX}.close` })}
                </Button>
            </Grid>
        );
    }
}
export default injectIntl(ModalFooter);
