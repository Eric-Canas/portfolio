import { Paper } from "@mui/material";

export const CHARTS_SX = {
    OUTER_CONTAINER: {
        m: { xs: 0, sm: 1, md: 2, lg: 3 },
        mt: { xs: 2, sm: 2, md: 2, lg: 2 },
        mb: { xs: 2, sm: 2, md: 2, lg: 2 },
        pb: 1,
        justifyContent: "center",
    },
    INNER_CONTAINER: {
        justifyContent: "center",
        p: { xs: 1, sm: 1, md: 2 },
    },
    COMEBACK_BUTTON: { ml: { xs: -2, sm: 0 } },
    LINE_HEADER: {
        mt: 2,
    },
    PIE_CONTAINER: {
        width: "100%",
        height: "auto",
        //Let it overflow if needed
        overflow: "visible",
        "& .recharts-surface": {
            overflow: "visible",
        },
    },
    LINE_CONTAINER: { "& .recharts-surface": { overflow: "visible" } },
};

export const CHART_FILTERS_SX = {
    OUTER_CONTAINER: {
        p: 2,
        justifyContent: "center",
    },
    FORM_CONTROL: {
        width: "100%",
        m: 1,
    },
    SLIDER: {
        m: 1,
        mt: 0,
        width: { xs: "87.5%", sm: "95%", md: "96%", lg: "97.5%" },
    },
    BRANCH_OF_KNOWLEDGE_CHIP: {
        color: "black",
        "& svg": { fill: "rgba(0, 0, 0, 0.26)" },
    },
};

export const FILTER_PROPS_SX = {
    GRID_ITEM: {
        xs: 12,
    },
    BIN_SIZE_SLIDER_STACK: {
        mb: 1,
        alignItems: "center",
    },
};

export const CHART_ITEM_PROPS = {
    HEADER: {
        xs: 12,
    },
    HEADER_TYPOGRAPHY: {
        textAlign: "left",
        component: "h2",
        variant: "h6",
        color: "text.primary",
    },
    COMEBACK_BUTTON: {
        justifySelf: "left",
        alignSelf: "center",
    },
    PIE: {
        xs: 12,
    },
    PLOT: {
        xs: 12,
        sm: 10,
        md: 8,
        lg: 7,
    },
    TOOLTIP_LIST: {
        component: Paper,
        elevation: 1,
        dense: true,
    },
};
export const CHART_RESPONSIVE_CONTAINER_PROPS = {
    RECTANGULAR: {
        width: "100%",
        minWidth: 275,
        maxWidth: 500,
        aspect: 1.95,
    },
    CIRCULAR: {
        width: "100%",
        minHeight: 300,
    },
};

export const CHART_TOOLTIP_SX = {
    WRAPPER: {
        zIndex: 1,
    },
    LIST: {
        opacity: 0.95,
        borderRadius: 2,
        p: 1,
    },
    LIST_HEADER: {
        mb: 1,
    },
    LIST_ITEM: {
        pt: 0,
        pb: 0,
    },
    TEXT: {
        mt: "2px",
        mb: "2px",
    },
    LIST_SUBHEADER: {
        lineHeight: 1,
        pl: 0.25,
        bgcolor: "transparent",
    },
};
