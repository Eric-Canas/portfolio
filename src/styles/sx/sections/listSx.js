export const LIST_SX = {
    LIST: {
        width: "100%",
        bgcolor: "background.paper",
    },
    IMAGE_CONTAINER: {
        m: 1,
        width: { sm: 150, md: 200 },
        display: { xs: "none", sm: "block" },
    },
    DIVIDER  : {
        width: {xs : "100%", sm : "0%"},
    }
};

export const LIST_CATEGORY_SX = {
    DIVIDER: {
        mt: 2,
    },
};

export const LIST_GRID_ITEM_PROPS = {
    CATEGORY_TITLE: {
        xs: 12,
    },
};

export const LIST_CATEGORY_PROPS = {
    TYPOGRAPHY: {
        variant: "h6",
        component: "h2",
        textAlign: "left",
        color: "text.primary",
    },
    TIME: {
        variant: "subtitle2",
        component: "h3",
        textAlign: "left",
        color: "text.secondary",
        gutterBottom: true,
    },
};

export const LIST_ENTRY_PROPS = {
    DATE_TYPOGRAPHY: {
        component:"span",
            variant:"body2",
            color:"text.primary"
    }
}
