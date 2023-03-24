import Form from "./intro-components/Form";
import "./intro.css";
import { FormContainer } from "./intro-components/FormContainer";

export default function Intro({ startQuiz, setUserChoices }) {
  const handleStart = function (options) {
    setUserChoices(options);
    startQuiz();
  };

  return (
    <FormContainer
      title="Totally Quizzical"
      subHeading="A rad way to put your knowledge to the test!"
    >
      <Form startQuiz={(options) => handleStart(options)} />
    </FormContainer>
  );
}
