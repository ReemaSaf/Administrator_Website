function RedirectToReqADD() {
    var service = document.getElementById("services");
          if (service.value == ""){ 
  
          alert("Please select an option!");
          document.getElementById('services').focus();
          return false;}
  
           else if(document.getElementById('details').value == '') 
           {      
          alert("Please Provide Description!");
          document.getElementById('details').focus();
          return false;       
          }
           else{
           alert("Your request added sucssesfuly!");
           window.location.replace("RequestInformation.php");
  
              }
  }
  