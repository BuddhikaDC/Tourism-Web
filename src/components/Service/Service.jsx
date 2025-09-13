import React, { useState, useEffect } from "react";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.png";
import banner4 from "../../assets/banner-4.jpg";

const packageImages = [banner2, banner3, banner4];
const packageImages2 = [banner3, banner2, banner4];
const lastServiceImages = [banner2, banner3, banner4];

const packageRoute = [
  "Day 1: Sigiriya (Night 1)",
  "Day 2: Kandy - Dambulla (Night 2)",
  "Day 3: Ella / Nuwara Eliya (Night 3)",
  "Day 4: Galle / Hiriketiya / Ahangama (Night 4)",
  "Day 5: Colombo (Airport)"
];

const packageVehicles = [
  { type: "Sedan", capacity: 4, price: "30,000 LKR" },
  { type: "Mini", capacity: 4, price: "27,000 LKR" },
  { type: "Van", capacity: 7, price: "45,000 LKR" }
];

const packageRoute2 = [
  "Day 1: Sigiriya (Night 1)",
  "Day 2: Kandy (Night 2)",
  "Day 3: Ella (Night 3)",
  "Day 4: Yala / Udawalawa (Night 4)",
  "Day 5: Tangalla / Hiriketiya (Night 5)",
  "Day 6: Galle (Night 6)",
  "Day 7: Bentota (Night 7)",
  "Day 8: Colombo (Airport)"
];

const packageVehicles2 = [
  { type: "Mini", capacity: 4, price: "27,000 LKR" },
  { type: "Sedan", capacity: 4, price: "30,000 LKR" },
  { type: "Van", capacity: 7, price: "45,000 LKR" }
];

const services = [
  {
    id: 1,
    image: packageImages,
    sale: "5 Days / 4 Nights",
    title: "Sri Lanka Round Tour Package",
    subtitle: "Sigiriya, Kandy, Dambulla, Ella, Nuwara Eliya, Galle, Hiriketiya, Ahangama, Colombo",
    area: "See itinerary below",
    startTimes: "Flexible",
    oldPrice: "",
    price: "",
    offerEnds: "",
    route: packageRoute,
    vehicles: packageVehicles
  },
  {
    id: 2,
    image: packageImages2,
    sale: "8 Days / 7 Nights",
    title: "Sri Lanka 8 Days Round Tour Package",
    subtitle: "Sigiriya, Kandy, Ella, Yala, Udawalawa, Tangalla, Hiriketiya, Galle, Bentota, Colombo",
    area: "See itinerary below",
    startTimes: "Flexible",
    oldPrice: "",
    price: "",
    offerEnds: "",
    route: packageRoute2,
    vehicles: packageVehicles2
  }
];

const lastService = [
  {
    id: 1,
    image: lastServiceImages,
    sale: "8 Days / 7 Nights",
    title: "Sri Lanka 8 Days Adventure Tour",
    subtitle: "Sigiriya, Kandy, Ella, Yala, Udawalawa, Tangalla, Hiriketiya, Galle, Bentota, Colombo",
    area: "See itinerary below",
    startTimes: "Flexible",
    oldPrice: "",
    price: "",
    offerEnds: "",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy (Night 2)",
      "Day 3: Ella (Night 3)",
      "Day 4: Yala / Udawalawa (Night 4)",
      "Day 5: Tangalla / Hiriketiya (Night 5)",
      "Day 6: Galle (Night 6)",
      "Day 7: Bentota (Night 7)",
      "Day 8: Colombo (Night 8)"
    ],
    vehicles: [
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  }
];

const Service = () => {
  const [slideIdx1, setSlideIdx1] = useState(0);
  const [slideIdx2, setSlideIdx2] = useState(0);
  const [slideIdxLast, setSlideIdxLast] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setSlideIdx1((prev) => (prev + 1) % services[0].image.length);
    }, 3000);
    const interval2 = setInterval(() => {
      setSlideIdx2((prev) => (prev + 1) % services[1].image.length);
    }, 3000);
    const intervalLast = setInterval(() => {
      setSlideIdxLast((prev) => (prev + 1) % lastService[0].image.length);
    }, 3000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(intervalLast);
    };
  }, []);

  const buttonClass =
    "min-w-[140px] w-full sm:w-auto bg-black hover:bg-emerald-700 active:bg-emerald-700 text-white font-bold rounded-lg px-7 py-2 text-base transition shadow shadow-emerald-300 border-2 border-emerald-600 flex items-center justify-center";

  return (
    <div className="w-full bg-white from-gray-800 to-gray-900 bp-20 py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8 items-stretch">
        {services.map((service, idx) => (
          <div
            key={service.id}
            className={
              "bg-white rounded-2xl shadow-lg shadow-emerald-100 border border-emerald-200 overflow-hidden flex flex-col justify-between w-full max-w-[500px] mx-auto h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl active:-translate-y-2 active:shadow-2xl" +
              (idx < 2 ? " mt-6" : "")
            }
            style={{
              animation: "fadeUp 0.8s ease",
              animationFillMode: "both"
            }}
          >
            <div className="relative w-full h-[340px] sm:h-[220px]">
              <img
                src={idx === 0 ? service.image[slideIdx1] : service.image[slideIdx2]}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2 flex flex-col items-center font-bold text-base shadow shadow-emerald-300">
                <span>{service.sale}</span>
              </div>
              {service.transit && (
                <div className="absolute top-4 right-4 bg-black/80 text-white rounded-lg px-4 py-2 flex items-center font-bold text-base shadow">
                  <span className="text-white">Includes</span>
                  <span className="ml-2 px-2 py-1 rounded bg-emerald-600 text-white font-bold">Transit</span>
                </div>
              )}
            </div>
            <div className="px-6 py-6 sm:px-4 sm:py-4 flex flex-col gap-4 justify-between h-full">
              <h2 className="font-black text-xl text-black">{service.title}</h2>
              <div className="text-gray-700 text-base">{service.subtitle}</div>
              <div className="bg-emerald-100 rounded-xl p-4 mb-2 border border-emerald-200">
                <span className="font-bold text-black">Itinerary:</span>
                <ul className="list-disc pl-5 mt-2 text-black text-sm">
                  {service.route.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 mb-2 border border-emerald-200">
                <span className="font-bold text-black">Vehicle Options:</span>
                <div className="flex flex-row flex-wrap gap-4 mt-2">
                  {service.vehicles.map((v, i) => (
                    <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 text-black text-sm font-semibold shadow">
                      {v.type} <span className="text-gray-500">({v.capacity} pax)</span>
                      <div className="text-emerald-700 font-bold">{v.price} <span className="text-xs text-gray-600">per day</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
                <a
                  href={`https://wa.me/94717244821?text=${encodeURIComponent(
                    `Hello, I am interested in the "${service.title}" package.\nItinerary:\n${service.route.join('\n')}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  Book This Package
                </a>
                <button
                  className="border border-emerald-600 bg-white text-black font-semibold rounded-lg px-7 py-2 text-base w-full sm:w-auto transition hover:bg-emerald-50 hover:border-emerald-700"
                  style={{ boxShadow: "none" }}
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-y-10 gap-x-8 items-stretch mt-10">
        {lastService.map((service) => (
          <div
            className="bg-white rounded-2xl shadow-lg shadow-emerald-100 border border-emerald-200 overflow-hidden flex flex-col lg:flex-row w-full max-w-[1156px] mx-auto h-full mt-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl active:-translate-y-2 active:shadow-2xl"
            key={service.id}
          >
            <div className="relative w-full h-[220px] sm:h-[260px] lg:w-1/2 lg:h-auto flex-shrink-0">
              <img src={service.image[slideIdxLast]} alt={service.title} className="object-cover w-full h-full" />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2 flex flex-col items-center font-bold text-base shadow shadow-emerald-300 z-10"
                style={{ position: "absolute" }}>
               
                <span>{service.sale}</span>
              </div>
              {service.transit && (
                <div className="absolute top-4 right-4 bg-black/80 text-white rounded-lg px-4 py-2 flex items-center font-bold text-base shadow">
                  <span className="text-white">Includes</span>
                  <span className="ml-2 px-2 py-1 rounded bg-emerald-600 text-white font-bold">Transit</span>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between px-4 py-6 sm:px-8 sm:py-8">
              <h2 className="font-black text-xl sm:text-2xl text-black mb-2">{service.title}</h2>
              <div className="text-emerald-900 text-base sm:text-lg mb-4">{service.subtitle}</div>
              <div className="bg-emerald-100 rounded-xl p-4 mb-2 border border-emerald-200">
                <span className="font-bold text-black">Itinerary:</span>
                <ul className="list-disc pl-5 mt-2 text-black text-sm">
                  {service.route.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 mb-2 border border-emerald-200">
                <span className="font-bold text-black">Vehicle Options:</span>
                <div className="flex flex-row flex-wrap gap-4 mt-2">
                  {service.vehicles.map((v, i) => (
                    <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 text-black text-sm font-semibold shadow">
                      {v.type} <span className="text-gray-500">({v.capacity} pax)</span>
                      <div className="text-emerald-700 font-bold">{v.price} <span className="text-xs text-gray-600">per day</span></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
                <a
                  href={`https://wa.me/94717244821?text=${encodeURIComponent(
                    `Hello, I am interested in the "${service.title}" package.\nItinerary:\n${service.route.join('\n')}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  Book This Package
                </a>
                <button
                  className="border border-emerald-600 bg-white text-black font-semibold rounded-lg px-7 py-2 text-base w-full sm:w-auto transition hover:bg-emerald-50 hover:border-emerald-700"
                  style={{ boxShadow: "none" }}
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
