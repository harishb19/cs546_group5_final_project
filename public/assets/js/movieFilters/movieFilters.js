const resetFilterMovies = () => {
  console.log("resetChala!!!!");
  localStorage.removeItem("movieFilter");
  document.getElementById("resetBtn").classList.add("hidden");
  document.getElementById("applyBtn").classList.add("hidden");
  window.location = "/movies";
};
const applyFilters = () => {
  let filter = localStorage.getItem("movieFilter");
  if (filter) {
    const form = document.createElement("form");
    const filters = document.createElement("input");
    form.method = "POST";
    form.action = "/movies";

    filters.value = JSON.stringify(filter);
    filters.type = "hidden";
    filters.name = "filters";
    form.appendChild(filters);

    document.body.appendChild(form);

    form.submit();
  }
};
const handelDefaultFilters = () => {
  let filter = localStorage.getItem("movieFilter");
  if (filter) {
    filter = JSON.parse(filter);
    filter.language.forEach((lan) => {
      console.log(`lang-${lan}`);
      let doc = document.getElementById(`lang-${lan}`);
      console.log(doc);

      if (doc) {
        doc.setAttribute("checked", true);
      }
    });
    filter.genre.forEach((gen) => {
      let doc = document.getElementById(`genre-${gen}`);
      if (doc) {
        doc.setAttribute("checked", true);
      }
    });
  }
};

function filterMovies(key, value) {
  key = key.toLowerCase();
  let filter = localStorage.getItem("movieFilter");
  let resetBtn = document.getElementById("resetBtn");
  let applyBtn = document.getElementById("applyBtn");
  if (resetBtn) {
    resetBtn.classList.remove("hidden");
  }
  if (applyBtn) {
    applyBtn.classList.remove("hidden");
  }
  if (!filter) {
    filter = { language: [], genre: [] };
    filter[key].push(value);
    localStorage.setItem("movieFilter", JSON.stringify(filter));
  } else {
    filter = JSON.parse(filter);
    if (!filter[key].includes(value)) {
      filter[key].push(value);
    } else {
      filter[key] = filter[key].filter(function (item, index, arr) {
        return item != value;
      });
    }
  }
  localStorage.setItem("movieFilter", JSON.stringify(filter));
  console.log({ ...filter });
}
