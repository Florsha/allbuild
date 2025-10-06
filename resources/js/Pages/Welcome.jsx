import React, { useEffect } from "react";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, Zap, Star, ThumbsUp, User } from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const contributors = [
        {
            name: "Jane Doe",
            role: "Project Manager",
            testimonial:
                "All Build Corp made managing multiple contractors so easy. Communication and transparency were top-notch!",
            rating: 5,
        },
        {
            name: "John Smith",
            role: "Lead Engineer",
            testimonial:
                "The verification process and project workflow are seamless. A great experience overall.",
            rating: 4,
        },
        {
            name: "Maria Lopez",
            role: "Architect",
            testimonial:
                "I love how this platform builds trust between clients and professionals. Highly recommended!",
            rating: 5,
        },
    ];
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
                                    href="#about"
                                >
                                    About
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
                            <li className="mr-3">
                                <a
                                    className="inline-block text-white hover:text-[#f4c430] transition-colors duration-300 py-2 px-4"
                                    href="#testimonials"
                                >
                                    Testimonials
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

            {/* Features Section */}
            <section id="features" className="px-6 py-24 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900">
                        Why Choose <span className="text-yellow-600">All Build Corp</span>?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { icon: <Zap className="w-10 h-10 text-yellow-600" />, title: 'Fast & Reliable', desc: 'We connect you quickly with trusted contractors.' },
                            { icon: <Shield className="w-10 h-10 text-yellow-600" />, title: 'Secure Platform', desc: 'Your safety and data are our top priorities.' },
                            { icon: <Users className="w-10 h-10 text-yellow-600" />, title: 'Verified Contractors', desc: 'Work only with pre-screened professionals.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="p-10 bg-gradient-to-br from-yellow-50 to-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="flex justify-center mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative py-24 bg-gradient-to-br from-gray-50 to-yellow-50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">About Us</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        At All Build Corp, our mission is to connect clients with trusted contractors quickly and securely, ensuring quality and confidence in every project.
                    </p>
                    <div className="mt-10 grid sm:grid-cols-3 gap-8">
                        {[
                            { label: 'Mission', desc: 'To provide a seamless client-contractor connection.', icon: '🎯' },
                            { label: 'Vision', desc: 'To be the most trusted construction platform worldwide.', icon: '🔭' },
                            { label: 'Goal', desc: 'Simplify selection while ensuring quality & reliability.', icon: '🏆' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-2xl font-bold mb-2 text-yellow-600">{item.label}</h3>
                                <p className="text-gray-700">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="px-6 py-24 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900">Our Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: 'Consultation', desc: 'Get expert advice on project planning and management.', icon: '💬' },
                            { title: 'Project Management', desc: 'Comprehensive oversight from start to finish.', icon: '📋' },
                            { title: 'Construction', desc: 'Access verified contractors for all types of builds.', icon: '🏗️' },
                            { title: 'Quality Assurance', desc: 'Ensuring top-quality results every time.', icon: '⭐' },
                            { title: 'Support', desc: 'Dedicated team to help you along the way.', icon: '🤝' },
                            { title: 'Innovation', desc: 'Modern solutions for every project need.', icon: '⚙️' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gradient-to-br from-gray-50 to-yellow-50 rounded-3xl shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="text-5xl mb-4">{s.icon}</div>
                                <h3 className="text-2xl font-semibold mb-2 text-gray-900">{s.title}</h3>
                                <p className="text-gray-600">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ✅ Testimonials / Top Contributors Section */}
            <section id="testimonials" className="py-24 bg-gradient-to-br from-yellow-50 to-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900">
                        What Our <span className="text-yellow-600">Top Contributors</span> Say
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {contributors.map((person, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white shadow-lg rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="flex justify-center mb-4">
                                    <User className="w-12 h-12 text-yellow-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{person.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">{person.role}</p>
                                <p className="text-gray-700 italic mb-4">“{person.testimonial}”</p>
                                <div className="flex justify-center mb-3">
                                    {Array.from({ length: person.rating }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <motion.div
                                    className="flex justify-center items-center text-yellow-600 font-medium"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <ThumbsUp className="w-4 h-4 mr-1" /> {person.rating * 25} Kudos
                                </motion.div>
                            </motion.div>
                        ))}
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