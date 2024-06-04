 import React, { useState, useEffect } from "react";

 const Customer = () => {
   const [customers, setCustomers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [customersPerPage] = useState(6);

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
         setCustomers(data.customers);
       } catch (error) {
         console.error("Error fetching data:", error);
         setError(error.message);
       } finally {
         setLoading(false);
       }
     };

     fetchCustomers();
   }, []);

   const indexOfLastCustomer = currentPage * customersPerPage;
   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
   const currentCustomers = customers.slice(
     indexOfFirstCustomer,
     indexOfLastCustomer
   );

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   if (loading) {
     return <p>Loading data...</p>;
   }

   if (error) {
     return <p>Error: {error}</p>;
   }

   return (
     <div className="container mx-auto mt-10 bg-slate-700 overflow-x-auto">
       <h2 className="text-3xl font-bold text-center mt-8 h-20 text-white">
         Customer Information
       </h2>
       <div className="overflow-x-auto">
         <div className="bg-opacity-55">
           <div className="flex flex-wrap justify-center">
             {currentCustomers.length > 0 ? (
               currentCustomers.map((customer) => (
                 <div
                   key={customer._id}
                   className="bg-lime-500 text-xs   m-2 p-4 border bg-opacity-60 rounded-lg flex flex-col md:flex-row md:space-x-4 w-full md:w-auto"
                 >
                   <div className="flex flex-col">
                     <span className="font-bold">Full Name:</span>
                     <span>{customer.fullName}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Age:</span>
                     <span>{customer.age}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Gender:</span>
                     <span>{customer.gender}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Nationality:</span>
                     <span>{customer.nationality}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Identification:</span>
                     <span>{customer.identification}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Passport Number:</span>
                     <span>{customer.passport}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Purpose of Visit:</span>
                     <span>{customer.purposeOfVisit}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Duration of Stay:</span>
                     <span>{customer.durationOfStay}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Date of Entry:</span>
                     <span>{customer.dateOfEntry}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Port of Entry:</span>
                     <span>{customer.portOfEntry}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Email Address:</span>
                     <span>{customer.emailAddress}</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold">Phone Number:</span>
                     <span>{customer.phoneNumber}</span>
                   </div>
                 </div>
               ))
             ) : (
               <div className="text-center w-full text-white">
                 No customers found
               </div>
             )}
           </div>
         </div>
       </div>
       <div className="flex justify-center mt-4 flex-wrap">
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
