import {
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  Renovation: <HomeModernIcon className="w-12 h-12 text-yellow-400" />,
  "New Construction": <BuildingOffice2Icon className="w-12 h-12 text-yellow-400" />,
  "Repair & Maintenance": <WrenchScrewdriverIcon className="w-12 h-12 text-yellow-400" />,
  "Other Services": <PuzzlePieceIcon className="w-12 h-12 text-yellow-400" />,
};

export default function ServicesGrid({
  services,
  showSelect = false,
  onSelect,
}) {
  console.log(services)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="relative group rounded-3xl overflow-hidden shadow-lg bg-white"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm"
            style={{ backgroundImage: `url(/storage/${service.image})` }}
          />
          <div className="absolute inset-0 bg-black/70" />

          {/* Content */}
          <div className="relative z-10 p-8 text-center flex flex-col items-center h-full space-y-4">
            {service.icon}
            <h3 className="text-2xl font-bold text-white">
              {service.title}
            </h3>
            <p className="text-gray-200 text-sm">
              {service.description}
            </p>

            {showSelect && (
              <button
                onClick={() => onSelect(service)}
                className="mt-4 bg-yellow-400 px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                Select
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
