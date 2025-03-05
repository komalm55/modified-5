document.addEventListener("DOMContentLoaded", function () {
    loadLeaveRequests();
});

function loadLeaveRequests() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    const requestContainer = document.getElementById("principalLeaveRequests");

    if (leaveRequest && !leaveRequest.approvedBy.includes("principal")) {
        requestContainer.innerHTML = `
            <div class="card">
                <h3>📄 Leave Request</h3>
                <p><strong>Student:</strong> Dheeraj Mandava</p>
                <p><strong>Date:</strong> ${leaveRequest.date}</p>
                <p><strong>Reason:</strong> ${leaveRequest.content}</p>
                <button onclick="approveLeave('principal')">✅ Approve</button>
                <button onclick="rejectLeave()">❌ Reject</button>
            </div>
        `;
    } else {
        requestContainer.innerHTML = "No pending leave requests.";
    }
}

function approveLeave(role) {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    if (!leaveRequest.approvedBy.includes(role)) {
        leaveRequest.approvedBy.push(role);
        localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));
        alert("✅ Leave approved by Principal!");
        loadLeaveRequests();
        checkFinalApproval();
    }
}

function rejectLeave() {
    localStorage.removeItem("leaveRequest");
    alert("❌ Leave request rejected.");
    loadLeaveRequests();
}

function checkFinalApproval() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    if (leaveRequest.approvedBy.length === 4) {
        notifyStudent();
    }
}

function notifyStudent() {
    alert("🎉 All approvals completed! Notification sent to the student.");
}