import * as dotenv from 'dotenv';

dotenv.config();

export const database_config = {   
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
}; 

export default {
	stripe: {
		secret: process.env.STRIPE_API_KEY
	},
	mailgun: {
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
		toEmail: process.env.MAILGUN_TO_EMAIL
	}

};

