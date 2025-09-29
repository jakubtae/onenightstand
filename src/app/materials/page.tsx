"use client";
import { MaterialContent } from "@/models/materials";
import { useEffect, useState } from "react";
import axios from "axios";

// Define categories based on your schema
const categories = [
  "all",
  "guide",
  "worksheet",
  "checklist",
  "plan",
  "link",
] as const;

export default function Home() {
  const [materials, setMaterials] = useState<MaterialContent[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialContent[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/materials");
      setMaterials(response.data.MaterialsContent);
      setFilteredMaterials(response.data.MaterialsContent); // Initially show all materials
      console.log(response.data.MaterialsContent);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter materials based on selected category
  const filterMaterials = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredMaterials(materials);
    } else {
      const filtered = materials.filter(
        (material) => material.category === category
      );
      setFilteredMaterials(filtered);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="font-sans flex flex-col items-center flex-1 p-8 pb-20 gap-6 sm:p-20 bg-gray-50 border border-gray-300 rounded-2xl">
      <h1 className="text-4xl lg:text-6xl font-bold text-wrap">Materials</h1>

      {/* Loading State */}
      {loading && (
        <div className="text-gray-600 text-lg">Loading materials...</div>
      )}

      {/* Category Filter Buttons */}
      {!loading && (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterMaterials(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Materials List */}
      {!loading && (
        <div className="w-full max-w-4xl">
          <div className="mb-4 text-gray-600">
            Showing {filteredMaterials.length} material(s)
            {selectedCategory !== "all" && ` in ${selectedCategory} category`}
          </div>

          {filteredMaterials.length > 0 ? (
            <div className="grid gap-4">
              {filteredMaterials.map((material: MaterialContent, i) => (
                <div
                  key={i}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {material.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {material.category}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        material.isCompleted
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {material.isCompleted ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No materials found
              {selectedCategory !== "all" && ` in ${selectedCategory} category`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
