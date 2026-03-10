import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage,Head, router } from "@inertiajs/react";
import ServicesGrid from "@/Components/ServicesGrid";
import ServiceRequestModal from "@/Components/ServiceRequestModal";

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
   const [activeService, setActiveService] = useState(null);
   
  const { all_services, services_offer, manage_appointment, flash, client_assign_slot, user } = usePage().props;
  const [showFlash, setShowFlash] = useState(!!flash?.success);
  const [formData, setFormData] = useState({
    services_id: null,
    category: null,
    description: "",
    file: null,
    appointment: null,
    location: {
      lat: null,
      lng: null,
      address: ""
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (flash?.success) {
        setShowFlash(true);

        // Play alert sound
        const audio = new Audio("/sounds/notify.mp3"); // put your alert sound in public/sounds/
        audio.play();

        // Auto-close after 5 seconds
        const timer = setTimeout(() => {
            setShowFlash(false);
        }, 5000);

        return () => clearTimeout(timer);
    }
  }, [flash?.success]);

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
  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setFormData(prev => ({ ...prev, category: catId }));
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
          { user.id && (
             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-14 text-center">
              Choose Your Service
            </h2>
          )}

          <ServicesGrid
            services={allservices}
            showSelect
            onSelect={(service) => setActiveService(service)}
          />

          {activeService && (
            <ServiceRequestModal
              manageAppointments={manage_appointment}
              client_assign_slot={client_assign_slot}
              service={activeService}
              allcategories={services_offer}
              isAuthenticated={user}
              onClose={() => setActiveService(null)}
            />
          )}

        </div>
      </section>

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
        
        {showFlash && (
          <div 
              className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl 
                        border-l-4 border-green-700 flex items-center gap-3 animate-slideIn"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                  />
              </svg>
              <span>{flash.success}</span>
          </div>
      )}

    </AuthenticatedLayout>
  );
}
