import { Camera, Utensils, Mountain, Sun, MapPin, Waves } from 'lucide-react';
import Heading from '../Heading/header';
import trekking from '../../assets/activity/trekking.jpg';
import wildlife from '../../assets/activity/wildlife.jpg';
import culinary from '../../assets/activity/culinary.jpg';
import surfing from '../../assets/activity/surfing.jpg';
import beaches from '../../assets/activity/beaches.jpg';
import culture from '../../assets/activity/culture.jpg';

function Activity() {
  const activities = [
    {
      icon: Mountain,
      title: 'Trekking',
      description: 'Scenic trails through forests and mountains',
      image: trekking,
      duration: 'Full Day',
      price: 'From $45'
    },
    {
      icon: Camera,
      title: 'Wildlife',
      description: 'Leopards, elephants, and exotic birds',
      image: wildlife,
      duration: 'Half Day',
      price: 'From $65'
    },
    {
      icon: Utensils,
      title: 'Culinary',
      description: 'Authentic Sri Lankan cooking classes',
      image: culinary,
      duration: '4 Hours',
      price: 'From $35'
    },
    {
        icon: Waves,
        title: 'Surfing',
        description: 'Catch waves at world-famous surf beaches',
        image: surfing,
        duration: '2-5 Hours',
        price: 'From $35'
    },
    {
      icon: Sun,
      title: 'Beaches',
      description: 'Water sports and snorkeling',
      image: beaches,
      duration: '3-6 Hours',
      price: 'From $40'
    },
    {
      icon: MapPin,
      title: 'Culture',
      description: 'Ancient temples and historical sites',
      image: culture,
      duration: 'Full Day',
      price: 'From $50'
    }
  ];

  return (
    <section id="activities" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <span className="gradient-blob gradient-amber right-[-40px] top-10 h-40 w-40"></span>
        <span className="gradient-blob gradient-blue left-[30px] bottom-10 h-36 w-36" style={{ animationDelay: '0.6s' }}></span>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Heading title="Explore Activities" subtitle="Discover exciting experiences across Sri Lanka" />
        </div>

        <div className="mt-12 px-4 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 text-white">
                  <activity.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-200 text-sm mb-3">{activity.description}</p>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>{activity.duration}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Activity;