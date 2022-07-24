import "../styles/globals.css";
import type {AppProps} from "next/app";
import CountryProvider from "../providers/CountryContext";

function MyApp({Component, pageProps}: AppProps) {
	return (
		<CountryProvider>
			<Component {...pageProps} />
		</CountryProvider>
	);
}

export default MyApp;
