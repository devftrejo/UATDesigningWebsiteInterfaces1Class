// Strict Mode:
"use strict";

let activities = JSON.parse(localStorage.getItem("activities")) || [];
let diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
let growthData = JSON.parse(localStorage.getItem("growthData")) || [];

function logActivity() {
  const activityType = document.getElementById("activityType").value;
  const activityDetails = document.getElementById("activityDetails").value;
  const timestamp = new Date().toLocaleString();

  activities.push({ timestamp, type: activityType, details: activityDetails });
  saveToLocalStorage();
  updateActivityList();
  document.getElementById("activityDetails").value = "";
}

function addDiaryEntry() {
  const entry = document.getElementById("diaryEntry").value;
  const timestamp = new Date().toLocaleString();

  diaryEntries.push({ timestamp, entry });
  saveToLocalStorage();
  updateDiaryList();
  document.getElementById("diaryEntry").value = "";
}

function logGrowth() {
  const date = document.getElementById("growthDate").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const headCircumference = document.getElementById("headCircumference").value;

  growthData.push({ date, weight, height, headCircumference });
  saveToLocalStorage();
  updateGrowthList();

  // Clear input fields
  document.getElementById("growthDate").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("headCircumference").value = "";
}

function updateActivityList() {
  const activityList = document.getElementById("activityList");
  activityList.innerHTML = "";
  activities.forEach((activity, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${activity.timestamp}: ${activity.type} - ${activity.details}
            <div class="button-container">
              <button class="delete-btn" onclick="deleteActivity(${index})">Delete</button>
            </div>
        `;
    activityList.appendChild(li);
  });
}

function updateDiaryList() {
  const diaryList = document.getElementById("diaryList");
  diaryList.innerHTML = "";
  diaryEntries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${entry.timestamp}: ${entry.entry}
            <div class="button-container">
              <button class="delete-btn" onclick="deleteDiaryEntry(${index})">Delete</button>
            </div>
        `;
    diaryList.appendChild(li);
  });
}

function updateGrowthList() {
  const growthList = document.getElementById("growthList");
  growthList.innerHTML = "";
  growthData.forEach((growth, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${growth.date}</span>
            <span>${growth.weight} kg</span>
            <span>${growth.height} cm</span>
            <span>${growth.headCircumference} cm</span>
            <div class="button-container">
              <button class="delete-btn" onclick="deleteGrowthEntry(${index})">Delete</button>
            </div>
        `;
    growthList.appendChild(li);
  });
}

function deleteActivity(index) {
  activities.splice(index, 1);
  saveToLocalStorage();
  updateActivityList();
}

function deleteDiaryEntry(index) {
  diaryEntries.splice(index, 1);
  saveToLocalStorage();
  updateDiaryList();
}

function deleteGrowthEntry(index) {
  growthData.splice(index, 1);
  saveToLocalStorage();
  updateGrowthList();
}

function saveToLocalStorage() {
  localStorage.setItem("activities", JSON.stringify(activities));
  localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  localStorage.setItem("growthData", JSON.stringify(growthData));
}

// Navbar toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementsByClassName("toggle-button")[0];
  const navbarLinks = document.getElementsByClassName("navbar-links")[0];

  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });
});

// Dark mode toggle functionality
document
  .getElementById("darkModeToggle")
  .addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");

    // Save the user's preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  document.getElementById("darkModeToggle").checked = true;
}

// Initial load of data
updateActivityList();
updateDiaryList();
updateGrowthList();
