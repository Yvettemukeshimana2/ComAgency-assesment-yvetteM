 import React, { useState, useEffect } from "react";

 const Customer = () => {
   // State hooks for managing customers data, loading state, error state, current page, and customers per page
   const [customers, setCustomers] = useState([]); // Stores customer data fetched from the API
   const [loading, setLoading] = useState(true); // Indicates if data is being loaded
   const [error, setError] = useState(null); // Stores any error messages
   const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
   const [customersPerPage] = useState(6); // Defines how many customers to display per page

   // useEffect hook to fetch customer data when the component mounts
   useEffect(() => {
     const fetchCustomers = async () => {
       try {
         const response = await fetch(
           "https://comagency-assesmentyvette-serverside.onrender.com/api/v1/get-alll-customers"
         );
         if (!response.ok) {
           throw new Error("Failed to fetch customers"); // Throw an error if the response is not ok
         }
         const data = await response.json(); // Parse the JSON data from the response
         setCustomers(data.customers); // Set the customer data
       } catch (error) {
         console.error("Error fetching data:", error); // Log any errors
         setError(error.message); // Set the error message
       } finally {
         setLoading(false); // Set loading to false after the data is fetched or if an error occurs
       }
     };

     fetchCustomers(); // Call the function to fetch customer data
   }, []);

   // Logic for pagination: calculate indices for slicing the customer array
   const indexOfLastCustomer = currentPage * customersPerPage;
   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
   const currentCustomers = customers.slice(
     indexOfFirstCustomer,
     indexOfLastCustomer
   );

   // Function to change the current page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   if (loading) {
     return <p>Loading data...</p>; // Show loading message while data is being fetched
   }

   if (error) {
     return <p>Error: {error}</p>; // Show error message if there is an error fetching data
   }

   return (
     <div className="container mx-auto mt-10 bg-slate-700 overflow-x-auto">
       <h2 className="text-3xl font-bold text-center mb-4 h-20 text-white">
         Customer Information
       </h2>
       <table className="text-xs border-collapse border bg-opacity-55 bg-lime-600">
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
             // Map through the current customers and render each one as a table row
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
             // If no customers found, show a message
             <tr>
               <td colSpan="12" className="border px-4 py-2 text-center">
                 No customers found
               </td>
             </tr>
           )}
         </tbody>
       </table>
       {/* Pagination buttons */}
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
