export function setLocation(location) {
    return {
        type: "SET_LOCATION",
        payload: location
    }
}

export default function locationReducer(state = null, action) {
    switch (action.type) {
        case "SET_LOCATION":
            return action.payload;
        default:
            return state;
    }
}