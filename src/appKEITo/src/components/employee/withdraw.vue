<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
import { swFail, swSuccess } from '../../util/sweetalert';
import Swal from 'sweetalert2'
const apiurl = import.meta.env.VITE_API_NAMESERVER

const ingredient_list = ref([])

const withdraww = async (id)=>{
    let comment = await Swal.fire({
        title:"Comment",
        input:"text",
        showCancelButton:true,
        showConfirmButton:true
    })

    if(comment.isConfirmed){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

        const raw = JSON.stringify({
        "ingredientID": id,
        "comment": comment.value
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(apiurl+"/api/employee/withdraw", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if(result.status == 'Success'){
                swSuccess(result.message)
                pre()
            }else{
                swFail(result.message);
            }
        })
        .catch((error) => console.error(error));
    }

    
}

const pre =()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));



    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(apiurl+"/api/ingredient", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            ingredient_list.value = result.data
        }else{
            swFail("some Thing")
        }
    })
    .catch((error) => console.error(error));
}

onBeforeMount(()=>{
    pre()
})



</script>

<template>
    <ul class="header">
        <li>Ingredient</li>
    </ul>
    <div class="container">
        <div v-for="(i,v) in ingredient_list" :key="v" class="product">
           <div>
                <img class="logo" src="" alt="">
            
                <p>{{'ID : '+i.ingredientID}}</p>
                <p><strong>Name :</strong>{{i.name}}</p>
                <p><strong>quantity :</strong>{{i.quantity }}</p>
                <button @click="withdraww(i.ingredientID)" class="button-3" style="font-size: 18px;" role="button">Withdraw</button>
            </div>
        </div>
    </div> 

</template>

<style scoped>


    .push-product{
        cursor: pointer;
    }

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

.header li:nth-last-child(-n+0):hover {
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
        margin-bottom: 4rem;
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
        margin-bottom: 1rem;
    }

    .product div p:nth-child(1) {
        font-weight: 600;
    }


</style>
