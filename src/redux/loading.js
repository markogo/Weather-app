export function setLoading(value) {
    return {
        type: "SET_LOADING",
        payload: value
    }
}

export default function loaderReducer(state = false, action) {
    switch (action.type) {
        case "SET_LOADING":
            return action.payload;
        default:
            return state;
    }
}