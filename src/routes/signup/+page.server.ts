import { sendEmailVerificationLink } from '$lib/server/email';
import { auth } from '$lib/server/lucia';
import { generateEmailVerificationToken, generatePasswordResetToken } from '$lib/server/token';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (session) {
		throw redirect(302, '/user/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {

		const { email, password, username } = Object.fromEntries(await request.formData());

		if (typeof email !== 'string' || email.length < 4 || email.length > 31) {
			return fail(400, {
				message: 'Invalid username'
			});
		} else if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		} else if (typeof username !== 'string' || username.length > 50) {
			return fail(400, {
				message: 'Invalid username'
			});
		} else
			try {
				const user = await auth.createUser({
					key: {
						providerId: "email",
						providerUserId: email,
						password: password,
					},
					attributes: {
						email,
						username,
						email_verified: false
					},
				});
				const session = await auth.createSession({
					userId: user.userId,
					attributes: {
						username: username,
					}
					
				});
				const token = await generateEmailVerificationToken(user.userId);
				await sendEmailVerificationLink(token);
				locals.auth.setSession(session)  

			} catch (e) {
				// check for unique constraint error in user table
				if (e instanceof LuciaError && e.message === "AUTH_INVALID_PASSWORD") {
					return fail(400, {
						message: 'Account already exists'
					});
				}
				console.log(e)
				return fail(500, {
					message: 'An unknown error occurred'
				});
			}
			throw redirect(302, '/email-verification');
	}
};

