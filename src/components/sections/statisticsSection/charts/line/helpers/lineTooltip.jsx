import React, { Component } from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";

import ListSubjectEntry from "../../helpers/listSubjectEntry";

import { getLimitSubjectsByYearAndSemester } from "../../../../../../auxiliars/statistics/line";
import {
    BEST_SUBJECTS_TO_SHOW_IN_LINE_CHART,
    DECIMALS,
    WORST_SUBJECTS_TO_SHOW_IN_LINE_CHART,
} from "../../../../../../constants/defaults";
import { AVERAGE_MARK, BEST, WORST } from "../../../../../../constants/keys";
import {
    CHART_ITEM_PROPS,
    CHART_TOOLTIP_SX,
} from "../../../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.line";

class LineTooltip extends Component {
    render() {
        const { active, payload } = this.props;
        if (active && payload && payload.length) {
            const { year, semester } = payload[0].payload;
            const { data, intl } = this.props;
            const avgMark = payload[0].payload[AVERAGE_MARK];

            const bestSamples = getLimitSubjectsByYearAndSemester(
                data,
                year,
                semester,
                BEST_SUBJECTS_TO_SHOW_IN_LINE_CHART,
                BEST
            );
            let worstSamples = getLimitSubjectsByYearAndSemester(
                data,
                year,
                semester,
                WORST_SUBJECTS_TO_SHOW_IN_LINE_CHART,
                WORST
            );
            const bestSamplesIds = bestSamples.map((sample) => sample.id);
            worstSamples = worstSamples.filter(
                (sample) => !bestSamplesIds.includes(sample.id)
            );
            if (
                isNaN(avgMark) ||
                (bestSamples.length === 0 && worstSamples.length === 0)
            )
                return null;
            else
                return (
                    <List
                        {...CHART_ITEM_PROPS.TOOLTIP_LIST}
                        sx={CHART_TOOLTIP_SX.LIST}>
                        <Typography align='center'>
                            x̄:{" "}
                            {parseFloat(
                                avgMark.toFixed(DECIMALS)
                            ).toLocaleString(intl.locale)}
                        </Typography>
                        <Divider sx={CHART_TOOLTIP_SX.LIST_HEADER} />
                        <ListSubheader sx={CHART_TOOLTIP_SX.LIST_SUBHEADER}>
                            {intl.formatMessage({ id: `${INTL_PREFIX}.best` })}
                        </ListSubheader>
                        {bestSamples.map((sample) => (
                            <ListSubjectEntry sample={sample} key={sample.id} />
                        ))}
                        {worstSamples.length > 0 && (
                            <>
                                <ListSubheader
                                    sx={CHART_TOOLTIP_SX.LIST_SUBHEADER}>
                                    {intl.formatMessage({ id : `${INTL_PREFIX}.worst` })}
                                </ListSubheader>
                                {worstSamples.map((sample) => (
                                    <ListSubjectEntry
                                        sample={sample}
                                        key={sample.id}
                                    />
                                ))}
                            </>
                        )}
                    </List>
                );
        } else return null;
    }
}
export default injectIntl(LineTooltip);
