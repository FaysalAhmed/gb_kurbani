export const getBaseUrl = (local = false) => {
	if (process.env.NEXT_PUBLIC_API_DOMAIN && local) {
		return process.env.NEXT_PUBLIC_API_DOMAIN;
	} else {
		return process.env.NEXT_PUBLIC_API_LOCAL;
	}
};
