import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PieComebackButton from "./pieComebackButton";

import { CHART_ITEM_PROPS } from "../../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.pie";

class PieHeader extends Component {

    render() {
        const { subGroup, onClickComebackButton, intl } = this.props;
        return (
            <Grid container>
                {subGroup && (
                    <Grid item {...CHART_ITEM_PROPS.COMEBACK_BUTTON}>
                        <PieComebackButton
                            onClick={onClickComebackButton}
                        />
                    </Grid>
                )}

                <Grid item xs={subGroup ? 11 : 12}>
                    <Typography {...CHART_ITEM_PROPS.HEADER_TYPOGRAPHY}>
                          {intl.formatMessage({
                                  id: `${INTL_PREFIX}.${!subGroup? "mainHeader" : "gradeHeader"}`,
                              })}
                              {subGroup && (
                                <b>{subGroup}</b>)}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(PieHeader);
