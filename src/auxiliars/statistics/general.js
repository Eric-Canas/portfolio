import cloneDeep from "lodash/cloneDeep";

import { SEMESTERS_BY_YEAR } from "../../constants/defaults";
import {
    ACADEMIC_YEAR,
    CATEGORICAL_MARK,
    FALLBACK_GROUP,
    MAX,
    MIN,
    NUMERICAL_MARK,
    SUBJECT,
} from "../../constants/keys";
import {
    checkFilterConsistency,
    checkGroupKeyConsistency,
    checkRangeFilterConsistency,
    checkSetFilterConsistency,
    checkSortByConsistency,
} from "../consistencyCheck";
import { hexToHSV, toLocaleOrdinal } from "../strings";

export function filterDataByGroup(
    data,
    group,
    groupKey = CATEGORICAL_MARK,
    sortBy = NUMERICAL_MARK,
    fallbackGroup = FALLBACK_GROUP
) {
    checkFilterConsistency(data, group, groupKey, sortBy);
    data = cloneDeep(data);
    const isFallbackGroup = group === fallbackGroup;
    data = data.filter(
        (sample) =>
            sample[groupKey] === group || (isFallbackGroup && !sample[groupKey])
    );
    if (sortBy !== null) data = sortData(data, sortBy);
    return data;
}

export function filterDataByRange(
    data,
    min,
    max,
    groupKey = ACADEMIC_YEAR,
    sortBy = null
) {
    checkRangeFilterConsistency(data, min, max, groupKey, sortBy);
    data = cloneDeep(data);
    if (min !== null) data = data.filter((sample) => sample[groupKey] >= min);
    if (max !== null) data = data.filter((sample) => sample[groupKey] <= max);
    if (sortBy !== null) data = sortData(data, sortBy);
    else return data;
}

export function filterDataBySet(
    data,
    set,
    groupKey = ACADEMIC_YEAR,
    sortBy = null
) {
    checkSetFilterConsistency(data, set, groupKey, sortBy);
    data = cloneDeep(data);
    if (Array.isArray(set)) set = new Set(set);
    data = data.filter(
        (sample) => set.has(sample[groupKey]) || sample[groupKey] === null
    );
    if (sortBy !== null) data = sortData(data, sortBy);
    else return data;
}

export function groupData(data, groupKey) {
    checkGroupKeyConsistency(data, groupKey);
    const groups = {};
    for (const sample of data) {
        const group = sample[groupKey];
        if (!(group in groups)) groups[group] = [sample];
        else groups[group].push(sample);
    }
    return groups;
}

export function getlimitOfData(data, groupKey, limit = MIN) {
    checkRangeFilterConsistency(data, -Infinity, Infinity, groupKey);
    if (limit === MIN)
        return Math.min(...data.map((sample) => sample[groupKey]));
    else if (limit === MAX)
        return Math.max(...data.map((sample) => sample[groupKey]));
    else
        throw new Error(
            `Only ${MIN} and ${MAX} are valid limits, not ${limit}`
        );
}

function sortData(data, sortBy = NUMERICAL_MARK, secondSort = SUBJECT) {
    checkSortByConsistency(data, sortBy);
    checkSortByConsistency(data, secondSort);
    return data.sort((a, b) => {
        if (a[sortBy] !== b[sortBy]) return b[sortBy] - a[sortBy];
        else return a[secondSort] < b[secondSort] ? -1 : 1;
    });
}

export function getClosestMultipleBelow(num, multiple) {
    multiple = parseFloat(multiple);
    num = parseFloat(num);
    return Math.floor(num / multiple) * multiple;
}

export function getClosestMultipleAbove(num, multiple) {
    multiple = parseFloat(multiple);
    num = parseFloat(num);
    return Math.ceil(num / multiple) * multiple;
}

export function getUniqueValues(
    data,
    dataKey = ACADEMIC_YEAR,
    sort = true,
    fallback = null,
    asSet = false
) {
    checkGroupKeyConsistency(data, dataKey);
    const values = new Set(data.map((sample) => sample[dataKey] ?? fallback));
    if (asSet) return values;
    else {
        let uniqueValues = [...values];
        if (sort !== null) uniqueValues = sortArray(uniqueValues, fallback);
        return uniqueValues;
    }
}

export function yearAndSemesterToLabel(year, semester, locale = "en") {
    year = parseInt(year);
    semester = parseInt(semester);
    return `${toLocaleOrdinal(year, locale)}${semester > 1 ? `/${semester}` : ""}`;
}

export function yearAndSemesterToIdx(year, semester) {
    year = parseInt(year);
    semester = parseInt(semester);
    return (year - 1) * SEMESTERS_BY_YEAR + (semester - 1);
}

export function sortArray(array, fallback = null, desc = false) {
    desc = desc ? -1 : 1;
    array = array.sort((a, b) => {
        if (a === fallback) return Infinity;
        else if (b === fallback) return -Infinity;
        else if (typeof a === "string") return desc * a.localeCompare(b);
        else return desc * (a - b);
    });
    return array;
}

export function unnestData(data){
    return data.map((sample) => unnestObject(sample));
}


export function unnestObject(obj){
    let unnested = {};
    for (const [key, value] of Object.entries(obj)) {
        if (!Array.isArray(value) && typeof value === 'object') {
            unnested = { ...unnested, ...unnestObject(value) };
        } else {
            unnested[key] = value;
        }
    }
    return unnested;
}

export function sortByColor(data, colorKey = 'color') {
    checkGroupKeyConsistency(data, colorKey);
    return data.sort((a, b) => {
        a = hexToHSV(a[colorKey]);
        b = hexToHSV(b[colorKey]);
        const h = a[0] - b[0];
        const s = a[1] - b[1];
        const v = a[2] - b[2];

        return -(h*100 + s*10 + v);
    });
}