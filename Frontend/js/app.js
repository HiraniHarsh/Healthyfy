function submitData() {
    const userData = {
        name: document.getElementById("name").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        goal: document.getElementById("goal").value,
        weeks: document.getElementById("weeks").value
    };

    fetch("http://localhost:5000/api/fitness", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerHTML = `
            <h3>Hello ${data.name}</h3>
            <b>Workout:</b><br>${data.workout}<br><br>
            <b>Diet:</b><br>${data.diet}<br><br>
            <b>Daily Tasks:</b><br>${data.tasks}
        `;
    })
    .catch(err => console.error(err));
}
