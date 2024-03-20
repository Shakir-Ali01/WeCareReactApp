import { useNavigate } from "react-router-dom";
import UserHeader from './UserHeader';
import Footer from '../component/Footer';
import UserAppointmentForm from './UserAppointmentForm';
import React, { useEffect,useState} from "react";
import axios from "axios";
const UserDashboard=()=>{
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
  // const [details, setDetails]=useState({
  //   id:"",
  //   name:"",
  //   password:"",
  //   dob:"",
  //   gender:"",
  //   speciality:"",
  //   number:""
  //
  // });
  let mainContent= new Boolean(true);
const [setEdit, setEditing]=useState(
  {
    selectedCoachId:"",
    status:true
  }
);
  const[details, setDetails]=useState([]);
  useEffect(() => {
    axios.get("http://localhost:8090/wecare/fetchAllCoach")
    .then((res)=>{
      setDetails(res.data);
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
return <>
{
  JSON.parse(localStorage.getItem('userId'))?(<div className="main"><UserHeader/>
    {(setEdit.status)?
    <div class="row h-100 justify-content-center align-items-center px-2 " style={{marginTop:'5%'}}>
    {details!=='' &&
    details.map((coachValue) => {
    return (
    <div class="col-sm-4">
      <div class="card shadow p-3 mb-5 bg-white rounded border-2" >
        <div class="card-body p-0" style={{marginLeft:'6%'}}>
         <div className="row">
            <div className="col-md-6 text-center" style={{backgroundColor:'#e6e6e6',borderRadius:'50%',minHeight: '152px',width:'133px'}}>
               <img src="cl.png" className="rounded-circle shadow-4-strong" style={{height:'120px', marginTop:'10%',width:'105px'}}/>
            </div>
            <div className="col-md-6" style={{marginTop:'3%'}}>
            <h5>{coachValue.name}</h5>
            <h6 >Coach Id: {coachValue.id}</h6>
              <p  style={{fontSize:'12px'}}>Mobile No : {coachValue.number}
              <br/>Speciality : {coachValue.speciality}
              </p>
              <button className="btn btn-primary btn-sm tn-block border-0 px-3" onClick={() => setEditing({...setEdit,selectedCoachId:coachValue.id,status:false})} style={{fontSize:'12px'}}>Book An Appointment</button>
            </div>
         </div>
        </div>
      </div>
    </div>
  );
})
}
    </div>:<UserAppointmentForm getCoachId={setEdit.selectedCoachId}/>}
    </div>)
  : navigate("/")
}

<Footer/>
 </>
};export default UserDashboard;
