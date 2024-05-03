import Swal from 'sweetalert2'


export async function swconfirm(){
        let result = await Swal.fire({
            title: "Are you sure?",
            text: "Data will not be saved",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Confirm",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            reverseButtons: false
        })

        return result.isConfirmed
    }

    export async function swSuccess(msg){
        return Swal.fire({
            title: "Success",
            text: msg,
            icon: "success",
        })
    }

    export async function swFail(msg){
        return Swal.fire({
            title: "Fail",
            text: msg,
            icon: "error",
        })
    }

    export async function swLoading(delay){
        return Swal.fire({
            title: "Loading",
            timer: delay,
            timerProgressBar: true,
            didOpen: async () => {
                Swal.showLoading();
            },
            });
    }