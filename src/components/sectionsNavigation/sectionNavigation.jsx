import React, { Component } from "react";

import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";


class SectionNavigation extends Component {

  render() {
    return (
      <AppBar component="footer" position="sticky" sx={{ top: 'auto', bottom: 0, mt : 2 }}>
        <BottomNavigation
          showLabels
          value={this.props.selection}
          onChange={(event, newValue) => {
            this.props.onChange(newValue);
          }}
        >
          {Object.entries(this.props.sections).map(([id, data]) => (
            <BottomNavigationAction
              label={data.title}
              key={id}
              value={id}
            />
          ))}
        </BottomNavigation>
      </AppBar>

    );
  }
}
export default SectionNavigation;
