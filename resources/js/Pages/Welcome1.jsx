import React, { useEffect } from "react";
import { Link } from '@inertiajs/react';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const resources = [
        {
          category: "GETTING STARTED",
          title: "Understanding Your Diagnosis",
          description: "Learn about the stages of CKD and what they mean for your health.",
          buttonText: "Read More",
          link: "#"
        },
        {
          category: "LIFESTYLE CHANGES",
          title: "Managing CKD Through Diet",
          description: "Discover how a kidney-friendly diet can help manage CKD symptoms.",
          buttonText: "Explore",
          link: "#"
        },
        {
          category: "TREATMENT OPTIONS",
          title: "Advanced Treatments for CKD",
          description: "Learn about dialysis, kidney transplants, and other treatment options.",
          buttonText: "Learn More",
          link: "#"
        }
    ];

    useEffect(() => {
        // Get references to DOM elements
        var header = document.getElementById("header");
        var navcontent = document.getElementById("nav-content");
        var navaction = document.getElementById("navAction");
        var navtoggle = document.getElementById("nav-toggle");
        var toToggle = document.querySelectorAll(".toggleColour");
        
        // Handler for scroll events
        function handleScroll() {
            /*Apply classes for slide in bar*/
            var scrollpos = window.scrollY;
      
            if (scrollpos > 10) {
                header.classList.add("bg-white");
                navaction.classList.remove("bg-white");
                navaction.classList.add("gradient");
                navaction.classList.remove("text-gray-800");
                navaction.classList.add("text-white");
                //Use to switch toggleColour colours
                for (var i = 0; i < toToggle.length; i++) {
                    toToggle[i].classList.add("text-gray-800");
                    toToggle[i].classList.remove("text-white");
                }
                header.classList.add("shadow");
                navcontent.classList.remove("bg-gray-100");
                navcontent.classList.add("bg-white");
            } else {
                header.classList.remove("bg-white");
                navaction.classList.remove("gradient");
                navaction.classList.add("bg-white");
                navaction.classList.remove("text-white");
                navaction.classList.add("text-gray-800");
                //Use to switch toggleColour colours
                for (var i = 0; i < toToggle.length; i++) {
                    toToggle[i].classList.add("text-white");
                    toToggle[i].classList.remove("text-gray-800");
                }
      
                header.classList.remove("shadow");
                navcontent.classList.remove("bg-white");
                navcontent.classList.add("bg-gray-100");
            }
        }
        
        // Function to check if clicked element is a parent
        function checkParent(t, elm) {
            while (t.parentNode) {
                if (t == elm) {
                    return true;
                }
                t = t.parentNode;
            }
            return false;
        }
        
        // Handler for document clicks (for nav menu)
        function handleDocumentClick(e) {
            var target = (e && e.target) || (event && event.srcElement);
            var navMenuDiv = document.getElementById("nav-content");
            var navMenu = document.getElementById("nav-toggle");
      
            //Nav Menu
            if (!checkParent(target, navMenuDiv)) {
                // click NOT on the menu
                if (checkParent(target, navMenu)) {
                    // click on the link
                    if (navMenuDiv.classList.contains("hidden")) {
                        navMenuDiv.classList.remove("hidden");
                    } else {
                        navMenuDiv.classList.add("hidden");
                    }
                } else {
                    // click both outside link and outside menu, hide menu
                    navMenuDiv.classList.add("hidden");
                }
            }
        }
        
        // Add event listeners
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleDocumentClick);
        
        // Initial call to set initial state
        handleScroll();

        // function handleNavToggle(e) {
        //     e.preventDefault();
        //     if (navContent) {
        //       navContent.classList.toggle("hidden");
        //     }
        // }

        // if (navtoggle) {
        //     navtoggle.addEventListener("click", handleNavToggle);
        // }
        
        // Cleanup function to remove event listeners when component unmounts
        return () => {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleDocumentClick);
            // if (navtoggle) {
            //     navtoggle.removeEventListener("click", handleNavToggle);
            // }
        };
    }, []);
    return (
        <>
            <nav id="header" className="fixed w-full z-30 top-0 text-white"
            // style={{ backgroundColor: "#556b8e"}} 
            >
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                    <div className="pl-4 flex items-center">
                    <img
                        src="/sampleLogo.png"
                        alt="Logo"
                        style={{ width: "50px", marginRight: "15px" }}
                    />
                    {/* <a
                        className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                        href="#"
                    >
                        Chronic Kidney Disease
                    </a> */}
                    <a
                        className="toggleColour text-white font-bold text-xl sm:text-2xl lg:text-4xl transition duration-300 ease-in-out hover:text-gray-300 hover:underline lg:hover:no-underline"
                        href="#"
                    >
                        All Build Corp <span className="hidden sm:inline"></span>
                    </a>
                    </div>
                    <div className="block lg:hidden pr-4">
                    <button
                        id="nav-toggle"
                        className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        <svg
                        className="fill-current h-6 w-6"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                    </div>
                    <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li className="mr-3">
                        <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="#">
                            Home
                        </a>
                        </li>
                        {/* <li className="mr-3">
                        <a
                            className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                            href="#about"
                        >
                            About CKD
                        </a>
                        </li> */}
                        <li className="mr-3">
                        <a
                            className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                            href="#resources"
                        >
                            Resources
                        </a>
                        </li>
                    </ul>
                    <button
                        id="navAction"
                        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        Get Help
                    </button>
                    </div>
                </div>
                <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
            </nav>

            {/* <div className="pt-24">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                        <p className="uppercase tracking-loose w-full">Patient Information System</p>
                        <h1 className="my-4 text-5xl font-bold leading-tight">
                            Efficient CKD Patient Management
                        </h1>
                        <p className="leading-normal text-2xl mb-8">
                            Securely encode and manage patient records for Chronic Kidney Disease. Streamline data entry and improve patient care.
                        </p>
                        <Link href={route('login')} className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Get Started
                        </Link>
                    </div>
                    <div className="w-full md:w-3/5 py-6 text-center">
                        <img className="md:ml-60 md:w-30 z-50" src="https://cdn-icons-png.flaticon.com/512/954/954394.png" />
                    </div>
                </div>
            </div>  */}

            {/* <div className="relative z-10 pt-28 pb-12 md:pt-44 md:pb-0"
                style={{ backgroundColor: "#f5f5f5" }}>
                <div className="container px-6 mx-auto flex flex-col-reverse md:flex-row items-center gap-8"> */}
                    {/* Left Content */}
                    {/* <div className="flex flex-col w-full md:w-2/5 justify-center items-center md:items-start text-center md:text-left">
                        <h1 className="my-4 text-4xl md:text-5xl font-bold leading-tight">
                        All Build Corp 
                        </h1>
                        <p className="leading-relaxed text-lg md:text-2xl mb-6 ">
                            Securely find the right contractor for your needs.
                        </p>
                        <Link 
                            href={route('login')} 
                            className="gradient mx-auto md:mx-0 bg-white text-gray-800 font-bold rounded-full py-3 px-6 shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Get Started
                        </Link>
                    </div> */}

                    {/* Right Image */}
                    {/* <div className="w-full md:w-3/5 flex justify-center md:justify-end">
                        <img 
                            className="w-48 md:w-64 lg:w-72"
                            // src="https://cdn-icons-png.flaticon.com/512/954/954394.png"
                            alt="Patient System"
                        />
                    </div>
                </div>
            </div> */}
            <div 
                className="relative z-10 h-screen flex items-center"
                style={{ backgroundImage: "url('/handshake.png')", backgroundSize: "cover", backgroundPosition: "center" }}
                >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Content */}
                <div className="relative container px-6 mx-auto flex flex-col md:flex-row items-center gap-8 z-10">
                    
                    {/* Left Content */}
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-center md:items-start text-center md:text-left text-white">
                    <h1 className="my-4 text-4xl md:text-5xl font-bold leading-tight">
                        All Build Corp
                    </h1>
                    <p className="leading-relaxed text-lg md:text-2xl mb-6">
                        Securely find the right contractor for your needs.
                    </p>
                    <Link 
                        href={route('login')} 
                        className="gradient mx-auto md:mx-0 text-white font-bold rounded-full py-3 px-6 shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        Get Started
                    </Link>
                    </div>

                    {/* Right Image (Optional: can remove since bg is image) */}
                    <div className="hidden md:flex w-full md:w-3/5 justify-center md:justify-end">
                    <img 
                        className="w-48 md:w-64 lg:w-72"
                        // src="/path-to-your-icon.png"
                        // alt="Contractor Icon"
                    />
                    </div>
                </div>
                </div>

            <div className="relative -mt-12 lg:-mt-24"
            style={{ backgroundColor: "#f5f5f5" }}>
                <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
                        <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.1"></path>
                        <path
                        d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                        opacity="0.1"
                        ></path>
                        <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.2"></path>
                    </g>
                    </g>
                </svg>
            </div>

            {/* <section className="bg-white border-b py-8" id="about">
                <div className="container max-w-5xl mx-auto m-8">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    About Chronic Kidney Disease
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-5/6 sm:w-1/2 p-6">
                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                        What is Chronic Kidney Disease?
                    </h3>
                    <p className="text-gray-600 mb-8">
                        Chronic Kidney Disease (CKD) is a condition where the kidneys gradually lose function over time. It can lead to serious complications if not managed properly. Early detection and treatment are key to slowing its progression.
                    </p>
                    </div>
                    <div className="w-full sm:w-1/2 p-6">
                    <img src="https://cdn-icons-png.flaticon.com/512/954/954394.png" className="w-full sm:h-64 mx-auto" alt="Kidney Health" />
                    </div>
                </div>
                <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                    <div className="w-full sm:w-1/2 p-6 mt-6">
                    <img src="https://cdn-icons-png.flaticon.com/512/954/954394.png" className="w-5/6 sm:h-64 mx-auto" alt="Kidney Health" />
                    </div>
                    <div className="w-full sm:w-1/2 p-6 mt-6">
                    <div className="align-middle">
                        <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                        Symptoms of CKD
                        </h3>
                        <p className="text-gray-600 mb-8">
                        Common symptoms include fatigue, swelling in the legs, changes in urination, and high blood pressure. If you experience any of these, consult a healthcare professional immediately.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </section> */}

            <section className="bg-white border-b py-8" id="resources">
                <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        What is All Build Corp?
                    </h1>
                    <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                    </div>
                    
                    {resources.map((resource, index) => (
                    // <div key={index} className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                    //     <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    //     <a href={resource.link} className="flex flex-wrap no-underline hover:no-underline">
                    //         <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                    //         {resource.category}
                    //         </p>
                    //         <div className="w-full font-bold text-xl text-gray-800 px-6">
                    //         {resource.title}
                    //         </div>
                    //         <p className="text-gray-800 text-base px-6 mb-5">
                    //         {resource.description}
                    //         </p>
                    //     </a>
                    //     </div>
                    //     <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
                    //     <div className="flex items-center justify-center">
                    //         <button className="mx-auto lg:mx-0 hover:underline gradient text-black font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    //         style={{ border: "2px solid #7f8d6c", borderRadius: "0.5rem" }}>
                    //         {resource.buttonText}
                    //         </button>
                    //     </div>
                    //     </div>
                    // </div>
                    <div key={index} className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                        {/* Card container */}
                        <div className="flex-1 bg-[#f5f5f5] rounded-t rounded-b-none overflow-hidden shadow">
                            <a href={resource.link} className="flex flex-wrap no-underline hover:no-underline">
                            <p className="w-full text-gray-600 text-xs md:text-sm px-6">
                                {resource.category}
                            </p>
                            <div className="w-full font-bold text-xl text-gray-800 px-6">
                                {resource.title}
                            </div>
                            <p className="text-gray-800 text-base px-6 mb-5">
                                {resource.description}
                            </p>
                            </a>
                        </div>

                        {/* Bottom button section */}
                        <div className="flex-none mt-auto bg-[#7f8d6c] rounded-b rounded-t-none overflow-hidden shadow p-6">
                            <div className="flex items-center justify-center">
                            <button className="mx-auto lg:mx-0 hover:underline">
                                {resource.buttonText}
                            </button>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto text-center py-6 mb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-black">
                    Take Action Today
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <h3 className="my-4 text-3xl leading-tight">
                   Find the right contractor for your needs with All Build Corp
                </h3>
                {/* <button 
                    className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                >
                    Get Started
                </button> */}
                <button
                    className="mx-auto lg:mx-0 hover:underline text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    style={{ backgroundColor: "#7f8d6c" }}
                    >
                    Get Started
                </button>
            </section>
            
            <footer className="bg-white">
                <div className="container mx-auto px-8">
                    <div className="w-full flex flex-col md:flex-row py-6">
                    <div className="flex-1 mb-6 text-black">
                        <a
                        className="text-black-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                        href="#"
                        >
                        All Build Corp
                        </a>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-gray-500 md:mb-6">Quick Links</p>
                        <ul className="list-reset mb-6">
                        {[
                            { label: "Home", href: "#" },
                            { label: "About", href: "#about" },
                            { label: "Mission", href: "#testimonials" },
                        ].map((link, index) => (
                            <li key={index} className="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a
                                href={link.href}
                                className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                            >
                                {link.label}
                            </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="uppercase text-gray-500 md:mb-6">Contact Us</p>
                        <ul className="list-reset mb-6">
                        {[
                            { label: "Email", href: "#" },
                            { label: "Phone", href: "#" },
                        ].map((contact, index) => (
                            <li key={index} className="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a
                                href={contact.href}
                                className="no-underline hover:underline text-gray-800 hover:text-pink-500"
                            >
                                {contact.label}
                            </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                </div>
            </footer>
            
            <div>
                <p className="text-center p-3"
                style={{backgroundColor:"#556b8e"}}>Distributed By: <a href="https://themewagon.com/">DOH CVCHD 7 ICTU</a></p>
            </div>
        </>
    );
}
