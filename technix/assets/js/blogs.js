document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('blog.html')) {
      fetch("blogs.json")
        .then((response) => {
          return response.json();
        }).then((data) => {
          const container = document.getElementById("blog-section");
          const blogsPerPage = 4;
          const currentPage = getCurrentPage();
          const startIndex = (currentPage - 1) * blogsPerPage;
          const endIndex = startIndex + blogsPerPage;
  
          const paginatedData = data.slice(startIndex, endIndex);
  
          paginatedData.forEach((blog) => {
            const cardelement = document.createElement('article');
            cardelement.classList.add("postbox__item", "format-image", "mb-50", "transition-3");
  
            const cardcontent = `<div class="postbox__thumb w-img">
              <a href="blog-details.html">
                 <img src="${blog.image}" alt="">
              </a>
              <div class="postbox__tag">
                 <p>Business</p>
              </div>
            </div>
            <div class="postbox__content">
              <div class="postbox__meta">
                 <span><i class="fa-light fa-calendar-days"></i> 02 Apr 2021</span>
                 <span><a href="#"><i class="fal fa-comments"></i> Comments (03)</a></span>
                 <span><a href="#"><i class="fa-regular fa-clock"></i> 3 min Read</a></span>
              </div>
              <h3 class="postbox__title">${blog.title}</h3>
              <div class="postbox__text">
                 <p>${blog.blog}</p>
              </div>
              <div class="postbox__read-more">
                 <a href="blog-details.html" class="tp-btn">read more</a>
              </div>
            </div>`;
  
            cardelement.innerHTML = cardcontent;
            container.appendChild(cardelement);
          });
  
          const totalPages = Math.ceil(data.length / blogsPerPage);
          createPaginationLinks(totalPages, currentPage);
  
          // Helper function to get the current page number from the URL query parameter
          function getCurrentPage() {
            const urlParams = new URLSearchParams(window.location.search);
            const pageParam = urlParams.get('page');
            return parseInt(pageParam) || 1;
          }
  
          // Helper function to create pagination links
          function createPaginationLinks(totalPages, currentPage) {
            const paginationContainer = document.querySelector('.basic-pagination ul');
            paginationContainer.innerHTML = '';
  
            for (let i = 1; i <= totalPages; i++) {
              const listItem = document.createElement('li');
              const link = document.createElement('a');
              link.href = `blog.html?page=${i}`;
              link.textContent = i;
  
              if (i === currentPage) {
                link.classList.add('current');
              }
  
              listItem.appendChild(link);
              paginationContainer.appendChild(listItem);
            }
          }
        });
    }
    else if (window.location.pathname.includes('index.html') || window.location.pathname.includes('about-us.html') || window.location.pathname.includes('service.html')) {
        fetch("blogs.json")
          .then((response) => {
            return response.json();
          }).then((data) => {
            const container = document.getElementById("blog-section");
            const latestBlogs = data.slice(0, 3); // Get the latest three blogs
    
            latestBlogs.forEach((blog) => {
              const cardelement = document.createElement('div');
              cardelement.classList.add("col-lg-4","col-md-6");
    
              const cardcontent = `
              <div class="tp-blog-wrapper mb-30">
              <div class="tp-blog-thumb">
                <a href="blog-details.html"><img src="assets/img/blog/img-1.jpg" alt="" /></a>
                <div class="tp-blog-tag">
                  <p>Business</p>
                </div>
              </div>
              <div class="tp-blog-content">
                <div class="tp-blog-details">
                  <div class="tp-blog-date">
                    <span><i class="fa-light fa-calendar-days"></i> ${blog.date}
                    </span>
                    <span>-</span>
                    <span><i class="fa-sharp fa-solid fa-comments"></i> Comments
                      (03)</span>
                  </div>
                </div>
                <h3 class="tp-blog-title">
                  <a href="blog-details.html?blog=${blog.id}" >${blog.title}</a>
                </h3>
                <div class="tp-blog-btn d-flex justify-content-between">
                  <div class="read-more p-relative">
                    <a href="blog-details.html">Read MOre
                      <span><svg width="39" height="8" viewBox="0 0 39 8" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M38.141 4.13651C38.3362 3.94125 38.3362 3.62466 38.141 3.4294L34.959 0.247422C34.7637 0.05216 34.4471 0.05216 34.2519 0.247422C34.0566 0.442684 34.0566 0.759267 34.2519 0.954529L37.0803 3.78296L34.2519 6.61138C34.0566 6.80665 34.0566 7.12323 34.2519 7.31849C34.4471 7.51375 34.7637 7.51375 34.959 7.31849L38.141 4.13651ZM0.945313 4.28296L37.7874 4.28296L37.7874 3.28296L0.945312 3.28296L0.945313 4.28296Z"
                            fill="currentColor" />
                        </svg></span>
                    </a>
                  </div>
                  <div class="fvrt">
                    <span><i class="fa-light fa-heart"></i></span>
                  </div>
                </div>
              </div>
            </div>`;
    
              cardelement.innerHTML = cardcontent;
              container.appendChild(cardelement);
            });
          });
      }
      else if(window.location.pathname.includes('blog-details.html')){
        const params = new URLSearchParams(window.location.search);
        const blogid = params.get('blog');
        // console.log(blogid)

        fetch('blogs.json')
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const blog = data.find(function (item) {
            // console.log(item.id)
            return item.id === blogid;
          });
          // console.log(blog)
          if (blog) {
            displayBlogDetails(blog);
          } else {
            document.getElementById("blog_title").textContent =
              "Service not found.";
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
          document.getElementById("service-detail-container").textContent =
            "An error occurred.";
        });
  }});


function displayBlogDetails(blog){
    const title = document.getElementById('blog_title')
    const description = document.getElementById('blog_description')

    title.textContent = blog.title
    description.textContent = blog.blog
}
  

