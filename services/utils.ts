export function shuffle(array: any[]) {
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

export function randomUnique(amount: number, range: number) {
	const array: number[] = [];
	while (array.length < amount) {
		const result = Math.floor(Math.random() * range);
		if (array.indexOf(result) === -1) array.push(result);
	}

	return array;
}

export function capitalize(str: string) {
	return str[0].toUpperCase() + str.substring(1);
}
