import React from 'react';
import axios from 'axios';
import Question from '../src/components/Question';

function questions({ questions }) {
  return (
    <>
      <Question questions={questions} />
    </>
  );
}

export default questions;
export async function getServerSideProps(cx) {
  const { amount, category, difficulty } = cx.query;
  console.log(amount, category, difficulty);
  const res = await axios.get(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const questions = res.data.results;
  return {
    props: {
      questions,
    },
  };
}
