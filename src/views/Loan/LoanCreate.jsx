import React, { Component } from 'react'
import withFadeIn from "components/HOC/withFadeIn"
import {
    Card,
    CardHeader,
    Container,
    Row,
    Form,
    FormGroup,
    CardBody,
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
import { PaymentSelects, InterestSelects, Table, LoadingButton, Confirm, Alert } from "components/Shared/Shared"
import { Link, withRouter } from "react-router-dom"
import { Spin, Alert as AntdAlert } from "antd";
import API from "api";
import Dropzone from 'react-dropzone';

const { RangePicker } = DatePicker;

export const LoanFormSchema = Yup.object().shape({
    userId: Yup.string().required("Wajib memilih peminjam!"),
    startDate: Yup.string().required("Pilih tanggal peminjaman"),
    dueDate: Yup.string().required("Pilih tanggal jatuh tempo"),
    totalLoan: Yup.number().min(0, "Masukkan jumlah pinjaman"),
    paymentCounts: Yup.number().min(1, "Pilih jumlah angsuran!"),
    loanInterest: Yup.number().min(0, "Pilih bunga pinjaman!")
})

class LoanCreate extends Component {
    state = {
        isLoading: true,
        payments: [],
        users: [],
        loanSubmission: {}
    }
    makePayments = (startDate, dueDate, paymentCounts, totalLoan, loanInterest) => {
        const paymentMonth = moment(dueDate, "DD-MM-YYYY").diff(moment(startDate, "DD-MM-YYYY"), 'months', true) / paymentCounts;
        const paymentDay = Math.round(moment(dueDate, "DD-MM-YYYY").diff(moment(startDate, "DD-MM-YYYY"), 'days', true) / paymentCounts);
        const totalPayment = Math.ceil(totalLoan / paymentCounts);
        const totalPaymentInterest = Math.ceil(totalLoan * loanInterest / 100 / paymentCounts);
        const isMonth = paymentMonth >= 1 ? true : false;
        const payment = isMonth ? paymentMonth : paymentDay;
        const payments = [...Array(paymentCounts)].map((val, index) => ({
            totalPayment,
            totalPaymentInterest,
            totalPaymentWithInterest: totalPayment + totalPaymentInterest,
            dueDate: moment(startDate, "DD-MM-YYYY").add((index + 1) * payment, isMonth ? 'months' : 'days').format("YYYY-MM-DD HH:mm:ss"),
            roundedTotalPayment: Math.round(totalPayment / 1000) * 1000,
            paymentNumber: index + 1,
            by: `Per ${isMonth ? paymentMonth : paymentDay} ${isMonth ? "Bulan" : "Hari"}`
        }));
        this.setState({ payments })
    }
    storeData = (data) => {
        API()
            .post("loans", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            .then((resp) => {
                Alert("success", "Tambah Peminjaman", "Tambah peminjaman berhasil!")
                console.log(resp)
            })
            .catch((err) => {
                Alert("error", "Oops!", "Tambah peminjaman gagal!")
                console.log(err, err.response)
            })
            .finally(() => this.props.history.push("/admin/loans"))
    }
    handleSubmit = (values, actions) => {
        const { payments } = this.state;
        const data = {
            ...values,
            dueDate: moment(values.dueDate, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss"),
            startDate: moment(values.startDate, "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss"),
            totalLoan: values.totalLoan,
            totalLoanWithInterest: values.totalLoan + (values.totalLoan * values.loanInterest / 100),
            totalPayment: payments.length < 1 ? 0 : payments[0].totalPayment,
            totalPaymentInterest: payments.length < 1 ? 0 : payments[0].totalPaymentInterest,
            totalPaymentWithInterest: payments.length < 1 ? 0 : payments[0].totalPaymentWithInterest,
            selfieWithIdCard: values.selfieWithIdCard[0],
            idCard: values.idCard[0],
            selfieWithIdCardBase64: null,
            idCardBase64: null,
            payments: payments.map(({ by, roundedTotalPayment, ...data }) => ({
                ...data
            }))
        }
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            const field = key === 'payments' ? JSON.stringify(data[key]) : data[key];
            formData.append(key, field);
        });
        if (payments.length < 1) {
            Confirm("Anda belum mengatur angsuran, apabila angsuran dimasukkan secara manual mungkin akan terjadi kesalahan data")
                .then(() => this.storeData(formData))
                .catch(() => actions.setSubmitting(false))
        } else {
            this.storeData(formData)
        }
    }
    componentDidMount() {
        const { loanSubmissionId } = this.props.match.params;
        API().get("users")
            .then((resp) => this.setState({
                users: resp.data.users.map((user) => ({
                    value: user.id,
                    label: user.name
                })),
                isLoading: !loanSubmissionId === undefined
            }))
            .catch((err) => console.log(err, err.response))
        if (loanSubmissionId !== undefined) {
            API().get(`loan-submissions/${loanSubmissionId}`)
                .then((resp) => this.setState({
                    loanSubmission: resp.data.loanSubmission,
                    isLoading: false
                }, () => console.log(resp, this.state)))
                .catch((err) => console.log(err, err.response))
        }
    }
    render() {
        const { payments, users, isLoading, loanSubmission } = this.state;

        const PaymentsColumns = [
            {
                key: "paymentNumber",
                title: "Angsuran Ke-",
                dataIndex: "paymentNumber",
            },
            {
                key: "dueDate",
                title: "Tanggal Jatuh Tempo",
                dataIndex: "dueDate",
            },
            {
                key: "totalPayment",
                title: "Angsuran Pokok",
                dataIndex: "totalPayment",
                isCurrency: true,
            },
            {
                key: "totalPaymentInterest",
                title: "Bunga Per Angsuran",
                dataIndex: "totalPaymentInterest",
                isCurrency: true,
            },
            {
                key: "totalPaymentWithInterest",
                title: "Total Angsuran",
                dataIndex: "totalPaymentWithInterest",
                isCurrency: true,
            },
            {
                key: "by",
                title: "Jarak Angsuran",
                dataIndex: "by",
            },
        ]
        return (
            <Container className="mt--7" fluid>
                <Formik
                    initialValues={{
                        userId: loanSubmission.id ? loanSubmission.userId : "",
                        startDate: loanSubmission.id ? loanSubmission.startDate : "",
                        dueDate: "",
                        totalLoan: loanSubmission.id ? loanSubmission.totalLoan : 0,
                        paymentCounts: 0,
                        loanInterest: -1,
                        selfieWithIdCard: null,
                        selfieWithIdCardBase64: null,
                        idCard: null,
                        idCardBase64: null
                    }}
                    enableReinitialize
                    onSubmit={this.handleSubmit}
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
                            <Card className="shadow-lg">
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">Tambah Peminjaman</h1>
                                </CardHeader>
                                <Spin spinning={isLoading}>
                                    <CardBody>
                                        {loanSubmission.id && (
                                            <AntdAlert
                                                message="Peringatan!"
                                                description="Karena pengajuan telah disetujui maka data pembuatan peminjaman (Total Peminjaman, Tanggal Peminjam, Peminjaman) akan dimasukkan secara otomatis berdasarkan pengajuan. Apabila anda membatalkan pembuatan sekarang, maka anda harus memasukkan data di atas secara manual."
                                                type="warning"
                                                className="mb-3"
                                                showIcon
                                                closable
                                            />
                                        )}
                                        <FormGroup>
                                            <Label>Peminjam</Label>
                                            <Select
                                                placeholder="Pilih Peminjam"
                                                options={users}
                                                isDisabled={isSubmitting}
                                                value={users.filter((user) => user.value === values.userId)[0]}
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
                                                value={[values.startDate === "" ? "" : moment(values.startDate, "DD-MM-YYYY"), values.dueDate === "" ? "" : moment(values.dueDate, "DD-MM-YYYY")]}
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
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">Rp</div>
                                                </div>
                                                <CurrencyInput
                                                    disabled={isSubmitting}
                                                    className="form-control"
                                                    placeholder="Masukkan Total Pinjaman"
                                                    precision="0"
                                                    defaultValue={values.totalLoan}
                                                    onChange={(value, name) => setFieldValue("totalLoan", parseInt(value))}
                                                />
                                            </div>
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
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">Rp</div>
                                                </div>
                                                <CurrencyInput
                                                    disabled
                                                    className="form-control pl-2"
                                                    placeholder="Masukkan Total Pinjaman"
                                                    value={values.loanInterest !== -1 && values.totalLoan !== 0 ? values.totalLoan + (values.totalLoan * values.loanInterest / 100) : 0}
                                                    precision="0"
                                                    onChange={(value, name) => setFieldValue("totalLoan", parseInt(value))}
                                                />
                                            </div>
                                            {errors.totalLoan && touched.totalLoan ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.totalLoan}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <Button color="primary" disabled={values.startDate === '' || values.totalLoan === '' || values.paymentCount === 0 || values.loanInterest === -1 || isSubmitting} className="mt-4" block onClick={() => this.makePayments(values.startDate, values.dueDate, values.paymentCounts, values.totalLoan, values.loanInterest)}>
                                            <i className="fas fa-money-bill mr-2"></i>
                                            Buat Angsuran
                                        </Button>
                                    </CardBody>
                                </Spin>
                            </Card>
                            <Card className="shadow-lg mt-4">
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">Angsuran</h1>
                                </CardHeader>
                                <Spin spinning={isLoading}>
                                    <CardBody>
                                        <Table
                                            data={payments}
                                            columns={PaymentsColumns}
                                        />
                                    </CardBody>
                                </Spin>
                            </Card>
                            <Card className="shadow-lg mt-4">
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">Data Validasi</h1>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="6">
                                            <h4>Selfie dengan KTP</h4>
                                            <Dropzone
                                                accept="image/jpeg, image/png"
                                                onDrop={acceptedFiles => {
                                                    setFieldValue('selfieWithIdCard', acceptedFiles);

                                                    let reader = new FileReader();
                                                    reader.readAsDataURL(new Blob(acceptedFiles));
                                                    reader.onload = function() {
                                                        setFieldValue('selfieWithIdCardBase64', reader.result);
                                                    }
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <span
                                                                style={{
                                                                    border: '3px dashed blue',
                                                                    height: '300px'
                                                                }}
                                                                className="d-flex justify-content-center align-items-center"
                                                            >
                                                                {values.selfieWithIdCardBase64 ? (
                                                                    <img
                                                                        src={values.selfieWithIdCardBase64} 
                                                                        className="img-thumbnail w-100"
                                                                        alt=""
                                                                        style={{ height: '300px' }}
                                                                    />
                                                                ) : 'Letakan foto selfie KTP disini'}
                                                            </span>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </Col>
                                        <Col md="6">
                                            <h4>Foto / Scan KTP</h4>
                                            <Dropzone
                                                accept="image/jpeg, image/png"
                                                onDrop={acceptedFiles => {
                                                    setFieldValue('idCard', acceptedFiles);

                                                    let reader = new FileReader();
                                                    reader.readAsDataURL(new Blob(acceptedFiles));
                                                    reader.onload = function() {
                                                        setFieldValue('idCardBase64', reader.result);
                                                    }
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            <span
                                                                style={{
                                                                    border: '3px dashed blue',
                                                                    height: '300px'
                                                                }}
                                                                className="d-flex justify-content-center align-items-center"
                                                            >
                                                                {values.idCardBase64 ? (
                                                                    <img
                                                                        src={values.idCardBase64} 
                                                                        className="img-thumbnail w-100"
                                                                        alt=""
                                                                        style={{ height: '300px' }}
                                                                    />
                                                                ) : 'Letakan foto / scan KTP disini'}
                                                            </span>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </Col>
                                    </Row>
                                </CardBody>
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

export default withRouter(withFadeIn(LoanCreate))
