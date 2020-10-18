export default (data, permission) => {
    if (localStorage.getItem("auth")) {
        return JSON.parse(atob(localStorage.getItem("auth") || "{}"))["data"][data] || null;
    }
    return null;
};
