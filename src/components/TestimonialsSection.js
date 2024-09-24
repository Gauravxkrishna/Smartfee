import React from 'react';

// Sample images (replace with actual image URLs or import statements)
import user1 from '../assests/user1.jpg'; // Replace with actual image path
import user2 from '../assests/user2.jpeg'; // Replace with actual image path

const testimonials = [
  { id: 1, quote: "SmartFee made managing payments so easy!", user: "John Doe", image: user1 },
  { id: 2, quote: "A great tool for school admin!", user: "Jane Smith", image: user2 },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-[#F9F9F9] py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl text-[#003366] font-bold mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6 bg-white rounded-lg shadow">
              <img 
                src={testimonial.image} 
                alt={testimonial.user} 
                className="w-16 h-16 mx-auto rounded-full mb-4"
              />
              <p className="text-lg text-[#003366] font-semibold mb-4">"{testimonial.quote}"</p>
              <p className="text-sm text-[#333333]">- {testimonial.user}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
