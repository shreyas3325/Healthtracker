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
   FETCH WORKOUTS
========================= */

async function fetchWorkouts(){

    try{

        const response = await fetch(

            `${API_URL}/workouts`,

            {
                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        const workouts =
        await response.json();


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



        workouts.reverse().forEach((workout) => {

            workoutList.innerHTML += `

                <div class="workout-item">

                    <div>

                        <strong>
                            ${workout.workoutName}
                        </strong>

                        <br>

                        Category:
                        ${workout.category}

                        <br>

                        Duration:
                        ${workout.duration} mins

                        <br>

                        Calories:
                        ${workout.caloriesBurned}

                    </div>


                    <button
                        class="delete-btn"
                        onclick="deleteWorkout('${workout._id}')"
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
   ADD WORKOUT
========================= */

const workoutForm =
document.getElementById("workoutForm");


workoutForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const workoutName =
        document.getElementById(
            "workoutName"
        ).value;

        const category =
        document.getElementById(
            "workoutCategory"
        ).value;

        const duration =
        document.getElementById(
            "workoutDuration"
        ).value;

        const caloriesBurned =
        document.getElementById(
            "workoutCalories"
        ).value;


        try{

            const response = await fetch(

                `${API_URL}/workouts`,

                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json",

                        Authorization:
                        `Bearer ${token}`,
                    },

                    body:JSON.stringify({
                        workoutName,
                        category,
                        duration,
                        caloriesBurned,
                    }),
                }

            );


            if(response.ok){

                alert(
                    "Workout Added"
                );

                workoutForm.reset();

                fetchWorkouts();

            }

        }catch(error){

            console.log(error);

        }

    }
);





/* =========================
   DELETE WORKOUT
========================= */

async function deleteWorkout(id){

    try{

        const response = await fetch(

            `${API_URL}/workouts/${id}`,

            {
                method:"DELETE",

                headers:{
                    Authorization:
                    `Bearer ${token}`,
                },
            }

        );


        if(response.ok){

            fetchWorkouts();

        }

    }catch(error){

        console.log(error);

    }

}



// LOAD PAGE
fetchWorkouts();