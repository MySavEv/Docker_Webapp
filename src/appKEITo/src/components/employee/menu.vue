<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
import { swFail, swSuccess } from '../../util/sweetalert';
import Swal from 'sweetalert2'
const apiurl = import.meta.env.VITE_API_NAMESERVER

const category = ref('coffee')
const data = ref([])
const fillet = ref([])
const order = ref([])
const cart_show = ref(false)

const subtotal = ref(0)
const discount = ref(10)
const total = ref(0)
const method = ref('')
const memberID = ref('')
const couponID = ref('')



watch([category],()=>{
    console.log(category);

    fillet.value = data.value.filter((v,i)=>{
        if(category == 'all'){
            return true
        }
        return v.category == category.value
    })
})

watch([order],()=>{
    if(order.value.length == 0){
        cart_show.value = false;
        return
    }

    subtotal.value = order.value.reduce((t,v)=>{console.log(1);;return t + v.price},0).toFixed(2);
    let stotal = (subtotal.value - discount.value).toFixed(2);
    total.value = stotal < 0? 0:stotal;
},{deep:true})


async function addorder() {

    if(!method.value){
            swFail("Plase Select Method!!!")
            return
        }

    let result = await Swal.fire({
        title: "Confirm Payment",
        text: "Confirm",
        icon: "question",
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancle",
        cancelButtonColor: "#DC143C",
        showCancelButton:true
        });

    console.log(result);

    if(result.isConfirmed){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));


        let payload = {
            "menus": order.value.map((v,i)=>{return v.menuID}),
            "method": method.value
            }
        if(memberID.value){
            payload.memberID = memberID.value;
            if(couponID.value){
                payload.couponID = couponID.value;
            }
        }

        console.log(payload);

        const raw = JSON.stringify(payload);

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(`${apiurl}/api//employee/addorder`, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
            const status = result.status;
            if(status == 'Fail'){
                swFail(result.message);
            }else{
                await swSuccess(result.message)
                order.value = [];
                cart_show.value = false

            }
        })
        .catch((error) => console.error(error));
    }
}

onBeforeMount(()=>{

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch(`${apiurl}/api/menu`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            data.value = result.data
            fillet.value = data.value.filter((v,i)=>{
            if(category == 'all'){
                return true
            }
            return v.category == category.value
    })
        }
    })
    .catch((error) => console.error(error));


})



</script>

<template>
    <ul class="header">
        <li>Menu</li>
        <li class="li-cart" @click="()=>{
            if(order.length > 0){
                cart_show = true
            }
        }">{{order.length}}</li>
        <li @click="category = 'coffee'">COFFEE</li>
        <li @click="category = 'tea'">TEA</li>
        <li @click="category = 'milk'">MILK</li>
    </ul>
    <div class="container">
        <div v-for="value in fillet" :key="value.menuID" class="product">
            <img class="logo" src="https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6632b495&is=66316315&hm=d3f7a6ea2544e6c0c7326cf4440ae5777c53abc78cfa6f97cf6f419760addbe2&" alt="">
            <div>
                <p>{{ value.name }}</p>
                <p>{{ value.price }}฿</p>
                <button @click="()=>{order.push(value);console.log(order)}" class="button-3" style="font-size: 18px;" role="button">Add Order</button>
            </div>
        </div>
    </div> 

    <div v-if="cart_show" class="cart">
        <button @click="cart_show = false" class="button-c">X</button>
        <div class="crat-container">
            <ul class="menu-list">
                <li v-for="(v,i) in order" :key="i" class="item">
                    <!-- <img src="" alt="Product Image"> -->
                    <div>*</div>
                    <h3>{{v.name}}</h3>
                    <p>{{v.price + ' Bath'}}</p>
                    <button class="button-44" role="button" @click="()=>{order.splice(i,1)
                    }">Remove</button>
                </li>
            </ul>
            <div>
                <div class="method-coupon">
                    <select class="item item-method" v-model="method">
                        <option value="DebitCard">DebitCard</option>
                        <option value="CreditCard">CreditCard</option>
                        <option value="Cash">Cash</option>
                    </select>

                    <div class="mempon">
                        <input id="memberid" class="item item-method" placeholder="MemberID" v-model="memberID"/>
                        <input id="couponid" class="item item-method" placeholder="CouponID" v-model="couponID"/>
                    </div>

                </div>

                <div class="total">
                    <div class="left">
                        Order Summary
                    </div>
                    <div class="rigth">
                        <div><p>Subtotal</p>
                            <p>{{subtotal}} ฿
                            </p>
                        </div>
                        <div><p>Discount</p><p>{{discount}} ฿</p></div>
                        <div><p>Total</p><p>{{total}} ฿</p></div>
                    </div>
                </div>

                <div class="suborder">
                    <button @click="addorder" class="button-3 placeorder">Place Order</button>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
    .mempon{
        display: flex;
        gap: 1rem;
        width: 100%;
    }

    .placeorder{
        font-size: 20px !important;
        height: 3rem;
    }

    .suborder{
        display: flex;
        justify-content: center;
    }

    .left{
        font-weight: bold;
    }

    .rigth div{
        display: flex;
        justify-content: space-between;
    }

    .rigth{
        width: 43.5%;
    }

    .total{
        margin: 1rem 0 1.5rem;
        display:flex;
        justify-content: end;
        gap:2rem;
        font-size: 20px;
    }

    .item-method{
        margin-top: 1rem;
        height: 50px !important;
        min-height: 0px !important;
    }

    .method-coupon{
        display: flex;
        width: 100%;
        justify-content: space-between ;
        gap:5rem;
    }

    .menu-list {
        list-style-type: none;
        padding: 0;
    }


    .item {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        padding: 10px;
        background-color: #f9f9f9;
        width: 100%;
        justify-content: space-between;
        min-height: 4rem;
    }

    .item img{
        width: 100px;
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

.button-c {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 0.8rem;
    margin: 2rem;
    background-color: #C1855A; /* สีพื้นหลังปุ่ม */
    color: #ffffff; /* สีข้อความ */
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

.button-c:hover{
    background-color: #c99774;
}

.button-c:active{
    background-color: #ad754d;
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

.header{
    display: flex;
    width: 100%;
    justify-content: end;
    list-style: none;
    gap: 5rem;
    font-size: 24px;
    align-items: center;
}

.header li:nth-child(1) {
    margin-right: auto;
}

.header li:nth-last-child(-n+4):hover {
    text-decoration: underline;
    color: #686764;
    cursor: pointer;
}



/* CSS */
.button-44 {
  background: #e62143;
  border-radius: 11px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: Mija,-apple-system,BlinkMacSystemFont,Roboto,"Roboto Slab","Droid Serif","Segoe UI",system-ui,Arial,sans-serif;
  font-size: 16ยป;
  font-weight: 0;
  justify-content: center;
  line-height: 33.4929px;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
  text-decoration-skip-ink: auto;
  text-shadow: rgba(0, 0, 0, .3) 1px 1px 1px;
  text-underline-offset: 1px;
  transition: all .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
}

.button-44:active,
.button-44:focus {
  border-bottom-style: none;
  border-color: #dadada;
  box-shadow: rgba(0, 0, 0, .3) 0 3px 3px inset;
  outline: 0;
}

.button-44:hover {
  border-bottom-style: none;
  border-color: #dadada;
}

/* CSS */
.button-3 {
    appearance: none;
    background-color: #C1855A;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
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
    width: 75%;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
}

.button-3:hover {
    background-color: #d6905e;
}

.button-3:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
}

.button-3:disabled {
    background-color: #be7d4f;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
}

.button-3:active {
    background-color: #be7d4f;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}





    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around; /* จัดตำแหน่งสินค้าตามกลุ่ม */
        list-style-type: none;
        padding: 0;
        margin-top: 5rem;
    }

    .product {
        position: relative;
        width: 250px;
        height: 300px;
        margin: 20px;
        padding: 15px 0 15px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
    }

    .logo{
        position: absolute;
        max-width: 250px;
        border-radius: 5px;
        margin-bottom: 10px;
        left:0;
        bottom: 45%;
    }

    .product div{
        width: 100%;
        position: absolute;
        bottom: 15%;
        font-size: 24px;
    }

    .product div p {
        margin-bottom: 0.5rem;
    }

    .product div p:nth-child(1) {
        font-weight: 600;
    }


</style>
