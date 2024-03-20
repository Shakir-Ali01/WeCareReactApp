import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../component/Header';
import Footer from '../component/Footer';
const CoachLogin=()=>{
  let navigate = useNavigate();
  const[coachInfo, setCoachInfo]=useState({
    coachId: "",
    name: "",
    gender: "",
    number:"",
    speciality:"",
    dob:""
});
  const[data,setData] = useState({
    coachId: "",
    password:""
  });
  const[messages]=useState({
     "MANDATAROY":"Enter all the from fields",
     "ERROR":"Something went Wrong",
     "IDVALUE_ERROR":"Coach Id should Not Be Null",
     "PASSWORDVALUE_ERROR":"Password should have 5 to 10 characters",
     "WRONG_CREDENTIAL":"Enter Correct Credentials"
  })
  const[formErrors, setFormErrors]=useState({
    coachIdError:"",
    passwordError:"",
    wrongCredentialError:""
  });
  const[mandatory, setMandatory]=useState(false);
  const handleChange=(event)=>{
    setMandatory(false);
    let errors=formErrors;
    let passwordRegex=/^[a-zA-Z]{5,10}$/;
    let {name, value}=event.target;
    setData({...data,[name]:value})
    switch (name) {
      case "password":
        if(!passwordRegex.test(value))
        {
          errors.passwordError=messages.PASSWORDVALUE_ERROR;
        }else{
            errors.passwordError="";
        }
        break;
        case "coachId":
          if(value==="")
          {
            errors.coachIdError=messages.IDVALUE_ERROR;
          }else{
              errors.coachIdError="";
          }
          break;
      default:
         break;
    setFormErrors(errors)
  }
}
  const handleSubmit=(e)=>{
    e.preventDefault();
    if((data.coachId==="" || data.password===""))
    {
      setMandatory(true);
    }else{
      axios.get("http://localhost:8090/wecare/coachLogin/"+data.coachId+"/"+data.password)
      .then((res)=>{
        if(res.data===null)
        {
          formErrors.wrongCredentialError=messages.WRONG_CREDENTIAL;
        }else{
          setCoachInfo(res.data)
          localStorage.setItem('coachName', JSON.stringify(res.data.name));
          //set value into local storage
          localStorage.setItem('coachId', JSON.stringify(res.data.id))
          localStorage.setItem('number', JSON.stringify(res.data.number))
          localStorage.setItem('gender', JSON.stringify(res.data.gender))
          localStorage.setItem('dob', JSON.stringify(res.data.dob))
          localStorage.setItem('speciality', JSON.stringify(res.data.speciality))
          navigate("/coachdashboard");
          //console.log(res.data.isTester);
          //getting value from local storage
          //console.log(JSON.parse(localStorage.getItem('user')));

        }
      })
      .catch((err)=>{

      })
    }
  }

  return <>
  <Header/>
  <div className="container">
     <div className="row  h-100 justify-content-center align-items-center">
         <div className="col-md-3">
           <div className="card bg-dark" style={{marginTop:'43%'}}>
               <div className="card-body">
                 <div className="pt-3">
                    <p className="card-title  text-light m-0" style={{fontSize:'20px'}}><span>
                       <img className="coachsignup-img text-center" src="cl.png" /></span>
                       &nbsp;&nbsp;&nbsp;Login As Life Coach
                    </p>
                </div>
                // Form Start
                <form className="row g-3" onSubmit={(event)=>{handleSubmit(event)}}>
                    <div className="col-md-12">
                         <input type="text"value={data.coachId} name="coachId" Placeholder="Coach Id" onChange={handleChange} class="form-control coachlogin-page-input-box" id="inputEmail4"/>
                    </div>
                    {
                      (formErrors.coachIdError)?<span className="text-danger  pSize">{messages.IDVALUE_ERROR}</span>:null
                    }
                    <div class="col-md-12">
                        <input type="password" value={data.password} onChange={handleChange} name="password" Placeholder="Password" className="form-control coachlogin-page-input-box" id="inputPassword4"/>
                        {
                          (formErrors.passwordError)?<span className="text-danger pSize">{messages.PASSWORDVALUE_ERROR}</span>:null
                        }
                    </div>


                    <div className="col-12 text-center ">
                        <button type="submit" className="btn btn-primary mt-3 coachlogin-page-btn"
                        >Login</button>
                    </div>
               </form>
                // form End


              </div>
              {
                (mandatory)?<span className="text-danger text-center">Enter All Filed First</span>:null
              }
              {
                (formErrors.wrongCredentialError)?<span>messages.WRONG_CREDENTIAL</span>:null
              }
          </div>
        </div>
     </div>
  </div>
  <Footer/>
  </>
};
export default CoachLogin;
