import type {NextPage} from "next";
import Head from "next/head";
import {motion} from "framer-motion";
import {useState} from "react";
import {Type} from "../interfaces";
import GameView from "../components/GameView";
import Icon from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";

const Home: NextPage = () => {
	const [game, setGame] = useState<Type | undefined>(undefined);

	return (
		<div className="h-screen w-full dark:bg-neutral-700 bg-neutral-100 flex flex-col justify-center items-center space-y-16">
			<Head>
				<title>Country Guesser</title>
				<meta name="description" content="A simple web quizz game to guess the country depending on different categories " />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!game && (
				<>
					<h1 className="text-orange-400 font-bold text-3xl">Country Guesser</h1>
					<div className="grid grid-cols-2 gap-8">
						<motion.button className="bg-white p-4 rounded-xl text-black" whileHover={{scale: 1.1}} onClick={() => setGame("flag")}>
							Guess the Flag
						</motion.button>
						<motion.button className="bg-white p-4 rounded-xl text-black" whileHover={{scale: 1.1}} onClick={() => setGame("capital")}>
							Guess the Capital
						</motion.button>
					</div>
				</>
			)}
			{game && (
				<>
					<motion.div whileHover={{scale: 1.1}} className="absolute top-8 left-8 cursor-pointer" onClick={() => setGame(undefined)}>
						<Icon path={mdiArrowLeft} color={window.matchMedia("(prefers-color-scheme: dark)").matches ? "white" : "black"} size={1.5} />
					</motion.div>
					<GameView gameType={game} />
				</>
			)}
		</div>
	);
};

export default Home;
