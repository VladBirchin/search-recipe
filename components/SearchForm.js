import { useState } from 'react';
import { useRouter } from 'next/router';

const cuisines = [
  'Italian',
  'Mexican',
  'Chinese',
  'Japanese',
  'Indian',
  'Mediterranean',
  'American',
  'Thai',
];

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    query: '',
    cuisine: '',
    maxReadyTime: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (formData.query) params.append('query', formData.query);
    if (formData.cuisine) params.append('cuisine', formData.cuisine);
    if (formData.maxReadyTime) params.append('maxReadyTime', formData.maxReadyTime);

    router.push(`/recipes?${params.toString()}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(formData).some((value) => value !== '');

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Find a Recipe</h2>

      <div>
        <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
          Search by Keyword
        </label>
        <input
          type="text"
          id="query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="e.g. pasta, chicken, salad..."
        />
      </div>

      <div>
        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
          Cuisine
        </label>
        <select
          id="cuisine"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        >
          <option value="">Select a cuisine</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="maxReadyTime" className="block text-sm font-medium text-gray-700 mb-1">
          Max Cooking Time (minutes)
        </label>
        <input
          type="number"
          id="maxReadyTime"
          name="maxReadyTime"
          value={formData.maxReadyTime}
          onChange={handleChange}
          min="1"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="e.g. 30"
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition ${
          isFormValid
            ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </form>
  );
}
