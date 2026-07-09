document.addEventListener("DOMContentLoaded", () => {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const product = PRODUCTS.find((item) => item.id === id) || PRODUCTS[0];

  document.title = `${product.name} | PhongTech`;

  document.getElementById("productBreadcrumb").innerHTML = `
    <a href="${rootUrl("index.html")}">Trang chủ</a>
    <span>/</span>
    <a href="${pageUrl(CATEGORY_META[product.category].page)}">
      ${product.categoryLabel}
    </a>
    <span>/</span>
    <strong>${product.name}</strong>
  `;

  document.getElementById("productDetail").innerHTML = `
    <div class="row g-5 align-items-start">
      <div class="col-lg-6">
        <div class="detail-image-box">
          <img src="${assetUrl(product.image)}" alt="${product.name}">
        </div>
      </div>

      <div class="col-lg-6">
        <span class="section-kicker">
          ${product.brand} · ${product.categoryLabel}
        </span>

        <h1 class="display-6 fw-bold mt-2">${product.name}</h1>

        <div class="rating my-3">
          <i class="bi bi-star-fill"></i>
          ${product.rating}
          <span class="text-secondary ms-2">
            Còn ${product.stock} sản phẩm
          </span>
        </div>

        <p class="lead text-secondary">${product.description}</p>

        <div class="detail-price">${money(product.price)}</div>
        <div class="old-price fs-6">${money(product.oldPrice)}</div>

        <div class="alert alert-info border-0 mt-3">
          <i class="bi bi-info-circle me-2"></i>
          Giá tham khảo dùng cho website demo, có thể thay đổi theo thời điểm.
        </div>

        <div class="d-flex align-items-center gap-3 my-4">
          <label class="fw-semibold" for="qty">Số lượng</label>
          <input
            id="qty"
            type="number"
            min="1"
            max="${product.stock}"
            value="1"
            class="form-control qty-input"
          >
        </div>

        <div class="d-grid d-sm-flex gap-3">
          <button id="addDetailCart" class="btn btn-brand btn-lg flex-grow-1">
            <i class="bi bi-cart-plus me-2"></i>
            Thêm vào giỏ
          </button>
          <a href="${pageUrl("cart.html")}" class="btn btn-outline-brand btn-lg">
            Xem giỏ hàng
          </a>
        </div>

        <div class="service-grid mt-4">
          <div>
            <i class="bi bi-truck"></i>
            <span>Giao hàng mô phỏng</span>
          </div>
          <div>
            <i class="bi bi-shield-check"></i>
            <span>Sản phẩm chính hãng</span>
          </div>
          <div>
            <i class="bi bi-arrow-repeat"></i>
            <span>Đổi trả theo chính sách</span>
          </div>
        </div>
      </div>
    </div>

    <section class="mt-5">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Thông tin kỹ thuật</span>
          <h2>Thông số nổi bật</h2>
        </div>
      </div>

      <div class="spec-table">
        ${Object.entries(product.specs)
          .map(
            ([key, value]) => `
              <div class="spec-row">
                <strong>${key}</strong>
                <span>${value}</span>
              </div>
            `,
          )
          .join("")}
      </div>

      <p class="small text-secondary mt-3">
        Nguồn tham khảo sản phẩm:
        <a href="${product.source}" target="_blank" rel="noopener">
          trang nhà sản xuất / trang sản phẩm
        </a>.
      </p>
    </section>
  `;

  document.getElementById("addDetailCart").addEventListener("click", () => {
    const quantity = Number(document.getElementById("qty").value);
    addToCart(product.id, quantity);
  });

  const relatedProducts = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, 4);

  document.getElementById("relatedProducts").innerHTML = relatedProducts
    .map(productCard)
    .join("");
});
