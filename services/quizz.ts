import {Country, QuizzQuestion, Type} from "../interfaces";
import {randomUnique, shuffle} from "./utils";

export function generateQuestion(type: Type, countries: Country[]): QuizzQuestion {
	let correctCountry;
	do {
		correctCountry = countries[Math.floor(Math.random() * countries.length)];
	} while (type === "capital" ? !correctCountry.capital || correctCountry.capital.length === 0 : false);

	let prompt;
	switch (type) {
		case "flag":
			prompt = correctCountry.flag;
			break;
		case "name":
			prompt = correctCountry.name.common;
			break;
		case "capital":
			prompt = correctCountry.capital.shift() || "";
			break;
		default:
			prompt = correctCountry.name.common;
			break;
	}

	const correctCCA3 = correctCountry.cca3;
	const otherCountries = countries.filter((item) => item.cca3 !== correctCCA3);
	const otherOptions: Country[] = randomUnique(3, otherCountries.length).map((index) => otherCountries[index]);

	return {
		prompt,
		correctCCA3,
		options: shuffle([...otherOptions, correctCountry]),
	};
}
