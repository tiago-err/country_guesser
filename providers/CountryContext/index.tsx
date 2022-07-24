import React, {useEffect, useState} from "react";
import {Country} from "../../interfaces";
import {getAllCountries} from "../../services/country";
import CountryContext from "./context";

export default function CountryProvider(props: {children: React.ReactNode}) {
	const [countries, setCountries] = useState<Country[]>([]);

	useEffect(() => {
		getAllCountries().then(setCountries);
	}, []);

	return <CountryContext.Provider value={{countries, setCountries}}>{props.children}</CountryContext.Provider>;
}
