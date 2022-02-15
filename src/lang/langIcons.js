import React from 'react';

import UnitedKingdomFlag from '../images/united_kingdom_flag.svg';
import SpainFlag from '../images/spain_flag.svg';
import CataloniaFlag from '../images/catalonia_flag.svg';

import { CATALAN, ENGLISH, SPANISH } from "./langConstants";

const LANGUAGE_FLAGS = {
    [ENGLISH] : <UnitedKingdomFlag height={20} width={20} />,
    [SPANISH]: <SpainFlag height={20} width={20}/>,
    [CATALAN]: <CataloniaFlag height={20} width={20}/>
}
export default LANGUAGE_FLAGS;
