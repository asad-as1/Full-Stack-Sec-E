const searchInput = document.getElementById('searchInput');
const recipesContainer = document.getElementById('recipesContainer');


let allRecipes = [];

async function fetchR() {
    try {
        recipesContainer.innerHTML = '<div class="loading">Loading recipes...</div>';
        const response = await fetch('https://dummyjson.com/recipes');
        
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        
        const data = await response.json();
        allRecipes = data.recipes;
        renderRecipes(allRecipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = `
            <div class="error">
                Failed to load recipes. 
                <br>Please check your internet connection and try again.
            </div>
        `;
    }
}

// Function to render recipes
function renderRecipes(recipes) {
    recipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<div class="error">No recipes found.</div>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        recipeCard.innerHTML = `
            <div class="recipe-header">${recipe.name}</div>
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            
            <div class="recipe-section">
                <h3>Ingredients:</h3>
                <ul class="recipe-ingredients">
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-section recipe-instructions-section">
                <h3>Instructions:</h3>
                <ol class="recipe-instructions">
                    ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
                </ol>
            </div>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });
}

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    const filteredRecipes = allRecipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm)
    );
    
    renderRecipes(filteredRecipes);
});

fetchR();