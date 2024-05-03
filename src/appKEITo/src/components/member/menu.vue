<script setup>
import { onBeforeMount, ref ,watch} from 'vue';
const apiurl = import.meta.env.VITE_API_NAMESERVER

const category = ref('coffee')
const data = ref([])
const fillet = ref([])

watch([category],()=>{
    console.log(category);

    fillet.value = data.value.filter((v,i)=>{
        if(category == 'all'){
            return true
        }
        return v.category == category.value
    })
})

const showDetail = async (data)=>{console.log(data.ingredeints);
    const raw = "";
    let arr = [];
    await data.ingredeints.forEach(v=>{
        getInfo(v.ingredientID,arr)
    })
    console.log(arr);
    
}


const getInfo = (id,arr)=>{
    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch(apiurl+"/api/ingredient/info/?ingredientID="+id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        arr.push(result.data)
    })
    .catch((error) => console.error(error));
}

onBeforeMount(()=>{

    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch(`${apiurl}/api/menu`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
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
        <li @click="category = 'coffee'">COFFEE</li>
        <li @click="category = 'tea'">TEA</li>
        <li @click="category = 'milk'">MILK</li>
    </ul>
    <div class="container">
        <div v-for="value in fillet" :key="value.menuID" class="product">
            <img class="logo" src="https://cdn.discordapp.com/attachments/1114226503970979852/1234980354792751145/cup.png?ex=66355795&is=66340615&hm=ecca1487bff3c2c7982c955469fc6d58c12fc9856501a31865038cd4d2425357&" alt="">
            <div>
                <p>{{ value.name }}</p>
                <p>{{ value.price }}฿</p>
                <button @click="showDetail(value)" class="button-3" style="font-size: 18px;" role="button">Details</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
.header{
    display: flex;
    width: 100%;
    justify-content: end;
    list-style: none;
    gap: 5rem;
    font-size: 24px;
}

.header li:nth-child(1) {
    margin-right: auto;
}

.header li:nth-last-child(-n+3):hover {
    text-decoration: underline;
    color: #686764;
    cursor: pointer;
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
