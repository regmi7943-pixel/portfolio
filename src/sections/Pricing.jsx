import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { HiCheck, HiOutlineSparkles } from 'react-icons/hi'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Section from '../components/motion/Section'

const plans = [
  {
    name: 'Basic Plan',
    price: 'Rs. 10,999',
    description: 'Perfect for local businesses wanting a clean, professional online brochure.',
    badge: null,
    features: [
      'Up to 10-Page Fully Responsive Website',
      'Free Domain Name (.com / .com.np)',
      'Free Hosting Setup & Support Forever',
      'Contact Forms & Google Map Integration',
      'SEO Friendly Architecture',
      'Social Media Integration',
    ],
    excluded: [
      'Dynamic Admin Control Panel',
      'Email Notification Systems',
      'Dynamic Image/Text Management',
      'Custom Business Email Addresses',
    ],
  },
  {
    name: 'Standard Plan',
    price: 'Rs. 15,999',
    description: 'Great for active businesses requiring custom notification and administrative controls.',
    badge: 'Popular',
    features: [
      'Up to 11-Page Fully Responsive Website',
      'Free Domain Name (.com / .com.np)',
      'Free Hosting Setup & Support Forever',
      'Dynamic Administrative Panel',
      'Automated Email Notification System',
      'Contact Forms & Google Map Integration',
      'SEO Friendly Architecture',
      'Social Media Integration',
    ],
    excluded: [
      'Complete Content Control (Image swap, Text edits)',
      'Custom Business Email Addresses',
    ],
  },
  {
    name: 'Premium Plan',
    price: 'Rs. 20,999',
    description: 'The ultimate digital solution for full self-management and brand authority.',
    badge: 'Best Value',
    features: [
      '14+ Page Fully Responsive Website',
      'Free Domain Name (.com / .com.np)',
      'Free Hosting Setup & Support Forever',
      'Full Administrative Control Panel',
      'Complete Content Control (swap images, edit/add text)',
      'Custom Business Email (e.g. info@yourbusiness.com)',
      'Automated Email Notification System',
      'Priority Post-Launch Maintenance Support',
      'Advanced SEO & Analytics Integration',
    ],
    excluded: [],
  },
]

export default function Pricing() {
  return (
    <Section id="pricing" className="relative py-12">
      {/* Decorative Glow background */}
      <div className="glow-spot w-[500px] h-[500px] bg-indigo-500/5 top-1/4 left-1/4" />

      <div className="space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">Pricing Packages</span>
          </Reveal>
          <RevealWords as="h2" className="h2" text="Affordable web solutions built for growth." />
          <Reveal delay={0.1}>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Simple, honest pricing with zero hidden fees. Choose a plan that aligns with your business needs and let's get started.
            </p>
          </Reveal>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isHighlight = plan.badge !== null
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col rounded-3xl p-6 md:p-8 transition-shadow duration-300 ${
                  isHighlight
                    ? 'glass-panel ring-gradient shadow-xl dark:shadow-indigo-500/10 bg-slate-100/50 dark:bg-[#0E1525]/80'
                    : 'glass-card spotlight'
                }`}
              >
                {/* Highlight Badge */}
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-white rounded-full flex items-center gap-1 shadow-md shadow-indigo-600/20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient-pan">
                    <HiOutlineSparkles /> {plan.badge}
                  </span>
                )}

                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 min-h-[32px]">{plan.description}</p>
                  <div className="pt-2">
                    <span className={`text-4xl font-extrabold tracking-tight ${isHighlight ? 'text-gradient-animated' : 'text-slate-900 dark:text-white'}`}>{plan.price}</span>
                    <span className="text-xs text-slate-550 dark:text-slate-400 ml-1">/ One-time fee</span>
                  </div>
                </div>

                <div className="border-t border-slate-200/50 dark:border-slate-800/40 my-4" />

                {/* Features List */}
                <div className="flex-1 space-y-3.5 mb-8 text-xs">
                  {plan.features.map((feat, i) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.04 }}
                      className="flex items-start gap-2.5 text-slate-700 dark:text-slate-350"
                    >
                      <span className="h-4.5 w-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HiCheck className="text-sm" />
                      </span>
                      <span>{feat}</span>
                    </motion.div>
                  ))}

                  {/* Excluded items */}
                  {plan.excluded.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-slate-400 dark:text-slate-600 line-through decoration-slate-300 dark:decoration-slate-800">
                      <span className="h-4.5 w-4.5 rounded-full bg-slate-100 text-slate-400 dark:bg-slate-900/60 dark:text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        —
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Button CTA */}
                <a
                  href="#contact"
                  className={`btn w-full ${isHighlight ? 'btn-glow' : 'btn-secondary'}`}
                >
                  Choose {plan.name}
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Local Support / Terms footnote */}
        <Reveal delay={0.1}>
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-4 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 font-medium">
            <span>🤝 1-Year Free Technical Support</span>
            <span>⏱️ Typical Delivery: 7–14 Business Days</span>
            <span>💬 Custom scopes welcome (contact me)</span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
