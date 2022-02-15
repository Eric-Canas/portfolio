import React, { Component } from "react";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import ICONS, { PDF } from "../../constants/icons";

class LinkToAssetButton extends Component {

    render() {
        const { asset, fullWidth, text, variant } = this.props;
        const icon = asset.contentType.endsWith("pdf") ? ICONS[PDF] : null;
        return (
            <Button
                component={Link}
                href={asset.url}
                startIcon={icon}
                fullWidth={fullWidth}
                variant={variant}
                target="_blank">
                {text}
            </Button>
        );
    }
}
export default LinkToAssetButton;
