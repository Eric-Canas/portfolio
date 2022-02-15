import React, { Component } from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import LANGUAGE_FLAGS from "../../lang/langIcons";
import { LANGUAGE_SELECTOR_SX } from "../../styles/sx/layoutSx";
import { IntlContextConsumer, changeLocale, injectIntl } from "gatsby-plugin-intl";

const INTL_PREFIX = "header.languages";

class LanguageSelector extends Component {

    render() {
        const { intl } = this.props;
        return (
            <FormControl>
                <IntlContextConsumer>
                    {({ languages, language: currentLang }) => (
                        <Select
                            id='languages-selector'
                            onChange={(event, newValue) =>
                                changeLocale(newValue.props.value)
                            }
                            value={currentLang}
                            sx={LANGUAGE_SELECTOR_SX.SELECTOR}
                            renderValue={(value) => (
                                <Box sx={LANGUAGE_SELECTOR_SX.FLAG_IN_DISPLAY}>
                                    {LANGUAGE_FLAGS[value]}
                                </Box>
                            )}>
                            {Object.entries(LANGUAGE_FLAGS).map(
                                ([lang, flag]) => {
                                    const disabled = !languages.includes(lang);
                                    const content = (
                                        <>
                                            {React.cloneElement(flag, {
                                                style: LANGUAGE_SELECTOR_SX.FLAG_IN_MENU_ITEM,
                                            })}
                                            {intl.formatMessage({ id: `${INTL_PREFIX}.${lang}` })}
                                        </>
                                    );
                                    //All that if is just because of the tooltip
                                    if (disabled) {
                                        return (
                                            <Tooltip
                                                key={lang}
                                                value={lang}
                                                title={intl.formatMessage({
                                                    id: `${INTL_PREFIX}.disabledReason`,
                                                })}>
                                                <Box>
                                                    <MenuItem
                                                        value={lang}
                                                        disabled>
                                                        {content}
                                                    </MenuItem>
                                                </Box>
                                            </Tooltip>
                                        );
                                    } else {
                                        return (
                                            <MenuItem key={lang} value={lang}>
                                                {content}
                                            </MenuItem>
                                        );
                                    }
                                }
                            )}
                        </Select>
                    )}
                </IntlContextConsumer>
            </FormControl>
        );
    }
}
export default injectIntl(LanguageSelector);
