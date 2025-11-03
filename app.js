let parts = [];

// Fetch JSON and display all parts
fetch('components.json')
  .then(res => res.json())
  .then(data => {
    parts = data;
    showParts(parts);
  });

// Display parts on the page
function showParts(list) {
  document.getElementById('components').innerHTML = list.map(p => `
    <div class="componentCard">
    <img src="${p.image}" alt="${p.model}">
      <h3>${p.model}</h3>
      <p>Brand: ${p.brand} | ${p.manufacturer}</p>
      <p>Part: ${p.type}</p>
      <p>Price: ${p.price}</p>
    </div>
  `).join('');
}

// Filter when typing in the search box
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Search parts
document.querySelector('input[type="text"]').addEventListener('input', e => {
  const q = normalize(e.target.value);
  const filtered = parts.filter(p =>
    normalize(p.model).includes(q) ||
    normalize(p.brand).includes(q) ||
    normalize(p.manufacturer).includes(q) ||
    normalize(p.type).includes(q) ||
    normalize(p.tag.join(' ')).includes(q)
  );
  showParts(filtered);
});

function toggleFilterMenu(event) {
  event.stopPropagation(); // stop event from reaching document click
  document.getElementById("filterMenu").classList.toggle("show");
}


// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("filterMenu");
  const button = document.getElementById("filterButton");

  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.remove("show");
  }
});

// Handle filter clicks
document.getElementById("filterMenu").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const type = e.target.dataset.type;
    filterParts(type); // call your filter function
    document.getElementById("filterMenu").classList.remove("show");
  }
});

function filterParts(type) {
  if (type === "all") {
    showParts(parts);
  } else {
    showParts(parts.filter((p) => p.type === type));
  }
}

