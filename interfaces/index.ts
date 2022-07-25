export type Type = "flag" | "name" | "capital";
export type Mode = "endless" | "score";

export interface QuizzQuestion {
	prompt: string;
	correctCCA3: string;
	options: Country[];
}

/**
 * The result of a country using the https://restcountries.com/v3.1/all
 */
export interface Country {
	name: Name;
	tld: string[];
	cca2: string;
	ccn3: string;
	cca3: string;
	independent: boolean;
	status: string;
	unMember: boolean;
	currencies: Currencies;
	idd: Idd;
	capital: string[];
	altSpellings: string[];
	region: string;
	subregion: string;
	languages: Languages;
	translations: Translations;
	latlng: number[];
	landlocked: boolean;
	area: number;
	demonyms: Demonyms;
	flag: string;
	maps: Maps;
	population: number;
	car: Car;
	timezones: string[];
	continents: string[];
	flags: Image;
	coatOfArms: Image;
	startOfWeek: string;
	capitalInfo: CapitalInfo;
	postalCode: PostalCode;
}

interface Name {
	common: string;
	official: string;
	nativeName: NativeName;
}

interface NativeName {
	kal: Kal;
}

interface Kal {
	official: string;
	common: string;
}

interface Currencies {
	[key: string]: {
		name: string;
		symbol: string;
	};
}

interface Idd {
	root: string;
	suffixes: string[];
}

interface Languages {
	[key: string]: string;
}

interface Translations {
	[key: string]: {
		official: string;
		common: string;
	};
}

interface Demonyms {
	[key: string]: {
		f: string;
		m: string;
	};
}

interface Maps {
	[key: string]: string;
}

interface Car {
	signs: string[];
	side: string;
}

interface Image {
	png: string;
	svg: string;
}

interface CapitalInfo {
	latlng: number[];
}

interface PostalCode {
	format: string;
	regex: string;
}
