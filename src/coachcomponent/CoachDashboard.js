import { useNavigate } from "react-router-dom";
import CoachHeader from './CoachHeader';
import Footer from '../component/Footer';
import React, { useEffect,useState} from "react";
import axios from "axios";
const CoachDashboard=()=>{
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
    const[coachAppointment, setcoachAppointment]=useState([]);
  //http://localhost:8090/wecare/fetchCoachAppointment/2
  useEffect(() => {
    axios.get("http://localhost:8090/wecare/fetchCoachAppointment/"+JSON.parse(localStorage.getItem('coachId')))
    .then((res)=>{
      setcoachAppointment(res.data);
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
return <>
{
  JSON.parse(localStorage.getItem('coachId'))?(<div>
    <CoachHeader/>
  <div class="row h-100 justify-content-center align-items-center">
  {coachAppointment!=='' &&
  coachAppointment.map((appointValue) => {
  return (
  <div class="col-sm-3">
    <div class="card bg-dark mt-5">
      <div class="card-body text-center ">
        <h5 class="card-title text-light">Appointment Date:</h5>
        <p class="card-text text-light">{appointValue.appointmentDate}<br/>Slot: {appointValue.slot} </p>
        <p className="text-light" style={{fontSize:'12px'}}>Booking id: {appointValue.id}<br/>User id: {appointValue.userId}</p>
      </div>
    </div>
  </div>
);
})
}
</div>
 </div>)
  : navigate("/coachlogin")
}
<Footer/>
 </>
};export default CoachDashboard;
