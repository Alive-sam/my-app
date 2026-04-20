import { useState, useEffect, useRef } from "react";

const C = {
  sky: "#22D3EE", pink: "#F472B6", cyan: "#06FFF0",
  navy: "#060F1E", dark: "#0B1729",
  card: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.1)",
  text: "#FFFFFF", sub: "rgba(255,255,255,0.52)", gold: "#FBBF24",
  grad1: "linear-gradient(135deg,#22D3EE,#06FFF0)",
  grad2: "linear-gradient(135deg,#F472B6,#C026D3)",
  grad3: "linear-gradient(135deg,#22D3EE,#F472B6)",
  gradBg: "linear-gradient(160deg,#060F1E 0%,#0B1F35 50%,#070D1A 100%)",
};
const S = {
  SPLASH:"splash",LOGIN:"login",OTP:"otp",USER_INFO:"userinfo",
  HOME:"home",BEACHES:"beaches",BEACH:"beach",ACTIVITY:"activity",
  HOTELS:"hotels",HOTEL:"hotel",PAYMENT:"payment",SUCCESS:"success",
  PLANNER:"planner",PROFILE:"profile",SUPPORT:"support",
};
const beaches = [
  { id:1, name:"Mandvi Beach", loc:"Kutch, Gujarat", dist:420, tag:"Most Popular", tagC:"#22D3EE", rating:4.7, weather:"29°C ☀️", bestTime:"Oct–Mar",
    famousFor:"Windmills, Vijay Vilas Palace, camel rides",
    desc:"One of Gujarat's most iconic beaches — white sand, spinning windmills and the palatial Vijay Vilas estate just minutes away. Sunsets here are legendary.",
    img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    activities:[
      {name:"Camel Riding",icon:"🐪",timing:"6 AM – 7 PM",price:"₹200/person",duration:"30 min",rating:4.6,canBook:true,
       reviews:[{u:"Rahul M.",r:5,c:"Best camel experience! So scenic.",d:"Jan 2025"},{u:"Sneha P.",r:4,c:"Fun for families, a bit crowded.",d:"Dec 2024"},{u:"Amir K.",r:5,c:"Worth every rupee!",d:"Nov 2024"}]},
      {name:"Wind Surfing",icon:"🏄",timing:"7 AM – 6 PM",price:"₹800/person",duration:"1 hour",rating:4.4,canBook:true,
       reviews:[{u:"Dev S.",r:4,c:"Instructor was very helpful.",d:"Feb 2025"},{u:"Pooja R.",r:5,c:"Thrilling! Loved it.",d:"Jan 2025"}]},
      {name:"Palace Visit",icon:"🏰",timing:"9 AM – 5 PM",price:"₹100/person",duration:"2 hours",rating:4.8,canBook:false,
       reviews:[{u:"Meera T.",r:5,c:"Stunning architecture!",d:"Mar 2025"},{u:"Vishal B.",r:5,c:"Worth every minute.",d:"Feb 2025"}]},
      {name:"Boat Ride",icon:"⛵",timing:"8 AM – 6 PM",price:"₹300/person",duration:"45 min",rating:4.3,canBook:true,
       reviews:[{u:"Riya G.",r:4,c:"Peaceful and beautiful.",d:"Jan 2025"}]},
    ]},
  { id:2, name:"Dwarka Beach", loc:"Devbhoomi Dwarka, Gujarat", dist:450, tag:"Spiritual", tagC:"#F472B6", rating:4.8, weather:"27°C 🌤️", bestTime:"Nov–Feb",
    famousFor:"Dwarkadhish Temple, first Jyotirlinga, dolphins",
    desc:"A sacred coastline shadowed by the ancient Dwarkadhish Temple. The sea glows golden at dusk while temple bells echo across the shore.",
    img:"https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
    activities:[
      {name:"Temple Darshan",icon:"🛕",timing:"6 AM–12 PM, 5–9 PM",price:"Free",duration:"1–2 hours",rating:4.9,canBook:false,
       reviews:[{u:"Nita V.",r:5,c:"Spiritual bliss. Must visit.",d:"Jan 2025"},{u:"Kamal J.",r:5,c:"Divine experience.",d:"Dec 2024"}]},
      {name:"Dolphin Watching",icon:"🐬",timing:"6 AM – 9 AM",price:"₹500/person",duration:"2 hours",rating:4.7,canBook:true,
       reviews:[{u:"Priya S.",r:5,c:"Saw 8 dolphins! Amazing.",d:"Feb 2025"},{u:"Suresh M.",r:4,c:"Great guide. Early morning is best.",d:"Jan 2025"}]},
      {name:"Snorkeling",icon:"🤿",timing:"9 AM – 5 PM",price:"₹1200/person",duration:"1.5 hours",rating:4.5,canBook:true,
       reviews:[{u:"Ankita R.",r:5,c:"Crystal clear water!",d:"Nov 2024"}]},
    ]},
  { id:3, name:"Diu Beach", loc:"Diu (Union Territory)", dist:368, tag:"Adventure", tagC:"#06FFF0", rating:4.6, weather:"30°C ☀️", bestTime:"Oct–Mar",
    famousFor:"Portuguese forts, Nagoa Beach, water sports",
    desc:"A former Portuguese colony with cobblestone lanes and crystal-clear Nagoa Beach. The best water sports hub in western India.",
    img:"https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80",
    activities:[
      {name:"Scuba Diving",icon:"🤿",timing:"8 AM – 4 PM",price:"₹2500/person",duration:"3 hours",rating:4.8,canBook:true,
       reviews:[{u:"Vikram A.",r:5,c:"Incredible underwater world.",d:"Mar 2025"},{u:"Sara N.",r:5,c:"Professional instructors.",d:"Feb 2025"}]},
      {name:"Parasailing",icon:"🪂",timing:"9 AM – 5 PM",price:"₹1500/person",duration:"20 min",rating:4.7,canBook:true,
       reviews:[{u:"Rohit D.",r:5,c:"Best experience of my life!",d:"Jan 2025"},{u:"Ananya K.",r:4,c:"Scary but worth it!",d:"Dec 2024"}]},
      {name:"Fort Visit",icon:"🏰",timing:"8 AM – 6 PM",price:"₹30/person",duration:"2 hours",rating:4.5,canBook:false,
       reviews:[{u:"Harsh P.",r:5,c:"Stunning colonial architecture.",d:"Feb 2025"}]},
      {name:"Jet Skiing",icon:"🏍️",timing:"9 AM – 5 PM",price:"₹800/person",duration:"15 min",rating:4.4,canBook:true,
       reviews:[{u:"Mansi V.",r:4,c:"Fast and so much fun!",d:"Jan 2025"}]},
    ]},
  { id:4, name:"Somnath Beach", loc:"Gir Somnath, Gujarat", dist:402, tag:"Sacred", tagC:"#FBBF24", rating:4.9, weather:"28°C ☀️", bestTime:"Oct–Feb",
    famousFor:"Somnath Jyotirlinga, ancient history, evening aarti",
    desc:"Where the ancient Somnath temple meets the Arabian Sea. Watching waves crash at the foot of the first Jyotirlinga during aarti moves the soul.",
    img:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80",
    activities:[
      {name:"Evening Aarti",icon:"🪔",timing:"7:00 PM daily",price:"Free",duration:"45 min",rating:5.0,canBook:false,
       reviews:[{u:"Kavita S.",r:5,c:"Goosebumps. Truly divine.",d:"Feb 2025"},{u:"Mohan L.",r:5,c:"Life-changing experience.",d:"Jan 2025"}]},
      {name:"Boat Safari",icon:"⛵",timing:"7 AM – 6 PM",price:"₹250/person",duration:"1 hour",rating:4.4,canBook:true,
       reviews:[{u:"Tina R.",r:4,c:"Great views of the temple from sea.",d:"Jan 2025"}]},
      {name:"Sound & Light Show",icon:"💡",timing:"8 PM daily",price:"₹50/person",duration:"1 hour",rating:4.7,canBook:true,
       reviews:[{u:"Ajay M.",r:5,c:"History comes alive!",d:"Dec 2024"}]},
    ]},
  { id:5, name:"Tithal Beach", loc:"Valsad, Gujarat", dist:340, tag:"Hidden Gem", tagC:"#A78BFA", rating:4.4, weather:"31°C 🌥️", bestTime:"Nov–Jan",
    famousFor:"Rare black sand, Swaminarayan Temple, serene vibe",
    desc:"Gujarat's best-kept secret — a beach with rare black volcanic sand stretching miles in peaceful solitude. The Swaminarayan mandir glows beautifully at dusk.",
    img:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80",
    activities:[
      {name:"Black Sand Walk",icon:"🚶",timing:"All day",price:"Free",duration:"1 hour",rating:4.6,canBook:false,
       reviews:[{u:"Nisha G.",r:5,c:"Unique and incredibly peaceful.",d:"Jan 2025"}]},
      {name:"Temple Visit",icon:"🛕",timing:"6 AM – 8 PM",price:"Free",duration:"45 min",rating:4.5,canBook:false,
       reviews:[{u:"Ravi K.",r:5,c:"Beautiful architecture.",d:"Dec 2024"}]},
      {name:"Local Seafood Tour",icon:"🦐",timing:"11 AM – 3 PM",price:"₹400/person",duration:"2 hours",rating:4.3,canBook:true,
       reviews:[{u:"Hina P.",r:4,c:"Fresh catch, great flavors.",d:"Nov 2024"}]},
    ]},
  { id:6, name:"Gopnath Beach", loc:"Bhavnagar, Gujarat", dist:220, tag:"Offbeat", tagC:"#34D399", rating:4.3, weather:"28°C ☀️", bestTime:"Oct–Feb",
    famousFor:"Rocky coastline, ancient cave temple, zero light pollution",
    desc:"A raw, unspoiled stretch with dramatic rock formations and the ancient Gopnath Mahadev cave temple. Night skies here are absolutely breathtaking.",
    img:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
    activities:[
      {name:"Stargazing Night",icon:"🌟",timing:"8 PM – 11 PM",price:"₹300/person",duration:"3 hours",rating:4.8,canBook:true,
       reviews:[{u:"Aryan S.",r:5,c:"Best stargazing in Gujarat!",d:"Jan 2025"},{u:"Jiya M.",r:5,c:"Milky way clearly visible!",d:"Dec 2024"}]},
      {name:"Cave Temple Trek",icon:"⛪",timing:"7 AM – 5 PM",price:"Free",duration:"2 hours",rating:4.5,canBook:false,
       reviews:[{u:"Kiran T.",r:4,c:"Spiritual and very scenic.",d:"Nov 2024"}]},
      {name:"Bird Watching",icon:"🦅",timing:"6 AM – 9 AM",price:"₹150/person",duration:"2 hours",rating:4.3,canBook:true,
       reviews:[{u:"Deepa R.",r:4,c:"Over 30 species spotted!",d:"Feb 2025"}]},
    ]},
];
const hotelData = {
  1:[{id:1,name:"The Windmill Resort & Spa",stars:5,price:4500,rating:4.8,tag:"Luxury",amenities:["🏊 Pool","📶 WiFi","💆 Spa","🍽️ Restaurant","🍸 Bar","🏋️ Gym"]},{id:2,name:"Kutch Heritage Haveli",stars:4,price:2800,rating:4.5,tag:"Heritage",amenities:["📶 WiFi","🍽️ Restaurant","❄️ AC","🅿️ Parking"]},{id:3,name:"Sea Breeze Inn",stars:3,price:1500,rating:4.2,tag:"Budget",amenities:["📶 WiFi","❄️ AC","🥐 Breakfast"]}],
  2:[{id:4,name:"Dwarkadhish Grand Resort",stars:5,price:5200,rating:4.9,tag:"Premium",amenities:["🏊 Pool","📶 WiFi","🛕 Temple View","💆 Spa","🥗 Veg Restaurant"]},{id:5,name:"Gomti Riverside Stay",stars:3,price:1200,rating:4.1,tag:"Budget",amenities:["📶 WiFi","❄️ AC","🛕 Darshan Service"]}],
  3:[{id:6,name:"Nagoa Beach Resort",stars:5,price:6000,rating:4.9,tag:"Luxury",amenities:["🏖️ Private Beach","🏊 Pool","💆 Spa","🤿 Dive Center","🍸 Bar"]},{id:7,name:"Diu Fort View Hotel",stars:4,price:3200,rating:4.6,tag:"Scenic",amenities:["🏊 Pool","📶 WiFi","🌊 Sea View","🏄 Water Sports"]}],
  4:[{id:8,name:"Somnath Sea Palace",stars:4,price:2500,rating:4.7,tag:"Spiritual",amenities:["🛕 Temple View","📶 WiFi","🥗 Pure Veg","❄️ AC"]},{id:9,name:"Jyotirlinga Heritage Inn",stars:3,price:1800,rating:4.3,tag:"Value",amenities:["🌊 Sea View","📶 WiFi","🍽️ Restaurant"]}],
  5:[{id:10,name:"Tithal Beach House",stars:3,price:1600,rating:4.2,tag:"Budget",amenities:["🏖️ Beach Access","📶 WiFi","🍽️ Restaurant"]}],
  6:[{id:11,name:"Gopnath Nature Retreat",stars:3,price:2000,rating:4.5,tag:"Eco",amenities:["🌿 Nature","🔥 Bonfire","🍽️ Meals","🌟 Stargazing"]}],
};

export default function App() {
  const [screen, setScreen] = useState(S.SPLASH);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [uName, setUName] = useState("");
  const [uAge, setUAge] = useState("");
  const [locOk, setLocOk] = useState(false);
  const [user, setUser] = useState(null);
  const [beach, setBeach] = useState(null);
  const [act, setAct] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [pay, setPay] = useState("upi");
  const [plan, setPlan] = useState([]);
  const [tab, setTab] = useState("home");
  const refs = useRef([]);

  useEffect(() => { const t = setTimeout(() => setScreen(S.LOGIN), 2500); return () => clearTimeout(t); }, []);

  const nav = s => setScreen(s);
  const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)) : 1;
  const total = hotel ? hotel.price * nights * Math.max(1, guests) : 0;
  const grand = Math.round(total * 1.12);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Nunito:wght@400;600;700;800&display=swap');
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pop{0%{transform:scale(0);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
    @keyframes pulse{0%,100%{opacity:.25;transform:translate(-50%,-50%) scale(1)}50%{opacity:.6;transform:translate(-50%,-50%) scale(1.06)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px #22D3EE33}50%{box-shadow:0 0 50px #22D3EEaa}}
    ::-webkit-scrollbar{display:none} *{box-sizing:border-box}
    input[type=date]{color-scheme:dark} input::placeholder{color:rgba(255,255,255,.3)}
  `;
  const wrap = { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"linear-gradient(135deg,#02080F,#071422,#020B14)", padding:16, fontFamily:"'Outfit',sans-serif" };
  const ph = { width:390, height:844, background:C.navy, borderRadius:48, overflow:"hidden", position:"relative", boxShadow:"0 60px 160px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.07),0 0 100px rgba(34,211,238,.06)" };
  const scr = { width:"100%", height:"100%", display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:"'Outfit',sans-serif" };
  const scroll = { flex:1, overflowY:"auto", overflowX:"hidden" };

  const Btn = ({children, onClick, bg, color, style={}}) => (
    <button onClick={onClick} style={{width:"100%",padding:"16px",background:bg||C.grad1,border:"none",borderRadius:20,color:color||C.navy,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",letterSpacing:.3,...style}}>{children}</button>
  );
  const SB = () => (
    <div style={{height:44,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 24px",flexShrink:0}}>
      <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>9:41</span>
      <div style={{display:"flex",gap:5,fontSize:12,color:"#fff"}}><span>▲▲▲</span><span>🔋</span></div>
    </div>
  );
  const Nav = () => (
    <div style={{height:80,background:"rgba(5,12,24,.97)",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"space-around",padding:"0 4px 10px",flexShrink:0,backdropFilter:"blur(24px)"}}>
      {[{i:"🏠",l:"Home",t:"home",s:S.HOME},{i:"🏖️",l:"Beaches",t:"beaches",s:S.BEACHES},{i:"📅",l:"Planner",t:"planner",s:S.PLANNER},{i:"💬",l:"Support",t:"support",s:S.SUPPORT},{i:"👤",l:"Profile",t:"profile",s:S.PROFILE}].map(x => (
        <button key={x.t} onClick={()=>{setTab(x.t);nav(x.s);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",padding:"6px 8px",position:"relative"}}>
          <span style={{fontSize:20}}>{x.i}</span>
          <span style={{fontSize:9,fontFamily:"'Nunito',sans-serif",color:tab===x.t?C.sky:"rgba(255,255,255,.35)",fontWeight:tab===x.t?800:400,transition:"color .2s"}}>{x.l}</span>
          {tab===x.t && <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:22,height:2.5,borderRadius:2,background:C.grad1}}/>}
        </button>
      ))}
    </div>
  );

  // ── SPLASH ──────────────────────────────────────────────────────────────
  if (screen === S.SPLASH) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={{width:"100%",height:"100%",background:"linear-gradient(160deg,#030A16,#071828,#030A16)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18,position:"relative",overflow:"hidden"}}>
          {[...Array(4)].map((_,i)=><div key={i} style={{position:"absolute",borderRadius:"50%",border:`1px solid ${i%2?C.pink:C.sky}1A`,width:150+i*100,height:150+i*100,animation:`pulse ${2+i*.6}s ease-in-out infinite`,top:"50%",left:"50%",animationDelay:`${i*.35}s`}}/>)}
          <div style={{width:96,height:96,borderRadius:32,background:"linear-gradient(135deg,rgba(34,211,238,.15),rgba(244,114,182,.15))",border:"1px solid rgba(34,211,238,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,animation:"fadeUp .8s ease",backdropFilter:"blur(16px)",boxShadow:"0 0 40px rgba(34,211,238,.15)"}}>🌊</div>
          <div style={{textAlign:"center",animation:"fadeUp 1s ease .2s both"}}>
            <div style={{fontSize:10,letterSpacing:6,color:C.sky,fontFamily:"'Nunito',sans-serif",marginBottom:8,textTransform:"uppercase",fontWeight:800}}>Global Coastal Platform</div>
            <div style={{fontSize:26,fontWeight:900,color:"#fff",lineHeight:1.15}}>Coastal Management</div>
            <div style={{fontSize:26,fontWeight:900,lineHeight:1.15,background:C.grad3,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>& Planner Platform</div>
          </div>
          <div style={{fontSize:12,color:C.sub,fontFamily:"'Nunito',sans-serif",animation:"fadeUp 1s ease .5s both",textAlign:"center",lineHeight:1.7}}>Discover beaches · Book hotels · Plan trips<br/><span style={{color:C.sky,fontSize:11}}>Gujarat · India · World 🌍</span></div>
          <div style={{display:"flex",gap:6,animation:"fadeUp 1s ease 1s both"}}>{[...Array(3)].map((_,i)=><div key={i} style={{width:i===1?24:7,height:7,borderRadius:4,background:i===1?C.sky:"rgba(255,255,255,.2)"}}/>)}</div>
          <div style={{position:"absolute",bottom:22,fontSize:10,color:"rgba(255,255,255,.22)",fontFamily:"'Nunito',sans-serif",letterSpacing:2,fontWeight:700}}>MADE WITH ❤️ IN INDIA</div>
        </div>
      </div>
    </div>
  );

  // ── LOGIN ────────────────────────────────────────────────────────────────
  if (screen === S.LOGIN) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={{...scr,background:C.gradBg}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"32px 26px"}}>
            <div style={{textAlign:"center",marginBottom:34}}>
              <div style={{fontSize:64,marginBottom:12,animation:"fadeUp .6s ease"}}>🌊</div>
              <div style={{fontSize:26,fontWeight:900,color:"#fff",animation:"fadeUp .7s ease .1s both"}}>Welcome!</div>
              <div style={{fontSize:13,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:6,animation:"fadeUp .7s ease .2s both"}}>Enter your mobile number to get started</div>
            </div>
            <div style={{animation:"fadeUp .7s ease .3s both"}}>
              <div style={{fontSize:10,color:C.sky,fontFamily:"'Nunito',sans-serif",fontWeight:800,marginBottom:8,letterSpacing:1.5}}>MOBILE NUMBER</div>
              <div style={{display:"flex",gap:9,marginBottom:20}}>
                <div style={{background:"rgba(34,211,238,.1)",border:`1px solid ${C.sky}44`,borderRadius:16,padding:"13px 12px",color:"#fff",fontWeight:800,fontSize:13,fontFamily:"'Outfit',sans-serif",flexShrink:0,display:"flex",alignItems:"center",gap:5}}>🇮🇳 +91</div>
                <input value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="9876543210" type="tel" style={{flex:1,background:"rgba(255,255,255,.06)",border:`1px solid ${phone.length===10?C.sky+"66":"rgba(255,255,255,.12)"}`,borderRadius:16,padding:"13px 15px",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Outfit',sans-serif",outline:"none",transition:"border .2s"}}/>
              </div>
              <Btn onClick={()=>{if(phone.length===10)nav(S.OTP);}} bg={phone.length===10?C.grad3:"rgba(255,255,255,.06)"} color={phone.length===10?"#fff":"rgba(255,255,255,.25)"}>Send OTP →</Btn>
              <div style={{textAlign:"center",marginTop:16,fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>By continuing you agree to our <span style={{color:C.sky,cursor:"pointer"}}>Terms</span> & <span style={{color:C.pink,cursor:"pointer"}}>Privacy Policy</span></div>
            </div>
          </div>
          <div style={{padding:"12px 26px 28px",textAlign:"center"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,.18)",fontFamily:"'Nunito',sans-serif",letterSpacing:2,fontWeight:700}}>MADE WITH ❤️ IN INDIA</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── OTP ──────────────────────────────────────────────────────────────────
  if (screen === S.OTP) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={{...scr,background:C.gradBg}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"28px 26px"}}>
            <button onClick={()=>nav(S.LOGIN)} style={{alignSelf:"flex-start",background:"rgba(255,255,255,.07)",border:"none",borderRadius:13,padding:"9px 15px",color:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif",marginBottom:28}}>← Back</button>
            <div style={{textAlign:"center",marginBottom:32}}>
              <div style={{fontSize:60,marginBottom:12}}>📱</div>
              <div style={{fontSize:23,fontWeight:900,color:"#fff"}}>Verify OTP</div>
              <div style={{fontSize:13,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:8,lineHeight:1.6}}>6-digit code sent to<br/><span style={{color:C.sky,fontWeight:800}}>+91 {phone}</span></div>
            </div>
            <div style={{display:"flex",gap:9,justifyContent:"center",marginBottom:24}}>
              {otp.map((d,i)=>(
                <input key={i} ref={el=>refs.current[i]=el} value={d} maxLength={1} type="tel"
                  onChange={e=>{const v=e.target.value.replace(/\D/g,"");const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)refs.current[i+1]?.focus();}}
                  onKeyDown={e=>{if(e.key==="Backspace"&&!d&&i>0)refs.current[i-1]?.focus();}}
                  style={{width:46,height:56,textAlign:"center",background:d?"rgba(34,211,238,.12)":"rgba(255,255,255,.06)",border:`2px solid ${d?C.sky:"rgba(255,255,255,.1)"}`,borderRadius:16,color:"#fff",fontSize:22,fontWeight:800,fontFamily:"'Outfit',sans-serif",outline:"none",transition:"all .2s"}}
                />
              ))}
            </div>
            <Btn onClick={()=>{if(otp.join("").length===6)nav(S.USER_INFO);}} bg={otp.join("").length===6?C.grad1:"rgba(255,255,255,.07)"} color={otp.join("").length===6?C.navy:"rgba(255,255,255,.25)"}>Verify & Continue ✓</Btn>
            <div style={{textAlign:"center",marginTop:16,fontSize:12,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>Didn't get it? <span style={{color:C.pink,cursor:"pointer",fontWeight:800}}>Resend in 30s</span></div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── USER INFO ────────────────────────────────────────────────────────────
  if (screen === S.USER_INFO) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={{...scr,background:C.gradBg}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"28px 26px"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:56,marginBottom:12}}>👤</div>
              <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>Tell us about you</div>
              <div style={{fontSize:12,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:7}}>Personalise your coastal experience</div>
            </div>
            {[{label:"YOUR NAME",ph:"e.g. Aryan Shah",val:uName,set:setUName,type:"text"},{label:"YOUR AGE",ph:"e.g. 25",val:uAge,set:setUAge,type:"number"}].map(f=>(
              <div key={f.label} style={{marginBottom:14}}>
                <div style={{fontSize:10,color:C.sky,fontFamily:"'Nunito',sans-serif",fontWeight:800,marginBottom:7,letterSpacing:1.5}}>{f.label}</div>
                <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} type={f.type} style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${f.val?C.sky+"55":"rgba(255,255,255,.12)"}`,borderRadius:16,padding:"13px 15px",color:"#fff",fontSize:15,fontFamily:"'Outfit',sans-serif",outline:"none",transition:"border .2s"}}/>
              </div>
            ))}
            <div style={{background:"rgba(34,211,238,.07)",border:`1px solid ${C.sky}2F`,borderRadius:18,padding:15,marginBottom:22,marginTop:4}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:26,flexShrink:0}}>📍</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>Allow Location Access</div>
                  <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:4,lineHeight:1.55}}>We'll show exact distances from your location to each beach.</div>
                  <button onClick={()=>setLocOk(!locOk)} style={{marginTop:10,background:locOk?C.grad1:"rgba(255,255,255,.07)",border:"none",borderRadius:11,padding:"7px 16px",color:locOk?C.navy:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all .2s"}}>{locOk?"✅ Location Granted":"Allow Location"}</button>
                </div>
              </div>
            </div>
            <Btn onClick={()=>{if(uName&&uAge){setUser({name:uName,age:uAge,phone,loc:locOk});setTab("home");nav(S.HOME);}}} bg={uName&&uAge?C.grad3:"rgba(255,255,255,.07)"} color={uName&&uAge?"#fff":"rgba(255,255,255,.25)"}>🌊 Start Exploring</Btn>
          </div>
        </div>
      </div>
    </div>
  );

  // ── HOME ─────────────────────────────────────────────────────────────────
  if (screen === S.HOME) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
            <SB/>
            <div style={{padding:"2px 20px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,letterSpacing:3,color:C.sky,fontFamily:"'Nunito',sans-serif",textTransform:"uppercase",marginBottom:3,fontWeight:800}}>👋 Welcome back</div>
                  <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>{user?.name||"Explorer"}</div>
                </div>
                <div style={{width:46,height:46,borderRadius:23,background:C.grad3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,animation:"glow 3s infinite",flexShrink:0}}>😎</div>
              </div>
            </div>
          </div>
          <div style={scroll}>
            <div style={{padding:"12px 18px 20px"}}>
              {/* Global expansion banner */}
              <div style={{background:"linear-gradient(135deg,rgba(34,211,238,.1),rgba(244,114,182,.1))",border:"1px solid rgba(34,211,238,.18)",borderRadius:20,padding:"13px 15px",marginBottom:16,display:"flex",gap:11,alignItems:"center"}}>
                <div style={{fontSize:30}}>🌍</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:800,color:"#fff"}}>Expanding Globally 🚀</div>
                  <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:2}}>Currently: Gujarat · Next: All India → World</div>
                  <div style={{display:"flex",gap:5,marginTop:6}}>
                    {[{t:"Gujarat ✅",c:C.sky},{t:"India 🔜",c:C.pink},{t:"World 🌐",c:"#A78BFA"}].map(x=><span key={x.t} style={{background:"rgba(255,255,255,.05)",borderRadius:8,padding:"2px 8px",fontSize:9,color:x.c,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>{x.t}</span>)}
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:18}}>
                {[{v:"6",l:"Beaches",i:"🏖️",g:C.grad1},{v:"50+",l:"Hotels",i:"🏨",g:C.grad2},{v:"4.7★",l:"Rating",i:"⭐",g:"linear-gradient(135deg,#FBBF24,#F59E0B)"}].map(s=>(
                  <div key={s.l} style={{background:C.card,borderRadius:18,padding:"13px 8px",textAlign:"center",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:20,marginBottom:3}}>{s.i}</div>
                    <div style={{fontSize:17,fontWeight:900,background:s.g,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.v}</div>
                    <div style={{fontSize:9,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Featured */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
                <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Featured Beaches</div>
                <button onClick={()=>{setTab("beaches");nav(S.BEACHES);}} style={{background:"none",border:"none",color:C.sky,fontSize:12,fontFamily:"'Nunito',sans-serif",cursor:"pointer",fontWeight:800}}>See All →</button>
              </div>
              {/* Hero card */}
              {beaches.slice(0,1).map(b=>(
                <div key={b.id} onClick={()=>{setBeach(b);nav(S.BEACH);}} style={{borderRadius:24,overflow:"hidden",cursor:"pointer",marginBottom:14,boxShadow:`0 8px 32px ${b.tagC}22`}}>
                  <div style={{height:175,position:"relative",overflow:"hidden"}}>
                    <img src={b.img} alt={b.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.background=b.tagC+"33"}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 25%,rgba(6,15,30,.9))"}}/>
                    <div style={{position:"absolute",top:12,right:12,background:b.tagC,borderRadius:20,padding:"3px 10px",fontSize:10,color:C.navy,fontFamily:"'Nunito',sans-serif",fontWeight:800}}>{b.tag}</div>
                    <div style={{position:"absolute",bottom:12,left:14}}>
                      <div style={{fontSize:17,fontWeight:900,color:"#fff"}}>{b.name}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.65)",fontFamily:"'Nunito',sans-serif"}}>📍 {b.loc}</div>
                    </div>
                    <div style={{position:"absolute",bottom:14,right:14,fontSize:13,color:C.gold,fontWeight:800}}>⭐ {b.rating}</div>
                  </div>
                  <div style={{background:"rgba(255,255,255,.04)",padding:"10px 13px",display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontSize:11,color:C.sky,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>🚗 {b.dist} km away</div>
                    <div style={{fontSize:11,color:C.pink,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>{b.weather}</div>
                  </div>
                </div>
              ))}
              {beaches.slice(1).map(b=>(
                <div key={b.id} onClick={()=>{setBeach(b);nav(S.BEACH);}} style={{background:C.card,borderRadius:18,padding:12,display:"flex",gap:12,cursor:"pointer",border:`1px solid ${C.border}`,marginBottom:9,alignItems:"center"}}>
                  <div style={{width:56,height:56,borderRadius:16,overflow:"hidden",flexShrink:0}}>
                    <img src={b.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.target.style.background=b.tagC+"33";}}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{b.name}</div>
                      <div style={{fontSize:12,color:C.gold,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>⭐ {b.rating}</div>
                    </div>
                    <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:2}}>{b.loc}</div>
                    <div style={{fontSize:10,color:C.sky,fontFamily:"'Nunito',sans-serif",marginTop:2}}>🚗 {b.dist} km</div>
                  </div>
                  <span style={{fontSize:18,color:"rgba(255,255,255,.14)"}}>›</span>
                </div>
              ))}
            </div>
          </div>
          <Nav/>
        </div>
      </div>
    </div>
  );

  // ── BEACHES ──────────────────────────────────────────────────────────────
  if (screen === S.BEACHES) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
            <SB/>
            <div style={{padding:"2px 20px 18px"}}>
              <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>🏖️ Explore Beaches</div>
              <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:2}}>Gujarat · 6 destinations · More coming soon</div>
            </div>
          </div>
          <div style={scroll}>
            <div style={{padding:"12px 18px 20px",display:"flex",flexDirection:"column",gap:12}}>
              {beaches.map(b=>(
                <div key={b.id} onClick={()=>{setBeach(b);nav(S.BEACH);}} style={{background:C.card,borderRadius:22,overflow:"hidden",cursor:"pointer",border:`1px solid ${C.border}`,boxShadow:`0 4px 18px ${b.tagC}14`}}>
                  <div style={{height:130,position:"relative",overflow:"hidden"}}>
                    <img src={b.img} alt={b.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.background=b.tagC+"33"}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 25%,rgba(6,15,30,.88))"}}/>
                    <div style={{position:"absolute",top:10,left:12,background:b.tagC,borderRadius:18,padding:"3px 9px",fontSize:9,color:b.tagC==="#FBBF24"?C.navy:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800}}>{b.tag}</div>
                    <div style={{position:"absolute",top:10,right:12,background:"rgba(0,0,0,.5)",borderRadius:10,padding:"3px 8px",fontSize:11,color:C.gold,fontFamily:"'Nunito',sans-serif"}}>⭐ {b.rating}</div>
                    <div style={{position:"absolute",bottom:10,left:12}}>
                      <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>{b.name}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.6)",fontFamily:"'Nunito',sans-serif"}}>📍 {b.loc}</div>
                    </div>
                  </div>
                  <div style={{padding:"11px 13px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <div style={{fontSize:10,color:C.sky,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>🚗 {b.dist} km from Ahmedabad</div>
                      <div style={{fontSize:10,color:C.pink,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>{b.weather}</div>
                    </div>
                    <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>🌟 {b.famousFor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Nav/>
        </div>
      </div>
    </div>
  );

  // ── BEACH DETAIL ─────────────────────────────────────────────────────────
  if (screen === S.BEACH && beach) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{height:210,position:"relative",overflow:"hidden",flexShrink:0}}>
            <img src={beach.img} alt={beach.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.background=beach.tagC+"44"}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.25) 30%,#060F1E)"}}/>
            <button onClick={()=>nav(S.BEACHES)} style={{position:"absolute",top:48,left:14,background:"rgba(0,0,0,.55)",border:"none",borderRadius:13,padding:"8px 13px",color:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif",backdropFilter:"blur(12px)"}}>← Back</button>
            <div style={{position:"absolute",top:46,right:13,background:beach.tagC,borderRadius:18,padding:"4px 10px",fontSize:10,color:beach.tagC==="#FBBF24"?C.navy:"#fff",fontFamily:"'Nunito',sans-serif",fontWeight:800}}>{beach.tag}</div>
            <div style={{position:"absolute",bottom:12,left:15}}>
              <div style={{fontSize:21,fontWeight:900,color:"#fff"}}>{beach.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.65)",fontFamily:"'Nunito',sans-serif"}}>📍 {beach.loc}</div>
            </div>
            <div style={{position:"absolute",bottom:16,right:14,fontSize:15,color:C.gold,fontWeight:800}}>⭐ {beach.rating}</div>
          </div>
          <div style={scroll}>
            <div style={{padding:"13px 18px 24px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
                {[{i:"🚗",l:"Distance",v:beach.dist+" km"},{i:"🌡️",l:"Weather",v:beach.weather},{i:"📅",l:"Best Time",v:beach.bestTime}].map(x=>(
                  <div key={x.l} style={{background:C.card,borderRadius:14,padding:"11px 8px",textAlign:"center",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:18,marginBottom:3}}>{x.i}</div>
                    <div style={{fontSize:10,fontWeight:800,color:"#fff",fontFamily:"'Nunito',sans-serif"}}>{x.v}</div>
                    <div style={{fontSize:9,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{x.l}</div>
                  </div>
                ))}
              </div>
              <div style={{background:C.card,borderRadius:18,padding:13,marginBottom:12,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:800,color:C.sky,marginBottom:6}}>About This Beach</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.62)",fontFamily:"'Nunito',sans-serif",lineHeight:1.65}}>{beach.desc}</div>
              </div>
              <div style={{background:C.card,borderRadius:18,padding:13,marginBottom:14,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:800,color:C.pink,marginBottom:7}}>🌟 Famous For</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.62)",fontFamily:"'Nunito',sans-serif"}}>{beach.famousFor}</div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:11}}>🎯 Activities & Experiences</div>
                {beach.activities.map(a=>(
                  <div key={a.name} onClick={()=>{setAct(a);nav(S.ACTIVITY);}} style={{background:C.card,borderRadius:18,padding:13,marginBottom:9,border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:11}}>
                    <div style={{width:46,height:46,borderRadius:14,background:`${beach.tagC}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{a.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{a.name}</div>
                        <div style={{fontSize:11,color:C.gold,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>⭐ {a.rating}</div>
                      </div>
                      <div style={{fontSize:10,color:C.sky,fontFamily:"'Nunito',sans-serif",marginTop:2}}>🕐 {a.timing}</div>
                      <div style={{fontSize:10,color:C.pink,fontFamily:"'Nunito',sans-serif",marginTop:1}}>💰 {a.price} · ⏱ {a.duration}</div>
                    </div>
                    <span style={{fontSize:17,color:"rgba(255,255,255,.18)"}}>›</span>
                  </div>
                ))}
              </div>
              <Btn onClick={()=>nav(S.HOTELS)} bg={C.grad1}>🏨 View Hotels Near This Beach</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── ACTIVITY DETAIL ──────────────────────────────────────────────────────
  if (screen === S.ACTIVITY && act && beach) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
            <SB/>
            <div style={{padding:"2px 20px 18px",display:"flex",alignItems:"center",gap:11}}>
              <button onClick={()=>nav(S.BEACH)} style={{background:"rgba(255,255,255,.08)",border:"none",borderRadius:12,padding:"8px 12px",color:"#fff",fontSize:14,cursor:"pointer"}}>←</button>
              <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>{act.icon} {act.name}</div>
            </div>
          </div>
          <div style={scroll}>
            <div style={{padding:"12px 18px 24px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
                {[{i:"🕐",l:"Timings",v:act.timing},{i:"💰",l:"Pricing",v:act.price},{i:"⏱️",l:"Duration",v:act.duration},{i:"⭐",l:"Rating",v:act.rating+"/5.0"}].map(x=>(
                  <div key={x.l} style={{background:C.card,borderRadius:16,padding:"13px 12px",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:22,marginBottom:5}}>{x.i}</div>
                    <div style={{fontSize:13,fontWeight:800,color:"#fff",fontFamily:"'Nunito',sans-serif"}}>{x.v}</div>
                    <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:1}}>{x.l}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:11}}>💬 Visitor Reviews ({act.reviews.length})</div>
              {act.reviews.map((r,i)=>(
                <div key={i} style={{background:C.card,borderRadius:16,padding:13,marginBottom:9,border:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <div style={{display:"flex",gap:9,alignItems:"center"}}>
                      <div style={{width:30,height:30,borderRadius:15,background:C.grad3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>😊</div>
                      <div style={{fontSize:12,fontWeight:800,color:"#fff"}}>{r.u}</div>
                    </div>
                    <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{r.d}</div>
                  </div>
                  <div style={{fontSize:12,color:C.gold}}>{"★".repeat(r.r)}{"☆".repeat(5-r.r)}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.62)",fontFamily:"'Nunito',sans-serif",marginTop:5,lineHeight:1.5}}>{r.c}</div>
                </div>
              ))}
              <div style={{marginTop:4}}>
                {act.canBook
                  ? <Btn bg={C.grad2} color="#fff">📅 Book This Activity Now</Btn>
                  : <div style={{background:"rgba(255,255,255,.04)",borderRadius:16,padding:"13px",textAlign:"center",border:`1px solid ${C.border}`}}><div style={{fontSize:12,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>✅ Free entry — no booking required</div></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── HOTELS ───────────────────────────────────────────────────────────────
  if (screen === S.HOTELS && beach) {
    const list = hotelData[beach.id] || [];
    return (
      <div style={wrap}><style>{css}</style>
        <div style={ph}>
          <div style={scr}>
            <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
              <SB/>
              <div style={{padding:"2px 20px 18px",display:"flex",alignItems:"center",gap:11}}>
                <button onClick={()=>nav(S.BEACH)} style={{background:"rgba(255,255,255,.08)",border:"none",borderRadius:12,padding:"8px 12px",color:"#fff",fontSize:14,cursor:"pointer"}}>←</button>
                <div>
                  <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Hotels near {beach.name}</div>
                  <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{list.length} properties available</div>
                </div>
              </div>
            </div>
            <div style={scroll}>
              <div style={{padding:"12px 18px",display:"flex",flexDirection:"column",gap:12}}>
                {list.map(h=>(
                  <div key={h.id} onClick={()=>{setHotel(h);nav(S.HOTEL);}} style={{background:C.card,borderRadius:22,overflow:"hidden",border:`1px solid ${C.border}`,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
                    <div style={{height:90,background:`linear-gradient(135deg,${C.sky}1A,${C.pink}1A)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,position:"relative"}}>
                      🏨
                      <div style={{position:"absolute",top:9,right:11,background:C.sky,borderRadius:18,padding:"3px 9px",fontSize:9,color:C.navy,fontFamily:"'Nunito',sans-serif",fontWeight:800}}>{h.tag}</div>
                    </div>
                    <div style={{padding:"12px 13px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div>
                          <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{h.name}</div>
                          <div style={{fontSize:12,color:C.gold,marginTop:2}}>{"★".repeat(h.stars)}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:17,fontWeight:900,background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₹{h.price.toLocaleString()}</div>
                          <div style={{fontSize:9,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>per night</div>
                        </div>
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
                        {h.amenities.map(a=><span key={a} style={{background:"rgba(255,255,255,.06)",borderRadius:8,padding:"2px 7px",fontSize:10,color:"rgba(255,255,255,.6)",fontFamily:"'Nunito',sans-serif"}}>{a}</span>)}
                      </div>
                      <div style={{marginTop:9,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:11,color:C.sky,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>⭐ {h.rating}</div>
                        <div style={{fontSize:11,color:C.navy,background:C.grad1,borderRadius:9,padding:"4px 13px",fontWeight:800,fontFamily:"'Outfit',sans-serif"}}>Book Now →</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Nav/>
          </div>
        </div>
      </div>
    );
  }

  // ── HOTEL BOOKING ────────────────────────────────────────────────────────
  if (screen === S.HOTEL && hotel) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{height:140,background:`linear-gradient(135deg,${C.sky}22,${C.pink}22)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,position:"relative",flexShrink:0}}>
            🏨
            <button onClick={()=>nav(S.HOTELS)} style={{position:"absolute",top:14,left:13,background:"rgba(0,0,0,.55)",border:"none",borderRadius:12,padding:"7px 13px",color:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif",backdropFilter:"blur(10px)"}}>← Back</button>
            <div style={{position:"absolute",top:12,right:13,background:C.sky,borderRadius:18,padding:"3px 10px",fontSize:9,color:C.navy,fontFamily:"'Nunito',sans-serif",fontWeight:800}}>{hotel.tag}</div>
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:55,background:"linear-gradient(transparent,#060F1E)"}}/>
          </div>
          <div style={scroll}>
            <div style={{padding:"13px 18px 24px"}}>
              <div style={{fontSize:19,fontWeight:900,color:"#fff"}}>{hotel.name}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                <div style={{fontSize:13,color:C.gold}}>{"★".repeat(hotel.stars)} <span style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>({hotel.rating})</span></div>
                <div><span style={{fontSize:19,fontWeight:900,background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₹{hotel.price.toLocaleString()}</span><span style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>/night</span></div>
              </div>
              <div style={{background:C.card,borderRadius:18,padding:14,marginTop:13,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:800,color:C.sky,marginBottom:11}}>📅 SELECT DATES & GUESTS</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:12}}>
                  {[{l:"Check-in",v:checkIn,set:setCheckIn},{l:"Check-out",v:checkOut,set:setCheckOut}].map(f=>(
                    <div key={f.l}>
                      <div style={{fontSize:9,color:C.sub,fontFamily:"'Nunito',sans-serif",marginBottom:5,letterSpacing:1}}>{f.l.toUpperCase()}</div>
                      <input type="date" value={f.v} onChange={e=>f.set(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${C.border}`,borderRadius:12,padding:"9px",color:"#fff",fontSize:12,fontFamily:"'Outfit',sans-serif",outline:"none"}}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:11}}>
                  <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>Guests:</div>
                  <button onClick={()=>setGuests(Math.max(1,guests-1))} style={{width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.07)",border:"none",color:"#fff",fontSize:16,cursor:"pointer"}}>−</button>
                  <div style={{fontSize:16,fontWeight:800,color:"#fff",minWidth:22,textAlign:"center"}}>{guests}</div>
                  <button onClick={()=>setGuests(guests+1)} style={{width:32,height:32,borderRadius:10,background:"rgba(255,255,255,.07)",border:"none",color:"#fff",fontSize:16,cursor:"pointer"}}>+</button>
                  <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{nights} night{nights!==1?"s":""}</div>
                </div>
              </div>
              <div style={{background:"rgba(34,211,238,.06)",borderRadius:18,padding:13,marginTop:11,border:`1px solid ${C.sky}22`}}>
                <div style={{fontSize:11,fontWeight:800,color:C.cyan,marginBottom:9}}>💰 PRICE SUMMARY</div>
                {[{l:`₹${hotel.price.toLocaleString()} × ${nights} nights`,v:`₹${(hotel.price*nights).toLocaleString()}`},{l:"Taxes & Fees (12%)",v:`₹${Math.round(total*.12).toLocaleString()}`}].map(r=>(
                  <div key={r.l} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{r.l}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.75)",fontFamily:"'Nunito',sans-serif"}}>{r.v}</div>
                  </div>
                ))}
                <div style={{borderTop:`1px solid rgba(255,255,255,.07)`,paddingTop:8,display:"flex",justifyContent:"space-between"}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>Total</div>
                  <div style={{fontSize:18,fontWeight:900,background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₹{grand.toLocaleString()}</div>
                </div>
              </div>
              <div style={{marginTop:13}}><Btn onClick={()=>nav(S.PAYMENT)} bg={C.grad1}>Proceed to Payment →</Btn></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── PAYMENT ──────────────────────────────────────────────────────────────
  if (screen === S.PAYMENT) {
    const methods = [
      {id:"upi",icon:"📱",label:"UPI Payment",sub:"GPay · PhonePe · Paytm · BHIM"},
      {id:"card",icon:"💳",label:"Debit / Credit Card",sub:"Visa · Mastercard · RuPay · Amex"},
      {id:"netbanking",icon:"🏦",label:"Net Banking",sub:"All major Indian & global banks"},
      {id:"wallet",icon:"👛",label:"Digital Wallet",sub:"Paytm · Amazon Pay · Freecharge"},
    ];
    return (
      <div style={wrap}><style>{css}</style>
        <div style={ph}>
          <div style={scr}>
            <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
              <SB/>
              <div style={{padding:"2px 20px 18px",display:"flex",alignItems:"center",gap:11}}>
                <button onClick={()=>nav(S.HOTEL)} style={{background:"rgba(255,255,255,.08)",border:"none",borderRadius:12,padding:"8px 12px",color:"#fff",fontSize:14,cursor:"pointer"}}>←</button>
                <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>🔒 Secure Payment</div>
              </div>
            </div>
            <div style={scroll}>
              <div style={{padding:"12px 18px 24px"}}>
                <div style={{background:C.card,borderRadius:20,padding:13,marginBottom:13,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:10,color:C.sky,fontWeight:800,marginBottom:7,letterSpacing:1}}>BOOKING SUMMARY</div>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{hotel?.name}</div>
                  <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:3}}>📍 Near {beach?.name} · {nights} nights · {guests} guests</div>
                  <div style={{display:"flex",justifyContent:"space-between",borderTop:`1px solid rgba(255,255,255,.07)`,paddingTop:9,marginTop:9}}>
                    <div style={{fontSize:12,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>Total Amount</div>
                    <div style={{fontSize:19,fontWeight:900,background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>₹{grand.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginBottom:9,letterSpacing:1}}>SELECT PAYMENT METHOD</div>
                {methods.map(m=>(
                  <div key={m.id} onClick={()=>setPay(m.id)} style={{background:pay===m.id?"rgba(34,211,238,.1)":C.card,borderRadius:16,padding:"12px 13px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer",border:`1.5px solid ${pay===m.id?C.sky:C.border}`,transition:"all .2s"}}>
                    <div style={{fontSize:22}}>{m.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"'Nunito',sans-serif"}}>{m.label}</div>
                      <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{m.sub}</div>
                    </div>
                    <div style={{width:19,height:19,borderRadius:10,border:`2px solid ${pay===m.id?C.sky:"rgba(255,255,255,.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {pay===m.id && <div style={{width:9,height:9,borderRadius:5,background:C.sky}}/>}
                    </div>
                  </div>
                ))}
                <div style={{background:"rgba(34,211,238,.05)",borderRadius:13,padding:"9px 12px",marginTop:6,marginBottom:13,display:"flex",gap:8,alignItems:"center",border:`1px solid ${C.sky}1A`}}>
                  <span style={{fontSize:13}}>🔒</span>
                  <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>256-bit SSL encrypted · 100% secure payment</div>
                </div>
                <Btn onClick={()=>nav(S.SUCCESS)} bg={C.grad1}>🔒 Pay ₹{grand.toLocaleString()} Now</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SUCCESS ──────────────────────────────────────────────────────────────
  if (screen === S.SUCCESS) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={{...scr,background:C.gradBg}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:26}}>
            <div style={{fontSize:84,animation:"pop .6s ease forwards",marginBottom:8}}>🎉</div>
            <div style={{fontSize:23,fontWeight:900,color:"#fff",textAlign:"center",animation:"fadeUp .5s ease .2s both"}}>Booking Confirmed!</div>
            <div style={{fontSize:12,color:C.sub,fontFamily:"'Nunito',sans-serif",textAlign:"center",marginTop:7,lineHeight:1.65,animation:"fadeUp .5s ease .3s both"}}>Your stay at <span style={{color:C.sky,fontWeight:800}}>{hotel?.name}</span><br/>near {beach?.name} is all set! 🌊</div>
            <div style={{background:C.card,borderRadius:22,padding:16,marginTop:18,width:"100%",border:`1px solid ${C.border}`,animation:"fadeUp .5s ease .4s both"}}>
              {[{l:"Booking ID",v:"#GUJ"+Math.floor(Math.random()*90000+10000)},{l:"Hotel",v:hotel?.name},{l:"Beach",v:beach?.name},{l:"Guests",v:guests+" guests"},{l:"Duration",v:nights+" nights"},{l:"Amount Paid",v:"₹"+grand.toLocaleString()},{l:"Payment Via",v:pay.toUpperCase()}].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",marginBottom:7,paddingBottom:7,borderBottom:"1px solid rgba(255,255,255,.05)"}}>
                  <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{r.l}</div>
                  <div style={{fontSize:11,color:"#fff",fontWeight:700,fontFamily:"'Nunito',sans-serif",maxWidth:160,textAlign:"right"}}>{r.v}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,width:"100%"}}><Btn onClick={()=>{nav(S.HOME);setTab("home");}} bg={C.grad3} color="#fff">🏠 Back to Home</Btn></div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── PLANNER ──────────────────────────────────────────────────────────────
  if (screen === S.PLANNER) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
            <SB/>
            <div style={{padding:"2px 20px 18px"}}>
              <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>📅 Trip Planner</div>
              <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:2}}>Build your coastal itinerary</div>
            </div>
          </div>
          <div style={scroll}>
            <div style={{padding:"12px 18px 24px"}}>
              {plan.length>0 && (
                <div style={{marginBottom:18}}>
                  <div style={{fontSize:12,fontWeight:800,color:C.sky,marginBottom:10,letterSpacing:1}}>YOUR ITINERARY — {plan.length} DAY{plan.length!==1?"S":""}</div>
                  {plan.map((d,i)=>(
                    <div key={d.id} style={{background:C.card,borderRadius:16,padding:"11px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.border}`}}>
                      <div style={{width:38,height:38,borderRadius:12,overflow:"hidden",flexShrink:0}}>
                        <img src={d.b.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.background=d.b.tagC+"33"}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:800,color:"#fff"}}>Day {i+1}: {d.b.name}</div>
                        <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>🚗 {d.b.dist} km</div>
                      </div>
                      <button onClick={()=>setPlan(plan.filter(x=>x.id!==d.id))} style={{background:"rgba(255,80,80,.14)",border:"none",borderRadius:9,padding:"5px 9px",color:"#FF7070",fontSize:12,cursor:"pointer"}}>✕</button>
                    </div>
                  ))}
                  <div style={{background:"rgba(34,211,238,.06)",borderRadius:13,padding:"10px 13px",border:`1px solid ${C.sky}1F`,display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>Total duration</div>
                    <div style={{fontSize:12,color:C.sky,fontWeight:800}}>{plan.length} Day{plan.length!==1?"s":""}</div>
                  </div>
                </div>
              )}
              <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginBottom:9,letterSpacing:1}}>ADD BEACHES TO YOUR PLAN</div>
              {beaches.map(b=>(
                <div key={b.id} style={{background:C.card,borderRadius:16,padding:"10px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.border}`}}>
                  <div style={{width:40,height:40,borderRadius:12,overflow:"hidden",flexShrink:0}}>
                    <img src={b.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.background=b.tagC+"33"}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{b.name}</div>
                    <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>🚗 {b.dist} km</div>
                  </div>
                  <button onClick={()=>setPlan([...plan,{b,id:Date.now()+Math.random()}])} style={{background:b.tagC+"22",border:`1px solid ${b.tagC}44`,borderRadius:11,padding:"6px 12px",color:"#fff",fontSize:11,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:800}}>+ Add</button>
                </div>
              ))}
            </div>
          </div>
          <Nav/>
        </div>
      </div>
    </div>
  );

  // ── SUPPORT ──────────────────────────────────────────────────────────────
  if (screen === S.SUPPORT) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
            <SB/>
            <div style={{padding:"2px 20px 18px"}}>
              <div style={{fontSize:22,fontWeight:900,color:"#fff"}}>💬 Customer Support</div>
              <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:2}}>We're here to help — 24/7</div>
            </div>
          </div>
          <div style={scroll}>
            <div style={{padding:"12px 18px 24px"}}>
              <div style={{background:`linear-gradient(135deg,${C.sky}14,${C.pink}14)`,borderRadius:22,padding:18,marginBottom:14,border:`1px solid ${C.sky}2A`,textAlign:"center"}}>
                <div style={{fontSize:44,marginBottom:10}}>📧</div>
                <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:5}}>Email Us Directly</div>
                <div style={{fontSize:12,fontWeight:800,background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:7}}>monarch01work@gmail.com</div>
                <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif",lineHeight:1.6}}>Send queries, feedback or issues.<br/>We reply within 24 hours.</div>
                <button style={{marginTop:12,background:C.grad1,border:"none",borderRadius:14,padding:"10px 24px",color:C.navy,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>📤 Send Email Now</button>
              </div>
              {[
                {i:"💬",t:"Live Chat",s:"Chat with our team in real-time",tag:"9 AM – 9 PM daily",c:C.cyan},
                {i:"📞",t:"Call Support",s:"+91 98765 43210",tag:"Mon–Sat · 9 AM – 6 PM",c:C.sky},
                {i:"📖",t:"Help Centre & FAQs",s:"Browse guides and answers",tag:"Always available",c:C.pink},
                {i:"🐛",t:"Report a Bug",s:"Help us improve the app",tag:"Rewards for valid reports",c:"#A78BFA"},
                {i:"⭐",t:"Rate the App",s:"Your feedback matters",tag:"Helps us grow",c:C.gold},
              ].map(x=>(
                <div key={x.t} style={{background:C.card,borderRadius:18,padding:"13px 14px",marginBottom:9,display:"flex",alignItems:"center",gap:12,border:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <div style={{width:44,height:44,borderRadius:14,background:x.c+"1A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{x.i}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{x.t}</div>
                    <div style={{fontSize:11,color:x.c,fontFamily:"'Nunito',sans-serif",fontWeight:700,marginTop:1}}>{x.s}</div>
                    <div style={{fontSize:9,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:1}}>{x.tag}</div>
                  </div>
                  <span style={{fontSize:17,color:"rgba(255,255,255,.14)"}}>›</span>
                </div>
              ))}
              <div style={{background:C.card,borderRadius:16,padding:14,marginTop:4,border:`1px solid ${C.border}`,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.sub,fontFamily:"'Nunito',sans-serif",lineHeight:1.8}}>
                  Avg response time: <span style={{color:C.sky,fontWeight:800}}>under 2 hours</span><br/>
                  Customer satisfaction: <span style={{color:C.gold,fontWeight:800}}>4.9 / 5 ⭐</span><br/>
                  <span style={{color:C.pink,fontWeight:700}}>monarch01work@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <Nav/>
        </div>
      </div>
    </div>
  );

  // ── PROFILE ──────────────────────────────────────────────────────────────
  if (screen === S.PROFILE) return (
    <div style={wrap}><style>{css}</style>
      <div style={ph}>
        <div style={scr}>
          <div style={{background:"linear-gradient(180deg,#071828,#0D2035)",flexShrink:0}}>
            <SB/>
            <div style={{padding:"2px 20px 22px",textAlign:"center"}}>
              <div style={{width:78,height:78,borderRadius:39,background:C.grad3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,margin:"0 auto 10px",boxShadow:`0 0 0 3px ${C.navy}, 0 0 0 5px ${C.sky}44`}}>😎</div>
              <div style={{fontSize:20,fontWeight:900,color:"#fff"}}>{user?.name||"Explorer"}</div>
              <div style={{fontSize:11,color:C.sky,fontFamily:"'Nunito',sans-serif",marginTop:3,fontWeight:700}}>Age {user?.age||"–"} · +91 {user?.phone||""}</div>
              {user?.loc && <div style={{fontSize:10,color:C.cyan,fontFamily:"'Nunito',sans-serif",marginTop:2}}>📍 Location access granted</div>}
            </div>
          </div>
          <div style={scroll}>
            <div style={{padding:"13px 18px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:16}}>
                {[{v:"3",l:"Beaches",i:"🏖️"},{v:"2",l:"Bookings",i:"🏨"},{v:"5",l:"Days\nPlanned",i:"📅"}].map(s=>(
                  <div key={s.l} style={{background:C.card,borderRadius:16,padding:"12px 8px",textAlign:"center",border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:20,marginBottom:3}}>{s.i}</div>
                    <div style={{fontSize:18,fontWeight:900,background:C.grad1,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.v}</div>
                    <div style={{fontSize:9,color:C.sub,fontFamily:"'Nunito',sans-serif",lineHeight:1.3,whiteSpace:"pre-line"}}>{s.l}</div>
                  </div>
                ))}
              </div>
              {[
                {i:"🎫",t:"My Bookings",s:"View all reservations"},
                {i:"❤️",t:"Saved Beaches",s:"Your favourite spots"},
                {i:"⭐",t:"My Reviews",s:"Ratings you've given"},
                {i:"🔔",t:"Notifications",s:"Alerts & updates"},
                {i:"🌐",t:"Language & Region",s:"English · India 🇮🇳"},
                {i:"🔒",t:"Privacy & Security",s:"Account protection"},
                {i:"💬",t:"Help & Support",s:"Contact us · monarch01work@gmail.com", action:()=>{setTab("support");nav(S.SUPPORT);}},
                {i:"ℹ️",t:"About App",s:"Coastal Planner v2.0 · Global Edition"},
              ].map(x=>(
                <div key={x.t} onClick={x.action} style={{background:C.card,borderRadius:16,padding:"12px 13px",marginBottom:8,display:"flex",alignItems:"center",gap:12,border:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <div style={{fontSize:20}}>{x.i}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"'Nunito',sans-serif"}}>{x.t}</div>
                    <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif"}}>{x.s}</div>
                  </div>
                  <span style={{fontSize:17,color:"rgba(255,255,255,.13)"}}>›</span>
                </div>
              ))}
              {/* Made with love in India footer */}
              <div style={{marginTop:14,padding:"18px 16px",background:`linear-gradient(135deg,${C.sky}0F,${C.pink}0F)`,borderRadius:22,border:`1px solid rgba(255,255,255,.07)`,textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:7}}>🇮🇳</div>
                <div style={{fontSize:15,fontWeight:900,background:C.grad3,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:1}}>MADE WITH ❤️ IN INDIA</div>
                <div style={{fontSize:10,color:C.sub,fontFamily:"'Nunito',sans-serif",marginTop:5,lineHeight:1.7}}>Coastal Management & Planner Platform · v2.0<br/><span style={{color:C.sky}}>Gujarat → All India → World 🌍</span></div>
              </div>
            </div>
          </div>
          <Nav/>
        </div>
      </div>
    </div>
  );

  return null;
}
