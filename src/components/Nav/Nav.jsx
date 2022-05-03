import './Nav.scss'
import user from '../../assets/images/User.png'
import downArrow from '../../assets/images/Down-Arrow.png'

const Nav = () => {
  return (
    <div className='nav'>
      <div className='logo'>Synergy</div>
      <div className='user'>
        <span>Sam Brooks</span>
        <img src={user} alt="user" />
        <img src={downArrow} alt="downArrow" />
      </div>
    </div>
  )
}

export default Nav