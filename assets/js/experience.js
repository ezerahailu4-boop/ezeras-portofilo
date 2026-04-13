AOS.init();

// Work Experience Cards
const experiencecards = document.querySelector(".experience-cards");
const exp = [
  {
    title: "Full Stack Developer",
    cardImage: "assets/images/taf_energies_plc.png",
    place: "TAF Energies PLC",
    time: "Sep 2025 — Present",
    desp: "<li>Building and maintaining full-stack web applications for internal and client-facing platforms</li><li>Developing RESTful APIs with Node.js and Express, integrated with React front-ends</li><li>Collaborating with cross-functional teams to deliver scalable, production-ready features</li>",
  },
  {
    title: "Junior Front-End Developer",
    cardImage: "https://content.cnected.com/assets/bootstrap/employer.cnected.com/logo.png",
    place: "Cnect",
    time: "Jul 2024 — Jun 2025",
    desp: "<li>Developed and maintained responsive UI components using React and Tailwind CSS</li><li>Improved page load performance by 30% through code splitting and lazy loading</li><li>Worked closely with the design team to implement pixel-perfect interfaces from Figma mockups</li>",
  },
  {
    title: "Freelance Web Developer",
    cardImage: "assets/images/freelance.png",
    place: "Self-Employed",
    time: "Apr 2023 — Jul 2024",
    desp: "<li>Designed and built custom websites for small businesses across Ethiopia and the US</li><li>Delivered projects including a grocery store platform, a cosmetics store, and an event organizer site</li><li>Handled full project lifecycle: requirements gathering, design, development, and deployment</li>",
  },
];

const showCards2 = () => {
  let output = "";
  exp.forEach(
    ({ title, cardImage, place, time, desp }) =>
      (output += `
    <div class="col gaap" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="400">
      <div class="card card1">
        <img src="${cardImage}" class="featured-image" alt="${place} logo"/>
        <article class="card-body">
          <header>
            <div class="title">
              <h3>${title}</h3>
            </div>
            <p class="meta">
              <span class="pre-heading">${place}</span><br>
              <span class="author">${time}</span>
            </p>
            <ol>${desp}</ol>
          </header>
        </article>
      </div>
    </div>`)
  );
  experiencecards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards2);


// Open Projects / Freelance Work Cards
const volunteership = document.querySelector(".volunteership");
const volunteershipcards = [
  {
    title: "Grocery Store Website",
    cardImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop",
    description: "Built a full-featured online grocery store with product catalog, cart, and checkout for a client in Texas, USA.",
  },
  {
    title: "Cosmetics Store Website",
    cardImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    description: "Developed a modern e-commerce website for a cosmetics store based in Addis Ababa, Ethiopia.",
  },
  {
    title: "Event Organizer Website",
    cardImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    description: "Created a full-stack event management platform for an event organizer based in Addis Ababa, Ethiopia.",
  },
  {
    title: "Coffee Export Platform",
    cardImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop",
    description: "Built a B2B platform for Ethiopian coffee exporters to showcase products and connect with international buyers.",
  },
];

const showCards = () => {
  let output = "";
  volunteershipcards.forEach(
    ({ title, cardImage, description }) =>
      (output += `
      <div class="card volunteerCard" data-aos="fade-down" data-aos-easing="linear" data-aos-delay="100" data-aos-duration="600" style="height:550px;width:400px">
        <img src="${cardImage}" height="250" width="65" class="card-img" style="border-radius:10px" alt="${title}">
        <div class="content">
          <h2 class="volunteerTitle">${title}</h2><br>
          <p class="copy">${description}</p>
        </div>
      </div>`)
  );
  volunteership.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);


// Customer Reviews Slider
const hackathonsection = document.querySelector(".hackathon-section");
const mentor = [
  {
    title: "Abebe Girma",
    subtitle: "CEO — TAF Energies PLC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    desp: "Ezera delivered our internal dashboard ahead of schedule. His attention to detail and clean code made the handover seamless. A highly professional developer who communicates clearly throughout the project.",
  },
  {
    title: "Sarah Mitchell",
    subtitle: "Owner — Texas Grocery Co.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    desp: "Working with Ezera was a great experience. He built our online store from scratch and it looks amazing. Sales have increased significantly since launch. Highly recommend!",
  },
  {
    title: "Liya Tadesse",
    subtitle: "Founder — Addis Cosmetics",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    desp: "Ezera understood exactly what we needed and delivered a beautiful, fast website. Our customers love the new shopping experience. He is creative, reliable, and easy to work with.",
  },
  {
    title: "Daniel Bekele",
    subtitle: "Product Manager — Cnect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    desp: "Ezera was a strong contributor on our front-end team. He consistently wrote clean, maintainable React code and was always willing to help teammates. A real asset to any engineering team.",
  },
];

const showCards3 = () => {
  let output = "";
  mentor.forEach(
    ({ title, image, subtitle, desp }) =>
      (output += `
      <div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
          <img src="${image}" alt="${title}">
        </div>
        <div class="blog-slider__content">
          <div class="blog-slider__title">${title}</div>
          <span class="blog-slider__code">${subtitle}</span>
          <div class="blog-slider__text">${desp}</div>
        </div>
      </div>`)
  );
  hackathonsection.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards3);
