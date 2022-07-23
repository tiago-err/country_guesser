import axios, {AxiosResponse} from "axios";
import {REST_COUNTRIES_BASE} from "../constants/links";
import {Country} from "../interfaces";

export function getAllCountries(): Promise<Country[]> {
	return axios.get(`${REST_COUNTRIES_BASE}/all`).then((value: AxiosResponse<Country[]>) => {
		return value.data;
	});
}
