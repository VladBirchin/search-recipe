import { Suspense } from 'react';
import RecipeDetails from '../../components/RecipeDetails';
import BackButton from '../../components/BackButton';

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }

    const recipe = await response.json();
    console.log('Recipe Details Response:', recipe);

    return {
      props: {
        recipe,
        error: null,
      }
    };
  } catch (error) {
    console.error('Recipe Details Error:', error);
    return {
      props: {
        recipe: null,
        error: 'Failed to fetch recipe details. Please try again later.',
      }
    };
  }
}

export default function RecipePage({ recipe, error }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <Suspense fallback={<div className="text-center py-12">Loading recipe details...</div>}>
            <RecipeDetails recipe={recipe} />
          </Suspense>
        )}
      </div>
    </div>
  );
} 