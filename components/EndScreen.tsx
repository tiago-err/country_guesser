interface Props {
	score: number;
	resetFunction: () => void;
}

export default function EndScreen(props: Props) {
	return (
		<div className="grid grid-cols-1 text-center gap-8">
			<h1 className="font-bold text-orange-400 text-4xl">Game Over!</h1>
			<span className="font-semibold text-xl">Score: {props.score}</span>
			<button onClick={props.resetFunction} className="p-4 rounded-xl w-48 bg-white text-black">
				Retry
			</button>
		</div>
	);
}
