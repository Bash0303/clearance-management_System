import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import CalltoAction from '../components/CalltoAction'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}

        {/* Hero Section */}
        <Hero />
        {/* Features Section */}
        <Features />
        {/* How It Works */}
        <HowItWorks />
        {/* Testimonials */}
        <Testimonials />
        {/* Call to Action */}
        <CalltoAction />
      </div>
      <Footer />
    </>
  )
}

export default Home
