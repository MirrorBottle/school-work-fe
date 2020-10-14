import Index from "views/Index";
import Login from "views/Auth/Login";


// Deposit
import DepositIndex from "views/Deposit/DepositIndex";
// Payment
import PaymentIndex from "views/Payment/PaymentIndex";
// Loan
import LoanIndex from "views/Loan/LoanIndex"
// User
import UserIndex from "views/User/UserIndex"
// Employee
import EmployeeIndex from "views/Employee/EmployeeIndex"
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-laptop",
    component: Index,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/loans",
    name: "Peminjaman",
    icon: "fas fa-money-check",
    component: LoanIndex,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/payments",
    name: "Angsuran",
    icon: "fas fa-money-bill",
    component: PaymentIndex,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/members",
    name: "Pegawai",
    icon: "fas fa-user-tie",
    component: EmployeeIndex,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/users",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserIndex,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/deposits",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositIndex,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25",
    component: Login,
    layout: "/auth",
  },

];
export default routes;
