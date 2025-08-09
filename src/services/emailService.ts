import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You need to replace these with your actual EmailJS credentials:
// 1. Go to https://www.emailjs.com/
// 2. Create account and verify email
// 3. Create a new service (Gmail recommended)
// 4. Create an email template
// 5. Get your User ID, Service ID, and Template ID

const EMAIL_CONFIG = {
  serviceId: 'service_jjzxgeo', // Your EmailJS service ID
  templateId: 'template_awxkafi', // Your EmailJS template ID
  publicKey: 'aNo2KXMY5rIC8Ko4F', // Your EmailJS public key
};

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);

interface ContactFormData {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      contact_method: data.email ? `Email: ${data.email}` : `Phone: ${data.phone}`,
      message: data.message,
    };

    // Send email
    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    console.log('Email sent successfully:', response.status);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Email template structure for reference:
/*
EmailJS Template should include these variables:
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email
- {{from_phone}} - Sender's phone
- {{contact_method}} - Either email or phone
- {{message}} - The actual message
- {{to_email}} - Your email (yashnileshgori@gmail.com)

Example template:
Subject: New Contact Form Message from {{from_name}}

Hello Yash,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Contact: {{contact_method}}
Message:
{{message}}

---
This email was sent from your portfolio contact form.
*/