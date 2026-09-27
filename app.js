const productCatalog = [
  {
    id: 'calculator',
    name: 'Casio scientific calculator',
    categories: ['accessories'],
    price: 600,
    description: 'Comes with its hard cover. Keys and display work as they should.',
    seller: 'Atharva Gokhale',
    emoji: '🧮',
    alt: 'Casio scientific calculator with its protective case and working display',
    accent: '#4a4f57'
  },
  {
    id: 'lab-coat',
    name: 'Lab coat',
    categories: ['accessories'],
    price: 160,
    description: 'Navy half-sleeve lab coat, washed and ready for practicals.',
    seller: 'Janhavi',
    emoji: '🥼',
    alt: 'Navy lab coat prepared for laboratory practicals',
    accent: '#2a3a63'
  },
  {
    id: 'roller-scale-15',
    name: 'Roller scale – 15 cm',
    categories: ['accessories', 'eg'],
    price: 19,
    description: 'Clear roller scale for drawing parallel lines. Light scratches, still accurate.',
    seller: 'Yash',
    emoji: '📏',
    alt: '15 centimetre roller scale used for engineering drawings',
    accent: '#4a4f57'
  },
  {
    id: 'engineering-graphics-kit',
    name: 'Tools for engineering graphics (set)',
    categories: ['accessories', 'eg'],
    price: 235,
    description: 'Set squares, protractor and scale in one kit for first-year graphics.',
    seller: 'Yash',
    emoji: '📐',
    alt: 'Engineering graphics tools set with protractor and set squares',
    accent: '#6b5546'
  },
  {
    id: 'maped-rounder',
    name: 'Maped mechanical rounder for engineering graphics',
    categories: ['accessories', 'eg'],
    price: 70,
    description: 'Maped compass set in its case, for circles and arcs on drawing sheets.',
    seller: 'Yash',
    emoji: '🧭',
    alt: 'Maped mechanical rounder compass set for engineering graphics',
    accent: '#4f5a44'
  },
  {
    id: 'roller-scale-30',
    name: 'Roller scale – 15 cm',
    categories: ['accessories', 'eg'],
    price: 30,
    description: 'Barely used, with clear markings and a smooth roll.',
    seller: 'Yash',
    emoji: '📏',
    alt: 'Nearly new 15 centimetre roller scale for precise drawing',
    accent: '#4a4f57'
  },
  {
    id: 'engineering-maths',
    name: 'Engineering Mathematics – Vol. 1',
    categories: ['books'],
    price: 250,
    description: 'First-year textbook with a few pencil notes in the margins. No missing pages.',
    seller: 'Sneha',
    emoji: '📘',
    alt: 'Engineering Mathematics textbook volume one for first-year students',
    accent: '#6b5546'
  },
  {
    id: 'physics-notes',
    name: 'Physics unit 2 handwritten notes',
    categories: ['notes'],
    price: 40,
    description: 'Neat, topic-wise notes with solved numericals. Good for exam week.',
    seller: 'Kabir',
    emoji: '📝',
    alt: 'Handwritten Physics unit two notes with solved numerical problems',
    accent: '#2a3a63'
  },
  {
    id: 'drawing-board',
    name: 'Drawing board – A3',
    categories: ['eg'],
    price: 180,
    description: 'A3 drawing board with a smooth surface and a straight edge. Clips included.',
    seller: 'Sneha',
    emoji: '📋',
    alt: 'A3 drawing board used for engineering graphics work',
    accent: '#4f5a44'
  }
];

const galleryState = {
  index: 0,
  filteredProducts: []
};

function createProductSvg(product) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${product.accent}" />
          <stop offset="100%" stop-color="#1b1b1b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)"/>
      <circle cx="960" cy="180" r="120" fill="rgba(255,255,255,0.12)"/>
      <circle cx="260" cy="720" r="180" fill="rgba(255,255,255,0.08)"/>
      <text x="600" y="460" text-anchor="middle" font-size="220" dominant-baseline="middle">${product.emoji}</text>
      <text x="600" y="700" text-anchor="middle" font-size="62" fill="#f5f5f5" font-family="Arial, sans-serif" font-weight="700">${product.name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getProductById(productId) {
  return productCatalog.find((product) => product.id === productId) || null;
}

function updateGallery(visibleProducts) {
  const galleryImage = document.querySelector('#gallery-image');
  const galleryCaption = document.querySelector('#gallery-caption');
  const galleryStatus = document.querySelector('#gallery-status');

  if (!galleryImage || !galleryCaption || !galleryStatus) {
    return;
  }

  galleryState.filteredProducts = visibleProducts;

  if (!visibleProducts.length) {
    galleryImage.src = createProductSvg({
      name: 'No matching products',
      emoji: '🔎',
      accent: '#1d1d1d',
      alt: 'No products match the current filter selection'
    });
    galleryImage.alt = 'No products match the current filter selection';
    galleryCaption.textContent = 'No matching products in this filter.';
    galleryStatus.textContent = '0 / 0';
    return;
  }

  if (galleryState.index >= visibleProducts.length) {
    galleryState.index = 0;
  }

  const selectedProduct = visibleProducts[galleryState.index];
  galleryImage.src = createProductSvg(selectedProduct);
  galleryImage.alt = selectedProduct.alt;
  galleryCaption.textContent = `${selectedProduct.name} — KSh ${selectedProduct.price.toLocaleString()}`;
  galleryStatus.textContent = `${galleryState.index + 1} / ${visibleProducts.length}`;
}

const cards = document.querySelectorAll('.card');
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.querySelector('#search');
const emptyMessage = document.querySelector('#empty');
const quantityInput = document.querySelector('#quantity');
const quantityTotal = document.querySelector('#quantity-total');
const quantityMessage = document.querySelector('#quantity-message');
const galleryPrevious = document.querySelector('#gallery-prev');
const galleryNext = document.querySelector('#gallery-next');

function getVisibleProducts() {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

  return productCatalog.filter((product) => {
    const productName = product.name.toLowerCase();
    const productDescription = product.description.toLowerCase();
    const matchesSearch = !searchTerm || productName.includes(searchTerm) || productDescription.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || product.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });
}

let activeCategory = 'all';

function filterProducts() {
  const visibleProducts = getVisibleProducts();

  for (const card of cards) {
    const productId = card.dataset.productId;
    const matchingProduct = getProductById(productId);
    const shouldShow = matchingProduct ? visibleProducts.some((product) => product.id === productId) : false;
    card.hidden = !shouldShow;
  }

  if (emptyMessage) {
    emptyMessage.hidden = visibleProducts.length !== 0;
  }

  updateGallery(visibleProducts);
}

if (searchInput) {
  searchInput.addEventListener('input', filterProducts);

  for (const button of filterButtons) {
    button.addEventListener('click', function () {
      activeCategory = button.dataset.filter;

      for (const filterButton of filterButtons) {
        filterButton.setAttribute('aria-pressed', String(filterButton === button));
      }

      filterProducts();
    });
  }

  filterProducts();
}

if (galleryPrevious && galleryNext) {
  galleryPrevious.addEventListener('click', function () {
    if (!galleryState.filteredProducts.length) {
      return;
    }

    galleryState.index = (galleryState.index - 1 + galleryState.filteredProducts.length) % galleryState.filteredProducts.length;
    updateGallery(galleryState.filteredProducts);
  });

  galleryNext.addEventListener('click', function () {
    if (!galleryState.filteredProducts.length) {
      return;
    }

    galleryState.index = (galleryState.index + 1) % galleryState.filteredProducts.length;
    updateGallery(galleryState.filteredProducts);
  });
}

function updateQuantityTotal() {
  if (!quantityInput || !quantityTotal) {
    return;
  }

  const rawValue = quantityInput.value.trim();

  if (rawValue === '') {
    quantityTotal.textContent = 'KSh 0';
    if (quantityMessage) {
      quantityMessage.textContent = 'Quantity is required.';
      quantityMessage.classList.add('is-visible');
    }
    return;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0 || !Number.isInteger(parsedValue)) {
    quantityTotal.textContent = 'KSh 0';
    if (quantityMessage) {
      quantityMessage.textContent = 'Quantity must be a positive whole number.';
      quantityMessage.classList.add('is-visible');
    }
    return;
  }

  if (quantityMessage) {
    quantityMessage.textContent = '';
    quantityMessage.classList.remove('is-visible');
  }

  const total = 600 * parsedValue;
  quantityTotal.textContent = `KSh ${total.toLocaleString()}`;
}

if (quantityInput) {
  quantityInput.addEventListener('input', updateQuantityTotal);
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

  if (showPassword) {
    showPassword.addEventListener('change', function () {
      const inputType = showPassword.checked ? 'text' : 'password';
      passwordInput.type = inputType;
      confirmPasswordInput.type = inputType;
    });
  }

  function setFormMessage(message, type) {
    if (!formMessage) {
      return;
    }

    formMessage.textContent = message;
    formMessage.classList.add('is-visible');
    formMessage.classList.remove('form-message--error', 'form-message--success');

    if (type === 'error') {
      formMessage.classList.add('form-message--error');
    } else if (type === 'success') {
      formMessage.classList.add('form-message--success');
    }
  }

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const errors = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (name.length === 0) {
      errors.push('Name is required.');
    }

    if (!emailPattern.test(email)) {
      errors.push('Email must contain an @ symbol.');
    }

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters.');
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      errors.push('Password must contain both letters and numbers.');
    }

    if (password !== confirmPassword) {
      errors.push('Passwords do not match.');
    }

    if (errors.length > 0) {
      setFormMessage(errors.join(' '), 'error');
      return;
    }

    setFormMessage('Registration successful! Welcome to CampusMarket.', 'success');
    registrationForm.classList.remove('success-animation');
    void registrationForm.offsetWidth;
    registrationForm.classList.add('success-animation');
    registrationForm.reset();
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
  });
}