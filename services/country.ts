import axios, {AxiosResponse} from "axios";
import {REST_COUNTRIES_BASE} from "../constants/links";
import {Country, Quizz, QuizzQuestion} from "../interfaces";

export function getAllCountries(): Promise<Country[]> {
	return axios.get(`${REST_COUNTRIES_BASE}/all`).then((value: AxiosResponse<Country[]>) => {
		return value.data;
	});
}

export function generateQuizz(amount: number, type: "flag" | "name"): Promise<QuizzQuestion[]> {
	return getAllCountries().then((countries) => {
		const questions: QuizzQuestion[] = [];

		for (let index = 0; index < amount; index++) {
			const correctCountry = countries[Math.floor(Math.random() * countries.length)];

			const prompt = type === "flag" ? correctCountry.flag : correctCountry.name.common;
			const correctCCA3 = correctCountry.cca3;
			const otherOptions = [1, 2, 3].map((_) => countries[Math.floor(Math.random() * countries.length)]);

			questions.push({
				prompt,
				correctCCA3,
				options: shuffle([...otherOptions, correctCountry]),
			});
		}

		return questions;
	});
}

function shuffle(array: any[]) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}
