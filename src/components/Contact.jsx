import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { name } = portfolioData.personalInfo;
  const github = import.meta.env.VITE_GITHUB_URL || '#';
  const linkedin = import.meta.env.VITE_LINKEDIN_URL || '#';
  const emailAddress = import.meta.env.VITE_EMAIL || 'alex.morgan.dev@example.com';

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Direct',
      value: emailAddress,
      href: `mailto:${emailAddress}`,
      color: 'hover:text-pink-500 hover:border-pink-550/40'
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: 'LinkedIn',
      value: 'Connect with me',
      href: linkedin,
      color: 'hover:text-indigo-650 hover:border-indigo-500/40'
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: 'GitHub',
      value: 'View source & activity',
      href: github,
      color: 'hover:text-slate-900 dark:hover:text-white hover:border-slate-400'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!form.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!form.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setSubmitError('Failed to connect to the server. Please ensure the backend is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Let's connect
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Recruitment & Collaborations
              </h3>
              <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                Have an internship or full-time opportunity? Or perhaps a freelance project or open-source collaboration in mind? Feel free to reach out via direct channels or send a message using the form!
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center space-x-4 transition-all duration-300 hover:shadow-glow-indigo ${method.color}`}
                >
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-650 dark:text-indigo-400 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-450 dark:text-slate-500">
                      {method.title}
                    </h4>
                    <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-250">
                      {method.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                  >
                    <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Message Sent!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-450 text-sm max-w-sm">
                      Thank you for reaching out. Your message has been received successfully, and I will get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                    noValidate
                  >
                    {submitError && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-650 dark:text-red-400 text-sm font-medium mb-2">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                        <p>{submitError}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                          Your Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                              errors.name ? 'border-red-500/80 focus:ring-red-550/20' : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20'
                            } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 transition-all`}
                          />
                          {errors.name && (
                            <span className="absolute right-3 top-3.5 text-red-500">
                              <AlertCircle className="h-5 w-5" />
                            </span>
                          )}
                        </div>
                        {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name}</p>}
                      </div>

                      {/* Email field */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                          Your Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                              errors.email ? 'border-red-500/80 focus:ring-red-550/20' : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20'
                            } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 transition-all`}
                          />
                          {errors.email && (
                            <span className="absolute right-3 top-3.5 text-red-500">
                              <AlertCircle className="h-5 w-5" />
                            </span>
                          )}
                        </div>
                        {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleInputChange}
                          placeholder="Collaboration Proposal"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                            errors.subject ? 'border-red-500/80 focus:ring-red-550/20' : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20'
                          } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 transition-all`}
                        />
                        {errors.subject && (
                          <span className="absolute right-3 top-3.5 text-red-500">
                            <AlertCircle className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                      {errors.subject && <p className="text-red-500 text-xs font-semibold">{errors.subject}</p>}
                    </div>

                    {/* Message field */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-450">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          rows="5"
                          placeholder="Describe the opportunity or idea..."
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border ${
                            errors.message ? 'border-red-500/80 focus:ring-red-550/20' : 'border-slate-200 dark:border-slate-800 focus:ring-indigo-500/20'
                          } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 transition-all resize-none`}
                        />
                        {errors.message && (
                          <span className="absolute right-3 top-3.5 text-red-500">
                            <AlertCircle className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                      {errors.message && <p className="text-red-500 text-xs font-semibold">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
