import { Suspense } from 'react';
import RecipeList from '../../components/RecipeList';
import BackButton from '../../components/BackButton';

export async function getServerSideProps({ query }) {
  const { query: searchQuery, cuisine, maxReadyTime } = query;
  
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
    params.append('apiKey', process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY);
    params.append('number', '12');
    params.append('addRecipeInformation', 'true');

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    console.log('API Response:', data);

    return {
      props: {
        recipes: data.results || [],
        error: null,
      }
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      props: {
        recipes: [],
        error: 'Failed to fetch recipes. Please try again later.',
      }
    };
  }
}

export default function Recipes({ recipes, error }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Found Recipes</h1>
        
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <Suspense fallback={<div className="text-center py-12">Loading recipes...</div>}>
            <RecipeList recipes={recipes} />
          </Suspense>
        )}
      </div>
    </div>
  );
} 