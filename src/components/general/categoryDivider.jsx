import React, { Component } from "react";

import Typography from "@mui/material/Typography";

import { LIST_CATEGORY_PROPS, LIST_CATEGORY_SX } from "../../styles/sx/sections/listSx";

class CategoryDivider extends Component {

    render() {
        const { category } = this.props;
        return (
            <Typography
                {...LIST_CATEGORY_PROPS.TYPOGRAPHY}
                sx={LIST_CATEGORY_SX.DIVIDER}>
                {category}
            </Typography>
        );
    }
}
export default CategoryDivider;
