import { Body, Container, Head, Heading, Html, Preview, Text, Section, Img, Button } from '@react-email/components';

export interface ContactSuccessEmailProps {
	name: string;
}

export const ContactSuccessEmail: React.FC<Readonly<ContactSuccessEmailProps>> = ({ name }) => (
	<Html>
		<Head />
		<Preview>Thanks for reaching out! We'll get back to you faster than you can say "ma-ma-ma-meal-mate"!</Preview>
		<Body style={main}>

			<Container style={container}>
                <Section style={header}>
                    <Img
                        src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//contact-email-success.png"
                        width="100%"
                        alt="MealMate Logo"
                        style={{ display: 'block', paddingTop: '40px' }}
                    />
                    <Section style={{ padding: '40px 20px', backgroundColor: '#0C5112', borderRadius: '0 0 8px 8px' }}>
                        <Heading style={h1}>Thanks for getting in touch!</Heading>
                    </Section>
                </Section>

				{/* Main content */}
				<Section style={content}>
					<Text style={welcomeText}>
						Hey {name}! 
					</Text>
					<Text style={text}>
						Thanks for reaching out to us! We read every message sent to us. We'll get back to you as soon as we can.
					</Text>
					<Text style={text}>
						In the meantime, why not check out our latest features? We're always cooking up 
						something delicious!
					</Text>
                    <Button
                        href="https://mealmate.com/features"
                        style={{
                            backgroundColor: brandColors.secondary,
                            color: brandColors.primary,
                            padding: '10px 20px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            borderLeft: `1px solid ${brandColors.primary}`,
                            borderTop: `1px solid ${brandColors.primary}`,
                            borderRight: `3px solid ${brandColors.primary}`,
                            borderBottom: `3px solid ${brandColors.primary}`,
                        }}
                    >
                        Explore 
                    </Button>

				</Section>

				{/* Footer */}
				<Section style={footer}>
                    <Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//mealmate-logo.png"
						width="200"
						height="60"
						alt="MealMate Logo"
                        style={{ display: 'block', margin: '20px auto' }}
					/>
					<Text style={smallText}>
						This email was sent because you contacted us through our website. 
						If you have any questions, just reply to this email!
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default ContactSuccessEmail;

// Brand colors from your CSS
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
	fontFamily: "'Montserrat', Helvetica, sans-serif",
	lineHeight: '1.6',
};

const container = {
	margin: 'auto',
    padding: '10px',
	backgroundColor: brandColors.background,
};

const header = {
	textAlign: 'center' as const,
    backgroundColor: brandColors.background,
    borderRadius: '0 0 8px 8px',
};

const h1 = {
	color: brandColors.background,
	fontSize: '32px',
	fontWeight: '700',
	lineHeight: '1.2',
	margin: '0',
    padding: '0 20px',
	textAlign: 'center' as const,
};

const content = {
    margin: '40px 0',
	textAlign: 'center' as const,
    backgroundColor: brandColors.background,
	padding: '40px',
    borderRadius: '8px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
};

const welcomeText = {
	color: brandColors.foreground,
	fontSize: '32px',
	fontWeight: '600',
	lineHeight: '1.4',
	margin: '0 0 16px',
};

const text = {
	color: brandColors.foreground,
	fontSize: '14px',
	lineHeight: '1.8',
	margin: '0 0 20px',
};

const footer = {
    backgroundColor: brandColors.accent,
	paddingTop: '24px',
	textAlign: 'center' as const,
    padding: '40px 20px',
    borderRadius: '8px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
};

const smallText = {
	color: '#666666',
	fontSize: '12px',
	lineHeight: '1.4',
	margin: '0',
};