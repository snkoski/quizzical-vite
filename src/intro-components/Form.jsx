import './form.css'

// This is a beefy component
// Might want to break each input into its own component(mimic a custom ui-library/start building your own ui-library)
// input values change here so you should probably try to handle the change here
export default function Form({ number, handleChange }) {
  return (
    <form className="form-container">
      <div className="form-item">
        <label htmlFor="number">Number of questions:</label>
        <input
          type="number"
          id="number"
          name="number"
          placeholder="5"
          value={number}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="difficulty">Select difficulty level:</label>
        <select id="difficulty" name="difficulty" onChange={handleChange}>
          {/* <option value="">Any Difficulty</option>//value is empty - may produce a bug? */}
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="form-item">
        <label htmlFor="category">Select quiz category:</label>
        <select id="category" name="category" onChange={handleChange}>
          {/* Move all these options into an array you can map over. This will help reduce the business of the component */}
          <option value="">All Categories</option>
          <option value="9">General Knowlege</option>
          <option value="10">Books</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science & Computers</option>
          <option value="19">Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="28">Vehicles</option>
        </select>
      </div>
      <div>
        <div className="form-item checkbox-div">
          <label htmlFor="timed" className="checkbox-container" >Timed quiz:
            <input
              id="timed"
              name="timed"
              type="checkbox"
              onChange={handleChange} //called in Intro
              defaultChecked
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    </form>
  );
}