import logo from "./images/Group 10.svg";
import lady from "./images/lady.svg";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import CountryRegion from "countryregionjs";
import "./index.css"

function App() {
    const [state, setState] = useState("");
    const [states, setStates] = useState([]);
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [lga, setLGA] = useState("");
    const [lgas, setLGAs] = useState([]);
    let countryRegion = null;

    const getCountryRegionInstance = () => {
        if (!countryRegion) {
            countryRegion = new CountryRegion();
        }
        return countryRegion;
    };

    useEffect(() => {
        const getCountries = async () => {
            try {
                const countries = await getCountryRegionInstance().getCountries();                
                setCountries(countries.map(country => ({
                    value: country.id,
                    label: country.name
                })));
            } catch (error) {
                console.error(error);
            }
        }
        getCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            try {
                const states = await getCountryRegionInstance().getStates(country);
                setStates(states.map(userState => ({
                    value: userState?.id,
                    label: userState?.name
                })));
            } catch (error) {
                console.error(error);
            }
        }

        if (country) {
            getStates();
        }

    }, [country]);

    useEffect(() => {
        const getLGAs = async () => {
            try {
                const lgas = await getCountryRegionInstance().getLGAs(country, state);
                setLGAs(lgas?.map(lga => ({
                    value: lga?.id,
                    label: lga?.name
                })));
            } catch (error) {
                console.error(error);
            }
        }

        if (state) {
            getLGAs();
        }

    }, [country, state]);

    const handleCountryChange = (event) => {
        const { value } = event;
        setCountry(value);
    };

    const handleStateChange = (event) => {
        const { value } = event;
        setState(value);
    };

    const handleLGAChange = (event) => {
        const { value } = event;
        setLGA(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'border: 1.4783px solid rgba(11, 70, 84, 0.25)',
            borderRadius: '5.91319px',
            fontSize: "1.5rem",
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: state.isFocused ? '#3B0051' : '#F2CCFF',
            ':hover': {
                color: 'black'
            }
        })
    };
    return (
        <main>
            <section className="submain submain-one">
                <section className="submain-one-img">
                    <img className="submain-one-image" src={logo} alt="" />
                </section>

                <section className="submain-zero-image-cover">
                    <img className="submain-zero-image" src={lady} alt="" />
                </section>


                <form className="submain-one-form" onSubmit={handleSubmit}>
                    <header className="submain-one-form-header">
                        <h1>Pick-A-Location</h1>
                    </header>
                    <section className="submain-one-form-body">
                        <section className="submain-one-form-body-subsection">
                            <Select
                                type="text"
                                placeholder="Select a country"
                                id="name"
                                onChange={handleCountryChange}
                                options={countries}
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                            />
                        </section>
                        <section className="submain-one-form-body-subsection">
                            {
                                states?.length !== 0 &&
                                <Select
                                    placeholder="Select a state"
                                    id="name"
                                    onChange={handleStateChange}
                                    options={states}
                                    styles={customStyles}
                                    className="submain-one-form-body-subsection-select"

                                />}

                        </section>
                        <section className="submain-one-form-body-subsection">
                            {
                                lgas && lgas?.length !== 0 &&
                                <Select
                                    placeholder="Select a Substate"
                                    id="name"
                                    onChange={handleLGAChange}
                                    options={lgas}
                                    styles={customStyles}
                                    className="submain-one-form-body-subsection-select"

                                />}
                        </section>
                        {
                            !true && lga
                        }
                        <section className="subdomain-one-form-body-subsection-one">
                            <button className="subdomain-one-form-body-subsection-one-button">Submit</button>
                        </section>
                    </section>
                </form>
            </section>
            <section className="submain submain-two">
                <section className="submain-two-image-cover">
                    <img className="submain-two-image" src={lady} alt="" />
                </section>
            </section>
        </main>);
}

export default App;