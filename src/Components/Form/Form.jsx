import { useState,useEffect} from 'react'
import './Form.css'

const Form = () => {
  const [formValues, setFormValues] = useState(
    {
      name: "",
      email: "",
      password: "",
    }
  );

const [skills, setSkills] = useState([]);
const [active, setActive] = useState(false);
const [header, setHeader] = useState(
  "Try it free 7 days than ₹180/mo. thereafter"
);

const handleInputChange = (event) => {
  setFormValues({ ...formValues, [event.target.name]: event.target.value})
};

const handleSkillsChange = (event) => {
  const selectedSkill = event.target.value;
  event.target.value = "";
  event.target.setCustomValidity("");
  if (selectedSkill && !skills.includes(selectedSkill)) {
    setSkills((prevSkills) => [...prevSkills, selectedSkill]);
  }
};
const handleRemoveSkill = (skillToRemove) => {
  setSkills((prevSkills) =>
    prevSkills.filter((skill) => skill !== skillToRemove)
  );
};

const isFormSubmit = () => {
  if (
    formValues.name.trim() &&
    formValues.email.trim() &&
    formValues.password &&
    skills.length > 0
  ) {
    return true;
  } else {
    if (skills.length === 0){
      document
        .getElementById("formSelect")
        .setCustomValidity("Please select an item in the list")
      document.getElementById("formSelect").reportValidity();
    }
    return false;
  }
};

const claimTrial = (event) => {
  event.preventDefault();
  if (!isFormSubmit()) {
    return;
  }
  setHeader("You have successfully subscribed to our plan")
  setFormValues({name: "", email: "", password: ""});
  setSkills([]);
  setActive(false)
};

useEffect(() => {
  setActive(skills.length > 0 && isFormSubmit());
}, [skills, formValues])

  return (

    <div className="form">
      <div className="formHeader">{header} </div>
      <form className="formBody" onSubmit={claimTrial}>
        
         <input 
          type="text" 
          name='name' id='name' autoComplete='off' 
          placeholder='Name'
          value={formValues.name}
          onChange= {handleInputChange}
          required 
          />
          <input
          type="text" 
          name='email' id='email' autoComplete='off' 
          placeholder='Email Address'
          value={formValues.email}
          onChange= {handleInputChange}
          required
          />
          <input
          type="password" 
          name='password' id='password' autoComplete='off'
          placeholder='Password' 
          value={formValues.password}
          onChange= {handleInputChange}
          required
          />
          <select 
            id="formSelect"
            name="skills" 
            className="formSelect"
            onChange={handleSkillsChange}
          >
            <option value="">Choose your skills</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JS">JS</option>
          </select>
        
          {skills && (
          <div className="skills">
            {skills.map((skill) => {
              return (
                <div key={skill} className="skillTag">
                  {skill} &nbsp;
                  <span onClick={() => handleRemoveSkill(skill)}>X</span>
                </div>
              );
            })}
          </div>
        )}

        <button 
          type='submit'
          className={`formButton ${active ? 'formButtonActive' : ''}`}
        >
          CLAIM YOUR FREE TRIAL
        </button>

        <div className="disclaimer">
          By clicking the button you are agreeing to our{" "}
          <span style={{ color: "red",backgroundColor: "white" }}>Terms and Services</span>
        </div>
      </form>
      </div>
    
  )
}
export default Form;