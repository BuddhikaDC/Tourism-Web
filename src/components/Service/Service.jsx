import React, { useState, useEffect } from "react";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.png";
import banner4 from "../../assets/banner-4.jpg";

const packageImages = [banner2, banner3, banner4];
const packageImages2 = [banner3, banner2, banner4];
const packageImages3 = [banner2, banner3, banner4]; // You can use different images if needed

const packages = [
  {
    id: 1,
    images: packageImages,
    sale: "5 Days / 4 Nights",
    title: "Sri Lanka Round Tour Package",
    subtitle: "Sigiriya, Kandy, Dambulla, Ella, Nuwara Eliya, Galle, Hiriketiya, Ahangama, Colombo",
    overview: "Experience the highlights of Sri Lanka in 5 days with guided tours, scenic drives, and comfortable vehicles.",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy - Dambulla (Night 2)",
      "Day 3: Ella / Nuwara Eliya (Night 3)",
      "Day 4: Galle / Hiriketiya / Ahangama (Night 4)",
      "Day 5: Colombo (Airport)"
    ],
    vehicles: [
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  },
  {
    id: 2,
    images: packageImages2,
    sale: "8 Days / 7 Nights",
    title: "Sri Lanka 8 Days Round Tour Package",
    subtitle: "Sigiriya, Kandy, Ella, Yala, Udawalawa, Tangalla, Hiriketiya, Galle, Bentota, Colombo",
    overview: "Discover Sri Lanka's best destinations in 8 days, including cultural sites, nature, and beaches.",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy (Night 2)",
      "Day 3: Ella (Night 3)",
      "Day 4: Yala / Udawalawa (Night 4)",
      "Day 5: Tangalla / Hiriketiya (Night 5)",
      "Day 6: Galle (Night 6)",
      "Day 7: Bentota (Night 7)",
      "Day 8: Colombo (Airport)"
    ],
    vehicles: [
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  },
  {
    id: 3,
    images: packageImages3,
    sale: "8 Days / 7 Nights",
    title: "Sri Lanka 8 Days Round Tour Package",
    subtitle: "Sigiriya, Kandy, Ella, Yala, Udawalawa, Tangalla, Hiriketiya, Galle, Bentota, Colombo",
    overview: "Discover Sri Lanka's best destinations in 8 days, including cultural sites, nature, and beaches.",
    route: [
      "Day 1: Sigiriya (Night 1)",
      "Day 2: Kandy (Night 2)",
      "Day 3: Ella (Night 3)",
      "Day 4: Yala / Udawalawa (Night 4)",
      "Day 5: Tangalla / Hiriketiya (Night 5)",
      "Day 6: Galle (Night 6)",
      "Day 7: Bentota (Night 7)",
      "Day 8: Colombo (Airport)"
    ],
    vehicles: [
      { type: "Mini", capacity: 4, price: "27,000 LKR" },
      { type: "Sedan", capacity: 4, price: "30,000 LKR" },
      { type: "Van", capacity: 7, price: "45,000 LKR" }
    ]
  }
];

const tabList = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "vehicles", label: "Vehicle Options" }
];

const Service = () => {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % packages[selectedPackage].images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedPackage]);

  const packageTabClass = (idx) =>
    `px-4 py-2 rounded-full font-semibold transition-colors duration-150 ${
      selectedPackage === idx
        ? "bg-emerald-600 text-white"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const tabButtonClass = (tab) =>
    `px-4 py-2 rounded-lg font-semibold transition-colors duration-150 ${
      activeTab === tab
        ? "bg-emerald-600 text-white"
        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
    }`;

  const pkg = packages[selectedPackage];

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        {/* Title and subtitle */}
        <div className="w-full flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-black tracking-tight text-center">Our Packages</h2>
          <p className="mt-2 text-base text-gray-600 text-center font-medium">
            Crafting unforgettable journeys across Sri Lanka's wild and wonder.
          </p>
        </div>
        {/* Package tab buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className={packageTabClass(0)} onClick={() => { setSelectedPackage(0); setSlideIdx(0); setActiveTab("overview"); }}>
            5 Days / 4 Nights
          </button>
          <button className={packageTabClass(1)} onClick={() => { setSelectedPackage(1); setSlideIdx(0); setActiveTab("overview"); }}>
            8 Days / 7 Nights
          </button>
          <button className={packageTabClass(2)} onClick={() => { setSelectedPackage(2); setSlideIdx(0); setActiveTab("overview"); }}>
            8 Days / 7 Nights
          </button>
        </div>
        {/* Single card unit with white background */}
        <div className="w-full flex flex-col lg:flex-row rounded-2xl border border-emerald-200 shadow-lg bg-white overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-emerald-200 hover:ring-4 hover:ring-emerald-100">
          {/* Left: Image slider */}
          <div className="relative w-full lg:w-1/2 aspect-video flex-shrink-0">
            <img
              src={pkg.images[slideIdx]}
              alt={pkg.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2 flex flex-col items-center font-bold text-base shadow shadow-emerald-300 z-10">
              <span>{pkg.sale}</span>
            </div>
          </div>
          {/* Right: Details with tabs */}
          <div className="flex-1 flex flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 bg-white">
            <h2 className="font-black text-2xl text-black mb-2">{pkg.title}</h2>
            <div className="text-emerald-900 text-base mb-4">{pkg.subtitle}</div>
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {tabList.map(tab => (
                <button
                  key={tab.key}
                  className={tabButtonClass(tab.key)}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 min-h-[120px]">
              {activeTab === "overview" && (
                <div className="text-black text-base">{pkg.overview}</div>
              )}
              {activeTab === "itinerary" && (
                <ul className="list-disc pl-5 mt-2 text-black text-sm">
                  {pkg.route.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              )}
              {activeTab === "vehicles" && (
                <div className="flex flex-row flex-wrap gap-4 mt-2">
                  {pkg.vehicles.map((v, i) => (
                    <div key={i} className="bg-white border border-emerald-200 rounded-lg px-4 py-2 text-black text-sm font-semibold shadow">
                      {v.type} <span className="text-gray-500">({v.capacity} pax)</span>
                      <div className="text-emerald-700 font-bold">{v.price} <span className="text-xs text-gray-600">per day</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Book button */}
            <div className="flex flex-col space-y-3 sm:space-y-4 w-full mt-6">
              <a
                href={`https://wa.me/94717244821?text=${encodeURIComponent(
                  `Hello, I am interested in the "${pkg.title}" package.\nItinerary:\n${pkg.route.join('\n')}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[140px] w-full sm:w-auto bg-black hover:bg-emerald-700 active:bg-emerald-700 text-white font-bold rounded-lg px-7 py-2 text-base transition shadow shadow-emerald-300 border-2 border-emerald-600 flex items-center justify-center"
              >
                Book This Package
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
