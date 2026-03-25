import { MapPin, Navigation, Phone } from 'lucide-react'

interface LocationProps {
  latitude?: number
  longitude?: number
  address?: string
  placeName?: string
}

export default function LocationMap({
  latitude = 14.7730111,
  longitude = 121.0778214,
  address = 'Q3FH+657, Quirino Hwy, Barangay 185, Caloocan, Metro Manila',
  placeName = 'MCGI Ascoville Caloocan City',
}: LocationProps) {
  const googleMapsUrl = `https://www.google.com/maps/place/MCGI+Ascoville+Caloocan+City/@14.7726592,121.0776164,20.25z/data=!4m10!1m2!2m1!1sQ3FH+657+Quirino+Hwy+Barangay+185+Caloocan+Metro+Manila!3m6!1s0x3397aff823bab345:0xba38a4a12d9ca615!8m2!3d14.7730111!4d121.0778214!15sCjdRM0ZIIDY1NyBRdWlyaW5vIEh3eSBCYXJhbmdheSAxODUgQ2Fsb29jYW4gTWV0cm8gTWFuaWxhkgEGY2h1cmNo4AEA!16s%2Fg%2F11fxvhzm3k?entry=ttu`

  return (
    <div className="py-6 md:py-8 space-y-4 md:space-y-6 animate-slide-up">
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-blue-200 overflow-hidden">
        {/* Embedded Map */}
        <div className="mb-4 md:mb-6 rounded-xl overflow-hidden bg-gray-200 h-64 md:h-96 border border-blue-300 shadow-md">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.6891127447503!2d121.0778214!3d14.7730111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397aff823bab345%3A0xba38a4a12d9ca615!2sMCGI%20Ascoville%20Caloocan%20City!5e0!3m2!1sen!2sph!4v1711261214789"
          ></iframe>
        </div>

        {/* Location Info */}
        <div className="space-y-4 md:space-y-5 mb-6 md:mb-8 p-4 md:p-5 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <p className="text-xs md:text-sm text-blue-600 font-bold uppercase tracking-wide">Event Venue</p>
            <p className="text-lg md:text-xl font-bold text-gray-900 mt-2">{placeName}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-blue-600 font-bold uppercase tracking-wide">Address</p>
            <p className="text-sm md:text-base text-gray-800 mt-2 font-semibold">{address}</p>
          </div>
          <div className="flex gap-3 text-xs md:text-sm text-gray-700 bg-white p-3 rounded-lg border border-blue-100">
            <MapPin size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">Latitude: {latitude}, Longitude: {longitude}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => window.open(googleMapsUrl, '_blank')}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 md:py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base shadow-md hover:shadow-lg"
        >
          <Navigation size={20} />
          Open Location in Maps
        </button>

        <p className="text-xs md:text-sm text-gray-600 text-center mt-4 md:mt-5 font-medium">
          Tap to navigate to the venue location
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 px-4 md:px-0">
        <button
          onClick={() => window.open(`tel:+639171234567`)}
          className="bg-white border-2 border-blue-400 hover:bg-blue-50 text-blue-600 font-bold py-2 md:py-3 rounded-lg transition-all text-sm md:text-base flex items-center justify-center gap-2 shadow-sm"
        >
          <Phone size={18} />
          Call
        </button>
        <button
          onClick={() => window.open(`sms:+639171234567`)}
          className="bg-white border-2 border-blue-400 hover:bg-blue-50 text-blue-600 font-bold py-2 md:py-3 rounded-lg transition-all text-sm md:text-base flex items-center justify-center gap-2 shadow-sm"
        >
          <Navigation size={18} />
          Text
        </button>
      </div>
    </div>
  )
}
