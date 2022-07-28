import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/app.css"
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext()
const LOCAL_SORAGE_KEY = 'react_testing.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecepies)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_SORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))

  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_SORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }
 
  function handleRecipeAdd(){
    const newRecipe ={
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients:[
        {id: uuidv4(),
         name: "",
         amount: ""}
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  
  }

  function handleRecipeChange(id, recipe){
    const newRecipes= [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id){
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}

    </RecipeContext.Provider>
  )

}


const sampleRecepies = [
  {
    id: 1,
    name: 'Salads',
    servings: 3,
    cookTime: '0:20',
    instructions: "1.Put salads in the bowl\n2.Add tomatoes, cucumbers, chesse, olives, radishes\n3.Add salad dressing and mix together\n4.Put on the plate and serve.",
    ingredients:[
      {
        id: 1,
        name: 'Lettis',
        amount: '200 garams'
      },
      {
        id: 2,
        name: 'Tomatoes',
        amount: '10 garams'
      }
    ]
  },
  {
    id: 2,
    name: 'Soup',
    servings: 10,
    cookTime: '1:20',
    instructions: "1.Chop potatoes, carots, onions\n2.Fry chopt vegetables in the pot\n3.Add water and bulion cube in to the pot with vegetables and bolil\n4.Put in the bowl and serve.",
    ingredients:[
      {
        id: 1,
        name: 'Potatoes',
        amount: '200 garams'
      },
      {
        id: 2,
        name: 'Carrots',
        amount: '100 garams'
      }

    ]
  }
]
export default App;
