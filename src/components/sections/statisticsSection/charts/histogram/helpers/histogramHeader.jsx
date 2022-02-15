import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {
  DEFAULT_HISTOGRAM_HEADER,
} from "../../../../../../constants/statisticsInfo";
import { CHART_ITEM_PROPS } from "../../../../../../styles/sx/sections/statisticsSx";

class HistogramHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <Grid item {...CHART_ITEM_PROPS.HEADER}>
          <Typography {...CHART_ITEM_PROPS.HEADER_TYPOGRAPHY}>
            {DEFAULT_HISTOGRAM_HEADER}
          </Typography>
        </Grid>
    );
  }
}
export default HistogramHeader;
