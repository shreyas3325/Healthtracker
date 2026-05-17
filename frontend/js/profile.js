const API_URL = "http://localhost:5000/api";


// TOKEN
const token = localStorage.getItem("token");


// PROTECT PAGE
if(!token){

    window.location.href = "login.html";

}




/* =========================
   LOGOUT
========================= */

const logoutBtn =
document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});




/* =========================
   LOAD USER PROFILE
========================= */

async function loadUserProfile(){

    try{

        const response = await fetch(

            `${API_URL}/auth/me`,

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        const user =
        await response.json();


        // NAME
        document.getElementById(
            "profileName"
        ).innerText =
        user.name;


        // EMAIL
        document.getElementById(
            "profileEmail"
        ).innerText =
        user.email;


        // AVATAR LETTER
        document.querySelector(
            ".profile-avatar"
        ).innerText =
        user.name.charAt(0).toUpperCase();


    }catch(error){

        console.log(error);

    }

}




/* =========================
   SAVE GOALS
========================= */

const goalsForm =
document.getElementById("goalsForm");


goalsForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();


        const goals = {

            dailyCaloriesGoal:
            document.getElementById(
                "dailyCaloriesGoal"
            ).value,

            waterGoal:
            document.getElementById(
                "waterGoal"
            ).value,

            workoutGoal:
            document.getElementById(
                "workoutGoal"
            ).value,

            targetWeight:
            document.getElementById(
                "targetWeight"
            ).value,

        };


        localStorage.setItem(
            "fitnessGoals",
            JSON.stringify(goals)
        );


        alert("Goals Saved");

    }
);




/* =========================
   LOAD GOALS
========================= */

function loadGoals(){

    const savedGoals =
    JSON.parse(
        localStorage.getItem(
            "fitnessGoals"
        )
    );


    if(savedGoals){

        document.getElementById(
            "dailyCaloriesGoal"
        ).value =
        savedGoals.dailyCaloriesGoal || "";


        document.getElementById(
            "waterGoal"
        ).value =
        savedGoals.waterGoal || "";


        document.getElementById(
            "workoutGoal"
        ).value =
        savedGoals.workoutGoal || "";


        document.getElementById(
            "targetWeight"
        ).value =
        savedGoals.targetWeight || "";

    }

}



// LOAD PAGE
loadUserProfile();

loadGoals();