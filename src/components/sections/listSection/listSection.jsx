import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

import ListEntry from "./listEntry";
import CategoryDivider from "../../general/categoryDivider";

import { groupData } from "../../../auxiliars/statistics/general";
import { CATEGORY } from "../../../constants/keys";
import {
    LIST_GRID_ITEM_PROPS,
    LIST_SX,
} from "../../../styles/sx/sections/listSx";

class ListSection extends Component {
    constructor(props) {
        super(props);
        this.entriesByCategory = groupData(
            this.props.data.listEntries,
            CATEGORY
        );
    }

    render() {
        return (
            <Grid container>
                <List sx={LIST_SX.LIST}>
                    {Object.entries(this.entriesByCategory).map(
                        ([category, entries]) => (
                            <Grid
                                item
                                {...LIST_GRID_ITEM_PROPS.CATEGORY_TITLE}
                                key={category ?? "default"}>
                                {category && (
                                    <CategoryDivider category={category} entries={entries}/>
                                )}
                                {entries.map((entry, index) => (
                                    <React.Fragment key={entry.id}>
                                    <ListEntry data={entry} />
                                    {index !== entries.length - 1 && (
                                        <Divider sx={LIST_SX.DIVIDER}/>)
                                    }
                                    </React.Fragment>
                                ))}
                                
                            </Grid>
                        )
                    )}
                </List>
            </Grid>
        );
    }
}
export default ListSection;
