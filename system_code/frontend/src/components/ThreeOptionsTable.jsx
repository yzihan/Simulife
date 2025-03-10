import React, { useState } from 'react';
import "../assets/css/story.css";

const ThreeOptionsTable = (props) => {
  const [checkedOption, setCheckedOption] = useState(undefined);

  const handleOptionChange = (e) => {
    setCheckedOption(e.target.value);
  };

    // when user make a choice for options, continue sending prompt to gpt
    const chooseOption = (e) => {
        e.preventDefault();
        let option = "";
        if(checkedOption === "Option 1"){
          option = document.querySelector(`label[for="Option 1"]`).innerText;
        }else if(checkedOption === "Option 2"){
          option = document.querySelector(`label[for="Option 2"]`).innerText;
        }else if(checkedOption === "Option 3"){
          option = document.querySelector(`label[for="Option 3"]`).innerText;
        }else{
          alert('Choose a option');
          return;
        }

        props.continueOptions(option);
    }

    return (
      <div className='option-table'>

        <form className="radio-options" onSubmit={chooseOption}>
          <div className='option-table-heading-block'>
            <span className='option-table-headng'>{props.question}</span>
          </div>
          

          <label className="radio-option" htmlFor='Option 1'>
            <input
              type="radio"
              name="options"
              value="Option 1"
              id = "Option 1"
              checked={checkedOption === 'Option 1'}
              onChange={handleOptionChange}
            />
            {props.option_1}
          </label>

          <label className="radio-option" htmlFor='Option 2'>
            <input
              type="radio"
              name="options"
              value="Option 2"
              id = "Option 2"
              checked={checkedOption === 'Option 2'}
              onChange={handleOptionChange}
            />
            {props.option_2}
          </label>

          <label className="radio-option" htmlFor='Option 3'>
            <input
              type="radio"
              name="options"
              value="Option 3"
              id = "Option 3"
              checked={checkedOption === 'Option 3'}
              onChange={handleOptionChange}
            />
            {props.option_3}
          </label>
          <button type="submit">Next</button>
        </form>

      </div>
    );
  }

export default ThreeOptionsTable;