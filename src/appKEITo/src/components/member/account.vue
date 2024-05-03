<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
import { swFail } from '../../util/sweetalert';
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()
const route = useRoute()

const apiurl = import.meta.env.VITE_API_NAMESERVER

const data = ref({
    memberID: 0,
    gender: "",
    name: "",
    email: "",
    tel: "",
    join_date: "",
    birthday: "",
    points: 0,
    street: "",
    subdistrict: "",
    district: "",
    city: "",
    zipcode: ""
})


function showQr() {
    Swal.fire({
        title: 'Show the QR code to the employee',
        imageUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${data.memberID}&amp;size=150x150`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'QR Code',
        showCancelButton: true,
        cancelButtonText: 'Close',
        showConfirmButton:false
    })
}

onBeforeMount(()=>{
    const token = localStorage.getItem("token")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(`${apiurl}/api/member/profile`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            console.log(result);
            data.value = result.data[0];
        }
    })
    .catch((error) => console.error(error));
    })

</script>

<template>
    <p class="topic">Acount <strong> #{{ data.memberID }} </strong></p>

    <div class="info">
        <div class="profile-left">
        <p><strong>First Name</strong> : {{ data.name.split(' ')[0] }}</p>
        <p><strong>Gender</strong> : {{ data.gender }}</p>
        <p><strong>Birth</strong> : {{ data.birthday.split('T')[0] }}</p>
        <p><strong>Phone</strong> : {{ data.tel }}</p>
        </div>
        <div class="profile-left">
            <p><strong>Last Name</strong> : {{ data.name.split(' ')[1] }}</p>
            
            <p><strong>Address</strong> : {{ data.birthday.split('T')[0] }}</p>
            <p><strong>Email</strong> : {{ data.email }}</p>

        </div>
    </div>
    <div class="box-qr">
        <button @click="showQr" class="button-43" role="button">QRCode</button>
    </div>

</template>

<style scoped>

    .box-qr{
        display:flex;
    }

    .qr{
        height: 5rem;
        width: 5rem
    }

    .topic{
        font-size: 24px;
        font-weight: 600;
    }

    .info{
        display: flex;
        font-size: 25px;
        min-width: 800px;
        background-color:#f0f0f0;
        border-radius: 10px;
        padding: 2rem;
        margin-bottom: 5rem;
        margin-top: 5rem;
    }

    .profile-left {
        flex: 1;
        padding: 20px;
    }

    .profile-left p{
        padding: 1.5rem;
    }



    /* CSS */
    .button-43 {
    margin:0 auto 0 auto;
    background-image: linear-gradient(-180deg, #C1855A 0%, #C1855A 100%);
    border-radius: .5rem;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    font-size: 16px;
    justify-content: center;
    padding: 1rem 1.75rem;
    text-decoration: none;
    border: 0;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    }

    .button-43:hover {
    background-image: linear-gradient(-180deg, #e69e6b 0%, #e9a16d 100%);
    }

    @media (min-width: 768px) {
    .button-43 {
        padding: 1rem 2rem;
    }
    }
</style>
