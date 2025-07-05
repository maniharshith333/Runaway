import React from 'react'

const About = () => {
  return (
     <div className="min-h-screen font-[Montserrat] p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div className="w-full h-auto">
          <img
            src='/runawayAbout.png'
            className="rounded-2xl shadow-lg" 
            layout="responsive"
            priority
          />
        </div>

        <div className="text-gray-800">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            At Runaway, we believe that less is more.
          </p>
          <p className="mb-4">
            Born out of a passion for clean aesthetics and bold expression, our clothing brand is rooted in minimal design and impactful typography. We're not just building a label — we're cultivating a culture. One that values subtlety, thoughtfulness, and authenticity in a world that often celebrates excess.
          </p>
          <p className="mb-4">
            Every piece we create is a reflection of our core philosophy: simplicity speaks loudest. From neutral tones and sharp lines to powerful text-based graphics, our collections are designed to make a statement — quietly yet confidently.
          </p>
          <p className="mb-4">
            Inspired by modern streetwear and timeless design principles, we’re redefining fashion for the new India. Our garments are crafted to be versatile, wearable, and expressive — a canvas for individuality. Whether it’s a typographic tee or a minimal hoodie, each item carries a story, a message, and a sense of purpose.
          </p>
          <p className="mb-4">
            We're more than just a clothing brand. We’re a movement driven by a growing community that resonates with our vision — of slowing down, stripping back, and choosing what truly matters. In every stitch, print, and word, we’re building a new language of style — one that’s proudly rooted in Indian creativity, yet globally relevant.
          </p>
          <p>
            Join us as we shape a future where design meets meaning, and fashion becomes a form of quiet rebellion.
          </p>
          <p className="mt-4 font-semibold italic">
            Minimal by design. Bold by nature.
          </p>
          <p className="mt-1 font-bold">Welcome to Runaway.</p>
        </div>
      </div>
    </div>
  )
}

export default About