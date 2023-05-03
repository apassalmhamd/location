if(localStorage.getItem("longitude") != null && localStorage.getItem("latitude") !=null){
    document.getElementById("map").innerHTML= 
       `<iframe width="100%" height="400" 
       src="https://www.openstreetmap.org/export/embed.html?bbox=${localStorage.getItem("longitude")},${localStorage.getItem("latitude")}&;layer=mapnik"></iframe>`
}
var islive= false;
var sharelocation;
var accessLocation;
document.getElementById("getLocation").onclick= ()=>{
  
    if(islive===false){
        
   sharelocation= navigator.geolocation.watchPosition(
    function(position){
        accessLocation=true;
        document.getElementById("alert").innerHTML=`
        <div class="alert alert-success" role="alert">
          يتم عرض موقعك في الخريطه بشكل مباشر
         </div>`
         document.getElementById("getLocation").innerHTML="ايقاف مشاركه"
         islive=true
      document.getElementById("map").innerHTML= 
       `<iframe width="100%" height="400" 
       src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik"></iframe>`
       localStorage.setItem("longitude",position.coords.longitude);
       localStorage.setItem("longitude",position.coords.latitude);
    },
    function(error){
       switch(error.code){
        case error.PERMISSION_DENIED:
            document.getElementById("alert").innerHTML=`
            <div class="alert alert-danger" mt-3 mb-3 role="alert">
            لقد قمت برفض وصول الى موقعك , يرجى المحاوله والموافقه
          </div>`
        break;
       
       }
    }
)
        
    }else if(islive===true && accessLocation===true){
        
        document.getElementById("alert").innerHTML=`
        <div class="alert alert-success" role="alert">
         تم ايقاف مشاركه الموقع بنجاح
         </div>`
        navigator.geolocation.clearWatch(sharelocation);
        document.getElementById("getLocation").innerHTML="عرض موقعي"
        islive=false
    }
}
// "https://maps.googleapis.com/maps/api/staticmap?center="+position.coords.latitude+","+position.coords.longitude+"&zoom=13&sensor=false";