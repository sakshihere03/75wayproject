const P=[
{id:1,n:"Void Oversized Tee",c:"Tees",p:1299,s:14,col:"#222",t:"tee"},
{id:2,n:"Acid Wash Tee",c:"Tees",p:1499,s:9,col:"#7a8a99",t:"tee"},
{id:3,n:"Neon Script Tee",c:"Tees",p:1199,s:3,col:"#c8f000",t:"tee"},
{id:4,n:"Shadow Heavy Hoodie",c:"Hoodies",p:3299,s:8,col:"#111",t:"hood"},
{id:5,n:"Ember Zip Hoodie",c:"Hoodies",p:3599,s:6,col:"#c2410c",t:"hood"},
{id:6,n:"Cloud Crewneck",c:"Hoodies",p:2899,s:12,col:"#d9d4c7",t:"hood"},
{id:7,n:"Cargo Utility Pants",c:"Bottoms",p:2799,s:10,col:"#4b5320",t:"pant"},
{id:8,n:"Wide Leg Denim",c:"Bottoms",p:3199,s:5,col:"#345c8a",t:"pant"},
{id:9,n:"Street Snapback",c:"Accessories",p:899,s:20,col:"#7c3aed",t:"cap"},
{id:10,n:"Logo Dad Cap",c:"Accessories",p:799,s:2,col:"#111",t:"cap"},
{id:11,n:"Chunky Runner Sneakers",c:"Shoes",p:4999,s:7,col:"#f2f2f2",t:"shoe"},
{id:12,n:"Midnight High-Tops",c:"Shoes",p:5499,s:4,col:"#1e1e1e",t:"shoe"}];
const SH={
tee:'<path d="M30 20 50 12Q60 24 70 12L90 20 102 46 88 52V100H32V52L18 46Z"/>',
hood:'<path d="M28 24 48 12Q60 26 72 12L92 24 108 70 92 76V102H28V76L12 70Z"/><ellipse cx="60" cy="18" rx="16" ry="9" fill="rgba(0,0,0,.25)"/><rect x="42" y="72" width="36" height="18" rx="4" fill="rgba(0,0,0,.2)"/>',
pant:'<path d="M35 12H85L92 108H66L60 46 54 108H28Z"/>',
cap:'<path d="M20 78Q20 30 60 30 100 30 100 78Z"/><path d="M60 78Q100 72 116 86 80 92 60 84Z" fill="rgba(0,0,0,.3)"/>',
shoe:'<path d="M12 84V48Q40 54 50 38L66 50Q94 56 108 78V92H12Z"/><rect x="12" y="88" width="96" height="9" rx="4" fill="rgba(0,0,0,.35)"/>'};
const svg=p=>`<svg viewBox="0 0 120 120" fill="${p.col}" stroke="rgba(0,0,0,.35)" stroke-width="1.5">${SH[p.t]}</svg>`;
const svgH=id=>svg(P.find(p=>p.id==id));
const pic=p=>S.img[p.id]?`<img src="${S.img[p.id]}" alt="${esc(p.n)}">`:`<img src="images/product-${p.id}.jpg" alt="${esc(p.n)}" onerror="this.outerHTML=svgH(${p.id})">`;
const $=id=>document.getElementById(id),R=n=>"₹"+n.toLocaleString("en-IN");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let S={stock:Object.fromEntries(P.map(p=>[p.id,p.s])),orders:[],user:null,users:{"admin@drip.com":{name:"Admin",pw:"admin123",admin:1}}},cart={},v="shop",cat="All",q="",busy=false,pay="card",tm;
try{const d=JSON.parse(localStorage.getItem("drip"));if(d)S=d}catch(e){}
S.img=S.img||{};
const save=()=>{try{localStorage.setItem("drip",JSON.stringify(S))}catch(e){}};
const toast=m=>{const t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(tm);tm=setTimeout(()=>t.style.display="none",1800)};
const go=x=>{v=x;render()};
function nav(){let h=`<button onclick="go('shop')">Shop</button>`;
if(S.user){h+=`<button onclick="go('orders')">My Orders</button>`;if(S.user.admin)h+=`<button onclick="go('stock')">Stock</button><button onclick="go('all')">All Orders</button>`;h+=`<span style="flex:1"></span><span class="mut">Hi, ${esc(S.user.name)}</span><button onclick="S.user=null;save();go('shop')">Logout</button>`}
else h+=`<span style="flex:1"></span><button onclick="go('login')">Login</button>`;$("nav").innerHTML=h;
$("cc").textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function render(){nav();const m=$("main");
if(v==="shop"){const cats=["All",...new Set(P.map(p=>p.c))];
let l=P.filter(p=>(cat==="All"||p.c===cat)&&p.n.toLowerCase().includes(q.toLowerCase()));
m.innerHTML=`<div class="hero"><h1>NEW DROP — FALL '26</h1><p>Streetwear built for the city. Free shipping over ₹2,999.</p></div>
<div class="bar"><input id="sq" placeholder="Search products…" value="${esc(q)}" oninput="q=this.value;render();const e=$('sq');e.focus();e.setSelectionRange(q.length,q.length)">${cats.map(c=>`<button class="chip ${c===cat?"on":""}" onclick="cat='${c}';render()">${c}</button>`).join("")}</div>
<div class="grid">${l.map(p=>{const s=S.stock[p.id];return`<div class="card"><div class="img">${pic(p)}</div><div class="info"><h3>${p.n}</h3><span class="mut">${p.c}</span>${s<=3&&s>0?`<span class="low">Only ${s} left!</span>`:""}<div class="row"><span class="price">${R(p.p)}</span><button class="pri" ${s?"":"disabled"} onclick="add(${p.id})">${s?"Add":"Sold out"}</button></div></div></div>`}).join("")||"<p>No products found.</p>"}</div>`}
else if(v==="login"){m.innerHTML=`<div class="box" style="margin:auto"><h2>Login / Sign up</h2><p class="mut">New email? An account is created automatically. Admin demo: admin@drip.com / admin123</p><label>Name (for sign up)</label><input id="ln"><label>Email</label><input id="le" type="email"><label>Password</label><input id="lp" type="password"><br><br><button class="pri" onclick="login()">Continue</button></div>`}
else if(v==="orders"||v==="all"){const o=v==="all"?S.orders:S.orders.filter(x=>S.user&&x.email===S.user.email);
m.innerHTML=`<h2>${v==="all"?"All Orders":"My Orders"}</h2><div class="scroll"><table><tr><th>Order</th><th>Date</th>${v==="all"?"<th>Customer</th>":""}<th>Items</th><th>Paid via</th><th>Total</th><th>Status</th></tr>${o.map(x=>`<tr><td>${x.id}</td><td>${x.date}</td>${v==="all"?`<td>${esc(x.email)}</td>`:""}<td>${x.items.map(i=>esc(i.n)+" ×"+i.q).join(", ")}</td><td>${x.method}</td><td>${R(x.total)}</td><td>${x.status}</td></tr>`).join("")||`<tr><td colspan="7">No orders yet.</td></tr>`}</table></div>`}
else if(v==="stock"){m.innerHTML=`<h2>Stock Management</h2><div class="scroll"><table><tr><th>Product</th><th>Category</th><th>Price</th><th>In stock</th><th>Adjust</th><th>Photo</th></tr>${P.map(p=>`<tr><td>${p.n}</td><td>${p.c}</td><td>${R(p.p)}</td><td>${S.stock[p.id]}</td><td><button onclick="adj(${p.id},-1)">−</button> <button onclick="adj(${p.id},5)">+5</button></td><td><span class="th">${pic(p)}</span> <label class="pri" style="display:inline-block;margin:0;padding:6px 10px;border-radius:6px;cursor:pointer;color:var(--accink);font-weight:600">Upload<input type="file" accept="image/*" hidden onchange="upl(${p.id},this)"></label>${S.img[p.id]?` <button onclick="delete S.img[${p.id}];save();render()">✕</button>`:""}</td></tr>`).join("")}</table></div>`}}
function login(){const e=$("le").value.trim().toLowerCase(),pw=$("lp").value,n=$("ln").value.trim();
if(!e.includes("@")||pw.length<4)return toast("Enter valid email and 4+ char password");
let u=S.users[e];if(u){if(u.pw!==pw)return toast("Wrong password")}else{u=S.users[e]={name:n||e.split("@")[0],pw}}
S.user={email:e,name:u.name,admin:u.admin};save();go("shop");toast("Welcome, "+u.name)}
function upl(id,inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,600/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*k;c.height=im.height*k;c.getContext("2d").drawImage(im,0,0,c.width,c.height);S.img[id]=c.toDataURL("image/jpeg",.8);save();render();toast("Photo updated")};im.onerror=()=>toast("Not a valid image");im.src=r.result};r.readAsDataURL(f)}
function adj(id,d){S.stock[id]=Math.max(0,S.stock[id]+d);save();render()}
function add(id){const s=S.stock[id];if((cart[id]||0)>=s)return toast("No more stock");cart[id]=(cart[id]||0)+1;toast("Added to cart");nav();if($("drawer").classList.contains("open"))cartUI()}
function chg(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]>S.stock[id])cart[id]=S.stock[id];if(cart[id]<=0)delete cart[id];cartUI();nav()}
const tot=()=>Object.entries(cart).reduce((a,[id,q])=>a+P.find(p=>p.id==id).p*q,0);
function openCart(){$("drawer").classList.add("open");cartUI()}
function closeAll(){$("drawer").classList.remove("open");$("modal").classList.remove("open")}
function cartUI(){const e=Object.entries(cart);let sub=tot(),ship=sub>2999||!sub?0:149;
$("cart").innerHTML=`<div class="row"><h2 style="margin:0">Your Cart</h2><button onclick="closeAll()">✕</button></div>`+(e.length?e.map(([id,q])=>{const p=P.find(x=>x.id==id);return`<div class="item"><div class="img">${pic(p)}</div><div style="flex:1"><b>${p.n}</b><div class="mut">${R(p.p)}</div></div><div class="qty"><button onclick="chg(${id},-1)">−</button> ${q} <button onclick="chg(${id},1)">+</button></div></div>`}).join("")+`<div class="row"><span>Subtotal</span><b>${R(sub)}</b></div><div class="row"><span>Shipping</span><b>${ship?R(ship):"Free"}</b></div><div class="row"><span>Total</span><b>${R(sub+ship)}</b></div><button class="pri" onclick="checkout()">Checkout</button>`:`<p class="mut">Cart is empty.</p>`)}
function checkout(){if(!S.user){closeAll();go("login");return toast("Please login to checkout")}
pay="card";payUI();$("drawer").classList.remove("open");$("modal").classList.add("open")}
function payUI(){const sub=tot(),t=sub+(sub>2999?0:149);
$("box").innerHTML=`<h2 style="margin-top:0">Payment <span class="mut">(demo — no real money)</span></h2><label>Shipping address</label><input id="ad" placeholder="House no, street, city">
<div class="tabs" style="margin-top:12px"><button class="chip ${pay==="card"?"on":""}" onclick="pay='card';payUI()">💳 Card</button><button class="chip ${pay==="qr"?"on":""}" onclick="pay='qr';payUI()">📱 QR / UPI</button></div>`+
(pay==="card"?`<label>Card number (try 4242 4242 4242 4242)</label><input id="cn" maxlength="19" placeholder="0000 0000 0000 0000" oninput="this.value=this.value.replace(/\\D/g,'').replace(/(.{4})/g,'$1 ').trim()"><div class="row"><div><label>Expiry</label><input id="ce" placeholder="MM/YY" maxlength="5"></div><div><label>CVV</label><input id="cv" maxlength="3" type="password"></div></div><br><button class="pri" style="width:100%" onclick="payCard()">Pay ${R(t)}</button>`
:`<p class="mut">Scan this fake QR with any imaginary app, then confirm.</p><canvas id="qr" width="25" height="25"></canvas><button class="pri" style="width:100%" onclick="payQR()">I've scanned & paid ${R(t)}</button>`);
if(pay==="qr")drawQR()}
function drawQR(){const c=$("qr"),x=c.getContext("2d");let s=Date.now()%9973;const r=()=>(s=s*16807%2147483647)/2147483647;
x.fillStyle="#fff";x.fillRect(0,0,25,25);x.fillStyle="#000";
for(let i=0;i<25;i++)for(let j=0;j<25;j++)if(r()>.5)x.fillRect(i,j,1,1);
[[0,0],[18,0],[0,18]].forEach(([a,b])=>{x.fillStyle="#fff";x.fillRect(a-1,b-1,9,9);x.fillStyle="#000";x.fillRect(a,b,7,7);x.fillStyle="#fff";x.fillRect(a+1,b+1,5,5);x.fillStyle="#000";x.fillRect(a+2,b+2,3,3)})}
function payCard(){const n=$("cn").value.replace(/\D/g,""),e=$("ce").value,c=$("cv").value;
if(!$("ad").value.trim())return toast("Enter shipping address");
if(n.length!==16)return toast("Card number must be 16 digits");
if(!/^(0[1-9]|1[0-2])\/\d\d$/.test(e))return toast("Expiry format MM/YY");
if(c.length!==3)return toast("Enter 3-digit CVV");
if(n==="4000000000000002")return fail();process("Card •••• "+n.slice(-4))}
function payQR(){if(!$("ad").value.trim())return toast("Enter shipping address");process("QR / UPI")}
function fail(){toast("Card declined (demo)")}
function process(method){const ad=$("ad").value.trim();busy=true;$("box").innerHTML=`<div class="ok"><div class="spin"></div><p>Processing payment…</p></div>`;
setTimeout(()=>{const items=Object.entries(cart).map(([id,q])=>({n:P.find(p=>p.id==id).n,q:+q}));
Object.entries(cart).forEach(([id,q])=>S.stock[id]-=q);
const sub=tot(),o={id:"ORD"+Math.floor(10000+Math.random()*89999),date:new Date().toLocaleDateString("en-IN"),email:S.user.email,items,method,total:sub+(sub>2999?0:149),status:"Paid",address:ad};
S.orders.unshift(o);save();cart={};busy=false;
$("box").innerHTML=`<div class="ok"><div class="tick">✅</div><h2>Payment successful!</h2><p>Order <b>${o.id}</b> · ${R(o.total)}</p><p class="mut">Shipping to ${esc(ad)}</p><button class="pri" onclick="closeAll();go('orders')">View my orders</button></div>`;render()},1600)}
render();
