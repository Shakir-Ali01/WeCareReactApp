import { useNavigate } from "react-router-dom";
import UserHeader from './UserHeader';
import Footer from '../component/Footer';
import {Link} from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
const UserUpdateAppointment=(props)=>{
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  const[updated,setUpdated]=useState(0);
  const [details, setDetails]=useState({
    appointmentDate:"",
    slot:"",
    id:props.getAppointmentId,
    userId:JSON.parse(localStorage.getItem('userId'))
  });
  //state to hold the individual validation errors of the form
  const[formErrors, setFormErrors]=useState({
    dobError:""
  });
   const[valid, setValid]=useState(false);
  const[messages]=useState({
     "MANDATAROY":"Enter all the form fields",
     "ERROR":"Something went Wrong",
     "DOBVALUE_ERROR":"Appopintment Date should be any upcoming 7 days"
  })
  //state variable to indicate wheater coach given values to all mandatory fileds of the form
  const[mandatory, setMandatory]=useState(false);
  const[errorMessage, setErrorMessage]=useState(false);
  const handleChange=(event)=>{
    setMandatory(false);
    setErrorMessage(false);
    //get current Year
    var currentDate = new Date().getDate();
    //let errors=formErrors;
    let {name, value}=event.target;
    setDetails({...details,[name]:value})
    var selectedDate = new Date(value).getDate();
    if(name=="appointmentDate" && !(currentDate+7>=selectedDate && currentDate<=selectedDate))
      {
          formErrors.dobError=messages.DOBVALUE_ERROR;
          setValid(false);
        }else{
            formErrors.dobError="";
            setValid(true);
        }
    if(name==="slot" && formErrors.dobError!==""){
        formErrors.dobError=messages.DOBVALUE_ERROR;
        setValid(false);
    }
        // setFormErrors(errors);
     }
// submit
const handleSubmit=(e)=>{
  e.preventDefault();
  if(details.appointmentDate==="" || details.slot==="")
  {
    
    setMandatory(true);
  }
  else{
    {

      console.log(details);
      axios.put("http://localhost:8090/wecare/updateAppointment",details)
      .then((res)=>{
        console.log(res.data)
        setUpdated(1);
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}

return <>
<div>{(updated===0)?
  <div class="row h-100 justify-content-center align-items-center">
  <div class="col-sm-4">
    <div class="card bg-dark" style={{marginTop:'25%'}}>
      <div class="card-body ">
      <div className="pt-3">
         <p className="card-title  text-center text-light m-0" style={{fontSize:'20px'}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
</svg>&nbsp; &nbsp;Reschedule your Appointment{props.getCoachId}
         </p>
     </div><br/>
      <form className="row g-3" onSubmit={(event)=>{handleSubmit(event)}}>
          <div className="col-md-12">
          <label for="inputPassword4" className="signupform-lable-text form-label text-light">Date of Appointment</label><br/>
                <input type="date" name="appointmentDate" value={details.appointmentDate} onChange={handleChange} className="form-control  usersignup-page-input-box" id="inputPassword4"/>
          </div>
          <span className="text-danger">
             {
               (formErrors.dobError)?messages.DOBVALUE_ERROR:null
             }
          </span>
          <div class="col-md-12">
              <label for="inputPassword4" className="signupform-lable-text form-label text-light">Preferred Slot</label><br/>
               <div class="form-check form-check-inline ml-3">
                   <input className="form-check-input" onChange={handleChange} type="radio"  name="slot" value="9 AM to 10 AM" id="inlineRadio1"  required/>
                   <label className="form-check-label text-light" style={{fontSize:'10px'}}  for="inlineRadio1">9 AM to 10 AM</label>
               </div>
               <div className="form-check form-check-inline ml-3">
                 <input className="form-check-input" type="radio" onChange={handleChange} name="slot" value="10 AM to 11 AM" id="inlineRadio1"  required/>
                 <label className="form-check-label text-light"   for="inlineRadio1" style={{fontSize:'10px'}}>10 AM to 11 AM</label>
               </div>
               <div className="form-check form-check-inline ml-3">
                 <input className="form-check-input" type="radio" onChange={handleChange}name="slot" value="11 AM to 12 PM" id="inlineRadio1"  required/>
                 <label className="form-check-label text-light"   for="inlineRadio1" style={{fontSize:'10px'}}>11 AM to 12 PM</label>
               </div>
               <div className="form-check form-check-inline ml-3">
                 <input className="form-check-input" type="radio" onChange={handleChange} name="slot" value="2 PM to 3 PM" id="inlineRadio1"  required/>
                 <label className="form-check-label text-light"   for="inlineRadio1" style={{fontSize:'10px'}}>2 PM to 3 PM</label>
               </div>
               <div className="form-check form-check-inline ml-3">
                 <input className="form-check-input" type="radio" onChange={handleChange} name="slot" value="3 PM to 4 PM" id="inlineRadio1"  required/>
                 <label className="form-check-label text-light"   for="inlineRadio1" style={{fontSize:'10px'}}>3 PM to 4 PM</label>
               </div>
               <div className="form-check form-check-inline ml-3">
                 <input className="form-check-input" type="radio" onChange={handleChange} name="slot" value="4 PM to 5 PM" id="inlineRadio1"  required/>
                 <label className="form-check-label text-light"   for="inlineRadio1" style={{fontSize:'10px'}}>4 PM to 5 PM</label>
               </div>
          </div>
          <div className="col-12 text-center">
          <button type="submit" disabled={!valid} className="btn btn-success mt-3 schedule-form-btn" style={{width:'100% !important'}}>Confirm Your Appointment</button>
          </div>
     </form>
      </div>
      {
        (mandatory)?<div className="text-danger text-center">{messages.MANDATAROY}</div>:null
      }

    </div>
  </div>
</div>:<div class="row h-100 justify-content-center align-items-center">
<div class="col-sm-3 ">
<div class="card bg-dark" style={{marginTop:'50%'}}>
  <div class="card-body text-center ">
    <p class="card-text text-light" style={{fontSize:'12px'}}><br/>Your Appointment is Reschedule Successfully</p>
    <div className="text-center mt-3">  <Link to="/userdashboard">  <button className="btn btn-info btn-sm btn-block border-0 px-3  text-light" style={{fontSize:'12px'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
    </svg>&nbsp;Go Back</button></Link></div>
  </div>
</div>
</div>
 </div>}
 </div>
 </>
};export default UserUpdateAppointment;
