document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS AFTER page loads
    emailjs.init("meMLELU0KACm2aJG8"); // PUBLIC KEY

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Contact form not found");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        //Basic validation
        const name = form.user_name.value.trim();
        const email = form.user_email.value.trim();
        const mobile = form.user_mobile.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            alert("Please fill all fields!");
            return;
        }

        // alert("Sending message...");
        console.log("Sending message...");  

        //Send email to YOU (Admin)
        emailjs.sendForm(
            "service_ji6q9xu",
            "template_ochbgf6",
            form,
            "meMLELU0KACm2aJG8" // PUBLIC KEY REQUIRED
        )
        .then(() => {

            //Auto-reply email to USER
            return emailjs.sendForm(
                "service_ji6q9xu",
                "template_eg4fzzd",
                form,
                "meMLELU0KACm2aJG8"
            );

        })
        .then(() => {
            alert("Message sent successfully!");
            form.reset();
        })
        .catch((error) => {
            alert("Failed to send email!");
            console.error("EmailJS Error:", error);
        });
    });

});
