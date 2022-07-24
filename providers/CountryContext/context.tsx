import {createContext} from "react";
import {Country} from "../../interfaces";

interface Props {
	countries: Country[];
	setCountries: (countries: Country[]) => void;
}

const defaults: Props = {
	countries: [],
	setCountries: (countries) => {},
};

const CountryContext = createContext(defaults);
export default CountryContext;
