import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { prisma_client } from "$lib/server/prisma"
import { generatePasswordResetToken } from '$lib/server/token';
import { isValidEmail, sendPasswordResetLink } from '$lib/server/email';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (session) {
		throw redirect(302, '/user/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const userEmail = formData.get('email');
		// email check
		if (!isValidEmail(userEmail)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		try {
			const getUser = await prisma_client.User.findUnique({
				where: {
					email: userEmail
				}, select: {
					id: true
				}
			})
			if (!getUser) {
				return fail(400, {
					message: 'Something went wrong'
				});
			}
			const token = await generatePasswordResetToken(getUser.id);
			await sendPasswordResetLink(token);
			return {
				success: true,
			};
		} catch (error) {
			return fail(500, {
				message: 'An unknown error occurred' + error
			});

		}
	}
};