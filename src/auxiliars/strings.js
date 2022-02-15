import { ENGLISH, SPANISH } from "../lang/langConstants";

export function toLocaleOrdinal(n, locale = "en", sufix = "") {
    switch (locale) {
        case ENGLISH:
            return `${n}${
                ["ˢᵗ", "ⁿᵈ", "ʳᵈ"][
                    ((((parseInt(n) + 90) % 100) - 10) % 10) - 1
                ] || "ᵗʰ"
            }
        ${sufix}`;
        case SPANISH:
            if (sufix !== "")
                return `${n}${
                    ["ᵉʳ", "º", "ᵉʳ"][
                        ((((parseInt(n) + 90) % 100) - 10) % 10) - 1
                    ] || "º"
                }${sufix}`;
            else return `${n}º`;
        default:
            console.warn(`Locale ${locale} not supported`);
            return `${n}${sufix}`;
    }
}

export function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateID() {
    return Math.random().toString(36).substring(2, 15);
}
export function saturateHex(hex, saturation = 1) {
    if (saturation === 1) return hex;
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const c =
        "rgb(" +
        r * saturation +
        "," +
        g * saturation +
        "," +
        b * saturation +
        ")";
    return c;
}

export function hexToHSV(hexColor) {
    const c = hexColor.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return rgbToHSV(r / 255, g / 255, b / 255);
}

function rgbToHSV(r, g, b) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = max;
    let s = max;
    const v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                throw Error("Different than rgb?")
        }

        h /= 6;
    }

    return [h, s, v];
}
