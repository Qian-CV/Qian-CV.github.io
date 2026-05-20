const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const publications = document.querySelectorAll(".publication");
const pagination = document.querySelector(".pagination");
const publicationsPerPage = 5;
let currentPage = 1;

function updatePublicationPage() {
  const totalPages = Math.max(1, Math.ceil(publications.length / publicationsPerPage));
  const firstPublication = (currentPage - 1) * publicationsPerPage;
  const lastPublication = firstPublication + publicationsPerPage;

  publications.forEach((publication, index) => {
    publication.classList.toggle("is-hidden", index < firstPublication || index >= lastPublication);
  });

  pagination?.querySelectorAll("button").forEach((button) => {
    const page = Number(button.dataset.page);
    button.classList.toggle("active", page === currentPage);
    button.setAttribute("aria-current", page === currentPage ? "page" : "false");
  });
}

if (pagination && publications.length > publicationsPerPage) {
  const totalPages = Math.ceil(publications.length / publicationsPerPage);

  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.page = page;
    button.textContent = page;
    button.setAttribute("aria-label", `Page ${page}`);
    button.addEventListener("click", () => {
      currentPage = page;
      updatePublicationPage();
    });
    pagination.append(button);
  }

  updatePublicationPage();
} else if (pagination) {
  pagination.hidden = true;
}
