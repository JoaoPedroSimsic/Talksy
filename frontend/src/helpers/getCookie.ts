const getCookie = (name: string): string | null => {
	const searchedCookie = name + '=';

	const cookiesArray = document.cookie.split(';');

	for (let i = 0; i < cookiesArray.length; i++) {
		let cookie = cookiesArray[i];

		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1, cookie.length);
		}

		if (cookie.indexOf(searchedCookie) === 0) {
			return cookie.substring(searchedCookie.length, cookie.length);
		}
	}

	return null;
}

export default getCookie;
