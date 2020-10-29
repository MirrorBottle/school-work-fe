import Index from "views/Index";
import Login from "views/Auth/Login";
import PageNotFound from "views/404";

// Deposit
import DepositIndex from "views/Deposit/DepositIndex";
import DepositCreate from "views/Deposit/DepositCreate";
import DepositEdit from "views/Deposit/DepositEdit";
import DepositDetail from "views/Deposit/DepositDetail";
// Loan
import LoanIndex from "views/Loan/LoanIndex"
import LoanCreate from "views/Loan/LoanCreate"
import LoanEdit from "views/Loan/LoanEdit"
import LoanDetail from "views/Loan/LoanDetail"
// User
import UserIndex from "views/User/UserIndex"
import UserCreate from "views/User/UserCreate"
import UserEdit from "views/User/UserEdit"
import UserDetail from "views/User/UserDetail"
// Employee
import EmployeeIndex from "views/Employee/EmployeeIndex"
import EmployeeDetail from "views/Employee/EmployeeDetail"
//Balance
import BalanceIndex from "views/Balance/BalanceIndex";
import BalanceCreate from "views/Balance/BalanceCreate";
// Loan Submissions
import LoanSubmissionCreate from "views/LoanSubmission/LoanSubmissionCreate";
import LoanSubmissionIndex from "views/LoanSubmission/LoanSubmissionIndex";
// Profile
import Profile from "views/Profile/Profile";
// Report
import Report from "views/Report";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fas fa-laptop",
    component: Index,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Pegawai", "Admin", "Pengguna"]
  },
  {
    path: "/error/404",
    name: "Error 404 Not Found",
    icon: "fas fa-laptop",
    component: PageNotFound,
    layout: "/admin",
    roles: ["Pegawai", "Admin", "Pengguna"]
  },
  {
    path: "/profile",
    name: "Profil",
    icon: "fas fa-laptop",
    component: Profile,
    layout: "/admin",
    roles: ["Pegawai", "Admin", "Pengguna"]
  },
  {
    path: "/loans",
    name: "Peminjaman",
    icon: "fas fa-money-check",
    component: LoanIndex,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/loans/create/:loanSubmissionId?",
    name: "Tambah Peminjaman",
    icon: "fas fa-money-check",
    component: LoanCreate,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/loans/:id",
    name: "Peminjaman",
    icon: "fas fa-money-check",
    component: LoanDetail,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/loans/edit/:id",
    name: "Peminjaman",
    icon: "fas fa-money-check",
    component: LoanEdit,
    layout: "/admin",
    roles: ["Admin"]
  },
  {
    path: "/submissions",
    name: "Pengajuan Peminjaman",
    icon: "fas fa-file",
    component: LoanSubmissionIndex,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/submissions/create",
    name: "Pengajuan Peminjaman",
    icon: "fas fa-file",
    component: LoanSubmissionCreate,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Pengguna"]
  },
  {
    path: "/balances",
    name: "Catatan Saldo",
    icon: "fas fa-list",
    component: BalanceIndex,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Admin"]
  },
  {
    path: "/balances/create",
    name: "Catatan Saldo",
    icon: "fas fa-list",
    component: BalanceCreate,
    layout: "/admin",
    roles: ["Admin"]
  },
  {
    path: "/employees",
    name: "Pegawai",
    icon: "fas fa-user-tie",
    component: EmployeeIndex,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Admin"]
  },
  {
    path: "/employees/:id",
    name: "Pegawai",
    icon: "fas fa-user-tie",
    component: EmployeeDetail,
    layout: "/admin",
    roles: ["Admin"]
  },
  {
    path: "/users",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserIndex,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Pegawai", "Admin"]
  },

  {
    path: "/users/create/:type",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserCreate,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/users/:id",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserDetail,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/users/edit/:type/:id",
    name: "Pengguna",
    icon: "fas fa-user",
    component: UserEdit,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/deposits",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositIndex,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Admin"]
  },
  {
    path: "/deposits/create",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositCreate,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/deposits/:id",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositDetail,
    layout: "/admin",
    roles: ["Pegawai", "Admin"]
  },
  {
    path: "/deposits/edit/:id",
    name: "Setoran",
    icon: "fas fa-database",
    component: DepositEdit,
    layout: "/admin",
    roles: ["Admin"]
  },
  {
    path: "/report",
    name: "Laporan",
    icon: "fas fa-chart-bar",
    component: Report,
    layout: "/admin",
    isSidemenu: true,
    roles: ["Pegawai", "Admin"]
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
