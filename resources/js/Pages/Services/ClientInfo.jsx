export default function ClientInfo({ description, file, onDescriptionChange, onFileChange }) {

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Project Description</h3>

      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Project Description"
        className="w-full border rounded-lg px-4 py-2"
        rows="3"
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