import './Header.css'
import icon from '../assets/icon.png'
import ticz from '../assets/ticz.svg'
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
    return ( <div className='header'>
        <div className="navLeft">
            <img src={icon} alt="" />
            <img src={ticz} alt="" />
        </div>
        <div className="navCenter">
            <a href="#"> Events</a>
            <a href="#"> My Tickets</a>
            <a href="#"> About Project</a>
        </div>
        <div className="navRight">
            <button id="myTicket"> MY TICKETS <FaArrowRightLong /> </button>
        </div>


    </div> );
}
 
export default Header;