import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { ROUTES } from "../config/constants.js"


export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push(ROUTES.HOME)
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body data-testid="update-card">
            <h2 className="text-center mb-4" data-testid="title">Update Profile</h2>
            {error && <Alert variant="danger" data-testid="error-message">{error}</Alert>}
            <Form onSubmit={handleSubmit} data-testid="ypdate-form">
              <Form.Group id="email" data-testid="email">
                <Form.Label data-testid="label">Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                  data-testid="input"
                />
              </Form.Group>
              <Form.Group id="password" data-testid="password">
                <Form.Label data-testid="label">Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Enter you password"
                  data-testid="input"
                />
              </Form.Group>
              <Form.Group id="password-confirm" data-testid="confirm-password">
                <Form.Label data-testid="label" >Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Re-enter your password"
                  data-testid="input"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit" style={{ background: "#0080c8", borderColor: "#0080c8" }} data-testid="update-btn">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" data-testid="cancel">
          <Link to="/" style={{ color: "#0080c8" }} > Cancel</Link>
        </div>
      </div ></Container >
  )
}
