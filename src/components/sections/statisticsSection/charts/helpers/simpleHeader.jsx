import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { CHART_ITEM_PROPS } from "../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

class SimpleHeader extends Component {
 
  render() {
    const { intl, intlPrefix } = this.props;
    return (
        <Grid item {...CHART_ITEM_PROPS.HEADER}>
          <Typography {...CHART_ITEM_PROPS.HEADER_TYPOGRAPHY}>
            {intl.formatMessage({ id: `${intlPrefix}.header` })}
          </Typography>
        </Grid>
    );
  }
}
export default injectIntl(SimpleHeader);
