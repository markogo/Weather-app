import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoaderSVG from "../assets/loader.svg";

const Loader = () => {
    const loading = useSelector(state => state.loading);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (loading) {
            timeoutId = setTimeout(() => {
                setAnimate(true);
            }, 20);
        } else {
            if (animate) {
                timeoutId = setTimeout(() => {
                    setAnimate(false);
                }, 20);
            }
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [loading, animate]);
    
    return (
        <div
            className="loader"
            style={{
                zIndex: loading ? 100 : -1,
                background: animate && loading ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0)",
            }}
        >
            {animate && loading ? <img alt="loading..." width={140} src={LoaderSVG}></img> : null}
        </div>
    );
};

export default Loader;
