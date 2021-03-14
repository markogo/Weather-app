export function setWeekForecast(forecast) {
    return {
        type: "SET_WEEK_FORECAST",
        payload: forecast
    }
}

export default function weekForecastReducer(state = null, action) {
    switch (action.type) {
        case "SET_WEEK_FORECAST":
            return action.payload;
        default:
            return state;
    }
}