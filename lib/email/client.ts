import { Resend } from 'resend';

export const FROM_EMAIL = 'AI Buddy <noreply@aibuddy.ltd>';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

// Lazy initialization - only create client when needed
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const resend = getResendClient();

  if (!resend) {
    console.warn('RESEND_API_KEY not set, skipping email send');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data?.id);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
