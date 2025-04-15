import Link from 'next/link';
import Image from 'next/image';

export default function RecipeCard({ recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[420px] flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl">
        <div className="relative h-52 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-800 mb-3 line-clamp-2 h-14">
            {recipe.title}
          </h2>
          <div className="mt-auto">
            <p className="text-sm text-neutral-600">
              ⏱️ Cooking time: <span className="font-medium">{recipe.readyInMinutes} min</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
