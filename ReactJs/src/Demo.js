import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import CountryRegion from "countryregionjs";
// import './App.css';

function App() {
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [lga, setLGA] = useState("");
  const [lgas, setLGAs] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countries = await (new CountryRegion()).getCountries();
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
        const states = await (new CountryRegion()).getStates(country);
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
        const lgas = await (new CountryRegion()).getLGAs(country, state);
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

  }, [state]);

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
    control: (provided, state) => ({
      ...provided,
      border: '2px solid #3B0051',
      backgroundColor: '#EEBFFF',
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
      <div className="App">
        <header>
          <h1>Try Out CountryRegionJS</h1>
          <h3>By <a href='https://github.com/king-Alex-d-great/countryregionjs' target='blank'>King Alex</a></h3>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Country</label>
            <Select
              onChange={handleCountryChange}
              options={countries}
              styles={customStyles}
            />
          </div>
          <div className="form-control">
            {
              states?.length !== 0 && <><label>State</label>
                <Select
                  onChange={handleStateChange}
                  options={states}
                  styles={customStyles}
                /></>
            }

          </div>
          <div className="form-control">
            {
              lgas && lgas?.length !== 0 && <><label>L.G</label>
                <Select
                  onChange={handleLGAChange}
                  options={lgas}
                  styles={customStyles}
                />
              </>
            }

          </div>
          <div className="form-control">
            <label></label>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
