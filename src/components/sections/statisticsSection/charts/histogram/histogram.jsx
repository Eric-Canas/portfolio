import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BinSizeSelector from "./binSizeSelector";
import HistogramTooltip from "./helpers/histogramTooltip";
import SimpleHeader from "../helpers/simpleHeader";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Legend,
    Tooltip,
    LabelList,
    Text,
} from "recharts";
import {
    getClosestMultipleAbove,
    getClosestMultipleBelow,
} from "../../../../../auxiliars/statistics/general";
import { BIN_HALF, ECTS, BIN_LABEL } from "../../../../../constants/keys";

import { BIN_SIZE } from "../../../../../constants/defaults";
import { YEAR_COLORS } from "../../../../../constants/GUIConstants";
import {
    computeHistogramBins,
    getAllHistValueFields,
} from "../../../../../auxiliars/statistics/histogram";
import {
    CHARTS_SX,
    CHART_ITEM_PROPS,
    CHART_RESPONSIVE_CONTAINER_PROPS,
    CHART_TOOLTIP_SX,
} from "../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.histogram";

class Histogram extends Component {
    constructor(props) {
        super(props);
        this.state = { binSize: BIN_SIZE, stackByYear: true };

        this.getXAxisTicksCount = this.getXAxisTicksCount.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
    }

    getXAxisTicksCount(start, end) {
        if (this.state.binSize === 1) return end - start + 1;
        else return (end - start) * 2 + 1;
    }

    renderLabel(barInfo) {
        const { x, y, width, value } = barInfo;
        const pad = 5;
        if (parseFloat(value) === 0) return null;
        else
            return (
                <g>
                    <Typography
                        component={Text}
                        x={x + width / 2}
                        y={y-pad}
                        fill='#555'
                        textAnchor='middle'
                        dominantBaseline='bottom'>
                        {value}
                    </Typography>
                </g>
            );
    }

    render() {
        const { data, intl } = this.props;
        let { hist, start, end } = computeHistogramBins(
            data,
            ECTS,
            this.state.binSize,
            null,
            null,
            this.state.stackByYear,
            true,
            true,
            intl.locale
        );
        start = getClosestMultipleBelow(start, 0.5);
        end = getClosestMultipleAbove(end, 0.5);
        const ticksCount = this.getXAxisTicksCount(start, end);
        const valueFields = getAllHistValueFields(hist);

        return (
            <Grid container sx={CHARTS_SX.INNER_CONTAINER}>
                <Grid item {...CHART_ITEM_PROPS.HEADER}>
                    <SimpleHeader intlPrefix={INTL_PREFIX} />
                </Grid>
                <Grid item {...CHART_ITEM_PROPS.PLOT} sx={CHARTS_SX.LINE_CONTAINER}>
                    <ResponsiveContainer
                        {...CHART_RESPONSIVE_CONTAINER_PROPS.RECTANGULAR}>
                        <BarChart data={hist}>
                            <XAxis
                                dataKey={BIN_HALF}
                                type={"number"}
                                domain={[start, end]}
                                tickCount={ticksCount}
                                interval='preserveStartEnd'
                                tickFormatter={(value) =>
                                    parseFloat(value).toLocaleString(
                                        intl.locale
                                    )
                                }
                            />

                            <Tooltip
                                wrapperStyle={CHART_TOOLTIP_SX.WRAPPER}
                                content={<HistogramTooltip end={end} />}
                            />

                            {valueFields.map((field, idx) => (
                                <Bar
                                    key={field}
                                    dataKey={field}
                                    stackId={"stacked-bars"}
                                    fill={YEAR_COLORS[idx % YEAR_COLORS.length]}
                                    isAnimationActive={false}>
                                    {idx === valueFields.length - 1 && (
                                        <LabelList
                                            position={"top"}
                                            dataKey={BIN_LABEL}
                                            content={this.renderLabel}
                                        />
                                    )}
                                </Bar>
                            ))}
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={12}>
                    <BinSizeSelector
                        current={this.state.binSize}
                        onChange={(newSize) =>
                            this.setState({ binSize: newSize })
                        }
                    />
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(Histogram);
