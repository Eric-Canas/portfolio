import React, { Component } from "react";

import MUICard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { CARDS_SECTION_SX, CARD_ITEM_PROPS } from "../../../../styles/sx/sections/cardsSx";

class Card extends Component {
    constructor(props) {
        super(props);
        this.thumbnail = getImage(this.props.image);
    }

    render() {
        const { title, description, action } = this.props;
        

        return (
            <MUICard sx={CARDS_SECTION_SX.CARD} component='article'>
                <CardActionArea onClick={action}>
                    <CardMedia component="header">
                        <GatsbyImage image={this.thumbnail} alt={title} />
                    </CardMedia>
                    <CardContent>
                        <Typography {...CARD_ITEM_PROPS.TITLE}>
                            {title}
                        </Typography>
                        <Typography {...CARD_ITEM_PROPS.DESCRIPTION}>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </MUICard>
        );
    }
}
export default Card;
