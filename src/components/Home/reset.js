const mailField = document.getElementById('mail');
const labels = document.getElementsByTagName('label');
const resetPassword = document.getElementById('resetPassword');
const successModal = document.querySelector('.success');
const failureModal = document.querySelector('.failure');

const resetPasswordFunction = ()=> {
    alert("J");
    const email = mailField.value;
    auth.setPasswordResetEmail(email)
    .then(() => {
        console.log('reset password');
    })
    .catch(error => {
        console.error(error);
       })
}



//Animations
mailField.addEventListener('focus', () => {
    labels.item(0).className = "focused-field";
});

mailField.addEventListener('blur', () => {
    if(!mailField.value)
        labels.item(0).className = "unfocused-field";
});
