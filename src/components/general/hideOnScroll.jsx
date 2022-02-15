import React from "react";

import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { DIRECTION_DOWN, DIRECTION_UP } from '../../constants/keys';

function HideOnScroll(props) {
    const { children, direction } = props;
    const trigger = useScrollTrigger();
    if (direction && direction !== DIRECTION_UP && direction !== DIRECTION_DOWN)
        throw new Error(`Direction must be either ${DIRECTION_UP} or ${DIRECTION_DOWN}`);
  
    return (
      <Slide appear={false} direction={direction || DIRECTION_DOWN} in={!trigger}>
        {children}
      </Slide>
    );
  }
  export default HideOnScroll;