import cloneDeep from "lodash/cloneDeep";

import {
    BIN_SIZE,
    DECIMALS,
    HIST_END,
    HIST_START,
} from "../../constants/defaults";
import {
    BIN_COUNT,
    BIN_END,
    BIN_HALF,
    BIN_START,
    ECTS,
    NUMERICAL_MARK,
    ACADEMIC_YEAR,
    HIST_X_FIELDS,
    BIN_LABEL,
} from "../../constants/keys";
import {
    checkHistogramConsistency,
} from "../consistencyCheck";

import { toLocaleOrdinal } from "../strings";
import { getClosestMultipleAbove, getClosestMultipleBelow, getUniqueValues } from "./general";
import { ENGLISH, SPANISH } from "../../lang/langConstants";

export function computeHistogramBins(
    data,
    weight = ECTS,
    binSize = BIN_SIZE,
    start = HIST_START,
    end = HIST_END,
    stackByYear = true,
    returnStartEnd = true,
    normalized = true,
    locale=ENGLISH
) {
    checkHistogramConsistency(data, weight, binSize, start, end);
    // ---- Build bins limits ----
    start = start ?? Math.min(...data.map((sample) => sample[NUMERICAL_MARK]));
    end = end ?? Math.max(...data.map((sample) => sample[NUMERICAL_MARK]));
    start = getClosestMultipleBelow(start, binSize);
    end = getClosestMultipleAbove(end, binSize);

    // ---- Build bins structures ----
    const binsCount = Math.floor((end - start) / binSize);
    const bins = Array(binsCount);
    if (stackByYear) {
        const years = getUniqueValues(data, ACADEMIC_YEAR);
        const template = Object.fromEntries(years.map((year) => [year, 0]));
        for (let i = 0; i < binsCount; i++) bins[i] = cloneDeep(template);
    } else {
        bins.fill(0);
    }
    // ---- Compute bins ----
    for (const sample of data) {
        const value = sample[NUMERICAL_MARK];
        const year = sample[ACADEMIC_YEAR];
        if (value >= start && value < end) {
            const binIndex = Math.floor((value - start) / binSize);
            if (stackByYear) bins[binIndex][year] += sample[weight];
            else bins[binIndex] += sample[weight];
        } else if (value === end) {
            if (stackByYear) bins[binsCount - 1][year] += sample[weight];
            else bins[binsCount - 1] += sample[weight];
        }
    }
    // ---- Structure result ----
    let hist = [];
    for (let i = 0; i < bins.length; i++) {
        const binStart = start + i * binSize;
        const binEnd = start + (i + 1) * binSize;
        hist.push(
            buildHistEntryFromBin(binStart, binEnd, bins[i], stackByYear, locale)
        );
    }
    if (normalized) hist = normalizeHist(hist);

    hist = addLabel(hist, normalized, locale);
    return returnStartEnd ? { hist, start, end } : hist;
}

function buildHistEntryFromBin(binStart, binEnd, bin, stackByYear = true, locale=ENGLISH) {
    const binHalf = (binStart + binEnd) / 2;
    const entry = {
        [BIN_START]: binStart,
        [BIN_END]: binEnd,
        [BIN_HALF]: binHalf,
    };
    if (stackByYear) {
        for (const year of Object.keys(bin)) {
            entry[toLocaleOrdinal(year, locale, locale === SPANISH? " Año" : " Year")] = bin[year];
        }
    } else {
        entry[BIN_COUNT] = bin;
    }
    return entry;
}

export function normalizeHist(hist, toPercentage = true) {
    hist = cloneDeep(hist);
    const valueFields = getAllHistValueFields(hist);
    let sum = 0;
    for (const entry of hist) {
        for (const field of valueFields) {
            entry[field] = parseFloat(entry[field]);
            sum += entry[field];
        }
    }

    //divide each value field by the sum
    for (const entry of hist) {
        for (const field of valueFields) {
            if (toPercentage)
                entry[field] = ((entry[field] * 100) / sum).toFixed(DECIMALS);
            else entry[field] /= sum;
        }
    }
    return hist;
}

function addLabel(hist, asPercentage = true, locale=ENGLISH) {
    hist = cloneDeep(hist);
    const allFieldValues = getAllHistValueFields(hist);
    for (const entry of hist) {
        let value = 0;
        for (const field of allFieldValues) {
            value += parseFloat(entry[field]);
        }
        entry[BIN_LABEL] = `${parseFloat(value.toFixed(DECIMALS)).toLocaleString(locale)}${
            asPercentage ? "%" : ""
        }`;
    }
    return hist;
}

export function getAllHistValueFields(hist) {
    return Object.keys(hist[0]).filter(
        (key) => !HIST_X_FIELDS.includes(key) && key !== BIN_LABEL
    );
}
