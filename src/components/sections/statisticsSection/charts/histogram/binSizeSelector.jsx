import React, { Component } from "react";

import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

import { STATIC_ICONS, THICK_BIN, THIN_BIN } from "../../../../../constants/icons";
import { BIN_SIZE_MARKS, MAX_BIN_SIZE, MIN_BIN_SIZE } from "../../../../../constants/defaults";
import { FILTER_PROPS_SX } from "../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.histogram.binSizeSelector";

class BinSizeSelector extends Component {

  render() {
    const { intl, current, onChange} = this.props;
    return (
      <Stack spacing={2} direction="row" sx={FILTER_PROPS_SX.BIN_SIZE_SLIDER_STACK}>
        {STATIC_ICONS[THIN_BIN]}
        <Slider
          aria-label={intl.formatMessage({ id: `${INTL_PREFIX}.ariaLabel` })}
          value={current}
          onChange={(e, newValue) => onChange(newValue)}
          marks = {BIN_SIZE_MARKS}
          min={MIN_BIN_SIZE}
          max={MAX_BIN_SIZE}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value.toLocaleString(intl.locale)}
          step={null}
        />
        {STATIC_ICONS[THICK_BIN]}
      </Stack>
    );
  }
}
export default injectIntl(BinSizeSelector);
