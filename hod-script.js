document.addEventListener("DOMContentLoaded", function () {
    loadLeaveRequests();
});

function loadLeaveRequests() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    const requestContainer = document.getElementById("hodLeaveRequests");

    // Ensure request exists and was first approved by the teacher but not yet by HOD
    if (leaveRequest && leaveRequest.approvedBy.includes("teacher") && !leaveRequest.approvedBy.includes("hod")) {
        requestContainer.innerHTML = `
            <div class="card">
                <h3>📄 Leave Request</h3>
                <p><strong>Student:</strong> ${leaveRequest.studentName || "Dheeraj Mandava"}</p>
                <p><strong>Date:</strong> ${leaveRequest.fromDate} to ${leaveRequest.toDate}</p>
                <button onclick="viewLeaveDetails()">👀 View Details</button>
            </div>
        `;
    } else if (leaveRequest && !leaveRequest.approvedBy.includes("teacher")) {
        requestContainer.innerHTML = "⏳ Waiting for Teacher's approval.";
    } else {
        requestContainer.innerHTML = "No pending leave requests.";
    }
}

function viewLeaveDetails() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    const leaveDetailsTable = document.getElementById("leaveDetailsTable");
    const modal = document.getElementById("leaveDetailsModal");

    if (!leaveRequest) return;

    leaveDetailsTable.innerHTML = `
        <tr><th>👤 Name</th><td>${leaveRequest.studentName || "Dheeraj Mandava"}</td></tr>
        <tr><th>📄 Roll Number</th><td>${leaveRequest.rollNumber || "23491A4726"}</td></tr>
        <tr><th>🏫 Section</th><td>${leaveRequest.section}</td></tr>
        <tr><th>📜 Subject</th><td>${leaveRequest.subject}</td></tr>
        <tr><th>📝 Reason</th><td>${leaveRequest.content}</td></tr>
        <tr><th>📅 Leave Period</th><td>${leaveRequest.fromDate} to ${leaveRequest.toDate}</td></tr>
        <tr><th>📞 Parent Contact</th><td>${leaveRequest.parentPhone}</td></tr>
        <tr><th>📱 Student Contact</th><td>${leaveRequest.studentPhone}</td></tr>
    `;

    modal.style.display = "block"; // Show modal
}

function closeModal() {
    document.getElementById("leaveDetailsModal").style.display = "none";
}

function approveLeave(role) {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));

    if (!leaveRequest.approvedBy.includes(role)) {
        leaveRequest.approvedBy.push(role);
        localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));
        alert("✅ Leave approved by HOD! Forwarding to Warden...");
        forwardToWarden(); // Forward to Warden
        loadLeaveRequests();
        closeModal();
    }
}

function rejectLeave() {
    localStorage.removeItem("leaveRequest");
    alert("❌ Leave request rejected.");
    loadLeaveRequests();
    closeModal();
}

// 📩 Forward to Warden
function forwardToWarden() {
    let leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));

    if (!leaveRequest) return;

    leaveRequest.status = "Pending Approval by Warden";
    localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));

    alert("📨 Leave request forwarded to Warden!");
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("leaveDetailsModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
