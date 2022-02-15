import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { CHART_ITEM_PROPS } from "../../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = 'statistics.chart.line';

class LineHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { intl } = this.props;
    return (
        <Grid item {...CHART_ITEM_PROPS.HEADER}>
          <Typography {...CHART_ITEM_PROPS.HEADER_TYPOGRAPHY}>
            {intl.formatMessage({ id: `${INTL_PREFIX}.header` })}
          </Typography>
        </Grid>
    );
  }
}
export default injectIntl(LineHeader);
