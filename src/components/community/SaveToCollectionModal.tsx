import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Bookmark, Check, FolderPlus } from 'lucide-react';
import { RecipeCollection, Post } from './types';

interface SaveToCollectionModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  collections: RecipeCollection[];
  onSaveToCollection: (collectionId: string, postId: string) => void;
  onCreateCollection: (name: string, description: string) => void;
}

export const SaveToCollectionModal: React.FC<SaveToCollectionModalProps> = ({
  post,
  isOpen,
  onClose,
  collections,
  onSaveToCollection,
  onCreateCollection,
}) => {
  const [selectedColId, setSelectedColId] = useState<string>(collections[0]?.id || '');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !post) return null;

  const handleSave = () => {
    onSaveToCollection(selectedColId, post.id);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    onCreateCollection(newColName.trim(), newColDesc.trim());
    setIsCreatingNew(false);
    setNewColName('');
    setNewColDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-[#121212]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8F46] text-white">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
              Save to Recipe Collection
            </h3>
            <p className="text-xs text-neutral-500 truncate max-w-xs">
              {post.recipe?.title || post.caption.slice(0, 30)}
            </p>
          </div>
        </div>

        {savedSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF7E8] text-[#2F8F46] dark:bg-emerald-950 dark:text-[#B7E35F]">
              <Check className="h-7 w-7" />
            </div>
            <p className="mt-3 text-sm font-bold text-neutral-800 dark:text-neutral-200">
              Saved successfully to your cookbook!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Collections List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {collections.map((col) => (
                <div
                  key={col.id}
                  onClick={() => setSelectedColId(col.id)}
                  className={`flex items-center justify-between rounded-2xl border p-3 cursor-pointer transition ${
                    selectedColId === col.id
                      ? 'border-[#2F8F46] bg-[#EAF7E8]/70 dark:bg-emerald-950/40'
                      : 'border-slate-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={col.coverImage}
                      alt={col.name}
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-neutral-900 dark:text-white">
                        {col.name}
                      </h4>
                      <span className="text-[11px] text-neutral-400">
                        {col.recipeCount} recipes
                      </span>
                    </div>
                  </div>
                  {selectedColId === col.id && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F8F46] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Create New Collection Inline Toggle */}
            {isCreatingNew ? (
              <form onSubmit={handleCreateNew} className="rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-900 space-y-3">
                <h5 className="font-bold text-xs text-neutral-800 dark:text-neutral-200">
                  New Recipe Collection
                </h5>
                <input
                  type="text"
                  required
                  placeholder="Collection Name (e.g. Quick Air Fryer)"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Short Description"
                  value={newColDesc}
                  onChange={(e) => setNewColDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-neutral-900 dark:border-neutral-700 dark:bg-[#18181b] dark:text-white"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="text-xs font-semibold text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#2F8F46] px-3.5 py-1.5 text-xs font-bold text-white"
                  >
                    Create
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsCreatingNew(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-300 py-2.5 text-xs font-bold text-[#2F8F46] transition hover:bg-[#EAF7E8] dark:border-emerald-800 dark:text-[#B7E35F]"
              >
                <FolderPlus className="h-4 w-4" />
                <span>Create New Collection</span>
              </button>
            )}

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-neutral-800">
              <button
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="rounded-xl bg-[#2F8F46] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#176B35]"
              >
                Save to Selected
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
