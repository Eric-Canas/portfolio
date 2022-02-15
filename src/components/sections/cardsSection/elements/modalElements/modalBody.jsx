import React, { Component } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LogosSection from "../../../logosSection/logosSection";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MODAL_ARTICLE_OPTIONS } from "../../../../../constants/contentfulRichTextConfig";
import {
    MODAL_BODY_PROPS,
    MODAL_SX,
} from "../../../../../styles/sx/sections/cardsSx";

class ModalBody extends Component {

    render() {
        const { title, titleID, description, descriptionID, logosSections } =
            this.props;
        return (
            <Grid container sx={MODAL_SX.CONTENT}>
                <Grid item {...MODAL_BODY_PROPS.TITLE_WRAPPER}>
                    <Typography id={titleID} {...MODAL_BODY_PROPS.TITLE}>
                        {title}
                    </Typography>
                </Grid>

                <Grid
                    item
                    {...MODAL_BODY_PROPS.DESCRIPTION_WRAPPER}
                    id={descriptionID}
                    sx={MODAL_SX.DESCRIPTION}>
                    {documentToReactComponents(
                        JSON.parse(description),
                        MODAL_ARTICLE_OPTIONS
                    )}
                </Grid>

                {logosSections && logosSections.map((logosSection) => (
                    <Grid
                        item
                        {...MODAL_BODY_PROPS.LOGOS_WRAPPER}
                        key={logosSection.id}
                        sx={MODAL_SX.LOGOS_SECTION}>
                        <LogosSection data={logosSection} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}
export default ModalBody;
