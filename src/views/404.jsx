import React, { Component } from 'react'
import { Card, CardBody, Container, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import withFadeIn from "components/HOC/withFadeIn"
class PageNotFound extends Component {
    render() {
        return (
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardBody className="d-flex flex-column text-center justify-content-center">
                                <h1 className="display-1 text-danger">404</h1>
                                <h2 className="mt--3">
                                    Halaman yang anda cari tidak ada atau sedang dalam perbaikan.
                                </h2>
                                <Link to="/admin/index">
                                    <Button color="primary">
                                        <i className="fas fa-arrow-left"></i>&nbsp;Kembali ke
                                        Dashboard
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default withFadeIn(PageNotFound)
