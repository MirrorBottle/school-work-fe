
import React from "react";
import user from "user"
import UserDashboard from "views/Dashboard/UserDashboard"
import AdminDashboard from "views/Dashboard/AdminDashboard"
class Index extends React.Component {
  render() {
    return user("role") === "Pengguna" ? <UserDashboard /> : <AdminDashboard />
  }
}

export default Index;
