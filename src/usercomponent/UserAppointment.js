import { useNavigate } from "react-router-dom";
import UserHeader from './UserHeader';
import UserUpdateAppointment from './UserUpdateAppointment';
import Footer from '../component/Footer';
import {Link} from 'react-router-dom';
import React, { useEffect,useState} from "react";
import axios from "axios";
const UserAppointment=()=>{
  const[deleteschedule, setDeleteSchedule]=useState(0)
  function deleteSchedule(id){
    axios.delete("http://localhost:8090/wecare/deleteAppointment/"+id)
    .then((res)=>{
      setDeleteSchedule(1);
      console.log('Appointment Deleted Successfully');
    }).catch((err)=>{
      console.log(err);
    })
  }
  const[userAppointment, setUserAppointment]=useState([]);
  const[updateAppointment, setUpdateAppointment]=useState({
    appointmentId:""
  });
  //onClick={() => setAppointmentId()}
  const[getAppointByid, setAppointmentId]=useState("");
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  useEffect(() => {
    axios.get("http://localhost:8090/wecare/fetchUserAppointment/"+JSON.parse(localStorage.getItem('userId')))
    .then((res)=>{
      setUserAppointment(res.data);
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
return <>
{
  JSON.parse(localStorage.getItem('userId'))?(<div>
    <UserHeader/>
  {(deleteschedule===0)?(<div>
      {(updateAppointment.appointmentId==="")?(<div class="row h-100 justify-content-center align-items-center px-2">
    {userAppointment!=='' &&
    userAppointment.map((appointValue) => {
    return (
    <div class="col-sm-3">
    <div class="card bg-dark mt-5">
      <div class="card-body text-center ">
        <h5 class="card-title text-light">Appointment Date:</h5>
        <p class="card-text text-light">{appointValue.appointmentDate}<br/>Slot: {appointValue.slot}</p>
        <p className="text-light" style={{fontSize:'12px'}}>Booking id: {appointValue.id}<br/>User id: {appointValue.userId}<br/>Coach Id: {appointValue.coachId}</p>
        <button  className="btn btn-info mt-3 coachsignup-page-btn" onClick={() => setUpdateAppointment({appointmentId:appointValue.id})}>Reschedule Appointment</button>
        <button  className="btn btn-danger mt-3 coachsignup-page-btn"  onClick={(event)=> {deleteSchedule(appointValue.id)}}>Cancel Appointment</button>
      </div>
    </div>
    </div>
  );
  })
}
  <div className="text-center mt-3">  <Link to="/userdashboard">  <button className="btn btn-info btn-sm btn-block border-0 px-3  text-light" style={{fontSize:'12px'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
  </svg>&nbsp;Go Back</button></Link></div>

 </div>):<UserUpdateAppointment getAppointmentId={updateAppointment.appointmentId}/>}
 </div>)
  : <div class="row h-100 justify-content-center align-items-center">
  <div class="col-sm-3 ">
  <div class="card bg-dark" style={{marginTop:'50%'}}>
    <div class="card-body text-center ">
      <p class="card-text text-light" style={{fontSize:'12px'}}><br/>Your Appointment is Cancelled Successfully</p>
      <div className="text-center mt-3">  <Link to="/userdashboard">  <button className="btn btn-info btn-sm btn-block border-0 px-3  text-light" style={{fontSize:'12px'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg>&nbsp;Go Back</button></Link></div>
    </div>
  </div>
  </div>
   </div>}
</div>):navigate("/userlogin")
}
<Footer/>
 </>
};export default UserAppointment;
