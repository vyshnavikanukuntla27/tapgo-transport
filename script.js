const cities={
  Delhi:["Rajiv Chowk","Dwarka","Saket"],
  Mumbai:["Andheri","Bandra","Dadar"],
  Hyderabad:["Ameerpet","Miyapur","LB Nagar"],
  Chennai:["Central","Airport","Guindy"],
  Bangalore:["Majestic","Indiranagar","Whitefield"]
};

function updateProgress(v){
  const bar=document.querySelector(".progress");
  if(bar) bar.style.width=v+"%";
}

function selectRide(type){
  localStorage.setItem("ride",type);
  window.location="route.html";
}

function loadStations(){
  const ride=localStorage.getItem("ride");
  const city=document.getElementById("city").value;
  const from=document.getElementById("from");
  const to=document.getElementById("to");

  from.innerHTML="";
  to.innerHTML="";

  if(ride==="Metro"||ride==="Cab"){
    cities[city].forEach(st=>{
      from.innerHTML+=`<option>${st}</option>`;
      to.innerHTML+=`<option>${st}</option>`;
    });
  }
}

function previewRoute(){
  const ride=localStorage.getItem("ride");
  const city=document.getElementById("city").value;
  const from=document.getElementById("from")?.value;
  const to=document.getElementById("to")?.value;
  const dest=document.getElementById("destCity")?.value;

  let origin,destination;

  if(ride==="Metro"||ride==="Cab"){
    origin=from+", "+city;
    destination=to+", "+city;
  }else{
    origin=city;
    destination=dest;
  }

  document.getElementById("map").innerHTML=
  `<iframe width="100%" height="100%"
  src="https://www.google.com/maps?q=${origin}+to+${destination}&output=embed">
  </iframe>`;

  localStorage.setItem("origin",origin);
  localStorage.setItem("destination",destination);
}

function calculateFare(){
  const ride=localStorage.getItem("ride");

  let distance=(ride==="Metro"||ride==="Cab")?
  Math.floor(Math.random()*20)+5:
  Math.floor(Math.random()*300)+100;

  let rate=0;
  if(ride==="Metro") rate=10;
  if(ride==="Cab") rate=15;
  if(ride==="Bus") rate=5;
  if(ride==="Train") rate=3;

  const fare=distance*rate;
  const speed=(ride==="Metro")?35:
              (ride==="Cab")?40:
              (ride==="Bus")?50:70;

  const time=(distance/speed).toFixed(1);

  localStorage.setItem("distance",distance);
  localStorage.setItem("fare",fare);
  localStorage.setItem("time",time);

  window.location="ticket.html";
}

function simulateSeats(){
  document.getElementById("seats").innerText=
  Math.floor(Math.random()*70)+30;
}

function selectTicket(t){
  localStorage.setItem("ticket",t);
  window.location="summary.html";
}

function showSummary(){
  document.getElementById("rideSum").innerText=localStorage.getItem("ride");
  document.getElementById("originSum").innerText=localStorage.getItem("origin");
  document.getElementById("destSum").innerText=localStorage.getItem("destination");
  document.getElementById("distSum").innerText=localStorage.getItem("distance");
  document.getElementById("timeSum").innerText=localStorage.getItem("time");
  document.getElementById("fareSum").innerText=localStorage.getItem("fare");
}

function generateQR(){
  new QRCode(document.getElementById("qr"),{
    text:"Ticket Confirmed",
    width:150,
    height:150
  });
}
/* Dark / Light Toggle */
function toggleMode(){
  document.body.classList.toggle("light-mode");
}

/* Voice Guide */
function speakPage(){
  const text=document.body.innerText;
  const msg=new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

/* Reset Booking */
function resetApp(){
  localStorage.clear();
  window.location="index.html";
}

/* Ticket ID */
function generateTicketID(){
  const id="TG"+Math.floor(Math.random()*100000);
  localStorage.setItem("ticketID",id);
  return id;
}

/* Confetti */
function confetti(){
  for(let i=0;i<15;i++){
    const el=document.createElement("div");
    el.innerText="🎉";
    el.style.position="fixed";
    el.style.left=Math.random()*100+"vw";
    el.style.top="-10px";
    el.style.fontSize="20px";
    el.style.animation="fall 3s linear forwards";
    document.body.appendChild(el);
  }
}
