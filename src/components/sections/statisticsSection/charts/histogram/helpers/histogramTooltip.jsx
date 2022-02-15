import React, { Component } from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import { normalizeHist } from "../../../../../../auxiliars/statistics/histogram";
import { BIN_END, BIN_START } from "../../../../../../constants/keys";
import {
    CHART_ITEM_PROPS,
    CHART_TOOLTIP_SX,
} from "../../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

class HistogramTooltip extends Component {

    render() {
        const { active, payload, end } = this.props;
        if (active && payload && payload.length) {
            const { locale } = this.props.intl;
            const sample = payload[0].payload; //All share the same payload
            const binStart = sample[BIN_START];
            const binEnd = sample[BIN_END];
            const normalizedSample = normalizeHist([sample])[0];
            const validGroups = payload.filter(
                (group) =>
                    !isNaN(normalizedSample[group.dataKey]) &&
                    parseFloat(normalizedSample[group.dataKey]) !== 0
            );
            if (validGroups.length === 0) return null;
            else
                return (
                    <List
                        {...CHART_ITEM_PROPS.TOOLTIP_LIST}
                        sx={CHART_TOOLTIP_SX.LIST}>
                        <Typography align='center'>
                            {`[${binStart.toLocaleString(
                                locale
                            )} - ${binEnd.toLocaleString(locale)}${
                                binEnd !== end ? ")" : "]"
                            }`}
                        </Typography>
                        <Divider />
                        {validGroups.map((group) => {
                            const { fill, dataKey } = group;
                            const value = normalizedSample[dataKey];
                            return (
                                <ListItem key={dataKey}>
                                    <Typography
                                        color={
                                            fill
                                        }>{`${dataKey.replace('º', 'º\u00a0')} : ${parseFloat(
                                        value
                                    ).toLocaleString(locale)}%`}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                );
        } else return null;
    }
}
export default injectIntl(HistogramTooltip);
