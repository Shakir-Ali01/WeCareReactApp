import { useNavigate } from "react-router-dom";
import UserHeader from './UserHeader';
import Footer from '../component/Footer';
import {Link} from 'react-router-dom';
const UserProfile=()=>{
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/');
  }
return <>
{
  JSON.parse(localStorage.getItem('userId'))?(<div>
    <UserHeader/>
  <div class="row h-100 justify-content-center align-items-center">
  <div class="col-sm-4">
    <div class="card bg-dark" style={{marginTop:'25%'}}>
      <div class="card-body ">
       <div className="row ">
          <div className="col-md-6 text-center">
             <img src="cl.png" className="rounded-circle shadow-4-strong" style={{border: '3px solid white',height:'140px'}}/>
          </div>
          <div className="col-md-6">
            <h6 className="text-light" style={{marginTop:'5%'}}>{JSON.parse(localStorage.getItem('userName'))}</h6>
            <p className='text-light' style={{fontSize:'11px'}}>Email Id  : {JSON.parse(localStorage.getItem('email'))}
            <br/>Date Of Birth : {JSON.parse(localStorage.getItem('dob'))}
            <br/>Mobile No : {JSON.parse(localStorage.getItem('number'))}
            <br/>Address : {JSON.parse(localStorage.getItem('city'))},{JSON.parse(localStorage.getItem('state'))}<br/>{JSON.parse(localStorage.getItem('country'))}
              <br/>PinCode : {JSON.parse(localStorage.getItem('pincode'))}
            </p>
          <Link to="/userdashboard">  <button className="btn btn-info btn-sm btn-block border-0 px-3 float-end text-light" style={{fontSize:'12px'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg>&nbsp;Go Back</button></Link>
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
};export default UserProfile;
