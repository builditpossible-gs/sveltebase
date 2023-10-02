import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { prisma_client } from "$lib/server/prisma"

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) {
        throw redirect(302, '/dashboard');
    }
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { email, password } = Object.fromEntries(await request.formData())

        if (typeof email !== 'string' || email.length < 1 || email.length > 255) {
            return fail(400, {
                message: 'Invalid email'
            });
        }
        if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
            return fail(400, {
                message: 'Invalid password'
            });
        }
        try {
            const key = await auth.useKey(
                "email", email, password
            );
            const getUserUrl = await prisma_client.user.findUnique({
                where: {
                    id: key.userId,
                },
                select: { username: true },
            })
            const username = getUserUrl?.username!
            console.log(username)
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {
                    username: username,
                }
            });
            await locals.auth.setSession(session);

        } catch (e) {
            console.log(e)
            if (
                e instanceof LuciaError &&
                (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
            ) {
                return fail(400, {
                    message: 'Incorrect email or password'
                });
            }
            return fail(500, {
                message: 'An unknown error occurred'
            });
        }
        throw redirect(302, '/dashboard');
    }
}