import { MdArrowBack } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import weatherIconsMappings from "../icons/mappings.json";
import { capitalize, getIconClass, convertCelsiusToFahrenheit, getOrdinalEnding } from "../helpers";
import AnimatedSlider from "./AnimatedSlider";
import { setLocation } from "../redux/location";
import { setTodayForecast } from "../redux/todayForecast";
import { setWeekForecast } from "../redux/weekForecast";
import { changeUnits } from "../redux/isCelsius";

const CityWeatherPage = () => {
    const dispatch = useDispatch();
    const location = useSelector(state => state.location);
    const todayForecast = useSelector(state => state.todayForecast);
    const weekForecast = useSelector(state => state.weekForecast);
    const isCelsius = useSelector(state => state.isCelsius);

    const getBack = () => {
        dispatch(setLocation(null));
        dispatch(setTodayForecast(null));
        dispatch(setWeekForecast(null));
    };

    useEffect(() => {
        if (location) {
            (async () => {
                let data = await fetch(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
                ).then((x) => x.json());

                const { morn, day, eve, night } = data.daily[0].temp;
                dispatch(setTodayForecast({
                    morning: morn,
                    day: day,
                    evening: eve,
                    night: night,
                    now: data.current.temp,
                    nowIcon: data.current.weather[0].id,
                    date: data.current.dt,
                    dayTime: data.current.dt > data.current.sunset || data.current.dt < data.current.sunrise ? "night" : "day",
                }))
                dispatch(setWeekForecast(
                    data.daily.slice(0, 7).map((x) => ({
                        icon: x.weather[0].id,
                        temp: (x.temp.min + x.temp.max) / 2,
                        date: x.dt,
                    })
                    )));
            })();
        }
    }, [location, dispatch]);

    const todaysTemps = todayForecast ?
        ["morning", "day", "evening", "night"].map((x) => ({
            title: x,
            temp: todayForecast[x],
        }))
        : [];

    const mostRecentDate = todayForecast ? new Date(todayForecast.date * 1000) : new Date();

    return todayForecast && weekForecast && location ? (
        <div className="page-container">
            <div className="row justify-space-between align-center p-30">
                <div className="d-flex align-center font-w-700 font-sm-40 font-30 mb-10">
                    <MdArrowBack
                        className="mr-sm-30 mr-20"
                        style={{ cursor: "pointer" }}
                        onClick={getBack}
                    ></MdArrowBack>
                    <div className="pr-10">{location.address.split(",")[0]}</div>
                </div>
                <div style={{ position: "relative" }} className="mb-10">
                    <div
                        style={{ position: "absolute", width: "100%", height: "100%", padding: "0 20px" }}
                        className="d-flex justify-space-between align-center font-w-700"
                    >
                        <div>°C</div>
                        <div>°F</div>
                    </div>
                    <div className={`units-toggle-btn-container`}>
                        <div
                            className="units-toggle-btn"
                            style={{ left: !isCelsius ? 1 : 52 }}
                            onClick={() => dispatch(changeUnits())}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="font-sm-32 font-24 font-w-300 pl-30 pr-30 mb-20">
                {moment(mostRecentDate).format("dddd, MMMM D")}
                {getOrdinalEnding(mostRecentDate.getDate())} {moment(mostRecentDate).format("YYYY")}
            </div>
            <div className="font-sm-26 font-18 font-w-300 mb-20 pl-30 pr-30">
                {todayForecast.nowIcon ? capitalize(weatherIconsMappings[todayForecast.nowIcon].label) : ""}
            </div>
            <div
                className="d-flex text-colored align-flex-start pl-30 pr-30"
                style={{ flexWrap: "wrap" }}
            >
                <div className="d-flex align-center mb-20">
                    <div className="font-sm-100 font-70 font-w-500 mr-sm-50 mr-40">
                        {isCelsius
                            ? Math.round(todayForecast.now)
                            : Math.round(convertCelsiusToFahrenheit(todayForecast.now))}
                        {isCelsius ? "°C" : "°F"}
                    </div>
                    <i
                        className={
                            getIconClass(todayForecast.nowIcon, todayForecast.dayTime) +
                            " font-sm-100 font-70 mr-sm-50"
                        }
                    ></i>
                </div>
                <div style={{ width: 160 }} className="font-24 font-w-300 mb-50">
                    {todaysTemps.map((x, i) => (
                        <div key={`todays-temp-${i}`} className="d-flex justify-space-between">
                            <div>{x.title}</div>
                            <div>
                                {isCelsius ? Math.round(x.temp) : Math.round(convertCelsiusToFahrenheit(x.temp))}
                                {isCelsius ? "°C" : "°F"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AnimatedSlider weekForecast={weekForecast} isCelsius={isCelsius}></AnimatedSlider>
        </div>
    ) : null;
};

export default CityWeatherPage;
