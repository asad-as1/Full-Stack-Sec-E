const searchInput = document.getElementById("searchInput");
const recipesContainer = document.getElementById("recipesContainer");

let allData = [];

async function fetchR() {
  try {
    recipesContainer.innerHTML = '<div class="loading">Loading poli...</div>';
    const response = await fetch(
      "https://www.freetestapi.com/api/v1/politicians"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch poli");
    }

    const data = await response?.json();
    allData = data;
    // console.log(allData);
    renderPoli(allData);
  } catch (error) {
    console.error("Error fetching poli:", error);
    recipesContainer.innerHTML = `
            <div class="error">
                Failed to load poli. 
                <br>Please check your internet connection and try again.
            </div>
        `;
  }
}

function showDetail(recipe) {
    console.log(recipe)
    // recipesContainer.innerHTML = `
    //   <div class="detail-card">
    //     <img src="${recipe?.image}" alt="${recipe.name}" class="detail-image">
    //     <h2>${recipe.name}</h2>
    //     <p><strong>Position:</strong> ${recipe.position}</p>
    //     <p><strong>Biography:</strong> ${recipe.biography}</p>
    //     <p><strong>Party:</strong> ${recipe.party}</p>
    //     <p><strong>Country:</strong> ${recipe.country}</p>
    //   </div>
    // `;
  }

// Function to render poli
function renderPoli(poli) {
  recipesContainer.innerHTML = "";

  if (poli.length === 0) {
    recipesContainer.innerHTML = '<div class="error">No poli found.</div>';
    return;
  }

  poli.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
            <div onClick=showDetail()>
                <img src="${recipe.image}"  alt="${recipe.name}" class="recipe-image">
            
                <div class="recipe-section">
                   <h2>${recipe.name}</h2>
                   <p>${recipe.position}</p>
                   <p>${recipe.biography}</p>
                </div>

               <div>
                  <button class="btn2 btn-primary" onclick="fetchR()">${recipe.party}</button>
                  <button class="btn2 btn-primary" onclick="fetchR()">${recipe.country}</button>
              </div>
            </div>
        `;
    recipesContainer.appendChild(recipeCard);
  });
}

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();

  const filteredRecipes = allData.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm)
  );

  renderPoli(filteredRecipes);
});

recipesContainer.addEventListener("click", function (event) {

  // const recipeCard = event.target;
  // recipesContainer.appendChild(event.target)
  console.log(event.target)
})

fetchR();
