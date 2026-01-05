// import { useEffect, useState } from "react";
// import "./App.css";

// const API_URL = import.meta.env.VITE_API_URL; 
// // OR: "http://localhost:5000/api/users"

// function App() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", city: "" });
//   const [editingUser, setEditingUser] = useState(null);

//   // READ
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }, []);

//   // CREATE
//   const addUser = () => {
//     if (!form.name || !form.email) return;

//     fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     })
//       .then((res) => res.json())
//       .then((newUser) => {
//         setUsers([...users, newUser]);
//         setForm({ name: "", email: "", city: "" });
//       });
//   };

//   // DELETE
//   const deleteUser = (id) => {
//     fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
//       setUsers(users.filter((u) => u.id !== id));
//     });
//   };

//   // UPDATE
//   const updateUser = () => {
//     fetch(`${API_URL}/${editingUser.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editingUser),
//     })
//       .then(() => {
//         setUsers(
//           users.map((u) =>
//             u.id === editingUser.id ? editingUser : u
//           )
//         );
//         setEditingUser(null);
//       });
//   };

//   return (
//     <div className="page">
//       <div className="card">
//         <h2>User Management (CRUD)</h2>

//         {/* CREATE */}
//         <div className="form">
//           <input
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             placeholder="City"
//             value={form.city}
//             onChange={(e) => setForm({ ...form, city: e.target.value })}
//           />
//           <button onClick={addUser}>Add User</button>
//         </div>

//         {/* READ */}
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>City</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id}>
//                 <td className="person-name">{u.id}</td>
//                 <td className="person-name">{u.name}</td>
//                 <td className="person-name">{u.email}</td>
//                 <td className="person-name">{u.city}</td>
//                 <td>
//                   <button
//                     className="edit"
//                     onClick={() => setEditingUser(u)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete"
//                     onClick={() => deleteUser(u.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* UPDATE MODAL */}
//       {editingUser && (
//         <div className="modal">
//           <div className="modal-card">
//             <h3>Edit User</h3>
//             <input
//               value={editingUser.name}
//               onChange={(e) =>
//                 setEditingUser({ ...editingUser, name: e.target.value })
//               }
//             />
//             <input
//               value={editingUser.email}
//               onChange={(e) =>
//                 setEditingUser({ ...editingUser, email: e.target.value })
//               }
//             />
//             <input
//               value={editingUser.city}
//               onChange={(e) =>
//                 setEditingUser({ ...editingUser, city: e.target.value })
//               }
//             />
//             <div className="actions">
//               <button onClick={updateUser}>Update</button>
//               <button onClick={() => setEditingUser(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

