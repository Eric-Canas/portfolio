import React, { Component } from "react";

import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import ICONS, { GITHUB, LINKEDIN } from "../../constants/icons";
import {
    HEADER_GITHUB_LINK,
    HEADER_LINKEDIN_LINK,
} from "../../constants/defaults";
import { injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "header";

class ExternalLinks extends Component {

    render() {
        const { intl } = this.props;
        return (
            <>
                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{ ml: 1, mr: 1 }}
                />
                <Tooltip title={intl.formatMessage({
                            id: `${INTL_PREFIX}.linkedInTooltip`})} arrow>
                    <IconButton
                        component={Link}
                        href={HEADER_LINKEDIN_LINK}
                        target='_blank'>
                        {ICONS[LINKEDIN]}
                    </IconButton>
                </Tooltip>

                <Tooltip title={intl.formatMessage({
                            id: `${INTL_PREFIX}.gitHubTooltip`})} arrow>
                    <IconButton
                        component={Link}
                        href={HEADER_GITHUB_LINK}
                        target='_blank'>
                        {ICONS[GITHUB]}
                    </IconButton>
                </Tooltip>
            </>
        );
    }
}
export default injectIntl(ExternalLinks);
