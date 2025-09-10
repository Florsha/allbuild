export default function ClientInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">
        Project Description
      </h3>
      <form className="space-y-4">
        <textarea
          placeholder="Project Description"
          className="w-full border rounded-lg px-4 py-2"
          rows="3"
        ></textarea>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Blueprint
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </form>
    </div>
  );
}
