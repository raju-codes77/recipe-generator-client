'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCalendar, FiClock, FiDollarSign, FiUser, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi';

interface NutritionistType {
  id: string;
  name: string;
  education: string;
  specialty: string;
  available_time: string;
  fees: number;
  image_url: string;
}

// Next.js asynchronous params handling
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NutritionistDetailPage({ params }: PageProps) {
  const router = useRouter();
  
  // Unwrap params using React.use() or async unwrap
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [nutritionist, setNutritionist] = useState<NutritionistType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    appointmentDate: '',
    slotTime: '',
  });

  useEffect(() => {
    if (id) {
      fetchNutritionistDetails(id);
    }
  }, [id]);

  const fetchNutritionistDetails = async (nutritionistId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:5000/api/nutritionist/${nutritionistId}`);
      const data = await res.json();

      if (data.success) {
        setNutritionist(data.data);
      } else {
        setError(data.message || 'Nutritionist information not found.');
      }
    } catch (err) {
      console.error('Error fetching details:', err);
      setError('Server connection error. Please check if your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);

    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nutritionistId: id,
          ...formData,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSuccessMessage('Your appointment has been successfully booked!');
        setFormData({ patientName: '', email: '', phone: '', appointmentDate: '', slotTime: '' });
      } else {
        alert('Failed to book appointment: ' + (result.message || 'Please try again'));
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('A server error occurred, please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (error || !nutritionist) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-red-500 font-medium">{error || 'Nutritionist not found'}</p>
        <button 
          onClick={() => router.back()} 
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 mb-8 transition"
      >
        <FiArrowLeft size={18} /> Back to List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-lg h-fit">
          <img
            src={nutritionist.image_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"}
            alt={nutritionist.name}
            className="w-28 h-28 rounded-2xl object-cover mx-auto mb-4 border-2 border-green-600 shadow-md"
          />
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">{nutritionist.name}</h2>
          <p className="text-xs text-center text-green-600 font-semibold mt-1">{nutritionist.specialty}</p>
          <p className="text-xs text-center text-gray-400 mt-1">{nutritionist.education}</p>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1.5"><FiClock size={16} className="text-green-600" /> Timing:</span>
              <span className="font-medium text-xs">{nutritionist.available_time || "10:00 AM - 04:00 PM"}</span>
            </div>
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1.5"><FiDollarSign size={16} className="text-green-600" /> Consultation Fee:</span>
              <span className="font-bold text-green-600">৳{nutritionist.fees}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">Book an Appointment</h3>
          <p className="text-xs text-gray-500 mb-6">Fill out the form below with valid information to schedule a consultation.</p>

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
              <FiCheckCircle size={20} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Your Name</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400"><FiUser size={16} /></span>
                <input
                  type="text"
                  name="patientName"
                  required
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-green-600 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400"><FiMail size={16} /></span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-green-600 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Mobile Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400"><FiPhone size={16} /></span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="017xxxxxxxx"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-green-600 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Select Date</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400"><FiCalendar size={16} /></span>
                  <input
                    type="date"
                    name="appointmentDate"
                    required
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-green-600 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">Time Slot</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400"><FiClock size={16} /></span>
                  <input
                    type="text"
                    name="slotTime"
                    required
                    value={formData.slotTime}
                    onChange={handleInputChange}
                    placeholder="e.g. 03:30 PM - 04:00 PM"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-green-600 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? 'Processing Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}