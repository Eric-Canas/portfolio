import {
    BEST_SUBJECTS_TO_SHOW_IN_LINE_CHART,
    SEMESTERS_BY_YEAR,
} from "../../constants/defaults";
import {
    ACADEMIC_YEAR,
    AVERAGE_MARK,
    BEST,
    ECTS,
    LINE_X_FIELD,
    NUMERICAL_MARK,
    SEMESTER,
    WORST,
} from "../../constants/keys";
import {
    filterDataByGroup,
    yearAndSemesterToIdx,
    yearAndSemesterToLabel,
} from "./general";

export function getAverageMarkByYearAndSemester(data, locale="en") {
    const dataIdxs = data.map((sample) =>
        yearAndSemesterToIdx(sample[ACADEMIC_YEAR], sample[SEMESTER])
    );
    const idxOffset = Math.min(...dataIdxs);
    const arrayLength = Math.max(...dataIdxs) - idxOffset + 1;

    const cumECTS = new Array(arrayLength).fill(0);
    const marksSum = new Array(arrayLength).fill(0);
    for (const sample of data) {
        const idx =
            yearAndSemesterToIdx(sample[ACADEMIC_YEAR], sample[SEMESTER]) -
            idxOffset;
        cumECTS[idx] += sample[ECTS];
        marksSum[idx] += sample[NUMERICAL_MARK] * sample[ECTS];
    }
    const avgMarksBySemester = marksSum.map((sum, idx) => sum / cumECTS[idx]);
    return avgMarksToDataStructure(avgMarksBySemester, idxOffset, locale)
}

function avgMarksToDataStructure(avgMarksBySemester, offset = 0, locale="en") {
    const structure = [];
    for (let i = 0; i < avgMarksBySemester.length; i++) {
        const year =
            Math.floor(i / SEMESTERS_BY_YEAR) + Math.floor(offset / 2) + 1;
        const semester = (i % SEMESTERS_BY_YEAR) + 1;
        structure[i] = {
            [LINE_X_FIELD]: yearAndSemesterToLabel(year, semester, locale),
            [AVERAGE_MARK]: avgMarksBySemester[i],
            [ACADEMIC_YEAR]: year,
            [SEMESTER]: semester,
        };
    }
    return structure;
}

export function getLimitSubjectsByYearAndSemester(
    data,
    year,
    semester,
    quantity = BEST_SUBJECTS_TO_SHOW_IN_LINE_CHART,
    limit = BEST
) {
    const yearData = filterDataByGroup(data, year, ACADEMIC_YEAR);
    const semesterData = filterDataByGroup(
        yearData,
        semester,
        SEMESTER,
        NUMERICAL_MARK // Get them sorted by NUMERICAL_MARK
    );
    if (limit > semesterData.length) return semesterData;
    else if (limit === BEST) return semesterData.slice(0, quantity);
    else if (limit === WORST) return semesterData.slice(-quantity);
    else throw new Error("Limit must be Best or Worst");
}
