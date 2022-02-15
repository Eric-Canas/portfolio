import React, { Component } from "react";
import Header from "../components/header/header";
import Menu from "../components/menu/menu";
import Container from "@mui/material/Container";
import SectionNavigation from "../components/sectionsNavigation/sectionNavigation";

import { LAYOUT_SX } from "../styles/sx/layoutSx";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { isMenuOpen: false };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(newState) {
        this.setState({ isMenuOpen: newState });
    }

    render() {
      const {title, sections, currentSection, onChangeSection} = this.props;
        return (
                <>
                <Header
                    title={title}
                    openDrawer={() => this.toggleDrawer(true)}
                />

                <Menu
                    toggle={this.toggleDrawer}
                    isOpen={this.state.isMenuOpen}
                />
               <Container component='section' sx={LAYOUT_SX.CONTENT_WRAPPER}>
                    {this.props.children}
                </Container>

                
                {sections && (
                    <SectionNavigation
                        sections={sections}
                        selection={currentSection}
                        onChange={onChangeSection}
                    />
                )}
                </>
        );
    }
}
export default Layout;
