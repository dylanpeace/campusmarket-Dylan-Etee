const cards = document.querySelectorAll('.card');
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.querySelector('#search');
const emptyMessage = document.querySelector('#empty');
const quantityInput = document.querySelector('#quantity');
const quantityTotal = document.querySelector('#quantity-total');

if (searchInput) {
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
}

const registrationForm = document.querySelector('#registration-form');

if (registrationForm) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const confirmPasswordInput = document.querySelector('#confirm-password');
  const showPassword = document.querySelector('#show-password');
  const formMessage = document.querySelector('#form-message');

  showPassword.addEventListener('change', function () {
    const inputType = showPassword.checked ? 'text' : 'password';
    passwordInput.type = inputType;
    confirmPasswordInput.type = inputType;
  });

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const errors = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameInput.value.trim().length < 2) {
      errors.push('Please enter your name.');
    }

    if (!emailPattern.test(emailInput.value.trim())) {
      errors.push('Please enter a valid email address.');
    }

    if (passwordInput.value.length < 6) {
      errors.push('Your password must contain at least 6 characters.');
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      errors.push('Your passwords do not match.');
    }

    if (errors.length > 0) {
      formMessage.className = 'form-message form-message--error';
      formMessage.textContent = errors.join(' ');
    } else {
      formMessage.className = 'form-message form-message--success';
      formMessage.textContent = 'Registration successful! Welcome to CampusMarket.';
      registrationForm.reset();
      passwordInput.type = 'password';
      confirmPasswordInput.type = 'password';
    }
  });
}