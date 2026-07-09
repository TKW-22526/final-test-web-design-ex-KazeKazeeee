document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document
    .getElementById("checkoutForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      if (!event.target.checkValidity()) {
        event.stopPropagation();
        event.target.classList.add("was-validated");
        return;
      }

      localStorage.removeItem("phongtech_cart");

      bootstrap.Modal.getInstance(
        document.getElementById("checkoutModal"),
      ).hide();

      showToast(
        "Đặt hàng demo thành công. Không có giao dịch thật được thực hiện.",
      );

      renderCart();
      updateCartCount();
      event.target.reset();
    });
});

function renderCart() {
  const cart = getCart();
  const cartRows = cart
    .map((item) => ({
      ...item,
      product: PRODUCTS.find((product) => product.id === item.id),
    }))
    .filter((item) => item.product);

  const cartHost = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");

  if (!cartRows.length) {
    cartHost.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-cart-x"></i>
        <h2>Giỏ hàng đang trống</h2>
        <p>Hãy thêm vài sản phẩm phù hợp với bạn.</p>
        <a href="${rootUrl("index.html")}" class="btn btn-brand">
          Tiếp tục mua sắm
        </a>
      </div>
    `;

    cartSummary.classList.add("d-none");
    return;
  }

  cartSummary.classList.remove("d-none");

  cartHost.innerHTML = cartRows
    .map(
      ({ product, quantity }) => `
        <div class="cart-item">
          <img src="${assetUrl(product.image)}" alt="${product.name}">

          <div class="cart-info">
            <a
              href="${pageUrl("product.html")}?id=${product.id}"
              class="fw-bold"
            >
              ${product.name}
            </a>
            <div class="small text-secondary">
              ${product.brand} · ${product.categoryLabel}
            </div>
            <div class="price mt-1">${money(product.price)}</div>
          </div>

          <div class="cart-actions">
            <div class="input-group input-group-sm qty-group">
              <button
                class="btn btn-outline-secondary"
                onclick="changeQty(${product.id}, -1)"
                aria-label="Giảm số lượng"
              >
                −
              </button>
              <input
                class="form-control text-center"
                value="${quantity}"
                aria-label="Số lượng"
                readonly
              >
              <button
                class="btn btn-outline-secondary"
                onclick="changeQty(${product.id}, 1)"
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>

            <button
              class="btn btn-link text-danger p-0"
              onclick="removeItem(${product.id})"
            >
              <i class="bi bi-trash"></i>
              Xóa
            </button>
          </div>
        </div>
      `,
    )
    .join("");

  const subtotal = cartRows.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("shipping").textContent = "Miễn phí";
  document.getElementById("total").textContent = money(subtotal);
}

function changeQty(id, change) {
  const cart = getCart();
  const cartItem = cart.find((item) => item.id === id);
  const product = PRODUCTS.find((item) => item.id === id);

  if (!cartItem || !product) {
    return;
  }

  cartItem.quantity = Math.max(
    1,
    Math.min(product.stock, cartItem.quantity + change),
  );

  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  const remainingItems = getCart().filter((item) => item.id !== id);
  saveCart(remainingItems);
  renderCart();
}

window.changeQty = changeQty;
window.removeItem = removeItem;
