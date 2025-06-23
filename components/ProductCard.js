import Link from 'next/link';

export default function ProductCard({ product }) {
  // Fungsi untuk format harga ke Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
      <Link href={`/produk/${product.id}`}>
        <div className="cursor-pointer">
          <div className="h-48 overflow-hidden">
            <img 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              src={product.imageUrl} 
              alt={`[Gambar ${product.name}]`}
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-800 truncate">{product.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{product.category}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-teal-600">{formatPrice(product.price)}</span>
              <span className="text-sm font-medium text-white bg-teal-500 py-1 px-3 rounded-full group-hover:bg-teal-600 transition-colors">
                Detail
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
