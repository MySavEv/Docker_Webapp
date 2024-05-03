<script setup>
import { swconfirm } from '@util/sweetalert.js'
import { ref, reactive ,computed, watch} from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate ,RouterLink} from 'vue-router'
import { swFail, swSuccess } from '../util/sweetalert';

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()


onBeforeRouteLeave(async (to, from) => {
return await swconfirm()
})

const firstname = ref('');
const lastname = ref('');
const confirmpwd = ref('');

const toggle_redborder = ref(false);


const data = reactive({ username:'', password:'' ,gender:'', name:'', email:'', tel:'', join_date:new Date().toISOString().slice(0, 10), birthday:'',street:'', subdistrict:'', district:'', city:'', zipcode:''})

const fullname = computed(()=>{
  return firstname.value + ' ' + lastname.value
})

function checkEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return'Please enter a valid email address.';
      } else {
        return '';
      }
    }

function checkUsername() {
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      const hasEnoughLength = data.username.length >= 5;
      const hasEnoughLetters = (data.username.match(/[a-zA-Z]/g) || []).length >= 3;

      if (!hasEnoughLength) {
        return 'Username must be at least 5 characters long.';
      } else if (!usernameRegex.test(data.username)) {
        return 'Username must contain only letters (a-z, A-Z) or numbers (0-9).';
      } else if (!hasEnoughLetters) {
        return 'Username must contain at least 3 letters.';
      } else {
        return false;
      }
    }

watch([firstname,lastname],()=>{
  data.name = fullname.value
})


function reg(e) {
  const myHeaders = new Headers();


  const unameErr = checkUsername();
  const emailErr = checkEmail();

  if(unameErr){
    swFail(unameErr)
    return
  }

  if(emailErr){
    swFail(emailErr)
    return
  }

  if(data.password != confirmpwd.value){
    if (!data.password)
      {
        swFail("Plase Enter Password!!")
        return
      }
    swFail("Password , ConfirmPassword Not Equal ")
    return
  }

  myHeaders.append("Content-Type", "application/json");

  console.log(data);
  const raw = JSON.stringify(data)

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/api/register/member", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if(result.status == 'Success'){
        swSuccess(result.message)
          .then(v=>{

          })
      }else{
          toggle_redborder.value = true
          swFail("Plase Check info!!")
      }
    })
    .catch((error) => {
      swFail(error.message)
    });
}

</script>

<template>
  <div class="login-page">
    <div class="item2">
      <div class="login-box">
          <form @submit.prevent="reg" class="login-box-group">

              <p id="topic-line-1">Create </p>
              <p id="topic-line-2">Your Account</p>
              <hr style="margin-top: 1rem; margin-bottom: 1rem; height: 1px; background-color: rgb(223, 175, 94);">
              <div class="row">
                <div>
                    <label id="input-1-text" class="require">First Name</label>
                    <input :class="{'red-border': !firstname && toggle_redborder}" v-model="firstname" name="firstname" type="text" id="FirstName" class="input-1" placeholder="test">
                </div>

                <div>
                  <label id="input-2-text" class="require">Last Name</label>
                  <input :class="{'red-border': !lastname && toggle_redborder}"  v-model="lastname" type="text" id="lastName" class="input-2" placeholder="test">
                </div>
              </div>

              <div class="row">
                <div>
                  <label id="input-3-text" class="require">Date of Birth</label>
                  <input :class="{'red-border': !data.birthday && toggle_redborder}" v-model="data.birthday" type="date" id="birth" class="input-3">
                </div>

                <div>
                  <label id="input-4-text" class="require">Phone</label>
                  <input :class="{'red-border': !data.tel && toggle_redborder}" v-model="data.tel" type="text" id="phone" class="input-4" placeholder="0XX-XXX-XXXX">
                </div>
              </div>
              
              <div class="row">
                <div>
                  <label id="input-5-text" class="require">Username</label>
                  <input :class="{'red-border': !data.username && toggle_redborder}" v-model="data.username" type="text" id="username" class="input-5" placeholder="test@gmail.com">
                </div>

                <div>
                  <label id="input-8-text" class="require">Email</label>
                  <input :class="{'red-border': !data.email && toggle_redborder}" v-model="data.email" type="text" id="email" class="input-8" placeholder="test@gmail.com">
                </div>
              </div>

              <div class="row">
                <div style="justify-self: center;">
                  <label id="input-9-text" class="require">Password</label>
                  <input :class="{'red-border': !data.password && toggle_redborder}" v-model="data.password" type="password" id="password" class="input-9" placeholder="*****">
                </div>
                
                <div>
                  <label id="input-10-text" class="require">Confirm-Password</label>
                  <input :class="{'red-border': !data.confirmpwd && toggle_redborder}" v-model="confirmpwd" type="password" id="password-confirm" class="input-10" placeholder="*****">
                </div>
              </div>

              <div class="row">
                <div>
                  <label id="input-6-text" class="require">Gender</label>
                  <select :class="{'red-border': !data.gender && toggle_redborder}" v-model="data.gender" id="select-gender" class="input-6">
                      <option>-</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                  </select>
                </div>
                <div></div>
              </div>
              <hr style="margin-top: 1rem; margin-bottom: 1rem; height: 1px; background-color: rgb(223, 175, 94);">

              <div class="row">
                <div style="justify-self: center;">
                  <label id="input-9-text" class="require">Street (ที่อยู่)</label>
                  <input :class="{'red-border': !data.street && toggle_redborder}" v-model="data.street" type="text"  class="input-9" placeholder="123 หมู่ 6 ซอย 3">
                </div>
                
                <div>
                  <label id="input-10-text" class="require">Subdistrict (ตำบล)</label>
                  <input :class="{'red-border': !data.subdistrict && toggle_redborder}" type="text" v-model="data.subdistrict"  class="input-10" placeholder="แก้วมังกร">
                </div>
              
                <div style="justify-self: center;">
                  <label id="input-9-text" class="require">District (อำเภอ)</label>
                  <input :class="{'red-border': !data.district && toggle_redborder}" v-model="data.district" type="text"  class="input-9" placeholder="คลองหลวง">
                </div>
                
              </div>
              
              <div class="row">
                <div>
                  <label id="input-10-text" class="require">City (จังหวัด)</label>
                  <input :class="{'red-border': !data.city && toggle_redborder}" type="text" v-model="data.city" class="input-10" placeholder="ปทุมธานี">
                </div>
                <div style="justify-self: center;">
                  <label id="input-9-text" class="require">Zipcode (รหัสไปรษณีย์) </label>
                  <input :class="{'red-border': !data.zipcode && toggle_redborder}" v-model="data.zipcode" type="text" class="input-9" placeholder="73000">
                </div>
                
              </div>

              <div class="button-all">
                  <button type="submit" class="button-18">Create Account</button>
                  <hr style="margin-top: 1rem; margin-bottom: 1rem; height: 1px; background-color: rgb(223, 175, 94);">
                  <div class="anyaccount" >
                    Have Any Account?
                  </div>
                  
                  <router-link to="sigin" class="button-18">Sign In</router-link>
              </div>
          </form>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
  .red-border {
    box-shadow: 0 0 4px 1px red; /* เพิ่มเงาเมื่อเปิดไฟ */
  }

  .require:after{
    content:'*';
    color:red;
  }

  .anyaccount{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  .row{
    display: flex;
    margin-bottom: 2rem;
    gap:5rem
  }


  #topic-line-1 {
      font-weight: bolder;
      color: #614f3b;
      font-size: 50px;
      white-space: nowrap;
      letter-spacing: 0;
      line-height: normal;
      cursor: pointer;
  }

  #topic-line-2 {
      font-weight: 700;
      color: #c6a98a;
      font-size: 25px;
      white-space: nowrap;
      letter-spacing: 0;
      line-height: normal;
      cursor: pointer;
  }

  label {
    display: block;
    font-size: large;
    margin-bottom: 0.5rem;
    width: fit-content;
  }

  input ,select{
      font-weight: normal;
      font-size: 0.9em;
      background: #fff;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .1);
      color: #000000;
      padding: 10px;
      border: none;
      width: 100%;
      height: 3.5rem;
  }

  .item2 {
      padding: 1rem;
  }

  .button-18 {
      width: 100%;
      margin-top: 1rem;
      align-items: center;
      background-color: rgb(223, 175, 94);
      border: 0;
      border-radius: 100px;
      box-sizing: border-box;
      color: #ffffff;
      cursor: pointer;
      display: inline-flex;
      font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: 600;
      justify-content: center;
      line-height: 20px;

      min-height: 40px;
      min-width: 0px;
      overflow: hidden;
      padding: 0px;
      padding-left: 20px;
      padding-right: 20px;
      text-align: center;
      touch-action: manipulation;
      transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
      user-select: none;
      -webkit-user-select: none;
      vertical-align: middle;
  }

  .button-18:hover,
  .button-18:focus { 
      background-color: rgb(230, 169, 65);
      color: #ffffff;
  }

  .button-18:active {
  background: #09223b;
  color: rgb(255, 255, 255, .7);
  }

  .button-18:disabled { 
  cursor: not-allowed;
  background: rgba(0, 0, 0, .08);
  color: rgba(0, 0, 0, .3);
  }

  .login-page {
      background-color: #f1f1f3;
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 70%;
      padding: 3.5rem;
      min-width: 1000px;
      margin: 0 auto 0 auto;
  }

  .login-page div{
      width: 100%;
  }
  
  .login-page .item2{
      background-color: white;
      min-width: 300px;
  }

  .login-box{
    padding: 1.5rem;
  }
</style>
