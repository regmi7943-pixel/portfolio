import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const firebaseReady = !!db

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      if (!firebaseReady) throw new Error('Firebase not configured')
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: serverTimestamp(),
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="h2 mb-4">Contact</h2>
        <p className="p">Have a question or want to work together? Send me a message.</p>
        <div className="flex gap-4 mt-4">
          <a className="btn btn-secondary" href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn btn-secondary" href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-secondary" href="mailto:you@email.com">Email</a>
        </div>
      </div>
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input required name="name" value={form.name} onChange={onChange} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input required type="email" name="email" value={form.email} onChange={onChange} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea required name="message" rows="4" value={form.message} onChange={onChange} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2" />
        </div>
        <button disabled={status==='loading' || !firebaseReady} className="btn btn-primary" type="submit">
          {status==='loading' ? 'Sending…' : 'Send Message'}
        </button>
        {!firebaseReady && (
          <p className="text-amber-600 text-sm">Contact form disabled. Add Firebase keys to <code>.env</code> to enable.</p>
        )}
        {status==='success' && <p className="text-green-600 text-sm">Thanks! I will get back to you soon.</p>}
        {status==='error' && <p className="text-rose-600 text-sm">Something went wrong. Please try again.</p>}
      </form>
    </div>
  )
}
