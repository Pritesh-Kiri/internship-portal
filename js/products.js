const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;

    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
Load Category Products
=============
 */
const categoryCenter = document.querySelector(".category__center");
const viewallbtn = document.querySelector("#view-all");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
});

const displayProductItems = (items) => {
  let displayProduct = items.slice(0, 8).map(
    (product) => ` 
    <div class="internship-card">
    <div class="i-info">
      <div class="i-header">
        <div class="company">
          <h4>${product.title}</h4>
          <p>${product.company}</p>
        </div>
        <div class="company-logo">
          <img
            src="${product.image}"
            alt=""
          />
        </div>
      </div>
      <div class="i-details">
        <div class="location">
          <h4>Type:</h4>
          <p>${product.type}</p>
        </div>
        <div class="other-details">
          <div class="start-date">
            <h4>Start Date</h4>
            <p>${product.joining}</p>
          </div>
          <div class="duration">
            <h4>Duration</h4>
            <p>${product.duration}</p>
          </div>
          <div class="stipend">
            <h4>Stipend</h4>
            <p>${product.stipend}</p>
          </div>
          <div class="apply-by">
            <h4>Apply by</h4>
            <p>${product.apply_by}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <p>${product.internship_info}</p>
      <a href="${product.apply_link}" target="_blank"> Apply now </a>
    </div>
  </div>
                  `
  );

  displayProduct = displayProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
view all
=============
 */

const viewBtn = document.querySelector("#viewme");
const viewBtn2 = document.querySelector("#viewme2");
//

viewBtn.addEventListener("click", async function () {
  viewBtn.style.display = "none";
  viewBtn2.style.display = "block";

  const products = await getProducts();
  displayAllProductItems(products);
});

viewBtn2.addEventListener("click", async function () {
  viewBtn.style.display = "block";
  viewBtn2.style.display = "none";

  const products = await getProducts();
  displayProductItems(products);
});
const displayAllProductItems = (items) => {
  let displayAllProduct = items.map(
    (product) => `

    <div class="internship-card">
    <div class="i-info">
      <div class="i-header">
        <div class="company">
          <h4>${product.title}</h4>
          <p>${product.company}</p>
        </div>
        <div class="company-logo">
          <img
            src="${product.image}"
            alt=""
          />
        </div>
      </div>
      <div class="i-details">
        <div class="location">
          <h4>Type:</h4>
          <p>${product.type}</p>
        </div>
        <div class="other-details">
          <div class="start-date">
            <h4>Start Date</h4>
            <p>${product.joining}</p>
          </div>
          <div class="duration">
            <h4>Duration</h4>
            <p>${product.duration}</p>
          </div>
          <div class="stipend">
            <h4>Stipend</h4>
            <p>${product.stipend}</p>
          </div>
          <div class="apply-by">
            <h4>Apply by</h4>
            <p>${product.apply_by}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <p>${product.internship_info}</p>
      <a href="${product.apply_link}" target="_blank"> Apply now </a>
    </div>
  </div>
                  `
  );

  displayAllProduct = displayAllProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayAllProduct;
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          viewBtn.style.display = "none";
          return product;
        }
      });

      if (id === "All") {
        displayProductItems(products);
        viewBtn.style.display = "block";
      } else {
        displayAllProductItems(menuCategory);
      }
    }
  });
}

/*
=============
Product Details Left
=============
 */
