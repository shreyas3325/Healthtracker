const API_URL = "http://localhost:5000/api";


// TOKEN
const token = localStorage.getItem("token");


// PROTECT PAGE
if(!token){

    window.location.href = "login.html";

}



// LOGOUT
const logoutBtn =
document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});




/* =========================
   FETCH ANALYTICS
========================= */

async function loadAnalytics(){

    try{


        /* =========================
           FETCH WORKOUTS
        ========================= */

        const workoutResponse =
        await fetch(

            `${API_URL}/workouts`,

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        const workouts =
        await workoutResponse.json();




        /* =========================
           FETCH HEALTH LOGS
        ========================= */

        const healthResponse =
        await fetch(

            `${API_URL}/healthlogs`,

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        const healthLogs =
        await healthResponse.json();




        /* =========================
           TOTAL WORKOUTS
        ========================= */

        document.getElementById(
            "totalWorkouts"
        ).innerText =
        workouts.length;




        /* =========================
           TOTAL CALORIES BURNED
        ========================= */

        let totalCalories = 0;


        workouts.forEach((workout) => {

            totalCalories +=
            Number(
                workout.caloriesBurned || 0
            );

        });


        document.getElementById(
            "totalCalories"
        ).innerText =
        totalCalories;




        /* =========================
           AVG SLEEP
        ========================= */

        let totalSleep = 0;


        healthLogs.forEach((log) => {

            totalSleep +=
            Number(log.sleep || 0);

        });


        const avgSleep =
        healthLogs.length > 0
        ?
        (
            totalSleep /
            healthLogs.length
        ).toFixed(1)
        :
        0;


        document.getElementById(
            "avgSleep"
        ).innerText =
        `${avgSleep}h`;




        /* =========================
           AVG WATER
        ========================= */

        let totalWater = 0;


        healthLogs.forEach((log) => {

            totalWater +=
            Number(log.water || 0);

        });


        const avgWater =
        healthLogs.length > 0
        ?
        (
            totalWater /
            healthLogs.length
        ).toFixed(1)
        :
        0;


        document.getElementById(
            "avgWater"
        ).innerText =
        `${avgWater}L`;



    }catch(error){

        console.log(error);

    }

}



// LOAD ANALYTICS
loadAnalytics();