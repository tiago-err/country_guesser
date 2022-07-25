import {createContext} from "react";
import {Country} from "../../interfaces";
import {getAllCountries} from "../../services/country";

interface Props {
	countries: Country[];
}

const defaults: Props = {
	countries: getAllCountries(),
};

const CountryContext = createContext(defaults);
export default CountryContext;
