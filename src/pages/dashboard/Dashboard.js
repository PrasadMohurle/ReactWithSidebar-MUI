import './dashboard.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const Dashboard = ({setAuth}) => {
  return (
    <>
          <div className="dashboard">
            <Sidebar setAuth={setAuth}/>
            <div className="dashboard-container">
              <Navbar/>
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        </>
  )
}

export default Dashboard