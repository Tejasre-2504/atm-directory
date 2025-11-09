const apiUrl = "http://localhost:5000/api/atms";
const atmForm = document.getElementById("atmForm");
const atmList = document.getElementById("atmList");

// Load ATMs
async function loadATMs() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  atmList.innerHTML = "";
  data.forEach(atm => {
    const div = document.createElement("div");
    div.className = "atm";
    div.innerHTML = `
      <strong>${atm.location}</strong> - ${atm.city} 
      <br>Status: ${atm.status}
      <br>
      <button onclick="updateATM('${atm._id}', 'Working')">Mark Working</button>
      <button onclick="updateATM('${atm._id}', 'Out of Service')">Mark Out</button>
      <button onclick="deleteATM('${atm._id}')">Delete</button>
    `;
    atmList.appendChild(div);
  });
}

// Add ATM
atmForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const atm = {
    location: document.getElementById("location").value,
    city: document.getElementById("city").value
  };
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atm)
  });
  atmForm.reset();
  loadATMs();
});

// Update ATM status
async function updateATM(id, status) {
  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  loadATMs();
}

// Delete ATM
async function deleteATM(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadATMs();
}

loadATMs();
