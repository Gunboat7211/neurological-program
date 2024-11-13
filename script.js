function calculateResults() {
    const form = document.getElementById('surveyForm');
    const results = {};
    let totalDepressionScore = 0;
    let totalAnxietyScore = 0;

    for (const element of form.elements) {
        if (element.name) {
            results[element.name] = element.value;
            if (element.name.startsWith("interest") || element.name.startsWith("depressed") || 
                element.name.startsWith("sleeping") || element.name.startsWith("energy") ||
                element.name.startsWith("appetite") || element.name.startsWith("selfesteem") ||
                element.name.startsWith("concentration") || element.name.startsWith("motoractivity") ||
                element.name.startsWith("selfharm")) {
                totalDepressionScore += parseInt(element.value);
            }
            if (element.name.startsWith("nervous") || element.name.startsWith("worrying") || 
                element.name.startsWith("excessiveWorry") || element.name.startsWith("troubleRelaxing") ||
                element.name.startsWith("restlessness") || element.name.startsWith("irritability") ||
                element.name.startsWith("fear")) {
                totalAnxietyScore += parseInt(element.value);
            }
        }
    }

    let diagnosisMessage = "";
    if (totalDepressionScore >= 10) {
        diagnosisMessage += "<p>Potential Depression Symptoms Detected.</p>";
    }
    if (totalAnxietyScore >= 10) {
        diagnosisMessage += "<p>Potential Anxiety Symptoms Detected.</p>";
    }
    if (diagnosisMessage === "") {
        diagnosisMessage = "<p>No significant symptoms detected.</p>";
    }

    document.getElementById('diagnosis').innerHTML = diagnosisMessage;
    document.getElementById('hospitalModal').style.display = "block";
    document.getElementById('feedbackSection').style.display = "block"; // Show feedback section
}

function closeModal() {
    document.getElementById('hospitalModal').style.display = "none";
}

function redirectToHospital() {
    window.location.href = "https://www.hospitalwebsite.com"; // Replace with actual hospital URL
}

function submitFeedback() {
    const feedback = document.getElementById('feedback').value;
    alert('Thank you for your feedback!');
    document.getElementById('feedbackForm').reset();
    document.getElementById('feedbackSection').style.display = "none"; // Hide feedback section after submission
}
document.getElementById('surveyForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Response submitted successfully!');
            event.target.reset(); // Clear the form
        } else {
            alert('Error submitting response.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});
document.getElementById('surveyForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Response submitted successfully!');
            event.target.reset(); // Clear the form
        } else {
            alert('Error submitting response.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});

