import { faBook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Alert, Card, Col, Row } from "react-bootstrap"

const Home = () => {

    return (
        <>
            <Alert variant="success" className="mt-4">
                <Alert.Heading>
                    <span className="fw-bold">
                        Website Monitoring Analytics Dashboard
                    </span>
                </Alert.Heading>
                <hr />
                <p className="mb-0">
                    Selamat datang,
                    <span className="fw-bold" style={{ marginLeft: "5px" }}>User</span>!.
                    Website ini mudah dalam mengelola data, dan memonitoring rute perjalanan Taxi
                    berbasis informasi dengan lebih efektif.
                    Jadikan pengalaman ini bermanfaat untuk mencapai target bisnis Anda!
                </p>
            </Alert>
        </>
    )

}

export default Home