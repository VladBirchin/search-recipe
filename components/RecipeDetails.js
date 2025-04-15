import Image from 'next/image';

export default function RecipeDetails({ recipe }) {
  if (!recipe) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-xl font-medium">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-96 w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {recipe.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Cooking Time</p>
            <p className="text-lg font-semibold text-blue-600">{recipe.readyInMinutes} min</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Servings</p>
            <p className="text-lg font-semibold text-blue-600">{recipe.servings}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Difficulty</p>
            <p className="text-lg font-semibold text-blue-600">
              {recipe.dishTypes?.join(', ') || 'Not specified'}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients:</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center text-gray-700 bg-gray-100 px-4 py-2 rounded-lg transition-colors hover:bg-gray-200"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions:</h2>
          <div className="prose max-w-none">
            {recipe.instructions?.split('\n').map((step, index) => (
              <p
                key={index}
                className="text-gray-700 mb-3 pl-5 border-l-4 border-blue-500 transition-all hover:bg-blue-50"
              >
                {step.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}