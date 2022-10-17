import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Route,Switch,withRouter} from 'react-router-dom'
import {Tab,Tabs,AppBar,Button} from '@material-ui/core'
import RegisterForm from './components/RegisterForm'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Settings from './components/Settings'
import {useSelector,useDispatch} from 'react-redux'
import { startlogout } from './actions/loginAction'
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import swal from 'sweetalert'

const TabComp=(props)=>{
  const dispatch=useDispatch()
  const expenses=useSelector(state=>state.expenses)
  const categories=useSelector(state=>state.categories)
  const userInfo=useSelector(state=>state.userInfo)
  console.log('inside TabComp',expenses)
  const token=JSON.parse(localStorage.getItem('jwtToken'))
  console.log(token)
  
  const handleLogOut=()=>{
    
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
        console.log('Log out')
        dispatch(startlogout())
        props.history.replace('/login')
      } else {
        
      }
    });
    
  }
  return (
  <div className='container' >
      <center><h1 className='mainHeading'>Expenseeve</h1></center>
      
      
      {/* <Route path='/register' exact component={RegisterForm}/> */} 
       <Route path='/' render={(history)=>(
          <AppBar>
          <Tabs value={history.location.pathname!=='/'?history.location.pathname:false}
          >
            {console.log('history',history.location.pathname)}
            {!token?<Tab label='Register' value='/register' component={Link} to='/register'/>:
                          <Tab label='Home' value='/home' component={Link} to='/home'/>
            }
            {!token?<Tab label='Login' value='/login' component={Link} to='/login'/>:
            <>
                <Tab label='Settings' value='/settings' component={Link} to='/settings'/>
                <Tab label='Profile' value='/profile' component={Link} to='/profile'/>
                <Button style={{color:'yellow'}} onClick={handleLogOut}>Logout</Button>  
                {userInfo.picture&&<>
                {userInfo.name&&<p style={{marginLeft:'770px', marginTop:'10px'}}>Hi, {userInfo.name}</p>}
                <img src={`http://localhost:3050/images/${userInfo.picture.slice(7)}`} style={{height:'40px',marginLeft:'10px', marginTop:'5px', width:'40px'}} />
                </>}
            </>
                          
            }
            
          </Tabs>
          
        </AppBar> 
      )} />
       {/*  {!token?<Link to='/register'>Register |</Link>:<Link to='/home'>Home |</Link>}
        {!token?<Link to='/login'>Login |</Link>:(
          <>
          <Link to='/settings'>Settings | </Link>
          <button onClick={handleLogOut} style={{background:'none'}}>Logout</button>
          </>
        )} */}
        
        
        
        <Switch>
          <Route path='/register' exact component={RegisterForm} />
          <Route path='/login' component={LoginPage} />
          <PrivateRoute path='/home' render={(props)=><Home {...props} />} />
          <PrivateRoute path='/settings' render={(props)=><Settings {...props} />}/>
          <PrivateRoute path='/profile' render={(props)=><UserProfile {...props} />}/>
        </Switch>
       
  </div>
  )
}

export default withRouter(React.memo(TabComp))