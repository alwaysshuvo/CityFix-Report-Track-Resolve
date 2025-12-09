import React from 'react'

const Test = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold text-blue-600">Tailwind Test Component</h1>
          <p className="text-sm text-gray-600">If you see styled content, Tailwind is working.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">Success</span>
          </div>

          <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-indigo-700">
            Primary Action
          </button>

          <div className="flex gap-2 justify-center">
            <div className="h-8 w-8 rounded-full bg-pink-400" />
            <div className="h-8 w-8 rounded-full bg-yellow-400" />
            <div className="h-8 w-8 rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
