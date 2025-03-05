// 📝 Submit Leave Request
document.getElementById("leaveForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const leaveRequest = {
        fromDate: document.getElementById("leaveDate").value,
        toDate: document.getElementById("leaveToDate").value,
        approvers: ["classTeacher", "hod", "warden"],
        approvedBy: [],
        section: document.getElementById("section").value,
        subject: document.getElementById("subject").value,
        content: document.getElementById("content").value,
        parentPhone: document.getElementById("parentPhone").value,
        studentPhone: document.getElementById("studentPhone").value,
        status: "Pending",
        securityCode: null
    };

    localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));
    alert("✅ Leave request submitted successfully!");
    loadLeaveStatus();
});

// 🔄 Load Leave Status
function loadLeaveStatus() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    const leaveStatus = document.getElementById("leaveStatus");
    const codeDisplay = document.getElementById("generatedCode");

    if (!leaveRequest) {
        leaveStatus.innerHTML = "No leave requests submitted.";
        codeDisplay.innerHTML = "";
        return;
    }

    const totalApprovers = leaveRequest.approvers.length; // 3 approvers (Class Teacher, HOD, Warden)
    const approvedCount = leaveRequest.approvedBy?.length || 0;

    if (approvedCount < totalApprovers) {
        leaveStatus.innerHTML = `
            🕒 Leave Period: ${leaveRequest.fromDate} to ${leaveRequest.toDate} <br>
            📜 Subject: ${leaveRequest.subject} <br>
            ✅ Approved by: ${approvedCount} / ${totalApprovers} Approvers
        `;
        codeDisplay.innerHTML = ""; // Hide security code if approvals are pending
    } else {
        leaveStatus.innerHTML = ""; // Hide approval count when all approvals are done

        if (leaveRequest.securityCode) {
            codeDisplay.innerHTML = `
                🔐 Security Code: <strong>${leaveRequest.securityCode}</strong> <br>
                <button onclick="clearSecurityCode()">OK</button>
            `;
        } else {
            codeDisplay.innerHTML = `<br> 🎉 All approvals completed! Click 'Generate Code' to proceed.`;
        }
    }
}

// ❌ Clear Security Code
function clearSecurityCode() {
    let leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));

    if (leaveRequest && leaveRequest.securityCode) {
        delete leaveRequest.securityCode; // Remove security code
        localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));
    }

    loadLeaveStatus(); // Refresh UI
}

// Load leave status on page load
document.addEventListener("DOMContentLoaded", loadLeaveStatus);



// 🔐 Generate Security Code
function generateSecurityCode() {
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));

    if (!leaveRequest) {
        showPopup("❌ No leave request found.");
        return;
    }

    if (leaveRequest.approvedBy.length < 3) {
        showPopup(`⏳ Leave is not yet fully approved. ${3 - leaveRequest.approvedBy.length} approvals remaining.`);
        return;
    }

    if (!leaveRequest.securityCode) {
        leaveRequest.securityCode = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("leaveRequest", JSON.stringify(leaveRequest));
    }

    document.getElementById("generatedCode").innerHTML = `🔐 Security Code: <strong>${leaveRequest.securityCode}</strong>`;
    showPopup(`✅ Security code generated: ${leaveRequest.securityCode}`);
}

// 📢 📝 Submit Report to Warden
document.getElementById("reportForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("reportName")?.value.trim();
    const rollNumber = document.getElementById("reportRoll")?.value.trim();
    const problem = document.getElementById("reportProblem")?.value.trim();

    if (!studentName || !rollNumber || !problem) {
        showPopup("❌ Please fill in all fields before submitting the report.");
        return;
    }

    const report = {
        studentName: studentName,
        rollNumber: rollNumber,
        problem: problem,
        timestamp: new Date().toLocaleString()
    };

    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));

    showPopup("📨 Report submitted successfully!");
    document.getElementById("reportForm").reset();
    loadReports();
});

// 📜 Load Student Reports (for student view)
function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const reportContainer = document.getElementById("studentReports");

    if (!reportContainer) return; // Avoid errors if this section doesn't exist

    if (reports.length === 0) {
        reportContainer.innerHTML = "📭 No reports submitted.";
        return;
    }

    reportContainer.innerHTML = reports.map(report => `
        <div class="card">
            <h3>📜 Submitted Report</h3>
            <p><strong>👤 Name:</strong> ${report.studentName}</p>
            <p><strong>🎓 Roll No:</strong> ${report.rollNumber}</p>
            <p><strong>⚠️ Issue:</strong> ${report.problem}</p>
            <p><small>📅 Submitted: ${report.timestamp}</small></p>
        </div>
    `).join("");
}

// 🧺 Laundry Request Form Submission
document.getElementById("laundryForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const laundryName = document.getElementById("laundryName").value.trim();
    const laundryRoll = document.getElementById("laundryRoll").value.trim();
    const laundryRoom = document.getElementById("laundryRoom").value.trim();
    const laundryBlock = document.getElementById("laundryBlock").value.trim();

    if (!laundryName || !laundryRoll || !laundryRoom || !laundryBlock) {
        showPopup("❌ Please fill in all the details before submitting.");
        return;
    }

    const laundryRequest = {
        name: laundryName,
        rollNumber: laundryRoll,
        room: laundryRoom,
        block: laundryBlock,
        timestamp: new Date().toLocaleString(),
        status: "Pending"
    };

    let laundryRequests = JSON.parse(localStorage.getItem("laundryRequests")) || [];
    laundryRequests.push(laundryRequest);
    localStorage.setItem("laundryRequests", JSON.stringify(laundryRequests));

    showPopup("📨 Laundry request sent successfully!");
    document.getElementById("laundryForm").reset();
    loadLaundryRequests(); // Refresh the list
});

// 📜 Load Laundry Requests in Dashboard
function loadLaundryRequests() {
    const laundryRequests = JSON.parse(localStorage.getItem("laundryRequests")) || [];
    const laundryContainer = document.getElementById("laundryRequests");

    if (!laundryContainer) return; // Prevent errors if the container doesn't exist

    if (laundryRequests.length === 0) {
        laundryContainer.innerHTML = "📭 No laundry requests submitted.";
        return;
    }

    laundryContainer.innerHTML = laundryRequests.map((request, index) => `
        <div class="card">
            <h3>🧺 Laundry Request</h3>
            <p><strong>👤 Name:</strong> ${request.name}</p>
            <p><strong>🎓 Roll No:</strong> ${request.rollNumber}</p>
            <p><strong>🏠 Room:</strong> ${request.room}, Block: ${request.block}</p>
            <p><small>📅 Submitted: ${request.timestamp}</small></p>
            <p><strong>Status:</strong> ${request.status}</p>
            <button onclick="updateLaundryStatus(${index}, 'Completed')">✅ Mark as Completed</button>
        </div>
    `).join("");
}

// ✅ Update Laundry Request Status
function updateLaundryStatus(index, newStatus) {
    let laundryRequests = JSON.parse(localStorage.getItem("laundryRequests")) || [];
    if (laundryRequests[index]) {
        laundryRequests[index].status = newStatus;
        localStorage.setItem("laundryRequests", JSON.stringify(laundryRequests));
        loadLaundryRequests(); // Refresh the list
        showPopup(`✅ Laundry request marked as ${newStatus}!`);
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
