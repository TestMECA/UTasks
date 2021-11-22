import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { createUser, useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"


export default function Signup() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }


    setError("")
    setLoading(true)
    signup(emailRef.current.value, passwordRef.current.value).then(cred => {
      const userData = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        userId: cred.user.uid
      };
      createUser(userData);


    }).then(() => {
      console.log('User created! - ' + emailRef.current.value);
      history.push("/home")
    }).catch((e) => {
      setError("Failed to create an account")
      console.log('User Failed! - ' + e.message);
    })

    setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control placeholder="First name" ref={firstNameRef} required />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control placeholder="Last name" ref={lastNameRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="member@utasks.com" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit" style={{ background: "#0080c8", borderColor: "#0080c8" }}>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login" style={{ color: "#0080c8" }}>Log In</Link>
        </div>
      </div>
    </Container>
  )
}
