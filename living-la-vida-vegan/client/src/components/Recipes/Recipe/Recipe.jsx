import React, { useState, useEffect } from 'react';
import {
  readOneRecipe,
  addComment,
  destroyRecipe,
} from '../../../services/recipes';
import { readAllComments } from '../../../services/comments';
import { Link } from 'react-router-dom';
import './Recipe.css';
import { Button, ButtonToolbar } from 'react-bootstrap';
import DeleteRecipe from '../DeleteRecipe/DeleteRecipe';

export default function Recipe(props) {
  const [recipe, setRecipe] = useState('');
  const [commentId, setCommentId] = useState('');
  const [showDelete, setDelete] = useState(false);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    const recipe = await readOneRecipe(props.match.params.id);
    setRecipe(recipe);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCommentId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = await addComment(commentId, recipe.id);
    setRecipe(recipe);
  };

  const handleClose = () => {
    setDelete(false);
  };

  const handleShow = () => {
    setDelete(true);
  };

  return (
    <div>
      {props.recipes && (
        <>
          {props.recipes.map((rec) => (
            <div className='recipe-page'>
              <div className='recipe-details'>
                <img
                  src={rec.upload_photo}
                  alt='recipe-photo'
                  className='recipe-photo'
                />
                <Link to={`/recipes/${recipe.id}`}>
                  <h3>{rec.recipe_name}</h3>
                </Link>

                <p>{rec.description}</p>
                <div className='time-check'>
                  <div className='prep'>
                    <h5>Prep Time: </h5>
                    <h6 className='prep-times'>{rec.prep_time}</h6>
                  </div>
                  <div className='cook'>
                    <h5>Cook Time:</h5>
                    <h6 className='cook-times'>{rec.cook_time}</h6>
                  </div>
                </div>
              </div>

              <div className='ingredients'>
                <h4>Ingredients</h4>
                <p>{rec.ingredients}</p>
              </div>
              <div className='instructions'>
                <h4>Steps</h4>
                <p>{rec.instructions}</p>
              </div>
              <div>
                <a href={rec.source}>
                  <h6>view full recipe here</h6>
                </a>
              </div>
              {/* <div className='button-bar'> */}
              <ButtonToolbar>
                <Link to={`/recipes/${recipe.id}/edit`}>
                  <button
                    // onClick={() => handleClick(recipe.id)}
                    className='choice-button'
                  >
                    Edit
                  </button>
                </Link>
                <Link to={`/recipes/${recipe.id}`}>
                  <button
                    // onClick={() => handleClick(recipe.id)}
                    className='choice-button'
                  >
                    Save
                  </button>
                </Link>
                {/* </div> */}
                <Button variant='primary' onClick={handleShow}>
                  Delete
                </Button>
                <DeleteRecipe
                  {...props}
                  recipe={recipe}
                  show={showDelete}
                  onHide={handleClose}
                />
              </ButtonToolbar>
            </div>
          ))}

          <div className='comment-section'>
            <h3>Comments: </h3>
            <p>{/* {props.currentUser.username} */}: ohhh so yum</p>
            {/* <p>{comment.content}</p> */}
          </div>
        </>
      )}
    </div>
  );
}
