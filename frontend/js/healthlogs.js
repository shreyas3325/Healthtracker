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
   FETCH HEALTH LOGS
========================= */

async function fetchHealthLogs(){

    try{

        const response = await fetch(

            `${API_URL}/healthlogs`,

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        const logs =
        await response.json();


        const logsList =
        document.getElementById(
            "healthLogsList"
        );


        logsList.innerHTML = "";


        if(logs.length === 0){

            logsList.innerHTML = `

                <div class="empty-workout">
                    No health logs added yet
                </div>

            `;

            return;

        }



        logs.reverse().forEach((log) => {

            logsList.innerHTML += `

                <div class="workout-item">

                    <div>

                        <strong>
                            Calories:
                        </strong>

                        ${log.calories}

                        <br>

                        Water:
                        ${log.water}L

                        <br>

                        Sleep:
                        ${log.sleep}h

                        <br>

                        Weight:
                        ${log.weight}kg

                    </div>


                    <button
                        class="delete-btn"
                        onclick="deleteLog('${log._id}')"
                    >
                        Delete
                    </button>

                </div>

            `;

        });

    }catch(error){

        console.log(error);

    }

}




/* =========================
   ADD HEALTH LOG
========================= */

const healthForm =
document.getElementById("healthForm");


healthForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const calories =
        document.getElementById(
            "caloriesInput"
        ).value;

        const water =
        document.getElementById(
            "waterInput"
        ).value;

        const sleep =
        document.getElementById(
            "sleepInput"
        ).value;

        const weight =
        document.getElementById(
            "weightInput"
        ).value;


        try{

            const response = await fetch(

                `${API_URL}/healthlogs`,

                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json",

                        Authorization:
                        `Bearer ${token}`,
                    },

                    body:JSON.stringify({
                        calories,
                        water,
                        sleep,
                        weight,
                    }),
                }

            );


            if(response.ok){

                alert(
                    "Health Log Added"
                );

                healthForm.reset();

                fetchHealthLogs();

            }

        }catch(error){

            console.log(error);

        }

    }
);





/* =========================
   DELETE LOG
========================= */

async function deleteLog(id){

    try{

        const response = await fetch(

            `${API_URL}/healthlogs/${id}`,

            {
                method:"DELETE",

                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        if(response.ok){

            fetchHealthLogs();

        }

    }catch(error){

        console.log(error);

    }

}



// LOAD PAGE
fetchHealthLogs();