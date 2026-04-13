'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Bike } from '@/lib/types';
import { getBikes, deleteBike, upsertBike } from '@/lib/api';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, LogOut, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formId, setFormId] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  
  // File Upload State
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBikes();
  }, []);

  const loadBikes = async () => {
    setLoading(true);
    const data = await getBikes();
    setBikes(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormId('');
    setName('');
    setShortName('');
    setColor('');
    setDescription('');
    setPrice('');
    setFiles([]);
    setExistingImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const editBike = (bike: Bike) => {
    setIsEditing(true);
    setFormId(bike.id);
    setName(bike.name);
    setShortName(bike.shortName || '');
    setColor(bike.color || '');
    setDescription(bike.description || '');
    setPrice(bike.price);
    setExistingImages(bike.images || (bike.image ? [bike.image] : []));
    setFiles([]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bike?')) return;
    try {
      await deleteBike(id);
      await loadBikes();
    } catch (err) {
      alert('Failed to delete bike');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (existingImages.length + files.length + selected.length > 5) {
      alert('You can only upload a maximum of 5 images per bike posting.');
      return;
    }
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${ext}`;
      const { data, error } = await supabase.storage
        .from('bike-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error('Failed to upload an image.');
      }

      const { data: publicData } = supabase.storage.from('bike-images').getPublicUrl(data.path);
      uploadedUrls.push(publicData.publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === '') return alert('Name and Price are required.');
    
    setSaving(true);
    try {
      // 1. Upload new files if any
      let newImageUrls: string[] = [];
      if (files.length > 0) {
        newImageUrls = await uploadImages();
      }

      // 2. Combine existing and new images
      const finalImages = [...existingImages, ...newImageUrls];
      
      // 3. Prepare Bike Object
      const bikeData: Partial<Bike> = {
        name,
        shortName,
        color,
        description,
        price: Number(price),
        image: finalImages.length > 0 ? finalImages[0] : undefined,
        images: finalImages,
      };

      if (!isEditing) {
        // Create new ID
        bikeData.id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      } else {
        bikeData.id = formId; // Use existing ID
      }

      // 4. Save to DB
      await upsertBike(bikeData);
      
      // 5. Cleanup
      resetForm();
      await loadBikes();
      alert('Bike saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Error saving bike');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray font-montserrat">
      {/* Navbar */}
      <header className="bg-brand-black text-white p-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="font-playfair text-2xl font-bold">Manage Minibikes</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-brand-gold hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-lg">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 self-start sticky top-28">
          <h2 className="font-playfair text-xl font-bold mb-6 flex items-center gap-2 text-[#111]">
            <Plus size={20} className="text-brand-gold" />
            {isEditing ? 'Edit Minibike' : 'Post New Minibike'}
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:border-brand-gold outline-none" placeholder="e.g. Built to order: Lil' Hustler" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Short Name</label>
                <input value={shortName} onChange={e => setShortName(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:border-brand-gold outline-none" placeholder="Lil Hustler" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Price ($)</label>
                <input required type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:border-brand-gold outline-none" placeholder="2490" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:border-brand-gold outline-none resize-none" placeholder="Description..." />
            </div>

            {/* Images Uploader section */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Images (Max 5)</label>
              
              <div className="flex flex-wrap gap-3 mb-2">
                {/* Existing Images */}
                {existingImages.map((src, idx) => (
                  <div key={`existing-${idx}`} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={src} className="w-full h-full object-cover" alt="bike preview" />
                    <button type="button" onClick={() => removeExistingImage(idx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {/* New Files */}
                {files.map((file, idx) => (
                  <div key={`file-${idx}`} className="relative w-16 h-16 rounded-lg overflow-hidden border border-brand-gold group">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="bike preview" />
                    <button type="button" onClick={() => removeFile(idx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                {/* Add button */}
                {existingImages.length + files.length < 5 && (
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>
              <input type="file" min="1" max="5" accept="image/*" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <p className="text-[10px] text-gray-400">First image will be used as the main cover picture.</p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button disabled={saving} type="submit" className="flex-1 bg-brand-black text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? 'Saving...' : (isEditing ? 'Update Bike' : 'Upload Bike')}
              </button>
              {isEditing && (
                <button type="button" disabled={saving} onClick={resetForm} className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Bikes List */}
        <div className="lg:col-span-2">
          <h2 className="font-playfair text-2xl font-bold mb-6 text-[#111]">Live Garage</h2>
          
          {loading ? (
            <p className="text-gray-500 p-10 text-center bg-white rounded-2xl border border-gray-100">Loading bikes...</p>
          ) : bikes.length === 0 ? (
            <div className="text-center bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center">
              <ImageIcon className="text-gray-300 w-16 h-16 mb-4" />
              <h3 className="text-xl font-bold text-[#111] mb-2">No Minibikes Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">Use the form on the left to upload your first minibike post.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bikes.map(bike => (
                <div key={bike.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  {/* Image Area */}
                  <div className="w-full aspect-[4/3] bg-gray-100 relative group">
                    {bike.image ? (
                      <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={32} /></div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                      <button onClick={() => editBike(bike)} className="bg-white text-[#111] px-4 py-2 rounded font-bold text-xs hover:bg-[#c9a84c] hover:text-white transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(bike.id)} className="bg-red-500 text-white px-4 py-2 rounded font-bold text-xs hover:bg-red-600 transition-colors flex items-center gap-1">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                  {/* Info Area */}
                  <div className="p-4 flex flex-col items-start gap-1">
                    <p className="text-[10px] text-[#c9a84c] font-bold uppercase tracking-widest">{bike.images?.length || 0} images attached</p>
                    <h3 className="font-bold text-[#111] leading-tight line-clamp-1">{bike.name}</h3>
                    <p className="text-gray-500 font-medium">${Number(bike.price).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
