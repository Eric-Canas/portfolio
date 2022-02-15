import React, { Component } from "react";

import Chip from "@mui/material/Chip";

import { sortByColor } from "../../../../../auxiliars/statistics/general";
import { CHART_FILTERS_SX } from "../../../../../styles/sx/sections/statisticsSx";

class KnowledgeBranchesFilterContent extends Component {

    render() {
        const { selection, contentClassName, deleteTag, colors } = this.props;
        let active = selection.filter(
            (option) => option.active && !option.disabled
        );
        const allSelected = selection.every(
            (option) => option.active || option.disabled
        );
        active = sortByColor(active, colors);
        return (
            <>
                {!allSelected &&
                    active.map((option) => (
                        <Chip
                            key={option.option}
                            label={option.option}
                            onDelete={() => deleteTag(option.option)}
                            className={contentClassName}
                            sx={{
                                bgcolor: option.color,
                                ...CHART_FILTERS_SX.BRANCH_OF_KNOWLEDGE_CHIP,
                            }}
                        />
                    ))}
            </>
        );
    }
}
export default KnowledgeBranchesFilterContent;
