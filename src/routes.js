import Index from "views/Index";
import Login from "views/Auth/Login";
import PageNotFound from "views/404";

// Deposit
import DepositIndex from "views/Deposit/DepositIndex";
import DepositCreate from "views/Deposit/DepositCreate";
import DepositEdit from "views/Deposit/DepositEdit";
import DepositDetail from "views/Deposit/DepositDetail";
// Payment
import PaymentIndex from "views/Payment/PaymentIndex";
// Loan
import LoanIndex from "views/Loan/LoanIndex"
import LoanCreate from "views/Loan/LoanCreate"
import LoanEdit from "views/Loan/LoanEdit"
import LoanDetail from "views/Loan/LoanDetail"
// User
import UserIndex from "views/User/UserIndex"
import UserCreate from "views/User/UserCreate"
import UserEdit from "views/User/UserEdit"
// Employee
import EmployeeIndex from "views/Employee/EmployeeIndex"
//Balance
import BalanceIndex from "views/Balance/BalanceIndex";
// Profile
import Profile from "views/Profile/Profile";
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
    path: "/error/404",
    name: "Error 404 Not Found",
    icon: "fas fa-laptop",
    component: PageNotFound,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profil",
    icon: "fas fa-laptop",
    component: Profile,
    layout: "/admin",
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
    path: "/balances",
    name: "Catatan Saldo",
    icon: "fas fa-list",
    component: BalanceIndex,
    layout: "/admin",
    isSidemenu: true,
  },
  {
    path: "/employees",
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
    path: "/users/create/:type",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserCreate,
    layout: "/admin",
  },
  {
    path: "/users/edit/:type/:id",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserEdit,
    layout: "/admin",
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
    path: "/deposits/create",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositCreate,
    layout: "/admin",
  },
  {
    path: "/deposits/:id",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositDetail,
    layout: "/admin",
  },
  {
    path: "/deposits/edit/:id",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositEdit,
    layout: "/admin",
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
