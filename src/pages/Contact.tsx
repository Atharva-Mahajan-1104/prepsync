import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            I'am here to help you succeed in your interview journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'atharvamahajan2004@gmail.com',
                link: 'mailto:atharvamahajan2004@gmail.com',
              },
              {
                icon: Phone,
                title: 'Phone',
                content: '+91 9158352870',
                link: 'tel:+15551234567',
              },
              {
                icon: MapPin,
                title: 'Address',
                content: 'Loni Kalbhor, Pune',
                link: '#',
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                content: 'Available 24/7',
                link: '#',
              },
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.link}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-lg"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                  placeholder="atharvamahajan2004@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
                  placeholder="How can i help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary h-32"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'How quickly do you respond to inquiries?',
                a: 'We aim to respond to all inquiries within 24 hours during business days.',
              },
              {
                q: 'Do you offer emergency support?',
                a: 'Yes, premium users have access to priority support with faster response times.',
              },
              {
                q: 'Can I schedule a demo?',
                a: 'Absolutely! You can schedule a demo through our calendar booking system.',
              },
              {
                q: 'Do you offer custom enterprise solutions?',
                a: 'Yes, we provide tailored solutions for organizations. Contact our sales team.',
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}