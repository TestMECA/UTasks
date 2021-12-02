import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { ROUTES } from "../config/constants.js"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body data-testid="forgot-password">
            <h2 className="text-center mb-4" data-testid="title">Password Reset</h2>
            {error && <Alert variant="danger" data-testid="error-message">{error}</Alert>}
            {message && <Alert variant="success" data-testid="success-message">{message}</Alert>}
            <Form onSubmit={handleSubmit} data-testid="forgot-password-form">
              <Form.Group id="email" data-testid="email">
                <Form.Label data-testid="label">Email</Form.Label>
                <Form.Control data-testid="input" type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit" data-testid="reset-password-btn">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3" data-testid="login">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" data-testid="signup">
          Need an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </div>
      </div></Container>
  )
}
