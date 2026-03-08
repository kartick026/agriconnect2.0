"use client";

import React from "react";
import Image from "next/image";
import { MoveRight, Sprout, Play } from "lucide-react";
import Hero3D from "@/components/Hero3D";
import FlowingMenu from "@/components/FlowingMenu";
import { ScrollVelocity } from "@/components/ScrollVelocity";

const blogItems = [
  { link: '#', text: 'Cultivating Success by Breaking Stereotypes', image: '/images/blog_1.png' },
  { link: '#', text: `Farmer's Perspective on the Journey to Organic`, image: '/images/blog_2.png' },
  { link: '#', text: 'AgriConnect Innovations Revolutionizing Farming', image: '/images/blog_3.png' },
  { link: '#', text: 'Smart Solutions For Sustainable Future', image: '/images/windmill.png' }
];

export default function LandingPage() {
  return (
    <div className="bg-[#f0f4eb] min-h-screen font-sans selection:bg-[#a4e320] selection:text-[#004d2b]">

      {/* HERO SECTION CONTAINER */}
      <div className="relative pt-6 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#004d2b] pb-[15rem] md:pb-[20rem]">
          {/* Top Custom Navbar */}
          <div className="absolute top-6 left-0 right-0 z-50 px-6">
            <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-full px-4 py-3 flex items-center justify-between shadow-xl">
              <div className="flex items-center space-x-2 text-[#004d2b] font-bold text-xl ml-2">
                <Sprout className="w-6 h-6" />
                <span>AgriConnect</span>
              </div>

              <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 rounded-full px-2 py-1">
                <a href="/" className="px-4 py-2 bg-white rounded-full text-xs font-bold text-[#004d2b] shadow-sm">HOME</a>
                <a href="/about" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#004d2b] transition-colors">ABOUT US</a>
                <a href="/services" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#004d2b] transition-colors">SERVICES</a>
                <a href="/benefits" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#004d2b] transition-colors">BENEFITS</a>
                <a href="/dashboard" className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#004d2b] transition-colors">DASHBOARD</a>
              </div>

              <a href="/login" className="bg-[#a4e320] hover:bg-[#8ec21b] text-[#004d2b] px-6 py-2.5 rounded-full font-bold text-sm transition-colors mr-2">
                GET STARTED
              </a>
            </div>
          </div>

          {/* Gradient Overlay for Top Text */}
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#004d2b] via-[#004d2b]/80 to-transparent z-10 pointer-events-none"></div>

          {/* Hero Image - Replaced by 3D */}
          <div className="absolute inset-x-0 bottom-0 h-full w-full pointer-events-none rounded-[2.5rem] overflow-hidden">
            <Hero3D />
          </div>

          {/* Hero Text */}
          <div className="relative z-20 pt-36 md:pt-44 flex flex-col items-center text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-2">
              Cultivating <span className="italic font-light opacity-90">a</span> Greener Future
            </h1>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Through <span className="italic font-light opacity-90">Sustainable</span>
            </h1>
            <h2 className="text-[5rem] md:text-[8rem] lg:text-[11rem] font-bold text-[#a4e320] leading-none tracking-tighter w-full max-w-7xl">
              AGRICULTURE
            </h2>
          </div>

        </div>

        {/* Overlapping feature cards */}
        <div className="relative z-30 max-w-7xl mx-auto -mt-20 md:-mt-32 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-[#f0f4eb] rounded-3xl p-6 md:p-8 flex items-start gap-4 shadow-xl border border-white">
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-bold text-[#004d2b] leading-tight">Enhancing Soil Health For Stronger Plants</h3>
              <p className="text-sm text-gray-500">Healthy soil ensures strong plants through sustainable practices.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-[#004d2b] hover:text-[#a4e320] transition-colors uppercase">
                Learn More <MoveRight className="ml-1 w-3 h-3" />
              </a>
            </div>
            <div className="w-24 h-32 md:w-28 md:h-40 relative rounded-full overflow-hidden shrink-0 mt-auto shadow-md">
              <Image src="/images/soil_hands.png" alt="Soil health" layout="fill" objectFit="cover" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-xl border border-white">
            <h3 className="text-2xl md:text-[1.65rem] font-bold text-[#004d2b] leading-tight mb-2">
              Transforming <span className="italic font-light text-gray-600">Agriculture</span> <br />
              with Smart Solutions For <br />
              <span className="italic font-light text-gray-600">Sustainable</span> Future
            </h3>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f0f4eb] rounded-3xl p-6 md:p-8 flex items-start gap-4 shadow-xl border border-white">
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-bold text-[#004d2b] leading-tight">Agriculture Integrated with Technology</h3>
              <p className="text-sm text-gray-500">Technology-integrated agriculture revolutionizes global farming.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold text-[#004d2b] hover:text-[#a4e320] transition-colors uppercase">
                Learn More <MoveRight className="ml-1 w-3 h-3" />
              </a>
            </div>
            <div className="w-24 h-32 md:w-28 md:h-40 relative rounded-full overflow-hidden shrink-0 mt-auto shadow-md">
              <Image src="/images/windmill.png" alt="Technology integration" layout="fill" objectFit="cover" />
            </div>
          </div>

        </div>
      </div>

      {/* Typography & Pill Images Section */}
      <div className="py-24 md:py-36 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-[2.75rem] leading-[1.4] font-medium text-[#004d2b]">
          <span className="italic text-green-700">At agriconnect, we revolutionize agriculture</span>{' '}

          <span className="inline-block align-middle mx-2 w-20 md:w-24 h-10 md:h-12 relative rounded-full overflow-hidden shadow-sm">
            <Image src="/images/pill_field.png" alt="Field" layout="fill" objectFit="cover" />
          </span>{' '}

          <span className="text-[#004d2b] font-medium">with</span>{' '}
          <span className="italic text-green-700">sustainable</span>{' '}

          <span className="inline-block align-middle mx-2 w-16 md:w-20 h-10 md:h-12 relative rounded-full overflow-hidden shadow-sm">
            <Image src="/images/pill_hands.png" alt="Hands" layout="fill" objectFit="cover" />
          </span>{' '}

          <span className="italic text-green-700">practices and innovative technologies.</span><br className="hidden md:block" />
          <span className="font-bold">Committed to environmental stewardship and community empowerment, we aim to lead</span>{' '}

          <span className="inline-block align-middle mx-1 w-8 md:w-10 h-10 md:h-12 relative rounded-full overflow-hidden shadow-sm">
            <Image src="/images/leaf.png" alt="Leaf" layout="fill" objectFit="cover" />
          </span>{' '}

          <span className="italic text-green-700">farming towards a sustainable and prosperous future.</span>
        </h2>
      </div>

      {/* Video / Sprinkler Section Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="bg-[#004d2b] rounded-[3rem] px-6 py-16 md:px-16 md:py-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Background faint elements can be simulated if needed, sticking to solid color for now */}

          {/* Left text */}
          <div className="w-full md:w-1/3 z-10 flex flex-col space-y-4">
            <h2 className="text-5xl md:text-6xl text-white font-medium">Sustainable</h2>
            <h2 className="text-[3.5rem] md:text-[5rem] text-[#a4e320] font-bold tracking-tighter leading-none italic uppercase">
              Agriculture
            </h2>
          </div>

          {/* Right Image/Video Placeholder */}
          <div className="w-full md:w-2/3 h-64 md:h-[28rem] relative rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer">
            <Image
              src="/images/sprinklers.png"
              alt="Sprinklers in field"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section (Flowing Menu) */}
      <div className="py-24 max-w-[1600px] mx-auto w-full">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-[3rem] text-[#004d2b] font-medium leading-tight mb-8">
            We Explore The <span className="italic font-light text-green-700">Future of</span><br />
            <span className="italic font-light text-green-700">Agriculture</span> Through Our Blog
          </h2>
        </div>

        <div className="w-full h-[600px] md:h-[700px] relative border-y border-[#004d2b]/10">
          <FlowingMenu
            items={blogItems}
            speed={15}
            textColor="#004d2b"
            bgColor="transparent"
            marqueeBgColor="#004d2b"
            marqueeTextColor="#a4e320"
            borderColor="rgba(0, 77, 43, 0.1)"
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 md:px-8 pb-8 max-w-[1600px] mx-auto">
        <div className="bg-[#004d2b] rounded-[3rem] p-8 md:p-16 relative overflow-hidden">

          {/* Background Footer Image overlaying bottom right/half */}
          <div className="absolute top-0 right-0 h-full w-full md:w-2/3 opacity-80 mix-blend-luminosity">
            <div className="absolute inset-x-0 left-0 h-full w-24 bg-gradient-to-r from-[#004d2b] to-transparent z-10"></div>
            <Image src="/images/footer_bg.png" alt="Farm footer" layout="fill" objectFit="cover" className="filter grayscale brightness-50" />
          </div>

          <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-2">
                We Look Forward To
              </h2>
              <h2 className="text-4xl md:text-5xl font-medium text-white italic leading-tight mb-6">
                Hear From You!
              </h2>
              <p className="text-green-100/70 text-sm mb-8 max-w-sm">
                We encourage you to reach out for any questions or additional information. We are always here to assist and look forward to connect with you.
              </p>
              <button className="bg-[#f0f4eb] hover:bg-white text-[#004d2b] px-6 py-2.5 rounded-full font-bold text-sm shadow-lg transition-colors">
                CONTACT US
              </button>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="relative z-20 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-green-100/60 font-medium">
            <div className="flex items-center space-x-2 text-white mb-4 md:mb-0">
              <Sprout className="w-5 h-5" />
              <span className="font-bold text-sm">AgriConnect</span>
            </div>

            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">HOME</a>
              <a href="#" className="hover:text-white transition-colors">ABOUT US</a>
              <a href="#" className="hover:text-white transition-colors">SERVICES</a>
              <a href="#" className="hover:text-white transition-colors">BENEFITS</a>
              <a href="#" className="hover:text-white transition-colors">BLOG</a>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>

            <div>© Copyright 2026 AgriConnect. All rights reserved.</div>
          </div>
        </div>
      </div>

    </div>
  );
}
