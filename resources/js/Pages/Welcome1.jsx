import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, Zap, Star, ThumbsUp, User } from 'lucide-react';

export default function Landing() {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-800 overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm z-50">
        <div className="text-2xl font-extrabold text-yellow-600 tracking-tight">All Build Corp</div>
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="#features" className="hover:text-yellow-600 transition-colors">Features</Link>
          <Link href="#about" className="hover:text-yellow-600 transition-colors">About</Link>
          <Link href="#services" className="hover:text-yellow-600 transition-colors">Services</Link>
          <Link href="#testimonials" className="hover:text-yellow-600 transition-colors">Testimonials</Link>
          <Link href="#contact" className="hover:text-yellow-600 transition-colors">Contact</Link>
        </div>
        <Link
          href="/login"
          className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition font-semibold shadow"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 bg-[url('/handshake.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            Building Trust, One Project at a Time
          </motion.h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            Connecting clients and contractors with confidence and transparency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow hover:bg-yellow-400 transition flex items-center justify-center"
            >
              Join Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

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

      {/* Footer */}
      <footer id="contact" className="bg-[#1a2332] text-gray-300 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white text-2xl font-bold mb-3">All Build Corp</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building trust between clients and contractors. Delivering reliability and excellence, every time.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Testimonials', 'Contact'].map((item, i) => (
                <li key={i}><Link href={`#${item.toLowerCase()}`} className="hover:text-yellow-500 transition">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: support@allbuildcorp.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
            <p className="text-gray-500 mt-4 text-sm">© {new Date().getFullYear()} All Build Corp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
