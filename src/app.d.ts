// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";
/// 
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			email: string,
			username: string,
			email_verified: boolean;
		};
		type DatabaseSessionAttributes = {
			username: string?,
		};
	}
	var prisma: PrismaClient
}

export {};
