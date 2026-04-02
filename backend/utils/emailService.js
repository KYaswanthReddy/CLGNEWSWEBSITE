import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  await resend.emails.send({
    from: 'College News Portal <onboarding@resend.dev>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || `<p>${options.message}</p>`,
  });
};

export default sendEmail;
