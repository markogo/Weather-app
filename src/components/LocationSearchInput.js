import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/loading";
import { setLocation } from "../redux/location";

const LocationSearchInput = () => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    const handleChange = (value) => {
        setError(null);
        setAddress(value);
    };

    const handleSelect = async (value) => {
        if (!value) {
            setError("Please enter a city name");
        } else {
            dispatch(setLoading(true));
            let places = await (() => {
                return new Promise((resolve) => {
                    new window.google.maps.places.AutocompleteService()
                        .getPlacePredictions({
                            input: value,
                        },
                            (res) => {
                                resolve(res);
                            }
                        )
                        .catch((error) => {
                            resolve({ error });
                        });
                });
            })();
            if (!places.error) {
                let realPlace = places.find((x) => x.description === value);
                if (!realPlace) {
                    realPlace = places.find((x) =>
                        x.description
                            .split(", ")
                            .map((x) => x.toLowerCase())
                            .includes(value.toLowerCase())
                    );
                }
                if (realPlace) {
                    geocodeByAddress(value)
                        .then((results) => {
                            return getLatLng(results[0]);
                        })
                        .then((latLng) => {
                            dispatch(setLocation({
                                ...latLng,
                                address: realPlace.description.split(",")[0]
                            }));
                            dispatch(setLoading(false));
                        })
                        .catch((error) => {
                            console.error("Error", error);
                            dispatch(setLoading(false));
                        });
                } else {
                    setError("City not found");
                    dispatch(setLoading(false));
                }
            } else {
                setError("Please try again");
                dispatch(setLoading(false));
            }
        }
    };

    return (
        <PlacesAutocomplete
            searchOptions={{ types: ["(cities)"] }}
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, loading, suggestions, getSuggestionItemProps }) => {
                return (
                    <div style={{ position: "relative" }}>
                        <input
                            spellCheck={false}
                            {...getInputProps({
                                placeholder: "City",
                                className: "location-search-input font-w-500",
                            })}
                        />
                        <MdSearch
                            onClick={() => {
                                handleSelect(address);
                            }}
                            size={32}
                            style={{position: "absolute", right: 10, top: 0, bottom: 0, margin: "auto", cursor: "pointer"}}
                        ></MdSearch>
                        <div className="autocomplete-dropdown-container">
                            {loading && <div className="pt-10 pb-10">Loading...</div>}
                            {suggestions.map((suggestion, i) => {
                                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                                return (
                                    <div
                                        key={`place-option-${i}`}
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            onClick: () => {
                                                handleChange(suggestion.description);
                                            },
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ position: "absolute", right: 0, top: "100%", color: "#fe756d", paddingTop: 5 }}>
                            {error ? error : ""}
                        </div>
                    </div>
                );
            }}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;
