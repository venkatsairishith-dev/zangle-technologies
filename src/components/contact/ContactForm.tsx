import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Field } from '../common/Field';
import { Badge } from '../common/Badge';
import {
  User,
  Mail,
  Building,
  Phone,
  MessageSquare,
  CheckCircle2,
  Send,
  HelpCircle
} from 'lucide-react';

interface ContactFormProps {
  onSuccess?: (name: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Hiring Tech Talent',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess(formData.name);
      }
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-zangle-card border border-emerald-500/30 text-center shadow-xl">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <Badge variant="emerald" size="xs" className="mb-2">
          INQUIRY RECEIVED
        </Badge>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Thank You, {formData.name}!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Your message has been routed to our practice leads. We will reach out to <span className="text-cyan-500 font-bold">{formData.email}</span> within 2 hours during normal business operations.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              inquiryType: 'Hiring Tech Talent',
              message: ''
            });
          }}
        >
          Send Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="mb-6">
        <Badge variant="cyan" size="xs" className="mb-2">
          DIRECT ADVISORY CHANNEL
        </Badge>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Send Us an Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tell us about your upcoming project milestones or talent search criteria.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" required delay={0.0}>
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jane Doe"
              className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/70 transition-colors duration-200"
            />
          </Field>

          <Field label="Corporate Email" required delay={0.06}>
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jane@company.com"
              className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/70 transition-colors duration-200"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Company / Organization" delay={0.12}>
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Corp"
              className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/70 transition-colors duration-200"
            />
          </Field>

          <Field label="Inquiry Type" delay={0.18}>
            <select
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/70 transition-colors duration-200"
            >
              <option value="Hiring Tech Talent">Hire Tech Talent (Contract / FTE)</option>
              <option value="Joining as a Candidate">Join Talent Network as Candidate</option>
              <option value="Managed Engineering Pod">Managed Engineering Pod Inquiry</option>
              <option value="General Partnership">General Partnership / Other</option>
            </select>
          </Field>
        </div>

        <Field label="Message / Requirements" required delay={0.24}>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Provide context regarding your tech stack, timeline, or candidate qualifications..."
            className="w-full p-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/70 transition-colors duration-200"
          />
        </Field>

        <Button
          variant="glow"
          size="md"
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
          rightIcon={<Send className="w-4 h-4" />}
        >
          Send Inquiry
        </Button>
      </form>
    </div>
  );
};
