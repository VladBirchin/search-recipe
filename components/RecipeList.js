import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl">
        <p className="text-gray-500 text-xl font-medium">No recipes found</p>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className="transform transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}