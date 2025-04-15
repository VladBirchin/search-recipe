import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recipe App
          </h1>
        </div>

        <div className="bg-white p-8 rounded-lg">
          <SearchForm />
        </div>
      </div>
    </div>
  );
} 