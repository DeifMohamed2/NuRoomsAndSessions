import {
  initializeApp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  update,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe-WCbYKkHbGbbbMkQP_beuh5D2OONJy0",
  authDomain: "nurooms-c016d.firebaseapp.com",
  projectId: "nurooms-c016d",
  storageBucket: "nurooms-c016d.appspot.com",
  messagingSenderId: "268246812777",
  appId: "1:268246812777:web:257bb460b734ca1a453af8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
// Set up Microsoft OAuth provider for multi-tenancy
const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
  // Add any custom parameters needed for multi-tenancy
  // redirect_uri: 'https://nurooms-c016d.firebaseapp.com/__/auth/handler',
  prompt: "consent",

  tenant: '2b773d99-f229-4704-b562-5a3198831779'
});


const LoginForm = document.getElementById('LoginForm')
const Messages= document.getElementById('Messages')
LoginForm.addEventListener('submit',(e)=>{

  e.preventDefault()
  console.log("dada")

  const email = LoginForm['Email'].value
  const Password = LoginForm['Password'].value 
  const  Newemail = email+'@nu.edu.eg'
  signInWithEmailAndPassword(auth, Newemail, Password)
  .then((userCredential) => {

    const user = userCredential.user;
    const UID = user.uid
    if (!user.emailVerified) {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        Messages.innerHTML =`Your Email Is not Verfied, We Are just Sent Email verification Now!`

        LoginForm.reset()
      }).catch((err)=>{
        const errorCode = err.code;
        const errorMessage = err.message;
       
        if (errorCode == " auth/too-many-requests") {
          Messages.innerHTML = "You Are just Sent Many requests Please try again later";
          Messages.style.display = "inline";
        }
      })
    }else{
      window.location.href="./dashboard.html"
      LoginForm.reset();
    }


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
    if (errorCode == "auth/wrong-password") {
      Messages.innerHTML = "Wrong Passowrd";
      Messages.style.display = "inline";
    } else if (errorCode == "auth/internal-error") {
      Messages.innerHTML = "Please Write Password Correctly";
      Messages.style.display = "inline";
    } else {
      Messages.innerHTML = "Email Or Password is invalid or incorrect";
      Messages.style.display = "inline";
    }
  });


})



const SignInWithPopUpMicroSoft = document.getElementById('SignInWithPopUpMicroSoft');

SignInWithPopUpMicroSoft.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((cred) => {
    
      update(ref(db,"userData/"+auth.currentUser.uid), {
        userName :cred.user.displayName,
        email :cred.user.email,
        userImg:cred.user.photoURL
      }).then(() => {{
        window.location.href="./dashboard.html"

        console.log(userCredential)
      }})

    })
    .catch((error) => {
      console.error("Authentication error:", error);
    });
});
