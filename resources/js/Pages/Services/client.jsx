import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

export default function Services() {
  const [activeModal, setActiveModal] = useState(null); // track which modal is open

  const services = [
    {
      key: "renovation",
      title: "Renovation",
      description:
        "Give your space a fresh new look. From kitchens to offices, we bring modern upgrades to life.",
      icon: <HomeModernIcon className="w-12 h-12 text-yellow-400" />,
      image:
        "https://cdn.prod.website-files.com/642c021ff5e1407cd1335eaf/64492986462df701b91ad74d_House%20Renovation%20Feature.jpg",
      details:
        "Our renovation service covers small adjustments to major overhauls. Ideal for refreshing spaces while keeping existing structures.",
    },
    {
      key: "construction",
      title: "New Construction",
      description:
        "We manage entire construction projects from foundation to finishing, with quality you can trust.",
      icon: <BuildingOffice2Icon className="w-12 h-12 text-yellow-400" />,
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details:
        "From planning to completion, our new construction service ensures high standards, durable structures, and modern designs.",
    },
    {
      key: "repair",
      title: "Repair & Maintenance",
      description:
        "Reliable and efficient repair solutions for houses, apartments, and commercial buildings.",
      icon: <WrenchScrewdriverIcon className="w-12 h-12 text-yellow-400" />,
      image:
        "https://www.unitedintoman.com/wp-content/uploads/2022/10/4-1.jpg",
      details:
        "Quick, reliable repairs and ongoing maintenance to keep your property in top shape.",
    },
  ];

  const categories = [
    "Building",
    "Residential",
    "Road",
    "Gate",
    "WaterLine",
    "Plumbing",
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Services" />

      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1581090700227-4c4c15f9b4ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Professional Construction Services
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
            Renovation, new builds, or quick repairs — we provide trusted,
            high-quality services tailored to your needs.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Choose Your Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service.key}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all"></div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col items-center text-center space-y-4 backdrop-blur-md bg-white/10 rounded-2xl">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm">{service.description}</p>
                  <button
                    onClick={() => setActiveModal(service.key)}
                    className="mt-4 bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all scale-95 animate-fadeIn">
            {/* Header Image */}
            <div className="relative h-48 md:h-60 w-full">
              <img
                src={
                  services.find((s) => s.key === activeModal)?.image ||
                  "https://via.placeholder.com/800"
                }
                alt="Service"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 right-3 bg-white/80 rounded-full p-2 text-gray-700 hover:bg-white hover:text-red-500 shadow"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {services
                .filter((s) => s.key === activeModal)
                .map((s) => (
                  <div key={s.key} className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      {s.icon} {s.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{s.details}</p>

                    {/* Category Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Select a Category
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            className="px-4 py-3 text-sm font-medium border border-gray-300 rounded-xl shadow-sm bg-gray-50 hover:bg-yellow-400 hover:text-white hover:border-yellow-500 transition"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}


      {/* CTA Section */}
      <div className="bg-yellow-400 text-gray-900 py-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold">
          Let’s Build Something Great Together
        </h3>
        <p className="mt-3 text-lg opacity-90">
          Schedule a consultation today and bring your ideas to life.
        </p>
        <button className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
          Get Started
        </button>
      </div>
    </AuthenticatedLayout>
  );
}
