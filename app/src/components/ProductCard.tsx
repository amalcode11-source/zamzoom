import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface Product {
  id: string;
  slug: string;
  title: string;
  priceCents: number;
  unit: string;
  unitSize: number;
  imageUrl?: string;
  category: string;
  stock: number;
  description?: string;
}

interface ProductCardProps {
  product?: Product;
  loading?: boolean;
}

export function ProductCard({ product, loading }: ProductCardProps) {
  const { addItem } = useCart();

  if (loading) {
    return (
      <div className="card overflow-hidden">
        <div className="h-48 bg-gray-200 animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const formatPrice = (priceCents: number) => {
    return (priceCents / 100).toFixed(2);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
  };

  return (
    <div className="card overflow-hidden group hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">
                {product.category === 'honey' ? '🍯' : 
                 product.category === 'nuts' ? '🥜' : '🍯'}
              </span>
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          
          <div className="absolute top-2 right-2">
            <div className="bg-white rounded-full p-1 shadow-md">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary-600">
                ₹{formatPrice(product.priceCents)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                / {product.unitSize}{product.unit}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Category: {product.category}</span>
            {product.stock > 0 && (
              <span>{product.stock} in stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}