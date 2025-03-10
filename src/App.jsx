import React,{ useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Home , Onboarding, Profile } from './pages'

import { useStateContext } from './context'
import { usePrivy } from '@privy-io/react-auth'

const App = () => {
    const { currentUser} = useStateContext();

    const { user , authenticated , ready ,login , logout } = usePrivy();

    const navigate = useNavigate();

    useEffect(() => {
      if (ready && !authenticated) {
        login();
      }else if (user && !currentUser) {
        navigate('/onboarding');
      }
    } , [ready,authenticated,user,currentUser])
    
    return (
        <div className='relative flex min-h-screen flex-row bg-[#13131a] px-4'>
            <div className='relative mr-10 hidden sm:flex'>
                <Sidebar />
            </div>

            <div className='mx-auto mt-5 max-w-[1280px] flex-1 max-sm:w-full sm:pr-5'>
                <Navbar />

                <Routes>
                    <Route path='/' element = {<Home />} />
                    <Route path='/medical-records' element = {<div>Medical Records</div>} />
                    <Route path='/screening-schedules' element = {<div>Screening Schedules</div>} />
                    <Route path='/profile' element = {<Profile />} />
                    <Route path='/onboarding' element = {<Onboarding />} />
                    <Route path='*' element = {<div>Not Found</div>} />
                </Routes>

            </div>

        </div>
    )
}

export default App