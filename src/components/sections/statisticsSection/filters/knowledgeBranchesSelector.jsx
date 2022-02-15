import React, { Component } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import cloneDeep from "lodash/cloneDeep";
import KnowledgeBranchesFilterContent from "./formFields/knowledgeBranchesFilterContent";

import { LOCALE_OTHER } from "../../../../constants/defaults";
import { FULL_WIDTH_SELECTOR } from "../../../../styles/sx/layoutSx";
import { CHART_FILTERS_SX } from "../../../../styles/sx/sections/statisticsSx";
import { injectIntl } from "gatsby-plugin-intl";

export const INTL_PREFIX = "statistics.chart.filtering.branchesOfKnowledge";

class KnowledgeBranchesSelector extends Component {
    constructor(props) {
        super(props);

        this.onChangeOption = this.onChangeOption.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    onChangeOption(option, newChecked) {
        const { optionsState, isStateValid } = this.props;
        //This way avoids alterations in the order of the options
        const currentOptions = cloneDeep(optionsState);
        currentOptions[option] = newChecked;
        if (isStateValid(currentOptions)) this.props.onChange(currentOptions);
    }

    onUpdate(reason, option) {
        if (reason === "removeOption")
            this.onChangeOption(option.option, false);
        else if (reason === "selectOption")
            this.onChangeOption(option.option, true);
    }

    getOptions() {
        const { optionsState, availableOptionsSet, colors, intl } = this.props;
        const { locale } = intl;
        const fallback = LOCALE_OTHER(locale);
        const options = Object.entries(optionsState).map(([option, active]) =>
            Object.fromEntries([
                ["option", option],
                ["active", active],
                ["disabled", !availableOptionsSet.has(option)],
                ["color", colors[option]],
            ])
        );
        //Sort by enabled and then alphabetically
        return options.sort((a, b) => {
            if (a.disabled !== b.disabled) return a.disabled - b.disabled;
            else if (a.option === fallback) return 1;
            else if (b.option === fallback) return -1;
            else return a.option.localeCompare(b.option, locale);
        });
    }

    render() {
        const { intl } = this.props;
        const options = this.getOptions();
        const value = options.filter((option) => option.active);
        const allSelected = options.every(
            (option) => option.active || option.disabled
        );
        return (
            <FormControl sx={FULL_WIDTH_SELECTOR.CONTAINER}>
                <Autocomplete
                    multiple
                    fullWidth
                    disableClearable
                    disableCloseOnSelect={!allSelected}
                    filterSelectedOptions={!allSelected}
                    getOptionDisabled={(option) => option.disabled}
                    getOptionLabel={(option) => option.option}
                    renderTags={(value, getTagProps) => (
                        <KnowledgeBranchesFilterContent
                            selection={options}
                            contentClassName={getTagProps(0).className}
                            deleteTag={(tag) => this.onChangeOption(tag, false)}
                        />
                    )}
                    options={options}
                    value={value}
                    onChange={(event, value, reason, target) =>
                        this.onUpdate(reason, target.option)
                    }
                    renderInput={(params) => (
                        <>
                            <FormControl sx={CHART_FILTERS_SX.FORM_CONTROL}>
                                <FormLabel>
                                    {intl.formatMessage({
                                        id: `${INTL_PREFIX}.label`,
                                    })}
                                </FormLabel>
                                <TextField
                                    {...params}
                                    placeholder={intl.formatMessage({
                                        id: `${INTL_PREFIX}.${
                                            allSelected
                                                ? "hideABranch"
                                                : "addABranch"
                                        }`,
                                    })}
                                />
                            </FormControl>
                        </>
                    )}
                />
            </FormControl>
        );
    }
}
export default injectIntl(KnowledgeBranchesSelector);
