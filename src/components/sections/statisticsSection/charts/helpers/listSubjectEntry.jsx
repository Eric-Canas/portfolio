import React, { Component } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { NUMERICAL_MARK, SUBJECT } from "../../../../../constants/keys";
import { CHART_TOOLTIP_SX } from "../../../../../styles/sx/sections/statisticsSx";
import {injectIntl} from "gatsby-plugin-intl";

class ListSubjectEntry extends Component {
    constructor(props) {
        super(props);
        this.getSampleString = this.getSampleString.bind(this);
    }

    getSampleString(sample, includeMark = true) {
        const {locale} = this.props.intl;
        const subject = sample[SUBJECT];
        const mark = parseFloat(sample[NUMERICAL_MARK]);
        return includeMark ? `${subject}: ${mark.toLocaleString(locale)}` : subject;
    }

    render() {
        const { sample } = this.props;
        return (
            <ListItem key={sample.id} sx={CHART_TOOLTIP_SX.LIST_ITEM}>
                <ListItemText
                    primary={this.getSampleString(sample)}
                    sx={CHART_TOOLTIP_SX.TEXT}
                />
            </ListItem>
        );
    }
}
export default injectIntl(ListSubjectEntry);
