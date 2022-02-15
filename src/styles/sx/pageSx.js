export const CONTACT_FORM_SX = {
    WRAPPER: {
        pt: 4,
    },
    SEND_BUTTON: { width: { xs: "100%", sm: "fit-content" } },
};

export const AVATAR_SX = {
    CONTAINER: { p: 2, justifyContent: "center", alignItems: "center" },
};

export const INDEX_SX = {
    WRAPPER: {
        pb: 0,
    },
    LOGOS_SECTION : {
        mt: 2,
        pl: 1
    },
    FOOTER: {
        pr: 0,
        mb: 0,
        position: { xs: "sticky", sm: "relative" },
        bottom: { xs: 0, sm: "unset" },
        left: { xs: 0, sm: "unset" },
        pb : 2,
        mt: { xs: 1, sm: 2 },
        alignItems : 'flex-end',
        justifyContent : { xs: "center", sm: "flex-end" }
    },
    FOOTER_BUTTON: { width: { xs: "90%", sm: "fit-content" } },
};

export const NOT_FOUND_SX = {
    AVATAR_GRID_ITEM: {
        mt: 2,
    },
    FOOTER: {

        ...INDEX_SX.FOOTER,
        mt: { xs: 0, sm: 8 },
    },
    FOOTER_BUTTON: {
        alignSelf : "center",
        width: { xs: "50%", sm: "fit-content" } },
};

export const INDEX_PROPS = {
    SUBHEADER: {
        component: "h2",
        variant: "h5",
        textAlign: "center",
        color: "text.primary",
    },
    CONTACT_ME_BUTTON : {
        variant:'contained',
        color:'primary'
    }
};

export const NOT_FOUND_PROPS = {
    HEADER: {
        component: "h1",
        variant: "h2",
        textAlign: "center",
        color: "text.primary",
    },
    SUBHEADER: {
        component: "h2",
        variant: "h4",
        textAlign: "center",
        color: "text.secondary",
    },
};
