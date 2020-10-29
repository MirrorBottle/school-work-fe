import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    DropdownItem,
} from "reactstrap";
import { Table, OptionalBadge, ActionDropdown, Alert, } from "components/Shared/Shared";
import withFadeIn from "components/HOC/withFadeIn";
import { withRouter } from "react-router-dom";
import LoanSubmissionValidate from "./LoanSubmissionValidate";
import API from "api";
class LoanSubmissionIndex extends React.Component {
    state = {
        submissions: [],
        isLoading: true,
        submission: {},
        isLoanSubmissionValidateModalOpen: false,
    }
    toggleLoanSubmissionValidateModal = () => this.setState({ isLoanSubmissionValidateModalOpen: !this.state.isLoanSubmissionValidateModalOpen })

    getLoanSubmissionsData = () => {
        API()
            .get('loan-submissions')
            .then((resp) => this.setState({
                submissions: resp.data.loanSubmissions,
                isLoading: false
            }, () => console.log(resp)))
            .catch((err) => console.log(err, err.response))
    }

    handleDelete = (id) => {
        this.setState({ isLoading: true }, () => API()
            .delete(`loan-submissions/${id}`)
            .then((resp) => {
                Alert("success", "Hapus Pengajuan", "Berhasil menghapus pengajuan")
            })
            .catch((err) => {
                Alert("error", "Oops..!", "Gagal menghapus pengajuan")
                console.log(err, err.response)
            })
            .finally(() => this.getLoanSubmissionsData()))
    }
    handleValidateLoanSubmission = (submission) => {
        this.setState({ submission }, () => this.toggleLoanSubmissionValidateModal())
    }
    afterValidation = () => {
        this.setState({ isLoading: true }, () => this.getLoanSubmissionsData())
    }
    componentDidMount() {
        this.getLoanSubmissionsData()
    }
    render() {
        const { submissions, isLoading, submission, isLoanSubmissionValidateModalOpen } = this.state;
        const columns = [
            {
                key: "userName",
                title: "Nama Pengaju",
                dataIndex: "userName",
            },
            {
                key: "totalLoan",
                title: "Total Peminjaman",
                dataIndex: "totalLoan",
                isCurrency: true,
            },
            {
                key: "createdDate",
                title: "Tanggal Pengajuan",
                dataIndex: "createdDate",
            },
            {
                key: "startDate",
                title: "Tanggal Mulai Peminjaman",
                dataIndex: "startDate",
            },
            {
                title: "Status",
                key: "status",
                dataIndex: "status",
                filters: [
                    {
                        text: "Proses",
                        value: "Proses",
                    },
                    {
                        text: "Disetujui",
                        value: "Disetujui",
                    },
                    {
                        text: "Ditolak",
                        value: "Ditolak",
                    },
                ],
                onFilter: (value, record) => {
                    return value === record.status;
                },
                render: (status) => <OptionalBadge value={status} />
            },
            {
                key: "action",
                title: "Aksi",
                dataIndex: "action",
                render: (text, record) => <ActionDropdown
                    onDeleteClick={() => this.handleDelete(record.id)}
                    withoutDetail
                    withoutEdit
                    onDeleteClickMessage="Pengguna yang mengajukan tidak akan mengetahui penghapusan ini!"
                    extraItem={
                        <React.Fragment>
                            <DropdownItem style={{ cursor: "pointer" }} onClick={() => this.handleValidateLoanSubmission(record)} disabled={record.status !== "Proses"}>
                                <i className="fas fa-check text-primary"></i>
                                Validasi
                            </DropdownItem>
                            <DropdownItem style={{ cursor: "pointer" }} onClick={() => this.props.history.push(`/admin/users/${record.userId}`)}>
                                <i className="fas fa-user text-info"></i>
                                Detail Pengguna
                            </DropdownItem>
                        </React.Fragment>
                    }
                />
            }
        ];
        return (
            <React.Fragment>
                <LoanSubmissionValidate isOpen={isLoanSubmissionValidateModalOpen} toggle={this.toggleLoanSubmissionValidateModal} submission={submission} afterSubmit={this.afterValidation} />
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row>
                                        <Col md="4" xs="4" sm="12" >
                                            <h2 className="mb-0">Daftar Pengajuan Peminjaman</h2>
                                        </Col>
                                        <Col md="8" xs="8" sm="12" className="d-flex justify-content-end">
                                            <Button color="danger">
                                                <i className="fas fa-trash-alt mr-2"></i>
                                                Hapus Semua
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Table
                                        columns={columns}
                                        data={submissions}
                                        loading={isLoading}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(withFadeIn(LoanSubmissionIndex));
