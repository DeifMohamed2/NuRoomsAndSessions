// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const dbfirebaseConfig = {
  apiKey: "AIzaSyC0VUgV2B_ClqKImLQAafbklwKZRabod0A",
  authDomain: "biodiva-fa1b0.firebaseapp.com",
  databaseURL: "https://biodiva-fa1b0-default-rtdb.firebaseio.com",
  projectId: "biodiva-fa1b0",
  storageBucket: "biodiva-fa1b0.appspot.com",
  messagingSenderId: "262124821606",
  appId: "1:262124821606:web:09311e0be3fc9b7634a1a7"
};

const dbApp= initializeApp(dbfirebaseConfig,"db");
const db = getDatabase(dbApp);
const authConfig = {
  apiKey: "AIzaSyC0VUgV2B_ClqKImLQAafbklwKZRabod0A",
  authDomain: "biodiva-fa1b0.firebaseapp.com",
  databaseURL: "https://biodiva-fa1b0-default-rtdb.firebaseio.com",
  projectId: "biodiva-fa1b0",
  storageBucket: "biodiva-fa1b0.appspot.com",
  messagingSenderId: "262124821606",
  appId: "1:262124821606:web:09311e0be3fc9b7634a1a7"
};
const authApp = initializeApp(authConfig, "auth");
const auth = getAuth(authApp);
let tbody = document.getElementById("tbody")

const dbRef = ref(db)


// ======================================== FOR DESIGN =====================================//


const sdieMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector('.theme-toggler')

menuBtn.addEventListener('click',()=>{
    sdieMenu.style.display='block'
})

closeBtn.addEventListener('click',()=>{
    sdieMenu.style.display='none'
})
document.body.classList.toggle('dark-theme-variables')

themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables')

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})


// ======================================== LOGOUT =====================================//
function logOut(){
    signOut(auth).then(() => {
      window.location.href="../login.html"
    }).catch((error) => {
      // An error happened.
    });
    }
    
    module.logOut=logOut
    
//  ======= add PHOTO ======== //

let files = []
let reader = new FileReader();
let imgUrl 
var SelBtn = document.getElementById('selbtn');
var UpBtn = document.getElementById('upbtn');

var input = document.createElement('input');
input.type = 'file';

input.onchange = e => {
    files = e.target.files;
    reader.readAsDataURL(files[0]);
}

reader.onload = function () {
    SelBtn.src = reader.result
}

SelBtn.onclick = function () {
  input.click();
}


const newUserName = document.getElementById('newUserName')
const studentPhone = document.getElementById('studentPhone')
const WhatsApp = document.getElementById('WhatsApp')

const ID = document.getElementById('ID')



onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      
      get(child(dbRef, "userData/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          newUserName.value = snapshot.val().name;
          studentPhone.value = snapshot.val().phone
          ID.innerHTML =snapshot.val().code 


          SelBtn.src = snapshot.val().profile_picture;
          document.getElementById("preloader").style.display="none"

        }
        })   
      async function UploadProcess() {
        document.querySelector(".progress").style.display ="inline"
        var ImgToUpload = files[0];
        const metaData = {
            contentType: ImgToUpload.type
        }
        const storage = getStorage();
        const stroageRef = sRef(storage, "BioDiva/"+ "profilePhotos/"+  files[0].name);
        const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);
        UploadTask.on('state-changed', (snapshot) => {
            var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            document.getElementById("progress-bar").innerHTML =progess.toFixed(2) + "%"
            document.getElementById("progress-bar").style.width = progess.toFixed(2) + "%" 
        },
        (error) => {
                alert("error")
            },
            () => {
                document.getElementById("response").style.display="inline"
                getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                imgUrl = downloadURL
                update(ref(db, 'userData/' + user.uid), {
                    name: newUserName.value,
                    profile_picture : imgUrl,
                    phone : studentPhone.value,
               
                  }).then(()=>{
                      document.getElementById("response").style.display="inline"
                  })
                })
            }
        );
    }
  
    UpBtn.addEventListener('click',UploadProcess);

    } else {
      window.location.href = "../login.html";
    }
  });
  


  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      e.preventDefault();
    }
  });
  document.addEventListener('contextmenu', event => event.preventDefault());
  
      