export default function ProjectOverview({ service, categories = [], selectedCategory, onCategorySelect }) {
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
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`px-4 py-3 text-sm font-medium border rounded-xl shadow-sm transition
                  ${
                    isActive
                      ? "bg-yellow-400 text-white border-yellow-500"
                      : "bg-gray-50 border-gray-300 hover:bg-yellow-400 hover:text-white hover:border-yellow-500"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}