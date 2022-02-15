import React, { Component } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Chart from "./chart";
import LinkToAssetButton from "../../general/linkToAssetButton";

import { sortArray, unnestData } from "../../../auxiliars/statistics/general";
import { CHARTS_SX } from "../../../styles/sx/sections/statisticsSx";
import { NUMERICAL_MARK } from "../../../constants/keys";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics";

class StatisticsSection extends Component {
    
    render() {
        const { intl } = this.props;
        const { charts, data, certificate } = this.props.data;
        const unnestedData = sortArray(unnestData(data), NUMERICAL_MARK);
        return (
            <Container>
                {charts.map((chart) => (
                    <Chart data={unnestedData} type={chart} key={chart} />
                ))}
                {certificate && (
                    <Grid container sx = {CHARTS_SX.OUTER_CONTAINER}>
                    <LinkToAssetButton
                        asset={certificate.file}
                        text={intl.formatMessage({ id: `${INTL_PREFIX}.certificate` })}
                        variant='text'
                        fullWidth
                    />
                    </Grid>
                )}
            </Container>
        );
    }
}
export default injectIntl(StatisticsSection);
