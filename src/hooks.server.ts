import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from '@sveltejs/kit/hooks';

const authRequest = (async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	if (event.url.pathname.startsWith('/user')) {
		if (event.locals?.auth) {
			const session = await event.locals.auth.validate();
			if (!session){
				throw redirect(302, "/login")
			}
			const userVerified = await prisma.user.findUnique({
				where: {
				  id: session.user.userId
				},
				select: {
					email_verified: true
				}
			  })
			  if (!userVerified?.email_verified){
				throw redirect(302, "/email-verification")
			  }
		}
	}
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(authRequest);




// export const handle: Handle = async ({ event, resolve }) => {

// 	if (event.url.pathname.startsWith('/user')){
// 		console.log("Protected Route : " )
// 	}else {
// 		console.log("Unprotected Route")
// 	}

// 	event.locals.auth = auth.handleRequest(event);
// 	return await resolve(event);
// };