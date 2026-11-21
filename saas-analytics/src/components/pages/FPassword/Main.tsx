'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { ForgotPasswordFormData } from './Types'
import './Main.css'

export const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailSent, setEmailSent] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    // Basic validation
    if (!formData.email) {
      setError('Please enter your email address')
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const redirectTo = new URL('/auth/callback?next=/update-password', window.location.origin).toString()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        formData.email.trim(),
        { redirectTo },
      )

      if (resetError) {
        setError(resetError.message || 'Unable to send reset instructions. Please try again.')
        return
      }

      setSuccess(true)
      setEmailSent(formData.email.trim())
      setFormData({ email: '' })
    } catch {
      setError('Unable to connect to the authentication service. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        {/* Back to login */}
        <Link href="/" className="back-to-login">
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {/* Header */}
        <div className="forgot-password-header">
          <div className="forgot-password-logo">
            <Image
                src={"/aysodev.png"}
                width={40}
                height={40}
                alt='AysoDev Logo'
            />
            <span>SaaS Analytics</span>
          </div>
          <h1 className="forgot-password-title">Reset your password</h1>
          <p className="forgot-password-subtitle">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="forgot-password-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="forgot-password-success">
            <CheckCircle size={16} />
            <div>
              <p className="success-title">Check your email</p>
              <p className="success-message">
                We&apos;ve sent password reset instructions to <strong>{emailSent}</strong>
              </p>
              <p className="success-note">
                If you don&apos;t see the email, check your spam folder or try again in a few minutes.
              </p>
            </div>
          </div>
        )}

        {/* Reset form - only show if not successful */}
        {!success && (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="reset-button"
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Send Reset Instructions'
              )}
            </button>
          </form>
        )}

        {/* Additional help */}
        <div className="help-section">
          <p className="help-title">Need more help?</p>
          <p className="help-content">
            Contact our support team at{' '}
            <a href="mailto:support@saas-analytics.com" className="help-link">
              support@saas-analytics.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
