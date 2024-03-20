import { useNavigate } from "react-router-dom";
import CoachHeader from './CoachHeader';
import Footer from '../component/Footer';
const CoachProfile=()=>{
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
return <>
{
  JSON.parse(localStorage.getItem('coachId'))?(<div>
    <CoachHeader/>
  <div class="row h-100 justify-content-center align-items-center">
  <div class="col-sm-4">
    <div class="card bg-dark" style={{marginTop:'25%'}}>
      <div class="card-body ">
       <div className="row ">
          <div className="col-md-6 text-center">
             <img src="cl.png" className="rounded-circle shadow-4-strong" style={{border: '3px solid white',height:'140px'}}/>
          </div>
          <div className="col-md-6">
            <h6 className="text-light" style={{marginTop:'15%'}}>Coach Id: {JSON.parse(localStorage.getItem('coachId'))}</h6>
            <p className='text-light' style={{fontSize:'12px'}}>Date Of Birth : {JSON.parse(localStorage.getItem('dob'))}
            <br/>Mobile No : {JSON.parse(localStorage.getItem('number'))}
            <br/>Speciality : {JSON.parse(localStorage.getItem('speciality'))}
            </p>
          </div>
       </div>
      </div>
    </div>
  </div>
</div>
 </div>)
  : navigate("/coachlogin")
}
<Footer/>
 </>
};export default CoachProfile;
