// Generate Stress Questions
const stressQuestions = [
    "1. Do you often feel overwhelmed?",
    "2. Do you face difficulty sleeping?",
    "3. Do you feel irritated or angry easily?",
    "4. Do you feel tired even after rest?",
    "5. Do you face difficulty focusing?"
];

let questionHTML = "";
stressQuestions.forEach((q, i) => {
    questionHTML += `
        <div class="mb-3">
            <label class="fw-bold">${q}</label>
            <select class="form-select" id="q${i}">
                <option value="1">Never</option>
                <option value="2">Sometimes</option>
                <option value="3">Often</option>
                <option value="4">Always</option>
            </select>
        </div>`;
});
document.getElementById("questions").innerHTML = questionHTML;


// Simulate Health Data
function simulateData() {
    let heart = Math.floor(Math.random() * (140 - 50) + 50);
    let spo2 = Math.floor(Math.random() * (100 - 85) + 85);
    let temp = (Math.random() * (40 - 35) + 35).toFixed(1);

    document.getElementById("heartRate").innerText = heart + " BPM";
    document.getElementById("spo2").innerText = spo2 + " %";
    document.getElementById("temperature").innerText = temp + " °C";

    detectAnomalies(heart, spo2, temp);
}


// Detect Anomalies
function detectAnomalies(heart, spo2, temp) {
    let alertBox = document.getElementById("alertBox");
    let stepsBox = document.getElementById("stepsContainer");
    alertBox.classList.add("d-none");
    stepsBox.innerHTML = "";

    // HEART ATTACK SIGNS
    if (heart > 130 || heart < 50) {
        showAlert("⚠ Possible Heart Attack Symptoms Detected!");

        stepsBox.innerHTML = `
            <h4 class="text-danger fw-bold">Emergency Steps for Heart Attack:</h4>
            <ul>
                <li>Sit down and stay calm.</li>
                <li>Call emergency services immediately.</li>
                <li>Loosen tight clothing.</li>
                <li>Chew aspirin if available.</li>
                <li>Take slow deep breaths.</li>
            </ul>`;
    }

    // BREATHING ISSUE
    else if (spo2 < 92) {
        showAlert("⚠ Low Oxygen Detected – Possible Breathing Issue!");

        stepsBox.innerHTML = `
            <h4 class="text-primary fw-bold">Steps for Breathing Issues:</h4>
            <ul>
                <li>Sit upright to expand lungs.</li>
                <li>Take slow deep breaths.</li>
                <li>Use steam inhalation.</li>
                <li>Drink warm water.</li>
                <li>Seek medical help if condition worsens.</li>
            </ul>`;
    }

    // FEVER
    else if (temp > 38) {
        showAlert("⚠ High Temperature Detected – Possible Fever!");

        stepsBox.innerHTML = `
            <h4 class="text-warning fw-bold">Steps for Fever:</h4>
            <ul>
                <li>Drink plenty of water.</li>
                <li>Take rest.</li>
                <li>Use cold compress.</li>
                <li>Take paracetamol if needed.</li>
                <li>Consult doctor if fever persists.</li>
            </ul>`;
    }
}


// Display Alert
function showAlert(msg) {
    let alertBox = document.getElementById("alertBox");
    alertBox.innerText = msg;
    alertBox.classList.remove("d-none");
}


// Stress Calculation
function calculateStress() {
    let score = 0;
    for (let i = 0; i < 5; i++) {
        score += Number(document.getElementById("q" + i).value);
    }

    let result = "";
    let steps = "";

    if (score <= 7) {
        result = "Stress Level: LOW";
        steps = "<li>Maintain healthy routine.</li><li>Do light exercise.</li><li>Meditate for 5 mins.</li><li>Stay hydrated.</li><li>Sleep properly.</li>";
    } 
    else if (score <= 12) {
        result = "Stress Level: MODERATE";
        steps = "<li>Try breathing exercises.</li><li>Go for a walk.</li><li>Talk to a friend.</li><li>Avoid screen overload.</li><li>Practice mindfulness.</li>";
    } 
    else if (score <= 16) {
        result = "Stress Level: HIGH";
        steps = "<li>Reduce workload.</li><li>Do meditation.</li><li>Avoid stressful conversations.</li><li>Eat healthy food.</li><li>Take small breaks.</li>";
    }
    else {
        result = "Stress Level: VERY HIGH";
        steps = "<li>Stop all work & relax.</li><li>Take deep breaths.</li><li>Avoid isolation.</li><li>Seek support from family.</li><li>Consult a mental health expert.</li>";
    }

    document.getElementById("stressResult").innerHTML = 
        `<h3 class="text-danger">${result}</h3>
         <h5 class="mt-3 text-success fw-bold">Steps to Manage Stress:</h5>
         <ul>${steps}</ul>`;
}

