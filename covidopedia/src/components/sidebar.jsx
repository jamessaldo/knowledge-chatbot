import React, { useContext } from 'react'
import { LandingPageContext } from "../pages/LandingPageContext";

export const Sidebar = () => {

    const [,,,,,,sidebar] = useContext(LandingPageContext)
    let animationClasses = (sidebar ? ' active': '');
    return (
        <>
        {/* {sidebar &&  */}
            <div className={`sidebar${animationClasses}`} id="sidebar">
                <a className="sidebar-link" href="#charts">Charts</a>
                <a className="sidebar-link" href="#credits">Credits</a>
                <a className="sidebar-link" href="#advice">Advices</a>
            </div>
        {/* } */}
        </>
    );
}
export default Sidebar;