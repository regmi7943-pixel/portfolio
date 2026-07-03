import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMail, HiLocationMarker, HiCheckCircle, HiChevronRight } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import Reveal from '../components/motion/Reveal'
import RevealWords from '../components/motion/RevealWords'
import Section from '../components/motion/Section'
import Magnetic from '../components/motion/Magnetic'
import useSpotlight from '../hooks/useSpotlight'

export default function Contact() {
  const onMove = useSpotlight()
  const [formData, setFormData] = useState({ name: '', email: '', plan: 'standard', message: '' })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setErrorMessage('All fields are required. Please fill in your name, email, and message.')
      return
    }

    setStatus('submitting')
    try {
      if (db) {
        await addDoc(collection(db, 'inquiries'), { ...formData, createdAt: serverTimestamp() })
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log('Firebase Firestore is not initialized. Mock submission payload:', formData)
      }
      setStatus('success')
      setFormData({ name: '', email: '', plan: 'standard', message: '' })
    } catch (err) {
      console.error('Error submitting form:', err)
      setStatus('error')
      setErrorMessage('Could not send your inquiry. Please try again or reach out directly via email.')
    }
  }

  return (
    <Section id="contact" className="relative py-12">
      <div className="glow-spot w-[400px] h-[400px] bg-indigo-500/5 bottom-0 right-10" />

      <div className="space-y-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-650 dark:text-indigo-400">Get In Touch</span>
          </Reveal>
          <RevealWords as="h2" className="h2" text="Let's craft something beautiful together." />
          <Reveal delay={0.1}>
            <p className="p">
              Ready to expand your brand's digital presence? Share your project details, and let's design a high-converting website tailored to your business.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Direct Info & Accents */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h3 className="h3">Connect Directly</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Whether you have a specific project outline, a pricing question, or just want to chat about web ideas, feel free to reach out.
              </p>
            </div>

            {/* Information Cards Stack */}
            <div className="space-y-4">
              <a
                href="mailto:regmi7943@gmail.com"
                onMouseMove={onMove}
                className="glass-card spotlight flex items-center gap-4 p-5 rounded-2xl group hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110">
                  <HiMail />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">regmi7943@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/kiran987657"
                target="_blank"
                rel="noreferrer"
                onMouseMove={onMove}
                className="glass-card spotlight flex items-center gap-4 p-5 rounded-2xl group hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-900/10 text-slate-800 dark:bg-white/10 dark:text-white flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110">
                  <FaGithub />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">GitHub Profile</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">@kiran987657</p>
                </div>
              </a>

              <div className="glass-card flex items-center gap-4 p-5 rounded-2xl">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center text-xl">
                  <HiLocationMarker />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Base Location</h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Chitwan, Nepal</p>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="p-5 rounded-2xl bg-indigo-500/[0.03] dark:bg-indigo-400/[0.02] border border-indigo-500/10 dark:border-indigo-500/5 flex items-start gap-4">
              <span className="relative flex h-2 w-2 mt-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-350">Status: Available for Hire</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Currently accepting web development projects. Average initial proposal turnaround is 12–24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 shadow-xl dark:shadow-[#05070a]"
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Send a Project Inquiry</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field */}
                <Field id="name" label="Your Name" value={formData.name} onChange={handleChange} placeholder="John Doe" disabled={status === 'submitting' || status === 'success'} />
                {/* Email field */}
                <Field id="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} placeholder="john@example.com" disabled={status === 'submitting' || status === 'success'} />

                {/* Project Plan selection */}
                <div className="space-y-1.5">
                  <label htmlFor="plan" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Select Plan / Interest</label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    disabled={status === 'submitting' || status === 'success'}
                    className="w-full bg-slate-100/50 dark:bg-[#0A0E17]/40 border border-slate-200/50 dark:border-slate-800/60 focus:border-indigo-500 dark:focus:border-indigo-500/80 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500/20 text-slate-800 dark:text-slate-300 outline-none transition-all"
                  >
                    <option value="basic" className="dark:bg-[#080B10]">Basic Plan — Rs. 10,999</option>
                    <option value="standard" className="dark:bg-[#080B10]">Standard Plan — Rs. 15,999</option>
                    <option value="premium" className="dark:bg-[#080B10]">Premium Plan — Rs. 20,999</option>
                    <option value="custom" className="dark:bg-[#080B10]">Custom / Multi-Page Scope</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about your business, the goals of this website, and when you'd like to launch..."
                    disabled={status === 'submitting' || status === 'success'}
                    className="w-full bg-slate-100/50 dark:bg-[#0A0E17]/40 border border-slate-200/50 dark:border-slate-800/60 focus:border-indigo-500 dark:focus:border-indigo-500/80 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-indigo-500/20 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all resize-none"
                  />
                </div>

                {/* Feedback messages */}
                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg"
                    >
                      ⚠️ {errorMessage}
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-lg flex items-center gap-2"
                    >
                      <HiCheckCircle className="text-base flex-shrink-0" />
                      Inquiry received successfully! I will reach out to you within 24 hours.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action button — magnetic */}
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className="btn btn-glow w-full py-3.5 text-xs uppercase tracking-widest font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Inquiry...
                      </>
                    ) : status === 'success' ? (
                      'Inquiry Sent'
                    ) : (
                      <>
                        Submit Project Inquiry <HiChevronRight className="text-sm font-bold" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Field({ id, label, type = 'text', value, onChange, placeholder, disabled }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-slate-100/50 dark:bg-[#0A0E17]/40 border border-slate-200/50 dark:border-slate-800/60 focus:border-indigo-500 dark:focus:border-indigo-500/80 rounded-xl px-4 py-3.5 text-sm focus:ring-1 focus:ring-indigo-500/20 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-650 outline-none transition-all"
      />
    </div>
  )
}
