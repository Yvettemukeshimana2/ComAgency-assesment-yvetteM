 import React, { useState } from "react";
 import border from "./images/border.jpg"

 const Form = () => {
   const [formData, setFormData] = useState({
     fullName: "",
     age: "",
     gender: "",
     nationality: "",
     nationalId: "",
     passportNumber: "",
     purposeOfVisit: "",
     durationOfStay: "",
     dateOfEntry: "",
     portOfEntry: "",
     email: "",
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

   const validateNationalId = (nationalId) => {
     return /^[A-Za-z0-9]{6,12}$/.test(nationalId);
   };

   const validatePassportNumber = (passportNumber) => {
     return /^[A-Za-z0-9]{6,9}$/.test(passportNumber);
   };

   const handleSubmit = (e) => {
     e.preventDefault();

     if (!validateEmail(formData.email)) {
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
       !validateNationalId(formData.nationalId)
     ) {
       alert(
         "National ID should be alphanumeric and between 6 to 12 characters"
       );
       return;
     }

     if (
       formData.nationality === "Foreign" &&
       !validatePassportNumber(formData.passportNumber)
     ) {
       alert(
         "Passport Number should be alphanumeric and between 6 to 9 characters"
       );
       return;
     }
// Submit form data
     console.log(formData);
   };

   return (
     <div className="container mx-auto">
       <div className="rounded-lg flex flex-col">
         <div className="bg-slate-950  ">
           <h1 className="text-4xl font-bold text-center mt-10 text-white">
             Customs Information Form
           </h1>
           <div
             className=""
             style={{
               backgroundImage: `url(${border})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               height: "80vh",
               width: "100%",
             }}
           >
             <form
               onSubmit={handleSubmit}
               className="space-y-4 mt-12 text-center "
             >
               <div className="space-y-4 mt-12 flex flex-row flex-wrap ">
                 <div className=" bg-slate-950 bg-opacity-40 rounded-lg mt-4 ml-10   md:w-1/2 lg:w-1/3">
                   <h1 className="text-white text-2xl font-semibold">
                     PERSONAL IMFORMATION
                   </h1>
                   <div className="mt-4 ">
                     <label htmlFor="fullName" className=" text-white">
                       Full Name
                     </label>
                     <input
                       className="ml-2 w-60 rounded-md"
                       type="text"
                       id="fullName"
                       name="fullName"
                       value={formData.fullName}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="mt-4">
                     <label htmlFor="age" className=" text-white">
                       Age
                     </label>
                     <input
                       className="ml-10 w-60 rounded-md"
                       type="number"
                       id="age"
                       name="age"
                       value={formData.age}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="mt-4">
                     <label htmlFor="gender" className=" text-white">
                       Gender
                     </label>
                     <select
                       className="ml-4 w-60 rounded-md"
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
                   <div className="mt-4 flex">
                     <label htmlFor="nationality" className=" text-white">
                       Nationality
                     </label>
                     <select
                       className="ml-4 w-60 rounded-md"
                       id="nationality"
                       name="nationality"
                       value={formData.nationality}
                       onChange={handleChange}
                       required
                     >
                       <option value="" className="text-black">
                         Select Nationality
                       </option>
                       <option value="Local" className="text-black">
                         Local
                       </option>
                       <option value="Foreign" className="text-black">
                         Foreign
                       </option>
                     </select>
                   </div>
                   {formData.nationality === "Local" ? (
                     <div className="mt-4 flex">
                       <label htmlFor="nationalId" className=" text-white">
                         National ID Number
                       </label>
                       <input
                         className="ml-4 w-60 rounded-md"
                         type="text"
                         id="nationalId"
                         name="nationalId"
                         value={formData.nationalId}
                         onChange={handleChange}
                         required
                       />
                     </div>
                   ) : (
                     <div className="mt-4 flex">
                       <label htmlFor="passportNumber" className=" text-white">
                         Passport Number
                       </label>
                       <input
                         className="ml-4 w-60 rounded-md"
                         type="text"
                         id="passportNumber"
                         name="passportNumber"
                         value={formData.passportNumber}
                         onChange={handleChange}
                         required
                       />
                     </div>
                   )}
                 </div>
                 <div className="bg-slate-950 bg-opacity-40 rounded-lg mb-6 ml-5 md:w-1/2 lg:w-1/3">
                   {/* Travel Information Section */}
                   <h6 className="text-white text-2xl font-semibold">
                     TRAVEL IMFORMATION
                   </h6>
                   <div className="flex justify-between mt-5 mr-5">
                     <label htmlFor="purposeOfVisit" className="text-white ">
                       Purpose of Visit
                     </label>
                     <select
                       className="ml-4 w-60 rounded-md"
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
                       <option value="Other">Other</option>
                     </select>
                   </div>
                   <div className="flex mt-5 justify-between mr-5">
                     <label htmlFor="durationOfStay" className="text-white ">
                       Duration of Stay
                     </label>
                     <input
                       className="ml-4 w-60 rounded-md"
                       type="number"
                       id="durationOfStay"
                       name="durationOfStay"
                       value={formData.durationOfStay}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex justify-between mt-5 mr-5">
                     <label htmlFor="dateOfEntry" className="text-white ">
                       Date of Entry
                     </label>
                     <input
                       className="ml-4 w-60 rounded-md "
                       type="date"
                       id="dateOfEntry"
                       name="dateOfEntry"
                       value={formData.dateOfEntry}
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex justify-between m-5">
                     <label htmlFor="portOfEntry" className=" text-white">
                       Port of Entry
                     </label>
                     <select
                       className=" w-60 rounded-md ml-14"
                       id="portOfEntry"
                       name="portOfEntry"
                       value={formData.portOfEntry}
                       onChange={handleChange}
                       required
                     >
                       <option value="">Select Port</option>
                       <option value="Port A">Port A</option>
                       <option value="Port B">Port B</option>
                       <option value="Port C">Port C</option>
                       <option value="Port D">Port D</option>
                     </select>
                   </div>

                   {/* Contact Information Section */}
                   <h2 className=" bg-slate-950 text-white text-2xl  bg-opacity-40 rounded-lg  ">
                     CONTACT IMFORMATION
                   </h2>
                   <div className="flex justify-between mr-5">
                     <label htmlFor="email" className="text-white ">
                       Email Address
                     </label>
                     <input
                       className="ml-4 w-60 rounded-md"
                       type="email"
                       id="email"
                       name="email"

                       value={this.state.email}
                      
                       onChange={handleChange}
                       required
                     />
                   </div>
                   <div className="flex justify-between mt-4 mb-8 mr-5">
                     <label htmlFor="phoneNumber" className="text-white ">
                       Phone Number
                     </label>
                     <input
                       className="ml-4 w-60 rounded-md"
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
               <div className="">
                 <button
                   type="submit"
                   className="bg-teal-900 hover:bg-teal-400 text-black mr-56 font-bold  md:w-80 rounded-md"
                 >
                   Submit
                 </button>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default Form;
