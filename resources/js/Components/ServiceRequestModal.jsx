import { useState, useEffect } from "react";
import { usePage,Head, router } from "@inertiajs/react";
import ProjectOverview from "../Pages/Services/ProjectOverview";
import ClientInfo from "../Pages/Services/ClientInfo";
import Appointment from "../Pages/Services/Appointment";
import Location from "../Pages/Services/Location";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

export default function ServiceRequestModal({
  manageAppointments,
  client_assign_slot,
  service,
  allcategories,
  isAuthenticated,
  onClose,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    services_id: service.id,
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

  const handleNext = () => {
    // Step 2 validation
    if (step === 2) {
      if (!formData.description || formData.description.trim() === "") {
        setErrors({ description: "Project description is required" });
        return; // STOP here
      }
    }

    if (step === 3 && (!formData.appointment || formData.appointment.length === 0)) {
      setErrors(prev => ({ ...prev, appointment: "You must select an appointment before proceeding." }));
      return;
    }

    // clear errors when valid
    setErrors({});
    setStep(step + 1);
  };

  const handleSubmit = () => {
    console.log("Submitting...", formData);
    setIsSubmitting(true);
    router.post('/services-request', formData, {
      onSuccess: () => {
        onClose();
            setStep(1);
            setSelectedCategory(null);

            setFormData({
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
            });

            setIsSubmitting(false);
        },
        onError: () => {
      setIsSubmitting(false); // ❌ HIDE LOADER EVEN ON ERROR
    }
    })
    
  }
console.log(activeModal)

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-6">
        <div className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] overflow-y-auto">

          {/* Header Image */}
          <div className="relative h-64">
            <img
              src={`/storage/${service.image}`}
              className="w-full h-full object-cover rounded-t-3xl"
            />
            <button onClick={onClose} className="absolute top-4 right-4 bg-white p-2 rounded-full">
              ✕
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Stepper */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className={`w-9 h-9 flex items-center justify-center rounded-full font-bold ${
                    step === n ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>

            {/* Steps */}
            {step === 1 && (
              <ProjectOverview
                service={service}
                allcategories={allcategories}
                selectedCategory={selectedCategory}
                onCategorySelect={(id) => {
                  setSelectedCategory(id);
                  setFormData((p) => ({ ...p, category: id }));
                }}
              />
            )}

            {step === 2 && (
              <ClientInfo
                onDescriptionChange={(val) =>
                  setFormData((p) => ({ ...p, description: val }))
                }
                onFileChange={(val) =>
                  setFormData((p) => ({ ...p, file: val }))
                }
              />
            )}

            {step === 3 && <Appointment  error={errors.appointment} client_slot={client_assign_slot} manageAppointments={manageAppointments}
              onAppointmentChange={(val) =>
                setFormData(prev => ({ ...prev, appointment: val }))
              }
            />}

            {step === 4 && <Location onLocationChange={(loc) =>
              setFormData((p) => ({ ...p, location: loc }))
            } />}

            {/* ACTIONS */}
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)}>Back</button>
              )}

              {step < 4 ? (
                <button onClick={handleNext} className="bg-yellow-400 px-6 py-2 rounded-lg">
                  Next
                </button>
              ) : (
                isAuthenticated ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg"
                  >
                    Submit Request
                  </button>
                ) : (
                 <div className="flex gap-3 ml-auto">
                  <button
                    onClick={() => setActiveModal("login")}
                    className="bg-gray-200 px-5 py-2 rounded-lg"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setActiveModal("register")}
                    className="bg-yellow-400 px-5 py-2 rounded-lg"
                  >
                    Register
                  </button>
                </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

            {/* Text */}
            <p className="text-white text-lg font-semibold">
              Submitting request...
            </p>
          </div>
        </div>
      )}
      
      {activeModal === "login" && (
        <LoginModal
          isOpen={true} 
          onClose={() => setActiveModal(null)}
          onSuccess={() => {
            setActiveModal(null);
            handleSubmit(); // auto-submit after login
          }}
        />
      )}

      {activeModal === "register" && (
        <RegisterModal
          isOpen={true} 
          onClose={() => setActiveModal(null)}
          onSuccess={() => {
            setActiveModal(null);
            handleSubmit(); // auto-submit after register
          }}
        />
      )}
    </>
  );
}
