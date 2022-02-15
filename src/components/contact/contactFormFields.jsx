import React, { Component } from "react";

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { injectIntl } from "gatsby-plugin-intl"

const INTL_PREFIX = "contact.formFields"

class ContactFormFields extends Component {

    render() {
        const { intl } = this.props;
        return (
            <>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <TextField
                            type="text"
                            label={intl.formatMessage({ id: `${INTL_PREFIX}.name.label` })}
                            name='name'
                            placeholder={intl.formatMessage({ id: `${INTL_PREFIX}.name.placeholder` })}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                         required
                            type='email'
                            label={intl.formatMessage({ id: `${INTL_PREFIX}.email.label` })}
                            name='email'
                            placeholder={intl.formatMessage({ id: `${INTL_PREFIX}.email.placeholder` })}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            autoComplete='off'
                            label={intl.formatMessage({ id: `${INTL_PREFIX}.subject.label` })}
                            name='subject'
                            multiline
                            maxRows={2}
                            placeholder={intl.formatMessage({ id: `${INTL_PREFIX}.subject.placeholder` })}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            autoComplete='off'
                            label={intl.formatMessage({ id: `${INTL_PREFIX}.message.label` })}
                            name='message'
                            placeholder={intl.formatMessage({ id: `${INTL_PREFIX}.message.placeholder` })}
                            multiline
                            minRows={4}
                        />
                    </FormControl>
                </Grid>
                <input type='hidden' name='_gotcha' />
            </>
        );
    }
}
export default injectIntl(ContactFormFields);
