import Index from "views/Index";
import Login from "views/Auth/Login";


// Deposit
import DepositIndex from "views/Deposit/DepositIndex";
// Payment
import PaymentIndex from "views/Payment/PaymentIndex";
// Loan
import LoanIndex from "views/Loan/LoanIndex"
import LoanCreate from "views/Loan/LoanCreate"
import LoanEdit from "views/Loan/LoanEdit"
import LoanDetail from "views/Loan/LoanDetail"
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
    path: "/loans/create",
    name: "Tambah Peminjaman",
    icon: "fas fa-money-check",
    component: LoanCreate,
    layout: "/admin",
  },
  {
    path: "/loans/:id",
    name: "Peminjaman",
    icon: "fas fa-money-check",
    component: LoanDetail,
    layout: "/admin",
  },
  {
    path: "/loans/edit/:id",
    name: "Peminjaman",
    icon: "fas fa-money-check",
    component: LoanEdit,
    layout: "/admin",
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
