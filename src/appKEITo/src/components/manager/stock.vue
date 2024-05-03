<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
import { swFail, swSuccess, swconfirm } from '../../util/sweetalert';
import Swal from 'sweetalert2'
const apiurl = import.meta.env.VITE_API_NAMESERVER

const category = ref('stock')
const stock_list = ref([])
const history_list = ref([])

async function add_stock(){
    Swal.fire({
    title: 'Add Stock',
    html:
        '<label style="display:block">IngredientID</label><input id="ingredientID" class="swal2-input" placeholder="1">' +
        '<br>' +
        '<label style="display:block">quantity</label><input id="stock_quantity" class="swal2-input" placeholder="10">' +
        '<br>' +
        '<label style="display:block">expire_date</label><input id="expire_date" type="date" class="swal2-input" placeholder="2020-10-10">' +
        '<br>' +
        '<label style="display:block">commet</label><input id="comment" class="swal2-input" placeholder="New Stock">',
    preConfirm: function () {
        return new Promise(function (resolve) {
        resolve([
            document.getElementById('ingredientID').value,
            document.getElementById('stock_quantity').value,
            document.getElementById('expire_date').value,
            document.getElementById('comment').value
        ])
        })
    },
    confirmButtonText:'Add'
    }).then(function (result) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));
        
        const raw = JSON.stringify({
            ingredientID: result.value[0],
            stock_quantity: result.value[1],
            expire_date:result.value[2],
            comment:result.value[3]
            });

        console.log(raw);
        fetch(apiurl+"/api/manager/stock/add", {
            method:"POST",
            headers:myHeaders,
            body:raw,
            redirect: "follow"
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.status == 'Success'){
                console.log(result);
                list_of_stock();
                swSuccess(result.message)
            }else{
                console.log(result);
                swFail(result.message)
            }
        })
        .catch((error) => console.error(error));
        }).catch((err)=>{
            console.log(err);
        })

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

async function drop(id) {

    if(!(await swconfirm())){
        return 
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

    const raw = JSON.stringify({
        stockID:id
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiurl+"/api/manager/stock/drop", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        if(result.status == 'Success'){
            swSuccess(result.message)
            list_of_stock()
        }else{
            swFail("some Thing")
        }
    })
    .catch((error) => console.error(error));
}

const list_of_stock = ()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

    const raw = "";

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiurl+"/api/manager/stock/list", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            stock_list.value = result.data.filter((v,i)=>{
                return v.status != null
            })
            
        }else{
            swFail("some Thing")
        }
    })
    .catch((error) => console.error(error));
}

const list_of_history = ()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

    const raw = "";

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiurl+"/api/manager/stock/history", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        if(result.status == 'Success'){
            history_list.value = result.data
            
        }else{
            swFail(result.message)
        }
    })
    .catch((error) => console.error(error));
}

onBeforeMount(()=>{
    list_of_stock()
    list_of_history()
})


</script>

<template>
    <ul class="header">
        <li>Stock</li>
        <li @click="category = 'stock'">Stock</li>
        <li @click="category = 'history'">History</li>
    </ul>
    <div v-if="category == 'stock'" class="container">
        <ul class="product-wrap first">
                <li class="product">
                    <p>stockID</p>
                    <p>ingredientID</p>
                    <p>stock_quantity</p>
                    <p>status</p>
                    <p>date</p>
                    <p>expire_date</p>

                </li>
        </ul>
        <ul v-for="(v,i) in stock_list" :key="i" class="product-wrap">
            <li class="product">
                <p>{{v.stockID}}</p>
                <p>{{v.ingredientID}}</p>
                <p>{{v.stock_quantity}}</p>
                <p>{{v.status}}</p>
                <p>{{v.date.split('T')[0]}}</p>
                <p>{{v.expire_date.split('T')[0]}}</p>
                <p @click="drop(v.stockID)" class="xxx"> X </p>
            </li>
        </ul>
        <ul class="product-wrap">
                <li class="product">
                    <button @click="add_stock" class="button-3" role="button">Add</button>
                </li>
        </ul>
    </div> 
    <div v-if="category == 'history'" class="container">
        <ul class="product-wrap first">
                <li class="product">
                    <p>employeeID</p>
                    <p>stockID</p>
                    <p>type</p>
                    <p>quantity</p>
                    <p>comment</p>
                    <p>datetime</p>
                </li>
        </ul>
        <ul v-for="(v,i) in history_list" :key="i" class="product-wrap">
            <li class="product">
                <p>{{v.employeeID}}</p>
                <p>{{v.stockID}}</p>
                <p>{{v.type}}</p>
                <p>{{v.quantity}}</p>
                <p>{{v.comment}}</p>
                <p>{{v.datetime}}</p>
            </li>
        </ul>
    </div> 

</template>

<style scoped>

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

.header li:nth-last-child(-n+2):hover {
    text-decoration: underline;
    color: #686764;
    cursor: pointer;
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
    background-color: #a5724d;
}

.button-3:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
}

.button-3:disabled {
    background-color: rgb(196, 135, 91);
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
}

.button-3:active {
    background-color: #c98b5e;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

</style>
