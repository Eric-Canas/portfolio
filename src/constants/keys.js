import { CATALAN, ENGLISH, SPANISH } from "../lang/langConstants";

/* ----------------- GENERAL ------------------ */
export const LOCALE = "node_locale";

/* --------------- LOGO_ENTRIES --------------- */
export const LOGO_USAGE = "usage";
export const LOGO_NAME = "name";
/* --------------- CARD ENTRIES --------------- */
export const CATEGORY = "category";

/* --------------- MARK ENTRIES -------------- */
export const ECTS = "ects";
export const SUBJECT = "subject";
export const NUMERICAL_MARK = "numericalMark";
export const CATEGORICAL_MARK = "categoricalMark";
export const KNOWLEDGE_BRANCH = "knowledgeBranch";
export const ACADEMIC_YEAR = "year";
export const SEMESTER = "semester";
export const SORTABLE_MARK_ENTRY_FIELDS = [
  ECTS,
  SUBJECT,
  NUMERICAL_MARK,
  CATEGORICAL_MARK,
  KNOWLEDGE_BRANCH,
  ACADEMIC_YEAR,
  SEMESTER,
];

/* --------------- CHART TYPES --------------- */
export const HISTOGRAM = "Marks Histogram";
export const PIE = "Grades Pie";
export const LINE = "Temporal Evolution Line";

/* ------------ HISTOGRAM WEIGHTS ------------- */
export const AVAILABLE_HISTOGRAM_WEIGHTS = [ECTS, SUBJECT];

/* -------- HISTOGRAM DATA STRUCTURE ---------- */

export const BIN_START = "Bin Start";
export const BIN_END = "Bin End";
export const BIN_HALF = "Bin Half";
export const BIN_COUNT = "Bin Count";
export const BIN_LABEL = "Bin Label";
export const HIST_X_FIELDS = [BIN_START, BIN_END, BIN_HALF];

/* ---------- PIE DATA STRUCTURE -------------- */
export const PIE_GROUP = "Group";
export const PIE_COUNT = "Count";
export const PIE_COLOR = "Color";
export const FALLBACK_GROUP = "Other";

/* ------------ LINE DATA STRUCTURE ----------- */	
export const LINE_X_FIELD = "X";
export const AVERAGE_MARK = "Average Semester Mark";

/* ------------ GENERAL ------------ */	
export const BEST = "Best";
export const WORST = "Worst";
export const LIMITS = [BEST, WORST];
export const MIN = "Min";
export const MAX = "Max";

export const DIRECTION_DOWN = "down";
export const DIRECTION_UP = "up";
export const RIGHT = "right";
export const LEFT = "left";

export const LANGUAGES = {
  [ENGLISH] : "English",
  [SPANISH] : "Spanish",
  [CATALAN] : "Catalan"
}