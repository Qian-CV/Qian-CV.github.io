const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

function paginate(items, pagination) {
  const perPage = 5;
  let currentPage = 1;

  function updateItemPage() {
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));
    const firstItem = (currentPage - 1) * perPage;
    const lastItem = firstItem + perPage;

    items.forEach((item, index) => {
      item.classList.toggle("is-hidden", index < firstItem || index >= lastItem);
    });

    pagination?.querySelectorAll("button").forEach((button) => {
      const page = Number(button.dataset.page);
      button.classList.toggle("active", page === currentPage);
      button.setAttribute("aria-current", page === currentPage ? "page" : "false");
    });
  }

  if (pagination && items.length > perPage) {
    const totalPages = Math.ceil(items.length / perPage);

    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.page = page;
      button.textContent = page;
      button.setAttribute("aria-label", `Page ${page}`);
      button.addEventListener("click", () => {
        currentPage = page;
        updateItemPage();
      });
      pagination.append(button);
    }

    updateItemPage();
  } else if (pagination) {
    pagination.hidden = true;
  }
}

paginate(document.querySelectorAll(".timeline article"), document.querySelector("#news .pagination"));
paginate(document.querySelectorAll(".publication"), document.querySelector('[aria-label="Publication pages"]'));
