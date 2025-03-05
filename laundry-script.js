document.addEventListener("DOMContentLoaded", function () {
    loadLaundryRequests();
});

// 📜 Load Laundry Requests
function loadLaundryRequests() {
    const laundryRequests = JSON.parse(localStorage.getItem("laundryRequests")) || [];
    const laundryContainer = document.getElementById("laundryRequests");

    if (!laundryContainer) return; // Prevent errors if the container doesn't exist

    if (laundryRequests.length === 0) {
        laundryContainer.innerHTML = "📭 No laundry requests received.";
        return;
    }

    laundryContainer.innerHTML = laundryRequests.map((request, index) => `
        <div class="card">
            <h3>🧺 Laundry Request</h3>
            <p><strong>👤 Name:</strong> ${request.name}</p>
            <p><strong>🎓 Roll No:</strong> ${request.rollNumber}</p>
            <p><strong>🏠 Room:</strong> ${request.room}, Block: ${request.block}</p>
            <p><small>📅 Submitted: ${request.timestamp}</small></p>
            <p><strong>Status:</strong> <span id="status-${index}">${request.status}</span></p>

            ${request.status === "Pending" ? `
                <button onclick="updateLaundryStatus(${index}, 'Accepted')">✅ Accept</button>
                <button onclick="updateLaundryStatus(${index}, 'Rejected')">❌ Reject</button>
            ` : request.status === "Accepted" ? `
                <button onclick="markAsCompleted(${index})">🎉 Mark as Completed</button>
            ` : ""}
        </div>
    `).join("");
}

// ✅ Update Laundry Request Status (For Accept/Reject)
function updateLaundryStatus(index, newStatus) {
    let laundryRequests = JSON.parse(localStorage.getItem("laundryRequests")) || [];
    if (laundryRequests[index]) {
        laundryRequests[index].status = newStatus;
        localStorage.setItem("laundryRequests", JSON.stringify(laundryRequests));
        loadLaundryRequests(); // Refresh the list
        showPopup(`✅ Laundry request marked as ${newStatus}!`);
    }
}

// 🗑️ Mark Request as Completed (Removes from List)
function markAsCompleted(index) {
    let laundryRequests = JSON.parse(localStorage.getItem("laundryRequests")) || [];
    
    if (laundryRequests[index]) {
        laundryRequests.splice(index, 1); // Remove the completed request
        localStorage.setItem("laundryRequests", JSON.stringify(laundryRequests));
        loadLaundryRequests(); // Refresh the list
        showPopup("✅ Laundry request has been completed and removed!");
    }
}

// 🎨 Show Popup Modal
function showPopup(message) {
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("popupModal").style.display = "block";
}

// Close Popup Modal
document.getElementById("closePopup")?.addEventListener("click", function () {
    document.getElementById("popupModal").style.display = "none";
});
