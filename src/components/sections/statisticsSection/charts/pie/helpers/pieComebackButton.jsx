import React, { Component } from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { CHARTS_SX } from "../../../../../../styles/sx/sections/statisticsSx";
import {injectIntl} from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.pie";

class PieComebackButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
  }

  render() {
    const { intl, onClick } = this.props;
    const actionDescription = intl.formatMessage({ id: `${INTL_PREFIX}.comeBackTooltip` })
    return (
      <Tooltip title={actionDescription}>
        <IconButton
          sx={CHARTS_SX.COMEBACK_BUTTON}
          size="small"
          aria-label={actionDescription}
          onMouseEnter={() => this.setState({ isHover: true })}
          onMouseLeave={() => this.setState({ isHover: false })}
          onClick={onClick}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
    );
  }
}
export default injectIntl(PieComebackButton);
