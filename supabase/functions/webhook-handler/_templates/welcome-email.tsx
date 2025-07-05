// supabase/functions/webhook-handler/_templates/welcome-email.tsx
import React from 'npm:react@18.3.1';
import { Font, Body, Container, Head, Heading, Html, Link, Preview, Text, Hr, Section, Img } from 'npm:@react-email/components@0.0.22';

interface WelcomeEmailProps {
	subscriber_email: string;
}

export const WelcomeEmail = ({ subscriber_email }: WelcomeEmailProps) => (
	<Html>
		<Head>
            <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
		<Preview>Welcome to the club!</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={header}>
					<Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//mealmate-logo-peaking.png"
						width="150"
						alt="MealMate Logo"
						style={{ display: 'block', margin: '0 auto 20px' }}
					/>
					<Heading style={h1}>Welcome to the club!</Heading>
				</Section>

				<Section style={section}>
					<Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//mealmate-homie-couch.png"
						width="200"
						alt="MealMate homie sitting on a couch"
						style={{ display: 'block', margin: '0 auto 20px' }}
					/>
					<Heading style={h2}>Why we're building <strong>mealmate</strong>...</Heading>
					<Text style={text}>
						Every week, we were stuck in the same loop - what to cook and what to buy. So we started
						building the tool we always wished existed - a smarter system that plans for you, cuts waste,
						saves cash, and connects straight to your grocery shop.
					</Text>
					<Text style={text}>Not a recipe app. Not a meal kit.</Text>
					<Text style={text}>
						Just a better way to eat - automated, optimised, and built around how you actually shop.
					</Text>
				</Section>

				<Section style={section}>
					<Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//mealmate-homie-thinking.png"
						width="200"
						alt="MealMate homie thinking with question marks around his head"
						style={{ display: 'block', margin: '0 auto 20px' }}
					/>
					<Heading style={h2}>Why you're here...</Heading>
					<Text style={text}>
						You're one of the few helping shape a smarter future of grocery shopping.
					</Text>
					<Text style={text}>Tell us what sucks. What you wish existed. What you'd love <strong>mealmate</strong> to do.</Text>
					<Text style={text}>
						We're listening. And we're building with you.
					</Text>
				</Section>

				<Section style={section}>
					<Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//phone-with-play-button.png"
						width="200"
						alt="MealMate homie thinking with question marks around his head"
						style={{ display: 'block', margin: '0 auto 20px' }}
					/>
					<Heading style={h2}>What to expect next...</Heading>
					<Text style={text}>
						Over the next couple of emails, we'll break it down:
					</Text>
                    <Text style={text}>
                        &#x2022; Why eating well still feels so hard
                        <br />
                        &#x2022; How <strong>mealmate</strong> actually works
                    </Text>
					<Text style={text}>
						After that, you'll You'll start hearing from us every so often with honest updates from inside the build. Quick, honest, and fresh from the kitchen.
					</Text>
				</Section>

                <Section style={footer}>
                    <Text style={text}>
                        Have thoughts already? Reply to this or hit us at admin@mealmate.au - we read everything.
                    </Text>
                    <Hr style={divider}/>
                    <Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//mealmate-logo.png"
						width="150"
						alt="MealMate Logo"
						style={{ display: 'block', margin: '0 auto 20px' }}
					/>
                </Section>
			</Container>
		</Body>
	</Html>
);

const brandColors = {
	background: '#F1F3E4',
	foreground: '#171717',
	primary: '#25551B',
	secondary: '#E2F380',
	accent: '#FFBDBD',
};

const main = {
	backgroundColor: brandColors.background,
	margin: '0 auto',
	lineHeight: '1.6',
};

const container = {
	margin: 'auto',
	padding: '10px',
	backgroundColor: brandColors.background,
};

const header = {
	textAlign: 'center' as const,
	padding: '30px 20px',
	backgroundColor: brandColors.secondary,
	borderRadius: '8px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
};

const h1 = {
	color: brandColors.primary,
	fontSize: '32px',
	fontWeight: '700',
	lineHeight: '1.2',
	margin: '0',
	padding: '0 20px',
	textAlign: 'center',
};

const h2 = {
	color: brandColors.primary,
	fontSize: '24px',
	fontWeight: '900',
	lineHeight: '1.2',
	margin: '0 0 20px',
};

const section = {
	margin: '20px 0',
	textAlign: 'center' as const,
	backgroundColor: brandColors.background,
	padding: '40px',
	borderRadius: '8px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
};

const text = {
	color: brandColors.foreground,
	fontSize: '14px',
	lineHeight: '1.8',
	margin: '0 0 20px',
};

const footer = {
    margin: '20px 0',
	textAlign: 'center' as const,
	backgroundColor: brandColors.accent,
	padding: '40px',
	borderRadius: '8px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
}

const divider = {
    marginTop: 16,
    borderColor: brandColors.foreground,
    marginBottom: 16,
    borderTopWidth: 2,
}
