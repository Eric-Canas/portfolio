import React, { Component } from "react";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { ALERT_DURATION } from "../../../../constants/GUIConstants";
import { ALERTS_SX } from "../../../../styles/sx/layoutSx";

class ErrorSnackbar extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose(event, reason) {
        if (reason !== "clickaway") this.props.close();
    }

    render() {
        const { isOpen, message, close, severity } = this.props;
        return (
            <Snackbar
                open={isOpen}
                autoHideDuration={ALERT_DURATION}
                onClose={this.onClose}>
                <Alert
                    onClose={close}
                    severity={severity}
                    sx={ALERTS_SX.ALERT}>
                    {message}
                </Alert>
            </Snackbar>
        );
    }
}
export default ErrorSnackbar;
