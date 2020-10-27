import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormFeedback,
    Label,
} from "reactstrap";
import { Input } from "antd";
import * as Yup from "yup";
import { Formik } from "formik";
import { LoadingButton, Alert } from "components/Shared/Shared";
import API from "api";
import user from "user";
export default class ProfilePasswordForm extends Component {
    handleSubmit = (values, actions) => {
        API().put("password/change", values)
            .then((resp) => Alert("success", "Ubah Password", "Berhasil mengubah password"))
            .catch((err) => Alert("error", "Ubah Password", err.response.data.message))
            .finally(() => {
                actions.setSubmitting(false);
                actions.resetForm();
                this.props.toggle()
            });
    };
    render() {
        const { toggle, isOpen } = this.props;
        const ChangePasswordSchema = Yup.object().shape({
            oldPassword: Yup.string().required("Password lama wajib diisi!"),
            newPassword: Yup.string()
                .min(6, "Password terlalu pendek")
                .required("Password baru wajib diisi!"),
            confirmNewPassword: Yup.string()
                .test("passwordConfirm", "Password tidak cocok!", function test(value) {
                    return value === this.resolve(Yup.ref("newPassword"));
                })
                .required("Konfirmasi password baru wajib diisi!"),
        });
        return (
            <Formik
                initialValues={{
                    newPassword: "",
                    confirmNewPassword: "",
                    oldPassword: "",
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={this.handleSubmit}
            >
                {({ errors, touched, handleSubmit, handleChange, isSubmitting }) => (
                    <Modal
                        isOpen={isOpen}
                        toggle={toggle}
                        backdrop={isSubmitting ? "static" : true}
                    >
                        <Form onSubmit={handleSubmit}>
                            <ModalHeader
                                toggle={!isSubmitting ? toggle : undefined}
                                className="pt-3 pb-1"
                            >
                                <h2>Ubah Password</h2>
                            </ModalHeader>
                            <ModalBody>
                                <div className="w-100 text-center mb-4">
                                    <i className="fas fa-lock fa-4x text-danger"></i>
                                </div>
                                <FormGroup>
                                    <Label htmlFor="oldPassword">
                                        <h3>Password Lama</h3>
                                    </Label>
                                    <Input.Password
                                        name="oldPassword"
                                        id="oldPassword"
                                        placeholder="Masukkan password lama"
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    {errors.oldPassword && touched.oldPassword ? (
                                        <FormFeedback className="d-block mt-1">
                                            {errors.oldPassword}
                                        </FormFeedback>
                                    ) : null}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="newPassword">
                                        <h3>Password Baru</h3>
                                    </Label>
                                    <Input.Password
                                        name="newPassword"
                                        id="newPassword"
                                        placeholder="Masukkan password baru"
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    {errors.newPassword && touched.newPassword ? (
                                        <FormFeedback className="d-block mt-1">
                                            {errors.newPassword}
                                        </FormFeedback>
                                    ) : null}
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="confirmNewPassword">
                                        <h3>Konfirmasi Password Baru</h3>
                                    </Label>
                                    <Input.Password
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        placeholder="Masukkan ulang password baru anda"
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    {errors.confirmNewPassword &&
                                        touched.confirmNewPassword ? (
                                            <FormFeedback className="d-block mt-1">
                                                {errors.confirmNewPassword}
                                            </FormFeedback>
                                        ) : null}
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    outline
                                    onClick={toggle}
                                    disabled={isSubmitting}
                                >
                                    Batal
                                </Button>
                                <LoadingButton
                                    isLoading={isSubmitting}
                                    color="primary"
                                    type="submit"
                                >
                                    Simpan
                                </LoadingButton>
                            </ModalFooter>
                        </Form>
                    </Modal>
                )}
            </Formik>
        );
    }
}
