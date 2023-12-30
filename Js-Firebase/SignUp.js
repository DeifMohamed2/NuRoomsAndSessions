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
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
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
console.log('dad')

const SignupForm = document.getElementById('SignupForm')
const Messages = document.getElementById('Messages')

SignupForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const email = SignupForm['Email'].value
  const Name = SignupForm['Name'].value
  const Password = SignupForm['Password'].value 
  
  const NewEmail = email+'@nu.edu.eg'
console.log(NewEmail)
  
  createUserWithEmailAndPassword(auth, NewEmail, Password)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("")
        Messages.innerHTML = 'Email Verification Sent Successfully!'
        setInterval(()=>{
          Messages.innerHTML=""
        },2000)
        SignupForm.reset()
      }).catch((err)=>{
        console.log(err)
      })
   
      update(ref(db,"userData/"+auth.currentUser.uid), {
        userName :Name,
        email : email,
        Password:Password,
        userImg:""
      }).then(() => {{

        console.log(userCredential)
      }})


    }) .catch((error) => {
      const errorCode = error.code;
      const errorMessages = error.message;
      console.log(errorCode);
      if (errorCode == "auth/wrong-password") {
        Messages.innerHTML = "Write Strong Password More Than 6";
        Messages.style.display = "inline";
      } else if (errorCode == "auth/weak-password") {
        Messages.innerHTML = "Write Strong Password More Than 6";
        Messages.style.display = "inline";
      } else if (errorCode == "auth/invalid-email") {
        Messages.innerHTML = "Invalid Email";
        Messages.style.display = "inline";
      }
       else if (errorCode == "auth/email-already-in-use") {
        Messages.innerHTML = "This Email Already In Use";
        Messages.style.display = "inline";
      }

      setInterval(()=>{
        Messages.innerHTML=""
      },10000)
    });
  


})


