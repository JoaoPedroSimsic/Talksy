import axios from "axios";

const parseAxiosError = (err: unknown): string[] => {
	if (axios.isAxiosError(err) && err.response) {
		const data = err.response.data as { errors?: string[] };
		if (data.errors && Array.isArray(data.errors)) {
			return data.errors;
		}
	}
	return ["An unexpected error occuried"];
};

export default parseAxiosError;
