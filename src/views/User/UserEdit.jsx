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
import moment from "moment";
import { LoadingButton, Alert } from "components/Shared/Shared"
import { Link, withRouter } from "react-router-dom"
import { Spin } from "antd";
import API from "api";
import { UserFormSchema } from "./UserCreate"


class UserEdit extends Component {
    state = {
        isLoading: true,
        user: {
            phoneNumber: ""
        }
    }
    handleSubmit = (values) => {
        API()
            .put(`${this.props.match.params.type}s/${this.props.match.params.id}`, {
                ...values,
                role: parseInt(values.role),
                phoneNumber: `+62${values.phoneNumber}`
            })
            .then((resp) => {
                Alert("success", `Ubah ${this.props.match.params.type === "employee" ? "Pegawai" : "Pengguna"}`, `Ubah ${this.props.match.params.type === "employee" ? "pegawai" : "pengguna"} berhasil!`)
            })
            .catch((err) => {
                Alert("error", "Oops!", `Ubah ${this.props.match.params.type === "employee" ? "pegawai" : "pengguna"} gagal!`)
                console.log(err, err.response)
            })
            .finally(() => this.props.history.push(`/admin/${this.props.match.params.type}s`))
    }
    componentDidMount() {
        API().get(`${this.props.match.params.type}s/${this.props.match.params.id}`)
            .then((resp) => this.setState({
                user: resp.data.user,
                isLoading: false
            }))
            .catch((err) => console.log(err, err.response))
    }
    render() {
        const { isLoading, user } = this.state;
        const isEmployee = this.props.match.params.type === "employee";
        const { id, deposits, loans, ...initialValues } = user;
        return (
            <Container className="mt--7" fluid>
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
                                    <h1 className="mb-0">Edit {isEmployee ? "Pegawai" : "Pengguna"}</h1>
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
                                            <Label className="d-block">
                                                Jenis Kelamin
                                            </Label>
                                            <FormGroup check inline>
                                                <CustomInput
                                                    key={1}
                                                    type="checkbox"
                                                    id="gender1"
                                                    className="mr-4"
                                                    label="Perempuan"
                                                    value={0}
                                                    checked={values.gender === 0
                                                    }
                                                    onChange={() =>
                                                        setFieldValue("gender", 0)}
                                                    disabled={isSubmitting}
                                                />
                                                <CustomInput
                                                    key={2}
                                                    type="checkbox"
                                                    id="gender2"
                                                    className="mr-4"
                                                    label="Laki-laki"
                                                    value={1}
                                                    checked={values.gender === 1
                                                    }
                                                    onChange={() =>
                                                        setFieldValue("gender", 1)}
                                                    disabled={isSubmitting}
                                                />
                                            </FormGroup>
                                            {errors.gender && touched.gender ? (
                                                <FormFeedback className="d-block mt-1">
                                                    {errors.gender}
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
                                                disabled={isSubmitting}
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
                                                disabled={isSubmitting}
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

export default withRouter(withFadeIn(UserEdit))
