import {Country, QuizzQuestion, Type} from "../interfaces";
import {shuffle} from "./utils";

export function generateQuestion(type: Type, countries: Country[]): QuizzQuestion {
	const correctCountry = countries[Math.floor(Math.random() * countries.length)];

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
		default:
			prompt = correctCountry.name.common;
			break;
	}

	const correctCCA3 = correctCountry.cca3;
	const otherOptions: Country[] = [];
	for (const _ of [1, 2, 3]) {
		let randomCountry;
		do {
			randomCountry = countries[Math.floor(Math.random() * countries.length)];
		} while (otherOptions.map((item) => item.cca3).includes(randomCountry.cca3));

		otherOptions.push(randomCountry);
	}

	return {
		prompt,
		correctCCA3,
		options: shuffle([...otherOptions, correctCountry]),
	};
}
