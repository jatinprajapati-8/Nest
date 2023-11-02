import React from "react";
import img from "../assets/1.png";

export default function About() {
  return (
      <div className="w-full flex gap-8">
        <div className="w-[60%] mx-8 my-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Website Specifications
          </h2>
          <p className="mt-6 text-gray-500">
            "In today's fast-paced world, finding time to pursue your passions
            and interests can be a challenge. Our blog is here to help you
            navigate the complexities of modern life and make the most of your
            precious moments. Whether you're looking for travel inspiration,
            cooking tips, career advice, or simply seeking a dose of motivation,
            we've got you covered. We aim to provide insightful and practical
            content that empowers you to lead a fulfilling and well-rounded
            life. Join us on this journey of discovery and personal growth as we
            explore a wide range of topics and share our expertise with you.
            Welcome to a place where you can find inspiration, knowledge, and
            the tools to make your dreams a reality."
          </p>

         
        </div>
        <div className="w-[35%]">
          <img
            src={img}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
   
  );
}