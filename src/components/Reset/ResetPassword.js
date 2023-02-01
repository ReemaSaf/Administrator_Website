import React, { useEffect, useState } from 'react'
import bg from '../../images/bg-01.jpg'
import '../../css/main.css'
import '../../css/util.css'
import '../../images/icons/._favicon.ico'
import imagePic from '../../images/reset.svg';
import { getAuth,sendPasswordResetEmail  } from "firebase/auth";  
import initializeAuth from "../Firebase/firebase.init";
initializeAuth(); //Firebase authorization

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const auth = getAuth() //Auth instance associated with the provided @firebase/app#FirebaseApp
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Attempting to reset the password",email);
        sendPasswordResetEmail(auth,email) //Send reset email 
        .then(() => {
          alert("reset password email was sent");
          setEmail('')
        })
        .catch((error) => {  //Not Admin email show that alert
          console.error(error); 
          alert("This is not an admin email, please try again")
          setEmail('')
        });
      };

  return (
    <>
        <link rel="stylesheet" type="text/css" href="fonts/Linearicons-Free-v1.0.0/icon-font.min.css"></link>
        <link rel="icon" type="image/png" href="/images/icons/favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>

        
            <div className="limiter">
                <div className="container-login100" style={{
                    backgroundImage: `url(${bg})`
                }}>
                    <div className="wrap-login100 p-t-30 p-b-50">
                        <span className="login100-form-title p-b-41">
                            RESET PASSWORD
                        </span>
                        <form className="customForm" id="login_div" onSubmit={handleSubmit}>
                            <div className='customContainer'>
                                <div style={{display:'flex',justifyContent:'center'}} className="type">
                                    <img src={imagePic} height={100} width={100} style={{margin:'10px 30px'}}/>
                                </div>
                                <div data-validate="username" style={{display:'flex',justifyContent:'center'}}>
                                    <input
                                    style={{margin:'10px',width:'300px',font_family:'Ubuntu-Bold',border_style:'solid',
                                    border_width: '1px'}}
                                    className="input100 inputFields" type="text" value={email} onChange={({ target }) => setEmail(target.value)} name="email" placeholder="ADMIN EMAIL" id="email_fild1" required />
                                </div>
                                <div >
                                    <button type='submit' className="customButton" id="submitData" style={{
                                        cursor: loader ? 'not-allowed' : 'pointer'
                                    }} >
                                        CONFIRM
                                    </button>
                                </div>
                            </div>
                        </form>
                  
                    </div>
                </div>
            </div>


            <div id="dropDownSelect1"></div>
            <script src="./reset.js"></script>
        </>
  )
}
