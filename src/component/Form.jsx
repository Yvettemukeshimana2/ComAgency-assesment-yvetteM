 import React, { useState } from "react";
 import border from "../images/th.jpg";
 import { Link } from "react-router-dom";

 const Form = () => {
   const [formData, setFormData] = useState({
     fullName: "",
     age: "",
     gender: "",
     nationality: "",
     identification: "",
     passport: "",
     purposeOfVisit: "",
     durationOfStay: "",
     dateOfEntry: "",
     portOfEntry: "",
     emailAddress: "",
     phoneNumber: "",
   });

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData({
       ...formData,
       [name]: value,
     });
   };

   const validateEmail = (email) => {
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return re.test(email);
   };

   const validatePhoneNumber = (phoneNumber) => {
     return /^\d{10,}$/.test(phoneNumber);
   };

   const validateAge = (age) => {
     return age >= 0 && age <= 120;
   };

   const validateDateOfEntry = (date) => {
     const today = new Date();
     const entryDate = new Date(date);
     return entryDate <= today;
   };

   const validateNationalId = (identification) => {
     return /^[A-Za-z0-9]{6,12}$/.test(identification);
   };

   const validatePassportNumber = (passport) => {
     return /^[A-Za-z0-9]{6,9}$/.test(passport);
   };

   const handleSubmit = async (e) => {
     e.preventDefault();

     if (!validateEmail(formData.emailAddress)) {
       alert("Invalid email format");
       return;
     }

     if (!validatePhoneNumber(formData.phoneNumber)) {
       alert("Phone number should be numeric and at least 10 digits");
       return;
     }

     if (!validateAge(formData.age)) {
       alert("Age should be a number between 0 and 120");
       return;
     }

     if (!validateDateOfEntry(formData.dateOfEntry)) {
       alert("Date of Entry should not be in the future");
       return;
     }

     if (
       formData.nationality === "Local" &&
       !validateNationalId(formData.identification)
     ) {
       alert(
         "National ID should be alphanumeric and between 6 to 12 characters"
       );
       return;
     }

     if (
       formData.nationality === "Foreign" &&
       !validatePassportNumber(formData.passport)
     ) {
       alert(
         "Passport Number should be alphanumeric and between 6 to 9 characters"
       );
       return;
     }

     try {
       const response = await fetch(
         "https://comagency-assesmentyvette-serverside.onrender.com/api/v1/create-customer",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(formData),
         }
       );

       if (response.ok) {
         alert("Customer created successfully!");
       } else {
         alert("Failed to create customer. Please try again.");
       }
     } catch (error) {
       alert("An error occurred. Please try again.");
     }
   };

   return (
     <div className="container mx-auto p-4">
       <div className="rounded-lg flex flex-col bg-slate-950 p-4">
         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
           <h1 className="text-4xl font-bold text-center text-white mb-4 md:mb-0 md:text-left">
             Customs Form
           </h1>
           <Link to="/customer">
             <div className="text-xl rounded-3xl bg-lime-800 w-full md:w-72 h-10 font-bold text-center py-2 hover:bg-lime-500 text-white">
               CUSTOMER_INFORMATION
             </div>
           </Link>
         </div>
         <div
           style={{
             backgroundImage: `url(${border})`,
             backgroundSize: "cover",
             backgroundPosition: "center",
             height: "auto",
             width: "100%",
           }}
           className="p-4 rounded-lg bg-opacity-75"
         >
           <form onSubmit={handleSubmit} className="space-y-4 text-center">
             <div className="flex flex-col md:flex-row md: md:space-x-4">
               {/* Personal Information Section */}
               <div className="bg-slate-950 bg-opacity-75 rounded-lg p-4 mb-4 md:w-full lg:w-1/3">
                 <h2 className="text-white text-2xl font-semibold mb-4">
                   PERSONAL INFORMATION
                 </h2>
                 <div className="flex flex-col space-y-4">
                   <div className="flex flex-col">
                     <label htmlFor="fullName" className="text-white">
                       Full Name
                     </label>
                     <input
                       className="w-full rounded-md bg-gray-400 p-2"
                       type="text"
                       id="fullName"
                       name="fullName"
                       value={formData.fullName}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="age" className="text-white">
                       Age
                     </label>
                     <input
                       className="w-full rounded-md bg-gray-400 p-2"
                       type="number"
                       id="age"
                       name="age"
                       value={formData.age}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="gender" className="text-white">
                       Gender
                     </label>
                     <select
                       className="w-full rounded-md bg-gray-400 p-2"
                       id="gender"
                       name="gender"
                       value={formData.gender}
                       onChange={handleChange}
                       required
                     >
                       <option value="">Select Gender</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Other">Other</option>
                     </select>
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="nationality" className="text-white">
                       Nationality
                     </label>
                     <select
                       className="w-full rounded-md bg-gray-400 p-2"
                       id="nationality"
                       name="nationality"
                       value={formData.nationality}
                       onChange={handleChange}
                       required
                     >
                       <option value="">Select Nationality</option>
                       <option value="Local">Local</option>
                       <option value="Foreign">Foreign</option>
                     </select>
                   </div>
                   {formData.nationality === "Local" ? (
                     <div className="flex flex-col">
                       <label htmlFor="nationalId" className="text-white">
                         National ID Number
                       </label>
                       <input
                         className="w-full rounded-md bg-gray-400 p-2"
                         type="text"
                         id="identification"
                         name="identification"
                         value={formData.identification}
                         onChange={handleChange}
                         required
                       />
                     </div>
                   ) : (
                     <div className="flex flex-col">
                       <label htmlFor="passportNumber" className="text-white">
                         Passport Number
                       </label>
                       <input
                         className="w-full rounded-md bg-gray-400 p-2"
                         type="text"
                         id="passport"
                         name="passport"
                         value={formData.passport}
                         onChange={handleChange}
                         required
                       />
                     </div>
                   )}
                 </div>
               </div>
               {/* Travel Information Section */}
               <div className="bg-slate-950 bg-opacity-75 rounded-lg p-4 mb-4 md:w-full lg:w-1/3">
                 <h2 className="text-white text-2xl font-semibold mb-4">
                   TRAVEL INFORMATION
                 </h2>
                 <div className="flex flex-col space-y-4">
                   <div className="flex flex-col">
                     <label htmlFor="purposeOfVisit" className="text-white">
                       Purpose of Visit
                     </label>
                     <select
                       className="w-full rounded-md bg-gray-400 p-2"
                       id="purposeOfVisit"
                       name="purposeOfVisit"
                       value={formData.purposeOfVisit}
                       onChange={handleChange}
                       required
                     >
                       <option value="">Select Purpose</option>
                       <option value="Tourism">Tourism</option>
                       <option value="Business">Business</option>
                       <option value="Education">Education</option>
                       <option value="Employment">Employment</option>
                     </select>
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="durationOfStay" className="text-white">
                       Duration of Stay
                     </label>
                     <input
                       className="w-full rounded-md bg-gray-400 p-2"
                       type="number"
                       id="durationOfStay"
                       name="durationOfStay"
                       value={formData.durationOfStay}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="dateOfEntry" className="text-white">
                       Date of Entry
                     </label>
                     <input
                       className="w-full rounded-md bg-gray-400 p-2"
                       type="date"
                       id="dateOfEntry"
                       name="dateOfEntry"
                       value={formData.dateOfEntry}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="portOfEntry" className="text-white">
                       Port of Entry
                     </label>
                     <select
                       className="w-full rounded-md bg-gray-400 p-2"
                       id="portOfEntry"
                       name="portOfEntry"
                       value={formData.portOfEntry}
                       onChange={handleChange}
                       required
                     >
                       <option value="">Select Port</option>
                       <option value="Port A">Gatuna</option>
                       <option value="Port B">Kagitumba</option>
                       <option value="Port C">Cyanika</option>
                       <option value="Port D">Rusumo</option>
                     </select>
                   </div>
                 </div>
               </div>
               {/* Contact Information Section */}
               <div className="bg-slate-950 bg-opacity-75 rounded-lg p-4 mb-4 md:w-full lg:w-1/3">
                 <h2 className="text-white text-2xl font-semibold mb-4">
                   CONTACT INFORMATION
                 </h2>
                 <div className="flex flex-col space-y-4">
                   <div className="flex flex-col">
                     <label htmlFor="emailAddress" className="text-white">
                       Email Address
                     </label>
                     <input
                       className="w-full rounded-md bg-gray-400 p-2"
                       type="email"
                       id="emailAddress"
                       name="emailAddress"
                       value={formData.emailAddress}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex flex-col">
                     <label htmlFor="phoneNumber" className="text-white">
                       Phone Number
                     </label>
                     <input
                       className="w-full rounded-md bg-gray-400 p-2"
                       type="text"
                       id="phoneNumber"
                       name="phoneNumber"
                       value={formData.phoneNumber}
                       onChange={handleChange}
                       required
                     />
                   </div>
                 </div>
               </div>
             </div>
             {/* Submit button */}
             <button
               type="submit"
               className="bg-lime-800 hover:bg-lime-500 w-full md:w-48 h-10 rounded-md text-white font-bold mt-4"
             >
               Submit
             </button>
           </form>
         </div>
       </div>
     </div>
   );
 };

 export default Form;
