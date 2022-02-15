import React, { Component } from "react";

import Grid from "@mui/material/Grid";

import {
    LineChart,
    ResponsiveContainer,
    XAxis,
    Line as InnerLine,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import LineTooltip from "./helpers/lineTooltip";
import SimpleHeader from "../helpers/simpleHeader";

import { getAverageMarkByYearAndSemester } from "../../../../../auxiliars/statistics/line";
import { AVERAGE_MARK, LINE_X_FIELD } from "../../../../../constants/keys";
import {
    CHARTS_SX,
    CHART_ITEM_PROPS,
    CHART_RESPONSIVE_CONTAINER_PROPS,
    CHART_TOOLTIP_SX,
} from "../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.line";

const MAX_Y = 10;
const MIN_Y = 6;

class Line extends Component {

    render() {
        const { data, intl } = this.props;
        const lines = getAverageMarkByYearAndSemester(data, intl.locale);

        return (
            <Grid container sx={CHARTS_SX.INNER_CONTAINER}>
                <Grid item {...CHART_ITEM_PROPS.HEADER}>
                    <SimpleHeader intlPrefix={INTL_PREFIX} />
                </Grid>
                <Grid item {...CHART_ITEM_PROPS.PLOT} sx={CHARTS_SX.LINE_HEADER}>
                    <ResponsiveContainer
                        {...CHART_RESPONSIVE_CONTAINER_PROPS.RECTANGULAR}>
                        <LineChart data={lines}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis
                                dataKey={LINE_X_FIELD}
                                interval={"preserveStartEnd"}
                            />
                            <YAxis
                                type='number'
                                domain={[MIN_Y, MAX_Y]}
                                tickCount={MAX_Y-MIN_Y + 1}
                                width={20}
                            />
                            <InnerLine
                                type='monotone'
                                dataKey={AVERAGE_MARK}
                                isAnimationActive={false}
                            />
                            <Tooltip
                                wrapperStyle={CHART_TOOLTIP_SX.WRAPPER}
                                content={<LineTooltip data={data} />}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(Line);
