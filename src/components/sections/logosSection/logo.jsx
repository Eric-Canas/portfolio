import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import { ThemeContext } from "../../general/mainWrapper";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { TOOLTIP_ARTICLE_OPTIONS } from "../../../constants/contentfulRichTextConfig";
import { LOGO_WIDTH } from "../../../constants/graphqlFragments";
import {
    LOGOS_SECTION_SX,
    LOGO_ITEM_PROPS,
    LOGO_SVG_STYLE,
} from "../../../styles/sx/sections/logosSx";

class Logo extends Component {
    constructor(props) {
        super(props);
        //Here just for avoiding a bit of extra work, since it will never change.
        const { image } = this.props.logo;
        this.isSVG = image.file.contentType === "image/svg+xml";
        if (this.isSVG) this.thumbnail = image.file.url;
        else this.thumbnail = getImage(image);
        this.description = documentToReactComponents(
            JSON.parse(this.props.logo.description.raw),
            TOOLTIP_ARTICLE_OPTIONS
        );
    }

    render() {
        //TODO: If image have "negative on dark", apply CSS Filter invert(1)
        const { bigSize } = this.props;
        const { name, brightnessOnDarkTheme } = this.props.logo;
        const itemProps = bigSize
            ? LOGO_ITEM_PROPS.BIG_SIZE
            : LOGO_ITEM_PROPS.SMALL_SIZE;
        return (
            <ThemeContext.Consumer>
                {({ isDark }) => (
            <Tooltip title={this.description} arrow>
                <Grid item {...itemProps} sx={LOGOS_SECTION_SX.LOGO_WRAPPER}>
                    {this.isSVG ? (
                        <img
                            src={this.thumbnail}
                            alt={name}
                            loading='lazy'
                            width={LOGO_WIDTH}
                            style={{...LOGO_SVG_STYLE, filter: isDark ? `brightness(${brightnessOnDarkTheme})` : "none"}}
                        />
                    ) : (
                        <GatsbyImage image={this.thumbnail} alt={name} style={{filter: isDark ? `brightness(${brightnessOnDarkTheme})` : "none"}}/>
                    )}
                </Grid>
            </Tooltip>
            )
            }
            </ThemeContext.Consumer>
        );
    }
}
export default Logo;
