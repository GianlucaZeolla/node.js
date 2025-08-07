let token = "";

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/User/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById("loginMsg").textContent = "Login exitoso";
  } else {
    document.getElementById("loginMsg").textContent = data.message || "Error";
  }
});

document.getElementById("loadProducts").addEventListener("click", async function() {
  if (!token) {
    alert("Primero debes iniciar sesión");
    return;
  }
  const res = await fetch("/api/products", {
    headers: { "Authorization": "Bearer " + token }
  });
  const data = await res.json();
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  if (data.products) {
    data.products.forEach(prod => {
      productsDiv.innerHTML += `
        <div class="product">
          <h3>${prod.name}</h3>
          <p>${prod.description}</p>
          <p>Precio: $${prod.price}</p>
          <p>Categoría: ${prod.category}</p>
          ${prod.image ? `<img src="${prod.image}" alt="${prod.name}" width="100">` : ""}
        </div>
      `;
    });
  } else {
    productsDiv.textContent = "No se pudieron cargar los productos.";
  }
});