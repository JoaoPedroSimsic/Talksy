import React from 'react';

function handleError(
	err: unknown,
	setError: React.Dispatch<React.SetStateAction<string>>,
): void {
	if (typeof err === 'object' && err && 'response' in err) {
		const axiosErr = err as { response?: { data?: { error?: string } } };

		if (axiosErr.response?.data?.error) {
			setError(axiosErr.response.data.error);
			return;
		}
	}

	if (err instanceof Error) {
		setError(err.message);
		return;
	}

	setError('An unknown error occurred');
}

export default handleError;
