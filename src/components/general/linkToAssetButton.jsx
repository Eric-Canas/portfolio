import React, { Component } from "react";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import ICONS, { PDF } from "../../constants/icons";
import { injectIntl } from "gatsby-plugin-intl";

const ARIA_PREFIX = "ariaLabels";

class LinkToAssetButton extends Component {
    render() {
        const { asset, fullWidth, text, variant, intl } = this.props;
        const isPDF = asset.contentType.endsWith("pdf");
        const icon = isPDF ? ICONS[PDF] : null;
        return (
            <Button
                component={Link}
                href={asset.url}
                startIcon={icon}
                fullWidth={fullWidth}
                variant={variant}
                target='_blank'
                aria-label={intl.formatMessage(
                    {
                        id: `${ARIA_PREFIX}.toAsset`,
                    },
                    { text: text, pdf: isPDF ? "PDF" : "" }
                )}>
                {text}
            </Button>
        );
    }
}
export default injectIntl(LinkToAssetButton);
