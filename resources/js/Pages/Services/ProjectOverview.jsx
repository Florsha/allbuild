export default function ProjectOverview({ service, allcategories = [], selectedCategory, onCategorySelect }) {
  if (!service) return null; // nothing to show until service is passed
  console.log("allcategories::", allcategories);
  console.log("selectedCategory::", selectedCategory);
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
          {allcategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`group px-4 py-3 text-sm font-medium border border-gray-200 rounded-xl 
                  bg-gray-50 hover:bg-yellow-400 hover:text-white hover:border-yellow-500 
                  transition duration-200 shadow-sm flex items-center justify-center gap-2
                  ${
                    isActive
                      ? "bg-yellow-400 text-white border-yellow-500"
                      : "bg-gray-50 border-gray-300 hover:bg-yellow-400 hover:text-white hover:border-yellow-500"
                  }
                `}
              >
                
                {cat.icon}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}