import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = "http://localhost:5000"; // ✅ SINGLE SOURCE

export default function Staff() {
  const navigate = useNavigate();
  const location = useLocation();

  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 5;
  const totalPages = Math.ceil(total / limit);

  // 🔄 Refresh after add/edit
  useEffect(() => {
    if (location.state?.refresh) {
      setPage(1);
    }
  }, [location.state]);

  // 📥 Fetch staff list
  useEffect(() => {
    fetch(`${API_URL}?search=${search}&page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setStaff(data.staff || []);
        setTotal(data.total || 0);

        // keep selection if possible
        if (selectedStaff) {
          const updated = data.staff?.find(s => s.id === selectedStaff.id);
          setSelectedStaff(updated || null);
        }
      })
      .catch(console.error);
  }, [search, page]);

  // 🗑 Delete staff
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setStaff(prev => prev.filter(s => s.id !== id));
    setSelectedStaff(null);
    setTotal(prev => prev - 1);
  };

  // 🔢 Pagination numbers
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700">Staff Management</h2>
          <p className="text-sm text-gray-500">
            View, add, update and manage staff
          </p>
        </div>

        <button
          onClick={() => navigate("/staff/add")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600
                     text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          + Add Staff
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* SIDEBAR */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 h-[calc(100vh-120px)]">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              Staff Details
            </h3>

            <div className="border-b mb-4" />

            {!selectedStaff ? (
              <div className="text-gray-500 text-sm flex items-center justify-center h-full">
                Select a staff member to view details
              </div>
            ) : (
              <div className="space-y-6">

                {/* PHOTO */}
                <div className="flex flex-col items-center">
                  {selectedStaff.photo ? (
                    <img
                      src={`${BASE_URL}${selectedStaff.photo}`}
                      onError={(e) => (e.target.style.display = "none")}
                      alt={selectedStaff.name}
                      className="w-28 h-28 rounded-full object-cover border shadow"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-indigo-100
                                    flex items-center justify-center
                                    text-4xl font-bold text-indigo-600">
                      {selectedStaff.name.charAt(0)}
                    </div>
                  )}

                  <p className="mt-3 text-lg font-semibold text-gray-800">
                    {selectedStaff.name}
                  </p>
                </div>

                {/* DETAILS */}
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-gray-700 break-all">
                    {selectedStaff.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Mobile</p>
                  <p className="text-gray-700">
                    {selectedStaff.mobile}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="pt-4 border-t flex gap-3">
                  <button
                    onClick={() => navigate(`/staff/edit/${selectedStaff.id}`)}
                    className="flex-1 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(selectedStaff.id)}
                    className="flex-1 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div className="col-span-8">

          {/* SEARCH */}
          <input
            className="mb-4 border rounded-lg px-4 py-2 w-80
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="🔍 Search name / email / mobile"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Mobile</th>
                </tr>
              </thead>

              <tbody>
                {staff.map((s, idx) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStaff(s)}
                    className={`cursor-pointer border-t
                      ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      hover:bg-indigo-50
                      ${selectedStaff?.id === s.id ? "bg-indigo-100" : ""}`}
                  >
                    <td className="p-3 font-semibold">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.mobile}</td>
                  </tr>
                ))}

                {staff.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-6 text-center text-gray-500">
                      No staff found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </button>

              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={p === page ? "bg-indigo-600 text-white px-3 py-1 rounded" : ""}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
