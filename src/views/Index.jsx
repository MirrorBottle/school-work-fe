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
import DashboardHeader from "components/Headers/DashboardHeader";
import UserDashboard from "views/Dashboard/UserDashboard"
import AdminDashboard from "views/Dashboard/AdminDashboard"
// core components
import API from "api";
import user from "user";
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
    const PieChartData = {
      labels: ['Lunas', 'Belum Lunas', 'Belum Divalidasi', 'Ditolak'],
      datasets: [
        {
          label: '# of Votes',
          data: graphics.pieData,
          backgroundColor: [
            '#2DCE89',
            '#F5365C',
            '#5E72E4',
            '#FB6340',
          ],
          borderWidth: 1,
        },
      ],
    }
    return user("role") === "Pengguna" ? <UserDashboard /> : <AdminDashboard />
  }
}

export default Index;
