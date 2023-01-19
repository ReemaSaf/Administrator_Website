window.onload = function () {
  const mailField = document.getElementById("mail");
  const labels = document.getElementsByTagName("label");
  const resetPassword = document.getElementById("resetPassword");
  const successModal = document.querySelector(".success");
  const failureModal = document.querySelector(".failure");
  const emailInput = document.getElementById("mail");
  const emailLabel = document.querySelector("label[for='mail']");

  //Animations
  mailField.addEventListener("focus", () => {
    labels.item(0).className = "focused-field";
  });

  mailField.addEventListener("blur", () => {
    if (!mailField.value) labels.item(0).className = "unfocused-field";
  });
};

const firebaseConfig = {
  apiKey: "AIzaSyBUYVgz0116sVz-JB-SP9JIekWWbmNPHwQ",
  authDomain: "sekkahgp.firebaseapp.com",
  databaseURL: "https://ppbfc2-default-rtdb.firebaseio.com",
  projectId: "sekkahgp",
  storageBucket: "sekkahgp.appspot.com",
  messagingSenderId: "423820409744",
  appId: "1:423820409744:web:953e19a6a23e6ac9b29115",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const resetPasswordFunction = () => {
  const mailField = document.getElementById("mail");

  //   alert("J");
  console.log("Attempting to reset the password");
  const email = mailField.value;
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("reset password email was sent");
    })
    .catch((error) => {
      console.error(error);
      alert("This is empty field or not an admin email, please try again")
      mailField.value = "";
      mailField.focus();
    });
};
