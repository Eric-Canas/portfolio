import { SPANISH } from "../lang/langConstants";

export const HEADER_GITHUB_LINK = "https://github.com/Eric-Canas";
export const HEADER_LINKEDIN_LINK = "https://www.linkedin.com/in/eric-canas/";

/* ----------------- GENERALS ----------------- */
export const LOCALE_OTHER = (locale) => locale === SPANISH ? "Otro" : "Other";
/* ----------------- HISTOGRAM ------------------ */
export const BIN_SIZE = 0.5;
export const HIST_START = null;
export const HIST_END = null;
export const MIN_BIN_SIZE = 0.25;
export const MAX_BIN_SIZE = 1;
export const BIN_SIZE_STEP = 0.25;
export const AVAILABLE_BIN_SIZE_RANGE = [MIN_BIN_SIZE, MAX_BIN_SIZE];
export const BIN_SIZE_VALUES = [0.25, 0.5, 1];
export const BIN_SIZE_MARKS = BIN_SIZE_VALUES.map((size) =>
    Object.fromEntries([
        ["value", size],
    ])
);

/* ------------------ LINE ------------------- */
export const WORST_SUBJECTS_TO_SHOW_IN_LINE_CHART = 2;
export const BEST_SUBJECTS_TO_SHOW_IN_LINE_CHART = 2;

/* ----------------- OTHERS ------------------ */
export const SEMESTERS_BY_YEAR = 2;
export const DECIMALS = 1;