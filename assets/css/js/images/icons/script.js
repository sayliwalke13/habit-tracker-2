// ==========================
// HabitFlow Pro V2
// Part 3A
// ==========================

const addHabitBtn = document.getElementById("addHabitBtn");
const habitBody = document.getElementById("habitBody");

let habits = [];

// ---------- Load Saved Data ----------

const savedHabits = localStorage.getItem("habits");

if (savedHabits) {
    habits = JSON.parse(savedHabits);
}

// ---------- Add Habit ----------

addHabitBtn.addEventListener("click", addHabit);

function addHabit() {

    const habitName = prompt("Enter Habit Name");

    if (!habitName) return;

    const target = prompt("Enter Target");

    habits.push({
        name: habitName,
        target: target || "-",
        days: new Array(31).fill(false)
    });

    saveData();

    renderTable();

}

// ---------- Save Data ----------

function saveData() {

    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );

}
// ==========================
// HabitFlow Pro V2
// Part 3B
// ==========================

function renderTable() {

    habitBody.innerHTML = "";

    habits.forEach((habit, index) => {

        let completed = 0;

        let row = `
        <tr>
            <td>${habit.name}</td>
            <td>${habit.target}</td>
        `;

        for (let i = 0; i < 31; i++) {

            if (habit.days[i]) {
                completed++;
            }

            row += `
            <td>
                <input
                    type="checkbox"
                    ${habit.days[i] ? "checked" : ""}
                    onchange="toggleDay(${index}, ${i})">
            </td>
            `;
        }

        const percent = Math.round((completed / 31) * 100);

        row += `
            <td>${percent}%</td>

            <td>
                <button onclick="deleteHabit(${index})">
                    ❌
                </button>
            </td>

        </tr>
        `;

        habitBody.innerHTML += row;

    });

}
// ==========================
// HabitFlow Pro V2
// Part 3C
// ==========================

function toggleDay(habitIndex, dayIndex) {

    habits[habitIndex].days[dayIndex] =
        !habits[habitIndex].days[dayIndex];

    saveData();

    renderTable();

}

function deleteHabit(index) {

    habits.splice(index, 1);

    saveData();

    renderTable();

}

// ---------- Dashboard ----------

function updateDashboard() {

    document.getElementById("totalHabits").textContent = habits.length;

    let totalCompleted = 0;

    habits.forEach(habit => {
        totalCompleted += habit.days.filter(day => day).length;
    });

    const totalPossible = habits.length * 31;

    const progress = totalPossible === 0
        ? 0
        : Math.round((totalCompleted / totalPossible) * 100);

    document.getElementById("todayProgress").textContent = progress + "%";
    document.getElementById("monthlyProgress").textContent = progress + "%";
    document.getElementById("currentStreak").textContent = totalCompleted;

}

// ---------- Render App ----------

function renderApp() {

    renderTable();

    updateDashboard();

}

// ---------- Start ----------

renderApp();
// Notes

const notes = document.getElementById("notes");

notes.value = localStorage.getItem("notes") || "";

notes.addEventListener("input", function () {
    localStorage.setItem("notes", notes.value);
});