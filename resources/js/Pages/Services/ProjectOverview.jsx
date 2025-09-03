export default function ProjectOverview({ service, categories = [] }) {
  if (!service) return null; // nothing to show until service is passed

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        {service.icon} {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{service.details}</p>

      {/* Categories */}
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
  );
}
