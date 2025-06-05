import React from 'react';
import { Button } from '@/components/ui/button'; // If using shadcn/ui
import { guestStore } from '@/store/guestStore';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const {guest} = guestStore();
  const navigateTo = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center px-4 md:px-16 text-center relative min-h-[90vh]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold  mb-6 font-serif text-shadow-md text-shadow-black">
          Experience Luxury, Managed to Perfection
        </h1>
        <p className="text-base text-primary mb-5">
          Welcome to LuxuryStay Hospitality — where world-class service meets seamless technology.
          Our smart Hotel Management System empowers your stay from check-in to check-out.
        </p>

        {guest && <div className="flex justify-center">
          <Button className="uppercase" variant={'secondary'} onClick={() => navigateTo('/reservation')}>
            Book Now
          </Button>
        </div>}
      </div>
      
    </section>
  );
};

export default Hero;
