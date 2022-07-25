import Head from "next/head";
import {useContext, useEffect, useState} from "react";
import {Country, Mode, QuizzQuestion, Type} from "../interfaces";
import {AnimatePresence, motion} from "framer-motion";
import CountryContext from "../providers/CountryContext/context";
import {generateQuestion} from "../services/quizz";
import EndScreen from "../components/EndScreen";
import {capitalize} from "../services/utils";

const GameView = ({gameType, gameMode}: {gameType: Type; gameMode: Mode}) => {
	const {countries} = useContext(CountryContext);

	const [userSelection, setUserSelection] = useState<Country | undefined>(undefined);
	const [score, setScore] = useState(0);
	const [amount, setAmount] = useState(0);
	const [question, setQuestion] = useState<QuizzQuestion | undefined>();
	const [showEndScreen, setShowEndScreen] = useState(false);

	useEffect(() => {
		if (countries.length > 0) setQuestion(generateQuestion(gameType, countries));
	}, [countries, gameType]);

	useEffect(() => {
		if (userSelection && question) {
			setAmount((previous) => previous + 1);
			if (userSelection.cca3 === question.correctCCA3) setScore((previous) => previous + 1);

			setTimeout(() => {
				setUserSelection(undefined);
				if (gameMode === "endless" || userSelection.cca3 === question.correctCCA3) setQuestion(generateQuestion(gameType, countries));
				if (gameMode === "score" && userSelection.cca3 !== question.correctCCA3) setShowEndScreen(true);
			}, 800);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userSelection]);

	function computeButtonAppearance(country: Country): string {
		if (userSelection && question) {
			if (country.cca3 === question.correctCCA3) return "bg-green-400 text-white";
			if (country.cca3 === userSelection.cca3) return "bg-red-600 text-white";
		}
		return "bg-white text-black";
	}

	function computeOptionText(country: Country): string {
		switch (gameType) {
			case "flag":
				return country.name.common;
			case "capital":
				return country.name.common;
			case "name":
				return country.flag;
			default:
				return country.name.common;
		}
	}

	return (
		<AnimatePresence>
			<div className="flex flex-col justify-center items-center space-y-16">
				<Head>
					<title>Country Guesser | Guess the {capitalize(gameType)}</title>
					<meta name="description" content="A simple web quizz game to guess the country depending on different categories " />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{question && !showEndScreen && (
					<>
						<motion.h2
							initial={{scale: 0.5, opacity: 0.5}}
							animate={{scale: 1, opacity: 1}}
							exit={{scale: 0}}
							className="text-center font-semibold text-2xl">
							Guess the {capitalize(gameType)} - <span className="text-orange-400">{score}</span>
							{gameMode === "endless" && <>/{amount}</>} <br />
							<span className={`${gameType === "flag" ? "text-6xl" : "text-3xl"} text-orange-400`}>{question.prompt}</span>
						</motion.h2>
						<motion.div
							initial={{scale: 0.5, opacity: 0.5}}
							animate={{scale: 1, opacity: 1}}
							exit={{scale: 0}}
							className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{question.options.map((country) => (
								<motion.button
									whileTap={{scale: 0.8}}
									whileHover={{scale: 1.1}}
									className={`p-4 rounded-xl w-48 ${computeButtonAppearance(country)}`}
									key={country.cca3}
									onClick={() => {
										if (!userSelection) setUserSelection(country);
									}}>
									{computeOptionText(country)}
								</motion.button>
							))}
						</motion.div>
					</>
				)}
				{showEndScreen && (
					<EndScreen
						score={score}
						resetFunction={() => {
							setQuestion(generateQuestion(gameType, countries));
							setScore(0);
							setUserSelection(undefined);
							setShowEndScreen(false);
						}}
					/>
				)}
			</div>
		</AnimatePresence>
	);
};

export default GameView;
