import React, {useState} from "react";

const ThoughtsPanel = (props) => { 
    const [thought, setThought] = useState('');
    const handleThoughtAreaChange = (event) => {
        setThought(event.target.value);
    };


    const generateImg = (e) => {
        e.preventDefault();
        if(!thought){
            alert("Type something to generate image!");
            return ;
        }
        props.reGenerateImgs(thought);
    }


    return (
        <div className="thoughts-panel">
            <div className="thoughts-panel-header">Your thoughts:</div>
            <form className="thoughts-panel-form" onSubmit={generateImg}>
                <textarea className="thoughts-panel-content" placeholder="Your thoughts..." onChange={handleThoughtAreaChange}></textarea>
                <div className="thoughts-panel-btns">
                    <button type="submit" className="thoughts-panel-generate">Re-Generate</button>
                    <button className="thoughts-panel-done" onClick={props.doneThoughts}>Done</button>
                </div>
            </form>
        </div>
    );

}

export default ThoughtsPanel;