import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

export default function Services() {
  const services = [
    {
      title: "Renovation",
      description:
        "Transform your home, apartment, or building with our expert renovation services.",
      icon: <HomeModernIcon className="w-14 h-14 text-yellow-500" />,
    },
    {
      title: "New Construction",
      description:
        "From foundation to finishing touches, we handle complete construction projects.",
      icon: <BuildingOffice2Icon className="w-14 h-14 text-yellow-500" />,
    },
    {
      title: "Repair & Maintenance",
      description:
        "Quick and reliable repairs for houses, apartments, and buildings.",
      icon: <WrenchScrewdriverIcon className="w-14 h-14 text-yellow-500" />,
    },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Services" />

      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-600 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1604147497728-93fef7c3d7f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Build Your Dream with Us
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
            Whether it’s a new project, renovation, or repair — we’ve got you
            covered with top-quality construction services.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Choose a Service
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {service.icon}
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                  <button className="mt-6 w-full bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700 text-white py-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold">
          Ready to start your project?
        </h3>
        <p className="mt-3 text-lg opacity-90">
          Contact us today and let’s bring your vision to life.
        </p>
        <button className="mt-6 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
          Get a Free Quote
        </button>
      </div>
    </AuthenticatedLayout>
  );
}


//option2
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import {
//   WrenchScrewdriverIcon,
//   BuildingOffice2Icon,
//   HomeModernIcon,
// } from "@heroicons/react/24/outline";

// export default function Services() {
//   const services = [
//     {
//       title: "Renovation",
//       description:
//         "Give your space a fresh new look. From kitchens to offices, we bring modern upgrades to life.",
//       icon: <HomeModernIcon className="w-12 h-12 text-yellow-400" />,
//       image:
//         "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       title: "New Construction",
//       description:
//         "We manage entire construction projects from foundation to finishing, with quality you can trust.",
//       icon: <BuildingOffice2Icon className="w-12 h-12 text-yellow-400" />,
//       image:
//         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     },
//     {
//       title: "Repair & Maintenance",
//       description:
//         "Reliable and efficient repair solutions for houses, apartments, and commercial buildings.",
//       icon: <WrenchScrewdriverIcon className="w-12 h-12 text-yellow-400" />,
//       image:
//         "https://images.unsplash.com/photo-1597000931233-6c2f50c2f3d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     },
//   ];

//   return (
//     <AuthenticatedLayout>
//       <Head title="Services" />

//       {/* Hero Section */}
//       <div className="relative bg-gray-900 text-white">
//         <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1581090700227-4c4c15f9b4ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
//         <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold">
//             Professional Construction Services
//           </h1>
//           <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
//             Renovation, new builds, or quick repairs — we provide trusted,
//             high-quality services tailored to your needs.
//           </p>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="py-16 bg-gray-100 dark:bg-gray-950">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
//             Choose Your Service
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
//               >
//                 {/* Background Image */}
//                 <div
//                   className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                   style={{ backgroundImage: `url(${service.image})` }}
//                 ></div>

//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all"></div>

//                 {/* Content */}
//                 <div className="relative z-10 p-8 flex flex-col items-center text-center space-y-4 backdrop-blur-md bg-white/10 rounded-2xl">
//                   {service.icon}
//                   <h3 className="text-xl font-semibold text-white">
//                     {service.title}
//                   </h3>
//                   <p className="text-gray-200 text-sm">{service.description}</p>
//                   <button className="mt-4 bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition">
//                     Select
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-yellow-400 text-gray-900 py-12 text-center">
//         <h3 className="text-2xl md:text-3xl font-bold">
//           Let’s Build Something Great Together
//         </h3>
//         <p className="mt-3 text-lg opacity-90">
//           Schedule a consultation today and bring your ideas to life.
//         </p>
//         <button className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
//           Get Started
//         </button>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

//option3

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import {
//   WrenchScrewdriverIcon,
//   BuildingOffice2Icon,
//   HomeModernIcon,
// } from "@heroicons/react/24/outline";

// export default function Services() {
//   const services = [
//     {
//       title: "Renovation",
//       description:
//         "Upgrade and modernize your space with high-quality renovation solutions.",
//       icon: <HomeModernIcon className="w-14 h-14 text-indigo-600" />,
//     },
//     {
//       title: "New Construction",
//       description:
//         "We handle complete construction projects with precision and excellence.",
//       icon: <BuildingOffice2Icon className="w-14 h-14 text-indigo-600" />,
//     },
//     {
//       title: "Repair & Maintenance",
//       description:
//         "Fast, reliable repairs and ongoing maintenance for all types of properties.",
//       icon: <WrenchScrewdriverIcon className="w-14 h-14 text-indigo-600" />,
//     },
//   ];

//   return (
//     <AuthenticatedLayout>
//       <Head title="Services" />

//       {/* Hero Section */}
//       <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
//         <div className="max-w-7xl mx-auto px-6 py-16 text-center">
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
//             Our Services
//           </h1>
//           <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Whether you’re planning a renovation, building from scratch, or need
//             quick repairs, we provide solutions you can trust.
//           </p>
//         </div>
//       </div>

//       {/* Services Grid */}
//       <div className="py-16 bg-gray-50 dark:bg-gray-950">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
//               >
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   {service.icon}
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     {service.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
//                     {service.description}
//                   </p>
//                   <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition">
//                     Select
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-indigo-600 text-white py-12 text-center">
//         <h3 className="text-2xl md:text-3xl font-bold">
//           Ready to start your project?
//         </h3>
//         <p className="mt-3 text-lg opacity-90">
//           Get in touch with our team and let’s make your vision a reality.
//         </p>
//         <button className="mt-6 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
//           Contact Us
//         </button>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import {
//   WrenchScrewdriverIcon,
//   BuildingOffice2Icon,
//   HomeModernIcon,
// } from "@heroicons/react/24/outline";

// export default function Services() {
//   const services = [
//     {
//       title: "Renovation",
//       description:
//         "Breathe new life into your home, apartment, or office with our renovation services.",
//       icon: <HomeModernIcon className="w-14 h-14 text-white" />,
//       color: "from-pink-500 to-red-500",
//     },
//     {
//       title: "New Construction",
//       description:
//         "We handle end-to-end construction projects with quality materials and skilled labor.",
//       icon: <BuildingOffice2Icon className="w-14 h-14 text-white" />,
//       color: "from-indigo-500 to-blue-600",
//     },
//     {
//       title: "Repair & Maintenance",
//       description:
//         "Fast, affordable, and reliable repair services for houses, apartments, and offices.",
//       icon: <WrenchScrewdriverIcon className="w-14 h-14 text-white" />,
//       color: "from-yellow-500 to-orange-500",
//     },
//   ];

//   return (
//     <AuthenticatedLayout>
//       <Head title="Services" />

//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold">
//           Pick the Service You Need
//         </h1>
//         <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
//           Select from our range of professional construction services — designed
//           to meet your needs with quality and care.
//         </p>
//       </div>

//       {/* Services Grid with Flip Effect */}
//       <div className="py-16 bg-gray-100 dark:bg-gray-950">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="relative h-72 group [transform-style:preserve-3d] duration-700 cursor-pointer"
//               >
//                 {/* Front Side */}
//                 <div
//                   className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center text-center p-6 shadow-xl transform transition-all group-hover:rotate-y-180 bg-gradient-to-r ${service.color}`}
//                 >
//                   {service.icon}
//                   <h3 className="mt-4 text-2xl font-semibold text-white">
//                     {service.title}
//                   </h3>
//                 </div>

//                 {/* Back Side */}
//                 <div className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-800 p-6 flex flex-col items-center justify-center text-center shadow-xl rotate-y-180 [backface-visibility:hidden] group-hover:rotate-y-0 transition-all">
//                   <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
//                     {service.description}
//                   </p>
//                   <button className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
//                     Select
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 text-center">
//         <h3 className="text-2xl md:text-3xl font-bold">
//           Your Project, Our Expertise
//         </h3>
//         <p className="mt-3 text-lg opacity-90">
//           Ready to bring your vision to life? Let’s get started today.
//         </p>
//         <button className="mt-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">
//           Get a Quote
//         </button>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

