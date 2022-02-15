import React, { Component } from "react";

import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ModalBody from "./modalElements/modalBody";
import ModalHeader from "./modalElements/modalHeader";
import ModalFooter from "./modalElements/modalFooter";

import { generateID } from "../../../../auxiliars/strings";
import { MODAL_SX } from "../../../../styles/sx/sections/cardsSx";

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.id = "modal-" + generateID();
        this.titleID = `${this.id}-title`;
        this.descriptionID = `${this.id}-description`;
    }

    render() {
        const {
            title,
            imagesCarousel,
            detailedDescription,
            linkButtons,
            logosSections,
            carouselTime
        } = this.props.data;
        const description = detailedDescription.raw;
        const { open, onClose } = this.props;
        return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby={this.titleID}
                aria-describedby={this.descriptionID}>
                <Grid container component={Paper} sx={MODAL_SX.WRAPPER}>
                    <ModalHeader images={imagesCarousel} interval={carouselTime} />

                    <ModalBody
                        title={title}
                        titleID={this.titleID}
                        description={description}
                        descriptionID={this.descriptionID}
                        logosSections={logosSections}
                    />

                    <ModalFooter linkButtons={linkButtons} close={onClose} />
                </Grid>
            </Modal>
        );
    }
}
export default CardModal;
