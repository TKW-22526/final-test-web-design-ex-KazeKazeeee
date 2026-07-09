document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(
    localStorage.getItem("phongtech_user") || "null",
  );

  if (currentUser) {
    document.getElementById("userStatus").innerHTML = `
      <div class="alert alert-success">
        <i class="bi bi-person-check me-2"></i>
        Bạn đang đăng nhập mô phỏng với tài khoản
        <strong>${currentUser.email}</strong>.
        <button id="logoutBtn" class="btn btn-sm btn-outline-success ms-2">
          Đăng xuất
        </button>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("phongtech_user");
      window.location.reload();
    });
  }

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = event.target.loginEmail.value.trim();
    const password = event.target.loginPassword.value;

    if (!email || password.length < 6) {
      showToast("Vui lòng nhập email và mật khẩu từ 6 ký tự.");
      return;
    }

    localStorage.setItem("phongtech_user", JSON.stringify({ email }));
    showToast("Đăng nhập mô phỏng thành công.");

    window.setTimeout(() => {
      window.location.href = rootUrl("index.html");
    }, 700);
  });

  document
    .getElementById("registerForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      if (formData.get("password") !== formData.get("confirmPassword")) {
        showToast("Mật khẩu xác nhận chưa khớp.");
        return;
      }

      localStorage.setItem(
        "phongtech_user",
        JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
        }),
      );

      showToast("Tạo tài khoản mô phỏng thành công.");

      window.setTimeout(() => {
        window.location.href = rootUrl("index.html");
      }, 700);
    });
});
