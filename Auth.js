
function login(){

    const user = auth.currentUser;
    var usermail = document.getElementById("email_fild").value;
    var userpass = document.getElementById("pass_fild").value;

    const auth = getAuth();
signInWithEmailAndPassword(auth, usermail, userpass)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });
  window.alert("hi");

}
