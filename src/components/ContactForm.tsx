
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageCircle, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { resumeData } from '@/data/resume';
import { toast } from "sonner";
import { sendContactEmail } from '@/services/emailService';

const ContactForm = () => {
  // Quick message state
  const [quickMessage, setQuickMessage] = useState('');

  // Full form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; message?: string; quickMessage?: string }>({});

  const validateQuickMessage = () => {
    if (!quickMessage.trim()) {
      setErrors({ quickMessage: 'Please enter a message' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateFullForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string; message?: string } = {};

    if (!name.trim()) newErrors.name = 'Name is required';

    // Either email or phone is required
    const hasEmail = email.trim();
    const hasPhone = phone.trim();

    if (!hasEmail && !hasPhone) {
      newErrors.email = 'Either email or phone is required';
      newErrors.phone = 'Either email or phone is required';
    } else {
      if (hasEmail && !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (hasPhone && !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickWhatsApp = () => {
    if (!validateQuickMessage()) return;

    const whatsappMessage = `Hi Yash! 👋\n\n${quickMessage}`;
    const whatsappNumber = resumeData.contact.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, '_blank');
    toast.success("Redirecting to WhatsApp!", {
      description: "Your message has been pre-filled.",
      icon: <MessageCircle className="h-4 w-4" />
    });
    setQuickMessage('');
  };

  const handleQuickEmail = () => {
    if (!validateQuickMessage()) return;

    const subject = `Quick Message from Portfolio`;
    const body = quickMessage;
    window.location.href = `mailto:${resumeData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setQuickMessage('');
  };

  const handleFullFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFullForm()) return;

    setIsSubmitting(true);

    try {
      // Send email via EmailJS
      const emailSent = await sendContactEmail({
        name,
        email: email || undefined,
        phone: phone || undefined,
        message
      });

      if (emailSent) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon!",
          icon: <CheckCircle className="h-4 w-4" />
        });

        // Clear form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        throw new Error('Email service failed');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Fallback to WhatsApp
      toast.error("Email failed, redirecting to WhatsApp", {
        description: "Trying WhatsApp as backup...",
        icon: <AlertCircle className="h-4 w-4" />
      });

      // Fallback: Send via WhatsApp
      const contactInfo = email ? `Email: ${email}` : `Phone: ${phone}`;
      const whatsappMessage = `📩 *Contact Form Message*\n\n*Name:* ${name}\n*${contactInfo}*\n\n*Message:*\n${message}`;
      const whatsappNumber = resumeData.contact.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-700/30 rounded-lg p-6 h-full">
      <h3 className="text-xl font-semibold text-center mb-6 text-white">Get In Touch</h3>
      <div className="space-y-6">
      {/* Division 1: Quick Message */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Quick Message</h3>

        <div className="space-y-2">
          <Textarea
            placeholder="Type your message here..."
            value={quickMessage}
            onChange={(e) => {
              setQuickMessage(e.target.value);
              if (errors.quickMessage) setErrors(prev => ({ ...prev, quickMessage: undefined }));
            }}
            rows={2}
            className={`bg-transparent border-gray-600 ${errors.quickMessage ? 'border-destructive' : ''}`}
          />
          {errors.quickMessage && <p className="text-sm text-destructive">{errors.quickMessage}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleQuickWhatsApp}
            className="group py-2"
          >
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">WhatsApp</p>
                <p className="text-xs text-gray-400">Send via WhatsApp</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleQuickEmail}
            className="group py-2"
          >
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">Email</p>
                <p className="text-xs text-gray-400">Send via email client</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Division 2: Full Contact Form */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Reach Out</h3>

        <form onSubmit={handleFullFormSubmit} className="space-y-3">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
              }}
              className={`h-10 bg-transparent border-gray-600 ${errors.name ? 'border-destructive' : ''}`}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                className={`h-10 bg-transparent border-gray-600 ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                }}
                className={`h-10 bg-transparent border-gray-600 ${errors.phone ? 'border-destructive' : ''}`}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">* Either email or phone number is required</p>

          <div className="space-y-2">
            <Textarea
              placeholder="Your Message *"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
              }}
              rows={3}
              className={`bg-transparent border-gray-600 ${errors.message ? 'border-destructive' : ''}`}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg group-hover:bg-white/15 transition-all duration-200">
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 text-white animate-spin" />
                ) : (
                  <Send className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white group-hover:text-gray-300 transition-colors">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </p>
                <p className="text-xs text-gray-400">
                  {isSubmitting ? 'Please wait' : 'Submit your message'}
                </p>
              </div>
            </div>
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ContactForm;
