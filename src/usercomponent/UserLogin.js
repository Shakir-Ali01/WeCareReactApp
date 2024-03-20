import React from 'react';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from '../component/Header';
import Footer from '../component/Footer';
const UserLogin=()=>{
    let navigate = useNavigate();
  const[data,setData] = useState({
    userId: "",
    password:""
  });
  const[messages]=useState({
     "MANDATAROY":"Enter all the from fields",
     "ERROR":"Something went Wrong",
     "IDVALUE_ERROR":"User Id should Not Be Null",
     "PASSWORDVALUE_ERROR":"Password should have 5 to 10 characters"
  })
  const[formErrors, setFormErrors]=useState({
    userIdError:"",
    passwordError:""
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
        case "userId":
          if(value==="")
          {
            errors.userIdError=messages.IDVALUE_ERROR;
          }else{
              errors.userIdError="";
          }
          break;
      default:
         break;
    setFormErrors(errors)
  }
}
  const handleSubmit=(e)=>{
    e.preventDefault();
    if((data.userId==="" || data.password===""))
    {
      setMandatory(true);
    }else{
      axios.get("http://localhost:8090/wecare/userLogin/"+data.userId+"/"+data.password)
      .then((res)=>{
        if(res.data===null)
        {
          formErrors.wrongCredentialError=messages.WRONG_CREDENTIAL;
        }else{
          setMandatory(false);
          //setCoachInfo(res.data)
          localStorage.setItem('userName', JSON.stringify(res.data.name));
          //set value into local storage
          localStorage.setItem('userId', JSON.stringify(res.data.id))
          localStorage.setItem('number', JSON.stringify(res.data.number))
          localStorage.setItem('gender', JSON.stringify(res.data.gender))
          localStorage.setItem('dob', JSON.stringify(res.data.dob))
          localStorage.setItem('email', JSON.stringify(res.data.email))
          localStorage.setItem('country', JSON.stringify(res.data.country))
          localStorage.setItem('city', JSON.stringify(res.data.city))
          localStorage.setItem('pincode', JSON.stringify(res.data.pincode))
          localStorage.setItem('state', JSON.stringify(res.data.state))
          navigate("/userdashboard");
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
                    <p className="card-title  text-center text-light m-0" style={{fontSize:'20px'}}><span>
                       <img className="coachsignup-img text-center" src="userLogin.png" /></span>
                       &nbsp;&nbsp;&nbsp;Login As User
                    </p><br/>
                </div>

                <form className="row g-3" onSubmit={(event)=>{handleSubmit(event)}}>
                    <div className="col-md-12">
                         <input type="text"value={data.userId} name="userId" Placeholder="User Id" onChange={handleChange} class="form-control coachlogin-page-input-box" id="inputEmail4"/>
                    </div>
                    {
                      (formErrors.userIdError)?<span className="text-danger  pSize">{messages.IDVALUE_ERROR}</span>:null
                    }
                    <div class="col-md-12">
                        <input type="password" value={data.password} onChange={handleChange} name="password" Placeholder="Password" className="form-control coachlogin-page-input-box" id="inputPassword4"/>
                    </div>
                    {
                      (formErrors.passwordError)?<span className="text-danger pSize">{messages.PASSWORDVALUE_ERROR}</span>:null
                    }
                    <div className="col-12 text-center">
                        <button type="submit" className="form-control coachlogin-page-btn btn btn-primary mt-3">Login</button>
                    </div>
               </form>



              </div>
              {
                (mandatory)?<span className="text-danger text-center">Enter All Filed First</span>:null
              }
          </div>
        </div>
     </div>
  </div>
  <Footer/>
  </>
};
export default UserLogin;
