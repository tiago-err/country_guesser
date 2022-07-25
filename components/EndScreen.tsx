import {AnimatePresence, motion} from "framer-motion";
import {Type} from "../interfaces";
import {capitalize} from "../services/utils";

interface Props {
	score: number;
	type: Type;
	resetFunction: () => void;
}

export default function EndScreen(props: Props) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{scale: 0.5, opacity: 0.5}}
				animate={{scale: 1, opacity: 1}}
				exit={{scale: 0}}
				className="grid grid-cols-1 text-center gap-8">
				<div>
					<h1 className="font-bold text-orange-400 text-4xl">Game Over!</h1>
					<h2 className="font-semibold text-2xl">Guess the {capitalize(props.type)}</h2>
				</div>
				<span className="font-semibold text-xl">Score: {props.score}</span>
				<motion.button
					whileTap={{scale: 0.8}}
					whileHover={{scale: 1.1}}
					onClick={props.resetFunction}
					className="p-4 rounded-xl w-48 bg-white text-black">
					Retry
				</motion.button>
			</motion.div>
		</AnimatePresence>
	);
}
