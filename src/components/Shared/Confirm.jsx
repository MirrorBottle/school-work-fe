import Swal from "sweetalert2";
import Promise from "promise";
const Confirm = (message) =>
    new Promise(function (resolve, reject) {
        Swal.fire({
            title: "Apa anda yakin?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5E72E4",
            cancelButtonColor: "#F5365C",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                resolve(result);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                reject(result);
            }
        });
    });

export default Confirm;
