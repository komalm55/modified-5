function openPopup(id) {
    let popup = document.getElementById(id);
    popup.classList.add('show');

    // Add event listener to close popup when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeOnClickOutside);
    }, 100); // Small delay to prevent immediate closing
}

function closeOnClickOutside(event) {
    let popups = document.querySelectorAll('.popup.show');
    popups.forEach(popup => {
        if (!popup.querySelector('.popup-content').contains(event.target)) {
            popup.classList.remove('show');
            document.removeEventListener('click', closeOnClickOutside); // Remove listener after closing
        }
    });
}


let currentIndex = 0;
    function showTestimonial(index) {
        let testimonials = document.querySelectorAll(".testimonial");
        let dots = document.querySelectorAll(".dot");

        testimonials.forEach((t, i) => {
            t.classList.remove("active");
            dots[i].classList.remove("active");
        });

        testimonials[index].classList.add("active");
        dots[index].classList.add("active");
        currentIndex = index;
    }

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % 3;
        showTestimonial(currentIndex);
    }, 5000);

document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // Show button when scrolling down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Scroll to top smoothly on click
    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

