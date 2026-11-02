"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";

const CATEGORY_OPTIONS = [
  { id: "hydration", label: "💧 Hydration" },
  { id: "healthy-eating", label: "🥗 Healthy Eating" },
  { id: "physical-activity", label: "🏃 Physical Activity" },
  { id: "sleep-rest", label: "😴 Sleep & Rest" },
  { id: "stress-mindfulness", label: "🧘 Stress & Mindfulness" },
  { id: "general-wellness", label: "🍎 General Wellness" },
];

export default function WellnessRemindersSettings() {
  const [enabled, setEnabled] = useState(true);
  const [frequency, setFrequency] = useState("1h");
  const [categories, setCategories] = useState<string[]>(["general-wellness"]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await apiClient.get<any>("/wellness-reminders/preferences");
        setEnabled(data.enabled);
        setFrequency(data.frequency);
        setCategories(data.categories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleToggleCategory = (catId: string) => {
    setCategories((prev) =>
      prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
    );
  };

  const handleSave = async () => {
    if (categories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    setSaving(true);
    try {
      const res = await apiClient.put<any>("/wellness-reminders/preferences", { enabled, frequency, categories });
      if (res) {
        toast.success("Your wellness reminder preferences have been updated. 💚");
      }
    } catch (err) {
      toast.error("We couldn't save your preferences right now. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Wellness Reminders</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Small reminders to help you build healthier everyday habits.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        {/* Status Card */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">🤖 AI Wellness Assistant</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Receive friendly wellness reminders while using FoodCanvas.
            </p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              enabled ? "bg-green-500" : "bg-gray-200 dark:bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {enabled && (
          <>
            {/* Frequency */}
            <div className="border-b border-gray-100 pb-6 dark:border-slate-800">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Frequency</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "30s", label: "30 sec (Test)" },
                  { value: "30m", label: "30 min" },
                  { value: "1h", label: "1 hour" },
                  { value: "2h", label: "2 hours" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFrequency(opt.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      frequency === opt.value
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="pb-4">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">What kind of tips would you like?</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CATEGORY_OPTIONS.map((cat) => {
                  const isSelected = categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleToggleCategory(cat.id)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                        isSelected
                          ? "border-green-500 bg-green-50/50 dark:border-green-500/50 dark:bg-green-900/10"
                          : "border-gray-200 bg-white hover:border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                      }`}
                    >
                      <span className={`text-sm font-medium ${isSelected ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                        {cat.label}
                      </span>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          isSelected
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                        }`}
                      >
                        {isSelected && (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 sm:w-auto sm:px-8"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
