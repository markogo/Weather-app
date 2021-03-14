export function changeUnits() {
    return {
        type: "CHANGE_UNITS"
    }
}

export default function isCelsiusReducer(state = true, action) {
    switch (action.type) {
        case "CHANGE_UNITS":
            return !state;
        default:
            return state;
    }
}