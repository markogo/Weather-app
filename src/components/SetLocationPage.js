import PlacesAutocomplete from "./LocationSearchInput";
import { store } from "../redux";
import { setLoading } from "../redux/loading";
import { setLocation } from "../redux/location";

const onLocationError = (er) => {
    alert("No access to user location: " + er.message);
    store.dispatch(setLoading(false));
}

const RequestGeolocation = () => {
    if (!navigator.geolocation) {
        alert("Browser doesn't support geolocation detector");
    } else {
        store.dispatch(setLoading(true));
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let res = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&result_type=locality|country&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                )
                    .then((x) => x.json())
                    .catch((error) => {
                        console.log("error", error);
                        store.dispatch(setLoading(false));
                        return { error };
                    });

                if (!res.error && res.results[0]?.formatted_address) {
                    store.dispatch(setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        address: res.results[0].formatted_address
                    }));
                }
                store.dispatch(setLoading(false));
            },
            onLocationError,
            {
                enableHighAccuracy: true,
            }
        );
    }
};

const SetLocationPage = () => {
    return (
        <div className="p-10 p-md-20 p-lg-30 page-container d-flex">
            <div className="ml-auto mt-auto mr-auto mb-auto" style={{ maxWidth: 470, width: "100%", textAlign: "center" }}>
                <PlacesAutocomplete setLocation={setLocation} />
                <div className="pt-30 pb-30">
                    or
                </div>
                <div className="font-20">
                    use my{" "}
                    <span
                        style={{ borderBottom: "1px dashed", cursor: "pointer"}}
                        onClick={() => RequestGeolocation(setLocation)}
                    >
                        current position
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SetLocationPage;
