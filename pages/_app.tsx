import "../styles/globals.css";
import type {AppProps} from "next/app";
import Head from "next/head";
import CountryContext from "../providers/CountryContext/context";
import {getAllCountries} from "../services/country";

function MyApp({Component, pageProps}: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,user-scalable=yes" />
				<meta name="description" content="A simple web quizz game to guess the country depending on different categories " />
				<meta name="keywords" content="Keywords" />
				<title>Country Guesser</title>

				<link rel="manifest" href="/manifest.json" />
				<link href="/icons/16.png" rel="icon" type="image/png" sizes="16x16" />
				<link href="/icons/32.png" rel="icon" type="image/png" sizes="32x32" />
				<link rel="apple-touch-icon" href="/apple-icon.png"></link>
				<meta name="theme-color" content="#FB923C" />
			</Head>
			<CountryContext.Provider value={{countries: getAllCountries()}}>
				<Component {...pageProps} />
			</CountryContext.Provider>
		</>
	);
}

export default MyApp;
