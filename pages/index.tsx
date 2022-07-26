import type {NextPage} from "next";
import Head from "next/head";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import {Mode, Type} from "../interfaces";
import GameView from "../components/GameView";
import Icon from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";

const Home: NextPage = () => {
	const [game, setGame] = useState<Type | undefined>(undefined);
	const [gameMode, setGameMode] = useState<Mode>("endless");

	return (
		<div className="h-screen w-full dark:bg-gray-700 bg-gray-100 flex flex-col justify-center items-center space-y-16">
			{!game && (
				<>
					<motion.h1 initial={{scale: 0, opacity: 0.5}} animate={{scale: 1, opacity: 1}} className="text-orange-400 font-bold text-3xl">
						Country Guesser
					</motion.h1>
					<motion.div initial={{scale: 0, opacity: 0.5}} animate={{scale: 1, opacity: 1}} className="grid grid-cols-3 gap-4">
						<span className={gameMode === "endless" ? "text-orange-400" : ""}>Endless</span>
						<input
							type="checkbox"
							className="toggle"
							onChange={(e) => setGameMode(e.target.checked ? "score" : "endless")}
							checked={gameMode === "score"}
						/>
						<label className={gameMode === "score" ? "text-orange-400" : ""}>Score</label>
					</motion.div>
					<motion.div initial={{scale: 0, opacity: 0.5}} animate={{scale: 1, opacity: 1}} className="grid grid-cols-2 gap-8">
						<motion.button
							className="bg-white p-4 rounded-xl text-black"
							whileHover={{scale: 1.1}}
							whileTap={{scale: 0.8}}
							onClick={() => setGame("flag")}>
							Guess the Flag
						</motion.button>
						<motion.button
							className="bg-white p-4 rounded-xl text-black"
							whileHover={{scale: 1.1}}
							whileTap={{scale: 0.8}}
							onClick={() => setGame("capital")}>
							Guess the Capital
						</motion.button>
					</motion.div>
				</>
			)}
			{game && (
				<AnimatePresence>
					<motion.div
						whileHover={{scale: 1.1}}
						exit={{scale: 0}}
						initial={{scale: 0}}
						animate={{scale: 1}}
						className="absolute top-8 left-8 cursor-pointer"
						onClick={() => setGame(undefined)}>
						<Icon path={mdiArrowLeft} color={window.matchMedia("(prefers-color-scheme: dark)").matches ? "white" : "black"} size={1.5} />
					</motion.div>
					<GameView gameType={game} gameMode={gameMode} />
				</AnimatePresence>
			)}
		</div>
	);
};

export default Home;
