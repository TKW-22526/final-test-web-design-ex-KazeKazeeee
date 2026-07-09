document.addEventListener("DOMContentLoaded", () => {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  document.getElementById("featuredProducts").innerHTML = featured
    .map(productCard)
    .join("");
  const deals = [...PRODUCTS]
    .sort(
      (a, b) =>
        (b.oldPrice - b.price) / (b.oldPrice || b.price) -
        (a.oldPrice - a.price) / (a.oldPrice || a.price),
    )
    .slice(0, 4);
  document.getElementById("dealProducts").innerHTML = deals
    .map(productCard)
    .join("");
});
