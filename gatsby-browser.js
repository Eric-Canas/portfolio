import "./src/styles/global.css"

import React from "react";
import MainWrapper from "./src/components/general/mainWrapper";

export const wrapRootElement = ({ element }) => (
    <MainWrapper>{element}</MainWrapper>
 )