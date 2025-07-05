// supabase/functions/webhook-handler/_templates/welcome-email.tsx
import React from 'npm:react@18.3.1';
import { Body, Container, Head, Heading, Html, Link, Preview, Text } from 'npm:@react-email/components@0.0.22';

interface OnboardingEmailProps {
    subscriber_email: string;
}

export const OnboardingEmail = ({ subscriber_email }: OnboardingEmailProps) => (
    <Html>
        <Head />
        <Preview>Onboarded!</Preview>
        <Body style={{ fontFamily: 'Helvetica, sans-serif' }}>
            <Container>
                <Heading>Yoyoyo!</Heading>
                <Text>Hi {subscriber_email}! Cheers for joining our journey.</Text>
                <Link href="https://mealmate.au">Visit our website</Link>
            </Container>
        </Body>
    </Html>
);
