export const LAYOUT_SX = {
    CONTENT_WRAPPER : { mb: 6, mt :0},
}

export const LAYOUT_HEADER_SX ={
    TITLE : {
         flexGrow: 1 
    }
}

export const LANGUAGE_SELECTOR_SX = {
    SELECTOR : {
        pb: 0,
        pt: 1,
        ml: 0,
        "& .MuiSelect-select": { pl: 1 },
        "& .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
    },
    FLAG_IN_DISPLAY : {
        filter: "brightness(87.5%)"
    },
    FLAG_IN_MENU_ITEM: {
        marginRight: 10,
    }    
}

export const MENU_SX = {
    WRAPPER : { width: "auto" },
    HEADER_ITEM : { justifyContent: "flex-end", mb: 1 },
    CLOSE_MENU_ICON : { justifyContent: "flex-end", pr: 1 },
    SEPARATED_ITEM : 
        { mb: 2, mt : 2 }
}

export const ALERTS_SX = {
    ALERT : {
        width: "100%"
    }
}
export const FULL_WIDTH_SELECTOR = {
    CONTAINER : {
    width: "100%"
    }
}


export const LAYOUT_HEADER_PROPS = {
    TITLE : {
        align : 'left',
        variant : 'h6',
        component : 'span',

    }
}