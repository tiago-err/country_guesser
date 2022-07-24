import type {NextPage} from "next";
import Head from "next/head";
import {motion} from "framer-motion";
import {useState} from "react";
import Link from "next/link";
import {Type} from "../interfaces";
import GameView from "../components/GameView";

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
						<Link href="/name">
							<motion.button className="bg-white p-4 rounded-xl text-black" whileHover={{scale: 1.1}}>
								Guess the Name
							</motion.button>
						</Link>
					</div>
				</>
			)}
			{game && <GameView gameType={game} />}
		</div>
	);
};

export default Home;
