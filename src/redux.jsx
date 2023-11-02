import React from 'react';
import { useNavigate } from 'react-router-dom';

const Redux = () => {
  const navigate = useNavigate();

  const handleOnClick = () => navigate(-1);

  return (
    <article>
      <h2>Redux</h2>
      <button onClick={handleOnClick}>
        Wróć do poprzedniej strony
      </button>
    </article>
  );
};

export default Redux;