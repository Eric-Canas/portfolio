import React, { Component } from "react";

import Card from "./elements/card";
import CardModal from "./elements/cardModal";

class CardEntry extends Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
    }

    render() {
        const {
            mainImage,
            title,
            moreDetailsModal: modal,
            shortDescription,
        } = this.props.cardData;

        return (
            <>
                <Card
                    image={mainImage}
                    title={title}
                    description={shortDescription.shortDescription}
                    action={() => modal? this.setState({ isModalOpen: true }) : null}
                />
                {modal && (
                    <CardModal
                        data={modal}
                        open = {this.state.isModalOpen}
                        onClose = {() => this.setState({isModalOpen: false})}
                    />
                )}
            </>
        );
    }
}
export default CardEntry;
