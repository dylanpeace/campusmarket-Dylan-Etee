const cards = document.querySelectorAll('.card');
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.querySelector('#search');
const emptyMessage = document.querySelector('#empty');
const quantityInput = document.querySelector('#quantity');
const quantityTotal = document.querySelector('#quantity-total');

let activeCategory = 'all';

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleProducts = 0;

  for (const card of cards) {
    const category = card.dataset.category.split(' ');
    const productName = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-desc').textContent.toLowerCase();
    const matchesSearch = productName.includes(searchTerm) || description.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || category.includes(activeCategory);

    if (matchesSearch && matchesCategory) {
      card.hidden = false;
      visibleProducts++;
    } else {
      card.hidden = true;
    }
  }

  if (visibleProducts === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }
}

function updateQuantityTotal() {
  let quantity = Number(quantityInput.value);

  if (!Number.isFinite(quantity) || quantity < 1) {
    quantity = 1;
    quantityInput.value = 1;
  } else {
    quantity = Math.floor(quantity);
    quantityInput.value = quantity;
  }

  const total = 600 * quantity;
  quantityTotal.textContent = `KSh ${total.toLocaleString()}`;
}

searchInput.addEventListener('input', filterProducts);

for (const button of filterButtons) {
  button.addEventListener('click', function () {
    activeCategory = button.dataset.filter;

    for (const filterButton of filterButtons) {
      filterButton.setAttribute('aria-pressed', filterButton === button);
    }

    filterProducts();
  });
}

quantityInput.addEventListener('input', updateQuantityTotal);

filterProducts();
updateQuantityTotal();