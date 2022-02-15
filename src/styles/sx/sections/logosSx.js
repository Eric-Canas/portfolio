export const LOGO_ITEM_PROPS = {
    BIG_SIZE: {
        xs: 3,
        sm: 2,
        lg: 1
    },
    SMALL_SIZE: {
        xs: 2,
        sm: 1
    },
};

export const LOGOS_SECTION_SX = {
    LOGO_WRAPPER: {
        textAlign: "center",
        justifyContent: "center",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.1)", zIndex : 2 },
    },
};

export const LOGO_SVG_STYLE = {
    maxWidth: "95%",
};

export const LOGOS_SECTION_PROPS = {
    HEADER_TYPOGRAPHY: {
        variant: "subtitle1",
        component: "h3",
        color: "text.primary",
    },
    LOGOS_GRID : {
        alignItems: "center",
        justifyContent: "left",
    }
};
