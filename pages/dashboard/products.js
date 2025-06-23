// File: /pages/dashboard/products.js (Versi Final & Paling Stabil)

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// --- KOMPONEN MODAL (Tidak ada perubahan di sini, sudah baik) ---
const ProductModal = ({ product, onClose, onSave, isSubmitting }) => {
    const [formData, setFormData] = useState(
        product ? { name: product.name, price: product.price, description: product.description } : { name: '', price: '', description: '' }
    );
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || '');
    const isEditing = !!product;

    const handleChange = (e) => setFormData(prev => ({ ...prev, [name]: e.target.value }));
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onSave(formData, product.id);
        } else {
            const submissionData = new FormData();
            Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
            if (selectedFile) submissionData.append('file', selectedFile);
            onSave(submissionData, null);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                        <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Harga</label>
                        <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" className="mt-1 p-2 border rounded w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gambar Produk</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {previewUrl && <Image src={previewUrl} alt="Preview" width={100} height={100} className="mt-2 rounded" />}
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Batal</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300">{isSubmitting ? 'Menyimpan...' : 'Simpan'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- KOMPONEN UTAMA HALAMAN ---
const ProductsDashboard = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Gagal memuat produk.');
            const data = await response.json();
            setProducts(data);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status === 'authenticated' && session.user.role === 'admin') {
            fetchProducts();
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, session, router, fetchProducts]);

    const handleSave = async (data, productId) => {
        setIsSubmitting(true);
        const isEditing = !!productId;
        const url = isEditing ? `/api/products/${productId}` : '/api/products';
        const method = isEditing ? 'PUT' : 'POST';

        let body;
        let headers = {};

        if (isEditing) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        } else {
            body = data; // FormData
        }

        try {
            const response = await fetch(url, { method, headers, body });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Gagal ${isEditing ? 'memperbarui' : 'menambah'} produk.`);
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            await fetchProducts();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleDelete = async (productId) => {
        if (window.confirm('Anda yakin ingin menghapus produk ini?')) {
            try {
                const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Gagal menghapus produk.');
                await fetchProducts();
            } catch (err) {
                alert(err.message);
            }
        }
    };
    
    if (status === 'loading') return <div className="p-6">Memeriksa sesi...</div>;

    return (
        <>
            {isModalOpen && <ProductModal product={editingProduct} onClose={() => { setIsModalOpen(false); setEditingProduct(null); }} onSave={handleSave} isSubmitting={isSubmitting} />}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Manajemen Produk</h1>
                    <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
                        <PlusCircle size={20} className="mr-2" /> Tambah Produk
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {isLoading ? <p className="text-center p-4">Memuat data produk...</p> : error ? <p className="text-center p-4 text-red-500">Error: {error}</p> :
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4">Gambar</th><th className="p-4">Nama Produk</th><th className="p-4">Harga</th><th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? products.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">{product.imageUrl && typeof product.imageUrl === 'string' && product.imageUrl.startsWith('http') ? <Image src={product.imageUrl} alt={product.name} width={60} height={60} className="rounded object-cover" onError={(e) => { e.target.style.display = 'none' }} /> : <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>}</td>
                                        <td className="p-4 font-medium">{product.name}</td>
                                        <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</td>
                                        <td className="p-4 flex items-center gap-4">
                                            <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><Edit size={16} /> Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={16} /> Hapus</button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="4" className="p-4 text-center text-gray-500">Belum ada produk. Klik "Tambah Produk" untuk memulai.</td></tr>}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default ProductsDashboard;