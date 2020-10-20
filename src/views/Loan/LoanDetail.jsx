import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    CardBody,
    Badge,
} from "reactstrap";
import withFadeIn from "components/HOC/withFadeIn"
import { withRouter, Link } from "react-router-dom"
import API from "api";
class LoanDetail extends Component {
    state = {
        isLoading: true,
        loan: {}
    }
    componentDidMount() {
        API()
            .get(`loan/${this.props.match.params.id}`)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err, err.response))
    }
    render() {
        return (
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row>
                            <Col md="8" xs="12" sm="12">
                                <h1 className="mb-0">Daftar Peminjaman</h1>
                            </Col>
                            <Col md="4" xs="12" sm="12" className="d-flex justify-content-start mt-2">
                                <Button color="warning" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-edit mr-2"></i>
                                    Edit
                                </Button>
                                <Button color="danger" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-trash-alt mr-2"></i>
                                    Hapus
                                </Button>
                                <Button color="primary" onClick={() => this.props.history.push('/admin/loans/create')}>
                                    <i className="fas fa-sync mr-2"></i>
                                    Ubah Status
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <h1>Something</h1>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default withRouter(withFadeIn(LoanDetail))
