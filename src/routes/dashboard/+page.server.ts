import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { prisma_client } from "$lib/server/prisma"

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate()
	if (!session) {
		throw redirect(302, '/login');
	}
	
};