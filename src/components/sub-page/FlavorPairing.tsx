'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Search,
    Info,
    Heart,
    ArrowRight,
    ClipboardList,
    ChevronDown,
    Leaf,
    Lightbulb,
    Star,
} from 'lucide-react';
import Image from 'next/image';


// Import your dummy data from the separate file
import {
    categories,
    allIngredients,
    quickIngredients,
    pairingTabs,
    topPairings,
    getPairingsForTab,
    personalizeBlurb,
    slugify,
} from './flavorData'; // Update path if necessary
import FlavorHeaderCard from './FlavorHeaderCard.';

const containerStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// initialIngredient / initialTab come from the dynamic route
// (app/flavor-pairing/[ingredient]/page.tsx) — see that file for how the
// URL slug is resolved back into these values. Both fall back to sensible
// defaults so this component still works if rendered without a route.
const FlavorPairing = ({ initialIngredient = 'Chicken', initialTab = 'Best Matches' }) => {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('Popular');
    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedIngredient, setSelectedIngredient] = useState(initialIngredient);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Ingredients shown in the quick-select grid — driven by the active category chip.
    // "Popular" keeps the curated shortlist; any other category filters the full catalog.
    const displayedIngredients =
        activeCategory === 'Popular'
            ? quickIngredients
            : allIngredients.filter((ing) => ing.categories.includes(activeCategory)).slice(0, 6);

    // Live search suggestions — matches ingredient names against the query, capped to 6 results.
    const searchResults =
        searchQuery.trim().length > 0
            ? allIngredients
                  .filter((ing) => ing.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
                  .slice(0, 6)
            : [];

    const handleSelectIngredient = (name) => {
        setSelectedIngredient(name);
        setSearchQuery('');
        setIsSearchFocused(false);
        // New ingredient = meaningful navigation → pushed onto history so
        // back/forward and shareable links behave as expected.
        router.push(`/flavor-pairing/${slugify(name)}?tab=${slugify(activeTab)}`, { scroll: false });
    };

    const handleSelectTab = (tabName) => {
        setActiveTab(tabName);
        // Switching a tab is a lightweight filter change → replaced in place
        // instead of pushed, so repeated tab clicks don't clutter history.
        router.replace(`/flavor-pairing/${slugify(selectedIngredient)}?tab=${slugify(tabName)}`, { scroll: false });
    };

    // Full record (emoji, bg color) for whichever ingredient is currently selected
    const selectedIngredientData =
        allIngredients.find((ing) => ing.name === selectedIngredient) ?? {
            name: selectedIngredient,
            emoji: '🍽️',
            bg: 'bg-gray-100 dark:bg-gray-800',
        };

    // Pairing cards for the active tab, personalized for the selected ingredient
    const activePairings = getPairingsForTab(activeTab, selectedIngredient);

    // Sidebar "Top Pairings" summary — always the overall best matches,
    // but personalized to the currently selected ingredient
    const personalizedTopPairings = topPairings.map((p) => ({
        ...p,
        blurb: personalizeBlurb(p.blurb, selectedIngredient),
    }));

    return (
        <section className="w-full bg-[#F6F7F2] dark:bg-gray-950 py-16 transition-colors duration-300 overflow-hidden">
            {/* Custom thin scrollbar for the pairing tabs strip — subtle emerald tone instead of the harsh default gray/green OS scrollbar */}
            <style jsx global>{`
        .pairing-tabs-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.35) transparent;
        }
        .pairing-tabs-scroll::-webkit-scrollbar {
          height: 5px;
        }
        .pairing-tabs-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .pairing-tabs-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.3);
          border-radius: 9999px;
        }
        .pairing-tabs-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(16, 185, 129, 0.55);
        }
        .dark .pairing-tabs-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(52, 211, 153, 0.35);
        }
      `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                
                <FlavorHeaderCard />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Select an Ingredient */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-shadow duration-300"
                        >
                            <div className="flex items-start gap-3 mb-5">
                                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                                    1
                                </span>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Select an Ingredient
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Choose your main ingredient to find perfect pairings
                                    </p>
                                </div>
                            </div>

                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 120)}
                                    placeholder="Search ingredient... (e.g., Chicken, Basil, Chocolate)"
                                    className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl pl-5 pr-11 py-3.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-emerald-200 transition-all duration-300"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                                {/* Live search dropdown */}
                                <AnimatePresence>
                                    {isSearchFocused && searchQuery.trim().length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl shadow-gray-900/5 z-20 overflow-hidden"
                                        >
                                            {searchResults.length > 0 ? (
                                                searchResults.map((ing) => (
                                                    <button
                                                        key={ing.name}
                                                        onClick={() => handleSelectIngredient(ing.name)}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors duration-150"
                                                    >
                                                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${ing.bg}`}>
                                                            {ing.emoji}
                                                        </span>
                                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                            {ing.name}
                                                        </span>
                                                    </button>
                                                ))
                                            ) : (
                                                <p className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">
                                                    No ingredients found for &quot;{searchQuery}&quot;
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        whileTap={{ scale: 0.94 }}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${activeCategory === cat
                                            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                                            : 'bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:border-emerald-300 hover:text-emerald-700'
                                            }`}
                                    >
                                        {cat}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.div
                                key={activeCategory}
                                variants={containerStagger}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
                            >
                                {displayedIngredients.map((ing) => {
                                    const isSelected = selectedIngredient === ing.name;
                                    return (
                                        <motion.button
                                            key={ing.name}
                                            variants={fadeUp}
                                            onClick={() => handleSelectIngredient(ing.name)}
                                            whileHover={{ y: -3, scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`flex items-center gap-2 px-3 py-3 rounded-2xl border bg-white dark:bg-gray-950 hover:shadow-md transition-all duration-300 text-left ${
                                                isSelected
                                                    ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                                                    : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300'
                                            }`}
                                        >
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-base ${ing.bg}`}>
                                                {ing.emoji}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {ing.name}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                                {displayedIngredients.length === 0 && (
                                    <p className="col-span-full text-sm text-gray-400 dark:text-gray-500 py-3">
                                        No ingredients in this category yet.
                                    </p>
                                )}
                                <motion.button
                                    variants={fadeUp}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium hover:border-emerald-400 hover:text-emerald-600 transition-colors duration-300"
                                >
                                    <span className="text-base leading-none">⋮⋮</span> More
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Step 2: AI Flavor Pairing Suggestions */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-shadow duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                                <div className="flex items-start gap-3">
                                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                                        2
                                    </span>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                                AI Flavor Pairing Suggestions
                                            </h2>
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                                                <Sparkles className="w-3 h-3" /> AI Powered
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Perfect combinations for{' '}
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedIngredient}</span>
                                        </p>
                                    </div>
                                </div>
                                <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-full px-3.5 py-2 hover:border-emerald-300 hover:text-emerald-700 transition-colors duration-300 shrink-0">
                                    <Info className="w-3.5 h-3.5" /> How it works?
                                </button>
                            </div>

                            {/* Tabs strip — custom thin emerald scrollbar via .pairing-tabs-scroll instead of the default bulky one */}
                            <div className="pairing-tabs-scroll flex gap-1 overflow-x-auto pb-2 mb-5 -mx-1 px-1 border-b border-gray-100 dark:border-gray-800">
                                {pairingTabs.map((tab) => {
                                    const TabIcon = tab.icon;
                                    const isActive = activeTab === tab.name;
                                    return (
                                        <button
                                            key={tab.name}
                                            onClick={() => handleSelectTab(tab.name)}
                                            className="relative whitespace-nowrap px-3.5 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center gap-1.5"
                                        >
                                            <TabIcon
                                                className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}
                                            />
                                            <span className={isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}>
                                                {tab.name}
                                            </span>
                                            {isActive && (
                                                <motion.span
                                                    layoutId="pairing-tab-underline"
                                                    className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-emerald-600 rounded-full"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                ✨ These{' '}
                                {activeTab !== 'Best Matches' && (
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                        {activeTab.toLowerCase()}{' '}
                                    </span>
                                )}
                                ingredients pair exceptionally well with{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedIngredient}</span>
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeTab}-${selectedIngredient}`}
                                    variants={containerStagger}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5"
                                >
                                    {activePairings.map((p) => (
                                        <motion.div
                                            key={p.name}
                                            variants={fadeUp}
                                            whileHover={{ y: -4, scale: 1.01 }}
                                            className="border border-gray-100 dark:border-gray-800 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 cursor-default"
                                        >
                                            <div className="flex items-center gap-2.5 mb-1.5">
                                                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${p.iconBg}`}>
                                                    {p.emoji}
                                                </span>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                                            </div>
                                            <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full mb-2">
                                                Excellent Match
                                            </span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{p.blurb}</p>
                                            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                                                Best in: {p.bestIn}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex justify-center">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-full px-5 py-2.5 hover:border-emerald-300 hover:text-emerald-700 transition-colors duration-300"
                                >
                                    View More Pairings <ChevronDown className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Bottom banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
                        >
                            <Leaf className="w-6 h-6 text-emerald-600 shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                    Flavor science meets culinary art
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Our AI analyzes thousands of recipes and flavor compounds to find the perfect combinations for you.
                                </p>
                            </div>
                            {/* Venn diagram: taller container + "Perfect Pairing" pushed further down so it no longer sits on the same line as Aroma/Texture */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="relative w-28 h-24">
                                    <motion.span
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute left-0 top-0 w-16 h-16 rounded-full bg-emerald-200/70 dark:bg-emerald-800/40 flex items-center justify-center text-[11px] font-medium text-emerald-800 dark:text-emerald-300"
                                    >
                                        Aroma
                                    </motion.span>
                                    <span className="absolute left-9 top-9 w-14 h-14 rounded-full bg-lime-200/90 dark:bg-lime-800/60 flex items-center justify-center text-[10px] font-semibold text-center text-emerald-900 dark:text-lime-100 leading-tight z-10 shadow-sm">
                                        Perfect
                                        <br />
                                        Pairing
                                    </span>
                                    <motion.span
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                        className="absolute left-16 top-0 w-16 h-16 rounded-full bg-amber-200/70 dark:bg-amber-800/40 flex items-center justify-center text-[11px] font-medium text-amber-800 dark:text-amber-300"
                                    >
                                        Texture
                                    </motion.span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                        <Heart className="w-4 h-4" />
                                    </span>
                                    Amazing Dishes
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Pairing Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <ClipboardList className="w-5 h-5 text-emerald-600" />
                                <h3 className="font-bold text-gray-900 dark:text-white">Your Pairing Summary</h3>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${selectedIngredientData.bg}`}>
                                        {selectedIngredientData.emoji}
                                    </span>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Main Ingredient</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{selectedIngredient}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                                Top Pairings
                            </p>
                            <div className="space-y-3 mb-4">
                                {personalizedTopPairings.map((p, i) => (
                                    <motion.div
                                        key={p.name}
                                        whileHover={{ x: 4 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                        className="flex items-center justify-between cursor-default"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {p.name}
                                            </span>
                                        </div>
                                        <span className="text-xs font-semibold text-emerald-600">Excellent Match</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors duration-300"
                            >
                                View Full List
                            </motion.button>
                        </motion.div>

                        {/* Try This Combination */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-shadow duration-300"
                        >
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Try This Combination</h3>
                            <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/30 flex items-center justify-center group">
                                <motion.div
                                    className="w-full h-full"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src="https://media.istockphoto.com/id/1545092834/photo/lemon-garlic-chicken-with-roast-potatoes-top-view.jpg?s=612x612&w=0&k=20&c=rbHIh0tgm7UmBKaZVeD1-YKgQ5VGEbN93nja_JT2NNY="
                                        alt="Lemon Garlic Chicken with Rosemary"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Save recipe"
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-sm z-10"
                                >
                                    <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </motion.button>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug">
                                Lemon Garlic Chicken with Rosemary
                            </h4>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="font-semibold text-gray-800 dark:text-gray-200">4.8</span>
                                <span className="text-gray-400">(124)</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-colors duration-300"
                            >
                                View Recipe <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        {/* Pro Tip */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ y: -4 }}
                            className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 p-6 hover:shadow-lg hover:shadow-emerald-900/5 transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <motion.span
                                    animate={{ rotate: [0, -8, 0, 8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                                </motion.span>
                                <h3 className="font-bold text-gray-900 dark:text-white">Pro Tip</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                The best flavors come from balance! Try combining aromatic, acidic, and savory elements.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlavorPairing;