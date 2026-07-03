import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiMail, HiArrowRight } from 'react-icons/hi'
import Marquee from '../components/motion/Marquee'
import Magnetic from '../components/motion/Magnetic'

const marqueeWords = ['Web Development', '★', 'Admin Panels', '★', 'Free Hosting', '★', 'SEO Ready', '★', 'Mobile Apps', '★', 'Local Service', '★']

export default function Footer() {
  return (
    <footer className="mt-28">
      {/* Big animated CTA band */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-10 md:p-16 text-center shadow-xl"
        >
          {/* animated gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 dark:from-indigo-500/15 dark:via-purple-500/10 dark:to-blue-500/15" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />

          <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Available for new projects
            </span>
            <h2 className="h2">
              Ready to grow your business <span className="text-gradient-animated">online?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Let's build a website that turns visitors into customers. Free domain, free hosting forever, starting at Rs. 10,999.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Magnetic strength={0.4}>
                <a href="#contact" className="btn btn-glow group">
                  Start a Project
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
              <a href="mailto:regmi7943@gmail.com" className="btn btn-secondary">
                <HiMail /> Email Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="mt-16 border-y border-slate-200 dark:border-slate-800 py-5 overflow-hidden">
        <Marquee duration={30}>
          {marqueeWords.map((w, i) => (
            <span
              key={i}
              className={`mx-6 text-xl md:text-2xl font-extrabold tracking-tight uppercase ${
                w === '★' ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-600'
              }`}
            >
              {w}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Footer columns */}
      <div className="container py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src="/profile.png" alt="Kiran Regmi" className="h-8 w-8 rounded-full object-cover border border-slate-200 dark:border-slate-800" />
              <span className="font-bold text-sm text-slate-800 dark:text-white tracking-tight">Kiran Regmi</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Freelance web developer from Chitwan, Nepal. Building clean, affordable websites that help local businesses grow online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <FooterLink href="#projects">Client Work</FooterLink>
              <FooterLink href="#pricing">Pricing Plans</FooterLink>
              <FooterLink href="#process">How I Work</FooterLink>
              <FooterLink href="#contact">Get In Touch</FooterLink>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Services</h4>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400">Business Websites</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Admin Control Panels</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Domain & Hosting Setup</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Mobile App Development</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Connect</h4>
            <div className="flex flex-col gap-2">
              <FooterLink href="mailto:regmi7943@gmail.com" icon={<HiMail className="text-sm" />}>regmi7943@gmail.com</FooterLink>
              <FooterLink href="https://github.com/kiran987657" icon={<FaGithub className="text-sm" />} external>@kiran987657</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Kiran Regmi. All rights reserved.</p>
          <a href="#hero" className="font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 group">
            Back to top
            <span className="inline-block group-hover:-translate-y-1 transition-transform">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children, icon, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 w-fit group"
    >
      {icon}{children}
    </a>
  )
}
