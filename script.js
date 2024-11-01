document.getElementById("icon").addEventListener("click",function(){
    const gettingtime=document.getElementById("gettingtime")
    gettingtime.classList.toggle("showedit");
})

document.getElementById("saveval").addEventListener("click",function(){
    const minuteinput =document.querySelector(".minute")
    const minute = parseInt(minuteinput.value)

    if(!isNaN(minute) && minute>0){
        const countdowndisplay = document.getElementById("countdown")
        countdowndisplay.textContent=formattime(minute *60)
        minuteinput.value=""
    }
})

function formattime(second){
    const minute=Math.floor(second/60)
    const sec =second %60
    return (minute < 10 ? '0' + minute : minute) + ':' + (sec < 10 ? '0' + sec : sec);
}