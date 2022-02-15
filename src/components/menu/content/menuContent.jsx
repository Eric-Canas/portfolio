import React, { Component } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import MenuItem from "./menuItem";

import { filterDataByGroup } from "../../../auxiliars/statistics/general";
import { LOCALE } from "../../../constants/keys";
import { ENGLISH } from "../../../lang/langConstants";
import ICONS, { BACK, EMAIL, HOME } from "../../../constants/icons";
import { MENU_SX } from "../../../styles/sx/layoutSx";
import { StaticQuery, graphql } from "gatsby";
import { injectIntl } from "gatsby-plugin-intl";


class MenuContent extends Component {

    render() {
        const { toggleDrawer } = this.props;
        const { intl } = this.props;
        const { locale } = intl;
        return (
            <Box
                sx={MENU_SX.WRAPPER}
                role='presentation'
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}>
                <List>
                    <ListItem
                        button
                        onClick={() => toggleDrawer(false)}
                        sx={MENU_SX.HEADER_ITEM}>
                        <ListItemIcon sx={MENU_SX.CLOSE_MENU_ICON}>
                            {ICONS[BACK]}
                        </ListItemIcon>
                    </ListItem>
                    <Divider />
                    <MenuItem
                        icon={HOME}
                        label={intl.formatMessage({ id: "home.title" })}
                        slug='/'
                        sx={MENU_SX.SEPARATED_ITEM}
                    />
                    <StaticQuery
                        query={getMenuItems}
                        render={(data) => {
                            const nodes = filterDataByGroup(
                                data.allContentfulMenuItem.nodes,
                                locale,
                                LOCALE,
                                null,
                                ENGLISH
                            );
                            return (
                                <>
                                    {nodes.map((node) => (
                                        <MenuItem
                                            icon={node.icon}
                                            label={node.label}
                                            slug={node.page.slug}
                                            key={node.id}
                                        />
                                    ))}
                                </>
                            );
                        }}
                    />
                    <MenuItem
                        icon={EMAIL}
                        label={intl.formatMessage({
                            id: "contact.title",
                        })}
                        slug='contact-me'
                        sx={MENU_SX.SEPARATED_ITEM}
                    />
                </List>
            </Box>
        );
    }
}
export default injectIntl(MenuContent);

const getMenuItems = graphql`
    query getMenuItems {
        allContentfulMenuItem(sort: { fields: order }) {
            nodes {
                id
                node_locale
                icon
                label
                page {
                    slug
                }
            }
        }
    }
`;
