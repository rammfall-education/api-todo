import sgMail from '@sendgrid/mail';

export const mailClient = sgMail;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
