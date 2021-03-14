import "./icons/css/weather-icons.css";
import "./styles/index.css";
import { useState, useEffect } from "react";
import SetLocationPage from "./components/SetLocationPage";
import { useSelector } from "react-redux";
import CityWeatherPage from "./components/CityWeatherPage";
import Loader from "./components/Loader";

const App = () => {
    const location = useSelector(state => state.location);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(location ? 1 : 0);
    }, [location]);

    return (
        <div className="app-container">
            {
                page === 0 ?
                <SetLocationPage />
                : page === 1 ?
                <CityWeatherPage />
                : null
            }
            <Loader />
        </div> 
    );
};

export default App;
