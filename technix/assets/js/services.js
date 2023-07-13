// displaying service data
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("service.html")) {
    // Code for index.html
    fetch("services.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach((service) => {
          const container = document.getElementById("service-container");
          const words = service.description.split(" ");
          let truncatedDescription = words.slice(0, 10).join(" ");

          // Add "..." if the description is longer than 10 words
          if (words.length > 10) {
            truncatedDescription += "...";
          }
          // console.log(truncatedDescription)

          const cardElement = document.createElement("div");
          cardElement.classList.add("col-xl-3", "col-lg-4", "col-md-6");

  //         const cardContent = `
  //   <div class="tp-service-3-content breadcrumb-item mb-30 service-card">
  //     <div class="tp-service-3-content-thumb">
  //       <img src="assets/img/services/home-3/icon-1.png" alt="">
  //     </div>
  //     <h4 class="tp-service-breadcrumb-title"><a href="service-details.html?service=${service.id}" class="service-link" data-service-id="${service.id}">${service.name}</a></h4>
  //     <p>${truncatedDescription}</p>
  //     <div class="tp-service-btn">
  //       <a href="service-details.html?service=${service.id}" class="service-link" data-service-id="${service.id}">Read More <i class="fa-solid fa-arrow-up-right"></i></a>
  //     </div>
  //   </div>
  // `;

          const cardContent = `
            <div class="tp-service-3-content breadcrumb-item mb-30 service-card">
              <div class="tp-service-3-content-thumb">
                <img src="assets/img/services/home-3/icon-1.png" alt="">
              </div>
              <h4 class="tp-service-breadcrumb-title"><a href="service-details.html?service=${service.id}" class="service-link" data-service-id="${service.id}">${service.name}</a></h4>
              <p>${truncatedDescription}</p>
            </div>
          `;

          cardElement.innerHTML = cardContent;
          container.appendChild(cardElement);
        });
      });
    const serviceLinks = document.querySelectorAll(".service-link");
    serviceLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const serviceId = link.dataset.serviceId; // Update attribute name to serviceId
        window.location.href =
          "service-details.html?service=" + encodeURIComponent(serviceId);
        displayServiceDetail(serviceId); // Pass serviceId to the function
      });
    });
  } else if (window.location.pathname.includes("service-details.html")) {
    // Code for service-detail.html
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("service");
    console.log(serviceId);

    fetch("services.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const service = data.find(function (item) {
          return item.id === serviceId;
        });
        if (service) {
          displayServiceDetail(service);
        } else {
          document.getElementById("service-heading").textContent =
            "Service not found.";
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        document.getElementById("service-detail-container").textContent =
          "An error occurred.";
      });
  }
});

function displayServiceDetail(service) {
  const title = document.getElementById("service-heading");
  const description = document.getElementById("service-description");
  console.log(service);

  title.textContent = service.name;
  description.textContent = service.description;
}
