import { Body, Container, Head, Heading, Html, Preview, Text, Section, Img, Button } from '@react-email/components';
import React from 'react';

export interface ContactEmailProps {
	name: string;
	email: string;
	subject: string;
	message: string;
}

const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({ name, email, subject, message }): React.ReactElement => (
	<Html>
		<Head />
		<Preview>New Contact Form Submission</Preview>
		<Body style={main}>
			<Container style={container}>
				{/* Header */}
				<Section style={header}>
					<Img
						src="https://lrosndfdleaphhbmyzcb.supabase.co/storage/v1/object/public/email-images//mealmate-logo.png"
						width="150"
						height="45"
						alt="MealMate Logo"
						style={{ display: 'block', margin: '0 auto 20px' }}
					/>
					<Heading style={h1}>Contact Form Submission</Heading>
				</Section>

				{/* Contact Details */}
				<Section style={contactCard}>
					
					<Section style={detailRow}>
						<Text style={label}>Name:</Text>
						<Text style={value}>{name}</Text>
					</Section>

					<Section style={detailRow}>
						<Text style={label}>Email:</Text>
						<Text style={value}>{email}</Text>
					</Section>

					{subject && (
						<Section style={detailRow}>
							<Text style={label}>Subject:</Text>
							<Text style={value}>{subject}</Text>
						</Section>
					)}
				</Section>

				{/* Message */}
				<Section style={messageCard}>
					<Text style={cardTitle}>Message:</Text>
					<Text style={messageText}>{message}</Text>
				</Section>

				{/* Quick Actions */}
				<Section style={actionSection}>
					<Button
						href={`mailto:${email}?subject=Re: ${subject || 'Your MealMate inquiry'}`}
						style={replyButton}
					>
						Reply Now 
					</Button>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default ContactEmail;

// Brand colors from MealMate
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
	padding: '20px',
	maxWidth: '600px',
	backgroundColor: brandColors.background,
};

const header = {
	textAlign: 'center' as const,
	marginBottom: '30px',
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
	fontSize: '28px',
	fontWeight: '700',
	lineHeight: '1.2',
	margin: '0 0 8px',
};

const subtitle = {
	color: brandColors.primary,
	fontSize: '16px',
	fontWeight: '500',
	margin: '0',
};

const contactCard = {
	backgroundColor: brandColors.background,
	padding: '25px',
	borderRadius: '8px',
	marginBottom: '20px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
};

const messageCard = {
	backgroundColor: brandColors.accent,
	padding: '25px',
	borderRadius: '8px',
	marginBottom: '20px',
	borderLeft: `2px solid ${brandColors.primary}`,
	borderTop: `2px solid ${brandColors.primary}`,
	borderRight: `6px solid ${brandColors.primary}`,
	borderBottom: `6px solid ${brandColors.primary}`,
};

const cardTitle = {
	color: brandColors.primary,
	fontSize: '18px',
	fontWeight: '600',
	margin: '0 0 15px',
};

const detailRow = {
	display: 'flex',
	alignItems: 'center',
	marginBottom: '12px',
};

const label = {
	color: brandColors.primary,
	fontSize: '14px',
	fontWeight: '600',
	margin: '0 12px 0 0',
	minWidth: '80px',
};

const value = {
	color: brandColors.foreground,
	fontSize: '14px',
	margin: '0',
	wordBreak: 'break-word' as const,
};

const messageText = {
	color: brandColors.foreground,
	fontSize: '15px',
	lineHeight: '1.6',
	margin: '0',
	whiteSpace: 'pre-wrap' as const,
	padding: '15px',
	backgroundColor: brandColors.background,
	borderRadius: '6px',
	border: `1px solid ${brandColors.primary}20`,
};

const actionSection = {
	textAlign: 'center' as const,
	padding: '20px',
	marginBottom: '20px',
};

const actionTitle = {
	color: brandColors.primary,
	fontSize: '16px',
	fontWeight: '600',
	margin: '0 0 15px',
};

const replyButton = {
	backgroundColor: brandColors.secondary,
	color: brandColors.primary,
	padding: '12px 24px',
	borderRadius: '6px',
	textDecoration: 'none',
	fontWeight: 'bold',
	fontSize: '16px',
	display: 'inline-block',
	borderLeft: `1px solid ${brandColors.primary}`,
	borderTop: `1px solid ${brandColors.primary}`,
	borderRight: `3px solid ${brandColors.primary}`,
	borderBottom: `3px solid ${brandColors.primary}`,
};

const footer = {
	textAlign: 'center' as const,
	paddingTop: '20px',
	borderTop: `2px solid ${brandColors.accent}`,
};

const footerText = {
	color: '#666666',
	fontSize: '13px',
	lineHeight: '1.5',
	margin: '0',
};