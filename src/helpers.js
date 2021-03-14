import weatherIconsMappings from "./icons/mappings.json";
import weatherIconsNames from "./icons/names.json";

export const getOrdinalEnding = (day) => {
    return day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
};
export const convertCelsiusToFahrenheit = (c) => {
    return (Math.round(c) * 9) / 5 + 32;
};

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1);

export const getIconClass = (id, dayTime, neutral = false) => {
    var prefix = "wi wi-";
    var code = id;

    var icon = weatherIconsMappings[code].icon;

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000) && !neutral) {
        icon = icon === "sunny" ? (dayTime === "day" ? icon : "clear") : icon;
        icon = dayTime + "-" + icon;
    }

    if (!weatherIconsNames.includes(icon)) {
        icon = "day-" + icon;
    }
    
    icon = prefix + icon;
    return icon;
};
