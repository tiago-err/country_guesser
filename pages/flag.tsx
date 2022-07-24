import {NextPage} from "next";
import Head from "next/head";
import {MouseEventHandler, useEffect, useState} from "react";
import {Country, Quizz} from "../interfaces";
import {generateQuizz} from "../services/country";
import {motion} from "framer-motion";

const FlagGame: NextPage = () => {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [userSelection, setUserSelection] = useState<Country | undefined>(undefined);
	const [score, setScore] = useState(0);
	const [quizz, setQuizz] = useState<Quizz>({
		amount: 10,
		type: "flag",
		questions: [],
	});

	useEffect(() => {
		generateQuizz(quizz.amount, quizz.type).then((questions) => setQuizz((previous) => ({...previous, questions})));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userSelection) {
			if (userSelection.cca3 === quizz.questions[questionNumber].correctCCA3) setScore((previous) => previous + 1);

			setTimeout(() => {
				setQuestionNumber((previous) => previous + 1);
				setUserSelection(undefined);
			}, 800);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSelection]);

	function computeButtonAppearance(country: Country): string {
		if (userSelection) {
			if (country.cca3 === quizz.questions[questionNumber].correctCCA3) return "bg-green-400 text-white";
			if (country.cca3 === userSelection.cca3) return "bg-red-600 text-white";
		}
		return "bg-white text-black";
	}

	return (
		<div className="h-screen w-full dark:bg-neutral-700 bg-neutral-200 flex flex-col justify-center items-center space-y-16 relative">
			<Head>
				<title>Country Guesser | Guess the Flag</title>
				<meta name="description" content="A simple web quizz game to guess the country depending on different categories " />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{quizz.questions.length > 0 && quizz.questions.length > questionNumber && (
				<>
					<h2 className="text-center font-semibold text-2xl">
						Guess the Flag: <br />
						<span className="text-6xl">{quizz.questions[questionNumber].prompt}</span>
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{quizz.questions[questionNumber].options.map((country) => (
							<motion.button
								whileHover={{scale: 1.1}}
								className={`p-4 rounded-xl w-48 ${computeButtonAppearance(country)}`}
								key={country.cca3}
								onClick={() => setUserSelection(country)}>
								{country.name.common}
							</motion.button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default FlagGame;
