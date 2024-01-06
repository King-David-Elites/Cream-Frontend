import Link from "next/link";
import React from "react";

const Footer = () => {
  const footerNav = [
    {
      title: "Cream",
      subItems: [
        {
          name: "About",
          link: "/about",
        },
        {
          name: "Contact us",
          link: "/contact-us",
        },
        {
          name: "Blogs",
          link: "/blog",
        },
        {
          name: "Terms & Condition",
          link: "",
        },
      ],
    },
    {
      title: "Categories",
      subItems: [
        {
          name: "Real Estate",
          link: "/real-estate",
        },
        {
          name: "Automobile",
          link: "/automobile",
        },
      ],
    },
    {
      title: "Business",
      subItems: [
        {
          name: "Affiliate Marketing",
          link: "/",
        },
        {
          name: "List with us",
          link: "/register",
        },
      ],
    },
    {
      title: "Social Media",
      subItems: [
        {
          name: "Instagram",
          link: "/",
        },
        {
          name: "Facebook",
          link: "/",
        },
        {
          name: "Twitter",
          link: "/",
        },
        {
          name: "LinkedIn",
          link: "/",
        },
      ],
    },
  ];
  return (
    <div className="bg-black text-[0.8em] grid grid-cols-4 sm:gap-[30px] sm:grid-cols-1 py-20 sm:py-[40px] px-xPadding text-[rgb(200,200,200)]">
      {footerNav.map((nav, i) => {
        return (
          <div key={i} className="flex flex-col gap-3">
            <h3 className="text-[1.5em] font-[600]">{nav.title}</h3>
            {nav.subItems.map((item, j) => {
              return (
                <Link href={item.link} className="text-[1.3em]">
                  {item.name}
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
