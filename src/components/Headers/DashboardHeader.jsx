/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import CountUp from 'react-countup';
import FadeIn from 'react-fade-in';
import Skeleton from "react-loading-skeleton";
import { CurrencyLabel } from "components/Shared/Label";
import moment from "moment";
import "moment/locale/id";
class DashboardHeader extends React.Component {
  render() {
    const { infographics, isLoading } = this.props;
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="6">
                  <FadeIn transitionDuration={200} delay={50}>
                    <Card className="card-stats mb-4">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Saldo Saat Ini
                          </CardTitle>
                            {isLoading ? <Skeleton /> : <CurrencyLabel className="h2 font-weight-bold mb-0">{!infographics ? 0 : infographics.balance.count}</CurrencyLabel>}
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                              <i className="fas fa-dollar-sign" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {isLoading ? <Skeleton /> : <span className="text-nowrap">{moment(!infographics ? 0 : infographics.balance.lastDate, "DD-MM-YYYY HH:mm:ss").fromNow()}</span>}
                        </p>
                      </CardBody>
                    </Card>
                  </FadeIn>

                </Col>
                <Col lg="6" xl="6">
                  <FadeIn transitionDuration={200} delay={70}>

                    <Card className="card-stats mb-4">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Peminjaman
                          </CardTitle>
                            {isLoading ? <Skeleton /> : <span className="h2 font-weight-bold mb-0">{!infographics ? 0 : infographics.loan.count}</span>}
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                              <i className="fas fa-money-check" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {isLoading ? <Skeleton /> : <span className="text-nowrap">{moment(!infographics ? 0 : infographics.loan.lastDate, "DD-MM-YYYY HH:mm:ss").fromNow()}</span>}
                        </p>
                      </CardBody>
                    </Card>
                  </FadeIn>
                </Col>
                <Col lg="6" xl="3">
                  <FadeIn transitionDuration={200} delay={90}>

                    <Card className="card-stats mb-4">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Setoran
                          </CardTitle>
                            {isLoading ? <Skeleton /> : <span className="h2 font-weight-bold mb-0">{!infographics ? 0 : infographics.deposit.count}</span>}
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                              <i className="fas fa-database" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {isLoading ? <Skeleton /> : <span className="text-nowrap">{moment(!infographics ? 0 : infographics.deposit.lastDate, "DD-MM-YYYY HH:mm:ss").fromNow()}</span>}
                        </p>
                      </CardBody>
                    </Card>
                  </FadeIn>
                </Col>
                <Col lg="6" xl="3">
                  <FadeIn transitionDuration={200} delay={120}>

                    <Card className="card-stats mb-4">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Pengguna
                          </CardTitle>
                            {isLoading ? <Skeleton /> : <span className="h2 font-weight-bold mb-0">{!infographics ? 0 : infographics.user.count}</span>}
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-users" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {isLoading ? <Skeleton /> : <span className="text-nowrap">{moment(!infographics ? 0 : infographics.user.lastDate, "DD-MM-YYYY HH:mm:ss").fromNow()}</span>}
                        </p>
                      </CardBody>
                    </Card>
                  </FadeIn>
                </Col>
                <Col lg="6" xl="3">
                  <FadeIn transitionDuration={200} delay={140}>

                    <Card className="card-stats mb-4">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Angsuran Lunas
                          </CardTitle>
                            {isLoading ? <Skeleton /> : <span className="h2 font-weight-bold mb-0">{!infographics ? 0 : infographics.paidPayment.count}</span>}
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                              <i className="fas fa-money-bill" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {isLoading ? <Skeleton /> : <span className="text-nowrap">{moment(!infographics ? 0 : infographics.paidPayment.lastDate, "DD-MM-YYYY HH:mm:ss").fromNow()}</span>}
                        </p>
                      </CardBody>
                    </Card>
                  </FadeIn>
                </Col>
                <Col lg="6" xl="3">
                  <FadeIn transitionDuration={200} delay={170}>

                    <Card className="card-stats mb-4">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Total Angsuran Terlambat
                          </CardTitle>
                            {isLoading ? <Skeleton /> : <span className="h2 font-weight-bold mb-0">{!infographics ? 0 : infographics.latePayment.count}</span>}
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-money-bill" />
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-muted text-sm">
                          {isLoading ? <Skeleton /> : <span className="text-nowrap">{moment(!infographics ? 0 : infographics.latePayment.lastDate, "DD-MM-YYYY HH:mm:ss").fromNow()}</span>}
                        </p>
                      </CardBody>
                    </Card>
                  </FadeIn>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default DashboardHeader;
