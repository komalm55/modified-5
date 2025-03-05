document.addEventListener("DOMContentLoaded", function () {
    loadLeaveRequests();
    loadReports();
});

// ✅ Load Leave Requests
function loadLeaveRequests() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    const requestContainer = document.getElementById("wardenLeaveRequests");

    if (!requestContainer) return; // Prevent errors if the element is missing

    if (!leaveRequest) {
        requestContainer.innerHTML = "<p>📭 No pending leave requests.</p>";
        return;
    }

    // Ensure request is approved by HOD first
    if (leaveRequest.approvedBy.includes("hod") && !leaveRequest.approvedBy.includes("warden")) {
        requestContainer.innerHTML = `
            <div class="card">
                <h3>📄 Leave Request</h3>
                <p><strong>👤 Student:</strong> ${leaveRequest.studentName || "Dheeraj Mandava"}</p>
                <p><strong>📅 Date:</strong> ${leaveRequest.fromDate} to ${leaveRequest.toDate}</p>
                <button onclick="viewLeaveDetails()">👀 View Details</button>
            </div>
        `;
    } else if (!leaveRequest.approvedBy.includes("hod")) {
        requestContainer.innerHTML = "<p>⏳ Waiting for HOD's approval.</p>";
    } else {
        requestContainer.innerHTML = "<p>✅ Leave request already processed.</p>";
    }
}

// ✅ View Leave Details in Modal
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

// ✅ Approve Leave
function approveLeave() {
    let leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));

    if (!leaveRequest.approvedBy.includes("warden")) {
        leaveRequest.approvedBy.push("warden");
        localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));

        alert(`✅ Leave Approved!\n\n👤 Student: ${leaveRequest.studentName || "Dheeraj Mandava"}\n📅 Date: ${leaveRequest.fromDate} to ${leaveRequest.toDate}`);
        loadLeaveRequests();
        closeModal();
    }
}

// ❌ Reject Leave
function rejectLeave() {
    localStorage.removeItem("leaveRequest");
    alert("❌ Leave request rejected.");
    loadLeaveRequests();
    closeModal();
}

// 🔔 Check Final Approval (Allow Security Code Generation)
function checkFinalApproval() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));

    if (leaveRequest?.approvedBy.includes("warden")) {
        notifyStudent();
    }
}

// 🔔 Notify Student
function notifyStudent() {
    alert("🎉 Warden approved! Student can now generate Security Code.");
}

// 📝 Submit Student Report
document.getElementById("reportForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const report = {
        studentName: document.getElementById("reportName").value,
        rollNumber: document.getElementById("reportRoll").value,
        problem: document.getElementById("reportProblem").value
    };

    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("📨 Report submitted to Warden.");
    loadReports();
});

// 📜 Load Reports
function loadReports() {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    const reportContainer = document.getElementById("wardenReports");

    if (!reportContainer) return; // Prevents errors if the element is missing

    if (reports.length === 0) {
        reportContainer.innerHTML = "<p>📭 No reports submitted.</p>";
        return;
    }

    reportContainer.innerHTML = reports.map((report, index) => `
        <div class="card" id="report-${index}">
            <h3>📜 Student Report</h3>
            <p><strong>👤 Name:</strong> ${report.studentName}</p>
            <p><strong>🎓 Roll No:</strong> ${report.rollNumber}</p>
            <p><strong>⚠️ Issue:</strong> ${report.problem}</p>
            <button onclick="deleteReport(${index})">🗑️ Delete</button>
        </div>
    `).join("");
}

// ❌ Delete Report (Warden)
function deleteReport(index) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (reports[index]) {
        reports.splice(index, 1); // Remove the selected report
        localStorage.setItem("reports", JSON.stringify(reports));
        alert("🗑️ Report deleted successfully.");
        loadReports(); // Refresh report list
    }
}
