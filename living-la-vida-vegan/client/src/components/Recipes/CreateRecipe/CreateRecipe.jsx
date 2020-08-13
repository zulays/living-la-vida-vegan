import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { postRecipe } from '../../../services/recipes';

export default function CreateRecipe(props) {
  const [recipeInput, setRecipeInput] = useState({
    uploadPhoto: '',
    recipeName: '',
    description: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    stepsInstructions: '',
    source: '',
  });

  // const [clicked, setClicked] = useState({
  //   clicked: false,
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeInput({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = await postRecipe(recipeInput);
    // props.setCurrentUser(userData);
    props.history.push('/');
  };

  // const handleClick = () => {
  //   setClicked(!clicked);
  // };

  return (
    <div>
      <form className='add-recipe' onSubmit={handleSubmit}>
        <h3>Add a Recipe</h3>
        <input
          type='text'
          name='upload-photo'
          value={recipeInput.uploadPhoto}
          onChange={handleChange}
          placeholder='Upload a Photo'
        />
        <input
          type='text'
          name='recipe-name'
          value={recipeInput.recipeName}
          onChange={handleChange}
          placeholder='Recipe Name'
        />
        <input
          type='text'
          name='description'
          value={recipeInput.description}
          onChange={handleChange}
          placeholder='Description'
        />
        <input
          type='text'
          name='prep-time'
          value={recipeInput.prepTime}
          onChange={handleChange}
          placeholder='Prep Time'
        />
        <input
          type='text'
          name='cook-time'
          value={recipeInput.cookTime}
          onChange={handleChange}
          placeholder='Cook Time'
        />
        <input
          type='text'
          name='ingredients'
          value={recipeInput.ingredients}
          onChange={handleChange}
          placeholder='Ingredients'
        />
        <input
          type='text'
          name='steps-instructions'
          value={recipeInput.stepsInstructions}
          onChange={handleChange}
          placeholder='Steps/Instructions'
        />
        <input
          type='text'
          name='source'
          value={recipeInput.source}
          onChange={handleChange}
          placeholder='Source'
        />
        {/* <Link to={`/recipes/${id}`}> */}
        <button>Save</button>
        {/* </Link> */}
      </form>
    </div>
  );
}
