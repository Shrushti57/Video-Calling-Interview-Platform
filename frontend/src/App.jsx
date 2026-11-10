import { useState } from 'react'
import { SignInButton, SignedOut, SignOutButton, SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import HomePage from "./pages/HomePage";
import ProblemsPage from './pages/ProblemsPage';
import { Toaster } from "react-hot-toast";

function App() {
  
  const {isSignedIn} = useUser()

  return (
    <>
      <Routes>      
        <Route path="/" element= {<HomePage />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"}/> } />
        {/* <Route path="/problem/:id" element={  <ProblemPage /> } />
        <Route path="/session/:id" element={  <SessionPage />} /> */}
      </Routes>

      <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
