import React, { Component } from "react";

import Grid from "@mui/material/Grid";

import CardEntry from "./cardEntry";
import CategoryDivider from "../../general/categoryDivider";

import { groupData } from "../../../auxiliars/statistics/general";
import { CATEGORY } from "../../../constants/keys";
import { CARDS_SECTION_SX } from "../../../styles/sx/sections/cardsSx";

class CardsSection extends Component {
    constructor(props) {
        super(props);
        this.cardsByCategory = groupData(this.props.data.cards, CATEGORY);
    }

    render() {
        return (
            <Grid container>
                {Object.entries(this.cardsByCategory).map(
                    ([category, cards]) => (
                        <Grid item xs={12} key={category ?? "default"}>
                            {category && (
                                <CategoryDivider category={category} />
                            )}
                            <Grid
                                container
                                sx={CARDS_SECTION_SX.CARD_CONTAINER}
                                >
                                {cards.map((card) => (
                                    <CardEntry cardData={card} key={card.id} />
                                ))}
                            </Grid>
                        </Grid>
                    )
                )}
            </Grid>
        );
    }
}
export default CardsSection;
