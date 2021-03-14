import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import isCelsiusReducer from "./isCelsius"
import loadingReducer from "./loading"
import locationReducer from "./location"
import todaysForecastReducer from "./todayForecast"
import weekForecastReducer from "./weekForecast"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    todayForecast: todaysForecastReducer,
    weekForecast: weekForecastReducer,
    location: locationReducer,
    isCelsius: isCelsiusReducer,
    loading: loadingReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
