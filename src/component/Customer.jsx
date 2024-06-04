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
         // Fetch customer data from the API
         const response = await fetch(
           "https://comagency-assesmentyvette-serverside.onrender.com/api/v1/get-alll-customers"
         );
         // Check if the response is ok
         if (!response.ok) {
           throw new Error("Failed to fetch customers"); // Throw an error if the response is not ok
         }
         // Parse the JSON data from the response
         const data = await response.json();
         // Set the customer data
         setCustomers(data.customers);
       } catch (error) {
         // Log any errors fetching data
         console.error("Error fetching data:", error);
         // Set the error message
         setError(error.message);
       } finally {
         // Set loading to false after the data is fetched or if an error occurs
         setLoading(false);
       }
     };

     // Call the function to fetch customer data
     fetchCustomers();
   }, []);

   // Function to handle deleting a customer
   const handleDelete = async (customerId) => {
     try {
       // Delete the customer by sending a DELETE request to the API
       const response = await fetch(
         `https://comagency-assesmentyvette-serverside.onrender.com/api/v1/delete-customer/${customerId}`,
         {
           method: "DELETE", // Specify the DELETE method
         }
       );
       // Check if the response is ok
       if (!response.ok) {
         throw new Error("Failed to delete customer"); // Throw an error if the response is not ok
       }
       // Update the state to remove the deleted customer
       setCustomers(
         customers.filter((customer) => customer._id !== customerId)
       );
     } catch (error) {
       // Log any errors while deleting customer
       console.error("Error deleting customer:", error);
     }
   };

   // Logic for pagination: calculate indices for slicing the customer array
   const indexOfLastCustomer = currentPage * customersPerPage;
   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
   // Get the customers to display on the current page
   const currentCustomers = customers.slice(
     indexOfFirstCustomer,
     indexOfLastCustomer
   );

   // Function to change the current page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Render loading state while data is being fetched
   if (loading) {
     return <p>Loading data...</p>;
   }

   // Render error message if there's an error fetching data
   if (error) {
     return <p>Error: {error}</p>;
   }

   // Render the customer information
   return (
     <div className="container mx-auto mt-10 bg-slate-700 overflow-x-auto">
       <h2 className="text-3xl font-bold text-center mt-8 h-20 text-white">
         Customer Information
       </h2>

       <div className="overflow-x-auto">
         <div className="flex flex-wrap justify-center">
           {/* Map through the current customers and render each one */}
           {currentCustomers.length > 0 ? (
             currentCustomers.map((customer) => (
               <div
                 key={customer._id}
                 className="bg-lime-600 text-xs m-2 p-4 border rounded-lg flex flex-col md:flex-row md:space-x-4 w-full md:w-auto"
               >
                 {/* Display customer information */}
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
                 {/* Delete button */}
                 <button
                   onClick={() => handleDelete(customer._id)}
                   className="bg-slate-950 w-20 text-white px-3 py-1 mr-96 rounded"
                 >
                   Delete
                 </button>
               </div>
             ))
           ) : (
             <div className="text-center w-full text-white">
               No customers found
             </div>
           )}
         </div>
       </div>

       {/* Pagination buttons */}
       <div className="flex justify-center mt-4 flex-wrap">
         {/* Generate pagination buttons */}
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
