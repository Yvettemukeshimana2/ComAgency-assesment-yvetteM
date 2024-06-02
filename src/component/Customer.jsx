 import React, { useState, useEffect } from "react";

 const Customer = () => {
   const [customers, setCustomers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [customersPerPage] = useState(5); // Number of customers per page

   useEffect(() => {
     const fetchCustomers = async () => {
       try {
         const response = await fetch(
           "https://comagency-assesmentyvette-serverside.onrender.com/api/v1/get-alll-customers"
         );
         if (!response.ok) {
           throw new Error("Failed to fetch customers");
         }
         const data = await response.json();
         setCustomers(data.customers); // Access 'customers' property
       } catch (error) {
         console.error("Error fetching data:", error);
         setError(error.message);
       } finally {
         setLoading(false);
       }
     };

     fetchCustomers();
   }, []);

   // Logic for pagination
   const indexOfLastCustomer = currentPage * customersPerPage;
   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
   const currentCustomers = customers.slice(
     indexOfFirstCustomer,
     indexOfLastCustomer
   );

   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   if (loading) {
     return <p>Loading data...</p>;
   }

   if (error) {
     return <p>Error: {error}</p>;
   }

   return (
     <div className="container mx-auto mt-10 bg-slate-700">
       <h2 className="text-3xl font-bold text-center mb-4 h-20 text-white  ">
         Customer Information
       </h2>
       <table className=" text-xs border-collapse border bg-opacity-55 bg-lime-600">
         <thead>
           <tr>
             <th className="border py-2 px-4">Full Name</th>
             <th className="border py-2 px-4">Age</th>
             <th className="border py-2 px-4">Gender</th>
             <th className="border py-2 px-4">Nationality</th>
             <th className="border py-2 px-4">Identification</th>
             <th className="border py-2 px-4">Passport Number</th>
             <th className="border py-2 px-4">Purpose of Visit</th>
             <th className="border py-2 px-4">Duration of Stay</th>
             <th className="border py-2 px-4">Date of Entry</th>
             <th className="border py-2 px-4">Port of Entry</th>
             <th className="border py-2 px-4">Email Address</th>
             <th className="border py-2 px-4">Phone Number</th>
           </tr>
         </thead>
         <tbody>
           {currentCustomers.length > 0 ? (
             currentCustomers.map((customer) => (
               <tr key={customer._id}>
                 <td className="border px-4 py-2">{customer.fullName}</td>
                 <td className="border px-4 py-2">{customer.age}</td>
                 <td className="border px-4 py-2">{customer.gender}</td>
                 <td className="border px-4 py-2">{customer.nationality}</td>
                 <td className="border px-4 py-2">{customer.identification}</td>
                 <td className="border px-4 py-2">{customer.passport}</td>
                 <td className="border px-4 py-2">{customer.purposeOfVisit}</td>
                 <td className="border px-4 py-2">{customer.durationOfStay}</td>
                 <td className="border px-4 py-2">{customer.dateOfEntry}</td>
                 <td className="border px-4 py-2">{customer.portOfEntry}</td>
                 <td className="border px-4 py-2">{customer.emailAddress}</td>
                 <td className="border px-4 py-2">{customer.phoneNumber}</td>
               </tr>
             ))
           ) : (
             <tr>
               <td colSpan="12" className="border px-4 py-2 text-center">
                 No customers found
               </td>
             </tr>
           )}
         </tbody>
       </table>
       {/* Pagination */}
       <div className="flex justify-center mt-4">
         {Array.from(
           { length: Math.ceil(customers.length / customersPerPage) },
           (_, i) => (
             <button
               key={i}
               onClick={() => paginate(i + 1)}
               className="mx-1 px-3 py-1 bg-gray-200 rounded"
             >
               {i + 1}
             </button>
           )
         )}
       </div>
     </div>
   );
 };

 export default Customer;
