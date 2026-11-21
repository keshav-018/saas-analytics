'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import '../globals.css'
import '../theme.css'
import '../../components/pages/FPassword/Main.css'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Your password must be at least 8 characters long.')
      return
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) {
        setError(updateError.message || 'Unable to update your password. Please try again.')
        return
      }

      setSuccess(true)
      router.replace('/dashboard')
      router.refresh()
    } catch {
      setError('Unable to connect to the authentication service. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <Link href="/" className="back-to-login">Back to sign in</Link>
        <div className="forgot-password-header">
          <div className="forgot-password-logo">
            <Lock size={24} />
            <span>SaaS Analytics</span>
          </div>
          <h1 className="forgot-password-title">Choose a new password</h1>
          <p className="forgot-password-subtitle">Enter and confirm your new password.</p>
        </div>

        {error && (
          <div className="forgot-password-error" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="forgot-password-success" role="status">
            <CheckCircle size={16} />
            <span>Your password has been updated.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="new-password" className="form-label">New password</label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">Confirm new password</label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>
          <button type="submit" className="reset-button" disabled={isLoading}>
            {isLoading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
