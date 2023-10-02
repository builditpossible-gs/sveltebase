import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { prisma_client } from "./prisma";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await prisma_client
		.table("email_verification_token")
		.where("user_id", "=", userId)
		.getAll();
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token: any) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await prisma_client.table("email_verification_token").insert({
		id: token,
		expires: new Date().getTime() + EXPIRES_IN,
		user_id: userId
	});

	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const storedToken = await prisma_client.transaction(async (trx: any) => {
		const storedToken = await trx
			.table("email_verification_token")
			.where("id", "=", token)
			.get();
		if (!storedToken) throw new Error("Invalid token");
		await trx
			.table("email_verification_token")
			.where("user_id", "=", storedToken.user_id)
			.delete();
		return storedToken;
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}
	return storedToken.user_id;
};