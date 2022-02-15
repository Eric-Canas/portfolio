import React, { Component } from "react";

import Grid from "@mui/material/Grid";

import PieTooltip from "./helpers/pieTooltip";
import PieHeader from "./helpers/pieHeader";

import {
    ResponsiveContainer,
    PieChart,
    Pie as PieInner,
    Text,
    Cell,
    Label,
    Tooltip,
} from "recharts";
import {
    computePieSectors,
    getPieSectorsModeIdx,
} from "../../../../../auxiliars/statistics/pie";
import { filterDataByGroup } from "../../../../../auxiliars/statistics/general";
import {
    ECTS,
    PIE_COUNT,
    PIE_GROUP,
    CATEGORICAL_MARK,
    KNOWLEDGE_BRANCH,
    PIE_COLOR,
} from "../../../../../constants/keys";
import { saturateHex } from "../../../../../auxiliars/strings";
import {
    CHARTS_SX,
    CHART_TOOLTIP_SX,
    CHART_ITEM_PROPS,
    CHART_RESPONSIVE_CONTAINER_PROPS,
} from "../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const LABELS_SATURATION = 1;
const INTL_PREFIX = "statistics.chart.pie";

class Pie extends Component {
    constructor(props) {
        super(props);

        this.labelHandler = this.labelHandler.bind(this);
        this.onClickSector = this.onClickSector.bind(this);
    }

    onClickSector(sectorData) {
        const { openGrade, updateOpenGrade } = this.props;
        if (openGrade === null) {
            updateOpenGrade(sectorData[PIE_GROUP]);
        }
    }

    labelHandler(sectorData) {
        const { innerRadius, outerRadius, cx, cy, name, midAngle, fill } =
            sectorData;
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <Text
                x={x}
                y={y}
                fill={saturateHex(fill, LABELS_SATURATION)}
                key={name}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline='central'>
                {name}
            </Text>
        );
    }

    render() {
        const { data, openGrade, updateOpenGrade, intl } = this.props;
        const chartId = openGrade ?? "default";
        const groupKey = openGrade ? KNOWLEDGE_BRANCH : CATEGORICAL_MARK;
        const chartData = !openGrade
            ? data
            : filterDataByGroup(data, openGrade, CATEGORICAL_MARK);
        const sectors = computePieSectors(chartData, ECTS, groupKey);
        const modeIdx = getPieSectorsModeIdx(sectors);
        const mode = `${intl.formatMessage({ id: `${INTL_PREFIX}.mode` })}: ${
            sectors[modeIdx][PIE_GROUP]
        }`;

        return (
            <Grid container sx={CHARTS_SX.INNER_CONTAINER}>
                <Grid item {...CHART_ITEM_PROPS.HEADER}>
                    <PieHeader
                        subGroup={openGrade}
                        onClickComebackButton={() => updateOpenGrade(null)}
                    />
                </Grid>
                <Grid
                    item
                    {...CHART_ITEM_PROPS.PIE}
                    sx={CHARTS_SX.PIE_CONTAINER}>
                    <ResponsiveContainer
                        {...CHART_RESPONSIVE_CONTAINER_PROPS.CIRCULAR}>
                        <PieChart key={chartId}>
                            <PieInner
                                data={sectors}
                                dataKey={PIE_COUNT}
                                nameKey={PIE_GROUP}
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={1}
                                label={this.labelHandler}
                                onClick={this.onClickSector}
                                cursor={openGrade ? "default" : "pointer"}
                                isAnimationActive={false}>
                                {sectors.map((sector) => (
                                    <Cell
                                        key={sector[PIE_GROUP]}
                                        fill={sector[PIE_COLOR]}
                                    />
                                ))}
                                <Label
                                    value={mode}
                                    width={85}
                                    position='center'
                                    fill={saturateHex(
                                        sectors[modeIdx][PIE_COLOR],
                                        LABELS_SATURATION
                                    )}
                                />
                            </PieInner>
                            <Tooltip
                                wrapperStyle={CHART_TOOLTIP_SX.WRAPPER}
                                content={
                                    <PieTooltip
                                        data={chartData}
                                        groupKey={groupKey}
                                    />
                                }
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(Pie);
