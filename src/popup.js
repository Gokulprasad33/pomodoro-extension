document.getElementById("editbtn").addEventListener("click", function() {
    const gettingtime = document.getElementById("gettingtime");
    gettingtime.classList.toggle("showedit");//Show edit window
    editwindowval = gettingtime.classList.contains("showedit") ? 1 : 0;
});
//Global variables
let editwindowval = 0;
let minute=20;
let time=minute*60;
let countdowninterval;
let breakinp=5 ;
let isonbreak=false;
//Store values to localStorage
const saveendtime=localStorage.getItem("endtime")
const saveonbreak=localStorage.getItem("onbreak")==="true"

if (saveendtime) {
    const remainingTime = calcremainingtime(new Date(saveendtime));
    if(remainingTime>0){
        time=remainingTime;
        isonbreak=saveonbreak;
        startcountdown(); 
    }else{
        localStorage.removeItem("endtime"); 
    }}

document.getElementById("saveval").addEventListener("click",function(){
    const breakinput = document.querySelector(".breaktime");
    const minuteinput = document.querySelector(".minute");
    const minute = parseInt(minuteinput.value);
    breakinp = parseInt(breakinput.value);

    if (!isNaN(minute) && minute > 0) {
        const countdowndisplay = document.getElementById("countdown");
        countdowndisplay.textContent = formattime(minute * 60);
        minuteinput.value = "";
        breakinput.value = "";
        gettingtime.classList.remove("showedit");
        editwindowval = 0;
        time = minute*60;
    } else {
        alert("Enter Time");
    }
});

function formattime(seconds) {
    const minute = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return (minute <10 ? '0' + minute : minute) + ':' + (sec <10 ? '0' + sec : sec);
};
document.getElementById("startbtn").addEventListener("click",function(){
    if(time>0){
        clearInterval(countdowninterval);
        setEndTime(time);
        startcountdown();
    }
});

function startcountdown(){
    countdowninterval= setInterval(updatecount,1000)
}

function setEndTime(timeinseconds){
    const endtime=new Date()
    endtime.setSeconds(endtime.getSeconds()+timeinseconds);
    localStorage.setItem("endtime",endtime);
    localStorage.setItem("onbreak",isonbreak);
}
function updatecount(){
    const minute=Math.floor(time/60);
    const second=time%60;
    document.getElementById("mode").innerHTML=isonbreak ? "☕Break☕" :"🎯FOCUS🎯";
    if(time<=0){
        clearInterval(countdowninterval);
        if(isonbreak){
            document.getElementById("countdown").innerHTML="00:00";
            document.getElementById("error").innerHTML="Break over!!!";
            localStorage.removeItem("endtime");
            return;
        }else{
            document.getElementById("countdown").innerHTML="00:00";
            document.getElementById("error").innerHTML="Times up";
            localStorage.removeItem("endtime");
            breaktime();
            return
        }
    }
    document.getElementById("countdown").innerHTML=`${minute<10 ? '0'+minute :minute}:${second<=10 ? '0'+second : second}`;
    time--;
}
function calcremainingtime(endtime){
    const currenTime=new Date();
    const timediff=new Date(endtime)-currenTime;
    return Math.max(Math.floor(timediff/1000),0);
}
function startbreak(){
    isonbreak=true;
    time=breakinp*60;
    document.getElementById("mode").innerHTML="☕BREAK☕";
    document.getElementById("error").innerHTML="";
    setEndTime(time);
    startcountdown();
}

function reset(){
    clearInterval(countdowninterval);
    localStorage.removeItem("endtime");
    time=minute*60;
    document.getElementById("countdown").innerHTML=formattime(time);
    document.getElementById("error").innerHTML="";
    isonbreak=false;
}