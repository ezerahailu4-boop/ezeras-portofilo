AOS.init();

const projectcards = document.querySelector(".projectcards");

const projects = [
  {
    title: "Nelliy's Rewards Platform",
    cardImage: "assets/images/projects/nelliy-rewards.png",
    description: "Ethiopia's premier coffee loyalty platform with QR point redemption, Anthropic Claude AI receipt OCR, and interactive store locator.",
    tags: ["Next.js", "TypeScript", "Claude AI", "Prisma", "Tailwind"],
    Previewlink: "https://nelliys-reward-web.vercel.app",
    liveDomain: "nelliys-reward-web.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/nelliys-reward-web",
    repoName: "ezerahailu4-boop/nelliys-reward-web",
  },
  {
    title: "ApexBet Sportsbook Platform",
    cardImage: "assets/images/projects/sportsbook.png",
    description: "Production-grade sportsbook web application featuring live match odds feeds, interactive dynamic bet slips, and modular wagering architecture.",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Zustand", "Tailwind"],
    Previewlink: "https://sportsbook-swart.vercel.app",
    liveDomain: "sportsbook-swart.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/sportsbook",
    repoName: "ezerahailu4-boop/sportsbook",
  },
  {
    title: "SOTEN Industries Corporate Portal",
    cardImage: "assets/images/projects/soten.png",
    description: "Official corporate manufacturing portal for SOTEN Industries (YETAF Holdings) showcasing TMT deformed rebars and industrial vessel engineering.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Lucide", "Tailwind"],
    Previewlink: "https://soten.vercel.app",
    liveDomain: "soten.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/soten",
    repoName: "ezerahailu4-boop/soten",
  },
  {
    title: "ParkAddis Smart Parking",
    cardImage: "assets/images/projects/parking.png",
    description: "Automated parking management system with real-time space tracking, QR ticketing, and occupancy analytics charts.",
    tags: ["Next.js", "TypeScript", "Prisma", "Recharts", "QR Code"],
    Previewlink: "https://parking-management-system-five.vercel.app",
    liveDomain: "parking-management-system-five.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/parking-management-system",
    repoName: "ezerahailu4-boop/parking-management-system",
  },
  {
    title: "WashOS — Car Wash ERP",
    cardImage: "assets/images/projects/carwash.png",
    description: "Car wash ERP and operations system with service queue tracking, inventory auto-deduction, and automated PDF invoicing.",
    tags: ["Next.js 15", "TypeScript", "Supabase", "Recharts", "jsPDF"],
    Previewlink: "https://car-wash-management-system-five.vercel.app",
    liveDomain: "car-wash-management-system-five.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/car-wash-management-system",
    repoName: "ezerahailu4-boop/car-wash-management-system",
  },
  {
    title: "TAF Energies DocTrack",
    cardImage: "assets/images/projects/doctrack.png",
    description: "Enterprise inbound document workflow system replacing paper registries with digital scanning, approval routing, and cloud storage.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "Prisma", "Radix UI"],
    Previewlink: "https://taf-document-sender.vercel.app",
    liveDomain: "taf-document-sender.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/document-sender",
    repoName: "ezerahailu4-boop/document-sender",
  },
  {
    title: "Nelly Global Venture",
    cardImage: "assets/images/projects/nelliy-global.png",
    description: "Full-stack venture marketing portal featuring interactive 3D elements, motion choreography, and partnership contact APIs.",
    tags: ["React 19", "TypeScript", "Three.js", "Express", "Vite"],
    Previewlink: "https://nelliy-global-venture.vercel.app",
    liveDomain: "nelliy-global-venture.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/Nelliy-global-venture",
    repoName: "ezerahailu4-boop/Nelliy-global-venture",
  },
  {
    title: "Nova HR & Hiring Bot",
    cardImage: "assets/images/projects/nova-hr.png",
    description: "Complete recruitment platform combining a multi-step Telegram Mini App job application bot with an administrative screening dashboard.",
    tags: ["Next.js", "TypeScript", "Supabase", "Telegram Mini App"],
    Previewlink: "https://nova-hr-employee.vercel.app",
    liveDomain: "nova-hr-employee.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/nova-hr-employee-",
    repoName: "ezerahailu4-boop/nova-hr-employee-",
  },
  {
    title: "Birhan Coffee Exporters",
    cardImage: "assets/images/projects/birhan-coffee.png",
    description: "B2B web platform showcasing Ethiopian single-origin specialty coffees, cupping scores, origin stories, and direct export inquiries.",
    tags: ["React", "React Router", "Tailwind CSS", "JavaScript"],
    Previewlink: "https://birhan-coffee-lwgv.vercel.app",
    liveDomain: "birhan-coffee-lwgv.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/birhan_coffee-",
    repoName: "ezerahailu4-boop/birhan_coffee-",
  },
  {
    title: "TAF Energies Survey Analytics",
    cardImage: "assets/images/projects/taf-survey.png",
    description: "Real-time employee survey and satisfaction analytics platform with dynamic question flows and aggregated response charts.",
    tags: ["React", "Chart.js", "Node.js", "Express"],
    Previewlink: "https://taf-survey.vercel.app",
    liveDomain: "taf-survey.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/TAF-Energies-Employee-Satisfaction-Form",
    repoName: "ezerahailu4-boop/TAF-Energies-Employee-Satisfaction-Form",
  },
  {
    title: "Tana Grocery Store",
    cardImage: "assets/images/projects/tana-grocery.png",
    description: "Online grocery store with full product catalog, shopping cart, interactive checkout UI, and responsive customer interface.",
    tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce"],
    Previewlink: "https://tana-grocery-store.vercel.app",
    liveDomain: "tana-grocery-store.vercel.app",
    Githublink: "https://github.com/ezerahailu4-boop/tana-grocery-store",
    repoName: "ezerahailu4-boop/tana-grocery-store",
  },
  {
    title: "Classic Canvas Snake Game",
    cardImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    description: "Retro arcade snake game built with HTML5 Canvas API and JavaScript, featuring smooth 60fps rendering and score tracking.",
    tags: ["HTML5 Canvas", "Vanilla JS", "Retro Arcade"],
    Previewlink: "./game/index.html",
    liveDomain: "ezera.tech/game",
    Githublink: "https://github.com/ezerahailu4-boop/ezeras-portofilo",
    repoName: "ezerahailu4-boop/ezeras-portofilo",
  },
];

const showCards = () => {
  let output = "";
  projects.forEach(({ title, cardImage, description, tags, Previewlink, liveDomain, Githublink, repoName }) => {
    const tagHtml = (tags || []).map(t => `<span class="card-tech-tag">${t}</span>`).join("");
    const isLocalGame = Previewlink.startsWith("./");

    output += `
      <div class="column skill-card card" style="margin:15px;" data-aos="zoom-in-up" data-aos-easing="linear" data-aos-delay="200" data-aos-duration="500">
        <div class="modern-project-card">
          <div class="card-img-container">
            <img src="${cardImage}" alt="${title} preview screenshot" class="real-project-img" loading="lazy" />
            <div class="live-status-badge">
              <span class="pulse-dot"></span> ${isLocalGame ? 'Playable' : 'Live on Vercel'}
            </div>
          </div>
          
          <div class="card-body-content">
            <h3 class="card-project-title">${title}</h3>
            
            <div class="card-tech-tags">
              ${tagHtml}
            </div>
            
            <p class="card-project-desc">${description}</p>
            
            <div class="card-direct-links">
              <a href="${Previewlink}" target="_blank" rel="noopener noreferrer" class="direct-link live-link" title="Visit Live Website">
                <i class="fas fa-globe"></i> <span>${liveDomain}</span>
              </a>
              <a href="${Githublink}" target="_blank" rel="noopener noreferrer" class="direct-link repo-link" title="View Source Code on GitHub">
                <i class="fab fa-github"></i> <span>${repoName}</span>
              </a>
            </div>
            
            <div class="card-action-buttons">
              <a href="${Previewlink}" target="_blank" rel="noopener noreferrer" class="action-btn btn-live-demo">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
              <a href="${Githublink}" target="_blank" rel="noopener noreferrer" class="action-btn btn-github-repo">
                <i class="fab fa-github"></i> GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </div>`;
  });
  projectcards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);
