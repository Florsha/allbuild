import React, { useEffect } from "react";
import { Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const resources = [
        {
            category: "MISSION",
            title: "",
            description: "To connect clients with trusted contractors quickly and securely.",
            buttonText: "Read More",
            link: "#",
            icon: "🎯"
        },
        {
            category: "VISION",
            title: "",
            description: "To become the leading global platform where every client finds the right contractor with confidence.",
            buttonText: "Explore",
            link: "#",
            icon: "🔭"
        },
        {
            category: "GOALS",
            title: " ",
            description: "To provide a comprehensive platform that simplifies the contractor selection process, ensuring quality and reliability.",
            buttonText: "Learn More",
            link: "#",
            icon: "🏆"
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
            var scrollpos = window.scrollY;

            if (scrollpos > 10) {
                header.classList.add("bg-[#1a2332]");
                header.classList.add("bg-opacity-95");
                navaction.classList.remove("bg-[#f4c430]");
                navaction.classList.add("bg-[#f4c430]");
                navaction.classList.remove("text-gray-900");
                navaction.classList.add("text-gray-900");
                for (var i = 0; i < toToggle.length; i++) {
                    toToggle[i].classList.add("text-white");
                    toToggle[i].classList.remove("text-gray-300");
                }
                header.classList.add("shadow-lg");
                navcontent.classList.remove("bg-gray-100");
                navcontent.classList.add("bg-[#1a2332]");
            } else {
                header.classList.remove("bg-opacity-95");
                navaction.classList.remove("gradient");
                navaction.classList.add("bg-[#f4c430]");
                navaction.classList.remove("text-white");
                navaction.classList.add("text-gray-900");
                for (var i = 0; i < toToggle.length; i++) {
                    toToggle[i].classList.add("text-white");
                    toToggle[i].classList.remove("text-gray-800");
                }
                header.classList.remove("shadow-lg");
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

            if (!checkParent(target, navMenuDiv)) {
                if (checkParent(target, navMenu)) {
                    if (navMenuDiv.classList.contains("hidden")) {
                        navMenuDiv.classList.remove("hidden");
                    } else {
                        navMenuDiv.classList.add("hidden");
                    }
                } else {
                    navMenuDiv.classList.add("hidden");
                }
            }
        }

        // Add event listeners
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleDocumentClick);

        // Initial call to set initial state
        handleScroll();

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            document.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <>
            {/* Enhanced Navigation */}
            <nav id="header" className="fixed w-full z-30 top-0 text-white bg-[#1a2332] transition-all duration-300">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
                    <div className="pl-4 flex items-center">
                        <img
                            src="/sampleLogo.png"
                            alt="Logo"
                            className="w-12 h-12 mr-4 transition-transform duration-300 hover:scale-110"
                        />
                        <a
                            className="toggleColour text-white font-bold text-xl sm:text-2xl lg:text-3xl transition duration-300 ease-in-out hover:text-[#f4c430]"
                            href="#"
                        >
                            All Build Corp
                        </a>
                    </div>
                    <div className="block lg:hidden pr-4">
                        <button
                            id="nav-toggle"
                            className="flex items-center p-2 text-white hover:text-[#f4c430] focus:outline-none transform transition hover:scale-110 duration-300"
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
                    <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-[#1a2332] lg:bg-transparent text-white p-4 lg:p-0 z-20" id="nav-content">
                        <ul className="list-reset lg:flex justify-end flex-1 items-center">
                            <li className="mr-3">
                                <a className="inline-block py-2 px-4 text-white font-semibold hover:text-[#f4c430] transition-colors duration-300" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    className="inline-block text-white hover:text-[#f4c430] transition-colors duration-300 py-2 px-4"
                                    href="#resources"
                                >
                                    Resources
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    className="inline-block text-white hover:text-[#f4c430] transition-colors duration-300 py-2 px-4"
                                    href="#services"
                                >
                                    Services
                                </a>
                            </li>
                        </ul>
                        <button
                            id="navAction"
                            className="mx-auto lg:mx-0 bg-[#f4c430] text-gray-900 font-bold rounded-full mt-4 lg:mt-0 py-3 px-8 shadow-lg hover:shadow-xl hover:bg-yellow-400 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out"
                        >
                            Get Help
                        </button>
                    </div>
                </div>
            </nav>

            {/* Enhanced Hero Section */}
            <div
                className="relative z-10 h-screen flex items-center"
                style={{ backgroundImage: "url('/handshake.png')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

                <div className="relative container px-6 mx-auto z-10">
                    <div className="flex flex-col w-full md:w-3/5 justify-center items-center md:items-start text-center md:text-left text-white">
                        <div className="mb-4 inline-block px-4 py-2 bg-[#f4c430]/20 rounded-full border border-[#f4c430]">
                            <span className="text-[#f4c430] font-semibold text-sm">TRUSTED BY 1000+ CLIENTS</span>
                        </div>
                        <h1 className="my-4 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
                            All Build Corp
                        </h1>
                        <p className="italic text-xl md:text-2xl text-[#f4c430] mb-4 font-light">
                            Building trust, one project at a time
                        </p>
                        <p className="leading-relaxed text-lg md:text-xl mb-8 text-gray-200 max-w-2xl">
                            Securely find the right contractor for your needs. Connect with verified professionals and bring your construction dreams to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={route('login')}
                                className="bg-[#f4c430] text-gray-900 font-bold rounded-full py-4 px-8 shadow-xl hover:shadow-2xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started →
                            </Link>
                            <button className="bg-transparent border-2 border-white text-white font-bold rounded-full py-4 px-8 hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                                Learn More
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-2xl">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#f4c430]">1000+</div>
                                <div className="text-sm text-gray-300 mt-1">Projects Done</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#f4c430]">500+</div>
                                <div className="text-sm text-gray-300 mt-1">Contractors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-[#f4c430]">98%</div>
                                <div className="text-sm text-gray-300 mt-1">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Resources Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-16" id="resources">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            What is All Build Corp?
                        </h2>
                        <div className="w-24 h-1 bg-[#f4c430] mx-auto rounded-full"></div>
                        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                            Your trusted partner in connecting quality contractors with ambitious projects
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {resources.map((resource, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="p-8">
                                        <div className="text-5xl mb-4">{resource.icon}</div>
                                        <p className="text-[#f4c430] font-bold text-sm uppercase tracking-wider mb-2">
                                            {resource.category}
                                        </p>
                                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                            {resource.description}
                                        </p>
                                    </div>
                                    <div className="bg-[#1a2332] px-8 py-6 transition-colors duration-300 group-hover:bg-[#f4c430]">
                                        <button className="w-full text-white font-semibold group-hover:text-gray-900 transition-colors duration-300 flex items-center justify-center">
                                            {resource.buttonText}
                                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Join Platform Section */}
            <section className="bg-white py-16" id="services">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Join Our Platform
                        </h2>
                        <div className="w-24 h-1 bg-[#f4c430] mx-auto rounded-full"></div>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">

                        {/* Clients Card */}
                        <div className="flex-1 max-w-md bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="text-5xl mb-6 text-center">👥</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Clients</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-center">
                                Find skilled contractors for your project. Post your requirements, review profiles, and hire with confidence using All Build Corp.
                            </p>
                            <ul className="mb-6 space-y-2">
                                {["Verified contractors", "Secure payments", "24/7 support"].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className="w-5 h-5 text-[#f4c430] mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-[#f4c430] text-gray-900 font-bold rounded-full py-3 px-6 shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                                Join as Client
                            </button>
                        </div>

                        {/* Contractors Card */}
                        <div className="flex-1 max-w-md bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="text-5xl mb-6 text-center">🔨</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Contractors</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-center">
                                Connect with clients looking for your expertise. Showcase your skills, build a strong portfolio, and grow your business with All Build Corp.
                            </p>
                            <ul className="mb-6 space-y-2">
                                {["Quality projects", "Build reputation", "Grow business"].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className="w-5 h-5 text-[#f4c430] mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-[#f4c430] text-gray-900 font-bold rounded-full py-3 px-6 shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                                Join as Contractor
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Join Platform Section - Stacked Side Panel */}
            <section className="bg-gray-50 py-16" id="services">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

                        </h2>
                        <div className="w-24 h-1 bg-[#f4c430] mx-auto rounded-full"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left side - stacked cards */}
                        <div className="flex flex-col gap-8 lg:w-1/3 sticky top-32">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">Top Contributors</h3>

                            {[
                                { name: "Jane Doe", role: "Top Contractor", avatar: "JD", rating: 5, reviews: 40, testimonial: "Consistently delivers high-quality work and is highly rated by clients." },
                                { name: "John Smith", role: "Senior Contractor", avatar: "JS", rating: 4.9, reviews: 35, testimonial: "Professional, reliable, and excellent communication throughout projects." },
                                { name: "Alice Brown", role: "Expert Contractor", avatar: "AB", rating: 4.8, reviews: 28, testimonial: "Exceptional attention to detail and project management skills." },
                            ].map((contributor, index) => (
                                <div key={index} className="bg-[#d3d3d3] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-[#f4c430] rounded-full flex items-center justify-center text-gray-900 font-bold text-lg">
                                            {contributor.avatar}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-bold">{contributor.name}</h4>
                                            <p className="text-sm text-[#f4c430]">{contributor.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4 text-sm italic">"{contributor.testimonial}"</p>
                                    <div className="flex items-center text-sm text-gray-700">
                                        <div className="text-[#f4c430] mr-2">
                                            {"★".repeat(Math.floor(contributor.rating))}
                                        </div>
                                        <span className="font-bold">{contributor.rating.toFixed(1)}</span>
                                        <span className="ml-2 text-gray-400">({contributor.reviews} reviews)</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Right side - optional extra content */}
                        <div className="lg:w-2/3 grid grid-cols-2 gap-8">
                            {[
                                { title: "Consultation", description: "Get expert advice on your project requirements.", image: "/handshake.png" },
                                { title: "Project Management", description: "Professional management from start to finish.", image: "/handshake.png" },
                                { title: "Construction Services", description: "Access verified contractors for your builds.", image: "/handshake.png" },
                                { title: "Quality Assurance", description: "Ensure every project meets top standards.", image: "/handshake.png" },
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="h-48">
                                        <img
                                            src={service.image || '/images/handshake.png'}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                        <p className="text-gray-600">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
                            
            {/* Enhanced Footer */}
            <footer className="bg-[#1a2332] text-white">
                <div className="container mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <a
                                className="text-white font-bold text-3xl mb-4 inline-block hover:text-[#f4c430] transition-colors duration-300"
                                href="#"
                            >
                                All Build Corp
                            </a>
                            <p className="text-gray-400 mt-4 max-w-md">
                                Your trusted partner in construction projects. Connecting quality contractors with ambitious clients since 2020.
                            </p>
                            <div className="flex space-x-4 mt-6">
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f4c430] transition-colors duration-300">
                                    <span className="text-sm">f</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f4c430] transition-colors duration-300">
                                    <span className="text-sm">t</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f4c430] transition-colors duration-300">
                                    <span className="text-sm">in</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <p className="uppercase text-[#f4c430] font-bold mb-4">Quick Links</p>
                            <ul className="space-y-2">
                                {[
                                    { label: "Home", href: "#" },
                                    { label: "About", href: "#about" },
                                    { label: "Services", href: "#services" },
                                    { label: "Resources", href: "#resources" },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-[#f4c430] transition-colors duration-300 inline-flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="uppercase text-[#f4c430] font-bold mb-4">Contact Us</p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 mt-1 text-[#f4c430]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="#" className="text-gray-400 hover:text-[#f4c430] transition-colors duration-300">
                                        info@allbuildcorp.com
                                    </a>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 mt-1 text-[#f4c430]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href="#" className="text-gray-400 hover:text-[#f4c430] transition-colors duration-300">
                                        +1 (555) 123-4567
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 All Build Corp. All rights reserved. | Distributed By: <a href="https://themewagon.com/" className="text-[#f4c430] hover:underline">DOH CVCHD 7 ICTU</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}