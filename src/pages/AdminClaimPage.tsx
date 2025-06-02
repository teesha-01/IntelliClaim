


// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import DashboardLayout from "@/components/layout/DashboardLayout";

// interface Claim {
//   id: number;
//   claim_number: string;
//   contact_person_name: string;
//   date_time: string;
//   claim_paid_amount: number;
//   status?: "Approved" | "Pending" | "Denied" | "Draft" | string;
// }

// const AdminClaimsPage: React.FC = () => {
//   const [claims, setClaims] = useState<Claim[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchClaims();
//   }, []);

//   const fetchClaims = async () => {
//     try {
//       const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
//       const response = await fetch(`${API_BASE}/api/claims`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//       });
//       const res = await response.json();
//       const allClaims: Claim[] = res.claims || [];
//       const highValueClaims = allClaims.filter(claim => claim.claim_paid_amount > 50000);
//       setClaims(highValueClaims);
//     } catch (error) {
//       console.error("❌ Failed to fetch admin claims:", error);
//     }
//   };

// //   const handleDecision = async (id: number, decision: "Approved" | "Denied") => {
// //     try {
// //       await fetch(`http://localhost:8000/api/claims/${id}`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ status: decision }),
// //       });
// //       fetchClaims(); // Refresh after update
// //     } catch (error) {
// //       console.error("Failed to update claim", error);
// //     }
// //   };
// // Add toast import at the top
// import { toast } from "sonner";

// // Update the handleDecision function:
// const handleDecision = async (id: number, decision: "Approved" | "Denied") => {
//   try {
//     const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
    
//     const formData = new FormData();
//     formData.append("status", decision);

//     const response = await fetch(`${API_BASE}/api/claims/${id}`, {
//       method: "PATCH",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(await response.text());
//     }

//     toast.success(`Claim ${decision === "Approved" ? "accepted" : "rejected"} successfully!`);
//     fetchClaims(); // Refresh the list
//   } catch (error) {
//     console.error("❌ Failed to update claim:", error);
//     toast.error("Failed to update claim status!");
//   }
// };

//   const filteredClaims = claims.filter((claim) =>
//     claim.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     claim.claim_number.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <DashboardLayout> {/* ✅ Sidebar + Logo already wrapped */}
//       <div className="p-6 space-y-6">
//         {/* 🔍 Search Input */}
//         <div className="mb-2">
//           <input
//             type="text"
//             placeholder="Search by claim number or name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-1/3 px-4 py-2 border rounded-md shadow-sm"
//           />
//         </div>

//         {/* 🧾 Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Admin - High Value Claims</h1>
//           {/* No Filter/Export buttons */}
//         </div>

//         {/* 📋 Claims Table */}
//         <div className="bg-white rounded-md shadow">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Claim Number</TableHead>
//                 <TableHead>Customer Name</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredClaims.map((claim) => (
//                 <TableRow key={claim.id}>
//                   <TableCell className="font-medium">{claim.claim_number}</TableCell>
//                   <TableCell>{claim.contact_person_name}</TableCell>
//                   <TableCell>{new Date(claim.date_time).toLocaleDateString()}</TableCell>
//                   <TableCell>Rs. {claim.claim_paid_amount?.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         claim.status === "Approved"
//                           ? "bg-green-100 text-green-800"
//                           : claim.status === "Denied"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {claim.status || "Pending"}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-right flex gap-2 justify-end">
//   <Button
//     size="sm"
//     className="bg-green-500 hover:bg-green-600 text-white"
//     onClick={() => handleDecision(claim.id, "Approved")}
//   >
//     Accept
//   </Button>
//   <Button
//     size="sm"
//     className="bg-red-500 hover:bg-red-600 text-white"
//     onClick={() => handleDecision(claim.id, "Denied")}
//   >
//     Reject
//   </Button>
// </TableCell>

//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AdminClaimsPage;


// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import { toast } from "sonner";

// interface Claim {
//   id: number;
//   claim_number: string;
//   contact_person_name: string;
//   date_time: string;
//   claim_paid_amount: number;
//   status?: "Approved" | "Pending" | "Rejected" | "Draft";
//   admin_notes?: string;
//   updated_at?: string;
// }

// const AdminClaimsPage: React.FC = () => {
//   const [claims, setClaims] = useState<Claim[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isProcessing, setIsProcessing] = useState<number | null>(null);

//   useEffect(() => {
//     fetchClaims();
//   }, []);

//   const fetchClaims = async () => {
//     try {
//       const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
//       const response = await fetch(`${API_BASE}/api/claims`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(await response.text());
//       }
      
//       const res = await response.json();
//       const allClaims: Claim[] = res.claims || [];
//       const highValueClaims = allClaims
//         .filter(claim => claim.claim_paid_amount > 50000)
//         .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());
      
//       setClaims(highValueClaims);
//     } catch (error) {
//       console.error("Failed to fetch admin claims:", error);
//       toast.error("Failed to fetch claims");
//     }
//   };

// //   const handleDecision = async (id: number, decision: "Approved" | "Rejected") => {
// //     setIsProcessing(id);
// //     try {
// //       const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
// //       const response = await fetch(`${API_BASE}/api/claims/admin/${id}/status`, {
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/x-www-form-urlencoded",
// //           "Authorization": `Bearer ${localStorage.getItem("token")}`
// //         },
// //         body: new URLSearchParams({
// //           action: decision,
// //           admin_notes: `Claim ${decision.toLowerCase()} by admin`
// //         }),
// //       });

// //       if (!response.ok) {
// //         const error = await response.json();
// //         throw new Error(error.detail || "Action failed");
// //       }

// //       toast.success(`Claim ${decision.toLowerCase()} successfully`);
// //       await fetchClaims(); // Refresh list with updated data
// //     } catch (error) {
// //       console.error("Action failed:", error);
// //       toast.error(error.message || "Failed to process claim");
// //     } finally {
// //       setIsProcessing(null);
// //     }
// //   };


// const handleDecision = async (id: number, decision: "Approved" | "Denied") => {
//     try {
//       const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
//       await fetch(`${API_BASE}/api/claims/${id}`, {  // ✅ correct URL
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: decision }),
//       });
//       toast.success(`Claim ${decision === "Approved" ? "accepted" : "rejected"} successfully!`);
//       fetchClaims();
//     } catch (error) {
//       console.error("❌ Failed to update claim:", error);
//       toast.error("Failed to update claim status!");
//     }
//   };
  
//   const filteredClaims = claims.filter((claim) =>
//     claim.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     claim.claim_number.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <DashboardLayout>
//       <div className="p-6 space-y-6">
//         <div className="mb-2">
//           <input
//             type="text"
//             placeholder="Search by claim number or name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-1/3 px-4 py-2 border rounded-md shadow-sm"
//           />
//         </div>

//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Admin - High Value Claims</h1>
//         </div>

//         <div className="bg-white rounded-md shadow">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Claim #</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredClaims.map((claim) => (
//                 <TableRow key={claim.id}>
//                   <TableCell className="font-medium">{claim.claim_number}</TableCell>
//                   <TableCell>{claim.contact_person_name}</TableCell>
//                   <TableCell>{new Date(claim.date_time).toLocaleDateString()}</TableCell>
//                   <TableCell>Rs. {claim.claim_paid_amount?.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       claim.status === "Approved" ? "bg-green-100 text-green-800" :
//                       claim.status === "Rejected" ? "bg-red-100 text-red-800" :
//                       "bg-yellow-100 text-yellow-800"
//                     }`}>
//                       {claim.status || "Pending"}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-right flex gap-2 justify-end">
//                     <Button
//                       size="sm"
//                       className="bg-green-500 hover:bg-green-600 text-white"
//                       onClick={() => handleDecision(claim.id, "Approved")}
//                       disabled={isProcessing === claim.id || claim.status !== "Pending"}
//                     >
//                       {isProcessing === claim.id ? "Processing..." : "Approve"}
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="bg-red-500 hover:bg-red-600 text-white"
//                       onClick={() => handleDecision(claim.id, "Rejected")}
//                       disabled={isProcessing === claim.id || claim.status !== "Pending"}
//                     >
//                       {isProcessing === claim.id ? "Processing..." : "Reject"}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AdminClaimsPage;



// src/pages/AdminClaimsPage.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import ClaimModal from "@/components/ClaimModal";

// interface Claim {
//   id: number;
//   claim_number: string;
//   contact_person_name: string;
//   date_time: string;
//   claim_paid_amount: number;
//   status?: "Approved" | "Pending" | "Rejected" | "Draft";
//   admin_notes?: string;
//   updated_at?: string;
// }


interface Claim {
  id: number;
  claim_number: string;
  contact_person_name: string;
  contact_number: string;
  email: string;
  date_time: string;

  vehicle_make: string;
  vehicle_model: string;
  vehicle_color?: string;
  registration_no: string;
  engine_no: string;
  chassis_no: string;

  policy_no: string;
  policy_start_date: string;
  policy_end_date: string;

  incident_date_time: string;
  incident_place: string;
  current_location: string;
  circumstances: string;
  missing_parts_details: string;

  claim_paid_amount: number;
  claim_intimation_amount: number;
  outstanding: number;
  deductible_amount: number;

  branch: string;
  year_of_manufacture: string;
  vehicle_start_date: string;
  vehicle_end_date: string;
  workshop_type: string;
  vehicle_type: string;
  workshop_name: string;
  vehicle_availability: string;
  relation_with_insured: string;

  status?: "Approved" | "Pending" | "Rejected";
  remarks?: string;
  remarks2?: string;
}
const AdminClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProcessing, setIsProcessing] = useState<number | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isClaimModalOpen, setClaimModalOpen] = useState(false);
  

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const resp = await fetch(`${API_BASE}/api/claims`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!resp.ok) throw new Error(await resp.text());
      const { claims: allClaims }: { claims: Claim[] } = await resp.json();

      // only high-value, newest first
      const highValue = allClaims
        .filter(c => c.claim_paid_amount > 50000)
        .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime());

      setClaims(highValue);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch claims");
    }
  };

  // ← Changed union to include "Rejected"
  const handleDecision = async (id: number, decision: "Approved" | "Rejected") => {
    setIsProcessing(id);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const resp = await fetch(`${API_BASE}/api/claims/claims/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: decision }),
      });
      if (!resp.ok) throw new Error(await resp.text());

      toast.success(`Claim ${decision === "Approved" ? "accepted" : "rejected"} successfully!`);
      await fetchClaims();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update claim status");
    } finally {
      setIsProcessing(null);
    }
  };

  const filtered = claims.filter(c =>
    c.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.claim_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <input
          type="text"
          placeholder="Search by claim number or name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-1/3 px-4 py-2 border rounded-md shadow-sm"
        />

        <h1 className="text-2xl font-bold">Admin – High Value Claims</h1>

        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(claim => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.claim_number}</TableCell>
                  <TableCell>{claim.contact_person_name}</TableCell>
                  <TableCell>{new Date(claim.date_time).toLocaleDateString()}</TableCell>
                  <TableCell>Rs. {claim.claim_paid_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : claim.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {claim.status || "Pending"}
                    </span>
                  </TableCell>
                      <TableCell className="text-right">
                                      <Button variant="ghost" size="sm" onClick={() => setSelectedClaim(claim)}>
                                        View
                                      </Button>
                                    </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleDecision(claim.id, "Approved")}
                      disabled={isProcessing === claim.id || claim.status !== "Pending"}
                    >
                      {isProcessing === claim.id ? "Processing..." : "Approve"}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => handleDecision(claim.id, "Rejected")}
                      disabled={isProcessing === claim.id || claim.status !== "Pending"}
                    >
                      {isProcessing === claim.id ? "Processing..." : "Reject"}
                    </Button>
                  </TableCell>
              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        
        {/* Expanded View Modal */}
        {selectedClaim && (
          <ClaimModal isOpen={true} onClose={() => setSelectedClaim(null)}>
            <div className="space-y-4 text-sm text-gray-700">
              <h2 className="text-lg font-semibold">Claim #{selectedClaim.claim_number}</h2>
              <p><strong>Status:</strong> {selectedClaim.status || "Pending"}</p>
              <p><strong>Submitted:</strong> {new Date(selectedClaim.date_time).toLocaleDateString()}</p>
              <p><strong>Customer:</strong> {selectedClaim.contact_person_name} {selectedClaim.contact_number}</p>
              <p><strong>Vehicle:</strong> {selectedClaim.vehicle_make} {selectedClaim.vehicle_model} {selectedClaim.registration_no}</p>
              <p><strong>Amount:</strong> Rs. {selectedClaim.claim_paid_amount.toFixed(2)}</p>
              <p><strong>Workshop:</strong> {selectedClaim.workshop_name}</p>
              <p><strong>Remarks:</strong> {selectedClaim.remarks}</p>
             
            </div>
          </ClaimModal>
        )}

      </div>
    </DashboardLayout>
  );
};

export default AdminClaimsPage;
