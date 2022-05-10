import React, { Component } from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import LANGUAGE_FLAGS from "../../lang/langIcons";
import { LANGUAGE_SELECTOR_SX } from "../../styles/sx/layoutSx";
import {
    IntlContextConsumer,
    changeLocale,
    injectIntl,
} from "gatsby-plugin-intl";

const INTL_PREFIX = "header.languages";
const ARIA_PREFIX = "ariaLabels";
class LanguageSelector extends Component {
    render() {
        const { intl } = this.props;
        const changeLanguageMessage = intl.formatMessage({
            id: `${ARIA_PREFIX}.changeLanguage`,
        })

        return (
            <FormControl>
                <IntlContextConsumer>
                    {({ languages, language: currentLang }) => (
                        <Select
                            id='language-selector'
                            aria-roledescription={changeLanguageMessage}
                            onChange={(event, newValue) =>
                                changeLocale(newValue.props.value)
                            }
                            value={currentLang}
                            sx={LANGUAGE_SELECTOR_SX.SELECTOR}
                            aria-required='true'
                            renderValue={(value) => (
                                <Box
                                    sx={LANGUAGE_SELECTOR_SX.FLAG_IN_DISPLAY}
                                    aria-label={changeLanguageMessage}
                                    role='button'>
                                    {LANGUAGE_FLAGS[value]}
                                </Box>
                            )}>
                            {Object.entries(LANGUAGE_FLAGS).map(
                                ([lang, flag]) => {
                                    const disabled = !languages.includes(lang);
                                    const langName = intl.formatMessage({
                                        id: `${INTL_PREFIX}.${lang}`,
                                    });
                                    const content = (
                                        <>
                                            {React.cloneElement(flag, {
                                                style: LANGUAGE_SELECTOR_SX.FLAG_IN_MENU_ITEM,
                                            })}
                                            {langName}
                                        </>
                                    );
                                    //All that if is just because of the tooltip
                                    if (disabled) {
                                        return (
                                            <Tooltip
                                                key={lang}
                                                id={lang}
                                                value={lang}
                                                title={intl.formatMessage({
                                                    id: `${INTL_PREFIX}.disabledReason`,
                                                })}>
                                                <Box>
                                                    <MenuItem
                                                        value={lang}
                                                        aria-label={langName}
                                                        disabled>
                                                        {content}
                                                    </MenuItem>
                                                </Box>
                                            </Tooltip>
                                        );
                                    } else {
                                        return (
                                            <MenuItem
                                                key={lang}
                                                value={lang}
                                                id={lang}
                                                aria-label={langName}>
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
