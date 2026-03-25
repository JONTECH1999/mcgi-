import SessionCarousel from './components/SessionCarousel'
import LocationMap from './components/LocationMap'
import InfoSection from './components/InfoSection'
import ContactButtons from './components/ContactButtons'

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-500 to-blue-600 backdrop-blur-sm border-b-4 border-mcgi-gold shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-mcgi-gold rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm md:text-base">MCGI </span>
              </div>
              <span className="font-bold text-white text-sm md:text-lg tracking-wide"> MASS INDOCTRINATION</span>
            </div>
            <div className="text-xs md:text-sm text-yellow-200 font-semibold"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full">
        <SessionCarousel />
        <div className="px-4 md:px-8 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <InfoSection />
          </div>
        </div>
        <ContactButtons />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-50 to-cyan-50 border-t-4 border-mcgi-gold text-gray-800 py-8 md:py-12 mt-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Location Section */}
          <div className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2"><span className="text-mcgi-gold text-3xl"></span> </h3>
            <LocationMap />
          </div>
        </div>
      </footer>
    </div>
  )
}