<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
import { swFail, swSuccess } from '../../util/sweetalert';
import Swal from 'sweetalert2'
const apiurl = import.meta.env.VITE_API_NAMESERVER

const category = ref('ingredient')
const ingredient_list = ref([])

async function add_ingredient(){
    const name = await Swal.fire({
        title: "Name",
        input: "text",
        showCancelButton: true,
        confirmButtonText:"next"
    })

    if(!name.isConfirmed || name.isDismissed){
        return
    }
    const unit = await Swal.fire({
        title: "unit",
        input: "text",
        showCancelButton: true,
        confirmButtonText:"next"
    })
    if(!unit.isConfirmed || unit.isDismissed){
        return
    }

    const quantity = await Swal.fire({
        title: "quantity",
        input: "text",
        showCancelButton: true,
        confirmButtonText:"next"
    })
    if(!quantity.isConfirmed || quantity.isDismissed){
        return
    }

    const pic = await Swal.fire({
        title: "pic",
        input: "text",
        showCancelButton: true,
        confirmButtonText:"Confirm"
    })
    if(!pic.isConfirmed || pic.isDismissed){
        return
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
    
    const raw = JSON.stringify({
        "name": name.value,
        "unit": unit.value,
        "quantity": quantity.value,
        "pic": pic.value
        });

    console.log(raw);
    fetch(apiurl+"/api/manager/ingredient/add", {
        method:"POST",
        headers:myHeaders,
        body:raw,
        redirect: "follow"
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            console.log(result);
            pre()
            swSuccess(result.message)
        }else{
            console.log(result);
            swFail(result.message)
        }
    })
    .catch((error) => console.error(error));
}

async function edit_ingredient(data) {
    const { value: fruit } = await Swal.fire({
    title: "Select To Edit",
    input: "select",
    inputOptions: {
            name:"Name",
            unit: "Unit",
            quantity: "Quantity",
            pic: "Pic"
    },
    inputPlaceholder: "Select to Edit",
    showCancelButton: true,
    inputValidator: (value) => {
        return new Promise((resolve) => {
        if (value == "") {
            resolve("You need to select SomeOne");
        } else {
            resolve();
        }
        });
    }
    });

    if (fruit) {

        const { value: text } = await Swal.fire({
        title: "Edit "+ fruit,
        input: "text",
        inputLabel: "Text",
        showCancelButton: true,
        inputValidator: (value) => {
            if(fruit == 'quantity'){
                if(!(/^\d+$/.test(value))){
                    return "Plase Enter Number Only"
                }
                if(parseInt(value) >= 10000){
                        return "Plase Enter Number 0 - 10000"
                    }
            }

            if (!value) {
            return "You need to write something!";
            }
        }
        });
        if (text) {
            if(fruit == 'name'){
                data.name = text;
            }else if(fruit == 'unit'){
                data.unit = text;
            }else if(fruit == 'quantity'){
                data.quantity = parseInt(text);
            }else if(fruit == 'pic'){
                data.pic = text;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
            
            const raw = JSON.stringify({
                "ingredientID": data.ingredientID,
                "name": data.name,
                "unit": data.unit,
                "quantity": data.quantity,
                "pic": data.pic
                });

            console.log(raw);
            fetch(apiurl+"/api/manager/ingredient/edit", {
                method:"POST",
                headers:myHeaders,
                body:raw,
                redirect: "follow"
            })
            .then((response) => response.json())
            .then((result) => {
                if(result.status == 'Success'){
                    console.log(result);
                    swSuccess(result.message)
                }else{
                    swFail(result.message)
                }
            })
            .catch((error) => console.error(error));
        }
    }
}

function drop(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

    const raw = JSON.stringify({
        ingredientID:id
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiurl+"/api/manager/ingredient/drop", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        if(result.status == 'Success'){
            swSuccess(result.message)
            pre()
        }else{
            swFail("some Thing")
        }
    })
    .catch((error) => console.error(error));
}

const pre =()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

    const raw = "";

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiurl+"/api/manager/ingredient/list", requestOptions)
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
        <div v-for="i in ingredient_list" class="product">
            <button @click="drop(i.ingredientID)" style="
                position: absolute;
                top:1rem;
                right: 1rem;
                background-color:white;
                border-radius:5px;
                width: 1rem;
                cursor: pointer;
                color:black;
                font-weight;
                border:none
            ">X</button>
            <!-- <img class="logo" src="https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6632b495&is=66316315&hm=d3f7a6ea2544e6c0c7326cf4440ae5777c53abc78cfa6f97cf6f419760addbe2&" alt=""> -->
            <div>
                <p>{{'ID : '+i.ingredientID}}</p>
                <p><strong>Name :</strong>{{i.name}}</p>
                <p><strong>unit :</strong>{{i.unit }}</p>
                <p><strong>quantity :</strong>{{i.quantity }}</p>
                <p><strong>pic(URL) :</strong>{{i.pic }}</p>
                <button @click="edit_ingredient(i)" class="button-3" style="font-size: 18px;" role="button">Edit</button>
            </div>
        </div>
        <div @click="add_ingredient" class="product push-product" style="display: flex; justify-content:center; align-items:center">
            <!-- <img class="logo" src="https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=6632b495&is=66316315&hm=d3f7a6ea2544e6c0c7326cf4440ae5777c53abc78cfa6f97cf6f419760addbe2&" alt=""> -->

            <p style="width: 100%;;font-size:3rem">+</p>

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
        width: 350px;
        height: 400px;
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
        margin-bottom: 1rem;
    }

    .product div p:nth-child(1) {
        font-weight: 600;
    }


</style>
