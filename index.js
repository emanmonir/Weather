
// var result;
async function weather(city)
{
    var apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b27cd90b14eb4b0f95880400231602&q=${city}&days=3&aqi=no&alerts=no`)
    if (apiResponse.status==200){
    var result = await apiResponse.json();
    // console.log(result);
    displayFirstDay(result);
    displayAfterDays(result);}

}
weather("london");

let weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday"];
const months = ["January", "February", "March", "April" ,  "May", "June", "July", "August","September", "October", "November", "December"];
const d= new Date();
let day= weekday[d.getDay()] ;
let month = months[d.getMonth()];
function displayFirstDay(result)
{
    let firstSection=`
    <div class="col-lg-4 item"id="rowdata1"> 
         <div class="item-header" id="today">
         <div class="day">${day}</div>
        <div class=" date">${d.getDate()+ month}</div>
         <div class="clr"></div>
        </div>
        <div class="item-content  py-4">
            <div class="city"> ${result.location.name}</div>
             <div class="degree text-white fw-bold">
                <div class="num">${result.current.temp_c}<sup>o</sup>C</div>
                    <div class="weather-icon">
                        <img src="https:${result.current.condition.icon}" alt="" width="90">
                    </div>
                </div>
                <div class="custom">${result.current.condition.text}</div>
                <span class="end-span"><img src="image/icon-umberella.png" alt="">20%</span>
                <span class="end-span"><img src="image/icon-wind.png" alt="">18km/h</span>
                <span class="end-span"><img src="image/icon-compass.png" alt="">East</span>
                 </div> 
    </div>`
document.getElementById('rowdata1').innerHTML = firstSection;
}
function displayAfterDays(result)
{
    let cartona='';
    for(let i=1; i<result.forecast.forecastday.length ; i++){
        const f= new Date(result.forecast.forecastday[i].date);
    cartona +=`<div class="col-lg-4 item2">
     <div class="item-header" id="today">
        <div class="day2">${weekday[f.getDay()]}</div>
    </div>
    <div class="item-content  py-4">
            <div class="forecast-icon text-center">
                <img src="https:${result.forecast.forecastday[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree text-white fw-bold text-center fs-4 my-2">${result.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
            <p class="small2 ">${result.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></p>
            <div class="custom text-center">${result.forecast.forecastday[i].day.condition.text}</div>
        
    </div> 
</div>`}
document.getElementById('rowdata1').innerHTML += cartona ;
}

document.getElementById("search").addEventListener("input", function(event){
    weather(event.target.value)
    
})


