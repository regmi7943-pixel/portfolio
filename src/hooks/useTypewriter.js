import { useEffect, useState } from 'react'

/**
 * useTypewriter — cycles through an array of words/phrases, typing and
 * deleting each one in a loop. Returns the current visible string.
 *
 *   const text = useTypewriter(['fast', 'affordable', 'local'])
 */
export default function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 45, hold = 1500 } = {}) {
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), hold)
      return () => clearTimeout(t)
    }

    if (deleting && sub === 0) {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }

    const t = setTimeout(() => {
      setSub((s) => s + (deleting ? -1 : 1))
    }, deleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(t)
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, hold])

  return words[index % words.length].substring(0, sub)
}
