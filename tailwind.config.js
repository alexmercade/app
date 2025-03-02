/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'gray-750': '#2d3748',
        'gray-850': '#1a202c',
        'gray-650': '#4a5568'
      }
    },
  },
  plugins: [],
  safelist: [
    // Color theme classes that need to be preserved during purge
    'bg-zinc-600', 'bg-zinc-500', 'bg-zinc-700', 'text-zinc-400', 'text-zinc-300', 'text-zinc-500', 'text-zinc-600', 'fill-zinc-400', 'fill-zinc-500', 'border-zinc-500', 'border-zinc-700',
    'bg-blue-600', 'bg-blue-500', 'bg-blue-700', 'text-blue-400', 'text-blue-300', 'text-blue-500', 'text-blue-600', 'fill-blue-400', 'fill-blue-500', 'border-blue-500', 'border-blue-700',
    'bg-purple-600', 'bg-purple-500', 'bg-purple-700', 'text-purple-400', 'text-purple-300', 'text-purple-500', 'text-purple-600', 'fill-purple-400', 'fill-purple-500', 'border-purple-500', 'border-purple-700',
    'bg-amber-600', 'bg-amber-500', 'bg-amber-700', 'text-amber-400', 'text-amber-300', 'text-amber-500', 'text-amber-600', 'fill-amber-400', 'fill-amber-500', 'border-amber-500', 'border-amber-700',
    'bg-teal-600', 'bg-teal-500', 'bg-teal-700', 'text-teal-400', 'text-teal-300', 'text-teal-500', 'text-teal-600', 'fill-teal-400', 'fill-teal-500', 'border-teal-500', 'border-teal-700',
    'slider-zinc', 'slider-blue', 'slider-purple', 'slider-amber', 'slider-teal',
    'ring-2', 'ring-white',
    'bg-gray-950', 'bg-gray-750', 'bg-gray-850', 'bg-gray-650'
  ]
};