import React from "react";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.png";
import banner4 from "../../assets/banner-2.jpg";
import banner5 from "../../assets/banner-3.png";

const services = [
  {
    id: 1,
    image: banner2,
    sale: "50%",
    title: "YALA NATIONAL PARK HALF DAY TOUR",
    subtitle: "Sri Lanka · Shared Jeep · Hotel Pickup",
    area: "Yala National Park · Half Day (≈4–5 hrs)",
    startTimes: "—",
    oldPrice: "$30.00",
    price: "$15.00",
    offerEnds: "05:14:58",
    details: [
      "Licensed tracker-guide",
      "Hotel pickup included",
      "Private jeep on request"
    ]
  },
  {
    id: 2,
    image: banner3,
    sale: "50%",
    title: "YALA NATIONAL PARK 7 HOUR SAFARI",
    subtitle: "Sri Lanka · Extended Tour",
    area: "Yala National Park · 7 Hours",
    startTimes: "—",
    oldPrice: "$42.00",
    price: "$21.00",
    offerEnds: "05:14:58",
    details: [
      "Licensed tracker-guide",
      "Hotel pickup included",
      "Private jeep on request"
    ]
  },
  {
    id: 3,
    image: banner4,
    sale: "50%",
    transit: true,
    title: "ELLA → YALA SAFARI & COASTAL DROP-OFF",
    subtitle: "Pickup in Ella · Safari in Yala · Drop-off along the South Coast",
    area: "Ella → Yala National Park → South Coast",
    startTimes: "3:00 AM, 12:00 PM",
    oldPrice: "$60.00",
    price: "$30.00",
    offerEnds: "02:57:00",
    details: [
      "Licensed tracker-guide",
      "Hotel pickup & coastal drop-off",
      "Private jeep on request"
    ]
  },
  {
    id: 4,
    image: banner5,
    sale: "50%",
    transit: true,
    title: "TANGALLE/HIRIKETIYA/MIRISSA/GALLE → YALA SAFARI → ELLA DROP-OFF",
    subtitle: "Pickup on the South Coast · Safari in Yala · Drop-off in Ella",
    area: "South Coast → Yala National Park → Ella",
    startTimes: "3:00 AM, 12:00 PM",
    oldPrice: "$60.00",
    price: "$30.00",
    offerEnds: "02:57:01",
    details: [
      "Licensed tracker-guide",
      "Hotel pickup & Ella drop-off",
      "Private jeep on request"
    ]
  }
];

const lastService = [
  {
    id: 1,
    image: banner2,
    sale: "50%",
    title: "YALA NATIONAL PARK HALF DAY TOUR",
    subtitle: "Sri Lanka · Shared Jeep · Hotel Pickup",
    area: "Yala National Park · Half Day (≈4–5 hrs)",
    startTimes: "01:14:58",
    oldPrice: "$30.00",
    price: "$15.00",
    offerEnds: "05:14:58",
    details: [
      "Licensed tracker-guide",
      "Hotel pickup included",
      "Private jeep on request"
    ]
  },
];

const Service = () => (
  <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900">
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
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2 flex flex-col items-center font-bold text-base shadow shadow-emerald-300">
              <span>SALE</span>
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
            <div className="bg-emerald-50 rounded-lg p-4 text-[15px] font-medium border border-emerald-100">
              <span className="text-black">
                <span className="font-bold">Route & Duration:</span> {service.area}
                <br />
                <span className="font-bold">Start times (Sri Lanka):</span> {service.startTimes}
              </span>
            </div>
            <div className="bg-emerald-100 rounded-xl p-5 flex flex-row items-center justify-between gap-6 border border-emerald-200">
              <div>
                <span className="text-gray-400 text-sm">was <s>{service.oldPrice}</s></span>
                <div className="text-emerald-700 font-bold text-2xl">{service.price}</div>
                <span className="text-black text-sm">per person (USD)</span>
              </div>
              <button className="min-w-[140px] bg-black hover:bg-emerald-700 text-white font-bold rounded-lg px-7 py-2 text-base transition shadow shadow-emerald-300 border-2 border-emerald-600">Book now</button>
            </div>
            <div className="text-sm text-black mt-1">
              Offer resets in <span className="bg-emerald-200 text-black font-bold px-2 py-1 rounded border border-emerald-400">{service.offerEnds}</span>
            </div>
            <button className="border border-emerald-600 bg-white hover:bg-emerald-50 text-black font-semibold rounded-lg px-6 py-2 text-base transition w-fit shadow">View Detail</button>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                <span className="bg-emerald-50 rounded-md px-4 py-2 min-w-[160px] text-sm font-medium text-center text-black border border-emerald-100">{service.details[0]}</span>
                <span className="bg-emerald-50 rounded-md px-4 py-2 min-w-[160px] text-sm font-medium text-center text-black border border-emerald-100">{service.details[1]}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                <span className="bg-emerald-100 rounded-md px-4 py-2 min-w-[160px] text-sm font-medium text-center text-black border border-emerald-200">{service.details[2]}</span>
              </div>
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
            <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
            <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2 flex flex-col items-center font-bold text-base shadow shadow-emerald-300 z-10"
              style={{ position: "absolute" }}>
              <span>SALE</span>
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
            <div className="bg-emerald-100 rounded-xl p-3 sm:p-4 text-[15px] sm:text-[16px] font-medium border border-emerald-200 mb-4 flex flex-col gap-2">
              <span className="text-black">
                <span className="font-bold">Area & Duration:</span> {service.area}
              </span>
              <span className="text-black">
                <span className="font-bold">Start times (Sri Lanka):</span>
                <span className="ml-2 px-2 sm:px-3 py-1 rounded bg-white border border-emerald-200 font-bold">{service.startTimes}</span>
              </span>
            </div>
            <div className="bg-emerald-100 rounded-xl p-5 flex flex-row items-center justify-between gap-6 border border-emerald-200">
              <div>
                <span className="text-gray-400 text-sm sm:text-base">was <s>{service.oldPrice}</s></span>
                <div className="text-emerald-900 font-bold text-xl sm:text-3xl">{service.price}</div>
                <span className="text-black text-sm sm:text-base">per person (USD)</span>
              </div>
              <button className="min-w-[140px] bg-black hover:bg-emerald-700 text-white font-bold rounded-lg px-7 py-2 text-base transition shadow shadow-emerald-300 border-2 border-emerald-600">Book now</button>
            </div>
            <div style={{ paddingLeft: '0px', paddingTop: '20px' }} >
            <button className="border border-emerald-600 bg-white hover:bg-emerald-100 text-black font-semibold rounded-lg px-5 sm:px-7 py-2 sm:py-2 text-base sm:text-lg transition w-fit shadow mb-4">View details</button>
              </div>
            <div className="flex flex-col gap-2 sm:gap-3 mt-2">
              <div className="flex flex-row flex-wrap gap-2 sm:gap-3 justify-start w-full">
                <span className="bg-emerald-100 rounded-md px-4 sm:px-5 py-2 min-w-[140px] sm:min-w-[180px] text-sm sm:text-base font-medium text-center text-black border border-emerald-200">{service.details[0]}</span>
                <span className="bg-emerald-100 rounded-md px-4 sm:px-5 py-2 min-w-[140px] sm:min-w-[180px] text-sm sm:text-base font-medium text-center text-black border border-emerald-200">{service.details[1]}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-2 sm:gap-3 justify-start w-full">
                <span className="bg-emerald-100 rounded-md px-4 sm:px-5 py-2 min-w-[140px] sm:min-w-[180px] text-sm sm:text-base font-medium text-center text-black border border-emerald-200">{service.details[2]}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Service;
