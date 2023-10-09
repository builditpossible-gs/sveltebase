import { auth } from '$lib/server/lucia';
import { prisma_client } from '$lib/server/prisma';
import { validateEmailVerificationToken } from '$lib/server/token';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;
	try {
		const userId = await validateEmailVerificationToken(token);
		const user = await auth.getUser(userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: true
		})
		await prisma_client.VerificationToken.delete({
			where: {
				user_id: user.userId
			}
		})
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/user/dashboard'
			}
		});
	} catch (error) {
		const errorHtml = `
		<style>
        /* Center the card both horizontally and vertically */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        /* Style the card */
        .card {
            background-color: #ffffff;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
		.button {
            display: inline-block;
            background-color: black;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Expired Link</h2>
        <p>Your email verification link has expired. Please go back and generate new link</p>
		<a class="button" href="/email-verification">Go to Email Verification</a>
    </div>

    `;

		// Return the HTML as the response body
		return new Response(errorHtml, {
			status: 401,
			headers: {
				'Content-Type': 'text/html',
			},
		});
	}
};