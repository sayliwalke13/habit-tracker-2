alert("Script Loaded");

const addHabitBtn = document.getElementById("addHabitBtn");
const habitBody = document.getElementById("habitBody");

let habits = [];

addHabitBtn.addEventListener("click", addHabit);

function addHabit() {

    const habitName = prompt("Enter Habit Name");

    if (!habitName) return;

    const target = prompt("Enter Target");

    habits.push({
        name: habitName,
        target: target || "-"
    });

    renderTable();

}

function renderTable() {

    habitBody.innerHTML = "";

    habits.forEach(function (habit, index) {

        let row = `
        <tr>
            <td>${habit.name}</td>
            <td>${habit.target}</td>
        `;

        for (let i = 1; i <= 31; i++) {

            row += `
                <td>
                    <input type="checkbox">
                </td>
            `;

        }

        row += `
            <td>0%</td>

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

function deleteHabit(index) {

    habits.splice(index, 1);

    renderTable();

}