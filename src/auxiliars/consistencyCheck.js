import {
    AVAILABLE_BIN_SIZE_RANGE,
    MAX_BIN_SIZE,
    MIN_BIN_SIZE,
} from "../constants/defaults";
import {
    AVAILABLE_HISTOGRAM_WEIGHTS,
    SORTABLE_MARK_ENTRY_FIELDS,
} from "../constants/keys";

export function checkFilterConsistency(data, group, groupKey, sortBy = null) {
    checkGroupAndGroupKeyConsistency(data, group, groupKey);
    checkSortByConsistency(data, sortBy);
}
export function checkRangeFilterConsistency(
    data,
    min,
    max,
    groupKey,
    sortBy = null
) {
    checkGroupKeyConsistency(data, groupKey);
    checkSortByConsistency(data, sortBy);
    checkNumberRangeConsistency(min, max);
}

export function checkSetFilterConsistency(
    data,
    set,
    groupKey,
    sortBy = null
) {
    checkGroupKeyConsistency(data, groupKey);
    checkSortByConsistency(data, sortBy);
    if (!set instanceof Set && !Array.isArray(set)){
        throw new EvalError(`Set must be an array or a set`);
    }
}

export function checkHistogramConsistency(data, weight, binSize, start, end) {
    checkDataConsistency(data);
    checkNumberRangeConsistency(start, end);
    if (!AVAILABLE_HISTOGRAM_WEIGHTS.includes(weight))
        throw new EvalError(
            `Histogram weight must be one of ${AVAILABLE_HISTOGRAM_WEIGHTS.join(
                ", "
            )}`
        );
    else if (
        typeof binSize !== "number" ||
        binSize < MIN_BIN_SIZE ||
        binSize > MAX_BIN_SIZE
    )
        throw new EvalError(
            `Histogram bin size must be a number between ${AVAILABLE_BIN_SIZE_RANGE.join(
                " and "
            )}`
        );
}

export function checkDataConsistency(data) {
    if (!Array.isArray(data))
        throw new TypeError(`Data must be an array, not ${typeof data}`);
    else if (!data.every((sample) => typeof sample === "object"))
        throw new EvalError(`Data must be an array of objects`);
}

export function checkSortByConsistency(data, sortBy = null) {
    checkDataConsistency(data);
    if (sortBy !== null) {
        if (!SORTABLE_MARK_ENTRY_FIELDS.includes(sortBy))
            throw new EvalError(
                `SortBy must be one of ${SORTABLE_MARK_ENTRY_FIELDS.join(
                    ", "
                )} or null`
            );
        else if (!data.every((sample) => sortBy in sample))
            throw new EvalError(`SortBy ${sortBy} must be in all data samples`);
    }
}

function checkGroupAndGroupKeyConsistency(data, group, groupKey) {
    checkGroupKeyConsistency(data, groupKey);
    const groupType = typeof group;
    if (group !== null) {
        if (groupType !== "string" && groupType !== "number")
            throw new TypeError(
                `Group must null, string or number, not ${typeof group}`
            );
        else if (
            !data.every(
                (sample) =>
                    sample[groupKey] === null ||
                    typeof sample[groupKey] === groupType
            )
        )
            throw new EvalError(
                `Not all ${groupKey} samples in data are of type ${groupType}`
            );
    }
}

export function checkGroupKeyConsistency(data, groupKey) {
    checkDataConsistency(data);
    if (typeof groupKey !== "string")
        throw new EvalError(
            `Group key must be a string, not ${typeof groupKey}`
        );
    else if (!data.every((sample) => groupKey in sample))
        throw new EvalError(
            `Group key ${groupKey} must be in all data samples`
        );
}

function checkNumberRangeConsistency(start, end) {
    if (start !== null && typeof start !== "number")
        throw new EvalError(`Range start must be a number or null`);
    else if (end !== null && typeof end !== "number")
        throw new EvalError(`Range end must be a number or null`);
    else if (start !== null && end !== null && start > end)
        throw new EvalError(`Range start must be lower or equal than end`);
}
