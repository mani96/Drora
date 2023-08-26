
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    var formData = new FormData(this);
    var email = formData.get("email");
    var name = formData.get("name");
    var service = formData.get("text");
    var phone = formData.get("text");
    var message = formData.get("message");

    // Create email payload
    var emailData = {
      personalizations: [
        {
          to: [{ email: "droracontact@gmail.com" }] // Replace with the recipient's email address
        }
      ],
      from: { email: email }, // Replace with your sender email address
      subject: "New Contact Form Submission",
      content: [
        {
          type: "text/plain",
          value:  message
        }
      ]
    };

    // Send email using Twilio SendGrid API
    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": "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", // Replace with your SendGrid API key
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    })
    .then(function(response) {
      if (response.ok) {
        // Successful response
        alert("Message sent successfully!");
        // You can perform additional actions here, such as clearing the form
        document.getElementById("contact-form").reset();
      } else {
        // Error sending email
        console.error("Error sending email:", response.statusText);
        alert("Failed to send email. Please try again later.");
      }
    })
    .catch(function(error) {
      // Error making the request
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    });
  });

  // Function to format the email body using form data
  function formatEmailBody(formData) {
    var body = "";
    for (var pair of formData.entries()) {
      body += pair[0] + ": " + pair[1] + "\n";
    }
    return body;
  }

