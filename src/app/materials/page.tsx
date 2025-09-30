"use client";
import { MaterialContent } from "@/models/materials";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { categoryList } from "@/lib/categoriesList";
import Image from "next/image";

export default function Home() {
  const [materials, setMaterials] = useState<MaterialContent[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialContent[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = ["all", ...categoryList];

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/materials", {
        adapter: "fetch",
        fetchOptions: { cache: "reload", next: { revalidate: 60 * 15 } },
      });
      setMaterials(response.data.MaterialsContent);
      setFilteredMaterials(response.data.MaterialsContent);
      console.log(response.data.MaterialsContent);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="font-sans flex flex-col flex-1 p-4 sm:p-8 lg:p-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center mb-6 sm:mb-8">
          Materials
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 text-lg py-8">
            Loading materials...
          </div>
        )}

        {/* Category Filter Buttons */}
        {!loading && (
          <div className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterMaterials(category)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
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
          <div className="w-full">
            <div className="mb-4 text-gray-600 text-sm sm:text-base">
              Showing {filteredMaterials.length} material(s)
              {selectedCategory !== "all" && ` in ${selectedCategory} category`}
            </div>

            {filteredMaterials.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredMaterials.map((material: MaterialContent, i) => (
                  <Link
                    key={material._id?.toString() || i}
                    className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 sm:gap-4"
                    href={
                      material.category === "Books"
                        ? material.fileUrl
                        : `/materials/${material._id}`
                    }
                    {...(material.category === "Books" && { target: "_blank" })}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-video">
                      <Image
                        src={
                          material.category === "Books"
                            ? material.thumbnailUrl + ".jpg"
                            : material.category === "Videos"
                            ? `https://img.youtube.com/vi/${
                                material.fileUrl.split("v=")[1]
                              }/default.jpg`
                            : "/placeholder.jpg"
                        }
                        alt={material.title}
                        fill
                        className="rounded-md object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                        {material.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 flex-1">
                        {material.description}
                      </p>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full w-min">
                        {material.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500 text-sm sm:text-base">
                No materials found
                {selectedCategory !== "all" &&
                  ` in ${selectedCategory} category`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
