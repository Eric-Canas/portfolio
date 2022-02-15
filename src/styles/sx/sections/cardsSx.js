import Link from '@mui/material/Link';
import { CARD_WIDTH } from "../../../constants/graphqlFragments";

export const CARDS_SECTION_SX = {
    CARD_CONTAINER: {
        justifyContent: { xs: "center", sm: "left" },
    },
    CARD: {
        maxWidth: CARD_WIDTH,
        m: 1,
    },
};

export const MODAL_SX = {
    WRAPPER: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: { xs: "70%", sm: "70%", md: "60%", lg: "50%" },
        maxHeight: "90vh",
        overflowY: "auto",
    },
    HEADER: {
        mt: -1,
    },
    CONTENT: {
        p: 2,
    },
    DESCRIPTION : {
        p : 1,
        pt: 0
    },
    LOGOS_SECTION : {
        mt: 1,
        pl : 1,
        alignItems : "center",
    },
    FOOTER: {
        p: 2,
        justifyContent: "flex-end",
    },
    FOOTER_BUTTON: {
        m: 1,
    },
};

export const MODAL_CAROUSEL_SX = {
    IMAGE_INFO_BAR: {
        pl: 2,
        pr: 2,
    },
    CONTROLS_WRAPPER: {
        height: 10,
        mt: -4.5,
        mb: 2.5,
        justifyContent: "space-between",
    },
    CONTROLS: {
        height: 10,
        width: 5,
        ml: 1,
        mr: 1,
        opacity: 0.9,
        bgcolor: "transparent",
        "&:hover": {
            opacity: 1,
            transform: "scale(1.2)",
        },
        "&:disabled": {
            opacity: 0.4,
            cursor: "not-allowed",
        },
    },
    CONTROLS_ICON: {
        color: "background.paper",
    },
};

export const CARD_ITEM_PROPS = {
    TITLE: {
        gutterBottom: true,
        variant: "h6",
        component: "h3",
        color: "text.primary",
    },
    DESCRIPTION: {
        variant: "body2",
        color: "text.secondary",
    },
};

export const CAROUSEL_ITEM_PROPS = {
    WRAPPER: {
        enableMouseEvents: true,
        resistance: true,
    },
    ICON_BUTTON: {
        size: "medium",
    },
    IMAGE_CAPTION: {
        position: "bottom",
    },
};
export const MODAL_BODY_PROPS = {
    TITLE_WRAPPER: {
        xs : 12,
        component: "header"
    },
    TITLE: {
        align: "center",
        variant: "h6",
        component: "h2",
        color : "text.primary"
    },
    DESCRIPTION_WRAPPER: {
        xs : 12
    },
    LOGOS_WRAPPER:{
        xs : 12
    }
};

export const MODAL_FOOTER_PROPS = {
    WRAPPER : {
        component:'footer',
        spacing: 2
    },
    BUTTON_LINK : {
        component : Link,
        target : "_blank"
    }
}
