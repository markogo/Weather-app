export function setTodayForecast(forecast) {
    return {
        type: "SET_TODAY_FORECAST",
        payload: forecast
    }
}

export default function todaysForecastReducer(state = null, action) {
    switch (action.type) {
        case "SET_TODAY_FORECAST":
            return action.payload;
        default:
            return state;
    }
}