import React, { Component } from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuContent from "./content/menuContent";

class Menu extends Component {

  render() {
    const {toggle, isOpen} = this.props;
    return (
        <SwipeableDrawer
          component="aside"
          anchor="left"
          open={isOpen}
          onClose={() => toggle(false)}
          onOpen={() => toggle(true)}
        >
          
          <MenuContent toggleDrawer = {toggle}/>
        </SwipeableDrawer>
    );
  }
}
export default Menu;
