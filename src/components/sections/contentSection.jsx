import React, { Component } from "react";

import Container from "@mui/material/Container";

import ListSection from "./listSection/listSection";
import CardsSection from "./cardsSection/cardsSection";
import StatisticsSection from "./statisticsSection/statisticsSection";
import LogosSection from "./logosSection/logosSection";

class ContentSection extends Component {

    render() {
        const {
            listSections,
            cardsSections,
            statisticsSections,
            logosSections,
        } = this.props.data;
        return (
            <>
                {statisticsSections &&
                    statisticsSections.map((section) => (
                        <StatisticsSection key={section.id} data={section} />
                    ))}

                {cardsSections &&
                    cardsSections.map((section) => (
                        <CardsSection key={section.id} data={section} />
                    ))}

                {listSections &&
                    listSections.map((section) => (
                        <ListSection key={section.id} data={section} />
                    ))}

                {logosSections &&
                    logosSections.map((section) => (
                        <Container sx={{ mt: 4 }} key={section.id}>
                            <LogosSection data={section} />
                        </Container>
                    ))}
            </>
        );
    }
}
export default ContentSection;
