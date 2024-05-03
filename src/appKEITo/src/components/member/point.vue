<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
import { swFail, swSuccess } from '../../util/sweetalert';
import Swal from 'sweetalert2'
const apiurl = import.meta.env.VITE_API_NAMESERVER

const data = ref([])
const point = ref(0)
const cart_show = ref(false)
const coupon_list = ref([])

function showQr(couponID) {
    Swal.fire({
        title: 'Show the QR code to the employee',
        imageUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${couponID}&amp;size=150x150`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'QR Code',
        showCancelButton: true,
        cancelButtonText: 'Close',
        showConfirmButton:false
    })
}

const getPoint= ()=>{
    const token = localStorage.getItem("token")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(`${apiurl}/api/member/coupon`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        data.value = result.data;
    })
    .catch((error) => console.error(error));

    fetch(`${apiurl}/api/member/point`, {
        method: "POST",
        headers: myHeaders
        })
    .then((response) => response.json())
    .then((result) => {
        point.value = result.data['points']
    })
    .catch((error) => console.error(error));
}

const getCouponList = ()=>{
    const myHeaders = new Headers();

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(`${apiurl}/api/coupon`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        if(result.status == 'Success'){
            coupon_list.value = result.data;
        }else{
            swFail(result.message)
        }
    })
    .catch((error) => console.error(error));
}

onBeforeMount(()=>{
    getPoint();
    getCouponList();
})

const redeem = (couponID)=>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

    const raw = JSON.stringify({
    "couponID": couponID
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiurl+"/api/member/exchange", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            swSuccess(result.message);
            getCouponList();
            getPoint();
        }else{
            swFail(result.message)
        }
    })
    .catch((error) => console.error(error));
}

</script>

<template>
    <div class="header">
        <p class="topic">Coupon</p>
        <p class="topic"> {{point}}  Points</p>
        <p @click="cart_show = true" class="topic">Redeem</p>
    </div>

    <ul class="coupon-list">
        <li v-for="v in data" v-bind:key="v.couponID" class="coupon-item">
            <img v-if="v.type == '1'" src="https://cdn.discordapp.com/attachments/1114226503970979852/1235730088260010136/Coupon_3.png?ex=66356ed3&is=66341d53&hm=2d5e3b44fe6884ad490b1cd115fe9ffbeeb586273905077a59f88a7a7db4f06d&" alt="Coupon 1" class="coupon-img">
            <img v-else src="https://cdn.discordapp.com/attachments/1114226503970979852/1235730087811350538/Coupon_1.png?ex=66356ed3&is=66341d53&hm=d7387fe0d0fcccf516f47f214ac9eff2a18c234e599c01f633c0431aee14665e&" alt="Coupon 1" class="coupon-img">
            <div class="content">
                <h3 class="coupon-title">{{ v.discount }}% Off</h3>
                <p class="coupon-description">{{ v.description }}. Valid until {{ v.expire_date.split('T')[0] }}</p>
                <button @click="showQr(v.couponID)" class="button-3" style="font-size: 18px;background-color:#C1855A" role="button">Use</button>
            </div>
        </li>

    </ul>

    <div v-if="cart_show" class="cart">
        <div style="display: flex; justify-content:end">
            <button @click="cart_show = false" class="button-3 close">X</button>
        </div>
        <p class="pointss">{{point + " Points"}}</p>
        <div class="container">
        <ul class="product-wrap first">
                <li class="product">
                    <p>couponID</p>
                    <p>reqpoints</p>
                    <p>type</p>
                    <p>discount</p>
                    <p>description</p>
                    <p>Get</p>
                </li>
        </ul>
        <ul v-for="(v,i) in coupon_list" :key="i" class="product-wrap">
            <li class="product">
                <p>{{v.couponID}}</p>
                <p>{{v.reqpoints}}</p>
                <p>{{v.type}}</p>
                <p>{{v.discount}}</p>
                <p>{{v.description}}</p>
                <button @click="redeem(v.couponID)" class="button-3" role="button">Get</button>
            </li>
        </ul>
    </div> 
    </div>
</template>

<style scoped>

.pointss{
    text-align: center;
    font-size: 24px;
}

.close{
    background-color: #C1855A !important;
}

/* CSS */
.button-3 {
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.button-3:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

.xxx{
    position: absolute;
    top: 5px;
    right: 10px;
    width: fit-content !important;
    cursor: pointer;
    color: #686764;
}

.product-wrap{
    display:block;
    position: relative;
    width: 100%;
    list-style: none;
}

.product p{
    width: 10%;
}

.first li:nth-child(1){
    font-size: 18px;
    font-weight: bold;
    border-bottom: 2px solid black;
    background-color: rgb(209, 209, 209) !important;
}

.product-wrap li{
    display: flex;
    justify-content: space-around;
    height: 5rem;
    margin-bottom: 1rem;
    background-color: white;
    text-align: center;
    align-items: center;
    border-radius: 10px;
}

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around; /* จัดตำแหน่งสินค้าตามกลุ่ม */
        list-style-type: none;
        padding: 2rem;
        margin-top: 2rem;
        background-color: #e6e6e6b2;
        border-radius: 1rem;
    }

    .cart{
        background-color: #fefefe;
        margin: auto; /* เคลียร์ margin ที่มีมาแล้ว */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 75%;
        height: 75%;
        overflow: auto;
        border: 1px solid #888;
        border-radius: 3rem;
        padding: 1rem;
    }

    .crat-container{
        margin: 5rem;

    }

    .li-cart{
        padding: 0.5rem;
        border: 2px solid black;
        border-radius: 5px;
    }

    .li-cart:hover{
        background-color: #d38945;
        border: 2px solid black;
        color: black !important;
        text-decoration: none !important;
    }

    .crat-container{
        position: relative;
    }

    .header{
        display:flex;
        justify-content: space-between;
    }

    .header p:nth-last-child(-n+1):hover{
        color: #d38f37;
        cursor: pointer;
        text-decoration: underline;
    }

    .topic{
        font-size: 24px;
    }

    img{
        width: 50%;
    }

    li {
        display: flex;
        gap: 5rem;
        text-align: center;
        height: 100%;
        align-items: center;
    }

    .content *{
        margin-top: 0.5rem;
        
    }

    .content {
        padding: 1rem;
    }

    .coupon-list {
        list-style-type: none;
        padding: 0;
        margin-top: 3rem;
    }


    .coupon-item {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        background-color: #f9f9f9;
        width: fit-content;
    }

    .coupon-title {
        font-weight: bold;
        margin-top: 0;
    }

    .coupon-description {
        margin-bottom: 0;
    }
</style>
