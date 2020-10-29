import React, { Component } from 'react'
// react plugin used to create charts
// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Form,
    FormGroup,
    CardBody,
    Label,
    FormFeedback,
} from "reactstrap";
import { DatePicker, Alert as AntdAlert } from "antd";
import withFadeIn from "components/HOC/withFadeIn"
import moment from "moment";
import CurrencyInput from "react-currency-input-field"
import { LoadingButton, Alert } from "components/Shared/Shared"
import { withRouter } from "react-router-dom"
// core components
import API from "api";
import { Formik } from "formik";
import * as Yup from "yup";
class LoanSubmissionCreate extends Component {
    handleSubmit = values => {
        API().post("loan-submissions", values)
            .then(() => Alert("success", "Pengajuan Peminjaman", "Berhasil membuat pengajuan peminjaman"))
            .catch((err) => {
                console.log(err, err.response)
                Alert("error", "Pengajuan Peminjaman", err.response.data.message)
            })
            .finally(() => this.props.history.push("/admin/index"))
    }
    render() {
        const { isLoading, submissions } = this.state;
        return (
            <Container className="mt--7" fluid>
                <Card className="shadow-lg">
                    <Formik
                        initialValues={{
                            totalLoan: "",
                            startDate: "",
                        }}
                        onSubmit={this.handleSubmit}
                        validationSchema={Yup.object().shape({
                            totalLoan: Yup.string().required("Jumlah peminjaman wajib diisi!"),
                            startDate: Yup.string().required("Tanggal mulai peminjaman wajib diisi")
                        })}
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
                                <CardHeader className="border-0">
                                    <h1 className="mb-0">Buat Pengajuan Peminjaman</h1>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label htmlFor="totalLoan">Total Peminjaman</Label>
                                        <CurrencyInput
                                            disabled={isSubmitting}
                                            className="form-control"
                                            prefix="Rp. "
                                            placeholder="Masukkan Total Setoran"
                                            defaultValue={values.totalLoan}
                                            precision="0"
                                            onChange={(value, name) => setFieldValue("totalLoan", parseInt(value))}
                                        />
                                        {errors.totalLoan && touched.totalLoan ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.totalLoan}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="d-block">Tanggal Mulai Peminjaman</Label>
                                        <DatePicker
                                            disabled={isSubmitting}
                                            format="DD-MM-YYYY"
                                            onChange={(date, dateString) => setFieldValue("startDate", moment(date).format("YYYY-MM-DD HH:mm:ss"))}
                                        />
                                        {errors.startDate && touched.startDate ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.startDate}
                                            </FormFeedback>
                                        ) : null}
                                    </FormGroup>
                                    <AntdAlert
                                        message="Informasi!"
                                        description="Pengajuan peminjaman akan diproses oleh pihak admin atau pengguna dan anda akan mengetahui statusnya di riwayat pengajuan yang ada di dashboard anda. Anda tidak akan diberitahu apabila pengajuan anda telah dihapus. Info selanjutnya akan diberikan oleh pihak admin atau pegawai melalui pesan."
                                        type="info"
                                        showIcon
                                        closable
                                    />
                                    <LoadingButton type="submit" isLoading={isSubmitting} className="btn-block mt-3" color="success">
                                        <i className="fas fa-plus mr-2"></i>
                                        Ajukan Peminjaman
                                    </LoadingButton>
                                </CardBody>
                            </Form>
                        )}</Formik>
                </Card>
            </Container>
        )
    }
}
export default withRouter(withFadeIn(LoanSubmissionCreate))
