import {Country, QuizzQuestion} from "../interfaces";
import {shuffle} from "./utils";
import countries from "../constants/countries.json";

export function getAllCountries(): Country[] {
	return countries as unknown as Country[];
}

export function generateQuizz(amount: number, type: "flag" | "name"): QuizzQuestion[] {
	const countries = getAllCountries();
	const questions: QuizzQuestion[] = [];

	for (let index = 0; index < amount; index++) {
		const correctCountry = countries[Math.floor(Math.random() * countries.length)];

		const prompt = type === "flag" ? correctCountry.flag : correctCountry.name.common;
		const correctCCA3 = correctCountry.cca3;
		const otherOptions: Country[] = [];
		for (const _ of [1, 2, 3]) {
			let randomCountry;
			do {
				randomCountry = countries[Math.floor(Math.random() * countries.length)];
			} while (otherOptions.map((item) => item.cca3).includes(randomCountry.cca3));

			otherOptions.push(randomCountry);
		}

		questions.push({
			prompt,
			correctCCA3,
			options: shuffle([...otherOptions, correctCountry]),
		});
	}

	return questions;
}
