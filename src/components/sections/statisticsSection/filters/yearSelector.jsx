import React, { Component } from "react";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

import { CHART_FILTERS_SX } from "../../../../styles/sx/sections/statisticsSx";
import {
    toLocaleOrdinal,
} from "../../../../auxiliars/strings";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "statistics.chart.filtering.years";

class YearSelector extends Component {
    constructor(props) {
        super(props);
        this.start = this.props.start;
        this.end = this.props.end;
        //Get an array of indexes from start to end
        const indexes = Array(this.end - this.start + 1)
            .fill()
            .map((_, index) => index + this.start);
        this.yearMarks = indexes.map((year) =>
            Object.fromEntries([
                ["value", year],
                ["label", toLocaleOrdinal(year, this.props.intl.locale)],
            ])
        );
    }

    render() {
        const { start, end, currentFrom, currentTo, onChange, intl } =
            this.props;
        if (this.start !== start || this.end !== end)
            console.warn(`YearSelector: start/end props have mutated!.`);
        const value = [currentFrom, currentTo];

        return (
            <FormControl sx={CHART_FILTERS_SX.FORM_CONTROL}>
                <FormLabel>
                    {intl.formatMessage({ id: `${INTL_PREFIX}.label` })}
                </FormLabel>
                <Slider
                    getAriaLabel={() =>
                        intl.formatMessage({
                            id: `${INTL_PREFIX}.sliderAriaLabel`,
                        })
                    }
                    value={value}
                    onChange={(e, newValue) => onChange(newValue)}
                    marks={this.yearMarks}
                    min={start}
                    max={end}
                    step={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value, isLast) => isLast? toLocaleOrdinal(value, intl.locale) + "/2" : toLocaleOrdinal(value, intl.locale)}
                    getAriaValueText={(value) =>
                        toLocaleOrdinal(
                            value,
                            intl.locale,
                            ` ${intl
                                .formatMessage({
                                    id: `${INTL_PREFIX}.year`,
                                })
                                .toLocaleLowerCase(intl.locale)}`
                        )
                    }
                    sx={CHART_FILTERS_SX.SLIDER}
                />
            </FormControl>
        );
    }
}
export default injectIntl(YearSelector);
