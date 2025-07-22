// JavaScript for Fresheat homepage interactivity will go here. 

// Menu Filtering
const categoryButtons = document.querySelectorAll('.menu-cat-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from all buttons
    categoryButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    menuItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}); 

// Modal Popup Logic
const modal = document.getElementById('modal-popup');
const modalImg = modal.querySelector('.modal-img');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const modalPrice = modal.querySelector('.modal-price');
const modalClose = modal.querySelector('.modal-close');

// Open modal for menu items
menuItems.forEach(item => {
  item.addEventListener('click', function(e) {
    // Prevent link click inside
    if (e.target.tagName === 'A') return;
    const img = item.querySelector('img');
    const title = item.querySelector('h3');
    const desc = item.querySelector('p');
    const price = item.querySelector('.menu-price');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = title ? title.textContent : '';
    modalDesc.textContent = desc ? desc.textContent : '';
    modalPrice.textContent = price ? price.textContent : '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// Open modal for gallery images
const galleryImages = document.querySelectorAll('.gallery-grid img');
galleryImages.forEach(img => {
  img.addEventListener('click', function() {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = '';
    modalDesc.textContent = img.alt;
    modalPrice.textContent = '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// Enhanced Order Now Modal Logic
const orderNowButtons = document.querySelectorAll('.btn[data-order]');

orderNowButtons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const dish = btn.getAttribute('data-order');
    modalImg.style.display = 'none'; // Hide image for order modal
    modalTitle.textContent = dish;
    modalDesc.innerHTML = `<form id='order-form' style='margin-top:1em;'>
      <input type='text' name='name' placeholder='Your Name' required style='margin:0.5em; padding:0.7em; border-radius:8px; border:1px solid #ccc; width:220px;'><br>
      <input type='email' name='email' placeholder='Your Email' required style='margin:0.5em; padding:0.7em; border-radius:8px; border:1px solid #ccc; width:220px;'><br>
      <input type='number' name='qty' min='1' max='20' value='1' required style='margin:0.5em; padding:0.7em; border-radius:8px; border:1px solid #ccc; width:220px;'><br>
      <div style='display:inline-block; margin:0.5em;'>
        <input type='time' name='time' required style='padding:0.7em; border-radius:8px; border:1px solid #ccc; width:120px;'>
        <select name='ampm' required style='padding:0.7em; border-radius:8px; border:1px solid #ccc; width:90px; margin-left:0.5em;'>
          <option value='AM'>AM</option>
          <option value='PM'>PM</option>
        </select>
      </div><br>
      <button type='submit' class='btn btn-primary' style='margin:0.5em;'>Place Order</button>
    </form>`;
    modalPrice.textContent = '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Handle order form submit
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.onsubmit = function(ev) {
        ev.preventDefault();
        modalDesc.innerHTML = `<span style='color:var(--primary-color);font-weight:600;'>Thank you for your order!</span>`;
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }, 1500);
      };
    }
  });
});

// Close modal function
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
}); 

// Hamburger menu toggle for mobile navigation
const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const navOverlay = document.querySelector('.nav-overlay');

function openNav() {
  mainNav.style.display = 'flex';
  setTimeout(() => {
    mainNav.style.transform = 'translateX(0)';
    if (navOverlay) navOverlay.classList.add('active');
  }, 10);
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  mainNav.style.transform = 'translateX(100%)';
  if (navOverlay) navOverlay.classList.remove('active');
  setTimeout(() => {
    mainNav.style.display = 'none';
  }, 350);
  document.body.style.overflow = '';
}
function toggleNav() {
  if (mainNav.style.display === 'block') {
    closeNav();
  } else {
    openNav();
  }
}
if (hamburger && mainNav) {
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    toggleNav();
  });
  // Close nav when a link is clicked (on mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 700) closeNav();
    });
  });
  // Close nav on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.style.display === 'block') closeNav();
  });
} 

// Stat Counter Animation with Intersection Observer
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

function animateStats() {
  statNumbers.forEach(stat => {
    const updateCount = () => {
      const target = +stat.getAttribute('data-target');
      const count = +stat.innerText;
      const increment = Math.ceil(target / 40); // Faster increment
      if (count < target) {
        stat.innerText = count + increment > target ? target : count + increment;
        setTimeout(updateCount, 10); // Faster update
      } else {
        stat.innerText = target;
      }
    };
    updateCount();
  });
}

if ('IntersectionObserver' in window && statsSection) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
        observer.unobserve(statsSection);
      }
    });
  }, { threshold: 0.5 }); // Start when about half is visible
  observer.observe(statsSection);
} else {
  // Fallback: animate immediately
  animateStats();
} 

// Cart functionality for Fresheat
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(item, qty) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.name === item.name);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    item.qty = qty;
    cart.push(item);
  }
  setCart(cart);
}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.shop-card .add-to-cart-shop').forEach((btn, i) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = btn.closest('.shop-card');
      const name = card.querySelector('h3').textContent.trim();
      const price = parseInt(card.querySelector('span').textContent.replace(/[^\d]/g, ''));
      const img = card.querySelector('img').getAttribute('src');
      const qtyInput = card.querySelector('.shop-qty-input');
      const qty = Math.max(1, parseInt(qtyInput.value) || 1);
      addToCart({ name, price, img }, qty);
      btn.textContent = 'Added!';
      setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1000);
      // Optionally redirect to cart.html:
      // window.location.href = 'cart.html';
    });
  });
}); 