// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import ReactImageMagnifier from "simple-image-magnifier/react";
// import Rating from "@/components/share/Rating";
// import { useGetSingleCarQuery } from "@/redux/api/baseApi"; // Update import path as needed
// import Loading from "@/utils/Loading";
// import Swal from "sweetalert2";

// const CarDetails = () => {
//   const { id } = useParams();
//   const { data, isLoading } = useGetSingleCarQuery(id);
//   const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   const { images, name, features, price, availability, reviews, description } =
//     data.data;

//   const handleBookNow = () => {
//     Swal.fire({
//       title: "Book Now",
//       text: "Would you like to proceed to the booking page?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, proceed",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Navigate to the booking page or perform booking logic
//         window.location.href = `/booking/${id}`;
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="lg:flex justify-evenly items-start mb-5">
//         {/* Car Images */}
//         <div className="flex-1 flex justify-center items-center max-h-[400px] md:max-h-max max-w-[800px] md:max-w-max overflow-hidden">
//           <ReactImageMagnifier
//             srcPreview={images[0]}
//             srcOriginal={images[0]}
//             className="max-w-xs bg-gray-200 rounded-lg md:max-w-none max-h-80 md:max-h-none"
//           />
//         </div>

//         {/* Car Details */}
//         <div className="md:w-2/6 space-y-2">
//           <h1 className="text-xl md:text-3xl font-bold">{name}</h1>
//           <p className="text-lg font-semibold">Price: $ {price}</p>
//           <p className="text-lg font-semibold">
//             Availability: {availability ? "Available" : "Not Available"}
//           </p>

//           <div>
//             <h2 className="text-lg font-semibold">Features:</h2>
//             <ul className="list-disc list-inside">
//               {features.map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="my-4">
//             <h2 className="text-lg font-semibold">
//               Select Additional Features:
//             </h2>
//             <div className="space-y-2">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   value="insurance"
//                   onChange={(e) =>
//                     setSelectedFeatures((prev) =>
//                       e.target.checked
//                         ? [...prev, e.target.value]
//                         : prev.filter((f) => f !== e.target.value)
//                     )
//                   }
//                 />
//                 <span className="ml-2">Insurance</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   value="gps"
//                   onChange={(e) =>
//                     setSelectedFeatures((prev) =>
//                       e.target.checked
//                         ? [...prev, e.target.value]
//                         : prev.filter((f) => f !== e.target.value)
//                     )
//                   }
//                 />
//                 <span className="ml-2">GPS</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   value="child-seat"
//                   onChange={(e) =>
//                     setSelectedFeatures((prev) =>
//                       e.target.checked
//                         ? [...prev, e.target.value]
//                         : prev.filter((f) => f !== e.target.value)
//                     )
//                   }
//                 />
//                 <span className="ml-2">Child Seat</span>
//               </label>
//             </div>
//           </div>

//           <Button
//             onClick={handleBookNow}
//             className="bg-[#0ccaab] text-white font-semibold text-lg rounded-xl hover:bg-gradient-to-r from-cyan-500 to-yellow-500"
//           >
//             Book Now
//           </Button>
//         </div>
//       </div>

//       <div className="my-5">
//         <h2 className="text-xl font-bold">Description:</h2>
//         <p className="text-base md:text-lg text-gray-500">{description}</p>
//       </div>

//       <div>
//         <h2 className="text-xl font-bold">Customer Reviews:</h2>
//         <div className="space-y-4">
//           {reviews.map((review) => (
//             <Card key={review.id} className="shadow-lg p-4 mb-4">
//               <CardHeader className="text-lg font-semibold">
//                 {review.name}
//               </CardHeader>
//               <CardContent>{review.text}</CardContent>
//               <CardFooter className="flex justify-between items-center">
//                 <Rating rating={review.rating} />
//                 <span className="text-gray-500">{review.date}</span>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;

const CarDetails = () => {
  return (
    <div>
      <h1>This is CarDetails component</h1>
    </div>
  );
};

export default CarDetails;
