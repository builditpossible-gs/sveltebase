import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { prisma_client } from "./prisma";
import { fail } from "@sveltejs/kit";

const EXPIRES_IN = 60 * 1000;

export const generateEmailVerificationToken = async (userId: string) => {
	const getUserToken = await prisma_client.VerificationToken.findUnique({
		where: {
			user_id: userId
		}, select: {
			email_token: true,
			email_token_expires: true
		}
	})
	if (getUserToken){
		if (isWithinExpiration(Number(getUserToken.email_token_expires))) {
			return getUserToken.email_token
		}
	}
	const token = generateRandomString(63);
	await prisma_client.VerificationToken.upsert({
		where: {
			user_id: userId,
		},
		update: {
			email_token: token,
			email_token_expires: new Date().getTime() + EXPIRES_IN,
		},
		create: {
			email_token: token,
			email_token_expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId,
			id: generateRandomString(15)
		}
	})
	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
	const checkUserToken = await prisma_client.VerificationToken.findUnique({
		where: {
			email_token: token
		}, select: {
			email_token: true,
			email_token_expires: true,
			user_id: true,
			id: true
		}
	})
	if (!checkUserToken) throw new Error('Invalid token')
	if (!isWithinExpiration(Number(checkUserToken.email_token_expires))) {
		throw new Error('Expired token');
	}
	return checkUserToken.user_id
};

export const generatePasswordResetToken = async (userId: string) => {
	console.log("user ID: " + userId)
	const getUserToken = await prisma_client.VerificationToken.findUnique({
		where: {
			user_id: userId
		}, select: {
			password_token: true,
			password_token_expires: true
		}
	})

	if (getUserToken){
		if (isWithinExpiration(Number(getUserToken.password_token_expires))) {
			return getUserToken.password_token
		}
	}

	const token = generateRandomString(63);
	console.log("new token : " + token)
	await prisma_client.VerificationToken.upsert({
		where: {
			user_id: userId,
		},
		update: {
			password_token: token,
			password_token_expires: new Date().getTime() + EXPIRES_IN,
		},
		create: {
			password_token: token,
			password_token_expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId,
			id: generateRandomString(15)
		}
	})
	return token;
};

export const validatePasswordResetToken = async (token: string) => {
	const checkUserToken = await prisma_client.VerificationToken.findUnique({
		where: {
			password_token: token
		}, select: {
			password_token: true,
			password_token_expires: true,
			user_id: true,
			id: true
		}
	})
	if (!checkUserToken) throw new Error('Invalid token')
	const tokenExpires = Number(checkUserToken.password_token_expires)
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error('Expired token');
	}
	return checkUserToken.user_id
};

export const isValidPasswordResetToken = async (userToken: string) => {
	const validateUserToken = await prisma_client.VerificationToken.findUnique({
		where: {
			password_token: userToken
		}, select: {
			password_token: true,
			password_token_expires: true,
			id: true,
		}
	})
	if (!validateUserToken.password_token) return false;
	if (!isWithinExpiration(Number(validateUserToken.password_token_expires))) {
		return false;
	}
	return true;
};