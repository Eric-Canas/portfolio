export const HYPERLINK_COMPONENT_PROPS = {
    target:'_blank', underline:'hover'
}

export const MODAL_ARTICLE_SX = {
    PARAGRAPH: { mt: 1 },
    SUBHEADING: { mt: 2, mb: -0.5 },
    OL: {
        mt: 0,
        listStyleType: "decimal",
        "& ol": {
            listStyleType: "lower-alpha",
            "& ol": {
                listStyleType: "lower-roman",
                "& ol": { listStyleType: "lower-greek" },
            },
        },
    },
};

export const MODAL_ARTICLE_COMPONENT_PROPS = {
    SUBHEADING: {
        variant: "subtitle1",
        component: "h2",
        color: "text.primary",
    },
    PARAGRAPH : {variant:'body2', color:'text.secondary'}
};
