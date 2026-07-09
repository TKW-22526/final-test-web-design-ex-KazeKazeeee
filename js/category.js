document.addEventListener("DOMContentLoaded", () => {
  const pageCategory = document.body.dataset.category || "phones";
  const params = new URLSearchParams(location.search);
  const allMode = params.get("all") === "1";
  let products = allMode
    ? [...PRODUCTS]
    : PRODUCTS.filter((p) => p.category === pageCategory);
  const title = allMode
    ? "Kết quả tìm kiếm"
    : CATEGORY_META[pageCategory].label;
  document.getElementById("categoryTitle").textContent = title;
  document.getElementById("categorySubtitle").textContent = allMode
    ? "Tìm trong toàn bộ sản phẩm PhongTech"
    : `Khám phá ${products.length} sản phẩm ${title.toLowerCase()} chính hãng.`;

  const brandSelect = document.getElementById("brandFilter");
  [...new Set(products.map((p) => p.brand))]
    .sort()
    .forEach((brand) =>
      brandSelect.insertAdjacentHTML(
        "beforeend",
        `<option value="${brand}">${brand}</option>`,
      ),
    );
  const searchInput = document.getElementById("productSearch");
  searchInput.value = params.get("q") || "";

  function render() {
    const q = searchInput.value.trim().toLowerCase();
    const brand = brandSelect.value;
    const maxPrice = Number(document.getElementById("priceFilter").value || 0);
    const sort = document.getElementById("sortFilter").value;
    let list = products.filter(
      (p) =>
        (!q || `${p.name} ${p.brand} ${p.short}`.toLowerCase().includes(q)) &&
        (!brand || p.brand === brand) &&
        (!maxPrice || p.price <= maxPrice),
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "name")
      list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    document.getElementById("resultCount").textContent =
      `${list.length} sản phẩm`;
    document.getElementById("productGrid").innerHTML = list.length
      ? list.map(productCard).join("")
      : `<div class="col-12"><div class="empty-state"><i class="bi bi-search"></i><h3>Không tìm thấy sản phẩm</h3><p>Hãy thử từ khóa hoặc bộ lọc khác.</p></div></div>`;
  }
  ["input", "change"].forEach((evt) => {
    searchInput.addEventListener(evt, render);
    brandSelect.addEventListener(evt, render);
    document.getElementById("priceFilter").addEventListener(evt, render);
    document.getElementById("sortFilter").addEventListener(evt, render);
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    brandSelect.value = "";
    document.getElementById("priceFilter").value = "0";
    document.getElementById("sortFilter").value = "featured";
    render();
  });
  render();
});
