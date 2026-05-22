import React from 'react'
import Heading from './HeroComponents/Heading'
import UrlShortenerl from './HeroComponents/UrlShortener';
import Features from './HeroComponents/Features';
import AdditionalFeatures from './HeroComponents/AdditionalFeatures';
import Plans from './HeroComponents/Plans';

const Hero = () => {
  return (
    <>
    <Heading />
    <UrlShortenerl />
    <Features />
    <AdditionalFeatures />
    <Plans />
    </>
  )
}

export default Hero;