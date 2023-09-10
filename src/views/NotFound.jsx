import { NavLink } from "react-router-dom";
function NotFound(){
    return(<>
    <div className="notfoundPage">
        <div className="text">
            <div>ERROR</div>
            <h1>404</h1>
            <hr />
            <div>Page Not Found</div>
        </div>
        <NavLink className="formControls_btnLink" to="auth/sign_in">回到登入頁</NavLink>

<div className="astronaut">
  <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" alt="" className="src" />
</div>
    </div>
    </>)
}

export default NotFound;