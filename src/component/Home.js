import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
        return <>


   <div clasName="text-center">
     <p className="text-center mt-3 top-h">
       We are at the heart of appropriate care
     </p>
   </div>


   {/* New Footer section */}
<div className="container-fluid .d-none .d-md-block .d-lg-none">
<div class="row">
 <div class="col-md-6 col-sm-12 container h-100 d-flex justify-content-end">
 <div className="p-2 bd-highlight">
             <div className="card bg-dark" style={{width:"14rem"}}>
                  <div className="card-body mb-4">
                  <div className="text-center"><img className="login-img text-center" src="cl.png" /></div>
                  <Link to="/coachlogin"><button type="button" className="login-btn  btn btn-light btn-block mt-3">Login as a Coach</button></Link>
                    <Link to="/coachsignup"><button type="button" className="login-btn  btn btn-light btn-block mt-3">Join as a Coach</button></Link>
                  </div>
                  </div>
             </div>
 </div>
 <div class="col-md-6 col-sm-12">
 <div className="p-2 bd-highlight">
       <div className="card bg-dark" style={{width:"14rem"}}>
            <div className="card-body mb-4">

            <div className="text-center"><img className="login-img text-center" src="userLogin.png" /></div>
            <Link to="/userlogin">  <button type="button" className="login-btn  btn btn-light btn-block mt-3">Login as a User</button></Link>
            <Link to="/usersignup"><button type="button" className="login-btn  btn btn-light btn-block mt-3">Join as a User</button></Link>
            </div>
            </div>
  </div>
 </div>

</div>

</div>

   {/* new End Footer section */}

</>
    }
    export default Home;
