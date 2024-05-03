import{_ as j,h as N,m as P,a as A}from"./account-d5BltOjs.js";import{l as z}from"./ad4-BrqlX7-E.js";import{_ as $,o as d,f as h,g as e,j as O,p as T,k as D,r as k,x as H,F as w,y as B,z as u,a as C,A as _,b as E,d as V,c as S}from"./index-4dHJFcAk.js";import{S as f,a as v,s as g,c as J}from"./sweetalert-LjNN19ZY.js";const M=p=>(T("data-v-dbbd4542"),p=p(),D(),p),F={class:"header"},L=M(()=>e("img",{class:"logo",src:j,alt:""},null,-1)),R={class:"item2"},U={style:{"margin-left":"1.5rem","margin-right":"1.5rem"}},X={__name:"manager_nav",setup(p){return(i,r)=>(d(),h("div",F,[L,e("nav",null,[e("ul",R,[e("li",{onClick:r[0]||(r[0]=m=>i.$emit("clickmenu","home"))},"Home"),e("li",{onClick:r[1]||(r[1]=m=>i.$emit("clickmenu","ingredient"))},"Ingredient"),e("li",{onClick:r[2]||(r[2]=m=>i.$emit("clickmenu","stock"))},"Stock"),e("li",{onClick:r[3]||(r[3]=m=>i.$emit("clickmenu","menu"))},"Menu"),e("li",{onClick:r[4]||(r[4]=m=>i.$emit("clickmenu","myacc"))},"MyAccount")])]),e("p",U,[O(z)])]))}},Y=$(X,[["__scopeId","data-v-dbbd4542"]]),b=p=>(T("data-v-64fb52cf"),p=p(),D(),p),Q=b(()=>e("ul",{class:"header"},[e("li",null,"Ingredient")],-1)),G={class:"container"},K={class:"product"},W=["onClick"],Z=b(()=>e("strong",null,"Name :",-1)),ee=b(()=>e("strong",null,"unit :",-1)),te=b(()=>e("strong",null,"quantity :",-1)),ne=b(()=>e("strong",null,"pic(URL) :",-1)),oe=["onClick"],se=b(()=>e("p",{style:{width:"100%","font-size":"3rem"}},"+",-1)),ie=[se],ae={__name:"ingredient",setup(p){const i="http://localhost:8080";k("ingredient");const r=k([]);async function m(){const a=await f.fire({title:"Name",input:"text",showCancelButton:!0,confirmButtonText:"next"});if(!a.isConfirmed||a.isDismissed)return;const c=await f.fire({title:"unit",input:"text",showCancelButton:!0,confirmButtonText:"next"});if(!c.isConfirmed||c.isDismissed)return;const n=await f.fire({title:"quantity",input:"text",showCancelButton:!0,confirmButtonText:"next"});if(!n.isConfirmed||n.isDismissed)return;const o=await f.fire({title:"pic",input:"text",showCancelButton:!0,confirmButtonText:"Confirm"});if(!o.isConfirmed||o.isDismissed)return;const s=new Headers;s.append("Content-Type","application/json"),s.append("Authorization","Bearer "+localStorage.getItem("token"));const t=JSON.stringify({name:a.value,unit:c.value,quantity:n.value,pic:o.value});console.log(t),fetch(i+"/api/manager/ingredient/add",{method:"POST",headers:s,body:t,redirect:"follow"}).then(l=>l.json()).then(l=>{l.status=="Success"?(console.log(l),I(),v(l.message)):(console.log(l),g(l.message))}).catch(l=>console.error(l))}async function y(a){const{value:c}=await f.fire({title:"Select To Edit",input:"select",inputOptions:{name:"Name",unit:"Unit",quantity:"Quantity",pic:"Pic"},inputPlaceholder:"Select to Edit",showCancelButton:!0,inputValidator:n=>new Promise(o=>{n==""?o("You need to select SomeOne"):o()})});if(c){const{value:n}=await f.fire({title:"Edit "+c,input:"text",inputLabel:"Text",showCancelButton:!0,inputValidator:o=>{if(c=="quantity"){if(!/^\d+$/.test(o))return"Plase Enter Number Only";if(parseInt(o)>=1e4)return"Plase Enter Number 0 - 10000"}if(!o)return"You need to write something!"}});if(n){c=="name"?a.name=n:c=="unit"?a.unit=n:c=="quantity"?a.quantity=parseInt(n):c=="pic"&&(a.pic=n);const o=new Headers;o.append("Content-Type","application/json"),o.append("Authorization","Bearer "+localStorage.getItem("token"));const s=JSON.stringify({ingredientID:a.ingredientID,name:a.name,unit:a.unit,quantity:a.quantity,pic:a.pic});console.log(s),fetch(i+"/api/manager/ingredient/edit",{method:"POST",headers:o,body:s,redirect:"follow"}).then(t=>t.json()).then(t=>{t.status=="Success"?(console.log(t),v(t.message)):g(t.message)}).catch(t=>console.error(t))}}}function x(a){const c=new Headers;c.append("Content-Type","application/json"),c.append("Authorization","Bearer "+localStorage.getItem("token"));const n=JSON.stringify({ingredientID:a}),o={method:"POST",headers:c,body:n,redirect:"follow"};fetch(i+"/api/manager/ingredient/drop",o).then(s=>s.json()).then(s=>{console.log(s),s.status=="Success"?(v(s.message),I()):g("some Thing")}).catch(s=>console.error(s))}const I=()=>{const a=new Headers;a.append("Authorization","Bearer "+localStorage.getItem("token"));const n={method:"POST",headers:a,body:"",redirect:"follow"};fetch(i+"/api/manager/ingredient/list",n).then(o=>o.json()).then(o=>{o.status=="Success"?r.value=o.data:g("some Thing")}).catch(o=>console.error(o))};return H(()=>{I()}),(a,c)=>(d(),h(w,null,[Q,e("div",G,[(d(!0),h(w,null,B(r.value,n=>(d(),h("div",K,[e("button",{onClick:o=>x(n.ingredientID),style:{position:"absolute",top:"1rem",right:"1rem","background-color":"white","border-radius":"5px",width:"1rem",cursor:"pointer",color:"black",border:"none"}},"X",8,W),e("div",null,[e("p",null,u("ID : "+n.ingredientID),1),e("p",null,[Z,C(u(n.name),1)]),e("p",null,[ee,C(u(n.unit),1)]),e("p",null,[te,C(u(n.quantity),1)]),e("p",null,[ne,C(u(n.pic),1)]),e("button",{onClick:o=>y(n),class:"button-3",style:{"font-size":"18px"},role:"button"},"Edit",8,oe)])]))),256)),e("div",{onClick:m,class:"product push-product",style:{display:"flex","justify-content":"center","align-items":"center"}},ie)])],64))}},le=$(ae,[["__scopeId","data-v-64fb52cf"]]),q=p=>(T("data-v-b05a913f"),p=p(),D(),p),re={class:"header"},ce=q(()=>e("li",null,"Stock",-1)),ue={key:0,class:"container"},de=q(()=>e("ul",{class:"product-wrap first"},[e("li",{class:"product"},[e("p",null,"stockID"),e("p",null,"ingredientID"),e("p",null,"stock_quantity"),e("p",null,"status"),e("p",null,"date"),e("p",null,"expire_date")])],-1)),pe={class:"product"},me=["onClick"],he={key:1,class:"container"},ge=q(()=>e("ul",{class:"product-wrap first"},[e("li",{class:"product"},[e("p",null,"employeeID"),e("p",null,"stockID"),e("p",null,"type"),e("p",null,"quantity"),e("p",null,"comment"),e("p",null,"datetime")])],-1)),fe={class:"product"},_e={__name:"stock",setup(p){const i="http://localhost:8080",r=k("stock"),m=k([]),y=k([]);async function x(){f.fire({title:"Add Stock",html:'<label style="display:block">IngredientID</label><input id="ingredientID" class="swal2-input" placeholder="1"><br><label style="display:block">quantity</label><input id="stock_quantity" class="swal2-input" placeholder="10"><br><label style="display:block">expire_date</label><input id="expire_date" type="date" class="swal2-input" placeholder="2020-10-10"><br><label style="display:block">commet</label><input id="comment" class="swal2-input" placeholder="New Stock">',preConfirm:function(){return new Promise(function(n){n([document.getElementById("ingredientID").value,document.getElementById("stock_quantity").value,document.getElementById("expire_date").value,document.getElementById("comment").value])})},confirmButtonText:"Add"}).then(function(n){const o=new Headers;o.append("Content-Type","application/json"),o.append("Authorization","Bearer "+localStorage.getItem("token"));const s=JSON.stringify({ingredientID:n.value[0],stock_quantity:n.value[1],expire_date:n.value[2],comment:n.value[3]});console.log(s),fetch(i+"/api/manager/stock/add",{method:"POST",headers:o,body:s,redirect:"follow"}).then(t=>t.json()).then(t=>{t.status=="Success"?(console.log(t),a(),v(t.message)):(console.log(t),g(t.message))}).catch(t=>console.error(t))}).catch(n=>{console.log(n)})}async function I(n){if(!await J())return;const o=new Headers;o.append("Content-Type","application/json"),o.append("Authorization","Bearer "+localStorage.getItem("token"));const s=JSON.stringify({stockID:n}),t={method:"POST",headers:o,body:s,redirect:"follow"};fetch(i+"/api/manager/stock/drop",t).then(l=>l.json()).then(l=>{console.log(l),l.status=="Success"?(v(l.message),a()):g("some Thing")}).catch(l=>console.error(l))}const a=()=>{const n=new Headers;n.append("Authorization","Bearer "+localStorage.getItem("token"));const s={method:"POST",headers:n,body:"",redirect:"follow"};fetch(i+"/api/manager/stock/list",s).then(t=>t.json()).then(t=>{t.status=="Success"?m.value=t.data.filter((l,be)=>l.status!=null):g("some Thing")}).catch(t=>console.error(t))},c=()=>{const n=new Headers;n.append("Authorization","Bearer "+localStorage.getItem("token"));const s={method:"POST",headers:n,body:"",redirect:"follow"};fetch(i+"/api/manager/stock/history",s).then(t=>t.json()).then(t=>{t.status=="Success"?y.value=t.data:g(t.message)}).catch(t=>console.error(t))};return H(()=>{a(),c()}),(n,o)=>(d(),h(w,null,[e("ul",re,[ce,e("li",{onClick:o[0]||(o[0]=s=>r.value="stock")},"Stock"),e("li",{onClick:o[1]||(o[1]=s=>r.value="history")},"History")]),r.value=="stock"?(d(),h("div",ue,[de,(d(!0),h(w,null,B(m.value,(s,t)=>(d(),h("ul",{key:t,class:"product-wrap"},[e("li",pe,[e("p",null,u(s.stockID),1),e("p",null,u(s.ingredientID),1),e("p",null,u(s.stock_quantity),1),e("p",null,u(s.status),1),e("p",null,u(s.date.split("T")[0]),1),e("p",null,u(s.expire_date.split("T")[0]),1),e("p",{onClick:l=>I(s.stockID),class:"xxx"}," X ",8,me)])]))),128)),e("ul",{class:"product-wrap"},[e("li",{class:"product"},[e("button",{onClick:x,class:"button-3",role:"button"},"Add")])])])):_("",!0),r.value=="history"?(d(),h("div",he,[ge,(d(!0),h(w,null,B(y.value,(s,t)=>(d(),h("ul",{key:t,class:"product-wrap"},[e("li",fe,[e("p",null,u(s.employeeID),1),e("p",null,u(s.stockID),1),e("p",null,u(s.type),1),e("p",null,u(s.quantity),1),e("p",null,u(s.comment),1),e("p",null,u(s.datetime),1)])]))),128))])):_("",!0)],64))}},ye=$(_e,[["__scopeId","data-v-b05a913f"]]),ke={class:"container"},we={__name:"Manager",setup(p){E(),V();const i=k("home");return(r,m)=>(d(),h(w,null,[O(Y,{onClick:m[0]||(m[0]=()=>{console.log(i.value)}),onClickmenu:m[1]||(m[1]=y=>{i.value=y})}),e("div",ke,[i.value=="home"?(d(),S(N,{key:0})):_("",!0),i.value=="menu"?(d(),S(P,{key:1})):_("",!0),i.value=="myacc"?(d(),S(A,{key:2})):_("",!0),i.value=="ingredient"?(d(),S(le,{key:3})):_("",!0),i.value=="stock"?(d(),S(ye,{key:4})):_("",!0)])],64))}},$e=$(we,[["__scopeId","data-v-504f5a47"]]);export{$e as default};