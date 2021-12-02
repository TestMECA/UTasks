import React from "react"
import { Container, Card, } from "react-bootstrap"

import { Link } from "react-router-dom"

import { ROUTES } from "../config/constants.js"

export default function NotFound() {

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body data-testid="not-found-page">
            <h2 className="text-center mb-4" data-testid="title"> Page Not Found</h2>
            <Link to={ROUTES.HOME} className="btn btn-primary w-100 mt-3" data-testid="go-back">
              Go Back To Home
            </Link>
          </Card.Body>
        </Card>

      </div></Container>
  )
}
