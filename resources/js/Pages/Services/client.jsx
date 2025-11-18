import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage,Head } from "@inertiajs/react";
import {
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  PuzzlePieceIcon,
  TruckIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";

import ProjectOverview from "./ProjectOverview";
import ClientInfo from "./ClientInfo";
import Appointment from "./Appointment";
import Location from "./Location";

export default function Services() {
  const [activeModal, setActiveModal] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { all_services, services_offer } = usePage().props;

  console.log(services_offer);
  // const services = [
  //   {
  //     key: "renovation",
  //     title: "Renovation",
  //     description:
  //       "Give your space a fresh new look. From kitchens to offices, we bring modern upgrades to life.",
  //     icon: <HomeModernIcon className="w-12 h-12 text-yellow-400" />,
  //     image:
  //       "https://cdn.prod.website-files.com/642c021ff5e1407cd1335eaf/64492986462df701b91ad74d_House%20Renovation%20Feature.jpg",
  //     details:
  //       "Our renovation service covers small adjustments to major overhauls. Ideal for refreshing spaces while keeping existing structures.",
  //   },
  //   {
  //     key: "construction",
  //     title: "New Construction",
  //     description:
  //       "We manage entire construction projects from foundation to finishing, with quality you can trust.",
  //     icon: <BuildingOffice2Icon className="w-12 h-12 text-yellow-400" />,
  //     image:
  //       "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     details:
  //       "From planning to completion, our new construction service ensures high standards, durable structures, and modern designs.",
  //   },
  //   {
  //     key: "repair",
  //     title: "Repair & Maintenance",
  //     description:
  //       "Reliable and efficient repair solutions for houses, apartments, and commercial buildings.",
  //     icon: <WrenchScrewdriverIcon className="w-12 h-12 text-yellow-400" />,
  //     image:
  //       "https://www.unitedintoman.com/wp-content/uploads/2022/10/4-1.jpg",
  //     details:
  //       "Quick, reliable repairs and ongoing maintenance to keep your property in top shape.",
  //   },
  //   {
  //     key: "services",
  //     title: "Other Services",
  //     description:
  //       "Specialized solutions tailored to your unique needs, including design, landscaping, and custom projects.",
  //     icon: <PuzzlePieceIcon className="w-12 h-12 text-yellow-400" />,
  //     image:
  //       "https://images.unsplash.com/photo-1600585154084-4e5fe7c1c7e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //     details:
  //       "Our other services include interior design consultation, landscaping, painting, electrical work, plumbing, and customized construction requests. Perfect for clients looking for tailored solutions to complete their project.",
  //   },
  // ];

    // Map service titles to icons (optional)
  const iconMap = {
    Renovation: <HomeModernIcon className="w-12 h-12 text-yellow-400" />,
    "New Construction": <BuildingOffice2Icon className="w-12 h-12 text-yellow-400" />,
    "Repair & Maintenance": <WrenchScrewdriverIcon className="w-12 h-12 text-yellow-400" />,
    "Other Services": <PuzzlePieceIcon className="w-12 h-12 text-yellow-400" />,
  };

   // Dynamic services from backend
  const allservices = all_services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    details: service.details,
    image: service.image ?? "https://via.placeholder.com/400x300?text=No+Image", // fallback image
    icon: iconMap[service.title] || <PuzzlePieceIcon className="w-12 h-12 text-yellow-400" />,
  }));

  // const categories = [
  //   "Building",
  //   "Residential",
  //   "Road",
  //   "Gate",
  //   "WaterLine",
  //   "Plumbing",
  // ];

  const categoryIconMap = {
    Building: <BuildingOffice2Icon className="w-6 h-6 text-yellow-400 group-hover:text-white" />,
    Residential: <HomeModernIcon className="w-6 h-6 text-yellow-400 group-hover:text-white" />,
    Road: <TruckIcon className="w-6 h-6 text-yellow-400 group-hover:text-white" />,
    Gate: <PuzzlePieceIcon className="w-6 h-6 text-yellow-400 group-hover:text-white" />,
    WaterLine: <BeakerIcon className="w-6 h-6 text-yellow-400 group-hover:text-white" />,
    Plumbing: <WrenchScrewdriverIcon className="w-6 h-6 text-yellow-400 group-hover:text-white" />,
  };

  const allcategories = services_offer.map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: categoryIconMap[cat.title] || <PuzzlePieceIcon className="w-6 h-6 text-yellow-400" />,
  }));
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setStep(1);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Services" />

      {/* HERO SECTION */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1581090700227-4c4c15f9b4ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Professional Construction Services
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-100 opacity-90 leading-relaxed">
            Renovation, new builds, or quick repairs — we deliver quality and
            excellence from concept to completion.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-14 text-center">
            Choose Your Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allservices.map((service) => (
              <div
                key={service.id}
                className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
              >
                <div
                  // className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500 blur-sm"
                  style={{ backgroundImage: `url(/storage/${service.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-all"></div>

                <div className="relative z-10 p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                  <div className="transform group-hover:scale-110 transition duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setActiveModal(service.id)}
                    className="mt-5 bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 shadow-md hover:shadow-lg transition"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="relative h-56 md:h-72 w-full">
              <img
                src={
                  allservices.find((s) => s.id === activeModal)?.image
                      ? `/storage/${allservices.find((s) => s.id === activeModal).image}`
                      : "https://via.placeholder.com/800"
                  }
                alt="Service"
                className="w-full h-full object-cover rounded-t-3xl"
              />
              <button
                onClick={() => {
                  setActiveModal(null);
                  setStep(1);
                  setSelectedCategory(null);
                }}
                className="absolute top-3 right-3 bg-white/90 hover:bg-red-500 hover:text-white rounded-full p-2 shadow-lg transition"
              >
                ✕
              </button>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              {!selectedCategory ? (
                <>
                  {allservices
                    .filter((s) => s.id === activeModal)
                    .map((s) => (
                      <div key={s.id} className="space-y-5">
                        <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                          {s.icon} {s.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {s.details}
                        </p>

                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-4">
                            Select a Category
                          </h4>
                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {allcategories && allcategories.length > 0 ? (
                              allcategories.map((cat) => (
                               <button
                                  key={cat.id}
                                  onClick={() => handleCategoryClick(cat.id)}
                                  className="group px-4 py-3 text-sm font-medium border border-gray-200 rounded-xl 
                                            bg-gray-50 hover:bg-yellow-400 hover:text-white hover:border-yellow-500 
                                            transition duration-200 shadow-sm flex items-center justify-center gap-2"
                                >
                                  {cat.icon}
                                  <span>{cat.title}</span>
                                </button>
                              ))
                            ) : (
                              <p className="col-span-full text-gray-500 text-sm">No categories available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {/* STEPPER */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-3">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm transition ${
                            step === n
                              ? "bg-yellow-400 text-gray-900 scale-110 shadow"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {selectedCategory} Project
                    </span>
                  </div>

                  {/* FORMS */}
                  {step === 1 && (
                    <ProjectOverview
                      service={allservices.find((s) => s.id === activeModal)}
                      allcategories={allcategories}
                      selectedCategory={selectedCategory}
                      onCategorySelect={setSelectedCategory}
                    />
                  )}
                  {step === 2 && <ClientInfo />}
                  {step === 3 && <Appointment />}
                  {step === 4 && <Location />}

                  {/* NAVIGATION BUTTONS */}
                  <div className="flex justify-between mt-10">
                    {step > 1 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition"
                      >
                        Back
                      </button>
                    )}
                    {step < 4 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="ml-auto px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={() => alert('Form submitted!')}
                        className="ml-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <section className="bg-yellow-400 text-gray-900 py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-3">
          Let’s Build Something Great Together
        </h3>
        <p className="mt-2 text-lg opacity-90 max-w-xl mx-auto leading-relaxed">
          Schedule a consultation today and bring your ideas to life with our
          expert team.
        </p>
      </section>
    </AuthenticatedLayout>
  );
}
