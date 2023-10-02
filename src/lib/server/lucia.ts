import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prisma_client } from "$lib/server/prisma";
import { sveltekit } from "lucia/middleware";

export const auth = lucia({
    adapter: prisma(prisma_client),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    getUserAttributes(User) {
        return {
            email: User.email,
            username: User.username,
			emailVerified: User.email_verified
        }
    },
 })
export type Auth = typeof auth;
