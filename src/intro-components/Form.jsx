import React from "react";
import "./form.css";
import { NumberInput } from "./inputs/NumberInput";
import { categories } from "../consts.js";
import { SelectInput } from "./inputs/SelectInput";
import { CheckboxInput } from "./inputs/CheckboxInput.jsx";

const difficulties = [
  { value: "", label: "AnyDifficulty" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

// Quiz options will reset each time the Intro page is rendered
export default function Form({ startQuiz }) {
  const [numberOfQuestions, setNumberOfQuestions] = React.useState(2);
  const [difficulty, setDifficulty] = React.useState(difficulties[0].value);
  const [category, setCategory] = React.useState(categories[0].value);
  const [timed, setTimed] = React.useState(true);

  return (
    <form
      className="form-container"
      onSubmit={(event) => {
        event.preventDefault();
        const options = {
          numberOfQuestions,
          difficulty,
          category,
          timed,
        };
        startQuiz(options);
      }}
    >
      <NumberInput
        name="number"
        label="Number of questions:"
        value={numberOfQuestions}
        setValue={setNumberOfQuestions}
      />
      <SelectInput
        name="difficulty"
        label="Select difficulty level:"
        options={difficulties}
        value={difficulty}
        setValue={setDifficulty}
      />
      <SelectInput
        name="categories"
        label="Select quiz category:"
        options={categories}
        value={category}
        setValue={setCategory}
      />
      <CheckboxInput
        name="timed"
        label="Timed quiz:"
        value={timed}
        setChecked={setTimed}
      />
      <button className="start-button" type="submit">
        Start quiz
      </button>
    </form>
  );
}
