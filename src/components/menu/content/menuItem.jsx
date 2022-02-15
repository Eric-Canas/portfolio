import React, { Component } from "react";

import ICONS from "../../../constants/icons";
import {ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "gatsby-plugin-intl";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    //Gatsby-plugin-intl needs this to be used inside MUI as component
    this.Link = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  }

  render() {
    const { icon, label, slug, sx } = this.props;
    const path = slug.startsWith("/") ? slug : `/${slug}`;
    return (
      <ListItem button component={this.Link} to={path} sx={sx}>
            <ListItemIcon>{ICONS[icon]}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
    );
  }
}
export default MenuItem;
