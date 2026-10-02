/* ==========================================
   HabitFlow Pro V2
   Professional Script
   Part 1
========================================== */

const habits = [];

const appState = {
    water: 0,
    todayProgress: 0,
    monthlyProgress: 0
};

const currentDate = document.getElementById("currentDate");
const totalHabits = document.getElementById("totalHabits");
const todayProgress = document.getElementById("todayProgress");
const monthlyProgress = document.getElementById("monthlyProgress");
const waterCount = document.getElementById("waterCount");
const habitTableContainer = document.getElementById("habitTableContainer");
const addHabitBtn = document.getElementById("addHabitBtn");

function showDate() {
    const now = new Date();

    currentDate.textContent =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

function updateCards() {

    totalHabits.textContent = habits.length;

    todayProgress.textContent =
        appState.todayProgress + "%";

    monthlyProgress.textContent =
        appState.monthlyProgress + "%";

    waterCount.textContent =
        appState.water + " L";
}

showDate();
updateCards();
/* ==========================================
   HabitFlow Pro V2
   Professional Script
   Part 2
========================================== */

function createHabitTable() {

    let table = `
    <table>
        <thead>
            <tr>
                <th>Habit</th>`;

    for (let i = 1; i <= 31; i++) {
        table += <th>${i}</th>;
    }

    table += `
                <th>%</th>
            </tr>
        </thead>
        <tbody>
    `;

    habits.forEach((habit, habitIndex) => {

        table += `
        <tr>

            <td>${habit.name}</td>
        `;

        let completed = 0;

        habit.days.forEach((day, dayIndex) => {

            if (day) completed++;

            table += `
            <td>

            <input
                type="checkbox"
                ${day ? "checked" : ""}
                onchange="toggleDay(${habitIndex},${dayIndex})">

            </td>
            `;

        });

        let percent = Math.round((completed / 31) * 100);

        table += `

        <td class="progress">

        ${percent}%

        </td>

        </tr>
        `;

    });

    table += `
        </tbody>
    </table>
    `;

    habitTableContainer.innerHTML = table;

}

function toggleDay(habitIndex, dayIndex){

    habits[habitIndex].days[dayIndex] =
    !habits[habitIndex].days[dayIndex];

    updateCards();

    createHabitTable();

}
/* ==========================================
   HabitFlow Pro V2
   Professional Script
   Part 3
========================================== */

addHabitBtn.addEventListener("click", addHabit);

function addHabit() {

    const habitName = prompt("Enter Habit Name");

    if (!habitName) return;

    habits.push({

        function addHabit() {

    const habitName = prompt("Enter Habit Name");

    if (habitName === null || habitName.trim() === "") {
        return;
    }

    habits.push({
        name: habitName.trim(),
        days: Array(31).fill(false)
    });

    updateCards();
    createHabitTable();
}