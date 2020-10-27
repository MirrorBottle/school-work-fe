import React, { Component } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Label,
    Form,
    FormFeedback
} from "reactstrap";
import { DatePicker } from "antd";
import withFadeIn from "components/HOC/withFadeIn";
import { withRouter } from "react-router-dom";
import * as Yup from "yup"
import { Formik } from "formik"
import moment from "moment";
import { LoadingButton } from "components/Shared/Shared"
import API from "api"
const { RangePicker } = DatePicker;
class Report extends Component {
    handleSubmit = (values, actions) => {
        window.open(`${process.env.REACT_APP_BASE_URL}/api/loans/export/${moment(values.startDate, "DD-MM-YYYY").format("YYYY-MM-DD")}/${moment(values.endDate, "DD-MM-YYYY").format("YYYY-MM-DD")}`, "_blank")
        actions.setSubmitting(false);
        actions.resetForm();
    }
    render() {
        return (
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h2 className="mb-0">Export Laporan</h2>
                    </CardHeader>
                    <Formik
                        onSubmit={this.handleSubmit}
                        initialValues={{
                            startDate: "",
                            endDate: ""
                        }}
                        validationSchema={Yup.object().shape({
                            startDate: Yup.string().required("Tanggal awal laporan wajib dipilih!"),
                            endDate: Yup.string().required("Tanggal akhir laporan wajib dipilih")
                        })}
                    >{({ handleSubmit, handleChange, errors, touched, setFieldValue, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <CardBody>
                                <FormGroup>
                                    <Label className="d-block">Tanggal Awal - Tanggal Akhir</Label>
                                    <RangePicker
                                        disabled={isSubmitting}
                                        format="DD-MM-YYYY"
                                        ranges={{
                                            '3 Bulan': [moment(), moment().add(3, 'months')],
                                            '6 Bulan': [moment(), moment().add(6, 'months')],
                                            '1 Tahun': [moment(), moment().add(1, 'year')],
                                            '2 Tahun': [moment(), moment().add(2, 'year')],
                                            '3 Tahun': [moment(), moment().add(3, 'year')],
                                            '4 Tahun': [moment(), moment().add(4, 'year')],
                                        }}
                                        onChange={(dates, dateStrings) => {
                                            setFieldValue("startDate", dateStrings[0])
                                            setFieldValue("endDate", dateStrings[1])
                                        }}
                                    />
                                    <Row>
                                        <div className="col-6">
                                            {errors.startDate && touched.startDate ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.startDate}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="col-6">
                                            {errors.endDate && touched.endDate ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.endDate}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Row>
                                </FormGroup>
                                <Row>
                                    <div className="col-12 text-right">
                                        <LoadingButton type="submit" color="success" className="btn-block" isLoading={isSubmitting}>
                                            <i className="fas fa-download mr-2"></i>
                                            Download Laporan
                                        </LoadingButton>
                                    </div>
                                </Row>
                            </CardBody>
                        </Form>
                    )}</Formik>
                </Card>
            </Container>
        )
    }
}

export default withFadeIn(Report)