import React, { Component } from "react";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { LEFT, RIGHT } from "../../../../../constants/keys";
import {
    CAROUSEL_ITEM_PROPS,
    MODAL_CAROUSEL_SX,
    MODAL_SX,
} from "../../../../../styles/sx/sections/cardsSx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { injectIntl } from "gatsby-plugin-intl";


const INTL_PREFIX = "cards.modal.header";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class ModalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { step: 0 };
        this.thumbnails = this.props.images.map((image) => getImage(image));
        //Swippeable images does need it to be set
        this.thumbnailsSrc = this.thumbnails.map(
            (thumbnail) => thumbnail.images.sources[0].srcSet
        );
        this.onStepChange = this.onStepChange.bind(this);
        this.getButton = this.getButton.bind(this);
    }

    onStepChange(nextStep, currentStep) {
        this.setState({ step: nextStep });
    }

    getButton(direction = LEFT, disabled = false) {
        if (direction !== LEFT && direction !== RIGHT)
            throw new Error(
                `Invalid direction: ${direction}. Must be ${LEFT} or ${RIGHT}`
            );
        const { step } = this.state;
        return (
            <IconButton
                key={direction}
                sx={MODAL_CAROUSEL_SX.CONTROLS}
                {...CAROUSEL_ITEM_PROPS.ICON_BUTTON}
                onClick={() =>
                    this.onStepChange(direction === LEFT ? step - 1 : step + 1)
                }
                disabled={disabled}>
                {direction === LEFT ? (
                    <KeyboardArrowLeft sx={MODAL_CAROUSEL_SX.CONTROLS_ICON} />
                ) : (
                    <KeyboardArrowRight sx={MODAL_CAROUSEL_SX.CONTROLS_ICON} />
                )}
            </IconButton>
        );
    }

    render() {
        const { images, interval, intl } = this.props;
        const { step } = this.state;

        const previousImageTooltip = intl.formatMessage(
            { id: `${INTL_PREFIX}.previousImage` },
            { index: step + 1 - 1, total: images.length }
        );
        const nextImageTooltip = intl.formatMessage(
            { id: `${INTL_PREFIX}.nextImage` },
            { index: step + 1 + 1, total: images.length }
        );
        const disabledPrevious = step === 0;
        const disabledNext = step === images.length - 1;
        const previousButton = this.getButton(LEFT, disabledPrevious);
        const nextButton = this.getButton(RIGHT, disabledNext);
        return (
            <Grid item sx={MODAL_SX.HEADER} component='header'>
                <AutoPlaySwipeableViews
                    index={step}
                    onChangeIndex={this.onStepChange}
                    interval={interval*1000}
                    {...CAROUSEL_ITEM_PROPS.WRAPPER}>
                    {images.map((image, idx) => (
                        <ImageListItem key={image.id}>
                            <GatsbyImage
                                image={this.thumbnails[idx]}
                                src={this.thumbnailsSrc[idx]}
                                alt={image.title}
                            />
                            <ImageListItemBar
                                sx={MODAL_CAROUSEL_SX.IMAGE_INFO_BAR}
                                title={image.title}
                                subtitle={image.description}
                                {...CAROUSEL_ITEM_PROPS.IMAGE_CAPTION}
                            />
                        </ImageListItem>
                    ))}
                </AutoPlaySwipeableViews>

                <Grid container sx={MODAL_CAROUSEL_SX.CONTROLS_WRAPPER}>
                    {!disabledPrevious ? (
                        <Tooltip title={previousImageTooltip}>
                            {previousButton}
                        </Tooltip>
                    ) : (
                        previousButton
                    )}
                    {!disabledNext ? (
                        <Tooltip title={nextImageTooltip}>{nextButton}</Tooltip>
                    ) : (
                        nextButton
                    )}
                </Grid>
            </Grid>
        );
    }
}
export default injectIntl(ModalHeader);
