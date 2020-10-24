import React, { Component } from 'react'
import withFadeIn from "components/HOC/withFadeIn"
import {
    Card,
    CardHeader,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    CardBody,
    CustomInput,
    Label,
    Button,
    Col,
    FormFeedback,
} from "reactstrap";
import { Formik } from "formik";
import { DatePicker } from "antd";
import * as Yup from "yup";
import moment from "moment";
import CurrencyInput from "react-currency-input-field"
import Select from "react-select"
import { PaymentSelects, InterestSelects, Table, LoadingButton, Confirm } from "components/Shared/Shared"
import PaymentIndex from 'views/Payment/PaymentIndex';
import { Link, Redirect, withRouter } from "react-router-dom"
import { LoanFormSchema } from "./LoanCreate";
import { Spin } from "antd";
import API from "api";
import axios from "axios";

const { RangePicker } = DatePicker;


class LoanEdit extends Component {
    state = {
        isLoading: true,
        loan: {},
        users: []
    }
    handleSubmit = (values, actions) => {
        console.log(values)
    }
    componentDidMount() {
        const loanQuery = API().get(`loans/${this.props.match.params.id}`);
        const usersQuery = API().get("users");
        axios.all([loanQuery, usersQuery]).then(
            axios.spread((...responses) => {
                const loanResponse = responses[0];
                const usersResponse = responses[1];
                const {
                    dueDate, startDate, employeeId, paymentCount, userId, totalLoan, loanInterest
                } = loanResponse.data.loans
                this.setState(
                    {
                        loan: {
                            dueDate, employeeId, startDate, userId, totalLoan, loanInterest,
                            paymentCounts: paymentCount
                        },
                        users: usersResponse.data.users.map((user) => ({
                            value: user.id,
                            label: user.name
                        })),
                    },
                    () => this.setState({ isLoading: false })
                );
            })
        );
    }
    render() {
        const { users, isLoading, loan } = this.state;
        return (
            <Container className="mt--7" fluid>
                <Formik
                    initialValues={loan}
                    onSubmit={this.handleSubmit}
                    enableReinitialize
                    validationSchema={LoanFormSchema}
                >{({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    isSubmitting
                }) => (
                        <Form onSubmit={handleSubmit}>
                            {console.log(values)}
                            <Card className="shadow-lg">
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">Ubah Peminjaman</h1>
                                </CardHeader>
                                <Spin spinning={isLoading}>
                                    <CardBody>
                                        <FormGroup>
                                            <Label>Peminjam</Label>
                                            <Select
                                                placeholder="Pilih Peminjam"
                                                options={users}
                                                isDisabled={isSubmitting}
                                                value={users.filter((user) => user.value === loan.userId)[0]}
                                                onChange={(value) => setFieldValue("userId", value.value)}
                                            />
                                            {errors.userId && touched.userId ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.userId}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="d-block">Tanggal Peminjaman - Tenggat Waktu</Label>
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

                                                value={[moment(values.startDate, "DD-MM-YYYY"), moment(values.dueDate, "DD-MM-YYYY")]}
                                                onChange={(dates, dateStrings) => {
                                                    setFieldValue("startDate", dateStrings[0])
                                                    setFieldValue("dueDate", dateStrings[1])
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
                                                <div className="col-">
                                                    {errors.dueDate && touched.dueDate ? (
                                                        <FormFeedback className="d-block mt-1">
                                                            {errors.dueDate}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Row>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="totalLoan">Total Pinjaman</Label>
                                            <CurrencyInput
                                                disabled={isSubmitting}
                                                className="form-control"
                                                prefix="Rp. "
                                                placeholder="Masukkan Total Pinjaman"
                                                value={values.totalLoan}
                                                precision="0"
                                                onChange={(value, name) => setFieldValue("totalLoan", parseInt(value))}
                                            />
                                            {errors.totalLoan && touched.totalLoan ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.totalLoan}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <Row>
                                            <div className="col-md-6 col-12">
                                                <Label>Jumlah Angsuran</Label>
                                                <Select
                                                    isDisabled={isSubmitting}
                                                    placeholder="Pilih Jumlah Angsuran"
                                                    options={PaymentSelects}
                                                    value={PaymentSelects.filter((payment) => payment.value === values.paymentCounts)[0]}
                                                    onChange={(value) => setFieldValue("paymentCounts", value.value)}
                                                />
                                                {errors.paymentCounts && touched.paymentCounts ? (
                                                    <FormFeedback className="d-block mt-1">
                                                        {errors.paymentCounts}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <Label>Bunga Pinjaman</Label>
                                                <Select
                                                    isDisabled={isSubmitting}
                                                    placeholder="Pilih Bunga Pinjaman"
                                                    options={InterestSelects}
                                                    value={InterestSelects.filter((interest) => interest.value === values.loanInterest)[0]}
                                                    onChange={(value) => setFieldValue("loanInterest", value.value)}
                                                />
                                                {errors.loanInterest && touched.loanInterest ? (
                                                    <FormFeedback className="d-block mt-1">
                                                        {errors.loanInterest}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Row>
                                        <FormGroup className="mt-3">
                                            <Label htmlFor="totalLoan">Total Pinjaman Dengan Bunga</Label>
                                            <CurrencyInput
                                                disabled
                                                className="form-control"
                                                prefix="Rp. "
                                                placeholder="Masukkan Total Pinjaman"
                                                value={values.loanInterest !== -1 && values.totalLoan !== 0 ? values.totalLoan + (values.totalLoan * values.loanInterest / 100) : 0}
                                                precision="0"
                                                onChange={(value, name) => setFieldValue("totalLoan", parseInt(value))}
                                            />
                                            {errors.totalLoan && touched.totalLoan ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.totalLoan}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                    </CardBody>
                                </Spin>
                            </Card>
                            <Row className="mt-1">
                                <div className="text-right mt-3 offset-md-7 col-md-2" sm="12">
                                    <Link to="/admin/user">
                                        <Button color="primary" block outline>
                                            Batal
                                        </Button>
                                    </Link>
                                </div>
                                <Col md="3" sm="12" className="text-right mt-3">
                                    <LoadingButton
                                        color="primary"
                                        className="btn-block"
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Simpan
                                    </LoadingButton>
                                </Col>
                            </Row>
                        </Form>
                    )}</Formik>
            </Container>
        )
    }
}

export default withRouter(withFadeIn(LoanEdit))
