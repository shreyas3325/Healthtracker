const API_URL =
"http://localhost:5000/api";


// TOKEN
const token =
localStorage.getItem("token");


// PROTECT PAGE
if(!token){

    window.location.href =
    "login.html";

}




/* =========================
   LOGOUT
========================= */

const logoutBtn =
document.getElementById(
    "logoutBtn"
);


logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "token"
        );

        window.location.href =
        "login.html";

    }
);




/* =========================
   BMI CALCULATOR
========================= */

const bmiForm =
document.getElementById(
    "bmiForm"
);


bmiForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();


        const height =
        document.getElementById(
            "heightInput"
        ).value / 100;


        const weight =
        document.getElementById(
            "bmiWeightInput"
        ).value;


        if(!height || !weight){

            return;

        }


        const bmi =
        (
            weight /
            (height * height)
        ).toFixed(1);


        document.getElementById(
            "bmiValue"
        ).innerText = bmi;


        let status = "";


        if(bmi < 18.5){

            status = "Underweight";

        }else if(bmi < 25){

            status = "Normal";

        }else if(bmi < 30){

            status = "Overweight";

        }else{

            status = "Obese";

        }


        document.getElementById(
            "bmiStatus"
        ).innerText = status;

    }
);





/* =========================
   LOAD DASHBOARD DATA
========================= */

async function loadDashboard(){

    try{


        /* =========================
           HEALTH LOGS
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
           WORKOUTS
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
           DASHBOARD CARDS
        ========================= */

        if(healthLogs.length > 0){

            const latest =
            healthLogs[
                healthLogs.length - 1
            ];


            document.getElementById(
                "caloriesValue"
            ).innerText =
            latest.calories || 0;


            document.getElementById(
                "waterValue"
            ).innerText =
            `${latest.water || 0}L`;


            document.getElementById(
                "sleepValue"
            ).innerText =
            `${latest.sleep || 0}h`;


            document.getElementById(
                "weightValue"
            ).innerText =
            `${latest.weight || 0}kg`;

        }




        /* =========================
           RECENT WORKOUTS
        ========================= */

        const workoutList =
        document.getElementById(
            "workoutList"
        );


        workoutList.innerHTML = "";


        if(workouts.length === 0){

            workoutList.innerHTML = `

                <div class="empty-workout">
                    No workouts added yet
                </div>

            `;

            return;

        }



        workouts
        .slice(-3)
        .reverse()
        .forEach((workout) => {

            workoutList.innerHTML += `

                <div class="workout-item">

                    <div>

                        <strong>
                            ${workout.workoutName}
                        </strong>

                        <br>

                        ${workout.category}

                        •

                        ${workout.duration} mins

                    </div>

                </div>

            `;

        });



    }catch(error){

        console.log(error);

    }

}



// LOAD PAGE
loadDashboard();