import React, { Component } from "react";

import Grid from "@mui/material/Grid";

import KnowledgeBranchesSelector from "./filters/knowledgeBranchesSelector";
import YearSelector from "./filters/yearSelector";
import ErrorSnackbar from "./filters/errorSnackbar";

import cloneDeep from "lodash/cloneDeep";
import {
    ACADEMIC_YEAR,
    KNOWLEDGE_BRANCH,
    MAX,
    MIN,
} from "../../../constants/keys";
import { LOCALE_OTHER } from "../../../constants/defaults";
import { CHART_FILTERS_SX, FILTER_PROPS_SX } from "../../../styles/sx/sections/statisticsSx";
import {
    filterDataByRange,
    getlimitOfData,
    getUniqueValues,
} from "../../../auxiliars/statistics/general";
import { toLocaleOrdinal } from "../../../auxiliars/strings";

const INTL_PREFIX = "statistics.chart.filtering.warns";

class ChartFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            severity: "error",
        };
        const { unfilteredData } = this.props;
        this.branchOfKnowledgeColors = Object.fromEntries(
            unfilteredData.map((sample) => [
                sample[KNOWLEDGE_BRANCH],
                sample[`${KNOWLEDGE_BRANCH}Color`],
            ])
        );
        this.initialYear = getlimitOfData(unfilteredData, ACADEMIC_YEAR, MIN);
        this.finalYear = getlimitOfData(unfilteredData, ACADEMIC_YEAR, MAX);

        this.isStateValid = this.isStateValid.bind(this);
        this.updateYearsRange = this.updateYearsRange.bind(this);
    }

    isStateValid(state, availableBranches, error = null, severity = "error") {
        if (Array.isArray(availableBranches))
            availableBranches = new Set(availableBranches);
        //Consider as valid if there will be at least one selected branch
        const isValid = Object.entries(state).some(
            ([branch, active]) => active && availableBranches.has(branch)
        );
        if (!isValid && error !== this.state.errorMessage) {
            this.setState({
                errorMessage: error,
                severity: severity,
            });
        }
        return isValid;
    }

    updateYearsRange(from, to, usingGrade = true) {
        const {
            gradeFilteredData,
            knowledgeBranchesState,
            unfilteredData,
            openGrade,
            updateOpenGrade,
            updateYearsRange,
            updateKnowledgeBranches,
            intl,
        } = this.props;
        const data = cloneDeep(usingGrade ? gradeFilteredData : unfilteredData);
        const branchesState = cloneDeep(knowledgeBranchesState);
        const yearFiltered = filterDataByRange(data, from, to, ACADEMIC_YEAR);
        if (usingGrade && openGrade !== null && yearFiltered.length === 0) {
            const error = intl.formatMessage(
                {
                    id: `${INTL_PREFIX}.noGradeBetweenYears`,
                },
                {
                    g: openGrade.toLocaleLowerCase(intl.locale),
                    from: toLocaleOrdinal(from, intl.locale),
                    to: toLocaleOrdinal(to, intl.locale),
                }
            );
            this.setState({
                errorMessage: error,
                severity: "warning",
            });
            updateOpenGrade(null);
            this.updateYearsRange(from, to, false);
            return;
        }
        const newAvailableBranchesSet = availableKnowledgeBranches(
            yearFiltered,
            true
        );

        const willBeValid = this.isStateValid(
            branchesState,
            newAvailableBranchesSet,
            intl.formatMessage({
                id: `${INTL_PREFIX}.branchOfKnowledgeRestarted`,
            }),
            "warning"
        );

        updateYearsRange(from, to);
        if (!willBeValid) {
            updateKnowledgeBranches(
                getValidKnowledgeBranchesState(
                    branchesState,
                    newAvailableBranchesSet
                )
            );
        }
    }

    render() {
        const { yearFilteredData } = this.props;
        const { fromYear, toYear, knowledgeBranchesState, intl } = this.props;
        const availableBranches = availableKnowledgeBranches(
            yearFilteredData,
            true
        );

        return (
            <>
                <Grid
                    container
                    spacing={1}
                    sx={CHART_FILTERS_SX.OUTER_CONTAINER}>
                    <Grid item {...FILTER_PROPS_SX.GRID_ITEM}>
                        <YearSelector
                            start={this.initialYear}
                            end={this.finalYear}
                            currentFrom={fromYear}
                            currentTo={toYear}
                            onChange={([from, to]) =>
                                this.updateYearsRange(from, to)
                            }
                        />
                    </Grid>
                    <Grid item {...FILTER_PROPS_SX.GRID_ITEM}>
                        <KnowledgeBranchesSelector
                            optionsState={knowledgeBranchesState}
                            availableOptionsSet={availableBranches}
                            isStateValid={(state) =>
                                this.isStateValid(
                                    state,
                                    availableBranches,
                                    intl.formatMessage({
                                        id: `${INTL_PREFIX}.doNotHideAllBranches`,
                                    }),
                                    "error"
                                )
                            }
                            colors={this.branchOfKnowledgeColors}
                            onChange={(newOptionsState) =>
                                this.props.updateKnowledgeBranches(
                                    newOptionsState
                                )
                            }
                        />
                    </Grid>
                </Grid>
                <ErrorSnackbar
                    isOpen={this.state.errorMessage !== null}
                    message={this.state.errorMessage}
                    severity={this.state.severity}
                    close={() => this.setState({ errorMessage: null })}
                />
            </>
        );
    }
}
export default ChartFilters;

export function getValidKnowledgeBranchesState(
    currentState,
    availableBranchesSet
) {
    return Object.fromEntries(
        Object.keys(currentState).map((branch) => [
            branch,
            currentState[branch] || availableBranchesSet.has(branch),
        ])
    );
}

export function availableKnowledgeBranches(data, asSet = true, locale = "en") {
    return getUniqueValues(
        data,
        KNOWLEDGE_BRANCH,
        false,
        LOCALE_OTHER(locale),
        asSet
    );
}
