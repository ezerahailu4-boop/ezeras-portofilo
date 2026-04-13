AOS.init();

const projectcards = document.querySelector(".projectcards");

const projects = [
  {
    title: "E-Commerce Platform",
    cardImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    description: "Full-stack e-commerce platform with React, Redux, Node.js, Express, MongoDB, and Stripe payment integration.",
    Previewlink: "#",
    Githublink: "https://github.com/ezerahailu4-boop",
  },
  {
    title: "Survey & Feedback App",
    cardImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Real-time survey and satisfaction form application with analytics dashboard built using React, Node.js, and Chart.js.",
    Previewlink: "https://taf-survey.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop",
  },
  {
    title: "Tour Guide Website",
    cardImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    description: "A beautiful, responsive tour guide website built with React.js, featuring destination listings and booking UI.",
    Previewlink: "https://timiket-tour-guide.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop",
  },
  {
    title: "Grocery Store Website",
    cardImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
    description: "Full-featured online grocery store with product catalog, shopping cart, and checkout built with React and PostgreSQL.",
    Previewlink: "https://tana-grocery-store.vercel.app/",
    Githublink: "https://github.com/ezerahailu4-boop",
  },
  {
    title: "Coffee Export Platform",
    cardImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop",
    description: "B2B platform for Ethiopian coffee exporters built with Next.js, Tailwind CSS, and Sanity CMS.",
    Previewlink: "https://birhan-coffee-lwgv.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop",
  },
  {
    title: "Snake Game",
    cardImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    description: "Classic snake game built with vanilla HTML5 Canvas, CSS, and JavaScript. Fully playable in the browser.",
    Previewlink: "./game/index.html",
    Githublink: "https://github.com/ezerahailu4-boop",
  },
];

const showCards = () => {
  let output = "";
  projects.forEach(({ title, cardImage, description, Previewlink, Githublink }) => {
    output += `
      <div class="column skill-card card" style="margin:15px" data-aos="zoom-in-up" data-aos-easing="linear" data-aos-delay="300" data-aos-duration="600">
        <div class="wrapper" style="background:url(${cardImage}) center/cover no-repeat;">
          <div class="header"></div>
          <div class="data">
            <div class="content">
              <div class="title-div">
                <h1 class="title"><a href="#">${title}</a></h1>
              </div>
              <ul class="menu-content"><br>
                <li>${description}</li>
                <li>
                  <a href="${Previewlink}" class="social-icon" aria-label="Live preview of ${title}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  </a>
                </li>
                <li>
                  <a href="${Githublink}" target="_blank" class="social-icon" aria-label="GitHub repo for ${title}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
  });
  projectcards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);
