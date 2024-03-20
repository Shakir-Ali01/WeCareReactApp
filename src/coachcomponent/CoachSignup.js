import React from 'react';
import { useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
const CoachSignup=()=>{

//   function isNumberKey(evt) {
//     var charCode = (evt.which) ? evt.which : event.keyCode;
//     if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
//         return false;
//     } else {
//         return true;
//     }
// }
//state to hold the form details thst needs to be added when coach enters the values the state get updated
 const [details, setDetails]=useState({
   name:"",
   password:"",
   dob:"",
   gender:"",
   number:"",
   speciality:""
 });
 //state to hold the individual validation errors of the form
 const[formErrors, setFormErrors]=useState({
   nameError:"",
   passwordError:"",
   dobError:"",
   numberError:"",
   specialityError:""
 });
 const[coachId, setCoachId]=useState(0);
 //state variable to indicate wheater coach given values to all mandatory fileds of the form
 const[mandatory, setMandatory]=useState(false);
 //
 const[errorMessage, setErrorMessage]=useState(false);
 //state variable to indicate whether all the values given to the form filed are validation
 const[valid, setValid]=useState(false);
  //A collection of few messages that the component display
  const[messages]=useState({
     "MANDATAROY":"Enter all the from fields",
     "ERROR":"Something went Wrong",
     "NAMEVALUE_ERROR":"Name should have 3 to 50 characters",
     "PASSWORDVALUE_ERROR":"Password should have 5 to 10 characters",
     "DOBVALUE_ERROR":"Age should be between 20 and 100 years",
     "NUMBERVALUE_ERROR":"Mobile Number should have 10 digits",
     "SPECIALITYVALUE_ERROR":"Speciality should have 10 to 50 characters",
     "ERROR_MESSAGE":"This Number Is Already Register Please Try With Another Number"
  })
  //
  const handleSubmit=(e)=>{
    e.preventDefault();
    if((details.name=="" || details.password==="" || details.speciality==="" || details.dob==="" || details.number==""))
    {
      alert("under All field are not valid")
      setMandatory(true);
    }else{
      axios.post("http://localhost:8090/wecare/addCoach",details)
      .then((res)=>{
        console.log(res.data)
        if(res.data.id===null){
          setErrorMessage(true)
        }else{
          setCoachId(res.data.id)
        }

      }).catch((err)=>{
        console.log(err)
      })
    }
  }



  //
  const handleChange=(event)=>{
    setMandatory(false);
    setErrorMessage(false);
    //get current Year
    var currentYear = new Date().getFullYear();
    let errors=formErrors;
    let nameRegex=/^[a-zA-Z\s]{3,50}$/;
    let passwordRegex=/^[a-zA-Z]{5,10}$/;
    let numberRegex=/^[0-9]{10}$/;
    let specialityRegex=/^[a-zA-Z]{10,50}$/;
    let {name, value}=event.target;

    setDetails({...details,[name]:value})

    switch (name) {
      case "name":
        if(!nameRegex.test(value))
        {
          errors.nameError=messages.NAMEVALUE_ERROR;
        }else{
            errors.nameError="";
        }
        break;
      case "dob":
            var selectedYear = new Date(value).getFullYear();
            var differnceYearValue=currentYear-selectedYear;
          if(!(differnceYearValue <= 100 && differnceYearValue>20))
          {
            errors.dobError=messages.DOBVALUE_ERROR;
          }else{
              errors.dobError="";
          }
          break;
      case "number":
          if(!numberRegex.test(value))
          {
            errors.numberError=messages.NUMBERVALUE_ERROR;
          }else{
              errors.numberError="";
          }
          break;
        case "password":
              if(!passwordRegex.test(value))
              {
                errors.passwordError=messages.PASSWORDVALUE_ERROR;
              }else{
                  errors.passwordError="";
              }
              break;
          case "speciality":
                    if(!specialityRegex.test(value))
                    {
                      errors.specialityError=messages.SPECIALITYVALUE_ERROR;
                    }else{
                        errors.specialityError="";
                    }
                    break;

      default:
         break;

    }
    setFormErrors(errors)
    //this will give the true when all the value objebct is blank otherwise will give the false
    const isEmpty = Object.values(formErrors).every(x => x === null || x === '');
    if(isEmpty){
      setValid(true)
    }else{
      setValid(false)
    }
  }
return<>
<Header/>
<div className="container">
   <div className="row  h-100 justify-content-center align-items-center">
       {(coachId)?
         <div className="col-md-12 text-center mt-5">
          <img src="cl.png" style={{width:'200px' ,marginBottom:'10px'}}/>
          <h4>You Are a Coach Now !!</h4>
          <h6>Your Coach Id is: {coachId}</h6>
          <Link to="/coachlogin"><button className="btn btn-primary btn-sm">Login Now</button></Link>
         </div>

       :<div className="col-md-7">
         <div className="card bg-dark" style={{marginTop:'10%'}}>
             <div className="card-body">
               <div className="pt-3">
                  <p className="card-title text-center text-light m-0" style={{fontSize:'20px'}}><span>
                     <img className="coachsignup-img text-center" src="cl.png" /></span>
                     &nbsp;&nbsp;&nbsp;Life Coach Profile{(coachId)?coachId:null}
                  </p>
              </div>

              <form className="row g-3"  onSubmit={(event)=>{handleSubmit(event)}}>
                  <div className="col-md-6">
                       <label  className="signupform-lable-text form-label text-light">Name</label>
                       <input type="text" value={details.name} name="name" onChange={handleChange} className="form-control  coachlogin-page-input-box"/>
                       <span className="text-danger">
                          {
                            (formErrors.nameError)?<p>{messages.NAMEVALUE_ERROR}</p>:null
                          }
                       </span>
                  </div>
                  <div class="col-md-6">
                      <label for="inputPassword4" className="signupform-lable-text form-label text-light">Password</label>
                      <input type="text" value={details.password} onChange={handleChange}name="password" className="form-control  coachlogin-page-input-box" id="inputPassword4"/>
                      <span className="text-danger">
                         {
                           (formErrors.passwordError)?<p>{messages.PASSWORDVALUE_ERROR}</p>:null
                         }
                      </span>
                  </div>

                  <div className="col-md-6">
                       <label for="inputEmail4" className="signupform-lable-text form-label text-light">Date of Birth</label>
                      <input type="date" name="dob" value={details.dob} onChange={handleChange} className="form-control  coachlogin-page-input-box" id="inputPassword4"/>
                      <span className="text-danger">
                         {
                           (formErrors.dobError)?<p>{messages.DOBVALUE_ERROR}</p>:null
                         }
                      </span>
                  </div>
                  <div class="col-md-6">
                      <label for="inputPassword4" className="signupform-lable-text form-label text-light">Gender</label><br/>
                       <div class="form-check form-check-inline ml-3">
                           <input className="form-check-input" type="radio" onChange={handleChange} name="gender" value="Male" id="inlineRadio1"  required/>
                           <label className="form-check-label text-light"  for="inlineRadio1">Male</label>
                       </div>
                       <div className="form-check form-check-inline ml-3">
                         <input className="form-check-input" type="radio" onChange={handleChange} name="gender" value="Female" id="inlineRadio1"  required/>
                         <label className="form-check-label text-light"   for="inlineRadio1">Female</label>
                       </div>
                  </div>
                  <div className="col-md-6">
                       <label for="inputEmail4" className="signupform-lable-text form-label text-light">Mobile Number</label>
                       <input type="text" maxlength="10"  name="number" value={details.number} onChange={handleChange} class="form-control  coachlogin-page-input-box" id="inputEmail4"/>

                       <span className="text-danger">
                          {
                            (formErrors.numberError)?<p>{messages.NUMBERVALUE_ERROR}</p>:null
                          }
                       </span>
                  </div>
                  <div class="col-md-6">
                      <label for="inputPassword4" className="signupform-lable-text form-label text-light">Speciality</label>
                      <input type="text" name="speciality" value={details.speciality} onChange={handleChange} className="form-control  coachlogin-page-input-box" id="inputPassword4"/>
                      <span className="text-danger">
                         {
                           (formErrors.specialityError)?<p>{messages.SPECIALITYVALUE_ERROR}</p>:null
                         }
                      </span>
                  </div>
                  <div className="col-12 text-center ">
                      <button type="submit" className="btn btn-success mt-3 coachsignup-page-btn"
                      disabled={!valid}>Register</button>
                  </div>
             </form>
            </div>
            {
              (mandatory)?<div className="text-danger text-center">{messages.MANDATAROY}</div>:null
            }
            {
              (errorMessage)?<div className="text-danger text-center">{messages.ERROR_MESSAGE}</div>:null
            }
        </div>
      </div>}
   </div>
</div>
<Footer/>
</>
};
export default CoachSignup;
