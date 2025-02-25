import React, { useState, useEffect } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };
  console.log("Stored Wishlist:", JSON.parse(localStorage.getItem("wishlist")));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">
  <img
    src={
      item.url || // Direct URL (as per your stored wishlist data)
      item.imageUrl || 
      (item.images && item.images.length > 0 ? item.images[0] : null) || 
      (item.imgs && item.imgs.length > 0 ? item.imgs[0].url : null) || 
      (item.img && item.img.url ? item.img.url : null) || 
      "/default-image.jpg" 
    }
    alt={item.name || "Product"}
    className="w-12 h-12 rounded object-cover"
  />
</td>

                  <td className="py-2 px-4 border-b">
                    {item.title || item.name || item.description || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border-b">
    {item.price || item.Price || "N/A"}
</td>

                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
