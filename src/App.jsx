import React,{ useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { Home , Onboarding, Profile } from './pages'
import MedicalRecord from './pages/records/index'
import { useStateContext } from './context'
import { usePrivy } from '@privy-io/react-auth'
import SingleRecordDetails from './pages/records/single-record-details'
import ScreeningSchedule from './pages/ScreeningSchedules'
import { Buffer } from "buffer";


const App = () => {
    const { currentUser} = useStateContext();

    const { user , authenticated , ready ,login , logout } = usePrivy();

    const navigate = useNavigate();

    useEffect(() => {
      if (ready && !authenticated) {
        console.log("Attempting login...");
        login();
      }
    // else if (user && !currentUser) {
    //     navigate('/onboarding');
    //   }
    } , [ready,authenticated,user,currentUser])

    useEffect(() => {
        window.Buffer = Buffer; // Set Buffer globally
    }, []);
    
    return (
        <div className='relative flex min-h-screen flex-row bg-[#13131a] px-4'>
            <div className='relative mr-10 hidden sm:flex'>
                <Sidebar />
            </div>

            <div className='sm:ml-10 mt-5 mr-0 flex-1 max-sm:w-full sm:pr-5'>
                <Navbar />

                <Routes>
                    <Route path='/dashboard' element = {<Home />} />
                    <Route path='/profile' element = {<Profile />} />
                    <Route path='/onboarding' element = {<Onboarding />} />
                    <Route path='/medical-records' element = {<MedicalRecord />} />
                    <Route path='/medical-records/:id' element = {<SingleRecordDetails />} />
                    <Route path='/screening-schedules' element = {<ScreeningSchedule />} />
                    <Route path='*' element = {<div>Not Found</div>} />
                </Routes>

            </div>

        </div>
    )
}

export default App