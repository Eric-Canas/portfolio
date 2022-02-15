import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Histogram from "./charts/histogram/histogram";
import Pie from "./charts/pie/pie";
import Line from "./charts/line/line";
import {
    ACADEMIC_YEAR,
    CATEGORICAL_MARK,
    HISTOGRAM,
    KNOWLEDGE_BRANCH,
    LINE,
    MAX,
    MIN,
    PIE,
} from "../../../constants/keys";
import { CHARTS_SX } from "../../../styles/sx/sections/statisticsSx";
import {
    filterDataByGroup,
    filterDataByRange,
    filterDataBySet,
    getlimitOfData,
} from "../../../auxiliars/statistics/general";
import ChartFilters, {
    availableKnowledgeBranches,
    getValidKnowledgeBranchesState,
} from "./chartFilters";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart";
const DEFAULT_KNOWLEDGE_BRANCHES_CHECK = true;

class Chart extends Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.allKnowledgeBranches = availableKnowledgeBranches(data, false);
        const knowledgeBranchesState = Object.fromEntries(
            this.allKnowledgeBranches.map((branch) => [
                branch,
                DEFAULT_KNOWLEDGE_BRANCHES_CHECK,
            ])
        );
        this.state = {
            fromYear: getlimitOfData(data, ACADEMIC_YEAR, MIN),
            toYear: getlimitOfData(data, ACADEMIC_YEAR, MAX),
            knowledgeBranchesState: knowledgeBranchesState,
            openGrade: null,
        };

        //Ref is used to let all the filter validity logic be in chartFilter
        this.stateValidityRef = React.createRef();

        this.filterByYear = this.filterByYear.bind(this);
        this.getCheckedKnowledgeBranches =
            this.getCheckedKnowledgeBranches.bind(this);
        this.updateOpenGrade = this.updateOpenGrade.bind(this);
        this.updateKnowledgeBranches = this.updateKnowledgeBranches.bind(this);
    }

    updateKnowledgeBranches(newKnowledgeBranchesState) {
        this.setState({
            knowledgeBranchesState: newKnowledgeBranchesState,
        });
        this.forceUpdate(); //As it is an object, it is not always updated
    }

    getCheckedKnowledgeBranches(state = null) {
        state = state ?? this.state.knowledgeBranchesState;
        //Gets all the keys of the state that are checked
        return Object.entries(this.state.knowledgeBranchesState)
            .filter(([, value]) => value)
            .map(([key]) => key);
    }

    updateOpenGrade(newGrade) {
        const { data, intl } = this.props;
        const { knowledgeBranchesState } = this.state;
        const newState = { openGrade: newGrade };
        if (newGrade !== null) {
            let nextFilteredData = filterDataByGroup(
                data,
                newGrade,
                CATEGORICAL_MARK
            );
            nextFilteredData = this.filterByYear(nextFilteredData);
            const availableBranchesSet = availableKnowledgeBranches(
                nextFilteredData,
                true
            );

            const willBeValid = this.stateValidityRef.current.isStateValid(
                knowledgeBranchesState,
                availableBranchesSet,
                intl.formatMessage({
                    id: `${INTL_PREFIX}.filtering.warns.branchOfKnowledgeRestarted`,
                }),
                "warning"
            );
            if (!willBeValid)
                newState.knowledgeBranchesState =
                    getValidKnowledgeBranchesState(
                        knowledgeBranchesState,
                        availableBranchesSet
                    );
        }
        this.setState(newState);
    }

    filterByYear(data) {
        const { fromYear, toYear } = this.state;
        return filterDataByRange(data, fromYear, toYear, ACADEMIC_YEAR);
    }

    render() {
        const { data, type, intl } = this.props;
        const { openGrade } = this.state;

        const gradeFilteredData =
            openGrade !== null
                ? filterDataByGroup(data, openGrade, CATEGORICAL_MARK)
                : data;
        const yearFilteredData = this.filterByYear(gradeFilteredData);

        const filteredData = filterDataBySet(
            yearFilteredData,
            this.getCheckedKnowledgeBranches(),
            KNOWLEDGE_BRANCH
        );

        return (
            <Grid
                container
                component={Paper}
                elevation={2}
                sx={CHARTS_SX.OUTER_CONTAINER}>
                {filteredData.length > 0 ? (
                    <>
                        {type === HISTOGRAM && (
                            <Histogram data={filteredData} />
                        )}
                        {type === PIE && (
                            <Pie
                                data={filteredData}
                                openGrade={openGrade}
                                updateOpenGrade={this.updateOpenGrade}
                            />
                        )}
                        {type === LINE && <Line data={filteredData} />}
                    </>
                ) : (
                    <Typography
                        variant='h3'
                        align='center'
                        color='text.primary'>
                        {intl.formatMessage({
                            id: `${INTL_PREFIX}.filtering.warns.noFilteringInfo`,
                        })}
                    </Typography>
                )}
                <Grid item xs={12}>
                    <ChartFilters
                        unfilteredData={data}
                        gradeFilteredData={gradeFilteredData}
                        yearFilteredData={yearFilteredData}
                        {...this.state}
                        updateYearsRange={(from, to) =>
                            this.setState({ fromYear: from, toYear: to })
                        }
                        updateKnowledgeBranches={this.updateKnowledgeBranches}
                        updateOpenGrade={this.updateOpenGrade}
                        updateState={(newState) => this.setState(newState)}
                        ref={this.stateValidityRef}
                        //Just give it here for avoiding probles with the ref
                        intl={intl}
                    />
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(Chart);
