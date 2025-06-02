// import React, { useEffect, useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Mail, Phone, MapPin } from "lucide-react";

// interface Employee {
//   id: string;
//   name: string;
//   avatar: string;
//   jobTitle: string;
//   email: string;
//   phone: string;
//   location: string;
//   department: string;
//   status: "active" | "away" | "offline";
// }

// const ProfileHeader: React.FC = () => {
//   const [employee, setEmployee] = useState<Employee | null>(null);

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/auth/users/me', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const data = await response.json();
//         setEmployee({
//           id: data.id,
//           name: `${data.first_name} ${data.last_name}`,
//           avatar: data.avatar || '', // Provide a default avatar URL if necessary
//           jobTitle: data.job_title || 'Employee',
//           email: data.email,
//           phone: data.phone || '03021479915',
//           location: data.location || 'Karachi',
//           department: data.department || 'General',
//           status: data.status || 'active',
//         });
//       } catch (error) {
//         console.error('Error fetching employee data:', error);
//       }
//     };

//     fetchEmployeeData();
//   }, []);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-500";
//       case "away":
//         return "bg-yellow-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   if (!employee) {
//     return <div>Loading...</div>;
//   }

// return (
//   <div className="w-full bg-white text-gray-800 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(244,162,97,0.5)] animate-slide-up mb-6">
//     <div className="p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center md:items-start">
//       <div className="relative">
//         <Avatar className="h-10 w-24 md:h-20 md:w-20 border-4 border-white shadow-lg">
//           <AvatarImage src={employee.avatar} alt={employee.name} />
//           <AvatarFallback className="text-2xl bg-orange-300 text-orange-800">
//             {employee.name.split(' ').map(n => n[0]).join('')}
//           </AvatarFallback>
//         </Avatar>
//         <span
//           className={`absolute bottom-1 right-1 h-4 w-4 rounded-full ${getStatusColor(employee.status)} border-2 border-white`}
//           title={`Status: ${employee.status}`}
//         />
//       </div>

//       <div className="flex-1 text-center md:text-left">
//         <div className="flex flex-col md:flex-row md:items-center gap-2">
//           <h1 className="text-2xl md:text-3xl font-bold">{employee.name}</h1>
//           <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 self-center md:self-auto">
//             {employee.department}
//           </Badge>
//         </div>
//         <p className="text-lg text-gray-600 mt-1">{employee.jobTitle}</p>

//         <div className="mt-4 flex flex-col md:flex-row gap-4">
//           <div className="flex items-center gap-2">
//             <Mail className="h-4 w-4 text-orange-600" />
//             <span className="text-gray-700">{employee.email}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Phone className="h-4 w-4 text-orange-600" />
//             <span className="text-gray-700">{employee.phone}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="h-4 w-4 text-orange-600" />
//             <span className="text-gray-700">{employee.location}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// };

// export default ProfileHeader;


import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  avatar: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  status: "active" | "away" | "offline";
}

const ProfileHeader: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setEmployee({
          id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          avatar: data.avatar || '',
          jobTitle: data.job_title || 'Employee',
          email: data.email,
          phone: data.phone || '03021479915',
          location: data.location || 'Karachi',
          department: data.department || 'General',
          status: data.status || 'active',
        });
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "away": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  if (!employee) return <div>Loading profile...</div>;

  return (
    <div className="w-full bg-white text-gray-800 rounded-xl overflow-hidden shadow-[0_4px_5px_rgba(244,162,97,0.5)] animate-slide-up mb-6">
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center md:items-start">
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="text-xl bg-orange-300 text-orange-800">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className={`absolute bottom-1 right-1 h-4 w-4 rounded-full ${getStatusColor(employee.status)} border-2 border-white`} title={`Status: ${employee.status}`} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-2xl font-bold">{employee.name}</h1>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 self-center md:self-auto">
              {employee.department}
            </Badge>
          </div>
          <p className="text-lg text-gray-600 mt-1">{employee.jobTitle}</p>
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-600" /><span>{employee.email}</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-600" /><span>{employee.phone}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-orange-600" /><span>{employee.location}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
