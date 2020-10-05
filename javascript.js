var button;
var imagen;
var initTime;
var finalTime;
var finalCost;
const priceHour = 50;
const priceSec = priceHour / 3600;

const start = (id) => {
    initState(id);
    var activeCard = (button.innerText == "INICIAR");

    if (activeCard) {
        activeStyleChanges();
        initTime.innerHTML = getActualTime();
        setTimeout(updateLiveCoste, 1000, id);
    } else {
        inactiveStyleChanges();
        finalTime.innerHTML = getActualTime();
    }
}

const initState = (id) => {
    button = document.getElementById(`btnT${id}`);
    imagen = document.getElementById(`imageT${id}`);
    initTime = document.getElementById(`startTimeT${id}`);
    finalTime = document.getElementById(`finalTimeT${id}`);
    finalCost = document.getElementById(`finalCostT${id}`);
    liveTime = document.getElementById(`liveTimeT${id}`);
}



const updateLiveCoste = (id) => {
    if(document.getElementById(`btnT${id}`).innerHTML == "Detener") {
        var finalC = document.getElementById(`finalCostT${id}`);
        finalC.innerHTML = `$${updatePrice(priceSec, finalC.innerHTML)}`;
        setTimeout(updateLiveCoste, 1000, id);
    }
}

const updatePrice = (Price, totalCost) => {
    totalCost = totalCost.substr(1, totalCost.length);
    var finalPrice = parseFloat(Price) + parseFloat(totalCost);
    return finalPrice.toFixed(2); 
}

const getDateOf = (xTime) => {
    var d1 = xTime.innerText;
    var avoidAmPm = d1.indexOf(" ");
    d1 = d1.substr(0, avoidAmPm);
    var arr = d1.split(":");

    var date = new Date();
    date.setHours(arr[0]);
    date.setMinutes(arr[1]);
    date.setSeconds(arr[2]);

    return date;
}

const inactiveStyleChanges = () => {
    button.innerText = "INICIAR";
    button.style.color = "rgb(2, 99, 179)";
    imagen.src = "src/mesaOff.jpg";
}

const activeStyleChanges = () => {
    button.innerText = "Detener";
    button.style.color = "red";
    imagen.src = "src/mesaOn.jpg";
    finalTime.innerHTML = "---";
    finalCost.innerHTML = "$0";
}

const getActualTime = () => {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    AmPm = (hour >= 12) ? 'P.M' : 'A.M';
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour < 10) ? '0' + hour : hour;
    minute = (minute < 10) ? '0' + minute : minute;
    second = (second < 10) ? '0' + second : second;

    return `${hour}:${minute}:${second} ${AmPm}`;
}