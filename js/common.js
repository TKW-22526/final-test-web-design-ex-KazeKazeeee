const CATEGORY_META = {
  phones: { label: "Điện thoại", page: "phones.html", icon: "bi-phone" },
  laptops: { label: "Laptop", page: "laptops.html", icon: "bi-laptop" },
  tablets: { label: "Máy tính bảng", page: "tablets.html", icon: "bi-tablet" },
  headphones: {
    label: "Tai nghe",
    page: "headphones.html",
    icon: "bi-headphones",
  },
  chargers: {
    label: "Sạc & cáp",
    page: "chargers.html",
    icon: "bi-lightning-charge",
  },
  speakers: { label: "Loa", page: "speakers.html", icon: "bi-speaker" },
};

// index.html nằm ở thư mục gốc, các trang còn lại nằm trong thư mục html/.
const IS_HTML_PAGE = window.location.pathname
  .replaceAll("\\", "/")
  .includes("/html/");

function pageUrl(fileName) {
  return IS_HTML_PAGE ? fileName : `html/${fileName}`;
}

function rootUrl(path) {
  return IS_HTML_PAGE ? `../${path}` : path;
}

function assetUrl(path) {
  const isExternal = /^(https?:|data:|blob:|\/)/i.test(path);
  return isExternal ? path : rootUrl(path);
}

const money = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

const getCart = () =>
  JSON.parse(localStorage.getItem("phongtech_cart") || "[]");

const saveCart = (cart) => {
  localStorage.setItem("phongtech_cart", JSON.stringify(cart));
  updateCartCount();
};

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
  });
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find((item) => item.id === Number(productId));

  if (!product) {
    return;
  }

  const cart = getCart();
  const foundItem = cart.find((item) => item.id === product.id);

  if (foundItem) {
    foundItem.quantity = Math.min(
      foundItem.quantity + Number(quantity),
      product.stock,
    );
  } else {
    cart.push({
      id: product.id,
      quantity: Math.min(Number(quantity), product.stock),
    });
  }

  saveCart(cart);
  showToast(`Đã thêm “${product.name}” vào giỏ hàng.`);
}

function showToast(message) {
  let toastElement = document.getElementById("liveToast");

  if (!toastElement) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" class="toast border-0 shadow" role="alert">
            <div class="toast-header">
              <i class="bi bi-check-circle-fill text-success me-2"></i>
              <strong class="me-auto">PhongTech</strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Đóng"
              ></button>
            </div>
            <div class="toast-body"></div>
          </div>
        </div>
      `,
    );

    toastElement = document.getElementById("liveToast");
  }

  toastElement.querySelector(".toast-body").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

function productCard(product) {
  const discount =
    product.oldPrice > product.price
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : 0;

  const detailUrl = `${pageUrl("product.html")}?id=${product.id}`;

  return `
    <div class="col-6 col-md-4 col-xl-3">
      <article class="product-card h-100">
        <a
          class="product-image-wrap"
          href="${detailUrl}"
          aria-label="Xem ${product.name}"
        >
          <img
            src="${assetUrl(product.image)}"
            alt="${product.name}"
            class="product-image"
            loading="lazy"
          >
          ${
            product.badge
              ? `<span class="product-badge">${product.badge}</span>`
              : ""
          }
          ${discount ? `<span class="discount-badge">-${discount}%</span>` : ""}
        </a>

        <div class="p-3 d-flex flex-column h-100">
          <div class="small text-secondary mb-1">
            ${product.brand} · ${product.categoryLabel}
          </div>

          <h3 class="product-title">
            <a href="${detailUrl}">${product.name}</a>
          </h3>

          <p class="product-short d-none d-md-block">${product.short}</p>

          <div class="rating small mb-2">
            <i class="bi bi-star-fill"></i>
            ${product.rating}
            <span class="text-secondary">· Còn ${product.stock}</span>
          </div>

          <div class="mt-auto">
            <div class="price">${money(product.price)}</div>
            ${
              product.oldPrice
                ? `<div class="old-price">${money(product.oldPrice)}</div>`
                : ""
            }

            <div class="d-grid gap-2 mt-3">
              <button
                class="btn btn-brand btn-sm"
                onclick="addToCart(${product.id})"
              >
                <i class="bi bi-cart-plus me-1"></i>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderHeader() {
  const host = document.getElementById("site-header");

  if (!host) {
    return;
  }

  const categoryLinks = Object.values(CATEGORY_META)
    .map(
      (category) => `
        <li>
          <a class="dropdown-item" href="${pageUrl(category.page)}">
            <i class="bi ${category.icon} me-2"></i>
            ${category.label}
          </a>
        </li>
      `,
    )
    .join("");

  host.innerHTML = `
    <div class="topbar">
      <div class="container d-flex justify-content-between gap-3">
        <span>
          <i class="bi bi-geo-alt me-1"></i>
          Phường Trà Vinh, Vĩnh Long
        </span>
        <span>
          <i class="bi bi-telephone me-1"></i>
          0898 053 037
        </span>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top border-bottom shadow-sm">
      <div class="container">
        <a class="navbar-brand brand-logo" href="${rootUrl("index.html")}">
          <span class="brand-mark"><i class="bi bi-cpu"></i></span>
          <span>Phong<span>Tech</span></span>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Mở menu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <a class="nav-link" href="${rootUrl("index.html")}">Trang chủ</a>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                Sản phẩm
              </a>
              <ul class="dropdown-menu">${categoryLinks}</ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="${pageUrl("contact.html")}">Liên hệ</a>
            </li>
          </ul>

          <form
            id="navSearchForm"
            class="nav-search d-flex me-lg-3 mb-2 mb-lg-0"
            role="search"
          >
            <input
              id="navSearchInput"
              class="form-control"
              type="search"
              placeholder="Tìm sản phẩm..."
              aria-label="Tìm sản phẩm"
            >
            <button class="btn" type="submit" aria-label="Tìm kiếm">
              <i class="bi bi-search"></i>
            </button>
          </form>

          <div class="d-flex gap-2">
            <a
              class="btn btn-outline-brand"
              href="${pageUrl("login.html")}"
              aria-label="Tài khoản"
            >
              <i class="bi bi-person"></i>
            </a>

            <a
              class="btn btn-outline-brand position-relative"
              href="${pageUrl("cart.html")}"
              aria-label="Giỏ hàng"
            >
              <i class="bi bi-cart3"></i>
              <span data-cart-count class="cart-count">0</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;

  const form = document.getElementById("navSearchForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const keyword = document.getElementById("navSearchInput").value.trim();

    if (keyword) {
      window.location.href = `${pageUrl("phones.html")}?q=${encodeURIComponent(keyword)}&all=1`;
    }
  });
}

function renderFooter() {
  const host = document.getElementById("site-footer");

  if (!host) {
    return;
  }

  const categoryLinks = Object.values(CATEGORY_META)
    .map(
      (category) => `
        <li>
          <a href="${pageUrl(category.page)}">${category.label}</a>
        </li>
      `,
    )
    .join("");

  host.innerHTML = `
    <footer class="footer mt-5">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="brand-logo text-white mb-3">
              <span class="brand-mark"><i class="bi bi-cpu"></i></span>
              <span>Phong<span>Tech</span></span>
            </div>
            <p>
              PhongTech mang đến các thiết bị công nghệ phù hợp cho học tập,
              làm việc và giải trí với thông tin sản phẩm rõ ràng, dễ tham khảo.
            </p>
          </div>

          <div class="col-6 col-lg-2">
            <h6>Danh mục</h6>
            <ul class="list-unstyled">${categoryLinks}</ul>
          </div>

          <div class="col-6 col-lg-2">
            <h6>Hỗ trợ</h6>
            <ul class="list-unstyled">
              <li><a href="${pageUrl("cart.html")}">Giỏ hàng</a></li>
              <li><a href="${pageUrl("login.html")}">Tài khoản</a></li>
              <li><a href="${pageUrl("contact.html")}">Liên hệ</a></li>
            </ul>
          </div>

          <div class="col-lg-4">
            <h6>Thông tin cửa hàng</h6>
            <p class="mb-1">
              <i class="bi bi-geo-alt me-2"></i>
              Phường Trà Vinh, Vĩnh Long
            </p>
            <p class="mb-1">
              <i class="bi bi-telephone me-2"></i>
              0898 053 037
            </p>
            <p>
              <i class="bi bi-envelope me-2"></i>
              tienphongvong@gmail.com
            </p>
          </div>
        </div>

        <hr>

        <div class="d-flex flex-column flex-md-row justify-content-between small">
          <span>© 2026 PhongTech — Đồ án website bán thiết bị điện tử.</span>
          <span>Giá trên website là giá tham khảo phục vụ học tập.</span>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  updateCartCount();
});

window.addToCart = addToCart;
window.assetUrl = assetUrl;
window.getCart = getCart;
window.money = money;
window.pageUrl = pageUrl;
window.productCard = productCard;
window.rootUrl = rootUrl;
window.saveCart = saveCart;
window.showToast = showToast;
window.updateCartCount = updateCartCount;
