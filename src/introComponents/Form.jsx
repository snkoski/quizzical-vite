export default function Form({ number, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="number">Number of questions:</label>
      <input
        type="number"
        id="number"
        name="number"
        placeholder="5"
        value={number}
        onChange={handleChange}
      />
      <label htmlFor="difficulty">Difficulty level:</label>
      <select id="difficulty" name="difficulty">
        {/* <option value="">Any Difficulty</option>//value is empty - may produce a bug */}
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}