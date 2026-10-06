import React from "react";
import SocialCards from "@/components/ui/card-fan-carousel";
import Link from "next/link";
import { TextReveal } from "@/components/ui/cascade-text";

const CARDS = [
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD0lNt6oRAEhZsjECLU9H4vse_yXy3HzQYqWIRHRT8Hw&s=10",
    alt: "Race Day Prep",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjAC7Xfes8JoJqKKTnMzoFagIvGWHTRnd4xv6DEGMMrj2vO5yXPwsgOI&s=10",
    alt: "Monaco Magic",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vVVFuxfbUAOIW-F3cQF1vwFTj9xK4g6xudqDyUIiwkCGd1VkoTmFgew&s=10",
    alt: "Scuderia Ferrari",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_jtuJZsKsdfQ0iWzJdy6y_wBqI5wElpwMDth-WqsZg&s=10",
    alt: "The Tifosi",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYswjhhKFf9OdzgE7LgrmfR_eN5ZiJGFgUEzx-9HeKw&s=10",
    alt: "Podium Finish",
  },
  {
    imgUrl: "https://i.pinimg.com/736x/05/35/fc/0535fc361b1c285c73e12e063fd8d00a.jpg",
    alt: "Racing Track",
  },
  {
    imgUrl: "https://i.pinimg.com/1200x/6e/c6/d8/6ec6d8c7baa82f7ae9047f23ec8db829.jpg",
    alt: "Pit Lane",
  }
];

export default function SocialSection() {
  return (
    <section className="relative bg-[#F4F1E8] text-[#0D0D0D] pt-24 md:pt-36 lg:pt-48 pb-24 md:pb-36 lg:pb-48 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Heading */}
        <div className="text-center mb-10 flex flex-col items-center w-full">
          <h2 className="flex flex-col items-center leading-[0.85] w-full">
            <span className="text-[10vw] md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-tighter text-[#0D0D0D]">
              WHAT'S UP
            </span>
            <span className="text-[8vw] md:text-[5rem] lg:text-[6.5rem] font-serif uppercase tracking-tight text-[#0D0D0D] -mt-1 md:-mt-2">
              ON SOCIALS
            </span>
          </h2>
        </div>

        {/* Carousel Component */}
        <div className="w-full max-w-5xl mb-12 md:mb-16 min-h-[450px] sm:min-h-[550px] lg:min-h-[600px]">
          <SocialCards cards={CARDS} />
        </div>

        {/* Footer Text */}
        <div className="text-center flex flex-col items-center gap-6 md:gap-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#0D0D0D]">
            Follow Charles on social media
          </h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { name: "TIKTOK", href: "https://www.tiktok.com/@charlesleclerc" },
              { name: "INSTAGRAM", href: "https://www.instagram.com/charles_leclerc/" },
              { name: "YOUTUBE", href: "https://www.youtube.com" },
              { name: "TWITCH", href: "https://www.twitch.tv/charlesleclerc" },
            ].map((social) => (
              <TextReveal
                key={social.name}
                as="a"
                href={social.href}
                target="_blank"
                text={social.name}
                color="#0D0D0D"
                hoverColor="#E10600"
                fontSize="inherit"
                style={{ padding: 0 }}
                className="text-xs md:text-sm font-black uppercase tracking-widest"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
