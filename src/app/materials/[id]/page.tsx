"use client";
import { MaterialContent } from "@/models/materials";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MaterialPage() {
  const params = useParams();
  const id = params.id as string;

  const [material, setMaterial] = useState<MaterialContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/materials/${id}`);
      setMaterial(response.data.material);
      console.log(response.data.material);
    } catch (error) {
      console.error("Error fetching material:", error);
      setError("Failed to load material");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMaterial();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white border border-gray-300 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white border border-gray-300 rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMaterial}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Material not found state
  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white border border-gray-300 rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Material Not Found
          </h1>
          <p className="text-gray-600">
            The material with ID &quot;{id}&quot; does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                {material.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {material.title}
              </h1>
            </div>
            <div className="text-right">
              {material.pinned && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                  Pinned
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-lg">{material.description}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Preview Card */}
            <div className="bg-white border border-gray-300 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Resource File
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Download Resource</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Click below to access the file
                  </p>
                </div>
                <Link
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Open File
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
