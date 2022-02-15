import React, { Component } from "react";

import List from "@mui/material/List";

import ListSubjectEntry from "../../helpers/listSubjectEntry";

import { filterDataByGroup } from "../../../../../../auxiliars/statistics/general";
import { CHART_ITEM_PROPS, CHART_TOOLTIP_SX } from "../../../../../../styles/sx/sections/statisticsSx";


class PieTooltip extends Component {

  render() {
    const { active, payload } = this.props;
    if (active && payload && payload.length) {
      const { data, groupKey } = this.props;
      const group = payload[0].name;
      const filteredSamples = filterDataByGroup(data, group, groupKey);
      return (
        <List sx={CHART_TOOLTIP_SX.LIST} {...CHART_ITEM_PROPS.TOOLTIP_LIST}>
          {filteredSamples.map((sample) => (
            <ListSubjectEntry sample = {sample} key={sample.id}/>
          ))}
        </List>
      );
    } else return null;
  }
}
export default PieTooltip;
