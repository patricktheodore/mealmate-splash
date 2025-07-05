import { Resend } from 'npm:resend@4.0.0';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { WelcomeEmail } from './_templates/welcome-email.tsx';
import { OnboardingEmail } from './_templates/onboarding-email.tsx';

const apiKey = Deno.env.get('RESEND_API_KEY');

const AUTOMATION_TEMPLATES = {
	'aut_75def6ae-6ffe-46f1-8823-14bbc3fcbe51': 'welcome',
	'aut_12753fd4-7977-436c-a47e-b34f31af8bd0': 'test',
} as const;

type TemplateType = (typeof AUTOMATION_TEMPLATES)[keyof typeof AUTOMATION_TEMPLATES];

if (!apiKey) {
	throw new Error('RESEND_API_KEY environment variable is not set');
}

const resend = new Resend(apiKey);

Deno.serve(async (req) => {
	if (req.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 });
	}

	try {
		const payload = await req.json();

        const { subscriber_email, automation_id } = payload;

        const templateType = AUTOMATION_TEMPLATES[automation_id];

        if (!templateType) {
            console.warn(`No template configured for automation_id: ${automation_id}`);
            return new Response(
                JSON.stringify({
                    success: true,
                    skipped: 'no_template_configured',
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const { html, subject, from } = await generateEmailContent(
            templateType, 
            subscriber_email,
        );

        const { error } = await resend.emails.send({
            from,
            to: [subscriber_email],
            subject,
            html,
        });

        if (error) {
            throw error;
        }

		return new Response(JSON.stringify({ 
            success: true, 
            template_used: templateType 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
});

async function generateEmailContent(templateType: TemplateType, subscriber_email: string) {
	switch (templateType) {
		case 'welcome':
        case 'onboarding':
			return {
				html: await renderAsync(
					WelcomeEmail({
						subscriber_email,
					})
				),
				subject: 'Mealmate - Welcome to the club!',
				from: 'admin@mealmate.au',
			};

		case 'test':
			return {
				html: await renderAsync(
					OnboardingEmail({
						subscriber_email,
					})
				),
				subject: 'First steps with Mealmate',
				from: 'admin@mealmate.au',
			};

		default:
			throw new Error(`Unknown template type: ${templateType}`);
	}
}
