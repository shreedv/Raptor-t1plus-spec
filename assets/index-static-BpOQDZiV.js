(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();const b=[{id:"chassis",label:"CHASSIS",num:"01",origin:"50% 80%",camAngles:["3/4 FRONT","SIDE PROFILE","PLAN VIEW"],specs:[{label:"MATERIAL",value:"CHROMOLY STEEL 4130",isCounter:!1},{label:"WEIGHT",value:180,isCounter:!0,unit:"KG"},{label:"ROLL CAGE",value:"FIA T1 CERTIFIED",isCounter:!1},{label:"CONSTRUCTION",value:"FULLY TRIANGULATED",isCounter:!1}]},{id:"engine",label:"POWERTRAIN",num:"02",origin:"58% 42%",camAngles:["3/4 FRONT","SIDE ELEVATION","TOP DOWN"],specs:[{label:"OUTPUT",value:750,isCounter:!0,unit:"BHP"},{label:"TORQUE",value:920,isCounter:!0,unit:"NM"},{label:"CONFIG",value:"5.0L V8 NA",isCounter:!1},{label:"REDLINE",value:7200,isCounter:!0,unit:"RPM"}]},{id:"suspension",label:"SUSPENSION",num:"03",origin:"20% 68%",camAngles:["3/4 VIEW","SIDE PROFILE","PLAN VIEW"],specs:[{label:"BRAND",value:"FOX 2.5 LIVE VALVE",isCounter:!1},{label:"FRONT TRAVEL",value:380,isCounter:!0,unit:"MM"},{label:"REAR TRAVEL",value:410,isCounter:!0,unit:"MM"},{label:"TYPE",value:"IFS / SOLID REAR",isCounter:!1}]},{id:"wheels",label:"WHEELS & TYRES",num:"04",origin:"18% 72%",camAngles:["3/4 VIEW","SIDE PROFILE","TOP DOWN"],specs:[{label:"RIM",value:'17" BBS FORGED ALLOY',isCounter:!1},{label:"TYRE",value:"37×12.5 R17",isCounter:!1},{label:"BRAND",value:"BF GOODRICH KR3",isCounter:!1},{label:"WEIGHT",value:32,isCounter:!0,unit:"KG / CORNER"}]},{id:"body",label:"BODY & LIVERY",num:"05",origin:"50% 30%",camAngles:["3/4 FRONT","SIDE ELEVATION","TOP DOWN"],specs:[{label:"MATERIAL",value:"FULL CARBON FIBRE",isCounter:!1},{label:"AERO",value:"ACTIVE FRONT SPLITTER",isCounter:!1},{label:"WEIGHT SAVING",value:47,isCounter:!0,unit:"KG VS STEEL"},{label:"LIVERY",value:"MATTE BLACK / ORANGE",isCounter:!1}]},{id:"full",label:"COMPLETE VEHICLE",num:"06",origin:"50% 50%",camAngles:["3/4 FRONT","SIDE PROFILE","AERIAL VIEW"],specs:[]}],L=["chassis/hero","chassis/side","chassis/top","engine/hero","engine/side","engine/top","suspension/hero","suspension/side","suspension/top","wheels/hero","wheels/side","wheels/top","body/hero","body/side","body/top","full_vehicle/hero","full_vehicle/side","full_vehicle/top"],B={};let h=null;const y=[],k=[];let f=null,G=!1,M=[],O=!1,V=-1;function K(){const e=document.getElementById("root");e.innerHTML=`
    <div id="grain"></div>
    <div id="scanlines"></div>
    <div id="vignette"></div>
    <div id="cursor"></div>
    <div id="cursor-dot"></div>
    <div id="progress-bar"></div>

    <div id="nav-logo">RAPTOR <span>T1+</span></div>
    <button id="audio-btn">▶ ENGINE</button>

    <div id="chapter-nav">
      ${b.map((t,r)=>`
        <div class="ch-dot" data-idx="${r}">
          <div class="ch-dot-label">${t.num} ${t.label}</div>
        </div>`).join("")}
    </div>

    <div id="telemetry">
      ${Array.from({length:14},(t,r)=>`<div class="tele-line">${D()}</div>`).join("")}
    </div>

    <div id="loading">
      <div id="loading-logo">RAPTOR <span>T1+</span></div>
      <div id="loading-status">Initialising render…</div>
      <div id="loading-bar-wrap">
        <div id="loading-bar-fill"></div>
        <div id="loading-pct">0%</div>
      </div>
      <div id="loading-detail">Queuing 18 SVG renders…</div>
      <button id="loading-skip">ENTER NOW →</button>
    </div>

    <section id="hero">
      <div id="hero-bg"></div>
      <div id="hero-line-l"></div>
      <div id="hero-line-r"></div>
      <div id="hero-eyebrow">FORD PERFORMANCE · DAKAR CLASS T1+</div>
      <h1 id="hero-title" data-text="RAPTORT1+">RAPTOR<br>T1+</h1>
      <p id="hero-subtitle">/ KINETIC SPEC SHEET 2026 /</p>
      <div id="hero-coords">
        <div>LAT <span id="coord-lat">26°41′N</span></div>
        <div>LON <span id="coord-lon">11°52′E</span></div>
        <div>ALT <span id="coord-alt">487M</span></div>
        <div>SPD <span id="coord-spd">000 KPH</span></div>
      </div>
      <div id="hero-scroll">
        SCROLL TO ASSEMBLE
        <div id="scroll-line"></div>
      </div>
    </section>

    <div id="chapters-container">
      ${b.map((t,r)=>`
        <div class="chapter" id="chapter-${t.id}" data-idx="${r}">
          <div class="chapter-inner" id="inner-${t.id}">
            <div class="chapter-watermark">${t.num}</div>
            <div class="chapter-label" id="label-${t.id}">${t.num} / ${t.label}</div>
            <div class="cam-indicator" id="cam-${t.id}">CAM: ${t.camAngles[0]}</div>
            <div class="chapter-flash" id="flash-${t.id}"></div>
            <div class="img-layer" id="${t.id}-hero"><div class="img-placeholder">RENDERING ${t.label}…</div></div>
            <div class="img-layer" id="${t.id}-side"><div class="img-placeholder">…</div></div>
            <div class="img-layer" id="${t.id}-top"><div class="img-placeholder">…</div></div>
            ${t.id==="engine"?`
              <div id="oscilloscope">
                <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(255,74,0,0.15)" stroke-width="0.5"/>
                  <path id="osc-path" d="" stroke="#FF4A00" stroke-width="1.5" fill="none" filter="url(#glow)"/>
                  <defs><filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                </svg>
              </div>`:""}
            ${t.id==="full"?`
              <div id="full-reveal-grid">
                <div class="reveal-spec">CHASSIS <span>CHROMOLY 4130 · 180 KG</span></div>
                <div class="reveal-spec">OUTPUT <span>750 BHP · 920 NM</span></div>
                <div class="reveal-spec">SUSPENSION <span>FOX 2.5 LIVE VALVE</span></div>
                <div class="reveal-spec">TRAVEL <span>380MM F · 410MM R</span></div>
                <div class="reveal-spec">WHEELS <span>17″ BBS · BFG KR3</span></div>
                <div class="reveal-spec">TYRES <span>37×12.5 R17</span></div>
                <div class="reveal-spec">BODY <span>FULL CARBON FIBRE</span></div>
                <div class="reveal-spec">AERO <span>ACTIVE FRONT SPLITTER</span></div>
                <div class="reveal-spec">WEIGHT SAVED <span>47 KG VS STEEL</span></div>
                <div class="reveal-spec">LIVERY <span>MATTE BLACK / ORANGE</span></div>
              </div>
              <div id="stats-bar">
                <div class="stat-item"><span>750</span> BHP</div>
                <div class="stat-sep">/</div>
                <div class="stat-item"><span>920</span> NM</div>
                <div class="stat-sep">/</div>
                <div class="stat-item"><span>380</span>MM TRAVEL</div>
                <div class="stat-sep">/</div>
                <div class="stat-item"><span>47</span>KG SAVED</div>
                <div class="stat-sep">/</div>
                <div class="stat-item"><span>7,200</span> RPM MAX</div>
              </div>
              <button id="cta-btn">[ DOWNLOAD FULL SPEC SHEET ]</button>
            `:""}
          </div>
        </div>
      `).join("")}
    </div>

    <div id="spec-panel"></div>
  `}function D(){return Array.from({length:8},()=>Math.floor(Math.random()*16).toString(16).toUpperCase()).join("")+" "+Array.from({length:4},()=>Math.floor(Math.random()*16).toString(16).toUpperCase()).join("")}function Y(){const e=document.getElementById("telemetry");e&&setInterval(()=>{const t=e.querySelectorAll(".tele-line"),r=t[t.length-1];if(r){const o=document.createElement("div");o.className="tele-line",o.textContent=D(),e.insertBefore(o,e.firstChild),r.remove()}},600)}function Z(){let e=0;const t=document.getElementById("coord-spd"),r=document.getElementById("coord-lat"),o=document.getElementById("coord-lon"),a=document.getElementById("coord-alt");window.addEventListener("scroll",()=>{const i=window.scrollY/(document.body.scrollHeight-window.innerHeight),l=Math.round(i*187);e+=(l-e)*.1,t&&(t.textContent=String(Math.round(e)).padStart(3,"0")+" KPH")}),setInterval(()=>{if(r){const i=26+Math.random()*.004;r.textContent=i.toFixed(3)+"°N"}if(o){const i=11+Math.random()*.004;o.textContent=i.toFixed(3)+"°E"}if(a){const i=487+Math.round(Math.random()*6-3);a.textContent=i+"M"}},800)}function F(e){const t=document.getElementById("loading-bar-fill"),r=document.getElementById("loading-pct");t&&(t.style.width=e+"%"),r&&(r.textContent=Math.round(e)+"%")}function x(e){const t=document.getElementById("loading-status");t&&gsap.to(t,{opacity:0,duration:.2,onComplete:()=>{t.textContent=e,gsap.to(t,{opacity:1,duration:.3})}})}function E(e){const t=document.getElementById("loading-detail");t&&(t.textContent=e)}const T=["Rendering chassis geometry…","Casting engine block…","Mounting coilover suspension…","Inflating BFG tyres…","Laying carbon fibre body…","Applying race livery…","Finalising renders…"];let C=0,H;function $(){x(T[0]),H=setInterval(()=>{C=(C+1)%T.length,x(T[C])},1600)}async function z(){const e=L.length;let t=!1,r=!0;for(;!t;){r||await new Promise(o=>setTimeout(o,2e3)),r=!1;try{const o=await fetch("/api/svg-status");if(!o.ok)continue;const a=await o.json();let i=0,l=!1;for(const d of L){const c=a[d];if(!c){l=!0;continue}c.status==="done"||c.status==="error"?(i++,d in B||(B[d]=c.svg??null,P(d,c.svg??null))):l=!0}F(i/e*100),E(`${i} / ${e} renders complete`),l||(t=!0)}catch{}}}function Q(e){const[t,r]=e.split("/");return`${t==="full_vehicle"?"full":t}-${r}`}function P(e,t){_(Q(e),t,e.toUpperCase()),e==="full_vehicle/hero"&&q(t)}function q(e){const t=document.getElementById("hero-bg");if(!t||!e)return;const r=document.createElement("div");r.innerHTML=e;const o=r.querySelector("svg");o&&(o.style.cssText="width:100%;height:100%;",t.innerHTML="",t.appendChild(o))}function _(e,t,r){const o=document.getElementById(e);if(o)if(t){const a=document.createElement("div");a.innerHTML=t;const i=a.querySelector("svg");if(i){i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.style.cssText="width:100%;height:100%;display:block;";const l=document.createElement("div");l.className="svg-wrap",l.appendChild(i),o.innerHTML="",o.appendChild(l)}else o.innerHTML=`<div class="svg-error">${r}</div>`}else o.innerHTML=`<div class="svg-error">${r}</div>`}function X(){if(h)return;h=new AudioContext;const e=h.createGain();e.gain.value=.6,e.connect(h.destination),f=h.createBiquadFilter(),f.type="lowpass",f.frequency.value=200,f.Q.value=2,f.connect(e);function t(r){const o=h.createOscillator(),a=h.createGain();o.type="sawtooth",o.frequency.value=r,a.gain.value=0,o.connect(a),a.connect(f),o.start(),y.push(o),k.push(a)}t(40),t(80),t(120)}function J(){X(),k[0]?.gain.setTargetAtTime(.12,h.currentTime,.5),k[1]?.gain.setTargetAtTime(.06,h.currentTime,.5),k[2]?.gain.setTargetAtTime(.03,h.currentTime,.5),G=!0}function ee(){h&&(k.forEach(e=>e.gain.setTargetAtTime(0,h.currentTime,.4)),G=!1)}function U(e=1){if(!G||!y.length)return;const t=h.currentTime;y[0].frequency.setTargetAtTime(160*e,t,.2),y[1].frequency.setTargetAtTime(320*e,t,.2),y[2].frequency.setTargetAtTime(480*e,t,.2),f&&f.frequency.setTargetAtTime(800*e,t,.2),setTimeout(()=>{const r=h.currentTime;y[0].frequency.setTargetAtTime(40,r,.6),y[1].frequency.setTargetAtTime(80,r,.6),y[2].frequency.setTargetAtTime(120,r,.6),f&&f.frequency.setTargetAtTime(200,r,.6)},600)}function v(){if(!document.getElementById("spec-panel"))return;const t=[...M];M=[],t.forEach(r=>{gsap.to(r,{opacity:0,x:20,duration:.2,onComplete:()=>r.remove()})})}function W(e,t=0){const r=document.getElementById("spec-panel");if(!r)return;const o=document.createElement("div");o.className="spec-item";const a=document.createElement("div");a.className="spec-label",a.textContent=e.label;const i=document.createElement("div");i.className="spec-value"+(e.isCounter?" counter":"");const l=document.createElement("div");if(l.className="spec-rule",o.appendChild(a),o.appendChild(i),e.unit){const d=document.createElement("div");d.className="spec-unit",d.textContent=e.unit,o.appendChild(d)}if(o.appendChild(l),r.appendChild(o),M.push(o),gsap.set(o,{opacity:0,x:20}),gsap.to(o,{opacity:1,x:0,duration:.45,delay:t,ease:"power2.out"}),gsap.to(l,{scaleX:1,duration:.5,delay:t+.05,ease:"power2.out"}),e.isCounter&&typeof e.value=="number"){const d={val:0};i.textContent="0",gsap.to(d,{val:e.value,duration:1.2,delay:t,ease:"power2.out",onUpdate:()=>{i.textContent=Math.round(d.val).toLocaleString()}})}else i.textContent=String(e.value)}let S=0;function te(e){const t=document.getElementById("osc-path");if(!t)return;const r=200,o=30,a=8+e*18,i=1.5+e*6,l=Date.now()/300;let d=`M 0 ${o}`;for(let c=0;c<=r;c+=1.5){const u=o+Math.sin(c/r*Math.PI*2*i+l)*a+Math.sin(c/r*Math.PI*4*i+l*1.3)*(a*.3);d+=` L ${c} ${u}`}t.setAttribute("d",d)}function A(e){e!==V&&(V=e,document.querySelectorAll(".ch-dot").forEach((t,r)=>{t.classList.toggle("active",r===e)}))}const oe=window.innerWidth<768;function re(){if(O)return;O=!0,gsap.registerPlugin(ScrollTrigger),gsap.to("#chapter-nav",{opacity:1,duration:.6,delay:.5}),gsap.to("#telemetry",{opacity:1,duration:.8,delay:.7}),Y(),ScrollTrigger.create({trigger:"body",start:"top top",end:"bottom bottom",scrub:!0,onUpdate(o){const a=document.getElementById("progress-bar");a&&(a.style.width=o.progress*100+"%")}}),gsap.timeline().from("#hero-title",{y:100,opacity:0,duration:1.1,ease:"power3.out"}).to("#hero-eyebrow",{opacity:1,duration:.6,ease:"power2.out"},"-=0.5").to("#hero-subtitle",{opacity:1,duration:.6,ease:"power2.out"},"-=0.3").to("#hero-bg",{opacity:.18,duration:1.6,ease:"power2.out"},"-=0.8").to(["#hero-line-l","#hero-line-r"],{opacity:1,duration:.8,ease:"power2.out"},"-=1").to("#hero-coords",{opacity:1,duration:.6,ease:"power2.out"},"-=0.4"),gsap.to("#scroll-line",{opacity:1,delay:1.2}),Z(),ScrollTrigger.create({trigger:"#chapters-container",start:"top 88%",onEnter:()=>{gsap.to("#hero-title",{y:-70,scale:.24,transformOrigin:"top left",x:-110,duration:.55,ease:"power2.inOut"}),gsap.to(["#hero-subtitle","#hero-scroll","#hero-eyebrow","#hero-line-l","#hero-line-r","#hero-coords"],{opacity:0,duration:.25}),gsap.to("#nav-logo",{opacity:1,duration:.4}),gsap.to("#chapter-nav",{opacity:1,duration:.4})},onLeaveBack:()=>{gsap.to("#hero-title",{y:0,scale:1,x:0,duration:.55,ease:"power2.inOut"}),gsap.to(["#hero-subtitle","#hero-scroll","#hero-eyebrow"],{opacity:1,duration:.4}),gsap.to(["#hero-line-l","#hero-line-r","#hero-coords"],{opacity:1,duration:.4}),gsap.to("#nav-logo",{opacity:0,duration:.3}),A(-1)}});const t=document.getElementById("hero-title");function r(){t&&(t.classList.add("glitching"),setTimeout(()=>t.classList.remove("glitching"),100),setTimeout(r,2800+Math.random()*4e3))}setTimeout(r,2e3),oe?ie():ae()}function ie(){b.forEach((e,t)=>{const r=document.getElementById(`chapter-${e.id}`);r&&ScrollTrigger.create({trigger:r,start:"top 70%",onEnter:()=>{A(t);const o=document.getElementById(`${e.id}-hero`);o&&gsap.to(o,{opacity:1,duration:.8}),v(),e.specs.forEach((a,i)=>W(a,i*.15))}})})}function ae(){b.forEach((e,t)=>{const r=document.getElementById(`chapter-${e.id}`);if(!r)return;const o=document.getElementById(`inner-${e.id}`),a=document.getElementById(`${e.id}-hero`),i=document.getElementById(`${e.id}-side`),l=document.getElementById(`${e.id}-top`),d=document.getElementById(`label-${e.id}`),c=document.getElementById(`cam-${e.id}`),u=document.getElementById(`flash-${e.id}`);let m=!1,I=-1;ScrollTrigger.create({trigger:r,start:"top top",end:"+=100%",pin:!0,anticipatePin:1,scrub:1.2,onEnter:()=>A(t),onEnterBack:()=>A(t),onUpdate(j){const s=j.progress;if(d){const n=s<.06?s/.06:s>.94?(1-s)/.06:1;gsap.set(d,{opacity:n})}let p=0;if(a&&i&&l)if(s<=.05)gsap.set(a,{opacity:s/.05}),gsap.set([i,l],{opacity:0}),gsap.set(o,{scale:1,transformOrigin:e.origin}),p=0;else if(s<=.33){gsap.set(a,{opacity:1}),gsap.set([i,l],{opacity:0});const n=1+(s-.05)/.28*.45;gsap.set(o,{scale:n,transformOrigin:e.origin}),p=0}else if(s<=.36){const n=(s-.33)/.03;gsap.set(a,{opacity:1-n}),gsap.set(i,{opacity:n}),gsap.set(l,{opacity:0}),gsap.set(o,{scale:1.45,transformOrigin:e.origin}),p=1,u&&n<.05&&gsap.to(u,{opacity:1,duration:.04,yoyo:!0,repeat:1})}else if(s<=.66){gsap.set([a,l],{opacity:0}),gsap.set(i,{opacity:1});const n=1.45+(s-.36)/.3*.4;gsap.set(o,{scale:n,transformOrigin:e.origin}),p=1}else if(s<=.69){const n=(s-.66)/.03;gsap.set(i,{opacity:1-n}),gsap.set(l,{opacity:n}),gsap.set(a,{opacity:0}),gsap.set(o,{scale:1.85,transformOrigin:e.origin}),p=2,u&&n<.05&&gsap.to(u,{opacity:1,duration:.04,yoyo:!0,repeat:1})}else if(s<=.95){gsap.set([a,i],{opacity:0}),gsap.set(l,{opacity:1});const n=1.85+(s-.69)/.26*.2;gsap.set(o,{scale:n,transformOrigin:e.origin}),p=2}else{const n=(s-.95)/.05;gsap.set(l,{opacity:1-n}),gsap.set(a,{opacity:n}),gsap.set(o,{scale:2.05,transformOrigin:e.origin}),p=0}if(c&&p!==I&&(I=p,gsap.to(c,{opacity:0,duration:.12,onComplete:()=>{c.textContent="CAM: "+e.camAngles[p],gsap.to(c,{opacity:1,duration:.2})}})),c){const n=s>=.08&&s<=.92?1:0;parseFloat(c.style.opacity||"1")!==n&&gsap.to(c,{opacity:n,duration:.2})}if(e.specs.length>0&&(s>=.33&&!m&&(m=!0,v(),e.specs.forEach((n,g)=>W(n,g*.18))),s<.28&&m&&(m=!1,v())),e.id==="engine"){const n=document.getElementById("oscilloscope");if(n){const g=s>=.45?Math.min((s-.45)/.12,1):0;if(gsap.set(n,{opacity:g}),g>0){cancelAnimationFrame(S);const w=()=>{te(s),S=requestAnimationFrame(w)};w()}else cancelAnimationFrame(S)}}if(e.id==="wheels"&&i)if(s>=.33&&s<=.45){const n=(1-(s-.33)/.12)*-200;gsap.set(i,{rotation:n,transformOrigin:"50% 50%"})}else s>.45&&gsap.set(i,{rotation:0});if(e.id==="full"){const n=document.getElementById("full-reveal-grid"),g=document.getElementById("stats-bar"),w=document.getElementById("cta-btn");n&&gsap.set(n,{opacity:s>=.42?Math.min((s-.42)/.2,1):0,y:s>=.42?0:24}),g&&gsap.set(g,{y:s>=.58?0:"100%"}),w&&gsap.set(w,{opacity:s>=.7?Math.min((s-.7)/.15,1):0}),!m&&s>=.5&&(m=!0,v())}}})})}function le(){const e=document.getElementById("cta-btn");e&&e.addEventListener("click",()=>{U(1.5);const t=e.getBoundingClientRect();for(let i=0;i<18;i++){const l=document.createElement("div"),d=2+Math.random()*3;Object.assign(l.style,{position:"fixed",width:`${d}px`,height:`${d}px`,background:i%3===0?"#FF4A00":"#C8A96E",borderRadius:"50%",left:`${t.left+t.width/2}px`,top:`${t.top+t.height/2}px`,pointerEvents:"none",zIndex:"9999"}),document.body.appendChild(l),gsap.to(l,{x:(Math.random()-.5)*120,y:(Math.random()-.5)*80,opacity:0,duration:.6+Math.random()*.4,ease:"power2.out",onComplete:()=>l.remove()})}const r=["════════════════════════════════════════","  RAPTOR T1+ KINETIC SPEC SHEET 2026","════════════════════════════════════════","","01 / CHASSIS","  Material:      Chromoly Steel 4130","  Weight:        180 kg","  Roll Cage:     FIA T1 Certified","  Construction:  Fully Triangulated","","02 / POWERTRAIN","  Output:        750 BHP","  Torque:        920 Nm","  Config:        5.0L V8 Naturally Aspirated","  Redline:       7,200 RPM","","03 / SUSPENSION","  Brand:         FOX 2.5 Live Valve","  Front Travel:  380 mm","  Rear Travel:   410 mm","  Type:          Independent Front / Solid Rear","","04 / WHEELS & TYRES","  Rim:           17″ BBS Forged Alloy","  Tyre:          37×12.5 R17","  Brand:         BF Goodrich All-Terrain T/A KR3","  Weight:        32 kg / Corner","","05 / BODY & LIVERY","  Material:      Full Carbon Fibre","  Aero:          Active Front Splitter","  Weight Saving: 47 kg vs Steel","  Livery:        Matte Black / Orange Race Stripe","","════════════════════════════════════════"].join(`
`),o=new Blob([r],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(o),a.download="raptor-t1plus-spec-sheet.txt",a.click()})}function se(){const e=document.getElementById("cursor"),t=document.getElementById("cursor-dot");if(!e||!t)return;let r=0,o=0,a=0,i=0;document.addEventListener("mousemove",d=>{r=d.clientX,o=d.clientY,t.style.left=r+"px",t.style.top=o+"px"});function l(){a+=(r-a)*.12,i+=(o-i)*.12,e.style.left=a+"px",e.style.top=i+"px",requestAnimationFrame(l)}l(),document.querySelectorAll("button,a,.ch-dot").forEach(d=>{d.addEventListener("mouseenter",()=>gsap.to(e,{scale:1.8,duration:.2})),d.addEventListener("mouseleave",()=>gsap.to(e,{scale:1,duration:.2}))})}function ne(){const e=document.getElementById("audio-btn");e&&(e.addEventListener("click",()=>{G?(ee(),e.classList.remove("active"),e.textContent="▶ ENGINE"):(J(),e.classList.add("active"),e.textContent="◼ ENGINE")}),document.querySelectorAll(".chapter").forEach(t=>{t.addEventListener("mouseenter",()=>U(1))}))}function de(){document.querySelectorAll(".ch-dot").forEach((e,t)=>{e.addEventListener("click",()=>{const r=b[t],o=document.getElementById(`chapter-${r.id}`);o&&o.scrollIntoView({behavior:"smooth"})})})}let N=!1;function R(){N||(N=!0,clearInterval(H),gsap.to("#loading",{opacity:0,duration:.7,ease:"power2.inOut",onComplete:()=>{const e=document.getElementById("loading");e&&(e.style.display="none"),setTimeout(()=>{re(),le()},200)}}))}async function ce(e){const t=L.length;let r=0;for(const o of L){const a=e[o]??null;B[o]=a,P(o,a),r++,F(r/t*100),E(`${r} / ${t} renders loaded`),await new Promise(i=>setTimeout(i,60))}}async function he(e){K(),se(),ne(),de(),$();const t=document.getElementById("loading-skip");t&&(t.addEventListener("click",R),setTimeout(()=>gsap.to(t,{opacity:1,duration:.5}),4e3)),e?(x("Loading renders…"),ce(e).then(()=>{x("BUILD COMPLETE."),E("All 18 renders loaded."),F(100),setTimeout(R,120)})):z().then(()=>{x("BUILD COMPLETE."),E("All 18 renders finalised."),F(100),setTimeout(R,120)})}const pe={"chassis/hero":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#060606">
  <defs>
    <!-- Orange underbody glow -->
    <radialGradient id="underglow" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#FF4A00" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
    </radialGradient>
    <!-- Tube glow -->
    <filter id="orangeGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="strongGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Grid pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0L0 0 0 40" fill="none" stroke="#0a1a2a" stroke-width="0.5"/>
    </pattern>
    <!-- Chrome tube gradient -->
    <linearGradient id="tubeHL" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E8E8" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#C8A96E" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="tubeHL2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#E8E8E8" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#C8A96E" stop-opacity="0.3"/>
    </linearGradient>
    <!-- Floor glow -->
    <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FF2200" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="chassisFloor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a0800"/>
      <stop offset="100%" stop-color="#0a0400"/>
    </linearGradient>
    <linearGradient id="sidePanel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#1a0800"/>
    </linearGradient>
  </defs>

  <!-- Background grid -->
  <rect width="1200" height="675" fill="#060606"/>
  <rect width="1200" height="675" fill="url(#grid)" opacity="0.6"/>

  <!-- Technical annotation lines -->
  <line x1="0" y1="50" x2="1200" y2="50" stroke="#0a2040" stroke-width="0.5" opacity="0.5"/>
  <line x1="0" y1="625" x2="1200" y2="625" stroke="#0a2040" stroke-width="0.5" opacity="0.5"/>
  <line x1="50" y1="0" x2="50" y2="675" stroke="#0a2040" stroke-width="0.5" opacity="0.5"/>
  <line x1="1150" y1="0" x2="1150" y2="675" stroke="#0a2040" stroke-width="0.5" opacity="0.5"/>

  <!-- Blueprint crosshairs -->
  <line x1="600" y1="20" x2="600" y2="655" stroke="#0a3060" stroke-width="0.4" stroke-dasharray="4,8"/>
  <line x1="20" y1="337" x2="1180" y2="337" stroke="#0a3060" stroke-width="0.4" stroke-dasharray="4,8"/>

  <!-- Underbody orange glow -->
  <ellipse cx="580" cy="530" rx="480" ry="120" fill="url(#underglow)"/>

  <!-- ============================================ -->
  <!-- CHASSIS FLOOR/FRAME RAILS - FOUNDATION -->
  <!-- ============================================ -->

  <!-- Left frame rail - bottom -->
  <path d="M 160 480 L 900 480 L 980 460 L 980 430" 
        fill="none" stroke="#E8E8E8" stroke-width="3" opacity="0.7"/>
  <!-- Left frame rail top face -->
  <path d="M 160 470 L 900 470 L 980 450 L 980 430 L 980 435 L 900 455 L 160 455 Z" 
        fill="#1a1000" stroke="#C8A96E" stroke-width="1"/>

  <!-- Right frame rail - bottom -->
  <path d="M 220 510 L 920 510 L 1000 490 L 1000 455" 
        fill="none" stroke="#E8E8E8" stroke-width="3" opacity="0.5"/>
  <!-- Right frame rail top face -->
  <path d="M 220 500 L 920 500 L 1000 480 L 1000 455 L 1000 460 L 920 490 L 220 490 Z" 
        fill="#130c00" stroke="#C8A96E" stroke-width="1" opacity="0.8"/>

  <!-- Frame rail inner glow lines -->
  <line x1="165" y1="462" x2="898" y2="462" stroke="#FF4A00" stroke-width="1.5" opacity="0.7"/>
  <line x1="225" y1="492" x2="918" y2="492" stroke="#FF4A00" stroke-width="1.2" opacity="0.5"/>

  <!-- ============================================ -->
  <!-- FRONT CROSSMEMBER / BUMPER HOOP -->
  <!-- ============================================ -->
  <!-- Front bumper crossmember -->
  <path d="M 160 455 L 160 510 L 220 515 L 220 500" 
        fill="#0d0800" stroke="#E8E8E8" stroke-width="2.5"/>
  <path d="M 160 455 L 220 500" stroke="#C8A96E" stroke-width="1.5"/>

  <!-- Front crush zone tubes -->
  <path d="M 160 470 L 80 440 L 80 400" stroke="#E8E8E8" stroke-width="3" fill="none" filter="url(#softGlow)"/>
  <path d="M 220 490 L 120 455 L 120 415" stroke="#E8E8E8" stroke-width="2.5" fill="none" opacity="0.7"/>
  <!-- Front skid plate -->
  <path d="M 80 430 L 80 460 L 160 490 L 160 465 Z" fill="#0d0800" stroke="#FF4A00" stroke-width="1.5"/>
  <line x1="82" y1="445" x2="158" y2="475" stroke="#FF4A00" stroke-width="0.8" opacity="0.6"/>

  <!-- ============================================ -->
  <!-- MAIN ROLL CAGE - A PILLARS -->
  <!-- ============================================ -->

  <!-- A-pillar Left (front-left, main view) -->
  <path d="M 280 480 L 230 200 L 280 180" 
        fill="none" stroke="#E8E8E8" stroke-width="5" filter="url(#softGlow)"/>
  <path d="M 280 480 L 230 200 L 280 180" 
        fill="none" stroke="#FF4A00" stroke-width="1.5" opacity="0.8"/>

  <!-- A-pillar Right (rear-right perspective) -->
  <path d="M 430 490 L 380 210 L 440 190" 
        fill="none" stroke="#E8E8E8" stroke-width="4.5" opacity="0.8" filter="url(#softGlow)"/>
  <path d="M 430 490 L 380 210 L 440 190" 
        fill="none" stroke="#FF4A00" stroke-width="1.2" opacity="0.6"/>

  <!-- A-pillar tube highlights -->
  <path d="M 278 478 L 228 202" stroke="#C8A96E" stroke-width="1" opacity="0.9"/>
  <path d="M 283 482 L 233 198" stroke="#FF4A00" stroke-width="0.8" opacity="0.5"/>

  <!-- ============================================ -->
  <!-- B PILLARS / MAIN HOOP -->
  <!-- ============================================ -->

  <!-- B-pillar Left -->
  <path d="M 530 485 L 510 190 L 570 165" 
        fill="none" stroke="#E8E8E8" stroke-width="5.5" filter="url(#softGlow)"/>
  <path d="M 530 485 L 510 190 L 570 165" 
        fill="none" stroke="#FF4A00" stroke-width="2" opacity="0.7"/>

  <!-- B-pillar Right -->
  <path d="M 680 495 L 660 205 L 730 180" 
        fill="none" stroke="#E8E8E8" stroke-width="5" opacity="0.75" filter="url(#softGlow)"/>
  <path d="M 680 495 L 660 205 L 730 180" 
        fill="none" stroke="#FF4A00" stroke-width="1.5" opacity="0.6"/>

  <!-- Main hoop top bar -->
  <path d="M 510 190 L 570 165 L 730 180 L 660 205 Z" 
        fill="#100800" stroke="#E8E8E8" stroke-width="4"/>
  <path d="M 515 192 L 572 168 L 728 182 L 662 207 Z" 
        fill="none" stroke="#FF4A00" stroke-width="1.5" opacity="0.7"/>
  <path d="M 520 192 L 726 183" stroke="#C8A96E" stroke-width="1" opacity="0.8"/>

  <!-- ============================================ -->
  <!-- C PILLARS / REAR HOOP -->
  <!-- ============================================ -->

  <!-- C-pillar Left -->
  <path d="M 800 480 L 790 205 L 850 180" 
        fill="none" stroke="#E8E8E8" stroke-width="5" filter="url(#softGlow)"/>
  <path d="M 800 480 L 790 205 L 850 180" 
        fill="none" stroke="#FF4A00" stroke-width="1.8" opacity="0.65"/>

  <!-- C-pillar Right -->
  <path d="M 930 488 L 920 215 L 990 190" 
        fill="none" stroke="#E8E8E8" stroke-width="4.5" opacity="0.7" filter="url(#softGlow)"/>
  <path d="M 930 488 L 920 215 L 990 190" 
        fill="none" stroke="#FF4A00" stroke-width="1.4" opacity="0.55"/>

  <!-- Rear hoop top bar -->
  <path d="M 790 205 L 850 180 L 990 190 L 920 215 Z" 
        fill="#100800" stroke="#E8E8E8" stroke-width="4"/>
  <path d="M 794 207 L 852 183 L 988 192 L 922 217 Z" 
        fill="none" stroke="#FF4A00" stroke-width="1.5" opacity="0.7"/>
  <path d="M 797 207 L 985 193" stroke="#C8A96E" stroke-width="1" opacity="0.8"/>

  <!-- ============================================ -->
  <!-- ROOF BARS - LONGITUDINAL -->
  <!-- ============================================ -->

  <!-- Roof bar left side (driver's side) -->
  <path d="M 230 200 L 510 190 L 790 205" 
        fill="none" stroke="#E8E8E8" stroke-width="4" filter="url(#softGlow)"/>
  <path d="M 230 200 L 510 190 L 790 205" 
        fill="none" stroke="#FF4A00" stroke-width="1.5" opacity="0.75"/>

  <!-- Roof bar right side -->
  <path d="M 380 210 L 660 205 L 920 215" 
        fill="none" stroke="#E8E8E8" stroke-width="3.5" opacity="0.7" filter="url(#softGlow)"/>
  <path d="M 380 210 L 660 205 L 920 215" 
        fill="none" stroke="#FF4A00" stroke-width="1.3" opacity="0.6"/>

  <!-- Roof top surface fill -->
  <path d="M 230 200 L 380 210 L 660 205 L 510 190 Z" 
        fill="#0d0700" stroke="#C8A96E" stroke-width="1" opacity="0.8"/>
  <path d="M 510 190 L 660 205 L 920 215 L 790 205 Z" 
        fill="#0a0600" stroke="#C8A96E" stroke-width="1" opacity="0.7"/>

  <!-- Roof diagonal braces -->
  <line x1="370" y1="197" x2="520" y2="192" stroke="#C8A96E" stroke-width="1.5" opacity="0.6"/>
  <line x1="650" y1="204" x2="800" y2="207" stroke="#C8A96E" stroke-width="1.5" opacity="0.6"/>
  <!-- Roof cross bar -->
  <line x1="445" y1="198" x2="590" y2="196" stroke="#E8E8E8" stroke-width="2.5" opacity="0.6"/>
  <line x1="717" y1="208" x2="860" y2="210" stroke="#E8E8E8" stroke-width="2.5" opacity="0.5"/>

  <!-- ============================================ -->
  <!-- WINDSHIELD HOOP / A-TOP BAR -->
  <!-- ============================================ -->
  <path d="M 230 200 L 280 180 L 440 190 L 380 210 Z" `,"chassis/side":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#060606">
  <defs>
    <radialGradient id="orangeGlow" cx="15%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="frontGlow" cx="20%" cy="50%" r="40%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="wheelGrad" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#080808"/>
    </radialGradient>
    <radialGradient id="rimGrad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FF6820"/>
      <stop offset="60%" stop-color="#FF4A00"/>
      <stop offset="100%" stop-color="#8B2200"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="strongGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="tick" markerWidth="4" markerHeight="8" refX="2" refY="4" orient="auto">
      <line x1="2" y1="0" x2="2" y2="8" stroke="#C8A96E" stroke-width="1.5"/>
    </marker>
    <linearGradient id="tubeOrange" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF6820"/>
      <stop offset="30%" stop-color="#FF4A00" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#8B2200" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="tubeWhite" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E8E8E8"/>
      <stop offset="40%" stop-color="#B0B0B0"/>
      <stop offset="100%" stop-color="#606060"/>
    </linearGradient>
    <linearGradient id="tubeGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E8C47A"/>
      <stop offset="50%" stop-color="#C8A96E"/>
      <stop offset="100%" stop-color="#7A5A2A"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f0a06"/>
      <stop offset="100%" stop-color="#060606"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  <rect width="1200" height="675" fill="url(#orangeGlow)"/>

  <!-- Ground line -->
  <line x1="60" y1="540" x2="1160" y2="540" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,8"/>
  <line x1="60" y1="541" x2="1160" y2="541" stroke="#FF4A00" stroke-width="0.5" stroke-opacity="0.3"/>

  <!-- Grid lines subtle -->
  <line x1="60" y1="200" x2="1160" y2="200" stroke="#0d0d0d" stroke-width="0.5"/>
  <line x1="60" y1="350" x2="1160" y2="350" stroke="#0d0d0d" stroke-width="0.5"/>
  <line x1="60" y1="450" x2="1160" y2="450" stroke="#0d0d0d" stroke-width="0.5"/>

  <!-- ======================== WHEELS ======================== -->

  <!-- FRONT WHEEL -->
  <!-- Outer tire -->
  <circle cx="290" cy="460" r="105" fill="none" stroke="#1a1a1a" stroke-width="32"/>
  <circle cx="290" cy="460" r="105" fill="none" stroke="url(#rimGrad)" stroke-width="2" filter="url(#strongGlow)"/>
  <circle cx="290" cy="460" r="121" fill="none" stroke="#FF4A00" stroke-width="1.5" filter="url(#glow)"/>
  <!-- Tire sidewall detail -->
  <circle cx="290" cy="460" r="116" fill="none" stroke="#222" stroke-width="2"/>
  <circle cx="290" cy="460" r="112" fill="none" stroke="#111" stroke-width="3"/>
  <circle cx="290" cy="460" r="89" fill="none" stroke="#FF4A00" stroke-width="1" stroke-opacity="0.6"/>

  <!-- Rim face -->
  <circle cx="290" cy="460" r="88" fill="url(#wheelGrad)"/>
  <circle cx="290" cy="460" r="88" fill="none" stroke="#FF4A00" stroke-width="1.5" filter="url(#glow)"/>

  <!-- Rim spokes -->
  <g stroke="#C8A96E" stroke-width="2.5" fill="none" filter="url(#subtleGlow)">
    <line x1="290" y1="372" x2="290" y2="548"/>
    <line x1="202" y1="460" x2="378" y2="460"/>
    <line x1="228" y1="398" x2="352" y2="522"/>
    <line x1="228" y1="522" x2="352" y2="398"/>
    <line x1="207" y1="430" x2="373" y2="490"/>
    <line x1="207" y1="490" x2="373" y2="430"/>
  </g>
  <!-- Rim inner ring -->
  <circle cx="290" cy="460" r="55" fill="none" stroke="#C8A96E" stroke-width="1.5"/>
  <circle cx="290" cy="460" r="35" fill="none" stroke="#FF4A00" stroke-width="1" stroke-opacity="0.8"/>
  <circle cx="290" cy="460" r="20" fill="#0a0a0a" stroke="#C8A96E" stroke-width="2"/>
  <!-- Hub center -->
  <circle cx="290" cy="460" r="12" fill="#111" stroke="#FF4A00" stroke-width="1.5"/>
  <circle cx="290" cy="460" r="5" fill="#FF4A00"/>
  <!-- Lug bolts -->
  <g fill="#C8A96E">
    <circle cx="290" cy="425" r="4"/>
    <circle cx="290" cy="495" r="4"/>
    <circle cx="255" cy="460" r="4"/>
    <circle cx="325" cy="460" r="4"/>
    <circle cx="266" cy="436" r="4"/>
    <circle cx="314" cy="484" r="4"/>
    <circle cx="266" cy="484" r="4"/>
    <circle cx="314" cy="436" r="4"/>
  </g>
  <!-- Tire tread marks -->
  <g stroke="#333" stroke-width="1" fill="none">
    <path d="M 185 430 Q 190 420 200 415"/>
    <path d="M 180 460 Q 185 450 192 445"/>
    <path d="M 185 490 Q 190 480 198 478"/>
    <path d="M 395 430 Q 390 420 382 415"/>
    <path d="M 398 460 Q 393 450 386 445"/>
    <path d="M 395 490 Q 390 480 382 478"/>
  </g>
  <!-- Orange rim light front wheel -->
  <path d="M 170 370 Q 155 460 170 550" stroke="#FF4A00" stroke-width="3" fill="none" filter="url(#strongGlow)"/>
  <path d="M 175 385 Q 162 460 175 535" stroke="#FF6820" stroke-width="1.5" fill="none" stroke-opacity="0.5"/>

  <!-- REAR WHEEL -->
  <circle cx="920" cy="460" r="105" fill="none" stroke="#1a1a1a" stroke-width="32"/>
  <circle cx="920" cy="460" r="105" fill="none" stroke="#882200" stroke-width="1.5"/>
  <circle cx="920" cy="460" r="121" fill="none" stroke="#662200" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="920" cy="460" r="116" fill="none" stroke="#1a1a1a" stroke-width="2"/>
  <circle cx="920" cy="460" r="112" fill="none" stroke="#111" stroke-width="3"/>
  <circle cx="920" cy="460" r="89" fill="none" stroke="#661a00" stroke-width="1" stroke-opacity="0.4"/>
  <circle cx="920" cy="460" r="88" fill="url(#wheelGrad)"/>
  <circle cx="920" cy="460" r="88" fill="none" stroke="#882200" stroke-width="1"/>
  <g stroke="#7A5A2A" stroke-width="2" fill="none">
    <line x1="920" y1="372" x2="920" y2="548"/>
    <line x1="832" y1="460" x2="1008" y2="460"/>
    <line x1="858" y1="398" x2="982" y2="522"/>
    <line x1="858" y1="522" x2="982" y2="398"/>
    <line x1="837" y1="430" x2="1003" y2="490"/>
    <line x1="837" y1="490" x2="1003" y2="430"/>
  </g>
  <circle cx="920" cy="460" r="55" fill="none" stroke="#7A5A2A" stroke-width="1"/>
  <circle cx="920" cy="460" r="35" fill="none" stroke="#661a00" stroke-width="1" stroke-opacity="0.6"/>
  <circle cx="920" cy="460" r="20" fill="#0a0a0a" stroke="#7A5A2A" stroke-width="1.5"/>
  <circle cx="920" cy="460" r="12" fill="#111" stroke="#882200" stroke-width="1"/>
  <circle cx="920" cy="460" r="5" fill="#882200"/>
  <g fill="#7A5A2A">
    <circle cx="920" cy="425" r="3.5"/>
    <circle cx="920" cy="495" r="3.5"/>
    <circle cx="885" cy="460" r="3.5"/>
    <circle cx="955" cy="460" r="3.5"/>
    <circle cx="896" cy="436" r="3.5"/>
    <circle cx="944" cy="484" r="3.5"/>
    <circle cx="896" cy="484" r="3.5"/>
    <circle cx="944" cy="436" r="3.5"/>
  </g>
  <!-- Subtle rim light rear -->
  <path d="M 800 370 Q 788 460 800 550" stroke="#FF4A00" stroke-width="1.5" fill="none" stroke-opacity="0.3" filter="url(#glow)"/>

  <!-- ======================== MAIN CHASSIS RAILS ======================== -->
  <!-- Lower rail -->
  <rect x="175" y="420" width="770" height="18" fill="#0d0d0d" stroke="none"/>
  <line x1="175" y1="420" x2="945" y2="420" stroke="url(#tubeWhite)" stroke-width="3"/>
  <line x1="175" y1="438" x2="945" y2="438" stroke="#606060" stroke-width="2"/>
  <!-- Orange glow on left edge lower rail -->
  <line x1="175" y1="420" x2="320" y2="420" stroke="#FF4A00" stroke-width="2" filter="url(#glow)"/>
  <line x1="175" y1="438" x2="320" y2="438" stroke="#FF4A00" stroke-width="1" stroke-opacity="0.5" filter="url(#glow)"/>

  <!-- Upper rail front section -->
  <line x1="320" y1="240" x2="870" y2="240" stroke="url(#tubeWhite)" stroke-width="3"/>
  <line x1="320" y1="258" x2="870" y2="258" stroke="#404040" stroke-width="2"/>
  <line x1="320" y1="240" x2="480" y2="240" stroke="#FF4A00" stroke-width="2" filter="url(#glow)"/>

  <!-- ======================== FRAME STRUCTURE ======================== -->
  <!-- Front nose tube -->
  <line x1="175" y1="420" x2="200" y2="360" stroke="url(#tubeOrange)" stroke-width="4" filter="url(#glow)"/>
  <line x1="200" y1="360" x2="280" y2="260" stroke="url(#tubeOrange)" stroke-width="4" filter="url(#glow)"/>
  <line x1="280" y1="260" x2="320" y2="240" stroke="url(#tubeOrange)" stroke-width="3.5" filter="url(#glow)"/>
  <!-- Front nose lower -->
  <line x1="175" y1="420" x2="220" y2="420" stroke="#FF4A00" stroke-width="2" filter="url(#strongGlow)"/>
  <!-- Bumper vertical front -->
  <line x1="200" y1="310" x2="200" y2="390" stroke="url(#tubeOrange)" stroke-width="5" filter="url(#glow)"/>
  <line x1="190" y1="300" x2="210" y2="300" stroke="#FF4A00" stroke-width="3" filter="url(#glow)"/>
  <line x1="190" y1="395" x2="`,"chassis/top":`<thinking>
The user wants a hyper-detailed technical SVG illustration of a vehicle chassis from a top-down (bird's eye) view. It should show:
- Full frame layout
- Roll cage overhead view
- Spare tyre mount
- Dark background #060606
- Electric orange #FF4A00 rim lighting and line details
- Gold #C8A96E secondary highlights
- White #E8E8E8 structural lines
- Dense, detailed, visually striking

Let me design this carefully. From top-down view, I'll draw:

1. Main chassis frame (ladder frame or similar)
2. Roll cage bars visible from above
3. Spare tyre mount (rear)
4. Engine bay area (front)
5. Suspension components
6. Cross members
7. Seat positions
8. Dashboard/firewall
9. Various detail lines

The viewBox is 0 0 1200 675, so center would be around 600, 337.

Let me plan the layout:
- Vehicle oriented lengthwise (front at top, rear at bottom)
- Frame rails running along the length
- Cross members connecting them
- Roll cage bars forming a rectangular/cage structure
- Spare tire at the rear

Let me think about proportions. An off-road vehicle chassis:
- Overall length: maybe 900px
- Overall width: maybe 350px
- Centered: x from ~150 to 1050, y from ~50 to 625

Actually let me orient it vertically so the vehicle runs top to bottom (front at top):
- Front of vehicle: y ≈ 80
- Rear of vehicle: y ≈ 595
- Left rail: x ≈ 420
- Right rail: x ≈ 780

Width of vehicle body: about 360px
Length: about 515px

Let me design this more carefully.

Main frame rails (ladder frame):
- Left rail: x=410, from y=90 to y=590
- Right rail: x=790, from y=90 to y=590

Cross members at various positions.

Roll cage from above would show:
- Front hoop bar
- Main hoop (A-pillar, B-pillar, C-pillar positions)
- Roof bars connecting them
- Diagonal bracing

Let me create a detailed SVG:

Frame layout:
- Two main longitudinal rails
- Front bumper/crossmember
- Rear bumper/crossmember  
- Multiple cross members
- Engine cradle/K-frame at front
- Rear axle mounts

Roll cage (top view):
- Rectangular structure slightly narrower than outer body
- Front windshield hoop
- Main cage bars
- Roof crossbars
- Diagonal braces

Spare tire: mounted at rear, circular element

Let me also add:
- Steering rack
- Engine block outline
- Transmission tunnel
- Driveshaft
- Seats (two front, rear bench)
- Dashboard
- Fuel tank
- Battery
- Exhaust routing

This will be quite complex SVG. Let me start building it.

I'll center the vehicle:
- Vehicle center X: 600
- Front tip Y: 75
- Rear tip Y: 610

Frame rails:
- Left outer: x = 430
- Right outer: x = 770
- Frame width: 340px
- Frame length: 535px

Inner frame rails could be at x = 460, x = 740

Let me draft the SVG structure:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Grid overlay -->
  <!-- Grid lines subtle -->
  
  <!-- Main chassis frame -->
  <!-- Left rail -->
  <rect x="415" y="90" width="25" height="495" fill="#1a1a1a" stroke="#E8E8E8" stroke-width="2"/>
  <!-- Right rail -->
  <rect x="760" y="90" width="25" height="495" fill="#1a1a1a" stroke="#E8E8E8" stroke-width="2"/>
  
  <!-- Cross members -->
  ...
</svg>
\`\`\`

Actually, let me think about this more carefully and create a really detailed, visually striking illustration.

I'll use:
- Multiple layers of detail
- Glow effects using filters
- Detailed component outlines
- Labels and technical callouts
- Grid background

Let me plan the full composition:

**Background:**
- Dark #060606
- Subtle grid lines
- Technical border/frame

**Main chassis (top-down):**

The vehicle will be centered, running top (front) to bottom (rear).

Main frame:
- Left rail: rect from ~(415, 95) to (440, 590) 
- Right rail: rect from ~(760, 95) to (785, 590)

**Front section (y: 95-200):**
- Front bumper/crossmember (y≈95)
- Front suspension pickup points
- Engine bay outline
- Steering rack

**Cabin section (y: 200-430):**
- Firewall (y≈210)
- Roll cage plan view
- Seats
- Dashboard
- Transmission tunnel
- B-pillars (y≈300 area)

**Rear section (y: 430-590):**
- Rear seat area
- Fuel tank
- Rear axle
- Spare tire mount
- Rear bumper

Let me now write the actual SVG. I'll make it very detailed.

For the roll cage top view, I'll show:
- A-pillar positions (front corners of cabin)
- B-pillar positions (door pillars)
- C-pillar positions (rear corners)
- Roof rails connecting them
- Diagonal roof braces
- Overhead bars

Colors:
- Main frame: #E8E8E8 lines on dark fill
- Roll cage: #FF4A00 with glow effect
- Highlights/details: #C8A96E
- Background frame/grid: very dark

Let me write the SVG now. I'll be methodical.

Vehicle dimensions in SVG coordinates:
- Total length: 530px (y: 75 to 605)
- Frame width outside: 340px (x: 430 to 770)
- Roll cage inner width: 280px (x: 460 to 740)

Key Y positions:
- y=75: Front bumper face
- y=100: Front crossmember
- y=130: Front suspension upper mounts
- y=175: Firewall/engine rear
- y=200: A-pillar base (dashboard)
- y=220: Front seats front edge
- y=280: Front seat back
- y=310: B-pillar
- y=360: Rear seat front
- y=420: Rear seat back / C-pillar
- y=450: Rear cargo floor
- y=500: Spare tire mount area
- y=555: Rear bumper inner
- y=580: Rear bumper face

Key X positions:
- x=430: Left outer frame rail outer edge
- x=458: Left outer frame rail inner edge
- x=490: Left inner structure
- x=530: Left interior wall
- x=600: Centerline
- x=670: Right interior wall
- x=710: Right inner structure
- x=742: Right outer frame rail inner edge
- x=770: Right outer frame rail outer edge

Actually, let me simplify and just make it look great. I'll use path elements for more organic shapes.

Let me write the complete SVG now:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- Orange glow filter -->
    <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="orangeGlow2" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="whiteGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <!-- Grid pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" stroke-width="0.5"/>
    </pattern>
    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0d0d0d" stroke-width="0.3"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  <rect width="1200" height="675" fill="url(#smallGrid)"/>
  <rect width="1200" height="675" fill="url(#grid)"/>
  
  <!-- Technical border -->
  <rect x="10" y="10" width="1180" height="655" fill="none" stroke="#FF4A00" stroke-width="1" opacity="0.4"/>
  <rect x="15" y="15" width="1170" height="645" fill="none" stroke="#C8A96E" stroke-width="0.5" opacity="0.3"/>
  
  <!-- Corner tick marks -->
  <line x1="10" y1="50" x2="10" y2="10" stroke="#FF4A00" stroke-width="2"/>
  <line x1="10" y1="10" x2="50" y2="10" stroke="#FF4A00" stroke-width="2"/>
  <line x1="1190" y1="50" x2="1190" y2="10" stroke="#FF4A00" stroke-width="2"/>
  <line x1="1190" y1="10" x2="1150" y2="10" stroke="#FF4A00" stroke-width="2"/>
  <!-- bottom corners -->
  <line x1="10" y1="625" x2="10" y2="665" stroke="#FF4A00" stroke-width="2"/>
  <line x1="10" y1="665" x2="50" y2="665" stroke="#FF4A00" stroke-width="2"/>
  <line x1="1190" y1="625" x2="1190" y2="665" stroke="#FF4A00" stroke-width="2"/>
  <line x1="1190" y1="665" x2="1150" y2="665" stroke="#FF4A00" stroke-width="2"/>

  <!-- Title/Labels -->
  <text x="600" y="42" text-anchor="middle" font-family="monospace" font-size="11" fill="#C8A96E" letter-spacing="4">CHASSIS ASSEMBLY — TOP VIEW — SCALE 1:24</text>
  <text x="30" y="42" font-family="monospace" font-size="9" fill="#FF4A00" opacity="0.7">DWG-001-PLAN</text>
  <text x="1170" y="42" text-anchor="end" font-family="monospace" font-size="9" fill="#FF4A00" opacity="0.7">REV-03</text>

  <!-- ============================================ -->
  <!-- MAIN CHASSIS FRAME -->
  <!-- ============================================ -->
  
  <!-- Shadow/glow base for frame -->
  
  <!-- Left main frame rail - outer -->
  <rect x="415" y="88" width="30" height="508" fill="#0f0f0f" stroke="#E8E8E8" stroke-width="1.5"/>
  <!-- Left rail highlight -->
  <rect x="416" y="89" width="4" height="506" fill="#FF4A00" opacity="0.3"/>
  
  <!-- Right main frame rail - outer -->
  <rect x="755" y="88" width="30" height="508" fill="#0f0f0f" stroke="#E8E8E8" stroke-width="1.5"/>
  <!-- Right rail highlight -->
  <rect x="780" y="89" width="4" height="506" fill="#FF4A00" opacity="0.3"/>

  <!-- Front bumper crossmember -->
  <rect x="415" y="78" width="370" height="18" rx="3" fill="#161616" stroke="#E8E8E8" stroke-width="1.5"/>
  <!-- Front bumper detail lines -->
  <line x1="450" y1="78" x2="450" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.6"/>
  <line x1="500" y1="78" x2="500" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.6"/>
  <line x1="550" y1="78" x2="550" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.6"/>
  <line x1="600" y1="78" x2="600" y2="96" stroke="#FF4A00" stroke-width="1" opacity="0.8"/>
  <line x1="650" y1="78" x2="650" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.6"/>
  <line x1="700" y1="78" x2="700" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.6"/>
  <line x1="750" y1="78" x2="750" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.6"/>
  
  <!-- Front tow hook points -->
  <rect x="430" y="68" width="20" height="18" rx="2" fill="#0f0f0f" stroke="#FF4A00" stroke-width="1.5"/>
  <rect x="750" y="68" width="20" height="18" rx="2" fill="#0f0f0f" stroke="#FF4A00" stroke-width="1.5"/>
  
  <!-- Front crossmember #1 -->
  <rect x="415" y="125" width="370" height="12" fill="#141414" stroke="#E8E8E8" stroke-width="1"/>
  
  <!-- Front crossmember #2 - engine front -->
  <rect x="415" y="170" width="370" height="14" fill="#141414" stroke="#E8E8E8" stroke-width="1"/>
  
  <!-- Engine bay K-frame / subframe -->
  <!-- Engine bay outline -->
  <rect x="430" y="96" width="340" height="100" fill="#0a0a0a" stroke="#C8A96E" stroke-width="1" stroke-dasharray="4,2"/>
  
  <!-- Engine block top view representation -->
  <rect x="490" y="108" width="220" height="85" rx="4" fill="#111111" stroke="#E8E8E8" stroke-width="1.5"/>
  <!-- Engine block detail - cylinder row -->
  <rect x="498" y="116" width="30" height="70" rx="2" fill="#0d0d0d" stroke="#C8A96E" stroke-width="0.8"/>
  <rect x="533" y="116" width="30" height="70" rx="2" fill="#0d0d0d" stroke="#C8A96E" stroke-width="0.8"/>
  <rect x="568" y="116" width="30" height="70" rx="2" fill="#0d0d0d" stroke="#C8A96E" stroke-width="0.8"/>
  <rect x="603" y="116" width="30" height="70" rx="2" fill="#0d`,"engine/hero":`<thinking>
The user wants a detailed SVG illustration of a V8 rally engine in 3/4 front perspective. Let me create a dense, technical illustration with:
- Dark background #060606
- Electric orange #FF4A00 rim lighting and line details
- Gold #C8A96E for secondary highlights
- White #E8E8E8 for structural lines
- Intake manifold
- Exhaust headers
- Alternator
- Orange heat glow on exhaust ports

Let me plan the layout carefully for a 1200x675 viewBox.

The engine will be centered, slightly left to show the 3/4 perspective. I'll draw:
1. Engine block base (V8 - two banks of 4 cylinders)
2. Cylinder heads on both banks
3. Intake manifold (central, on top)
4. Exhaust headers (tubes curving from each cylinder head)
5. Alternator (side mounted)
6. Various detail elements: bolts, ribs, sensors, wires
7. Heat glow effects on exhaust ports

Let me think about the 3/4 perspective layout:

The V8 engine in 3/4 front view - the viewer is looking at the front-left corner, so we can see:
- Front of engine (timing cover, crankshaft pulley)
- Left bank of cylinders (closer)
- Right bank (partially visible)
- Intake manifold on top
- Exhaust headers on both sides
- Alternator mounted on the left front

Let me start building this SVG. I'll use transforms and careful coordinate planning.

Engine block: roughly centered around x=600, y=400
- The V8 block would be roughly 400px wide, 300px tall in perspective

Let me lay this out:

Engine center: 600, 380

Block body: roughly a trapezoid shape for perspective
- Front face visible
- Top slightly recessed

Let me think about the V configuration:
- Left bank: angled to the left, cylinders going up-left
- Right bank: angled to the right, cylinders going up-right
- V angle: typically 90 degrees for American V8

In 3/4 perspective from front-left:
- We'd see the left bank more prominently
- Right bank partially visible behind
- The front of the engine (timing chain cover, accessories) visible

Let me create a detailed SVG:

I'll structure it as:
1. Background with grid/tech details
2. Engine block (main body)
3. Left cylinder bank
4. Right cylinder bank  
5. Cylinder heads
6. Valve covers
7. Intake manifold (large center piece)
8. Exhaust headers with glow
9. Alternator
10. Front accessories (belt, pulleys)
11. Details: bolts, lines, labels

This is going to be quite complex. Let me write it systematically.

For the 3/4 perspective, I'll use a simple isometric-like approach where:
- X axis goes right and slightly down (for depth)
- Y axis goes straight up
- Z axis goes right and slightly up (for the front-back depth)

Actually, let me just hand-draw this with careful coordinate placement.

Engine block outline (perspective view, looking from front-left corner):
- Main block bottom: trapezoid
- Left bank cylinders: going up at about 15-20 degrees from vertical, leaning left
- Right bank cylinders: going up leaning right

In a typical SBC (small block Chevy) or similar V8:
- Block is roughly rectangular when viewed from front
- Two banks of cylinders angle outward (V shape)

For 3/4 front-left view:
- Front of block visible (front face with timing cover)
- Top left side visible (left cylinder bank)
- Left side of engine block visible
- Right bank cylinders visible from above

Let me just create the SVG with careful path placement.

Starting coordinates:
- Engine block front face: roughly x: 450-780, y: 300-550
- In perspective (3/4 view), the left edge of the block is at about x=380
- Right edge of front face at about x=780
- The right side recedes into depth

Let me create this now. I'll keep it manageable but detailed.

Actually, let me think about this more carefully. For a V8 in 3/4 front perspective:

The main mass of the engine:
- Oil pan at bottom
- Block in middle
- Heads on both sides (V configuration)
- Intake manifold sitting in the V between the heads
- Valve covers on top of each head

Let me define key points:

View angle: looking from about 30-40 degrees to the left of center, slightly elevated

Block bottom (oil pan): 
  - Front face: from (380, 560) to (800, 560)
  - This creates a wide base

Left bank (near side):
  - Cylinders angled up-left
  - More detail visible

Right bank (far side):
  - Partially obscured
  - Less detail

Intake manifold: 
  - Sits between the two banks
  - Large carburetor or throttle body on top
  - Plenum and runners

Exhaust headers:
  - Left side: 4 tubes from exhaust ports, curling down and forward
  - Right side: partially visible

Alternator: front left, belt driven

Let me code this up now. I'll create a substantial SVG:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- Gradients and filters -->
    <radialGradient id="exhaustGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#FF2200" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0"/>
    </radialGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    
    <filter id="hotGlow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    
    <!-- Main block gradient -->
    <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="40%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    
    <linearGradient id="leftBankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#222"/>
      <stop offset="100%" stop-color="#111"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Background grid -->
  ...
  
  <!-- Engine body -->
  ...
</svg>
\`\`\`

Let me think about this more carefully and just write a comprehensive, detailed SVG. The key is to make it look good and technically convincing even if not perfectly accurate in every dimension.

Let me plan the major shapes:

1. **Oil Pan** - bottom of engine, lowest part
2. **Engine Block** - main rectangular body
3. **Left Cylinder Bank** - angled cylinders on left (near) side
4. **Right Cylinder Bank** - angled cylinders on right (far) side
5. **Left Cylinder Head** - flat on top of left bank
6. **Right Cylinder Head** - flat on top of right bank
7. **Left Valve Cover** - rounded top on left head
8. **Right Valve Cover** - rounded top on right head
9. **Intake Manifold** - sits between valve covers on top
10. **Throttle Body/Carb** - on top of intake
11. **Exhaust Headers Left** - 4 tubes from left head ports
12. **Exhaust Headers Right** - partially visible right side
13. **Alternator** - front left, circular
14. **Belt/Pulley System** - front of engine
15. **Timing Cover** - front face of engine
16. **Accessories** - various sensors, hoses, etc.

For the 3/4 view, I'll position things approximately:

Engine center approximately at (620, 400)

Oil pan: trapezoidal shape
- Top edge at y=500, from x=350 to x=800
- Bottom edge at y=570, from x=360 to x=790
- Left face visible (side of oil pan)

Block:
- From y=350 to y=500
- Trapezoid in perspective

This is going to be a complex drawing. Let me write it out systematically. I'll use path data carefully.

Let me try a different approach - build this up component by component with SVG paths.

For the 3/4 perspective (viewpoint from front-left, slightly elevated):

**Engine Block Main Body:**
The front face of the block (visible):
- Rectangle-ish, roughly at center-front
- Let's say front face corners: (430, 320) top-left, (750, 320) top-right, (750, 540) bottom-right, (430, 540) bottom-left

**Left side of block** (near side, angled):
- Top-left to bottom-left with perspective receding

Actually for this to look good in 3/4 view, I need to think about what's visible. In a proper 3/4 view from front-left:

Looking from the front-left corner means we can see:
- The FRONT face of the engine (timing cover)  
- The LEFT SIDE of the engine
- We're looking slightly down from above

The V8 configuration:
- Two banks of 4 cylinders forming a V
- In 3/4 front view, the left bank tilts toward us and the right bank tilts away

Let me simplify and just make it visually impressive. Here's my approach:

I'll draw the engine as seen from about 35° to the right of the front-left corner, slightly elevated. The major visible surfaces will be:
- Front timing cover (front face)
- Left cylinder bank top surface
- Left exhaust headers hanging down
- The valley between banks where intake manifold sits
- Right valve cover partially visible
- Alternator on front-left

Let me write the actual SVG code now:

For a V8, the typical layout viewed from 3/4 front would show:

\`\`\`
         [throttle body / carb]
    [left valve cover]  [right vc]
   [exhaust] [left head] [intake] [right head] [exhaust]
            [block body]
         [oil pan]
[alt] [timing cover/front accessories]
\`\`\`

In perspective this gets compressed and angled.

Let me just go ahead and write a detailed SVG. I'll use approximate coordinates and make sure it looks good visually.

Here's my plan for coordinates (1200x675 canvas):

Engine centered around x=600, positioned in lower-middle area.

The engine in 3/4 view, I'll use a skew to simulate perspective:
- The engine is viewed from front-left
- Objects further away (right side) appear higher and slightly smaller
- Horizontal lines angle slightly upward to the right

Key perspective lines: for every 100px of depth (going right), elements shift up by about 30px.

Let me define a simple perspective transform:
- For x depth of d pixels, y shifts by d * 0.3 upward
- Width appears at about 0.85 scale for depth

Now let me define the engine components in 3D-ish space and project them.

Actually, let me just draw this artistically without strict perspective math. The key is visual impact.

Here are my major shapes:

**ENGINE BLOCK FRONT FACE (timing cover area):**
A polygon roughly from:
(320, 460) → (560, 460) → (560, 310) → (320, 310)
This is the front face of the engine, square-ish

**LEFT SIDE OF BLOCK:**
(180, 550) → (320, 460) → (320, 310) → (180, 380) 
The left side wall

**TOP OF BLOCK (cylinder bank area):**
This is where the V opens up

**LEFT CYLINDER BANK:**
Going up-left from the block
Left bank head sits higher on the left

**RIGHT CYLINDER BANK:**
Going up and back (right)

**INTAKE MANIFOLD:**
The large piece sitting in the valley

OK, let me just write this whole thing. I'll make it visually striking with lots of details.

Here's my comprehensive approach. I'll think of the engine as a 3D box and draw the visible faces:

Engine block (main body):
- Roughly 50cm wide x 40cm tall x 60cm deep in real life
- Scaled to canvas: about 350px wide, 280px tall, 420px deep

3/4 front view from slightly elevated left:
- Front face: left portion of center
- Left side: angled plane going back
- Top: angled plane going back

Let me use actual coordinate positions now and write the code:

I'll work with these major coordinate zones:
- Engine front left corner: (300, 500)
- Engine front right corner: (700, 500)
- Engine top center: (500, 280)

For V8 V configuration, the two banks angle at roughly 45° each from vertical (90° V angle).

OK enough planning, let me write the actual SVG. I'll try to make it as detailed and visually striking as possible within the constraints.

Let me create the SVG in sections:

1. Background and decorative elements
2. Engine block body (lower section)
3. Oil pan
4. Left exhaust headers with heat glow
5. Right exhaust headers  
6. Left cylinder bank with head
7. Right cylinder bank with head
8. Left valve cover
9. Right valve cover
10. Intake manifold
11. Throttle body / air intake
12. Alternator
13. Belt and pulleys
14. Timing chain cover
15. Detail lines, bolts, labels
16. Heat glow effects

Let me start writing. The engine will be in the center-lower portion of the 1200x675 canvas.

For the 3/4 front perspective:
- I'll have the engine tilted about 30° - so we see the front and left side
- The "front" of the engine is the side facing the viewer (timing cover)
- The "left" of the engine shows the exhaust headers and alternator

Engine block dimensions on screen:
- Height (including heads): about 350px  
- Width: about 450px
- Position: centered around (600, 430)

Let me define key anchor points:

Engine block:
- Front bottom-left: (380, 530)
- Front bottom-right: (720, 530)
- Front top-left: (380, 350)  
- Front top-right: (720, 350)
- The "depth" going to the back-right side creates additional faces

Wait - in a proper 3/4 view from front-left, the engine front face would be on the left portion of what we see, and the engine side (with exhaust headers) would be on the right. But actually that depends on the orientation.

Let me reconsider: "3/4 front perspective" typically means we're looking at the front of the engine from a 3/4 angle, so we can see both the front AND one side. The exhaust headers are on the SIDES of the engine. The intake is on TOP.

Standard V8 layout:
- Intake manifold: on top, between cylinder banks
- Exhaust: exits from sides of cylinder heads
- Alternator: typically front-right (from driver's perspective), but varies

For the VIEWER's perspective looking from front-left:
- We see the FRONT face (timing cover, crankshaft pulley, accessories)
- We see the LEFT SIDE (left cylinder head exhaust ports, left headers)
- The RIGHT SIDE headers are visible but partially behind/foreshortened
- The TOP shows the intake manifold, valve covers

Let me now write this SVG. I'll keep the perspective view with:
- Front of engine facing us (slightly to the left)
- Left side of engine visible (the near side to viewer)
- Right side headers visible coming out from behind

Here's my coordinate system:
- Engine front face: roughly x: 350-750, y: 300-560`,"engine/side":`<thinking>
The user wants a detailed SVG of a V8 engine in side elevation with blueprint style, dark background, electric orange rim lighting, gold highlights, white structural lines. Let me create a comprehensive, detailed SVG.

Key elements to include:
- Cam covers (valve covers) - V8 has two banks at angle
- Engine block (cylinder block)
- Sump (oil pan) at bottom
- Oil cooler lines
- Cross-sections with hatching
- Blueprint style with dimension lines, annotations
- Dense technical details

Let me plan the layout:
- V8 engine side view - showing the V configuration
- Left bank and right bank of cylinders
- Cam covers on top of each bank
- Crankshaft at bottom center
- Oil sump below crankshaft
- Timing chain/belt at front
- Oil cooler lines on the side
- Exhaust manifold
- Intake manifold in the V valley

Let me think about the geometry:
- The engine sits in the center of the 1200x675 viewport
- V8 typically has a 90-degree V angle
- Side elevation shows one bank of cylinders prominently with the other bank behind

Actually for a true side elevation of a V8, you'd see:
- The block as a roughly rectangular shape
- The two cylinder heads/cam covers at angles
- The intake manifold between the two cam covers
- The sump at the bottom
- Timing cover at the front (one side)
- Various accessories

Let me create this step by step. I'll make it detailed and technical.

For a V8 side elevation (looking from the front or side):
- In true side elevation, you'd see it from the side, showing:
  - One cylinder bank head (cam cover) visible
  - The block
  - Sump
  - Timing gear at one end

Actually, let me think about this differently. A V8 engine side elevation typically shows:
- The engine block as the central body
- Two valve covers (cam covers) angled outward at the top
- The intake manifold in the valley between them
- Oil pan/sump at the bottom
- Timing cover on one end face
- Various external components

Let me design a comprehensive layout:

The engine center around x=600, y=340

Block: roughly 700px wide, 200px tall
Left bank tilted left, right bank tilted right
Sump below

Let me start coding this:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Grid lines (blueprint style) -->
  <!-- ... fine grid ... -->
  
  <!-- Engine components -->
</svg>
\`\`\`

Let me think more carefully about the actual geometry for a V8 in side elevation.

In a SIDE view (not front view), a V8 engine would show:
- The crankshaft length profile
- All 8 cylinder bores would overlap since they're in line along the crankshaft
- You'd see the external profile of the block, heads, and accessories from the side

So from the side, a V8 looks similar to a straight-4 in terms of the block length, but with two banks of cylinders.

Let me design it as a proper side elevation showing:
- Engine block rectangle
- Two angled cylinder head/cam cover assemblies at top
- Intake manifold in the valley
- Oil sump below
- Front timing cover
- Crankshaft pulley
- Various lines and details

Here's my plan for the SVG layout:

Engine block: x=200 to x=950, y=280 to y=450
Left bank head (tilted left): 
Right bank head (tilted right):
Sump: x=220 to x=930, y=450 to y=560
Front timing cover: x=150 to x=220, y=220 to y=460

Let me code this properly with lots of detail:

Actually, for a V8, side elevation - let me make it really detailed. I'll think about this more carefully.

The V8 block viewed from the side shows:
- A roughly rectangular block body
- Two cylinder heads on top at V angles
- Cam covers on each head
- The sump at the bottom
- Timing cover at the front (visible as the end plate)
- On the timing end: crankshaft pulley, belt/chain sprockets visible

For the cross-section hatching, I'll show cross-sections where the cylinders cut through.

Let me design the coordinates:
- Canvas: 1200x675
- Leave margins
- Engine roughly centered

Main block: 
- Spans x: 220 to 980
- Block body: y: 300 to 455
- Sump: y: 455 to 570

V angle: 90 degrees total, so each bank at 45 degrees from vertical

Left bank (visible prominently in side view):
- Goes up-left at 45 degrees
- Head and cam cover on top

Right bank:
- Goes up-right at 45 degrees (partially obscured)

But wait, in a true side elevation, both banks would be visible. Let me think...

In a side elevation of a V8, you'd typically see:
- The block as a rectangular body
- Both banks visible - the near bank fully visible
- The far bank partially or fully visible depending on engine design
- Both sets of cam covers visible

Let me just go with a stylized but detailed technical illustration that shows all the key components clearly.

I'll create this with SVG paths and shapes. Here's my detailed plan:

1. Dark background with subtle grid
2. Title block (blueprint style) bottom right
3. Main engine body
4. Left bank (angled upper left)
5. Right bank (angled upper right)
6. Intake manifold (in valley)
7. Cam covers on each bank
8. Sump
9. Timing cover (front face)
10. Crankshaft pulley
11. Oil lines and cooler
12. Hatching on cross sections
13. Dimension lines
14. Labels

Let me write the SVG:

For the V8 block center around 580, 370:
Block: 220 to 950 wide, 300 to 460 tall

Left bank angled at 45° left:
- Base at left portion of block top
- Extends up-left

Right bank angled at 45° right:
- Base at right portion of block top  
- Extends up-right

Actually, for a V8 in side view, both banks appear as one combined shape from the top of the block, or they can be shown distinctly.

Let me simplify and just make it look great and technically accurate. I'll draw:

The engine as viewed from the RIGHT SIDE of the vehicle (driver's left looking forward), showing:
- The long axis of the engine going left-right
- 4 visible cylinder head bolts on the near bank
- Cam cover on near bank
- Behind/above: far bank cam cover
- Block stretching across
- Timing cover at left (front of engine)
- Flywheel/flexplate at right (back of engine)
- Sump at bottom
- Oil cooler lines, breather, etc.

This is a more traditional engineering side elevation view.

Let me now code this properly. I'll be generous with the detail.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" font-family="'Courier New', monospace">
\`\`\`

I'll create the engine with these approximate coordinates:

Block main body: x1=180, y1=295, x2=990, y2=450, width=810, height=155
Sump: x1=200, y1=450, x2=970, y2=565

Near bank (let's say the right bank, tilting right from center top):
Starting from block top, going upper-right

Let me reconsider. In a V8, the side elevation typically shows:

The block from the side. The V is going into and out of the page in a front-engine rear-wheel-drive layout. But for a transverse V8 (rare) you'd see the V banks from the side.

For a LONGITUDINAL V8 (like in a muscle car), the side view shows:
- The block as a long rectangle
- On top of the block, at one end you'd see the front (timing) side
- The two cylinder banks go up on each side (into/out of page)
- From the side you see the profile of the front bank and rear bank combined
- The cam covers appear as two angled shapes at the top

Actually, I think for visual purposes and how most people expect to see a V8 engine illustration, I should show it from the FRONT perspective slightly angled, OR show a true blueprint-style side elevation.

Let me go with the traditional side elevation that shows:
- The complete engine from the side
- Both cam covers visible (the near one fully, far one partially behind)
- The distinctive V shape of the two banks visible
- Cross sections through cylinders
- All external plumbing

Here's my refined layout:

The V8 block - I'll show the near-side bank prominently tilted toward the viewer on the left, and the far-side bank on the right, with the intake manifold in the valley between them.

In a 90-degree V8 side elevation:
- Near bank: tilted 45° to the left (bank angle from vertical)
- Far bank: tilted 45° to the right

Block base center: around (600, 450)
Block dimensions: 760 wide, 160 tall

Left (near) bank:
Starting from block top-left area, going up at about -45° angle
The head is about 240px long, 60px wide

Right (far) bank:
Starting from block top-right area, going up at about 45° angle
Similar dimensions

Let me code this now. I'll try to make it very detailed.

Key coordinates:
- Block: x=195, y=340, width=810, height=155 (to y=495)
- Sump: x=215, y=495, width=770, height=120 (to y=615)
- Left bank starts at about x=350, y=340, goes up-left
- Right bank starts at about x=720, y=340, goes up-right

For the V angle (90°), each bank is 45° from vertical:
- Left bank tilts left: the top of the head goes to about x=200, y=180
- Right bank tilts right: the top of the head goes to about x=940, y=180

Cam cover heights: about 60px
Head heights: about 80px

Left bank geometry (45° tilt left):
- Bottom-right: (450, 340)
- Bottom-left: (270, 340) - actually the bottom of the bank is horizontal
- Actually the bank is rotated 45°

Let me think of this differently. 

In a V8 viewed from the front:
- You see two banks of cylinders in a V shape
- But this is a SIDE elevation

In a V8 viewed from the SIDE:
- The engine length runs left-right
- You see the profile 
- The two banks would be like two parallelogram shapes going up from the block
- In a 90-degree V8, they'd go up at 45 degrees each side

But if I'm showing a side elevation, and the V banks go INTO and OUT OF the page, then you'd see:
- The NEAR bank on top, angled left or right
- The FAR bank behind it, angled the other way
- Both banks are visible in silhouette from the side

So in a true SIDE elevation of a V8:
- You see the combined envelope of both banks
- The result is actually a trapezoid shape at the top, wider at the top (at 90° V, each bank is 45° so the top spreads out)
- The cam covers show as angled rectangles on each side

Let me draw the actual external profile of a V8 from the side, which shows:
1. Rectangular block (long and relatively narrow height)
2. On the left side: the front timing cover (circular crankshaft seal, chain/gear visible in section)
3. On the right side: the rear main seal area / flywheel
4. On top: two banks going up at 45° each side
5. In the valley between: intake manifold and throttle body
6. Each bank: cylinder head + cam cover

This is getting complex but let me just code it. I'll use a combination of rectangles and polygons/paths.

Let me set up the key geometry:

Engine centerline Y: 420 (this is where the crankshaft is)
Block top: y=310
Block bottom: y=430 (below crank)
Sump: y=430 to y=555

Block spans x=200 to x=980 (780px wide for a long V8)

Left bank (bank A, driver's side in American V8):
Starting from top of block, angled 45° to upper-left
- Head gasket line at: from (200,310) to (550,310)... 

Actually no. Let me look at this more carefully.

In a side view of a V8 with 90° bank angle:
The block's deck surface (top) is split into two planes:
- Left deck surface: angled 45° to the left (going up-left)
- Right deck surface: angled 45° to the right (going up-right)

The bottom of each bank meets at the center of the block top.

Let me place the valley center at approximately (600, 310):
- Left bank goes up-left at 45°
- Right bank goes up-right at 45°

Left bank:
- Deck runs from valley (600, 310) toward left and upward
- At 45°, going left and up: dx = -cos(45°)*L, dy = -sin(45°)*L
- For L=200px: goes to (600-141, 310-141) = (459, 169)
- Head thickness (in the angled direction, perpendicular to deck): about 80px
- Cam cover: another 55px
- Head outer face: at 90° to the deck direction (which is 45° to horizontal)
  - The outer face is vertical (at 0° to vertical, perpendicular to the 45° deck)
  - Actually perpendicular to a 45° direction is another 45° direction

OK this is getting complicated. Let me just use parallelograms and polygons and not overthink the exact geometry. I'll make it look like a V8 in side elevation without being perfectly geometrically correct, but visually convincing and detailed.

Here's my simplified approach:

The V8 engine viewed from the side. I'll create:

LEFT BANK (near side, say driver's side):
- A tilted parallelogram going upper-left
- The bank runs the length of the engine (left-right in image)
- From the side, this bank appears as a rectangle tilted at about 45° or shown as its full face
  
Actually, I think the best approach for a SIDE ELEVATION (not 3/4 view) is to show:

1. The engine block as a long horizontal rectangle
2. Jutting up from the top: the two cylinder head/cam cover assemblies
   - In a true 90° V8 side view, these form a shape like a "V" or inverted house roof
   - The left head would appear as a rectangle tilted ~45° going upper-left  
   - The right head would appear as a rectangle tilted ~45° going upper-right
3. Intake manifold in the valley
4. Sump below

I'll also add:
- Timing cover on the front (left) side of the block
- Internal cross-section hatching 
- Oil pan with fins
- Visible bolt patterns
- Cam cover details
- Various lines

Let me just start writing the SVG code. I'll make design decisions as I go.

Here's my layout:

- Background: #060606
- Blueprint grid: very faint lines
- Title block: bottom right
- Engine center: about 580, 380

Main block body:
\`\`\`
rect x="195" y="330" width="810" height="145" 
\`\`\`

Oil sump:
\`\`\`
path for tapered sump, narrower at bottom
\`\`\`

Left (near) bank assembly:
The bank goes from block top at about (270, 330) to (520, 330) at bottom
And rises at 45° (so upper-left)
The bank is the full length of the block (in the side view, you see all 4 cylinders in the near bank side by side)

Actually in side view you see the cylinders in the bank as the bank runs away from you (into/out of page). You see 4 bumps or a flat top, or you see them in cross section.

Hmm. OK. Let me reconsider what a V8 looks like in side elevation from an engineering standpoint.

The engine is mounted longitudinally (front to back in the car). The side elevation shows the SIDE of the engine (i.e., looking from the driver's left or right`,"engine/top":`<thinking>
The user wants a detailed technical schematic illustration of a V8 engine viewed from directly above (top-down view). Let me create a hyper-detailed SVG with:

- Dark background #060606
- Electric orange #FF4A00 for rim lighting and line details
- Gold #C8A96E for secondary highlights
- White #E8E8E8 for structural lines

V8 engine top-down view elements:
- Two banks of 4 cylinders each (V configuration)
- Intake manifold in the center (valley between the banks)
- Valve covers on each bank
- Breather caps on the valve covers
- Intake ports
- Fuel injectors
- Spark plug wire routing
- Technical schematic annotations/crosshairs
- Grid lines for technical feel
- Engine block outline
- Timing cover at front
- Accessory drive
- Various bolts and details

Let me think about the layout:
- The V8 engine from above would show two rows of valve covers
- The intake manifold sits in the middle
- 4 cylinders on each side
- The engine is longer than it is wide

For a top-down schematic view of a V8:
- Engine block is roughly rectangular
- Two valve covers running parallel (left and right banks)
- Intake manifold runners visible between/over the valve covers
- Throttle body at one end
- Distributor or coil packs
- Breather caps are dome-shaped protrusions on valve covers
- Oil filler cap usually on one valve cover

Let me design this carefully:

Engine body: approximately 800x400 centered in the 1200x675 viewBox
So centered at 600, 337

The V8 layout (looking down):
- Left valve cover: approximately x=150-550, y=180-290
- Right valve cover: approximately x=150-550, y=385-495
- Intake manifold: between the two covers, x=150-550, y=290-385

Wait, actually for a V8 looking from above, the two banks are side by side with the intake in the middle. Let me think more carefully.

A V8 engine from above:
- The engine block is the outermost rectangle
- The two cylinder banks splay out to form a V
- Looking from above, you'd see:
  - Two valve covers (one per bank) - long rectangular covers
  - The intake manifold between the two valve covers
  - The front accessory drive (timing cover, harmonic balancer, pulleys)
  - The rear (transmission end)

Let me lay this out horizontally (engine runs front-to-back):
- Front of engine: left side of SVG
- Rear of engine: right side of SVG
- Left bank: upper portion
- Right bank: lower portion

Engine dimensions in SVG:
- Overall engine block: x=100 to x=1100, y=100 to y=575
- Left valve cover: x=130 to x=1000, y=115 to y=245
- Right valve cover: x=130 to x=1000, y=430 to y=560
- Intake manifold (valley): x=150 to x=980, y=245 to y=430

Actually, let me reconsider. Let me make the layout more visually interesting and detailed.

Let me place the engine:
- Engine block outline: x=100 to x=1100, y=80 to y=595
- Width: 1000px, Height: 515px

Left (upper) bank valve cover: x=120 to x=1050, y=95 to y=235
Intake manifold: x=140 to x=1020, y=235 to y=440
Right (lower) bank valve cover: x=120 to x=1050, y=440 to y=580

For the valve covers, I'll add:
- Ribbing details
- Bolts around the perimeter
- Breather caps (2 per cover, one being the oil fill)
- PCV valve fitting

For the intake manifold:
- 8 intake runners (4 per side) going to intake ports
- Central plenum
- Throttle body at one end
- Various sensors (MAP, TPS)
- Fuel rail (visible)
- Fuel injectors

Let me create this in detail. I'll use lots of technical details.

Actually, let me think about a cleaner, more technical schematic approach. I'll make it look like a technical drawing with:
- Fine grid background
- Cross-hatch patterns
- Dimension lines
- Component callouts
- Rich detail on all parts

Let me code this up:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Grid -->
  <!-- Fine grid -->
  
  <!-- Engine elements -->
</svg>
\`\`\`

Let me plan the detailed components:

1. Background with grid
2. Engine block outer shell
3. Left bank valve cover (top)
4. Right bank valve cover (bottom)  
5. Intake manifold assembly
6. Throttle body
7. Fuel rails
8. Injectors
9. Breather caps
10. Sensors
11. Coil packs / distributor
12. Timing cover (front)
13. Accessory brackets

For a LS-style V8 (like an LS1/LS3) looking from above:
- Two parallel valve covers
- Intake manifold between them with 8 runners
- Coil packs on top of valve covers (individual coils per cylinder)

For a classic pushrod V8 (like SBC):
- Distributor at the rear
- Carburetor/throttle body in center
- Simpler intake with plenum

Let me go with a more modern LS-style engine for visual interest with lots of coil packs and individual components.

I'll create a detailed SVG now. Let me think about exact coordinates:

viewBox: 0 0 1200 675
Center: 600, 337

Engine block: 
- Outer block: x=80, y=70, width=1040, height=535
- So corners at: TL(80,70), TR(1120,70), BR(1120,605), BL(80,605)

Valve covers:
- Upper (left bank): x=95, y=85, width=1010, height=175
  → y range: 85 to 260
- Lower (right bank): x=95, y=420, width=1010, height=175
  → y range: 420 to 595
- Gap for intake: y 260 to 420 (160px wide valley)

Intake manifold:
- Sits between y=260 and y=420
- With 8 ports going into each cylinder

Actually let me reconsider the layout. The engine should look more like a V8 engine.

For a V8 from directly above, the most prominent features would be:
- Two long valve covers running the length of the engine
- The intake manifold filling the valley between them
- Various fittings, caps, and connections

Let me sketch this out more carefully:

Layout (horizontal engine, front = left):
- Engine block visible at edges: 80px to 1120px (x), 65px to 610px (y)
- Upper valve cover: roughly y=80 to y=240
- Lower valve cover: roughly y=435 to y=595
- Intake region: y=240 to y=435

The engine will be 1040px long, 545px tall total, with each bank about 160px, intake about 195px.

For LS-type engine:
- Valve covers are smooth-ish with coil packs on top
- 4 coil packs per cover (one per cylinder)
- Breather cap on each cover
- Intake manifold has a large plenum with 8 individual runners

Let me now write the actual SVG code. I'll make it very detailed.

Key colors:
- Background: #060606
- Rim lighting/highlights: #FF4A00
- Secondary highlights: #C8A96E
- Structural lines: #E8E8E8
- Deep shadows: #1a0a00 or #0d0d0d
- Metal surfaces: #1a1a1a, #222222, #2a2a2a
- Subtle fill for components: #111111

Grid lines: very subtle, like #0f0f0f or #111111

Let me write the SVG:

For the technical schematic look, I want:
- Crosshair/registration marks at corners
- Dimension lines with arrows
- Component labels in small caps
- Fine detail lines showing bolt patterns, ribs, seams

Let me write a comprehensive SVG. I'll be detailed but efficient with the code.

Here's my plan for the SVG structure:

1. \`<defs>\` section with:
   - Gradient definitions
   - Pattern for grid
   - Filter for glow effects
   - Marker for arrows

2. Background elements:
   - Dark background
   - Subtle grid
   - Corner registration marks

3. Engine block foundation

4. Upper valve cover (bank 1)

5. Lower valve cover (bank 2)

6. Intake manifold

7. Throttle body / air intake

8. Detail components

9. Labels and annotations

Let me write this now. I'll try to make it very dense and visually striking.

For the valve covers, I'll add:
- Rectangular outline with rounded corners
- Perimeter bolt holes (about 8-10 bolts per cover)
- 4 coil packs (tall rectangular protrusions for each cylinder)
- 1 large breather cap (round dome)
- 1 oil filler cap
- PCV hose fitting
- Ribbing between coils

For the intake manifold:
- Central plenum (raised rectangular section)
- 8 intake runners (4 per side, angling from center to outer ports)
- Throttle body opening at front
- Various sensors
- Fuel rail (thin rectangular bar on each side)
- 8 injector spots

For technical details:
- Bolt holes everywhere with fine circles
- Hatching on cut surfaces
- Fine lines showing casting ribs
- Seam lines between components

Let me now write the actual SVG code. I'll aim for something that's visually impressive.

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
\`\`\`

Let me think about the proportions better. 

A V8 engine from above - thinking about a Chevy LS engine:
- Engine is about 27" wide x 27" tall (square-ish from above)
- Actually from above it looks more like... the overall width across the heads is about 27", and the length (front to back) is about 27-28" as well

Wait, from above:
- Width (across cylinder banks) = width of engine
- Length (front to back) = length of engine
- For a LS V8: approximately 25" wide, 27" front to back

So it's roughly square from above. Let me redo the layout.

Actually for the SVG, I want it to fill most of the 1200x675 canvas, so I'll stretch it a bit.

Let me place the engine occupying roughly x=80 to x=1120 (1040px) and y=50 to y=625 (575px).

This gives a somewhat wider-than-tall appearance.

Two valve covers side by side (in the V):
- Upper bank: y=65 to y=285 (220px tall)
- Lower bank: y=390 to y=610 (220px tall)
- Intake valley: y=285 to y=390 (105px)

Hmm, that makes the intake very narrow. Let me adjust:
- Upper bank: y=65 to y=255 (190px tall)
- Lower bank: y=420 to y=610 (190px tall)  
- Intake valley: y=255 to y=420 (165px)

That works better.

Now let me also think about what's at the front and back of the engine:
- Front (left in my layout, x=80): timing cover, harmonic balancer, accessory mounts
- Rear (right, x=1120): flywheel/flexplate area, transmission bell housing pattern

OK let me just write the SVG now. I'll aim for detail and visual impact.

Actually, I realize I should think about this differently. Looking at a V8 engine from directly above, here's what you'd actually see:

1. The widest part is the valve covers / cylinder heads
2. The intake manifold sits in the valley between the two cylinder banks - it would be ABOVE the valley between the banks, so it would be VISIBLE between the valve covers
3. Looking straight down, the intake manifold would partially overlap the inner edges of the valve covers
4. The throttle body is usually at the front center

For an overhead view of a common V8 (like a small block Chevy or LS):
- You see the tops of the two valve covers
- Between them, the intake manifold
- At the front: various accessories
- The valve covers have bolts around the edge, maybe breather/oil fill caps
- The intake has visible injectors/fuel rails if EFI

For a pushrod engine:
- No cams visible on top
- For coil-near-plug: coil packs sticking up from valve covers

Let me now write clean, detailed SVG. I'll make it look like a precision technical drawing.

Let me plan key features precisely:

**Background & Grid:**
- Fill: #060606
- Subtle dot/line grid
- Corner targets

**Engine Footprint:**
- Outer block: rect at (85, 55) size 1030×565
- Rounded corners: rx=8

**Upper Valve Cover (Bank 1, cylinders 1,3,5,7):**
- Position: (100, 70) to (1070, 260)
- Width: 970, Height: 190
- Color: dark metallic
- Features:
  - 12 perimeter bolts
  - 4 coil pack assemblies
  - 1 breather/oil cap
  - Ribbing lines
  - Orange rim lighting on edges
  - Part number text area

**Lower Valve Cover (Bank 2, cylinders 2,4,6,8):**
- Position: (100, 415) to (1070, 605)
- Mirror of upper cover

**Intake Manifold:**
- Position: (120, 260) to (1050, 415)
- Main plenum: central raised section
- 8 intake runners (4 each side, going from center outward)
- Throttle body at left (front of engine)
- MAP sensor, IAT sensor
- Fuel rails (EFI)

**Throttle Body:**
- Left end of intake, circular with butterfly

**Misc:**
- Ignition coil packs (LS-style, 4 per bank)
- Breather caps
- PCV fittings
- Coolant lines at front/back

Let me write this SVG now. I'll be thorough but organized.

For the grid, I'll use a pattern. For glow effects, a filter.

Let me code this up:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- Grid pattern -->
    <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#0e0e0e" stroke-width="0.5"/>
    </pattern>
    <pattern id="finegrid" width="5" height="5" patternUnits="userSpaceOnUse">
      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#0a0a0a" stroke-width="0.3"/>
    </pattern>
    
    <!-- Glow filter -->
    <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="subtleGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Metal gradients -->
    <linearGradient id="valveCoverGrad" x1="0" y1="0" x2="0" y`,"suspension/hero":`<thinking>
The user wants a detailed SVG illustration of a rally truck front suspension assembly in 3/4 view, showing coilover, control arms, and steering knuckle. Let me create a dense, technical illustration with the specified color scheme.

Let me plan the composition:
- Dark background #060606
- Electric orange #FF4A00 for rim lighting and shock body highlight
- Gold #C8A96E for secondary highlights
- White #E8E8E8 for structural lines
- 3/4 view of front suspension

Key components to draw:
1. Upper control arm (A-arm)
2. Lower control arm (A-arm) - larger
3. Coilover shock absorber with spring
4. Steering knuckle/hub assembly
5. Wheel hub/brake rotor hint
6. Frame mounts/chassis attachment points
7. Ball joints
8. Tie rod/steering arm

Let me think about the layout in 3/4 view. The suspension will be centered-ish in the frame, showing depth perspective.

I'll create a detailed technical illustration with:
- Grid/technical background
- The suspension components in 3/4 perspective
- Orange highlights on the shock body
- Gold on secondary details
- White structural lines

Let me design this carefully:

Frame: On the left side (inner), chassis rail mounting points
Control arms: A-arms extending outward (to the right in 3/4 view)
Coilover: Mounted between lower control arm and chassis, angled
Knuckle: At the outer end connecting upper and lower arms
Hub: Attached to knuckle

For 3/4 perspective, I'll use some foreshortening. The view shows both the front and side somewhat.

Let me sketch the coordinates:

The scene will be roughly centered around 600, 400.

Chassis/frame mounting area: left side, around x=350-450
Lower control arm extends from ~x=400, y=480 to ~x=800, y=500 (in perspective)
Upper control arm extends from ~x=420, y=320 to ~x=780, y=340
Knuckle: at x=780-820, y=320-500
Coilover: from lower arm at ~x=600 going up to chassis at ~x=500, y=200

Let me be more systematic. I'll create a complex SVG with many path elements.

Let me think about this more carefully with 3/4 perspective:

The suspension assembly in 3/4 view from slightly above and to the front-side:

- Frame mounts on the left (inner side)
- Control arms extending right and slightly toward viewer
- Knuckle on the right
- Coilover slightly angled

I'll use perspective-like coordinates.

Let me define key points:

Chassis frame area: around (380, 280) to (450, 520)

Lower control arm (wider, longer):
- Inner front mount: (400, 490)
- Inner rear mount: (420, 510)  
- Outer ball joint: (820, 500)

Upper control arm (smaller, shorter):
- Inner front mount: (410, 310)
- Inner rear mount: (430, 330)
- Outer ball joint: (770, 330)

Knuckle: connecting (770, 330) top to (820, 500) bottom, roughly a vertical piece

Coilover:
- Bottom mount: around (650, 470) on lower arm
- Top mount: around (580, 180) on chassis
- Spring wrapped around shock body

Let me draw this out in SVG. This will be quite complex.

I'll start building the SVG:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Technical grid background -->
  <!-- subtle grid lines -->
  
  <!-- Title/labels -->
  
  <!-- Chassis frame section -->
  
  <!-- Lower control arm -->
  
  <!-- Upper control arm -->
  
  <!-- Coilover assembly -->
  
  <!-- Steering knuckle -->
  
  <!-- Hub/brake assembly -->
  
  <!-- Ball joints -->
  
  <!-- Tie rod -->
  
</svg>
\`\`\`

Let me now design each component carefully.

For a rally truck suspension in 3/4 view, I'll use a perspective transform mentally:

The viewer is positioned at front-right, looking at the left front suspension from slightly above.

Key coordinates (I'll use isometric-ish perspective):

CHASSIS FRAME (left side, the inner mounting structure):
- Vertical frame rail: roughly at x=350-420
- Crossmember: horizontal

LOWER CONTROL ARM (A-arm, triangular):
- Front inner pivot: (390, 500)
- Rear inner pivot: (440, 520) [perspective depth]
- Outer ball joint: (810, 488)
- This forms a wide triangle

UPPER CONTROL ARM (A-arm, triangular, shorter):
- Front inner pivot: (400, 300)
- Rear inner pivot: (445, 318) [perspective depth]
- Outer ball joint: (760, 305)

KNUCKLE:
- Top: (760, 305) - upper ball joint
- Bottom: (810, 488) - lower ball joint
- Hub center: roughly (800, 400)
- Shape: tall vertical piece, slightly angled

COILOVER:
- Bottom: attached to lower arm at about (640, 460) 
- Top: chassis at about (540, 175)
- Angle: roughly 80° from horizontal (near vertical, slightly angled)

Let me now write the actual SVG. I'll make it very detailed with multiple path elements.

Actually, let me think about this more carefully to make it look good.

I'll place the main assembly centered in the viewbox:

Main anchor points:
- Hub center: (720, 400)
- Upper ball joint: (700, 310)  
- Lower ball joint: (750, 510)
- Upper arm inner front: (380, 285)
- Upper arm inner rear: (420, 305)
- Lower arm inner front: (360, 490)
- Lower arm inner rear: (400, 515)
- Coilover bottom on lower arm: (580, 475)
- Coilover top: (500, 155)

Frame mounts on left:
- Upper: around (360-430, 270-310)
- Lower: around (340-410, 480-520)

Let me now create a proper, detailed SVG. I'll use various stroke effects, gradients, and details to make it look hyper-detailed and technical.

Here's my plan for the SVG structure:

1. Background with technical grid
2. Ground reference line
3. Glow/ambient effects
4. Chassis frame section (left)
5. Lower control arm assembly
6. Upper control arm assembly
7. Steering knuckle
8. Coilover shock (orange highlight)
9. Spring coils
10. Hub/brake rotor
11. Ball joints
12. Tie rod
13. Labels and dimension lines
14. Technical annotations

Let me write the full SVG now:

For the coilover spring, I need to create coil-like shapes. I can do this with a path that winds.

For the shock body, I'll use a rectangle/rounded rect with gradient.

Let me be precise with my coordinates and create proper 3/4 perspective geometry.

Here's my coordinate system:
- The suspension assembly is shown at roughly 45° perspective
- The chassis is on the left
- The wheel/knuckle is on the right
- Slightly elevated viewpoint

FRAME SECTION:
The chassis frame will be represented as structural box sections on the left side of the image.

Let me use these key coordinates:

// Upper arm
const upperArmInnerFront = {x: 382, y: 295}
const upperArmInnerRear = {x: 428, y: 318}
const upperBallJoint = {x: 718, y: 298}

// Lower arm  
const lowerArmInnerFront = {x: 358, y: 485}
const lowerArmInnerRear = {x: 408, y: 508}
const lowerBallJoint = {x: 762, y: 498}

// Knuckle
const knuckleTop = upperBallJoint // {718, 298}
const knuckleBottom = lowerBallJoint // {762, 498}
const hubCenter = {x: 775, y: 400}

// Coilover
const coiloverBottom = {x: 600, y: 468}
const coiloverTop = {x: 512, y: 148}

Now let me write the SVG. I'll make it dense and detailed.

Actually, I think I should approach this more organically. Let me design each component as a visual element and then put them together.

Let me write the complete SVG now:

For the A-arm shapes, they're typically C-channel or tube sections, so I'll draw them as hollow sections.

Actually for a 3/4 technical illustration, I think the best approach is:
- Draw the control arms as thick tubular/rectangular sections
- Show the welds and mounting hardware
- Use the orange for the shock body
- Use the specified colors appropriately

Let me write this complete, detailed SVG:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- Gradients and filters -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="orangeGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Shock body gradient -->
    <linearGradient id="shockBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1a1a1a"/>
      <stop offset="30%" style="stop-color:#FF4A00;stop-opacity:0.8"/>
      <stop offset="60%" style="stop-color:#FF6A20"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    
    <linearGradient id="springGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#333"/>
      <stop offset="40%" style="stop-color:#C8A96E"/>
      <stop offset="70%" style="stop-color:#888"/>
      <stop offset="100%" style="stop-color:#222"/>
    </linearGradient>
    
    <linearGradient id="armGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3a3a3a"/>
      <stop offset="50%" style="stop-color:#1a1a1a"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    
    <linearGradient id="knuckleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2a2a2a"/>
      <stop offset="50%" style="stop-color:#444"/>
      <stop offset="100%" style="stop-color:#1a1a1a"/>
    </linearGradient>
    
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  
  <!-- Dark background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Subtle technical grid -->
  <g opacity="0.08" stroke="#C8A96E" stroke-width="0.5">
    <!-- Vertical lines -->
    <line x1="0" y1="0" x2="0" y2="675"/>
    <line x1="100" y1="0" x2="100" y2="675"/>
    ...
  </g>
\`\`\`

This is getting complex. Let me just write the full thing directly, being careful about coordinates.

Let me think about what makes this look GREAT:
1. Proper 3/4 perspective with depth cues
2. Tubular control arm cross-sections visible
3. Detailed coilover with spring wraps
4. Proper ball joint representations
5. Orange glow on shock absorber
6. Technical annotation lines
7. Hatching/detail marks

Let me draft the complete SVG now. I'll aim for dense detail.

For the 3/4 perspective, I'll use a mild oblique/isometric style where depth is shown at about 20-25° angle.

Key coordinate groups:

FRAME MOUNTING:
The frame shows as box sections:
- Upper bracket: polygon around (330,270) to (460,320)
- Lower bracket: polygon around (300,470) to (440,530)
- Frame rail visible: (300,270) to (300,530) vertical section

UPPER CONTROL ARM:
- Inner pivots at frame: two points near (382,295) and (428,318) - front/rear
- Outer ball joint: (720,300)
- The arm is triangular, showing as tubes

LOWER CONTROL ARM (wider):
- Inner pivots: (355,488) and (405,510)
- Outer ball joint: (758,498)
- Wider, more robust than upper

KNUCKLE:
- A tall casting connecting top/bottom ball joints
- Top: (720,300), Bottom: (758,498)
- Hub spindle: protruding to the right
- Hub center: (790,400)
- Shows brake caliper and rotor

COILOVER:
- Lower mount: on lower control arm, about (605,465) 
- Upper mount: chassis, about (515,150)
- Shock body (orange): cylindrical, middle section
- Spring: helical coils around shock

STEERING TIE ROD:
- From knuckle steering arm: (760,390) approximately
- Going toward rack (implied, left side)
- To about (430,375)

Let me write this fully now. I'll be quite detailed.

Actually, I think the best approach for making this dense and detailed is to create lots of individual geometric elements with proper fills, strokes, and effects. Let me write the complete SVG now.

I'll structure it as follows and fill in all coordinates:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
\`\`\`

Let me design this as a proper engineering illustration. I'll place the main assembly in the center-left of the frame.

Center of composition: around (650, 400)

Let me use these final coordinates:

### Chassis Frame (left side)
Main frame rail - a rectangular box section visible on left:
- Outer face: (310, 240) to (380, 560) - vertical rail
- Side face (perspective): adds depth going back-right
- Color: dark with white/gold edges

Upper arm bracket:
- Mounts to frame at y≈290-320

Lower arm bracket:
- Mounts to frame at y≈490-520

### Upper A-Arm (control arm)
The upper arm - short, connecting frame to upper knuckle
Front tube: (382, 295) to (716, 298) - main forward tube  
Rear tube: (428, 315) to (716, 298) - rear tube (converges at ball joint)
Cross section visible near each end

Width of arm tubes: about 18px stroke

### Lower A-Arm (control arm)
The lower arm - longer, wider
Front tube: (355, 490) to (755, 495)
Rear tube: (405, 510) to (755, 495)  
Gussets and reinforcements

### Coilover
Bottom mount: (600, 470)
Bottom clevis: at (600,470), connects to lower`,"suspension/side":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#060606">
  <defs>
    <!-- Gradients and filters -->
    <radialGradient id="rimLight" cx="15%" cy="50%" r="85%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#1a0800" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="wheelGrad" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#8B2200" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#0d0400" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="hubGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#C8A96E"/>
      <stop offset="50%" stop-color="#7a5c28"/>
      <stop offset="100%" stop-color="#2a1a06"/>
    </radialGradient>
    <radialGradient id="damperGrad" cx="25%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#E8E8E8" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#888" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#1a1a1a" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="springGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4A00"/>
      <stop offset="40%" stop-color="#E8E8E8"/>
      <stop offset="100%" stop-color="#333"/>
    </linearGradient>
    <linearGradient id="armGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E8E8" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#555"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="armGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E8E8E8" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#444"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0.5"/>
    </linearGradient>
    <linearGradient id="tireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.8"/>
      <stop offset="15%" stop-color="#1a0800"/>
      <stop offset="50%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#111"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowStrong" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowOrange">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#FF4A00"/>
    </marker>
    <marker id="arrowGold" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#C8A96E"/>
    </marker>
  </defs>

  <!-- Background ambient rim lighting from left -->
  <rect width="1200" height="675" fill="#060606"/>
  <rect width="1200" height="675" fill="url(#rimLight)"/>

  <!-- Grid lines subtle -->
  <g stroke="#FF4A00" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="675" x2="1200" y2="675"/>
    <line x1="0" y1="575" x2="1200" y2="575"/>
    <line x1="0" y1="475" x2="1200" y2="475"/>
    <line x1="0" y1="375" x2="1200" y2="375"/>
    <line x1="0" y1="275" x2="1200" y2="275"/>
    <line x1="0" y1="175" x2="1200" y2="175"/>
  </g>
  <g stroke="#E8E8E8" stroke-opacity="0.03" stroke-width="1">
    <line x1="200" y1="0" x2="200" y2="675"/>
    <line x1="400" y1="0" x2="400" y2="675"/>
    <line x1="600" y1="0" x2="600" y2="675"/>
    <line x1="800" y1="0" x2="800" y2="675"/>
    <line x1="1000" y1="0" x2="1000" y2="675"/>
  </g>

  <!-- Ground line -->
  <line x1="50" y1="580" x2="1150" y2="580" stroke="#C8A96E" stroke-width="1.5" stroke-opacity="0.5"/>
  <line x1="50" y1="582" x2="1150" y2="582" stroke="#FF4A00" stroke-width="0.5" stroke-opacity="0.3"/>

  <!-- Ground hash marks -->
  <g stroke="#C8A96E" stroke-width="1" stroke-opacity="0.4">
    <line x1="80" y1="580" x2="60" y2="598"/>
    <line x1="130" y1="580" x2="110" y2="598"/>
    <line x1="180" y1="580" x2="160" y2="598"/>
    <line x1="230" y1="580" x2="210" y2="598"/>
    <line x1="280" y1="580" x2="260" y2="598"/>
    <line x1="330" y1="580" x2="310" y2="598"/>
    <line x1="380" y1="580" x2="360" y2="598"/>
    <line x1="430" y1="580" x2="410" y2="598"/>
    <line x1="480" y1="580" x2="460" y2="598"/>
    <line x1="530" y1="580" x2="510" y2="598"/>
    <line x1="580" y1="580" x2="560" y2="598"/>
    <line x1="630" y1="580" x2="610" y2="598"/>
    <line x1="680" y1="580" x2="660" y2="598"/>
    <line x1="730" y1="580" x2="710" y2="598"/>
    <line x1="780" y1="580" x2="760" y2="598"/>
    <line x1="830" y1="580" x2="810" y2="598"/>
    <line x1="880" y1="580" x2="860" y2="598"/>
    <line x1="930" y1="580" x2="910" y2="598"/>
    <line x1="980" y1="580" x2="960" y2="598"/>
    <line x1="1030" y1="580" x2="1010" y2="598"/>
    <line x1="1080" y1="580" x2="1060" y2="598"/>
    <line x1="1130" y1="580" x2="1110" y2="598"/>
  </g>

  <!-- ===== WHEEL ASSEMBLY ===== -->
  <!-- Center of wheel at approximately (420, 490) in nominal position -->
  
  <!-- Tire outer (side view ellipse for 3D depth) -->
  <ellipse cx="420" cy="490" rx="90" ry="90" fill="url(#tireGrad)" stroke="#FF4A00" stroke-width="2.5" filter="url(#glowOrange)"/>
  
  <!-- Tire sidewall detail -->
  <ellipse cx="420" cy="490" rx="90" ry="90" fill="none" stroke="#FF4A00" stroke-width="1" stroke-opacity="0.4"/>
  
  <!-- Tire inner edge (3D side wall) -->
  <ellipse cx="420" cy="490" rx="82" ry="82" fill="#080808" stroke="#333" stroke-width="1"/>
  
  <!-- Rim -->
  <ellipse cx="420" cy="490" rx="60" ry="60" fill="url(#wheelGrad)" stroke="#FF4A00" stroke-width="2" filter="url(#glowOrange)"/>
  
  <!-- Rim spokes -->
  <g stroke="#C8A96E" stroke-width="2.5" filter="url(#glow)">
    <line x1="420" y1="490" x2="420" y2="432"/>
    <line x1="420" y1="490" x2="472" y2="460"/>
    <line x1="420" y1="490" x2="472" y2="520"/>
    <line x1="420" y1="490" x2="420" y2="548"/>
    <line x1="420" y1="490" x2="368" y2="520"/>
    <line x1="420" y1="490" x2="368" y2="460"/>
  </g>
  <!-- Spoke detail lines -->
  <g stroke="#E8E8E8" stroke-width="0.8" stroke-opacity="0.4">
    <line x1="420" y1="490" x2="423" y2="432"/>
    <line x1="420" y1="490" x2="474" y2="462"/>
    <line x1="420" y1="490" x2="474" y2="518"/>
    <line x1="420" y1="490" x2="417" y2="548"/>
    <line x1="420" y1="490" x2="366" y2="518"/>
    <line x1="420" y1="490" x2="366" y2="462"/>
  </g>
  
  <!-- Rim outer ring detail -->
  <ellipse cx="420" cy="490" rx="60" ry="60" fill="none" stroke="#E8E8E8" stroke-width="1" stroke-opacity="0.3"/>
  <ellipse cx="420" cy="490" rx="55" ry="55" fill="none" stroke="#C8A96E" stroke-width="0.8" stroke-opacity="0.4"/>
  
  <!-- Hub center -->
  <circle cx="420" cy="490" r="16" fill="url(#hubGrad)" stroke="#C8A96E" stroke-width="2" filter="url(#glow)"/>
  <circle cx="420" cy="490" r="10" fill="#1a0e02" stroke="#FF4A00" stroke-width="1.5"/>
  <circle cx="420" cy="490" r="5" fill="#C8A96E"/>
  
  <!-- Hub bolts -->
  <g fill="#C8A96E" stroke="#FF4A00" stroke-width="0.5">
    <circle cx="420" cy="477" r="2.5"/>
    <circle cx="431" cy="497" r="2.5"/>
    <circle cx="409" cy="497" r="2.5"/>
  </g>

  <!-- Tire tread pattern on outer edge -->
  <g stroke="#333" stroke-width="1.5" fill="none">
    <path d="M420,400 Q510,400 510,490" stroke="#444"/>
    <path d="M420,400 Q330,400 330,490" stroke="#444"/>
  </g>
  
  <!-- Brake disc behind wheel -->
  <ellipse cx="420" cy="490" rx="42" ry="42" fill="none" stroke="#888" stroke-width="3" stroke-opacity="0.7"/>
  <ellipse cx="420" cy="490" rx="42" ry="42" fill="none" stroke="#FF4A00" stroke-width="0.5" stroke-opacity="0.4"/>
  <!-- Brake disc venting slots -->
  <g stroke="#666" stroke-width="1.5" fill="none">
    <path d="M420,449 L425,455 L415,455 Z"/>
    <path d="M461,490 L455,495 L455,485 Z"/>
    <path d="M420,531 L415,525 L425,525 Z"/>
    <path d="M379,490 L385,485 L385,495 Z"/>
  </g>
  
  <!-- Brake caliper -->
  <rect x="445" y="468" width="28" height="26" rx="3" fill="#2a2a2a" stroke="#E8E8E8" stroke-width="1.5"/>
  <rect x="448" y="471" width="10" height="20" rx="2" fill="#FF4A00" stroke="#FF4A00" stroke-width="1" stroke-opacity="0.6"/>
  <rect x="460" y="471" width="10" height="20" rx="2" fill="#CC3800" stroke="#FF4A00" stroke-width="0.5" stroke-opacity="0.5"/>
  <line x1="445" y1="481" x2="473" y2="481" stroke="#C8A96E" stroke-width="1"/>

  <!-- ===== UPRIGHT / KNUCKLE ===== -->
  <path d="M420,440 L445,445 L455,490 L445,535 L420,540 L408,490 Z" 
        fill="#1a1a1a" stroke="#E8E8E8" stroke-width="2" stroke-opacity="0.8"/>
  <path d="M420,440 L445,445 L455,490 L445,535 L420,540 L408,490 Z" 
        fill="none" stroke="#FF4A00" stroke-width="0.8" stroke-opacity="0.5"/>
  <!-- Upright detail ribs -->
  <line x1="420" y1="440" x2="455" y2="490" stroke="#C8A96E" stroke-width="1" stroke-opacity="0.6"/>
  <line x1="420" y1="540" x2="455"`,"suspension/top":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#060606">
  <defs>
    <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C8A96E" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#C8A96E" stop-opacity="0"/>
    </radialGradient>
    <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="bloomStrong" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="subtleGlow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="subframeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="50%" stop-color="#252525"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="armGradL" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e1e1e"/>
      <stop offset="60%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#333"/>
    </linearGradient>
    <linearGradient id="armGradR" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1e1e1e"/>
      <stop offset="60%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#333"/>
    </linearGradient>
    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#FF4A00"/>
    </marker>
    <marker id="arrowWhite" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#E8E8E8" opacity="0.6"/>
    </marker>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40,0 L0,0 L0,40" fill="none" stroke="#111" stroke-width="0.5"/>
    </pattern>
    <pattern id="gridFine" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M10,0 L0,0 L0,10" fill="none" stroke="#0d0d0d" stroke-width="0.3"/>
    </pattern>
  </defs>

  <!-- Background grid -->
  <rect width="1200" height="675" fill="#060606"/>
  <rect width="1200" height="675" fill="url(#gridFine)" opacity="0.8"/>
  <rect width="1200" height="675" fill="url(#grid)" opacity="1"/>

  <!-- Ambient glow center -->
  <ellipse cx="600" cy="337" rx="500" ry="280" fill="#FF4A00" opacity="0.03"/>
  <ellipse cx="600" cy="337" rx="300" ry="180" fill="#C8A96E" opacity="0.04"/>

  <!-- Title block -->
  <text x="60" y="42" font-family="'Courier New', monospace" font-size="11" fill="#FF4A00" opacity="0.9" letter-spacing="3" filter="url(#subtleGlow)">FRONT SUSPENSION ASSEMBLY — TOP VIEW</text>
  <text x="60" y="58" font-family="'Courier New', monospace" font-size="9" fill="#C8A96E" opacity="0.7" letter-spacing="2">DWG-FSP-001 | SCALE 1:8 | DOUBLE WISHBONE CONFIGURATION</text>
  <line x1="60" y1="65" x2="700" y2="65" stroke="#FF4A00" stroke-width="0.5" opacity="0.4"/>

  <!-- Corner markers -->
  <path d="M20,20 L50,20 M20,20 L20,50" stroke="#FF4A00" stroke-width="1" opacity="0.5"/>
  <path d="M1180,20 L1150,20 M1180,20 L1180,50" stroke="#FF4A00" stroke-width="1" opacity="0.5"/>
  <path d="M20,655 L50,655 M20,655 L20,625" stroke="#FF4A00" stroke-width="1" opacity="0.5"/>
  <path d="M1180,655 L1150,655 M1180,655 L1180,625" stroke="#FF4A00" stroke-width="1" opacity="0.5"/>

  <!-- ============================================================ -->
  <!-- SUBFRAME STRUCTURE -->
  <!-- ============================================================ -->

  <!-- Main subframe body fill -->
  <path d="M380,255 L820,255 L840,270 L840,405 L820,420 L380,420 L360,405 L360,270 Z" fill="url(#subframeGrad)" stroke="none"/>

  <!-- Subframe outer border - white structural lines -->
  <path d="M380,255 L820,255 L840,270 L840,405 L820,420 L380,420 L360,405 L360,270 Z"
        fill="none" stroke="#E8E8E8" stroke-width="1.2" opacity="0.7"/>

  <!-- Subframe inner chamfer -->
  <path d="M390,265 L810,265 L828,278 L828,397 L810,410 L390,410 L372,397 L372,278 Z"
        fill="none" stroke="#E8E8E8" stroke-width="0.4" opacity="0.3"/>

  <!-- Subframe orange rim highlight top edge -->
  <line x1="380" y1="255" x2="820" y2="255" stroke="#FF4A00" stroke-width="1.5" opacity="0.8" filter="url(#bloom)"/>
  <line x1="380" y1="420" x2="820" y2="420" stroke="#FF4A00" stroke-width="1.5" opacity="0.8" filter="url(#bloom)"/>

  <!-- Subframe internal cross-members -->
  <line x1="420" y1="255" x2="420" y2="420" stroke="#E8E8E8" stroke-width="0.6" opacity="0.2"/>
  <line x1="500" y1="255" x2="500" y2="420" stroke="#E8E8E8" stroke-width="0.6" opacity="0.2"/>
  <line x1="700" y1="255" x2="700" y2="420" stroke="#E8E8E8" stroke-width="0.6" opacity="0.2"/>
  <line x1="780" y1="255" x2="780" y2="420" stroke="#E8E8E8" stroke-width="0.6" opacity="0.2"/>

  <!-- Central fore-aft spine -->
  <line x1="360" y1="337" x2="840" y2="337" stroke="#E8E8E8" stroke-width="0.8" opacity="0.15"/>

  <!-- Diagonal bracing inside subframe -->
  <line x1="420" y1="265" x2="500" y2="337" stroke="#C8A96E" stroke-width="0.5" opacity="0.2"/>
  <line x1="500" y1="337" x2="420" y2="410" stroke="#C8A96E" stroke-width="0.5" opacity="0.2"/>
  <line x1="780" y1="265" x2="700" y2="337" stroke="#C8A96E" stroke-width="0.5" opacity="0.2"/>
  <line x1="700" y1="337" x2="780" y2="410" stroke="#C8A96E" stroke-width="0.5" opacity="0.2"/>

  <!-- Subframe diagonal braces front cross -->
  <line x1="380" y1="255" x2="500" y2="337" stroke="#C8A96E" stroke-width="0.4" opacity="0.15"/>
  <line x1="820" y1="255" x2="700" y2="337" stroke="#C8A96E" stroke-width="0.4" opacity="0.15"/>
  <line x1="380" y1="420" x2="500" y2="337" stroke="#C8A96E" stroke-width="0.4" opacity="0.15"/>
  <line x1="820" y1="420" x2="700" y2="337" stroke="#C8A96E" stroke-width="0.4" opacity="0.15"/>

  <!-- Mounting bolt holes on subframe - LEFT side -->
  <!-- Front-left mount -->
  <circle cx="400" cy="273" r="9" fill="#0a0a0a" stroke="#C8A96E" stroke-width="1"/>
  <circle cx="400" cy="273" r="5" fill="none" stroke="#FF4A00" stroke-width="0.8"/>
  <circle cx="400" cy="273" r="2" fill="#FF4A00" opacity="0.6"/>

  <!-- Rear-left mount -->
  <circle cx="400" cy="402" r="9" fill="#0a0a0a" stroke="#C8A96E" stroke-width="1"/>
  <circle cx="400" cy="402" r="5" fill="none" stroke="#FF4A00" stroke-width="0.8"/>
  <circle cx="400" cy="402" r="2" fill="#FF4A00" opacity="0.6"/>

  <!-- Front-right mount -->
  <circle cx="800" cy="273" r="9" fill="#0a0a0a" stroke="#C8A96E" stroke-width="1"/>
  <circle cx="800" cy="273" r="5" fill="none" stroke="#FF4A00" stroke-width="0.8"/>
  <circle cx="800" cy="273" r="2" fill="#FF4A00" opacity="0.6"/>

  <!-- Rear-right mount -->
  <circle cx="800" cy="402" r="9" fill="#0a0a0a" stroke="#C8A96E" stroke-width="1"/>
  <circle cx="800" cy="402" r="5" fill="none" stroke="#FF4A00" stroke-width="0.8"/>
  <circle cx="800" cy="402" r="2" fill="#FF4A00" opacity="0.6"/>

  <!-- Additional center mounts -->
  <circle cx="490" cy="260" r="6" fill="#0a0a0a" stroke="#C8A96E" stroke-width="0.8"/>
  <circle cx="490" cy="260" r="3" fill="none" stroke="#FF4A00" stroke-width="0.6"/>
  <circle cx="710" cy="260" r="6" fill="#0a0a0a" stroke="#C8A96E" stroke-width="0.8"/>
  <circle cx="710" cy="260" r="3" fill="none" stroke="#FF4A00" stroke-width="0.6"/>
  <circle cx="490" cy="415" r="6" fill="#0a0a0a" stroke="#C8A96E" stroke-width="0.8"/>
  <circle cx="490" cy="415" r="3" fill="none" stroke="#FF4A00" stroke-width="0.6"/>
  <circle cx="710" cy="415" r="6" fill="#0a0a0a" stroke="#C8A96E" stroke-width="0.8"/>
  <circle cx="710" cy="415" r="3" fill="none" stroke="#FF4A00" stroke-width="0.6"/>

  <!-- Subframe text labels -->
  <text x="600" y="244" font-family="'Courier New', monospace" font-size="8" fill="#C8A96E" opacity="0.7" text-anchor="middle" letter-spacing="2">SUBFRAME / CRADLE ASSEMBLY</text>

  <!-- ============================================================ -->
  <!-- LEFT SIDE A-ARMS (viewed from above) -->
  <!-- ============================================================ -->

  <!-- === LEFT UPPER A-ARM === -->
  <!-- Upper A-arm body shape - forward arm -->
  <!-- Pivot points on subframe: front (420,275), rear (420,315) -->
  <!-- Outer ball joint: (185, 295) -->

  <path d="M420,278 L185,295 L420,312" fill="url(#armGradL)" stroke="none"/>
  <path d="M420,278 L185,295 L420,312"
        fill="none" stroke="#E8E8E8" stroke-width="1.4" opacity="0.8" stroke-linejoin="round"/>

  <!-- Upper A-arm orange rim highlight -->
  <path d="M420,278 L185,295" stroke="#FF4A00" stroke-width="1" opacity="0.6" filter="url(#bloom)"/>
  <path d="M185,295 L420,312" stroke="#FF4A00" stroke-width="0.7" opacity="0.4" filter="url(#bloom)"/>

  <!-- Upper A-arm ribs/detail lines -->
  <line x1="370" y1="281" x2="270" y2="292" stroke="#C8A96E" stroke-width="0.5" opacity="0.4"/>
  <line x1="370" y1="309" x2="270" y2="298" stroke="#C8A96E" stroke-width="0.5" opacity="0.4"/>
  <line x1="340" y1="283" x2="240" y2="293" stroke="#E8E8E8" stroke-width="0.3" opacity="0.25"/>
  <line x1="300" y1="286" x2="220" y2="293" stroke="#E8E8E8" stroke-width="0.3" opacity="0.25"/>

  <!-- Cross-section hash marks on upper arm -->
  <line x1="350" y1="282" x2="350" y2="308" stroke="#E8E8E8" stroke-width="0.4" opacity="0.2" stroke-dasharray="2,3"/>
  <line x1="310" y1="285" x2="310" y2="305" stroke="#E8E8E8" stroke-width="0.4" opacity="0.2"`,"wheels/hero":`<thinking>
The user wants a detailed SVG illustration of a 17-inch BBS forged alloy rally wheel with an aggressive all-terrain tire in 3/4 view. Key elements:
- Dark background #060606
- Electric orange #FF4A00 rim lighting and line details
- Gold #C8A96E for secondary highlights
- White #E8E8E8 for structural lines
- BBS-style forged alloy wheel
- Aggressive all-terrain tire
- 3/4 view perspective
- Beadlock ring
- Orange brake caliper behind spokes
- Hyper-detailed technical illustration style

Let me plan this out carefully:

1. The wheel will be in 3/4 view (slightly from the side and front)
2. The tire will be an ellipse shape due to perspective
3. BBS-style spokes - typically 5-spoke or multi-spoke forged design
4. Beadlock ring around the outer rim
5. Orange brake caliper visible through the spokes
6. Dark background

Let me think about the geometry:

For a 3/4 view, the wheel will be an ellipse. The center will be around (600, 340). The wheel radius will be about 250px, but in 3/4 view it'll be an ellipse with:
- Horizontal radius: ~280
- Vertical radius: ~300 (slightly more vertical due to 3/4 angle)

Actually for a proper 3/4 view, I need to think about this differently. Let me position the wheel center around (580, 340).

Tire outer ellipse: rx=280, ry=300
Rim outer ellipse: rx=220, ry=240
Inner rim: rx=170, ry=185
Hub area: rx=50, ry=55

Let me make this more detailed:

The 3/4 view means we're looking at the wheel from slightly above and to the front-side. This creates an elliptical projection.

Let me define the main shapes:

1. Background - dark rectangle
2. Tire - large outer ellipse with tread pattern
3. Sidewall details
4. Beadlock ring - outer ring detail
5. Rim face - elliptical
6. BBS-style spokes (5 spokes, Y-shaped)
7. Brake caliper (orange) visible between spokes
8. Hub center
9. Lighting effects

Let me think about the BBS spoke design. BBS RS/RG style has multiple spokes or the classic split-spoke design. For rally/forged, let me do a 6-spoke or 5-spoke aggressive design.

Actually for BBS forged rally wheels, they often use a 5-spoke or 6-spoke design. Let me go with a 5-spoke forged design.

For the 3/4 view perspective:
- Center of wheel: (590, 340)
- Tire outer: ellipse with rx=285, ry=295 (nearly circular for a more head-on 3/4)

Wait, let me reconsider the perspective. For a true 3/4 view:
- The wheel is tilted, so horizontally it appears compressed
- The vertical extent is larger than horizontal

Let me use:
- Cx=590, Cy=340
- Tire outer: rx=265, ry=285
- Tire inner (rim seat): rx=195, ry=210
- Beadlock ring outer: rx=200, ry=215
- Beadlock ring inner: rx=185, ry=200
- Rim face: rx=185, ry=200
- Hub: rx=45, ry=48

For the tread pattern, I'll create aggressive block patterns around the tire circumference.

For spokes - BBS rally style, I'll do 5 spokes. In the 3/4 view, they'll appear slightly foreshortened. I'll use paths to create the spoke shapes.

Let me write the SVG:

Actually, let me think more carefully about this. The 3/4 view can be interpreted as:
1. The wheel is rotated about 30-45 degrees from front-facing
2. This creates an elliptical projection

For a good 3/4 view rally wheel:
- The tire sidewall should be visible on one side
- The tread blocks should be visible on top
- The rim face is partially visible
- Spokes are visible but foreshortened on one side

Let me set up the coordinate system:

Center: (590, 350)
Wheel is slightly tilted showing the 3/4 perspective.

The outer tire edge (ellipse): rx=275, ry=290
The tire inner (where rim meets tire): rx=200, ry=212
Rim outer edge: rx=205, ry=218
Rim face inner: rx=190, ry=202

Actually I'll draw this more carefully. Let me plan layer by layer:

**Background**: Dark #060606, with some subtle gradients/grid lines

**Tire**: 
- Large ellipse for the outer boundary
- Tread blocks around the perimeter
- Sidewall with some text/details
- The tire appears as an ellipse; the tread visible on the outer edge

**Rim**:
- The rim face is an ellipse slightly smaller than the tire
- Beadlock ring - a series of bolts/screws around the outer rim
- Main rim face with gradient/metallic look
- Spokes - 5 spokes in BBS style
- Center hub

**Brake Caliper**:
- Visible behind/through spokes
- Orange color (#FF4A00)

Let me code this step by step. I'll use a transform to apply the 3/4 perspective effect.

Actually, let me think of a simpler approach. I'll draw everything in a front-facing view and then apply a skew/scale transform to get the 3/4 look.

Transform: scale(1, 0.85) applied to the wheel group, plus a slight rotation.

Or I can just draw it directly with appropriate ellipses.

Let me go with direct ellipses for the main shapes and create the perspective manually.

Here's my plan:

\`\`\`
Center: cx=590, cy=355
Scale factor for perspective: vertical is 0.88x of horizontal effectively
Tire outer ellipse: rx=270, ry=260 (slightly wider than tall due to 3/4)
\`\`\`

Wait, I'm overthinking this. Let me just draw it as if we're looking at it from a slight downward-right angle:

For a wheel viewed from slightly right and slightly above:
- Horizontal axis (rx) is slightly shorter than vertical (ry) - actually for slight downward tilt, ry < rx

Hmm, for a wheel rolling on the ground, viewed from front-right 3/4:
- The wheel is circular but appears as an ellipse
- If the wheel is vertical (upright as if rolling), and we're slightly to the right:
  - rx ≈ full radius
  - ry ≈ radius (wheel is vertical, so it doesn't compress much)
  
- If the perspective is more from above at an angle (like a studio shot):
  - rx > ry
  
For a typical tire/wheel showcase photo (3/4 view):
- The wheel appears slightly compressed horizontally (or vertically)
- Let's say the wheel is angled about 15-20 degrees

Let me just go with a nice looking composition:

Main ellipse center: (590, 360)
Outer tire: rx=270, ry=285 (slight vertical stretch for perspective)

Actually for a classic 3/4 wheel view in automotive photography, the wheel is turned about 30-45 degrees. The ellipse would have:
- If turned 30 degrees from front: rx = R*cos(30°) ≈ 0.866*R, ry = R

So if R = 280:
- rx ≈ 242, ry = 280

Let me go with something like:
- Center: (590, 350)
- Outer tire: rx=245, ry=285
- This gives a nice 3/4 look

Now for the spokes in 3/4 view - they need to be drawn with perspective foreshortening.

Actually, I think the cleanest approach is:
1. Draw everything in a group
2. Apply a transform to simulate the 3/4 perspective

The transform could be: scale(1, 0.88) which compresses vertically.

But the spokes need proper 3D treatment.

Let me just manually place things with the ellipses and create spoke paths that look good in 3/4 view.

For a 5-spoke wheel in 3/4 view, the spokes will radiate from center with appropriate foreshortening.

Let me think about the angles:
- Front-facing wheel: spokes at 72° intervals (360/5)
- In 3/4 view, the spokes still appear similar but the perspective warps them

For simplicity, I'll draw them as if we're looking at them from slightly tilted, with the ellipse providing the perspective cue. The spokes will converge at the hub center and reach the rim face.

Let me define the rim as an ellipse and draw spokes from center to the rim edge.

Here's my revised approach:

**Key dimensions:**
- cx=590, cy=355 (wheel center)
- Outer tire: rx=272, ry=285
- Tire sidewall visible area (inner edge of sidewall = outer edge of rim): rx=200, ry=210
- Beadlock outer: rx=205, ry=215
- Rim face: rx=195, ry=205
- Hub circle: rx=42, ry=44

**Tread blocks**: I'll create aggressive rectangular blocks around the outer perimeter of the tire using a series of rotated rectangles or polygon points.

**Spokes**: 5 spokes, each as a tapered shape (wider at center, narrower at rim). In 3/4 view.

**Beadlock ring**: A ring with small bolt heads, making it look like a beadlock ring.

**Brake caliper**: An orange shape visible through the spokes, positioned behind the wheel.

Let me now write the actual SVG code:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- gradients and filters -->
    <radialGradient id="rimGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#3a3a3a"/>
      <stop offset="40%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    
    <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#080808"/>
    </radialGradient>
    
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="orangeGlow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Background grid lines for technical feel -->
  ...
  
  <!-- Tire shadow/glow on ground -->
  ...
  
  <!-- Main tire body -->
  <ellipse cx="590" cy="355" rx="272" ry="285" fill="url(#tireGrad)"/>
  
  <!-- Tread blocks around perimeter -->
  ...
  
  <!-- Tire sidewall inner edge -->
  ...
  
  <!-- Rim body -->
  ...
  
  <!-- Brake caliper (orange, behind spokes) -->
  ...
  
  <!-- Spokes -->
  ...
  
  <!-- Beadlock ring -->
  ...
  
  <!-- Hub center -->
  ...
  
  <!-- Orange rim lighting -->
  ...
</svg>
\`\`\`

Let me now flesh this out with proper coordinates and shapes.

For the tread pattern, I'll create blocks around the tire edge. The tire is an ellipse with rx=272, ry=285. The tread blocks will be at various angles around the perimeter.

For an all-terrain tire, the tread pattern consists of:
- Large center blocks with sipes
- Aggressive shoulder blocks
- Large void spaces

For the tread visible on top of the tire (the contact area visible from 3/4 view), I'll create a series of blocks.

Let me define the tread:
- Tread visible: the part of the tire that's visible from the front-right (roughly the top 120° arc)
- Each tread block: approximately 25-30px wide, 20-25px tall
- Arranged in rows

Actually, for a tire in 3/4 view, you typically see:
1. The front face of the tire (the part facing us) - shows sidewall
2. The tread on the outer edge
3. The top of the tire where it touches the ground (but the wheel is floating in this illustration)

Let me think about which part of the tread is visible. In a 3/4 view where the wheel is upright (not on the ground) and we're looking from the right-front:
- The right side of the tire tread is visible
- The sidewall faces us slightly
- The rim face is partially visible

For the tread blocks, I'll draw them along the visible edge (right side) of the tire ellipse.

Let me compute some points on the ellipse for placing tread blocks:

Parametric form: x = cx + rx*cos(t), y = cy + ry*sin(t)

For angles from about -90° to 90° (the visible right side), I'll place tread blocks.

The normal to the ellipse at angle t is: (cos(t)/rx, sin(t)/ry) normalized.

This is getting complex. Let me simplify:

I'll use a clipPath approach - draw the full tire with tread blocks using a pattern, then clip to the visible area.

Or better: I'll draw the tread blocks as small rectangles positioned along the outer edge of the tire ellipse, pointing radially outward.

For an aggressive AT tire, I'll create:
1. A base dark ellipse for the tire
2. A slightly smaller ellipse for the sidewall color
3. Tread blocks as rotated rectangles around the perimeter

Let me write more concrete SVG. I'll position tread blocks at various angles:

For angle θ (from -60° to 60° visible on the right side, plus some on top):
- Each block center: (cx + (rx+5)*cos(θ), cy + (ry+5)*sin(θ))
- Block rotated by θ

Actually, I realize I should think about this differently. The tread pattern is on the outer CIRCUMFERENCE of the tire, which appears as the outer ring of the ellipse. Looking from the 3/4 view, the tread pattern creates ridges and grooves on this ring.

Let me take a more practical approach:

1. Draw the tire as a thick ring (annulus) ellipse
2. Use a series of rectangles/polygons along the outer edge for tread blocks
3. The inner part (rim area) will be the metallic wheel

Here's a more structured plan:

**Tire outer**: ellipse cx=590, cy=355, rx=272, ry=285 - filled dark with gradient
**Tire inner edge (bead area)**: ellipse cx=590, cy=355, rx=198, ry=208 - this is where rim meets tire

**Tread details**: I'll create about 24-32 tread blocks around the perimeter. Each block is a small rectangle offset from the ellipse edge, rotated to be radial.

For the visible portion (let's say 40 blocks total around the full circle):
- Spacing: 360/40 = 9° apart
- For each angle: x = 590 + 272*cos(angle), y = 355 + 285*sin(angle)
- Draw a rectangle centered at that point, rotated by angle

This is doable but tedious to write by hand. Let me write the key ones and make it look good.

For the BBS spoke design, I'll do 6 spokes (BBS often does 6 or 5). Let me do 5 for the classic look.

5 sp`,"wheels/side":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#060606">
  <defs>
    <!-- Radial gradient for tire body -->
    <radialGradient id="tireGrad" cx="42%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="60%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    <!-- Rim gradient with orange rim light from left -->
    <radialGradient id="rimGrad" cx="30%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#FF6A20"/>
      <stop offset="25%" stop-color="#CC3A00"/>
      <stop offset="55%" stop-color="#3a2a1a"/>
      <stop offset="80%" stop-color="#1a1008"/>
      <stop offset="100%" stop-color="#0a0804"/>
    </radialGradient>
    <!-- Spoke gradient -->
    <linearGradient id="spokeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#C8A96E"/>
      <stop offset="60%" stop-color="#888"/>
      <stop offset="100%" stop-color="#222"/>
    </linearGradient>
    <linearGradient id="spokeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF5500" stop-opacity="0.7"/>
      <stop offset="40%" stop-color="#C8A96E" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <!-- Hub gradient -->
    <radialGradient id="hubGrad" cx="35%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FF6A20"/>
      <stop offset="20%" stop-color="#C8A96E"/>
      <stop offset="50%" stop-color="#444"/>
      <stop offset="100%" stop-color="#111"/>
    </radialGradient>
    <!-- Hub cap gradient -->
    <radialGradient id="hubCapGrad" cx="30%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#FF7730"/>
      <stop offset="30%" stop-color="#C8A96E"/>
      <stop offset="60%" stop-color="#555"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </radialGradient>
    <!-- Tire sidewall highlight -->
    <radialGradient id="sidewallGrad" cx="28%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.4"/>
      <stop offset="40%" stop-color="#FF4A00" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <!-- Inner rim shadow -->
    <radialGradient id="innerRimGrad" cx="35%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#FF5500" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#C8A96E" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.8"/>
    </radialGradient>
    <!-- Drop shadow filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="orangeGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feFlood flood-color="#FF4A00" flood-opacity="0.3" result="color"/>
      <feComposite in="color" in2="blur" operator="in" result="colorBlur"/>
      <feComposite in="SourceGraphic" in2="colorBlur" operator="over"/>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <clipPath id="wheelClip">
      <circle cx="600" cy="337" r="290"/>
    </clipPath>
  </defs>

  <!-- Background subtle vignette -->
  <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#0f0a06"/>
    <stop offset="100%" stop-color="#060606"/>
  </radialGradient>
  <rect width="1200" height="675" fill="url(#bgGrad)"/>

  <!-- Ground shadow -->
  <ellipse cx="600" cy="640" rx="280" ry="22" fill="#FF4A00" opacity="0.08"/>
  <ellipse cx="600" cy="642" rx="200" ry="12" fill="#000" opacity="0.6"/>

  <!-- === TIRE OUTER BODY === -->
  <circle cx="600" cy="337" r="292" fill="#0a0a0a" filter="url(#orangeGlow)"/>
  <circle cx="600" cy="337" r="290" fill="url(#tireGrad)"/>

  <!-- Tire sidewall orange rim lighting from left -->
  <circle cx="600" cy="337" r="290" fill="url(#sidewallGrad)"/>

  <!-- Tire outer edge highlight (left-lit) -->
  <path d="M 315,200 A 290,290 0 0,1 340,500" stroke="#FF4A00" stroke-width="3.5" fill="none" opacity="0.7" stroke-linecap="round"/>
  <path d="M 318,210 A 285,285 0 0,1 343,490" stroke="#FF6622" stroke-width="1.5" fill="none" opacity="0.4"/>

  <!-- Tire outer ring structural line -->
  <circle cx="600" cy="337" r="288" fill="none" stroke="#E8E8E8" stroke-width="0.5" opacity="0.15"/>
  <circle cx="600" cy="337" r="283" fill="none" stroke="#E8E8E8" stroke-width="0.3" opacity="0.1"/>

  <!-- === TREAD PATTERN === -->
  <!-- Main tread blocks - outer ring -->
  <!-- Tread is shown on visible portion, wrap around circumference -->
  <!-- Tread grooves - multiple concentric rings -->
  <circle cx="600" cy="337" r="276" fill="none" stroke="#1a1a1a" stroke-width="8"/>
  <circle cx="600" cy="337" r="268" fill="none" stroke="#111" stroke-width="4"/>
  <circle cx="600" cy="337" r="260" fill="none" stroke="#1a1a1a" stroke-width="6"/>

  <!-- Tread block pattern - radial cuts across tread area -->
  <!-- Using clipping to keep tread in tire area -->
  <g clip-path="url(#wheelClip)">
    <!-- Center groove -->
    <circle cx="600" cy="337" r="272" fill="none" stroke="#0a0a0a" stroke-width="5"/>

    <!-- Tread blocks - angular cuts through tread zone -->
    <!-- 36 major tread cuts at 10-degree intervals -->
    <g stroke="#0d0d0d" stroke-width="3" fill="none">
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(0,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(10,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(20,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(30,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(40,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(50,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(60,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(70,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(80,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(90,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(100,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(110,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(120,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(130,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(140,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(150,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(160,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="625" transform="rotate(170,600,337)"/>
    </g>

    <!-- Tread block highlights - left side lit by orange -->
    <g stroke="#FF4A00" stroke-width="0.8" fill="none" opacity="0.5">
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(170,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(180,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(190,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(200,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(160,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(150,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(140,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="110" transform="rotate(210,600,337)"/>
    </g>

    <!-- Tread sub-pattern - diagonal sipes on each block -->
    <!-- Left quarter tread detail -->
    <g stroke="#1f1f1f" stroke-width="1.5" fill="none">
      <!-- Sipes at various angles in tread blocks -->
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(5,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(15,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(25,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(35,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(45,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(55,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(65,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(75,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(85,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(95,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(105,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(115,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(125,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(135,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(145,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(155,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(165,600,337)"/>
      <line x1="600" y1="47" x2="600" y2="80" transform="rotate(175,600,337)"/>
    </g>

    <!-- Outer tread shoulder groove -->
    <circle cx="600" cy="337" r="282" fill="none" stroke="#0d0d0d" stroke-width="3" opacity="0.9"/>
    <!-- Inner tread shoulder groove -->
    <circle cx="600" cy="337" r="256" fill="none" stroke="#111" stroke-width="3" opacity="0.9"/>
    <!-- Center rib groove -->
    <circle cx="600" cy="337" r="269" fill="none" stroke="#080808" stroke-width="6"/>

    <!-- Lateral sipes on tread blocks (angled for rally aggressive pattern) -->
    <!-- These are small diagonal cuts in tread blocks -->
    <g stroke="#161616" stroke-width="1" fill="none">
      <line x1="600" y1="50" x2="612" y2="78" transform="rotate(0,600,337)"/>
      <line x1="600" y1="50" x2="588" y2="78" transform="rotate(0,600,337)"/>
      <line x1="600" y1="50" x2="612" y2="78" transform="rotate(10,600,337)"/>
      <line x1="600" y1="50" x2="588" y2="78" transform="rotate(10,600,337)"/>
      <line x1="600" y1="50" x2="612" y2="78`,"wheels/top":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="100%" stop-color="#060606"/>
    </radialGradient>
    <radialGradient id="tyreGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="85%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#222222"/>
    </radialGradient>
    <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="60%" stop-color="#1e1e1e"/>
      <stop offset="100%" stop-color="#333333"/>
    </radialGradient>
    <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3a3a3a"/>
      <stop offset="50%" stop-color="#252525"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </radialGradient>
    <radialGradient id="nutGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#d4b97e"/>
      <stop offset="40%" stop-color="#C8A96E"/>
      <stop offset="100%" stop-color="#7a6030"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glowStrong" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glowSoft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="wheelClip">
      <circle cx="600" cy="337.5" r="300"/>
    </clipPath>
    <pattern id="carbonPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#1a1a1a"/>
      <rect x="0" y="0" width="4" height="4" fill="#1e1e1e" opacity="0.6"/>
      <rect x="4" y="4" width="4" height="4" fill="#1e1e1e" opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Grid lines technical diagram background -->
  <g opacity="0.08" stroke="#E8E8E8" stroke-width="0.5">
    <!-- Vertical grid -->
    <line x1="0" y1="337.5" x2="1200" y2="337.5"/>
    <line x1="600" y1="0" x2="600" y2="675"/>
    <line x1="0" y1="37.5" x2="1200" y2="37.5"/>
    <line x1="0" y1="75" x2="1200" y2="75"/>
    <line x1="0" y1="112.5" x2="1200" y2="112.5"/>
    <line x1="0" y1="150" x2="1200" y2="150"/>
    <line x1="0" y1="187.5" x2="1200" y2="187.5"/>
    <line x1="0" y1="225" x2="1200" y2="225"/>
    <line x1="0" y1="262.5" x2="1200" y2="262.5"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="375" x2="1200" y2="375"/>
    <line x1="0" y1="412.5" x2="1200" y2="412.5"/>
    <line x1="0" y1="450" x2="1200" y2="450"/>
    <line x1="0" y1="487.5" x2="1200" y2="487.5"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="0" y1="562.5" x2="1200" y2="562.5"/>
    <line x1="0" y1="600" x2="1200" y2="600"/>
    <line x1="0" y1="637.5" x2="1200" y2="637.5"/>
    <line x1="37.5" y1="0" x2="37.5" y2="675"/>
    <line x1="75" y1="0" x2="75" y2="675"/>
    <line x1="112.5" y1="0" x2="112.5" y2="675"/>
    <line x1="150" y1="0" x2="150" y2="675"/>
    <line x1="187.5" y1="0" x2="187.5" y2="675"/>
    <line x1="225" y1="0" x2="225" y2="675"/>
    <line x1="262.5" y1="0" x2="262.5" y2="675"/>
    <line x1="300" y1="0" x2="300" y2="675"/>
    <line x1="337.5" y1="0" x2="337.5" y2="675"/>
    <line x1="375" y1="0" x2="375" y2="675"/>
    <line x1="412.5" y1="0" x2="412.5" y2="675"/>
    <line x1="450" y1="0" x2="450" y2="675"/>
    <line x1="487.5" y1="0" x2="487.5" y2="675"/>
    <line x1="525" y1="0" x2="525" y2="675"/>
    <line x1="562.5" y1="0" x2="562.5" y2="675"/>
    <line x1="637.5" y1="0" x2="637.5" y2="675"/>
    <line x1="675" y1="0" x2="675" y2="675"/>
    <line x1="712.5" y1="0" x2="712.5" y2="675"/>
    <line x1="750" y1="0" x2="750" y2="675"/>
    <line x1="787.5" y1="0" x2="787.5" y2="675"/>
    <line x1="825" y1="0" x2="825" y2="675"/>
    <line x1="862.5" y1="0" x2="862.5" y2="675"/>
    <line x1="900" y1="0" x2="900" y2="675"/>
    <line x1="937.5" y1="0" x2="937.5" y2="675"/>
    <line x1="975" y1="0" x2="975" y2="675"/>
    <line x1="1012.5" y1="0" x2="1012.5" y2="675"/>
    <line x1="1050" y1="0" x2="1050" y2="675"/>
    <line x1="1087.5" y1="0" x2="1087.5" y2="675"/>
    <line x1="1125" y1="0" x2="1125" y2="675"/>
    <line x1="1162.5" y1="0" x2="1162.5" y2="675"/>
  </g>

  <!-- Dimension lines -->
  <g stroke="#C8A96E" stroke-width="0.7" opacity="0.5" fill="none">
    <line x1="600" y1="37.5" x2="600" y2="637.5" stroke-dasharray="4,6"/>
    <line x1="300" y1="337.5" x2="900" y2="337.5" stroke-dasharray="4,6"/>
    <line x1="600" y1="37.5" x2="600" y2="55" stroke-width="1.5"/>
    <line x1="600" y1="637.5" x2="600" y2="620" stroke-width="1.5"/>
    <line x1="300" y1="337.5" x2="315" y2="337.5" stroke-width="1.5"/>
    <line x1="900" y1="337.5" x2="885" y2="337.5" stroke-width="1.5"/>
  </g>

  <!-- Crosshair center markers -->
  <g stroke="#FF4A00" stroke-width="0.8" opacity="0.4" fill="none">
    <line x1="600" y1="30" x2="600" y2="644"/>
    <line x1="293" y1="337.5" x2="907" y2="337.5"/>
  </g>

  <!-- ============ TYRE ============ -->
  <!-- Outer tyre body -->
  <circle cx="600" cy="337.5" r="300" fill="url(#tyreGrad)"/>
  
  <!-- Tyre outer sidewall rim glow -->
  <circle cx="600" cy="337.5" r="300" fill="none" stroke="#FF4A00" stroke-width="2.5" opacity="0.8" filter="url(#glow)"/>
  <circle cx="600" cy="337.5" r="300" fill="none" stroke="#FF4A00" stroke-width="1" opacity="0.5"/>
  <circle cx="600" cy="337.5" r="298" fill="none" stroke="#FF4A00" stroke-width="0.5" opacity="0.3"/>
  
  <!-- Tyre inner edge -->
  <circle cx="600" cy="337.5" r="265" fill="#0d0d0d"/>
  <circle cx="600" cy="337.5" r="265" fill="none" stroke="#E8E8E8" stroke-width="1" opacity="0.6"/>
  <circle cx="600" cy="337.5" r="263" fill="none" stroke="#E8E8E8" stroke-width="0.4" opacity="0.3"/>

  <!-- Tyre tread pattern - outer blocks -->
  <!-- Main tread blocks - circumferential rings -->
  
  <!-- Outer tread ring blocks -->
  <g fill="none" stroke="#333333" stroke-width="1">
    <!-- Generate tread blocks around circumference - large outer blocks -->
    <g transform="translate(600,337.5)">
      <!-- 24 major tread blocks on outer ring -->
      <!-- Block 0 deg -->
      <path d="M 270,0 A 270,270 0 0,1 282.74,47.26 L 295.88,44.35 A 284,284 0 0,0 284,0 Z" fill="#222222" stroke="#444444" stroke-width="0.8"/>
      <path d="M 282.74,47.26 A 270,270 0 0,1 255.52,91.56 L 268.1,95.36 A 284,284 0 0,0 295.88,44.35 Z" fill="#1e1e1e" stroke="#444444" stroke-width="0.8"/>
      <path d="M 255.52,91.56 A 270,270 0 0,1 212.13,127.28 L 222.56,134.58 A 284,284 0 0,0 268.1,95.36 Z" fill="#242424" stroke="#444444" stroke-width="0.8"/>
      <path d="M 212.13,127.28 A 270,270 0 0,1 155.56,150.28 L 162.4,158.8 A 284,284 0 0,0 222.56,134.58 Z" fill="#1e1e1e" stroke="#444444" stroke-width="0.8"/>
      <path d="M 155.56,150.28 A 270,270 0 0,1 90,156.2 L 94.74,164.73 A 284,284 0 0,0 162.4,158.8 Z" fill="#222222" stroke="#444444" stroke-width="0.8"/>
      <path d="M 90,156.2 A 270,270 0 0,1 23.56,149.25 L 24.81,157.63 A 284,284 0 0,0 94.74,164.73 Z" fill="#1e1e1e" stroke="#444444" stroke-width="0.8"/>
      <path d="M 23.56,149.25 A 270,270 0 0,1 -33.89,129.9 L -35.64,138.11 A 284,284 0 0,0 24.81,157.63 Z" fill="#242424" stroke="#444444" stroke-width="0.8"/>
      <path d="M -33.89,129.9 A 270,270 0 0,1 -84.15,101.93 L -88.54,108.85 A 284,284 0 0,0 -35.64,138.11 Z" fill="#1e1e1e" stroke="#444444" stroke-width="0.8"/>
    </g>
  </g>

  <!-- Tread grooves - circumferential -->
  <circle cx="600" cy="337.5" r="292" fill="none" stroke="#0a0a0a" stroke-width="4"/>
  <circle cx="600" cy="337.5" r="285" fill="none" stroke="#111111" stroke-width="3"/>
  <circle cx="600" cy="337.5" r="278" fill="none" stroke="#0a0a0a" stroke-width="5"/>
  <circle cx="600" cy="337.5" r="270" fill="none" stroke="#080808" stroke-width="3"/>
  
  <!-- Tread block texture lines (circumferential grooves highlight) -->
  <circle cx="600" cy="337.5" r="292" fill="none" stroke="#2a2a2a" stroke-width="1"/>
  <circle cx="600" cy="337.5" r="285" fill="none" stroke="#252525" stroke-width="0.8"/>
  <circle cx="600" cy="337.5" r="278" fill="none" stroke="#2a2a2a" stroke-width="1"/>
  <circle cx="600" cy="337.5" r="270" fill="none"`,"body/hero":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#060606"/>
    </radialGradient>
    <radialGradient id="rimLight" cx="20%" cy="50%" r="80%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="floorGlow" cx="50%" cy="100%" r="60%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="30%" stop-color="#111111"/>
      <stop offset="70%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#252525"/>
      <stop offset="40%" stop-color="#181818"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <linearGradient id="orangeStripe" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#FF6A20"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a2530" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#0d1820" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#060d15" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="wheelGrad" cx="50%" cy="50%" r="50%" x1="20%" y1="20%" x2="80%" y2="80%">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="50%" stop-color="#111"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C8A96E"/>
      <stop offset="50%" stop-color="#8a7040"/>
      <stop offset="100%" stop-color="#3a2a10"/>
    </linearGradient>
    <linearGradient id="splitterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="groundReflect" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="strongGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="ambientGlow">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="bodyClip">
      <rect x="0" y="0" width="1200" height="675"/>
    </clipPath>
    <pattern id="carbonFiber" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="8" fill="#111"/>
      <rect x="0" y="0" width="4" height="4" fill="#161616" opacity="0.8"/>
      <rect x="4" y="4" width="4" height="4" fill="#161616" opacity="0.8"/>
      <rect x="0" y="0" width="4" height="4" fill="#1a1a1a" opacity="0.3"/>
      <line x1="0" y1="0" x2="4" y2="4" stroke="#0d0d0d" stroke-width="0.3" opacity="0.5"/>
      <line x1="4" y1="0" x2="0" y2="4" stroke="#0d0d0d" stroke-width="0.3" opacity="0.3"/>
      <line x1="4" y1="4" x2="8" y2="8" stroke="#0d0d0d" stroke-width="0.3" opacity="0.5"/>
      <line x1="8" y1="4" x2="4" y2="8" stroke="#0d0d0d" stroke-width="0.3" opacity="0.3"/>
    </pattern>
    <pattern id="carbonFiber2" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="#0d0d0d"/>
      <rect x="0" y="0" width="3" height="3" fill="#141414" opacity="0.9"/>
      <rect x="3" y="3" width="3" height="3" fill="#141414" opacity="0.9"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  <rect width="1200" height="675" fill="url(#rimLight)"/>
  <rect width="1200" height="675" fill="url(#floorGlow)"/>

  <!-- Ground plane -->
  <ellipse cx="600" cy="620" rx="520" ry="25" fill="#FF4A00" opacity="0.06"/>
  <rect x="80" y="610" width="1040" height="2" fill="#FF4A00" opacity="0.12"/>

  <!-- Ground reflections -->
  <ellipse cx="380" cy="618" rx="180" ry="10" fill="#FF4A00" opacity="0.08"/>
  <ellipse cx="850" cy="618" rx="150" ry="8" fill="#FF4A00" opacity="0.06"/>

  <!-- Cinematic rim lighting from left -->
  <ellipse cx="150" cy="350" rx="200" ry="400" fill="#FF4A00" opacity="0.04"/>

  <!-- === MAIN TRUCK BODY === -->

  <!-- Shadow under truck -->
  <ellipse cx="570" cy="620" rx="440" ry="20" fill="#000" opacity="0.7"/>

  <!-- ===================== -->
  <!-- REAR WHEEL ARCH / BED SIDE -->
  <!-- ===================== -->

  <!-- Truck bed side panel -->
  <path d="M 820 280 L 1050 260 L 1080 280 L 1090 480 L 820 500 Z" fill="url(#carbonFiber)" stroke="none"/>
  <path d="M 820 280 L 1050 260 L 1080 280 L 1090 480 L 820 500 Z" fill="#0d0d0d" opacity="0.4"/>

  <!-- Bed panel carbon detail lines -->
  <line x1="840" y1="285" x2="1065" y2="265" stroke="#E8E8E8" stroke-width="0.4" opacity="0.15"/>
  <line x1="840" y1="310" x2="1070" y2="290" stroke="#E8E8E8" stroke-width="0.3" opacity="0.1"/>
  <line x1="840" y1="340" x2="1075" y2="320" stroke="#E8E8E8" stroke-width="0.3" opacity="0.1"/>

  <!-- Bed rail -->
  <path d="M 820 275 L 1055 254 L 1082 274 L 1082 288 L 1055 268 L 820 289 Z" fill="#1a1a1a" stroke="#E8E8E8" stroke-width="0.5" opacity="0.8"/>
  <path d="M 820 275 L 1055 254 L 1082 274 L 1082 288 L 1055 268 L 820 289 Z" fill="#FF4A00" opacity="0.05"/>

  <!-- Rear wheel arch -->
  <path d="M 820 500 L 1090 480 L 1090 540 Q 1050 580 950 590 Q 850 595 820 560 Z" fill="url(#carbonFiber)" stroke="none"/>
  <ellipse cx="950" cy="570" rx="110" ry="108" fill="#080808" stroke="#1a1a1a" stroke-width="2"/>
  <!-- Rear arch flare -->
  <path d="M 840 500 Q 835 530 840 565 Q 855 595 900 600 Q 960 610 1010 598 Q 1055 585 1075 555 Q 1090 530 1085 500" fill="none" stroke="#FF4A00" stroke-width="1.5" opacity="0.7" filter="url(#softGlow)"/>
  <path d="M 845 502 Q 840 532 845 566 Q 860 594 902 603 Q 962 613 1012 600 Q 1056 587 1076 557 Q 1091 532 1086 502" fill="none" stroke="#E8E8E8" stroke-width="0.4" opacity="0.3"/>

  <!-- ===================== -->
  <!-- MAIN BODY SIDE PANEL -->
  <!-- ===================== -->
  <path d="M 280 300 L 820 280 L 820 500 Q 720 510 620 515 L 440 520 L 280 510 Z"
        fill="url(#carbonFiber)" stroke="none"/>
  <path d="M 280 300 L 820 280 L 820 500 Q 720 510 620 515 L 440 520 L 280 510 Z"
        fill="#0a0a0a" opacity="0.5"/>

  <!-- Side body rim lighting (orange from left) -->
  <path d="M 280 300 L 400 290 L 400 510 L 280 510 Z" fill="#FF4A00" opacity="0.04"/>

  <!-- Door panel lines / body seams -->
  <line x1="520" y1="282" x2="520" y2="512" stroke="#E8E8E8" stroke-width="0.6" opacity="0.25"/>
  <line x1="680" y1="280" x2="680" y2="508" stroke="#E8E8E8" stroke-width="0.6" opacity="0.2"/>

  <!-- Body character line (main crease) -->
  <path d="M 280 380 Q 450 368 620 365 Q 750 363 820 360" fill="none" stroke="#FF4A00" stroke-width="1.2" opacity="0.5" filter="url(#softGlow)"/>
  <path d="M 280 382 Q 450 370 620 367 Q 750 365 820 362" fill="none" stroke="#E8E8E8" stroke-width="0.5" opacity="0.3"/>

  <!-- Lower body panel -->
  <path d="M 280 430 Q 450 422 620 420 Q 750 418 820 416 L 820 500 Q 620 515 440 520 L 280 510 Z"
        fill="#080808" opacity="0.6"/>
  <path d="M 280 430 L 820 416" stroke="#E8E8E8" stroke-width="0.5" opacity="0.2"/>

  <!-- Carbon fiber weave detail on lower body -->
  <path d="M 300 440 Q 550 428 800 420" fill="none" stroke="#1a1a1a" stroke-width="3" opacity="0.5"/>
  <path d="M 300 450 Q 550 438 800 430" fill="none" stroke="#1a1a1a" stroke-width="3" opacity="0.4"/>
  <path d="M 300 460 Q 550 448 800 440" fill="none" stroke="#1a1a1a" stroke-width="3" opacity="0.3"/>

  <!-- Orange race stripe on body -->
  <path d="M 280 340 L 820 320 L 820 355 L 280 375 Z" fill="url(#orangeStripe)" opacity="0.85"/>
  <!-- Stripe edge highlights -->
  <path d="M 280 340 L 820 320" stroke="#FF6A20" stroke-width="0.8" opacity="0.9" filter="url(#softGlow)"/>
  <path d="M 280 375 L 820 355" stroke="#C8A96E" stroke-width="0.5" opacity="0.4"/>

  <!-- Stripe detail lines -->
  <path d="M 300 342 L 800 323" stroke="#FF8040" stroke-width="0.4" opacity="0.5"/>
  <path d="M 300 345 L 800 326" stroke="#FF8040" stroke-width="0.3" opacity="0.3"/>

  <!-- Door handles -->
  <rect x="530" y="355" width="55" height="10" rx="4" fill="#1a1a1a" stroke="#C8A96E" stroke-width="0.8" opacity="0.8"/>
  <rect x="530" y="356" width="55" height="4" rx="2" fill="#C8A`,"body/side":`<thinking>
The user wants a detailed SVG illustration of a rally truck in pure side elevation view. Let me create a hyper-detailed technical illustration with:

- Dark background #060606
- Electric orange #FF4A00 rim lighting and line details
- Gold #C8A96E for secondary highlights
- White #E8E8E8 for structural lines
- Race number on door
- Carbon panels
- Roof scoop
- Rear spoiler
- Orange stripe
- viewBox 0 0 1200 675

Let me design a rally truck side profile. I'll think about the proportions:

The truck should be a Dakar-style rally truck, like a Kamaz or similar. Let me plan the shapes:

Body main outline - a cab-over or conventional truck
- Large front grille area
- Cab section
- Extended body
- Rear spoiler/wing
- Wheel arches (large, with big off-road tires)
- Roof scoop
- Orange racing stripe
- Race number on door
- Carbon fiber panel texture

Let me think about the coordinate system. viewBox is 0 0 1200 675.

I'll place the truck roughly centered, spanning most of the width.

Let me think about a typical rally truck (like Kamaz Master style):
- Two large wheels (front and rear)
- Extended cab
- Aerodynamic body
- Large wheel arches

Truck proportions (side view):
- Total length: about 900px
- Height: about 350px
- Position: starting around x=100, y around 200 for the top

Let me sketch out the key coordinates:

Truck body (conventional cab style like a Dakar truck):

Main body outline:
- Start from front bumper
- Go up through hood
- Windshield angle
- Roof with scoop
- Rear cabin
- Rear spoiler
- Rear panel
- Rear wheel arch
- Floor line
- Front wheel arch
- Back to front bumper

Let me define key points:

Front of truck: x=150
Rear of truck: x=1050
Floor level: y=480
Top of cab: y=165

Front wheel center: x=310, y=490
Rear wheel center: x=880, y=490
Wheel radius: ~120px

Let me design this more carefully:

Front bumper: x=150, extending from y=380 to y=490
Hood starts at x=200, y=290
Windshield: from x=290, y=270 to x=370, y=180
Roof: from x=370, y=170 to x=720, y=165
Rear of cab/start of bed: x=720
Rear body: to x=1040

Actually, let me make this a proper rally truck. These are usually modified pickup trucks or purpose-built race trucks.

Let me try a more realistic truck shape:

Body base coordinates:
- Front bumper bottom: (155, 495)
- Front bumper top: (155, 400)
- Hood front: (175, 340)
- Hood line to windshield base: (295, 285)
- Windshield angle up: (345, 195)
- Roof front: (395, 175)
- Roof (with scoop): continues to (750, 170)
- Rear roofline: (800, 185)
- Rear glass: (830, 250)
- Rear body top: (870, 265)
- Rear spoiler attached
- Rear panel: down to (1050, 490)
- Floor line back: (155, 495)

Wheel arches:
Front wheel: center (320, 490), radius 110
Rear wheel: center (880, 490), radius 110

Let me now write the actual SVG. I'll need:
1. Background with gradient
2. Ground shadow/reflection
3. Truck body fill
4. Wheel arches cut out (or overlaid)
5. Wheels with detailed rims
6. Carbon panel textures
7. Orange stripe
8. Race number
9. Roof scoop detail
10. Rear spoiler detail
11. Windows
12. Lights
13. Various details

This is going to be a complex SVG. Let me write it carefully.

For the carbon fiber texture, I'll use a pattern definition.

Let me plan the truck path more carefully for a Dakar-style rally truck:

The truck will be a modified pickup truck / race truck profile.

Key measurements:
- Viewport: 1200 x 675
- Ground line: y=520
- Front of truck: x=120
- Rear of truck: x=1080
- Wheel centers at y=520 (sitting on ground)
- Front wheel center: x=320
- Rear wheel center: x=880

Wheel radius: 105px

So wheels touch ground at y=625... that's too low. Let me adjust.

Ground line: y=545
Wheel centers: y=440 (so wheels go from y=335 to y=545, touching ground)
Wheel radius: 105

Front wheel center: (320, 440)
Rear wheel center: (880, 440)

Truck body top: around y=130
Total truck height: about 310px which is reasonable for the scale.

Let me lay out the main body path:

Starting from front bumper, going clockwise:

Front lower bumper: 
- (130, 510) - front skid plate bottom front
- Bumper shape

Actually, let me simplify and just make a clear, detailed polygon for the main body, then add details.

Main body outline (the silhouette):
M 130,520  <- front-bottom of bumper/skid
L 130,450  <- front of bumper (vertical)
L 155,400  <- bumper top / hood bottom start
L 180,340  <- front of hood
L 200,280  <- hood rising
L 290,260  <- windshield base (front)
L 350,170  <- windshield top
L 410,150  <- roof front
L 780,148  <- roof (with slight rake)
L 810,160  <- start of rear slope
L 840,220  <- rear window top
L 870,260  <- rear window bottom
L 920,270  <- body side rear top
L 980,290  <- rear spoiler base
L 1020,310 <- rear with spoiler down
L 1040,380 <- rear panel
L 1050,520 <- rear bottom
L 880+105, 520  <- meeting rear wheel arch
[rear wheel arch cutout]
L 880-105, 520  <- rear wheel arch other side
...
[floor line]
...
[front wheel arch]
...
L 130,520  <- back to start

This is getting complex. Let me write it as a clipping path or just define the body with wheel arches as separate elements.

Let me approach this differently - draw the main body shape, then overlay wheel arches and wheels.

Actually for a clean look, let me use clipPath for the wheel wells, or just draw the body with the wheel well cutouts as part of the path.

Let me write the SVG now, being creative and detailed:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- Carbon fiber pattern -->
    <pattern id="carbon" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="#111111"/>
      <rect width="4" height="4" fill="#1a1a1a"/>
      <rect x="4" y="4" width="4" height="4" fill="#1a1a1a"/>
      <line x1="0" y1="0" x2="8" y2="0" stroke="#222" stroke-width="0.5"/>
      <line x1="0" y1="0" x2="0" y2="8" stroke="#222" stroke-width="0.5"/>
    </pattern>
    
    <!-- Carbon fiber pattern 2 (for door panels) -->
    <pattern id="carbon2" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="#0d0d0d"/>
      <rect width="3" height="3" fill="#141414"/>
      <rect x="3" y="3" width="3" height="3" fill="#141414"/>
      <line x1="0" y1="3" x2="6" y2="3" stroke="#1f1f1f" stroke-width="0.5"/>
      <line x1="3" y1="0" x2="3" y2="6" stroke="#1f1f1f" stroke-width="0.5"/>
    </pattern>
    
    <!-- Gradient for body -->
    <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="40%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    
    <!-- Orange rim light gradient -->
    <linearGradient id="orangeRimLight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0"/>
    </linearGradient>
    
    <!-- Wheel gradient -->
    <radialGradient id="tireGrad" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#080808"/>
    </radialGradient>
    
    <!-- Rim gradient -->
    <radialGradient id="rimGrad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#888888"/>
      <stop offset="50%" stop-color="#444444"/>
      <stop offset="100%" stop-color="#222222"/>
    </radialGradient>
    
    <!-- Ground glow -->
    <radialGradient id="groundGlow" cx="50%" cy="0%" r="50%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0"/>
    </radialGradient>
    
    <!-- Background gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#060606"/>
    </radialGradient>
    
    <!-- Window gradient -->
    <linearGradient id="windowGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2a3a" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#0d1520" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#050d15" stop-opacity="1"/>
    </linearGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Grid lines (technical drawing feel) -->
  <!-- ... -->
  
  <!-- Ground shadow -->
  <ellipse cx="600" cy="560" rx="480" ry="25" fill="url(#groundGlow)"/>
  
  <!-- Ground line -->
  <line x1="50" y1="545" x2="1150" y2="545" stroke="#FF4A00" stroke-width="1" stroke-opacity="0.3"/>
  
  <!-- Truck shadow on ground -->
  <ellipse cx="600" cy="546" rx="450" ry="12" fill="#FF4A00" fill-opacity="0.05"/>
  
  <!-- ====== MAIN TRUCK BODY ====== -->
  
  <!-- Body silhouette with wheel wells -->
  <!-- This is the main body shape -->
  
  <!-- ... lots of detail paths ... -->
  
</svg>
\`\`\`

Let me now design the truck more carefully. I'll draw a Dakar-style rally truck (like a T1 pickup truck or purpose-built truck). 

Let me use more exact coordinates:

Ground level: y = 545
Wheel radius: 100px
Wheel centers at y = 445 (so bottom of wheel at y=545, touching ground)
Front wheel center: x = 310, y = 445  
Rear wheel center: x = 870, y = 445

Truck body outline (the large filled shape):

I'll trace it going counter-clockwise from front-bottom:

Front skid plate: approx x=130 to x=200, y=480 to y=545
Front bumper: 
Hood line: rises from front to windshield
Windshield: angled back
Roof: relatively flat with scoop
Rear: slope down to rear panel
Rear spoiler at rear
Floor/chassis

Let me define the complete truck body path. I'll make it a Dakar T1 style pickup:

The main body polygon (without wheel wells - I'll subtract those):

Starting from front-bottom-right of bumper going clockwise:
1. Front bumper bottom-front: (130, 545) 
2. Up the front bumper face: (130, 430)
3. Front bumper/air dam top: (160, 390)
4. Hood start: (190, 355)  
5. Hood line: (200, 320)
6. Hood top front: (215, 295)
7. Hood slopes back to windshield base: (300, 275)
8. Windshield lower: (315, 265)
9. Windshield upper: (375, 178)
10. A-pillar top: (395, 165)
11. Roof front: (420, 158)
12. Roof (with roof scoop bump): ... 
    - (500, 152) before scoop
    - (520, 135) scoop front
    - (580, 128) scoop top
    - (640, 135) scoop back
    - (660, 150) after scoop
13. Roof continues: (740, 152)
14. C-pillar: (780, 162)
15. Rear roofline: (810, 185)
16. Rear window top: (830, 210)
17. Rear window bottom: (855, 255)
18. Rear body upper: (880, 265)
19. Rear spoiler base top: (930, 258)  
20. Rear spoiler: (970, 230) - spoiler lip
21. Rear spoiler tip: (985, 248)
22. Back down: (965, 270)
23. Rear panel top: (955, 280)
24. Rear panel side: (1000, 310)
25. Rear vertical panel: (1010, 380)
26. Rear bottom: (1020, 460)
27. Rear bumper bottom: (1020, 510)
28. Rear bumper: (1000, 520)
29. Floor to rear wheel well: continues to rear wheel arch start

Actually this is getting very complex. Let me just write it more simply and cleanly. I'll use a path with an arc for the wheel wells.

For the wheel wells, I can use:
- A large arc command in SVG
- Or separate circle elements that create visual wheel well appearance

Let me try a cleaner approach: draw the full body outline as one connected path including the wheel well cutouts.

The full`,"body/top":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#060606"/>
    </radialGradient>
    <radialGradient id="roofGrad" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#222222"/>
      <stop offset="100%" stop-color="#0d0d0d"/>
    </radialGradient>
    <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF6A20"/>
      <stop offset="50%" stop-color="#FF4A00"/>
      <stop offset="100%" stop-color="#CC3300"/>
    </linearGradient>
    <linearGradient id="hoodStripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF4A00"/>
      <stop offset="50%" stop-color="#FF6A20"/>
      <stop offset="100%" stop-color="#FF4A00"/>
    </linearGradient>
    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a3a4a" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0a1a22" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="ventGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#333" stop-opacity="0.8"/>
    </linearGradient>
    <linearGradient id="tyreGrad" cx="50%" cy="50%" r="50%" id="tyreRad" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#111"/>
    </linearGradient>
    <radialGradient id="tyreShadow" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="orangeGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="1 0.3 0 0 0.5  0.2 0.2 0 0 0  0 0 0 0 0  0 0 0 0.8 0" result="colored"/>
      <feMerge><feMergeNode in="colored"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softShadow">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.8"/>
    </filter>
    <filter id="innerGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="bodyClip">
      <path d="M600,58 C640,58 700,62 740,70 L820,88 C870,100 920,118 950,135 L990,158 C1010,170 1025,185 1030,200 L1038,240 C1042,258 1042,280 1038,310 L1030,400 C1025,425 1010,448 990,462 L950,488 C920,505 870,522 820,532 L740,548 C700,556 640,560 600,560 C560,560 500,556 460,548 L380,532 C330,522 280,505 250,488 L210,462 C190,448 175,425 170,400 L162,310 C158,280 158,258 162,240 L170,200 C175,185 190,170 210,158 L250,135 C280,118 330,100 380,88 L460,70 C500,62 560,58 600,58Z"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Ground shadow -->
  <ellipse cx="600" cy="340" rx="420" ry="280" fill="#000" opacity="0.7"/>
  
  <!-- === TRUCK BODY OUTER SHELL === -->
  <!-- Main body silhouette -->
  <path d="M600,58 C640,58 700,62 740,70 L820,88 C870,100 920,118 950,135 L990,158 C1010,170 1025,185 1030,200 L1038,240 C1042,258 1042,280 1038,310 L1030,400 C1025,425 1010,448 990,462 L950,488 C920,505 870,522 820,532 L740,548 C700,556 640,560 600,560 C560,560 500,556 460,548 L380,532 C330,522 280,505 250,488 L210,462 C190,448 175,425 170,400 L162,310 C158,280 158,258 162,240 L170,200 C175,185 190,170 210,158 L250,135 C280,118 330,100 380,88 L460,70 C500,62 560,58 600,58Z" fill="url(#bodyGrad)" stroke="#E8E8E8" stroke-width="1.5" filter="url(#softShadow)"/>

  <!-- Body panel rim lighting - orange edge highlights -->
  <path d="M600,60 C638,60 698,64 738,72 L818,90 C868,102 918,120 948,137 L988,160 C1008,172 1023,187 1028,202 L1036,242 C1040,260 1040,282 1036,312 L1028,402 C1023,427 1008,450 988,464 L948,490 C918,507 868,524 818,534 L738,550 C698,558 638,562 600,562" stroke="#FF4A00" stroke-width="1.2" fill="none" opacity="0.5"/>
  <path d="M600,562 C562,562 502,558 462,550 L382,534 C332,524 282,507 252,490 L212,464 C192,450 177,427 172,402 L164,312 C160,282 160,260 164,242 L172,202 C177,187 192,172 212,160 L252,137 C282,120 332,102 382,90 L462,72 C502,64 562,60 600,60" stroke="#FF4A00" stroke-width="1.2" fill="none" opacity="0.5"/>

  <!-- === FULL-LENGTH ORANGE RACE STRIPE === -->
  <!-- Center spine stripe -->
  <rect x="571" y="58" width="58" height="504" fill="url(#stripeGrad)" opacity="0.92"/>
  <!-- Stripe edges -->
  <line x1="571" y1="58" x2="571" y2="562" stroke="#FF6A20" stroke-width="1.5" opacity="0.8"/>
  <line x1="629" y1="58" x2="629" y2="562" stroke="#FF6A20" stroke-width="1.5" opacity="0.8"/>
  <!-- Stripe center highlight -->
  <rect x="594" y="58" width="12" height="504" fill="#FF7A30" opacity="0.4"/>

  <!-- === TRUCK CAB / ROOF PANEL === -->
  <path d="M600,195 C628,195 668,198 695,204 L750,218 C778,226 798,238 808,250 L818,270 C822,280 822,300 818,318 L808,340 C798,355 778,368 750,376 L695,390 C668,396 628,400 600,400 C572,400 532,396 505,390 L450,376 C422,368 402,355 392,340 L382,318 C378,300 378,280 382,270 L392,250 C402,238 422,226 450,218 L505,204 C532,198 572,195 600,195Z" fill="url(#roofGrad)" stroke="#E8E8E8" stroke-width="1.8"/>
  <!-- Roof rim lighting -->
  <path d="M600,197 C627,197 667,200 693,206 L748,220 C776,228 796,240 806,252 L816,272 C820,282 820,298 816,316 L806,338 C796,353 776,366 748,374 L693,388 C667,394 627,398 600,398" stroke="#FF4A00" stroke-width="1" fill="none" opacity="0.6"/>
  <path d="M600,398 C573,398 533,394 507,388 L452,374 C424,366 404,353 394,338 L384,316 C380,298 380,282 384,272 L394,252 C404,240 424,228 452,220 L507,206 C533,200 573,197 600,197" stroke="#FF4A00" stroke-width="1" fill="none" opacity="0.6"/>

  <!-- Roof panel inner detail lines -->
  <path d="M600,210 C622,210 655,212 678,218 L720,228 C742,235 758,244 766,254 L774,272 C777,280 777,295 774,310 L766,330 C758,340 742,350 720,358 L678,368 C655,374 622,376 600,376 C578,376 545,374 522,368 L480,358 C458,350 442,340 434,330 L426,310 C423,295 423,280 426,272 L434,254 C442,244 458,235 480,228 L522,218 C545,212 578,210 600,210Z" fill="none" stroke="#E8E8E8" stroke-width="0.8" opacity="0.4"/>

  <!-- Roof center panel bolts -->
  <circle cx="600" cy="220" r="3" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="600" cy="375" r="3" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="540" cy="230" r="2.5" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="660" cy="230" r="2.5" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="540" cy="365" r="2.5" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="660" cy="365" r="2.5" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="490" cy="295" r="2.5" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>
  <circle cx="710" cy="295" r="2.5" fill="#C8A96E" stroke="#E8E8E8" stroke-width="0.5"/>

  <!-- === ROOF VENTS === -->
  <!-- Left vent cluster -->
  <g filter="url(#innerGlow)">
    <!-- Vent housing 1 -->
    <rect x="488" y="245" width="68" height="22" rx="3" fill="#111" stroke="#C8A96E" stroke-width="1.2"/>
    <rect x="492" y="248" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="505" y="248" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="518" y="248" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="531" y="248" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="544" y="248" width="8" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <!-- Vent screw details -->
    <circle cx="491" cy="247" r="1.5" fill="#C8A96E"/>
    <circle cx="554" cy="247" r="1.5" fill="#C8A96E"/>
    <circle cx="491" cy="266" r="1.5" fill="#C8A96E"/>
    <circle cx="554" cy="266" r="1.5" fill="#C8A96E"/>
    <!-- Vent orange glow -->
    <rect x="488" y="245" width="68" height="22" rx="3" fill="#FF4A00" opacity="0.05"/>
  </g>

  <!-- Left vent cluster 2 -->
  <g filter="url(#innerGlow)">
    <rect x="488" y="328" width="68" height="22" rx="3" fill="#111" stroke="#C8A96E" stroke-width="1.2"/>
    <rect x="492" y="331" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="505" y="331" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="518" y="331" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="531" y="331" width="10" height="16" rx="1" fill="url(#ventGrad)" stroke="#FF4A00" stroke-width="0.6"/>
    <rect x="544" y="331" width="8"`,"full_vehicle/hero":`<thinking>
The user wants a detailed SVG illustration of a Ford Raptor T1+ rally truck in 3/4 front-left perspective. Let me create a comprehensive, hyper-detailed technical illustration with all the requested elements. I'll build this carefully with proper layering.

Key elements to include:
- Dark background (#060606)
- Electric orange (#FF4A00) rim lighting and line details
- Gold (#C8A96E) secondary highlights
- White (#E8E8E8) structural lines
- Full vehicle: roll cage, V8, suspension, BBS wheels, carbon body, orange livery
- Dust haze at tyres
- 3/4 front-left perspective

Let me plan the composition:
- Vehicle positioned slightly left of center, angled for 3/4 front-left view
- Ground level around y=540
- Truck occupying most of the frame

I'll build this layer by layer:
1. Background with gradient
2. Ground/dust effects
3. Shadow
4. Rear wheel and suspension (right side, partially visible)
5. Front wheel and suspension (left side, prominent)
6. Body panels
7. Cabin/cage
8. Engine details
9. Lighting effects
10. Livery details
11. Dust haze

Let me create a detailed SVG. This will be complex but I'll make it visually striking.

Let me think about the 3/4 front-left perspective coordinates:

The truck faces left-front. So we see:
- Front face (angled)
- Left side (more visible)
- Top slightly visible

Ground level: y ≈ 550
Front wheel center: approximately x=280, y=480
Rear wheel center: approximately x=880, y=490

Let me sketch the overall shape:
- Front bumper/skid plate: x 150-350
- Cab: x 350-750
- Bed: x 750-1000
- Roof: y 200-280
- Body sides: visible left side

Actually, let me reconsider the orientation. 3/4 front-left means we're looking at the truck from the front-left angle, so:
- The truck's front is facing toward us and to the left
- We can see the front and the left side

Front-left wheel: closer, larger, more prominent (x≈230, y≈470)
Front-right wheel: partially visible behind front (x≈450, y≈490 - partially hidden)
Rear-left wheel: visible on left side (x≈820, y≈490)
Rear-right wheel: mostly hidden

Let me build this systematically. I'll use paths and shapes.

Body outline (simplified 3/4 view):
- The truck body from front-left perspective

Let me define key points for the body:

Front face of truck (angled in perspective):
- Bottom-front: (190, 530) to (380, 540)
- Front grille area: (180, 350) to (390, 380)

Left side panels going back:
- Bottom left: (380, 540) to (980, 555)
- Top left roof: (390, 215) to (870, 220)

Let me just draw this carefully:

I'll create a detailed SVG. Here's my plan:

Background: dark gradient with subtle vignette
Ground plane with dust/dirt texture
Vehicle shadow (large oval/ellipse)
Dust clouds at wheels

Vehicle structure (back to front):
- Rear wheel + suspension
- Body/bed
- Cab with roll cage visible
- Front suspension + wheel
- Front bumper/bash plate
- Engine compartment hints
- Hood
- Lighting

Let me write the SVG now. This will be quite long but detailed.

For the wheels, BBS wheels have characteristic concave dish design with multiple straight spokes.

The roll cage should be visible through the windshield area.

Let me create coordinate system. The truck is in 3/4 front-left view.

Overall vehicle dimensions in SVG:
- Length: ~850px (x: 150 to 1050)
- Height: ~380px (y: 170 to 555)
- Ground: y=555

Front of truck: left side (x~150-250)
Rear of truck: right side (x~1000-1050)

Let me start coding:

Actually for a rally truck like the Ford Raptor T1+ (Dakar style), the key features are:
- Very wide, aggressive stance
- Large off-road tires
- Long-travel suspension with visible coilovers
- Front/rear bash plates
- Ford Raptor body-inspired but heavily modified
- Orange/black livery (typical for Dakar/rally)
- LED light bars on top and front
- Snorkel
- Extended wheel arches
- Skid plates

Let me design this properly. I'll make it visually rich.

Here's my SVG plan:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <!-- Gradients and filters -->
  </defs>
  
  <!-- Background -->
  <!-- Ground / Desert surface -->
  <!-- Vehicle shadow -->
  <!-- Dust clouds -->
  
  <!-- VEHICLE (back to front) -->
  <!-- Rear right wheel (mostly hidden) -->
  <!-- Rear body/bed -->
  <!-- Rear left wheel + suspension -->
  <!-- Cab body left side -->
  <!-- Roll cage (visible through windshield) -->
  <!-- Hood -->
  <!-- Engine bay hints (open hood?) - actually closed for rally -->
  <!-- Front left wheel + suspension -->
  <!-- Front bumper / bash plate -->
  <!-- Headlights / LED arrays -->
  <!-- Grille / Ford branding -->
  <!-- Additional details: mirrors, vents, livery -->
  
</svg>
\`\`\`

Let me now write the actual detailed SVG. I'll try to make it as realistic and detailed as possible.

For the 3/4 front-left perspective:
- Front face is angled (we see it at maybe 30-40 degrees)
- Left side is the primary side view
- Looking slightly down (elevated viewpoint to show roof)

Key x,y coordinates I'll use:

GROUND LINE: y=558

FRONT WHEEL:
- Center: x=285, y=488
- Radius: ~90px
- Tire outer radius: 90
- Rim radius: 55

REAR WHEEL:
- Center: x=895, y=498
- Radius: ~90px
- Tire outer radius: 90
- Rim radius: 55

BODY OUTLINE:
Front bumper bottom: (130, 540)
Front bumper top corners: (130, 420), (330, 425)
Hood front: (130, 340), (360, 345)
Hood top: (335, 230), (760, 225)
Cab roof: (340, 195), (780, 195)  
B-pillar top: (770, 200)
Rear cab: (780, 240)
Bed top: (780, 240) to (1020, 255)
Rear corner: (1020, 255) to (1020, 480)
Rear bumper: (1020, 480) to (850, 530)
Body bottom: (850, 530) to (400, 535) to (130, 535)

Left side body:
Rocker panel: y≈490-520

Windshield: approximately from (360, 230) to (720, 230) top, (400, 340) to (730, 335) bottom

Actually let me just write all the SVG code now. I'll make it detailed with lots of elements.

Let me think about this more carefully and write clean SVG:

The truck in 3/4 front-left view. I'll use a perspective where:
- We're slightly above and to the front-left of the truck
- Front face visible at about 40% width of side face

Let me define the major structural points and build from there.

I'll write the full SVG now. It will be detailed with:
- Multiple gradient definitions
- Filter effects for glow, blur
- Layered shapes for depth
- Detailed wheel/rim geometry
- Suspension components
- Roll cage elements
- Livery/decals
- Dust effects

Here goes:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" style="background:#060606">
<defs>
  <!-- Orange glow filter -->
  <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
  </filter>
  
  <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feColorMatrix in="blur" type="matrix" values="1 0.3 0 0 0  0.3 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="coloredBlur"/>
    <feComposite in="SourceGraphic" in2="coloredBlur" operator="over"/>
  </filter>
  
  <filter id="dustBlur" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur stdDeviation="8"/>
  </filter>

  <!-- Background gradient -->
  <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
    <stop offset="0%" stop-color="#1a0800"/>
    <stop offset="60%" stop-color="#080402"/>
    <stop offset="100%" stop-color="#020101"/>
  </radialGradient>
  
  <!-- Ground gradient -->
  <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#3a2008"/>
    <stop offset="100%" stop-color="#0a0500"/>
  </linearGradient>
  
  <!-- Shadow gradient -->
  <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
  </radialGradient>

  <!-- Orange body gradient -->
  <linearGradient id="orangeBodyGrad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#FF4A00"/>
    <stop offset="40%" stop-color="#FF6820"/>
    <stop offset="100%" stop-color="#CC3A00"/>
  </linearGradient>
  
  <!-- Carbon fiber pattern -->
  <pattern id="carbonPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#111"/>
    <rect width="4" height="4" fill="#1a1a1a"/>
    <rect x="4" y="4" width="4" height="4" fill="#1a1a1a"/>
    <rect width="4" height="4" fill="url(#carbonSheen)" opacity="0.3"/>
  </pattern>
  
  <!-- Wheel rim gradient -->
  <radialGradient id="rimGrad" cx="40%" cy="35%" r="60%">
    <stop offset="0%" stop-color="#888"/>
    <stop offset="60%" stop-color="#444"/>
    <stop offset="100%" stop-color="#222"/>
  </radialGradient>
  
  <!-- Tire gradient -->
  <radialGradient id="tireGrad" cx="40%" cy="35%" r="65%">
    <stop offset="0%" stop-color="#1a1a1a"/>
    <stop offset="100%" stop-color="#050505"/>
  </radialGradient>
  
  <!-- Dust gradient -->
  <radialGradient id="dustGrad1" cx="50%" cy="80%" r="50%">
    <stop offset="0%" stop-color="#8B5E3C" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="#8B5E3C" stop-opacity="0"/>
  </radialGradient>
  
  <linearGradient id="hoodGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FF5500"/>
    <stop offset="50%" stop-color="#CC3A00"/>
    <stop offset="100%" stop-color="#440C00"/>
  </linearGradient>
  
  <linearGradient id="sideBodyGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FF5500"/>
    <stop offset="30%" stop-color="#DD3800"/>
    <stop offset="70%" stop-color="#881E00"/>
    <stop offset="100%" stop-color="#2a0800"/>
  </linearGradient>

  <linearGradient id="windshieldGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#aaddff" stop-opacity="0.15"/>
    <stop offset="50%" stop-color="#88bbdd" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/>
  </linearGradient>
  
  <linearGradient id="frontFaceGrad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#FF6600"/>
    <stop offset="50%" stop-color="#FF4A00"/>
    <stop offset="100%" stop-color="#991A00"/>
  </linearGradient>

  <linearGradient id="skidPlateGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#888"/>
    <stop offset="50%" stop-color="#555"/>
    <stop offset="100%" stop-color="#333"/>
  </linearGradient>
  
  <linearGradient id="coiloverGrad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#C8A96E"/>
    <stop offset="50%" stop-color="#888"/>
    <stop offset="100%" stop-color="#444"/>
  </linearGradient>

</defs>

<!-- Background -->
<rect width="1200" height="675" fill="url(#bgGrad)"/>

<!-- Subtle grid lines in background -->
<!-- Ground plane -->
<rect x="0" y="555" width="1200" height="120" fill="#0d0702"/>
<ellipse cx="600" cy="560" rx="700" ry="40" fill="#1a0a03" opacity="0.6"/>

<!-- Ground texture lines (perspective) -->
...

<!-- Vehicle ground shadow -->
<ellipse cx="590" cy="560" rx="460" ry="35" fill="url(#shadowGrad)" opacity="0.9"/>

<!-- ==== DUST CLOUDS AT WHEELS ==== -->
<!-- Rear wheel dust -->
<!-- Front wheel dust -->

<!-- ==== REAR SUSPENSION (visible) ==== -->
<!-- Rear coilover / trailing arm -->

<!-- ==== REAR WHEEL ==== -->
<!-- Rear left wheel -->

<!-- ==== BODY - BED / REAR SECTION ==== -->

<!-- ==== CAB BODY ==== -->

<!-- ==== ROLL CAGE (visible through windshield) ==== -->

<!-- ==== HOOD ==== -->

<!-- ==== FRONT SUSPENSION ==== -->

<!-- ==== FRONT LEFT WHEEL ==== -->

<!-- ==== FRONT BUMPER / SKID PLATE ==== -->

<!-- ==== GRILLE / HEADLIGHTS ==== -->

<!-- ==== LED LIGHT BAR ==== -->

<!-- ==== DETAILS: Mirrors, vents, decals ==== -->

<!-- ==== ORANGE GLOW EFFECTS ==== -->

</svg>
\`\`\`

Okay let me write the actual complete SVG. This will be quite long. Let me be methodical.`,"full_vehicle/side":`<thinking>
The user wants a detailed SVG illustration of a Ford Raptor T1+ race truck in side profile. Let me create a hyper-detailed technical illustration with:
- Dark background #060606
- Electric orange #FF4A00 rim lighting and line details
- Gold #C8A96E secondary highlights
- White #E8E8E8 structural lines
- Race livery with number 200 on door
- Orange stripe on matte black
- Dramatic rim lighting

Let me think about the vehicle profile carefully:
- Ford Raptor T1+ is a Baja/rally truck
- Large lifted truck with:
  - Big off-road tires
  - Long travel suspension
  - Roll cage visible through windows
  - Side nerf bars/rock sliders
  - Number plate on door
  - Racing livery
  - Spare tire often on rear
  - Wide fender flares
  - Light bar on roof
  - Front bash plate/skid plate

Let me design this carefully in SVG coordinates within 1200x675 viewBox.

The truck should be roughly centered, taking up most of the width. Let me plan the proportions:

For a T1+ truck in side profile:
- Overall length: about 900px wide
- Height: about 350px tall
- Positioned starting around x=100, y=150

Let me think about the key shapes:

Body:
- Cab section
- Bed section
- Hood
- Fenders (widened)

Wheels:
- Front wheel center around x=280, y=460
- Rear wheel center around x=820, y=460
- Wheel radius: about 110px (big off-road tires)

Let me sketch this out:

Front of truck facing right (traditional side profile with front to the right or front to the left?)
I'll do front facing left (traditional left-side profile).

Front wheel: x=350, y=470, r=105
Rear wheel: x=870, y=470, r=105

Body outline:
- The truck body sits above the wheels
- Cab top at around y=200
- Hood slopes down to front bumper

Let me create a detailed SVG:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <!-- Background -->
  <rect width="1200" height="675" fill="#060606"/>
  
  <!-- Ground shadow/reflection -->
  <ellipse cx="600" cy="590" rx="480" ry="20" fill="#1a0a00" opacity="0.8"/>
  
  <!-- Ground line -->
  <line x1="50" y1="580" x2="1150" y2="580" stroke="#FF4A00" stroke-width="1" opacity="0.3"/>
  
  <!-- Dramatic lighting effects - rim light from right -->
  <!-- Background glow -->
  <radialGradient id="bgGlow" cx="80%" cy="60%" r="60%">
    <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
  </radialGradient>
  <rect width="1200" height="675" fill="url(#bgGlow)"/>
  
  ...
\`\`\`

Let me think more carefully about the truck geometry. I'll create the Ford Raptor T1+ which is essentially a modified F-150 Raptor for racing.

Key visual elements:
1. Massive off-road tires
2. Long wheelbase
3. High ground clearance
4. Extended fender flares
5. Front bumper with bash plate
6. Skid plates underneath
7. Roof rack/light bar
8. Roll cage visible through windows
9. Racing number on door
10. Livery stripes
11. Orange rim lighting effect

Let me plan the coordinates more precisely:

Vehicle positioned in lower 2/3 of image.
Front facing LEFT.

Approximate layout (x, y):
- Front bumper: x=150
- Front wheel center: x=310, y=490
- Rear wheel center: x=880, y=490
- Rear bumper: x=1050
- Roof peak: y=195
- Body bottom: y=540 (where tires meet ground would be y=595)

Wheel radius: 105px (including tire, about 33" tires scaled)

Let me create this now with substantial detail:

Actually, let me reconsider the layout. The viewBox is 1200x675. I want the truck to be large and detailed.

Front wheel center: x=320, y=490, r=108
Rear wheel center: x=880, y=490, r=108

Ground line: y=598

Body:
- Bed section from x=575 to x=1020
- Cab section from x=280 to x=590
- Hood from x=155 to x=295
- Front bumper at x=145

Let me think about the profile shape more carefully:

For T1+ Raptor side profile (front facing LEFT):

The main body path would be complex. Let me break it down:

HOOD: Slopes from tall front to low windshield 
- Front of hood: ~x=200, y=295
- Top of hood at windshield: ~x=455, y=265
- Hood-fender line: lower

WINDSHIELD: Raked back
- Bottom: x=455, y=325
- Top-front: x=465, y=205
- Top-rear: x=565, y=195

ROOF: Nearly flat
- x=565, y=195 to x=785, y=200

REAR GLASS: Slightly raked
- Top: x=785, y=200
- Bottom: x=795, y=320

CAB REAR:
- x=795, y=320 to x=815, y=340 to x=830, y=380

BED SIDE:
- From x=830, y=340 down and back
- Bed top rail: x=830 to x=1020 at about y=280
- Bed rear: x=1020, y=280 down to x=1025, y=480

FRONT PANEL:
- From x=200, y=295 down to x=155, y=350
- Front bumper extends to about x=140

UNDERBODY:
- Skid plate from x=170 to x=840 at y=480-500

Let me now think about the fender flares - Raptor T1+ has very wide fenders.

This is going to be a complex SVG. Let me write it out carefully.

Actually, I'll build this more systematically. Let me define the key paths:

Front to left, rear to right.

Wheel positions:
- Front wheel: cx=310, cy=490, outer_r=108, inner_r=55 (rim)
- Rear wheel: cx=878, cy=490, outer_r=108, inner_r=55 (rim)

Body outline path (simplified but detailed):
Starting from front bumper bottom, going clockwise:

Front bumper bottom: (130, 490)
Front bumper face: (130, 340) - angled
Front bash plate: (135, 390) 
Hood front: (195, 290)
Hood top: going to (460, 255)
Windshield base: (465, 315)
A-pillar top: (480, 195)
Roof top: horizontal to (790, 192)
C-pillar: (805, 315)
Cab rear: (820, 330)
Bed side top: (845, 275) to (1015, 275)
Bed rear: (1020, 275) to (1025, 480)
Rear bumper: (1030, 490) to (1040, 520)
...

This is getting complex. Let me just write the SVG with reasonable approximations and make it look good.

Let me write a comprehensive SVG:

For the Ford Raptor T1+, here's my plan:

Front facing LEFT:
- Truck spans from about x=130 to x=1060
- Wheel centers at x=310, y=495 and x=880, y=495
- Tire radius ~105px
- Ground at y=600

Key visual features I'll include:
1. Detailed body panels
2. Fender flares
3. Roll cage visible through windows
4. Number "200" on door
5. Orange racing stripe along side
6. Multiple lights (roof light bar, side lights)
7. Skid plates
8. Nerf bars
9. Detailed wheel/tire rendering with spokes
10. Rim lighting effect (orange glow on right edge of everything)
11. Racing livery

Let me write this out:

\`\`\`svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
  <!-- Gradients and filters -->
  <radialGradient id="bgGlow" cx="75%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="#060606" stop-opacity="0"/>
  </radialGradient>
  
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  
  <filter id="strongGlow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  
  <!-- Tire gradient -->
  <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
    <stop offset="60%" stop-color="#0a0a0a"/>
    <stop offset="85%" stop-color="#1a1a1a"/>
    <stop offset="100%" stop-color="#111"/>
  </radialGradient>
  
  <!-- Rim gradient for orange rim lighting -->
  <radialGradient id="rimLightFront" cx="65%" cy="35%" r="55%">
    <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
    <stop offset="40%" stop-color="#FF4A00" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#1a0800" stop-opacity="0.8"/>
  </radialGradient>
  
  <radialGradient id="rimLightRear" cx="65%" cy="35%" r="55%">
    <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
    <stop offset="40%" stop-color="#FF4A00" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="#1a0800" stop-opacity="0.8"/>
  </radialGradient>
  
  <!-- Body gradient - matte black with rim lighting -->
  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#0d0d0d"/>
    <stop offset="70%" stop-color="#111111"/>
    <stop offset="90%" stop-color="#1a0900"/>
    <stop offset="100%" stop-color="#FF4A00" stop-opacity="0.4"/>
  </linearGradient>
</defs>

<!-- Background -->
<rect width="1200" height="675" fill="#060606"/>
<rect width="1200" height="675" fill="url(#bgGlow)"/>

<!-- Ground glow -->
<ellipse cx="595" cy="605" rx="490" ry="18" fill="#FF4A00" opacity="0.15"/>
<ellipse cx="595" cy="605" rx="350" ry="10" fill="#FF4A00" opacity="0.1"/>

<!-- Ground line -->
<line x1="40" y1="600" x2="1160" y2="600" stroke="#FF4A00" stroke-width="1" opacity="0.25"/>

<!-- Dust/atmosphere effects -->
<ellipse cx="595" cy="595" rx="500" ry="8" fill="#FF2200" opacity="0.08"/>

<!-- === REAR WHEEL ASSEMBLY === -->
<!-- Rear tire outer -->
<circle cx="878" cy="495" r="108" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="2"/>
<!-- Rear tire tread blocks -->
<!-- Tire sidewall detail -->
<circle cx="878" cy="495" r="108" fill="none" stroke="#222" stroke-width="3"/>
<circle cx="878" cy="495" r="103" fill="none" stroke="#1a1a1a" stroke-width="2"/>

<!-- Tire tread pattern (angular blocks) -->
<!-- Multiple tread rectangles around the circle -->

<!-- Rear rim -->
<circle cx="878" cy="495" r="62" fill="#141414" stroke="#FF4A00" stroke-width="1.5"/>
<circle cx="878" cy="495" r="58" fill="url(#rimLightFront)" stroke="#C8A96E" stroke-width="0.5"/>

<!-- Rim spokes - 8 spoke design -->
<!-- Spoke 1 -->
<line x1="878" y1="445" x2="878" y2="437" ... />

I'll do this differently - use paths for spokes.

<!-- Center hub -->
<circle cx="878" cy="495" r="15" fill="#0d0d0d" stroke="#FF4A00" stroke-width="2"/>
<circle cx="878" cy="495" r="8" fill="#FF4A00"/>

<!-- Rim lighting glow -->
<circle cx="878" cy="495" r="108" fill="none" stroke="#FF4A00" stroke-width="3" opacity="0.6"/>

<!-- === FRONT WHEEL ASSEMBLY === -->
<!-- Similar to rear -->
...

<!-- === MAIN BODY === -->

Let me think about this differently and write a complete, well-structured SVG. I'll make it as detailed as I can.

Let me lay out the truck profile more carefully:

The Ford F-150 Raptor in T1+ race trim has these characteristics in side profile:
- Very tall, lifted ride height
- Front bumper with winch/bash plate
- Hood with functional vents/scoops
- Raked windshield
- Crew cab or extended cab
- Short bed
- Wide fender flares front and rear
- Exhaust on side or rear
- Race number on door
- Sponsor logos
- Roll cage visible through glass
- Light bar on roof
- Skid plates

Let me define coordinates:

Ground line: y=600
Front wheel center: x=308, y=492 (tire bottom at y=600, so 600-492=108=radius ✓)
Rear wheel center: x=880, y=492

Body key points:
- Front bumper bottom-front: x=135, y=530
- Front bumper bottom-rear: x=200, y=510
- Front bash plate: x=160-235, y=505-515
- Skid plate front: x=235, y=502
- Skid plate rear: x=758, y=495

- Front fender flare bottom-front: x=195, y=420
- Front fender flare outer edge: x=155, y=390 to x=165, y=420
- Front fender top: x=165, y=335 to x=430, y=325
- Hood front: x=195, y=295
- Hood top: x=195, y=285 curving to x=460, y=255
- Windshield base (outside): x=465, y=315
- A-pillar bottom inside: x=470, y=320
- A-pillar top: x=490, y=195
- Roof front: x=490, y=190
- Roof rear: x=795, y=193
- C-pillar top: x=800, y=195
- C-pillar bottom: x=820, y=315
- Rear of cab: x=830, y=335

- Bed side front: x=845, y=272`,"full_vehicle/top":`<svg viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg" style="background:#060606">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#060606"/>
    </radialGradient>
    <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="60%" stop-color="#111"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <radialGradient id="tyreTread" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1c1c1c"/>
      <stop offset="100%" stop-color="#050505"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="rimGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="raceStripe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF4A00" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#FF6A20" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#FF4A00" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="goldStripe" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C8A96E"/>
      <stop offset="100%" stop-color="#A07040"/>
    </linearGradient>
    <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#222"/>
      <stop offset="40%" stop-color="#2d2d2d"/>
      <stop offset="100%" stop-color="#111"/>
    </linearGradient>
    <clipPath id="bodyClip">
      <rect x="200" y="50" width="800" height="575"/>
    </clipPath>
  </defs>

  <!-- Background grid -->
  <rect width="1200" height="675" fill="#060606"/>
  <g opacity="0.07" stroke="#FF4A00" stroke-width="0.5">
    <line x1="0" y1="337" x2="1200" y2="337"/>
    <line x1="600" y1="0" x2="600" y2="675"/>
    <line x1="0" y1="168" x2="1200" y2="168"/>
    <line x1="0" y1="506" x2="1200" y2="506"/>
    <line x1="300" y1="0" x2="300" y2="675"/>
    <line x1="900" y1="0" x2="900" y2="675"/>
    <line x1="150" y1="0" x2="150" y2="675"/>
    <line x1="450" y1="0" x2="450" y2="675"/>
    <line x1="750" y1="0" x2="750" y2="675"/>
    <line x1="1050" y1="0" x2="1050" y2="675"/>
  </g>

  <!-- === MAIN BODY SHELL === -->
  <!-- Front bumper / splitter -->
  <path d="M 440 62 L 760 62 L 790 72 L 800 85 L 808 105 L 810 125 L 392 125 L 394 105 L 400 85 L 410 72 Z" fill="#1a1a1a" stroke="#FF4A00" stroke-width="1.5" filter="url(#glow)"/>
  
  <!-- Front grille area -->
  <path d="M 450 68 L 750 68 L 778 80 L 784 100 L 784 118 L 416 118 L 416 100 L 422 80 Z" fill="#0d0d0d" stroke="#C8A96E" stroke-width="1"/>
  
  <!-- Grille horizontal bars -->
  <line x1="420" y1="80" x2="780" y2="80" stroke="#C8A96E" stroke-width="1.2" opacity="0.8"/>
  <line x1="418" y1="88" x2="782" y2="88" stroke="#C8A96E" stroke-width="1" opacity="0.7"/>
  <line x1="417" y1="96" x2="783" y2="96" stroke="#C8A96E" stroke-width="1" opacity="0.7"/>
  <line x1="416" y1="104" x2="784" y2="104" stroke="#C8A96E" stroke-width="0.8" opacity="0.6"/>
  <line x1="416" y1="112" x2="784" y2="112" stroke="#C8A96E" stroke-width="0.8" opacity="0.6"/>
  
  <!-- Grille vertical separators -->
  <line x1="500" y1="70" x2="500" y2="118" stroke="#C8A96E" stroke-width="0.6" opacity="0.5"/>
  <line x1="560" y1="70" x2="560" y2="118" stroke="#C8A96E" stroke-width="0.6" opacity="0.5"/>
  <line x1="600" y1="68" x2="600" y2="118" stroke="#FF4A00" stroke-width="0.8" opacity="0.6"/>
  <line x1="640" y1="70" x2="640" y2="118" stroke="#C8A96E" stroke-width="0.6" opacity="0.5"/>
  <line x1="700" y1="70" x2="700" y2="118" stroke="#C8A96E" stroke-width="0.6" opacity="0.5"/>

  <!-- Ford oval -->
  <ellipse cx="600" cy="93" rx="36" ry="14" fill="#0a0a0a" stroke="#C8A96E" stroke-width="1.5"/>
  <text x="600" y="97" text-anchor="middle" fill="#C8A96E" font-family="Arial" font-weight="bold" font-size="11" letter-spacing="2">FORD</text>

  <!-- Front fog / rally lights -->
  <rect x="416" y="68" width="30" height="22" rx="3" fill="#1a1a1a" stroke="#FF4A00" stroke-width="1.2"/>
  <rect x="419" y="71" width="24" height="16" rx="2" fill="#2a2a2a" stroke="#FF4A00" stroke-width="0.8"/>
  <ellipse cx="431" cy="79" rx="8" ry="6" fill="#333" stroke="#FF4A00" stroke-width="0.8"/>
  
  <rect x="754" y="68" width="30" height="22" rx="3" fill="#1a1a1a" stroke="#FF4A00" stroke-width="1.2"/>
  <rect x="757" y="71" width="24" height="16" rx="2" fill="#2a2a2a" stroke="#FF4A00" stroke-width="0.8"/>
  <ellipse cx="769" cy="79" rx="8" ry="6" fill="#333" stroke="#FF4A00" stroke-width="0.8"/>

  <!-- Front headlight pods -->
  <path d="M 392 125 L 416 125 L 416 68 L 440 62 L 420 58 L 395 68 L 388 90 L 386 115 Z" fill="#111" stroke="#FF4A00" stroke-width="1.5"/>
  <path d="M 808 125 L 784 125 L 784 68 L 760 62 L 780 58 L 805 68 L 812 90 L 814 115 Z" fill="#111" stroke="#FF4A00" stroke-width="1.5"/>
  
  <!-- Headlight details left -->
  <path d="M 395 72 L 415 68 L 415 115 L 395 118 Z" fill="#0d1520" stroke="#C8A96E" stroke-width="0.8"/>
  <line x1="397" y1="78" x2="413" y2="75" stroke="#C8A96E" stroke-width="0.6"/>
  <line x1="397" y1="84" x2="413" y2="82" stroke="#C8A96E" stroke-width="0.6"/>
  <line x1="397" y1="90" x2="413" y2="88" stroke="#C8A96E" stroke-width="0.6"/>
  <line x1="397" y1="96" x2="413" y2="95" stroke="#C8A96E" stroke-width="0.6"/>
  <!-- Headlight details right -->
  <path d="M 805 72 L 785 68 L 785 115 L 805 118 Z" fill="#0d1520" stroke="#C8A96E" stroke-width="0.8"/>
  <line x1="803" y1="78" x2="787" y2="75" stroke="#C8A96E" stroke-width="0.6"/>
  <line x1="803" y1="84" x2="787" y2="82" stroke="#C8A96E" stroke-width="0.6"/>
  <line x1="803" y1="90" x2="787" y2="88" stroke="#C8A96E" stroke-width="0.6"/>
  <line x1="803" y1="96" x2="787" y2="95" stroke="#C8A96E" stroke-width="0.6"/>

  <!-- Main body outline - hood/bonnet -->
  <path d="M 386 115 L 386 200 L 390 215 L 400 230 L 415 240 L 785 240 L 800 230 L 810 215 L 814 200 L 814 115 L 808 125 L 392 125 Z" fill="#181818" stroke="#E8E8E8" stroke-width="1.2"/>

  <!-- Hood vents - left side -->
  <g stroke="#FF4A00" stroke-width="1.2" fill="#0a0a0a">
    <rect x="420" y="140" width="60" height="18" rx="2"/>
    <rect x="420" y="163" width="60" height="18" rx="2"/>
    <rect x="420" y="186" width="60" height="18" rx="2"/>
    <!-- vent slats left -->
    <line x1="424" y1="142" x2="424" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="430" y1="142" x2="430" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="436" y1="142" x2="436" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="442" y1="142" x2="442" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="448" y1="142" x2="448" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="454" y1="142" x2="454" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="460" y1="142" x2="460" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="466" y1="142" x2="466" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="472" y1="142" x2="472" y2="156" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="424" y1="165" x2="424" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="430" y1="165" x2="430" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="436" y1="165" x2="436" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="442" y1="165" x2="442" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="448" y1="165" x2="448" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="454" y1="165" x2="454" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="460" y1="165" x2="460" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="466" y1="165" x2="466" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="472" y1="165" x2="472" y2="179" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="424" y1="188" x2="424" y2="202" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="430" y1="188" x2="430" y2="202" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="436" y1="188" x2="436" y2="202" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="442" y1="188" x2="442" y2="202" stroke="#FF4A00" stroke-width="0.8" opacity="0.8"/>
    <line x1="448" y1="188" x2="448" y2="202" stroke="#FF4A00" stroke-width="0.8" opacity="`};he(pe);
