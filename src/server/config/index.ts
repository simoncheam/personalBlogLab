import * as dotenv from 'dotenv';

dotenv.config();

export const database_config = {   
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
}; 

export const jwt_config = {   
	
	secret:process.env.JWT_SECRET,
	signature:process.env.JWT_SIGNATURE,
	expiration:process.env.JWT_EXPIRATION
}; 



export default {
	stripe: {
		secret: process.env.STRIPE_API_KEY
	},
	mailgun: {
		apiKey: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
		toEmail: process.env.MAILGUN_TO_EMAIL,
		pubKey: process.env.MAILGUN_PUB_KEY
	},
	jwt_config, 
	database_config

};

