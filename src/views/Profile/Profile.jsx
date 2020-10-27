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
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import { Formik } from "formik";
import { DatePicker } from "antd";
import * as Yup from "yup";
import moment from "moment";
import CurrencyInput from "react-currency-input-field"
import Select from "react-select"
import { PaymentSelects, InterestSelects, Table, LoadingButton, Confirm, Alert } from "components/Shared/Shared"
import PaymentIndex from 'views/Payment/PaymentIndex';
import { Link, Redirect, withRouter } from "react-router-dom"
import { Spin } from "antd";
import API from "api";
import user from "user";
import { UserFormSchema } from "views/User/UserCreate"
import ProfileChangePassword from "./ProfileChangePassword"

class Profile extends Component {
    state = {
        isLoading: true,
        isChangePasswordModalOpen: false,
        user: {
            phoneNumber: ""
        }
    }
    togglePasswordModal = () => this.setState({ isChangePasswordModalOpen: !this.state.isChangePasswordModalOpen })
    handleSubmit = (values) => {
        API()
            .put(`users/${user("id")}`, {
                ...values,
                role: parseInt(values.role),
                phoneNumber: `+62${values.phoneNumber}`
            })
            .then((resp) => {
                Alert("success", "Ubah Profile", "Ubah profile berhasil! Logout kemudian login kembali untuk melihat perubahan")
            })
            .catch((err) => {
                Alert("error", "Oops!", "Ubah profile gagal!")
                console.log(err, err.response)
            })
            .finally(() => this.props.history.push(`/admin/profile`))
    }
    componentDidMount() {
        API().get(`users/${user('id')}`)
            .then((resp) => this.setState({
                user: resp.data.user,
                isLoading: false
            }))
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { isLoading, user, isChangePasswordModalOpen } = this.state;
        const isEmployee = this.props.match.params.type === "employee";
        const { id, deposits, loans, ...initialValues } = user;
        return (
            <Container className="mt--7" fluid>
                <ProfileChangePassword isOpen={isChangePasswordModalOpen} toggle={this.togglePasswordModal} />
                <Formik
                    initialValues={{
                        ...initialValues,
                        gender: initialValues.gender === "Perempuan" ? 0 : 1,
                        phoneNumber: initialValues.phoneNumber.split("+62")[1],
                        joinDate: moment(initialValues.joinDate, "DD-MMMM-YYYY").format("YYYY-MM-DD"),
                        dateOfBirth: moment(initialValues.dateOfBirth, "DD-MMMM-YYYY").format("YYYY-MM-DD"),
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={UserFormSchema}
                    enableReinitialize
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
                                    <Row>
                                        <Col md="4" xs="4" sm="12">
                                            <h2 className="mb-0">Profile</h2>
                                        </Col>
                                        <Col md="8" xs="8" sm="12" className="d-flex justify-content-end">
                                            <Button color="dark" onClick={this.togglePasswordModal}>
                                                <i className="fas fa-lock mr-2"></i>
                                                Ubah Password
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Spin spinning={isLoading}>
                                        <FormGroup>
                                            <Label htmlFor="name">Nama Lengkap</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={values.name}
                                                autoComplete="off"
                                                placeholder="masukkan nama lengkap"
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            {errors.name && touched.name ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.name}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email"
                                                value={values.email}
                                                autoComplete="off"
                                                placeholder="masukkan email"
                                                onChange={handleChange}
                                                disabled={true}
                                            />
                                            {errors.email && touched.email ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.email}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="phoneNumber">No. Telpon</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>+62</InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    type="text"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    value={values.phoneNumber}
                                                    autoComplete="off"
                                                    placeholder="82934039293"
                                                    onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
                                                    disabled={isSubmitting}
                                                />
                                            </InputGroup>
                                            {errors.phoneNumber && touched.phoneNumber ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.phoneNumber}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="d-block">Tanggal Lahir</Label>
                                            <DatePicker
                                                disabled={isSubmitting}
                                                placeholder="Pilih tanggal lahir"
                                                format="DD-MM-YYYY"
                                                value={moment(values.dateOfBirth, "YYYY-MM-DD")}
                                                onChange={(date, dateString) => setFieldValue("dateOfBirth", moment(date).format("YYYY-MM-DD"))}
                                            />
                                            {errors.dateOfBirth && touched.dateOfBirth ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.dateOfBirth}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label className="d-block">Tanggal Bergabung</Label>
                                            <DatePicker
                                                disabled={true}
                                                placeholder="Pilih tanggal bergabung"
                                                format="DD-MM-YYYY"
                                                value={moment(values.joinDate, "YYYY-MM-DD")}
                                                onChange={(date, dateString) => setFieldValue("joinDate", moment(date).format("YYYY-MM-DD"))}
                                            />
                                            {errors.joinDate && touched.joinDate ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.joinDate}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="address">Alamat</Label>
                                            <Input
                                                type="textarea"
                                                name="address"
                                                id="address"
                                                autoComplete="off"
                                                value={values.address}
                                                placeholder="masukkan alamat"
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            {errors.address && touched.address ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.address}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="job">Pekerjaan</Label>
                                            <Input
                                                type="text"
                                                name="job"
                                                id="job"
                                                value={values.job}
                                                autoComplete="off"
                                                placeholder="masukkan pekerjaan"
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            {errors.job && touched.job ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.job}
                                                </FormFeedback>
                                            ) : null}
                                        </FormGroup>
                                        {isEmployee && (
                                            <FormGroup>
                                                <Label for="role">Hak Akses</Label>
                                                <CustomInput disabled={isSubmitting} value={values.role} type="select" id="role" name="role" onChange={handleChange}>
                                                    <option value={2}>Pegawai</option>
                                                    <option value={1}>Admin</option>
                                                </CustomInput>
                                            </FormGroup>
                                        )}
                                    </Spin>
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

export default withRouter(withFadeIn(Profile))
