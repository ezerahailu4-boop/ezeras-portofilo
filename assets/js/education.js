AOS.init();

// MOOCs / Online Certifications Cards
const moocs = document.querySelector(".moocs");
const moocscards = [
  {
    title: "Developer & Technology Virtual Experience",
    cardImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png",
    moocLink: "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/xv8eSGu7nksKNiCQj_2sNmYuurxgpFYawco_69a6ba20c8f9da5081342c40_1772541204285_completion_certificate.pdf",
  },
  {
    title: "Developer & Technology Virtual Experience",
    cardImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png",
    moocLink: "https://www.theforage.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_69a6ba20c8f9da5081342c40_1772537008552_completion_certificate.pdf",
  },
  {
    title: "Software Engineering Virtual Experience",
    cardImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J_P_Morgan_Logo_2008_1.svg/2560px-J_P_Morgan_Logo_2008_1.svg.png",
    moocLink: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_69a6ba20c8f9da5081342c40_1772539516328_completion_certificate.pdf",
  },
];

const showCards = () => {
  let output = "";
  moocscards.forEach(({ title, cardImage, moocLink }) => {
    output += `
      <div class="col-6 col-md-3 col-sm-4 column" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="600">
        <div class="card mb-3 mx-auto">
          <div class="content">
            <div class="content-overlay"></div>
            <img src="${cardImage}" class="card-img-top content-image" alt="${title}">
            <div class="content-details fadeIn-bottom">
              <a href="${moocLink}" target="_blank"><i class="fa fa-external-link-alt fa-2x" style="color:white;"></i></a>
            </div>
          </div>
          <div class="card-body">
            <h6 class="mt-0 py-2 text-center font-weight-bold mooc-title" style="font-size:12px;">${title}</h6>
          </div>
        </div>
      </div>`;
  });
  moocs.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);
