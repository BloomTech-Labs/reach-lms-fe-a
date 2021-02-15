import React from 'react';

//name of program
//type k-12 or higher training other
// description

function CreateProgramForm() {
  const onSumbit = evt => {
    {
    }
  };

  const onInputChange = evt => {
    {
    }
  };

  return (
    <form className="programForm" onSubmit={{}}>
      <label>
        <h3>Name of Program</h3>
        <input value={{}} onChange={{}} name="Name" type="text" />
      </label>

      <label>
        <h3>Type of Program</h3>
        <select onChange={{}} value={{}} name="type">
          <option value="">- Select A Type -</option>
          <option value="K">-K-</option>
          <option value="1st">-1st Grade-</option>
          <option value="2nd">-2nd Grade-</option>
          <option value="3rd">-3rd Grade-</option>
          <option value="4th">-4th Grade-</option>
          <option value="5th">-5th Grade-</option>
          <option value="6th">-6th Grade-</option>
          <option value="7th">-7th Grade-</option>
          <option value="8th">-8th Grade-</option>
          <option value="9th">-9th Grade-</option>
          <option value="10th">-10th Grade-</option>
          <option value="11th">-11th Grade-</option>
          <option value="12th">-12th Grade-</option>
          <option value="higher">-Higher-</option>
          <option value="training">-Training-</option>
          <option value="other">-Other-</option>
        </select>
      </label>

      <label>
        <h3>Description</h3>
      </label>
      <textarea
        name="description"
        id="description"
        type="text"
        onChange={{}}
        value={{}}
      />
      <br />
      <button disabled={{}}>Submit</button>
    </form>
  );
}

export default CreateProgramForm;
