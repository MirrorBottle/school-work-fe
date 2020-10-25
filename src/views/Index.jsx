/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import FadeIn from 'react-fade-in';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";
import DashboardHeader from "components/Headers/DashboardHeader";

// core components
import API from "api";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      isLoading: true,
      infographics: {},
      graphics: {
        lineData: [...Array(12)].map(() => 0),
        pieData: [0, 0, 0, 0]
      }
    };
  }
  componentDidMount() {
    API().get("dashboard")
      .then(({ data }) => {
        const { infographics, graphics } = data;
        this.setState({
          isLoading: false, infographics, graphics
        })
      })
      .catch((err) => console.log(err, err.response))
  }
  render() {
    const { isLoading, graphics, infographics } = this.state;
    const LineChartData = {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: 'Peminjaman',
          data: graphics.lineData,
          fill: true,
          backgroundColor: 'rgba(91, 89, 197, .3)',
          borderColor: '#5E72E4',
        },
      ],
    }
    const BarChartData = {
      labels: ['Lunas', 'Belum Lunas', 'Belum Divalidasi', 'Ditolak'],
      datasets: [
        {
          label: '# of Votes',
          data: graphics.pieData,
          backgroundColor: [
            'rgba(255, 99, 132,1)',
            'rgba(54, 162, 235,1)',
            'rgba(255, 206, 86,1)',
            'rgba(75, 192, 192,1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    return (
      <React.Fragment>
        <DashboardHeader isLoading={isLoading} infographics={infographics} />
        <Container className="mt--7" fluid>
          <FadeIn transitionDuration={200} delay={50}>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h2 className="mb-0">Peminjaman Tahun Ini</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col-md-8 col-xl-8 col-12">
                        <h3>Jumlah Peminjaman</h3>
                        <Line data={LineChartData} options={{
                          legend: {
                            display: false,
                          },
                        }} />
                      </div>
                      <div className="col-md-4 col-xl-4 col-12">
                        <h3>Status Peminjaman</h3>
                        <div className="h-100 d-flex align-items-center">
                          <Pie
                            data={BarChartData}
                            options={{
                              legend: {
                                display: false,
                              },
                            }}
                          />
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

            </Row>
          </FadeIn>

        </Container>
      </React.Fragment>
    );
  }
}

export default Index;
