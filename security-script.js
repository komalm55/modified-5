document.addEventListener("DOMContentLoaded", function () {
    console.log("🔒 Security Dashboard Loaded.");
});

// Verify the entered security code
function verifySecurityCode() {
    const enteredCode = document.getElementById("securityCodeInput").value;
    const leaveRequest = JSON.parse(localStorage.getItem("leaveRequest"));
    const storedCode = leaveRequest?.securityCode;
    const resultElement = document.getElementById("verificationResult");

    if (!enteredCode || enteredCode.length !== 6) {
        resultElement.innerHTML = "❌ Please enter a valid 6-digit code.";
        resultElement.style.color = "red";
        return;
    }

    if (enteredCode === String(storedCode)) {
        resultElement.innerHTML = "✅ Code Verified! Student is approved for leave.";
        resultElement.style.color = "green";

        // Optional: Clear request after verification
        localStorage.removeItem("leaveRequest");
    } else {
        resultElement.innerHTML = "❌ Invalid code. Access denied.";
        resultElement.style.color = "red";
    }
}