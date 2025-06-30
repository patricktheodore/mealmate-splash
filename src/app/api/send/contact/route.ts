import { Resend } from 'resend';
import ContactEmail from '../../../../../transactional/emails/contact';
import ContactSuccessEmail from '../../../../../transactional/emails/contact-success';
import { NextRequest } from 'next/server';
import { ReactNode } from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitizeInput(input: string): string {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export async function POST(request: NextRequest) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY not configured');
        return Response.json({ error: 'Email service not configured' }, { status: 500 });
    }

	try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message || !subject) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || email.length > 254) {
            return Response.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            subject: subject ? sanitizeInput(subject) : '',
            message: sanitizeInput(message)
        };

		const emailPromises = [
            // Admin notification email
            resend.emails.send({
                from: 'admin@mealmate.au',
                replyTo: sanitizedData.email,
                to: ['admin@mealmate.au'],
                subject: `Contact Form: ${sanitizedData.subject || 'New Message'}`,
                react: ContactEmail(sanitizedData) as ReactNode,
            }),
            // User confirmation email
            resend.emails.send({
                from: 'admin@mealmate.au',
                to: [sanitizedData.email],
                subject: 'Thank you for getting in touch.',
                react: ContactSuccessEmail({ name: sanitizedData.name }) as ReactNode,
            })
        ];

        const [adminEmailResult, confirmationEmailResult] = await Promise.allSettled(emailPromises);

        if (adminEmailResult.status === 'rejected') {
            console.error('Failed to send admin notification:', adminEmailResult.reason);
            return Response.json({ 
                error: 'Failed to send message. Please try again.' 
            }, { status: 500 });
        }

        if (confirmationEmailResult.status === 'rejected') {
            console.error('Failed to send confirmation email:', confirmationEmailResult.reason);
        }

        return Response.json({ 
            success: true, 
            message: 'Message sent successfully' 
        });

	} catch (error) {
        console.error('Error in contact form submission:', error);
		return Response.json({ error }, { status: 500 });
	}
}
