import {
    ECTS,
    PIE_COUNT,
    PIE_GROUP,
    CATEGORICAL_MARK,
    FALLBACK_GROUP,
    PIE_COLOR,
} from "../../constants/keys";
import {
    checkGroupKeyConsistency,
} from "../consistencyCheck";

export function computePieSectors(
    data,
    weight = ECTS,
    groupBy = CATEGORICAL_MARK
) {
    checkGroupKeyConsistency(data, groupBy);
    const colorKey = `${groupBy}Color`;
    checkGroupKeyConsistency(data, colorKey);
    const sectors = [];
    for (const sample of data) {
        const group = sample[groupBy] || FALLBACK_GROUP;
        const sector = sectors
            .map((sector) => sector[PIE_GROUP])
            .indexOf(group);
        if (sector !== -1) sectors[sector][PIE_COUNT] += sample[weight];
        else sectors.push({ [PIE_GROUP]: group, [PIE_COUNT]: sample[weight], [PIE_COLOR] : sample[colorKey] });
    }
    return sectors;
}

export function getPieSectorsModeIdx(sectors) {
    const modeCount = Math.max(...sectors.map((sector) => sector[PIE_COUNT]));
    const modeIdx = sectors.findIndex(
        (sector) => sector[PIE_COUNT] === modeCount
    );
    if (modeIdx === -1) throw new Error("BUG: Mode not found?");
    return modeIdx;
}