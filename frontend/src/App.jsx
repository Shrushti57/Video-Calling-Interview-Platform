import { useState } from 'react'
import { SignInButton, SignedOut, SignOutButton, SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import HomePage from "./pages/HomePage";
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from "react-hot-toast";
import DashboardPage from './pages/DashboardPage';

function App() {
  
  const {isSignedIn, isLoaded} = useUser()

  // this will get rid of flickering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>      
        <Route path="/" element= {!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"}/>} />

        <Route path="/dashboard" element= {isSignedIn ? <DashboardPage /> : <Navigate to={"/"}/>} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"}/> } />
        {/* <Route path="/problem/:id" element={  <ProblemPage /> } />
        <Route path="/session/:id" element={  <SessionPage />} /> */}
      </Routes>

      <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
