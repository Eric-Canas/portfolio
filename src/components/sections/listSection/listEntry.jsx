import React, { Component } from "react";

import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import DateSubheader from "./dateSubheader";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { LIST_ENTRY_OPTIONS } from "../../../constants/contentfulRichTextConfig";
import { LIST_SX } from "../../../styles/sx/sections/listSx";

class ListEntry extends Component {

    render() {
        const {
            title,
            description,
            image,
            dateStart,
            dateFinish,
            showTime,
            url
        } = this.props.data;
        const thumbnail = getImage(image);
        const linkProps = url
            ? {
                  component: Link,
                  href: url,
                  underline: "hover",
              }
            : {};
        return (
            <ListItem>
                <ListItemAvatar sx={LIST_SX.IMAGE_CONTAINER}>
                    <GatsbyImage image={thumbnail} alt={title} />
                </ListItemAvatar>
                <ListItemText
                    component='div'
                    primary={
                        <Typography color='text.primary' {...linkProps}>
                            {title}
                        </Typography>
                    }
                    secondary={
                        <>
                            <DateSubheader
                                dateStart={dateStart}
                                dateFinish={showTime && dateFinish}
                                showTime={showTime}
                            />
                            <br />
                            {documentToReactComponents(
                                JSON.parse(description.raw),
                                LIST_ENTRY_OPTIONS
                            )}
                        </>
                    }
                />
            </ListItem>
        );
    }
}
export default ListEntry;
