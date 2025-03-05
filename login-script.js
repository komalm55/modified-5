document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.trim();
    const institute = document.getElementById("institute").value.trim();

    // User Database including Laundry Staff Role
    const users = [
        { username: "23491A4726", password: "123", role: "student", institute: "QIS", dashboard: "student-dashboard.html" },
        { username: "teacher01", password: "123", role: "teacher", institute: "QIS", dashboard: "teacher-dashboard.html" },
        { username: "hod01", password: "123", role: "hod", institute: "QIS", dashboard: "hod-dashboard.html" },
        { username: "principal01", password: "123", role: "principal", institute: "QIS", dashboard: "principal-dashboard.html" },
        { username: "warden01", password: "123", role: "warden", institute: "QIS", dashboard: "warden-dashboard.html" },
        { username: "security01", password: "123", role: "security", institute: "QIS", dashboard: "security-dashboard.html" },
        { username: "laundry01", password: "123", role: "laundry", institute: "QIS", dashboard: "laundry-dashboard.html" } // Laundry Role
    ];

    // Find user
    const user = users.find(u =>
        u.username === username &&
        u.password === password &&
        u.role === role &&
        u.institute === institute
    );

    if (user) {
        alert(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
        localStorage.setItem("loggedInUser", JSON.stringify(user));  // Store session
        window.location.href = user.dashboard;
    } else {
        alert("❌ Invalid login details. Please try again!");
        document.getElementById("loginError").style.display = "block";
    }
});
