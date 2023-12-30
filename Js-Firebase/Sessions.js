import {initializeApp,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
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
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  import {
    getAuth,
    OAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  
import data from '../json/Data.json' assert {type : 'json'}
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
  const dbRef = ref(db);  

  const auth = getAuth();








  


  onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.emailVerified) {

          const dbRef = ref(db);  
          const AllSectionsData =  data["data"]["sections"]
          const Rooms = document.getElementById('Rooms')
          let params = new URLSearchParams(document.location.search);
          let paramsRoomID = params.get("roomID")
          let userName 
          let userEmail
          let isThereRoomBooked


   

          get(child(dbRef, "userData/" + user.uid)).then((snapshotUser) => {
            if (snapshotUser.exists()) {  
              userName = snapshotUser.val().userName;
              userEmail =user.email;
              isThereRoomBooked = snapshotUser.val().isThereRoomBooked
              console.log(isThereRoomBooked)
            }
      
          });




          function searchRoomWithCurrentTime(roomId) {
            const CourseName = document.getElementById('CourseName');
            const CourseID = document.getElementById('CourseID');
            const InstrctorName = document.getElementById('InstrctorName');
            const StartTime = document.getElementById('StartTime');
            const EndTime = document.getElementById('EndTime');
          
            const matchingRoom = AllSectionsData.find((sec) => 
              sec.schedules && 
              sec.schedules[0] &&
              sec.schedules[0].roomId === roomId
            );
          
            if (matchingRoom) {
              // Extracting event details
              const eventId = matchingRoom.eventId;
              const eventName = matchingRoom.eventName;
          
              // Extracting instructor details
              const instructors = matchingRoom.instructors || [];
              
              // Assuming you want to concatenate all instructor names
              const instructorNames = instructors.map((instructor) => instructor.fullName).join(', ');
          
              // Update the values in your HTML elements
              CourseName.innerHTML = eventName;
              CourseID.innerHTML = eventId;
              InstrctorName.innerHTML = instructorNames;
              StartTime.innerHTML = matchingRoom.schedules[0].startTime;
              EndTime.innerHTML = matchingRoom.schedules[0].endTime;
            } else {
              // Handle the case when no matching room is found
              console.log("No matching room found for roomId: " + roomId);
              // You may want to clear the values in this case
              CourseName.innerHTML = '';
              InstrctorName.innerHTML = '';
              StartTime.innerHTML = '';
              EndTime.innerHTML = '';
            }
          }
        
          function searchRoomToBook(roomId) {
            const NumberOfRoom = document.getElementById('NumberOfRoom');
          
          
            const FormBook = document.getElementById('FormBook')
        
            NumberOfRoom.innerHTML = roomId
        
            FormBook.addEventListener('submit', (e) => {
              e.preventDefault();
            
              const catagory = FormBook['catagory'].value;
              const NumberOfStudents = FormBook['NumberOfStudents'].value;
              if (NumberOfStudents < 0) {
                alert("Please enter a positive number.");
                return false; // Prevent form submission
              }
        
        
              if (!isThereRoomBooked) {
                update(ref(db,"Rooms/"+roomId), {
              
                  NumberOfUserIN : +NumberOfStudents,
                  typeOfBook:catagory,
                  Booked:true,
                  BookedBy:userName ,
                  BookedByEmail:userEmail,
                  UID :auth.currentUser.uid,
                  BookedAt:serverTimestamp()
                  }).then(() => {{
            
                  update(ref(db, "userData/" + user.uid+"/BookedRooms/"+roomId), {
                    NumberOfUserIN : +NumberOfStudents,
                    typeOfBook:catagory,
                    Booked:true,
                    isThereRoomBooked:true,
                    BookedAt:serverTimestamp()
                    }).then(() => {{
                      update(ref(db, "userData/" + user.uid), {
                 
                        isThereRoomBooked:true,
                        }).then(() => {{
                          
                         window.location.reload()
                        }})
           
                    }})
                  }})
              }else{
          document.getElementById('BtnForBokedRoom').click()
              }
          
            
              // Get the current URL parameters
              const urlParams = new URLSearchParams(window.location.search);
            
              // Remove the 'roomID' parameter
              urlParams.delete('roomID');
            
              // Replace the current state in the browser's history without triggering a page reload
              history.replaceState(null, '', window.location.pathname + '?' + urlParams.toString());
            });
           
          }
          function removeRoomBooked(roomId) {
            const NumberOfRoom = document.getElementById('NumberOfRoom');
          
          
            const FormRemoveBook = document.getElementById('FormRemoveBook')
        
            NumberOfRoom.innerHTML = roomId
        
            FormRemoveBook.addEventListener('submit', (e) => {
              e.preventDefault();
            
              const deleteCheck = FormRemoveBook['deleteCheck'];
              console.log()
              if (deleteCheck.checked) {
           

                update(ref(db,"Rooms/"+roomId), {
                  NumberOfUserIN :0,
                  typeOfBook:0,
                  Booked:false,
                  BookedBy:"" ,
                  BookedByEmail:"",
                  UID :"",
                  BookedAt:serverTimestamp()
                  }).then(() => {{
            
                  remove(ref(db, "userData/" + user.uid+"/BookedRooms/"+roomId), {
                   
                    }).then(() => {{
                      
                     window.location.reload()
                    }})
                  }})
              }else{
             
              }


const profilePhoto = document.getElementById("profile_photo");
const Files = document.getElementById("Files")
let CodeArr = []
let numofcodes
// ======================================== Get AND INSERT DATA  =====================================//

// ========================================   =====================================//

// ======================================== FOR DESIGN =====================================//

const sdieMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sdieMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sdieMenu.style.display = "none";
});
document.body.classList.toggle("dark-theme-variables");

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

// ======================================== LOGOUT =====================================//
function logOut() {
  signOut(auth)
    .then(() => {
      window.location.href = "../login.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

module.logOut = logOut;


let  queryString

// ======================== GET VIDEO ID =================== //
function GetFileID (filenumber){

  window.location.href=`./openView.html?FileID=${queryString}&filenumber=${filenumber}`
}
// ======================== GET VIDEO ID =================== //





module.GetFileID = GetFileID
// ======================== END GET VIDEO ID =================== //
// ======================================== END LOGOUT =====================================//
let Grade
let GradeIN
let subjectSel
let subjectIN
let SubscripeWith
onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbRef = ref(db);
    
    let params = new URLSearchParams(document.location.search);
      queryString = params.get("SessionID"); 


    get(child(dbRef, "Session/")).then((snapshot) => {
      if (snapshot.exists()) {
        numofcodes = +snapshot.val().num
      }})
    get(child(dbRef, "userData/" + user.uid)).then((snapshotUser) => {
      if (snapshotUser.exists()) {
        
        Grade = snapshotUser.val().Grade;
        userName.innerHTML = snapshotUser.val().name;
        profilePhoto.src = snapshotUser.val().profile_picture;
        if (!snapshotUser.val()["SessionOpend"][`${queryString}`].IsPurchased) {
            window.location.href = "./Files.html";
          }
        SubscripeWith = snapshotUser.val().SubscripeWith;
        subjectSel = "Bio";
      
     

        get(child(dbRef,  "Session/"+ "SessionOpend/" +`${Grade}/` +`${queryString}/`)).then((snapshotUser) => {
            if (snapshotUser.exists()) {
              
                  const dbRef = ref(
                    db,
                    "Session/"+ "Session/" +`${Grade}/` +`${queryString}/` +"Session/"
                  );
                  onValue(
                    dbRef,
                    (snapshot) => {
                      snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                   
                          subjectIN = "Bio"
                      
                          Files.innerHTML +=
                          `
                          <div class="col-md-4">
                          <article class="course">

                              <div class="course__image">
                                  <img  src="${snapshotUser.val().imgUrl}">
                              </div>
                              <div class="course__info">
                                  <h3>${childData.name}</h3>
                                  <button  class="btn btn-primary" id="${childKey}" onclick="module.GetFileID(this.id)" > Open Session/button> 
                              </div>
                          </article>
                      </div>   
                      `
        
                      });
                      document.getElementById("preloader").style.display="none"
                    },
                    {
                      onlyOnce: true,
                    }
                  );
        

            } });

    
     }

    });
  }else {
    window.location.href="../login.html"
   }
});


document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }
});
document.addEventListener('contextmenu', event => event.preventDefault());

    
            
              // Get the current URL parameters
              const urlParams = new URLSearchParams(window.location.search);
            
              // Remove the 'roomID' parameter
              urlParams.delete('roomID');
            
              // Replace the current state in the browser's history without triggering a page reload
              history.replaceState(null, '', window.location.pathname + '?' + urlParams.toString());
            });
           
          }


          function searchRoomBooked(roomId) {
          
            const RoomIDBooked = document.getElementById('RoomIDBooked')
            const BookedBy = document.getElementById('BookedBy')
            const BookedByEmail = document.getElementById('BookedByEmail')
            const NumberOfStudentsIN = document.getElementById('NumberOfStudentsIN')
            const TypeOfBook = document.getElementById('TypeOfBook')
        
          get(child(dbRef,"Rooms/" +roomId)).then((snapshot)=>{
            if (snapshot.exists()) { 
              RoomIDBooked.innerHTML= roomId
              BookedBy.innerHTML  = snapshot.val().BookedBy
              BookedByEmail.innerHTML  = snapshot.val().BookedByEmail
              NumberOfStudentsIN.innerHTML  = snapshot.val().NumberOfUserIN
              TypeOfBook.innerHTML  = snapshot.val().typeOfBook
             
        
            }})
          }
          
          module.searchRoomWithCurrentTime=searchRoomWithCurrentTime
          module.searchRoomToBook=searchRoomToBook
          module.searchRoomBooked=searchRoomBooked
          module.removeRoomBooked=removeRoomBooked
        
          function isCurrentTimeWithinSchedule(currentTime, startTimeInHours, startTimeInMinutes,endTimeInHours,endTimeInMinutes) {
            const convertTimeToMinutes = (InHours,InMinutes) => {
          
          
              return (InHours * 60 )+ InMinutes;
            };
          
          
            const scheduleStart = convertTimeToMinutes(startTimeInHours,startTimeInMinutes);
            const scheduleEnd = convertTimeToMinutes(endTimeInHours,endTimeInMinutes);
          
        
            let newCurrentTime = (currentTime.getHours()*60)+currentTime.getMinutes()
         
          
            return newCurrentTime >= scheduleStart && newCurrentTime <= scheduleEnd;
          }
        
        
         
          function processRoomIDs(sectionsData) {
        
            const roomIDs = sectionsData
              .filter(sec => sec.schedules && sec.schedules[0] && sec.schedules[0].roomId)
              .map(sec => sec.schedules[0].roomId);
          
            // Remove duplicates
            const uniqueRoomIDs = [...new Set(roomIDs)];
          
            // Custom sorting function
            function customSort(a, b) {
              const getTypeOrder = (id) => {
                if (/^[0-9]+$/.test(id)) {
                  return 0; // Numeric
                } else if (/^G/i.test(id)) {
                  return 1; // G
                } else if (/^F/i.test(id)) {
                  return 2; // F
                } else {
                  return 3; // Other
                }
              };
          
              const typeComparison = getTypeOrder(a) - getTypeOrder(b);
              if (typeComparison !== 0) {
                return typeComparison;
              }
          
              // If types are the same, sort by numeric value
              const aNum = parseInt(a.match(/\d+/), 10) || 0;
              const bNum = parseInt(b.match(/\d+/), 10) || 0;
          
              return aNum - bNum;
            }
          
            // Sort room IDs using the custom sorting function
            const sortedRoomIDs = uniqueRoomIDs.sort(customSort);
          
         // Initialize counters
        let availableRoomsCount = 0;
        let unavailableRoomsCount = 0;
        let RoomBookedByUsersCount = 0;

        const AvailableRoomsCount= document.getElementById('availableRoomsCount')
        const UnavailableRoomsCount= document.getElementById('unavailableRoomsCount')
        const RoomBookedByUsers= document.getElementById('RoomBookedByUsers')
        sortedRoomIDs.forEach((roomID) => {
       
          const matchingRoom = AllSectionsData.find(sec =>
            sec.schedules &&
            sec.schedules[0] &&
            sec.schedules[0].roomId === roomID
          );
        
          const isNotAvailable = matchingRoom && isCurrentTimeWithinSchedule(new Date(), matchingRoom.schedules[0].scheduledStartTime[0], matchingRoom.schedules[0].scheduledStartTime[1], matchingRoom.schedules[0].scheduledEndTime[0], matchingRoom.schedules[0].scheduledEndTime[1]);
        
          const isLabOrTutorial = matchingRoom && (matchingRoom.eventSubType === "Lab" || matchingRoom.eventSubType === "Tutorial");
          const buttonClass = isNotAvailable ? (isLabOrTutorial ? "bg-warning" : "btn-danger") : "btn-success";
        
        
        
        
          get(child(dbRef,"Rooms/" +roomID)).then((snapshot)=>{
            if (snapshot.exists()) { 
 
              if (snapshot.val().Booked) {
                // console.log(snapshot.val().BookedByEmail,auth.currentUser.email)
                if (snapshot.val().BookedByEmail===auth.currentUser.email) {
                 
                  Rooms.innerHTML +=
                  `   
                  <button type="button" class="btn roomBtn bg-secondary" onclick="module.removeRoomBooked(this.id)" style="border-radius: 70rem; color:#fff;" id="${roomID}" data-bs-toggle="modal" data-bs-target="#exampleModal5">${roomID}</button>
                  `;
                }else{
                  Rooms.innerHTML +=
                  `   
                  <button type="button" class="btn roomBtn bg-secondary" style="border-radius: 70rem; color:#fff;" id="${roomID}" onclick="module.searchRoomBooked(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal3">${roomID}</button>
                  `;
                }
              

                RoomBookedByUsersCount++
         
              }else if (!isNotAvailable) {

                Rooms.innerHTML +=
                `   
                <button type="button" class="btn roomBtn ${buttonClass}" style="border-radius: 70rem;" id="${roomID}" onclick="module.searchRoomToBook(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal1">${roomID}</button>
                `;

                availableRoomsCount++;
                if (isLabOrTutorial) {
                  RoomBookedByUsersCount++;
                }

              } else {

                unavailableRoomsCount++;
                Rooms.innerHTML +=
                `   
                <button type="button" class="btn roomBtn ${buttonClass}" style="border-radius: 70rem;" id="${roomID}" onclick="module.searchRoomWithCurrentTime(this.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">${roomID}</button>
                `;

              }
              if (paramsRoomID===roomID) {
                console.log(paramsRoomID)
                document.getElementById(paramsRoomID).click()
              }
              AvailableRoomsCount.innerHTML=availableRoomsCount
              UnavailableRoomsCount.innerHTML=unavailableRoomsCount
              RoomBookedByUsers.innerHTML=RoomBookedByUsersCount
            }
          })
        


        })
      
        
        
          }
        
          processRoomIDs(AllSectionsData);
        

       
  
        }else{
          window.location.href="./Login.html"

        }
    
    }else {
      window.location.href="./Login.html"

     }
  });