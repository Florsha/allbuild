export default function ClientInfo({ description, file,error, onDescriptionChange, onFileChange }) {

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Project Description</h3>
      {error && (
        <p className="text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Project Description"
        className={`w-full rounded-lg px-4 py-2 border
          ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
        `}
        rows="4"
      ></textarea>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files[0])}
        className="w-full border rounded-lg px-4 py-2"
      />
    </div>
  );
}