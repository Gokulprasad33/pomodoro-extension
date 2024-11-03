document.getElementById("editbtn").addEventListener("click", function() {
    const gettingtime = document.getElementById("gettingtime");
    gettingtime.classList.toggle("showedit");
    editwindowval = gettingtime.classList.contains("showedit") ? 1 : 0;
});

let editwindow = document.getElementById("gettingtime");
let editwindowval = 0;
let minute=20
let time=minute*60
let countdowninterval
let breakinp=5
let onbreak=false
document.getElementById("saveval").addEventListener("click", function() {
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
        time = minute*60
    } else {
        alert("Enter Time");
    }
});

function formattime(seconds) {
    const minute = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return (minute <10 ? '0' + minute : minute) + ':' + (sec <10 ? '0' + sec : sec);
}
document.getElementById("startbtn").addEventListener("click",function(){
    if(time>0){
        clearInterval(countdowninterval)
        countdowninterval = setInterval(updatecount, 1000);

    }
})
function updatecount(){
    const minute=Math.floor(time/60)
    const second=time%60
    document.getElementById("mode").innerHTML=onbreak ? "☕Break☕" :"🎯FOCUS🎯"
    if(time<=0){
        clearInterval(countdown)
        if(onbreak){
            document.getElementById("countdown").innerHTML="00:00"
            document.getElementById("error").innerHTML="Break over!!!"
            return
        }else{
            document.getElementById("countdown").innerHTML="00:00"
            document.getElementById("error").innerHTML="Times up"
            breaktime()
            return
        }
    }

    document.getElementById("countdown").innerHTML=`${minute<10 ? '0'+minute :minute}:${second<=10 ? '0'+second : second}`
    time--
}

function breaktime(){
    onbreak=true
    time=breakinp*60

    document.getElementById("mode").innerHTML="☕BREAK☕"
    document.getElementById("error").innerHTML=""
    countdowninterval= setInterval(updatecount,1000)
}