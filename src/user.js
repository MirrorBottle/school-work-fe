export default (data, permission) => {
    if (localStorage.getItem("auth")) {
        if (permission !== "") {
            return JSON.parse(atob(localStorage.getItem("auth") || "{}"))[
                data
            ].includes(permission);
        }
        return JSON.parse(atob(localStorage.getItem("auth") || "{}"))[data] || null;
    }
    return null;
};
