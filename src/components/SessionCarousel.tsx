import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Session {
  id: number
  title: string
  image: string
  description: string
}

const sessions: Session[] = [
  {
    id: 1,
    title: 'SESSION 1. THE CHURCH BUILT BY GOD',
    image: '/sessions/session-1.jpg',
    description: 'Lahat ba ng relihiyon ay magdadala sa tao sa tunay na Dios? Saan dapat pumunta ang isang mananampalataya para tunay na makapaglingkod sa Panginoon?'
  },
  {
    id: 2,
    title: 'SESSION 2',
    image: '/sessions/session-2.jpg',
    description: 'Tuklasin ang mga kahanga-hangang katangian ng tunay na Iglesia ng Dios. Alamin kung paano makilahok at maging bahagi ng munting grupo ng mga tapat na sumunod sa Panginoon.'
  },
  {
    id: 3,
    title: 'SESSION 3. THE TRUE CHURCH',
    image: '/sessions/session-3.jpg',
    description: 'Alamin ang aral ng Panginoong Hesukristo tungkol sa tamang paraan para mapabilang sa tunay na Iglesia ng Dios na nasa Biblia. Tuklasin kung paano ang bawat hakbang ay nakabase sa Kanyang salita.'
  },
  {
    id: 4,
    title: 'SESSION 4. PRAYER & DISCIPLINE',
    image: '/sessions/session-4.jpg',
    description: 'Paano magiging katanggap-tanggap sa Dios ang isang panalangin? Alamin ang disiplina sa pananalangin na itinuro ni Kristo sa pamamagitan nina Brother Eli Soriano at Brother Daniel Razon. Samahan po ninyo kaming muli sa MCGI Mass Indoctrination.'
  },
  {
    id: 5,
    title: 'SESSION 5',
    image: '/sessions/session-5.jpg',
    description: 'Magsaliksik sa malalim na kahulugan ng tiwala at katapatan sa loob ng ating propesyong Kristiyano. Tumukoy kung paano natin mapapanatili ang purong pananampalataya sa gitna ng mga hamon.'
  },
  {
    id: 6,
    title: 'SESSION 6. FATHER\'S LOVE',
    image: '/sessions/session-6.jpg',
    description: 'Tuklasin ang mga benepisyo ng pagdulog sa isang mapagmahal at mahabaging Ama at ano ang maidudulot nito sa ating buhay. Matutunan kung paano ang pagmamahal ng Ama ay walang hanggan at lubhang malalim.'
  },
  {
    id: 7,
    title: 'SESSION 7. FELLOWSHIP & CONDUCT',
    image: '/sessions/session-7.jpg',
    description: 'Paano ang marapat na pakikisama sa kapwa na itinuturo sa mga Kristiyano? Tuklasin ang doktrina ng Panginoong Hesukristo kasama sina Brother Eli Soriano at Brother Daniel Razon dito sa MCGI Mass Indoctrination.'
  },
  {
    id: 8,
    title: 'SESSION 8. LOVE & BEHAVIOR',
    image: '/sessions/session-8.jpg',
    description: 'Sa pagpapatuloy ng MCGI Mass Indoctrination, mas palalawigin ni Brother Eli Soriano ang pagtalakay tungkol sa pag-iibigang itinuturo sa loob ng Iglesia at ang aral ng Biblia sa pag-ibig sa kaaway. Tatalakayin din ni Brother Eli ang mga nakapaloob sa pagkakatipon ng mga Kristiyano at ang marapat na pag-uugali ng mga dumadalo dito.'
  },
  {
    id: 9,
    title: 'SESSION 9. LOVE FOR THE LOST',
    image: '/sessions/session-9.jpg',
    description: 'Ang kahalagahan ng pag-ibig sa mga hindi pa kaanib sa Iglesia ng Dios. Matuto kung paano ang tunay na malasakit at pagmamahal ay dapat ipakita sa lahat, lalo na sa mga nawawala at kailangang gabayan tungo sa katotohanan.'
  },
  {
    id: 10,
    title: 'SESSION 10',
    image: '/sessions/session-10.jpg',
    description: 'Pag-aralan ang mga mataas na layunin ng ating propesyong Kristiyano at kung paano atin ito nagiging totoo sa ating pang-araw-araw na buhay. Sumama sa pagtatala ng mga himala ng Dios sa ating komunidad.'
  },
  {
    id: 11,
    title: 'SESSION 11. GOOD WORKS & DOCTRINE',
    image: '/sessions/session-11.jpg',
    description: 'Mayroon bang mga gawang mabuti na maaaring kusang gawin ng mga Kristiyano o lahat ba ng mga ito ay itinakda na ng Dios? Pagtulong man sa kapwa o maging sa pag-aabuloy, mayroong doktrina tungkol dito. Sama-sama nating talakayin ang aral sa paggawa ng mabuti sa MCGI Mass Indoctrination kasama sina Brother Eli Soriano at Brother Daniel Razon.'
  },
  {
    id: 12,
    title: 'SESSION 12',
    image: '/sessions/session-12.jpg',
    description: 'Tuklasin ang mga lihim at malalim na katotohanan na nahahanap lamang sa Salita ng Dios. Makilahok sa masayang pakikinig at pag-unawa ng Kanyang kagandahang mga aral.'
  },
  {
    id: 13,
    title: 'SESSION 13. FORGIVENESS & SIN',
    image: '/sessions/session-13.jpg',
    description: 'Hindi lahat ng kasalanan ay napapatawad. May mga kasalanan laban sa Espiritu Santo na walang kapatawaran! Alamin ang malalim na aral tungkol sa kapanatagan at ang tunay na pag-unawa sa pagpapasyang ito.'
  },
  {
    id: 14,
    title: 'SESSION 14. BAPTISM',
    image: '/sessions/session-14.jpg',
    description: 'Paano nagbautismo ang Panginoong Hesukristo at ang mga apostol? Gaano kahalaga na ang isang tao ay mabautismuhan? Tuklasin ang kahalagahan ng sakramento at kung paano ito makakasalba sa ating pamumuhay.'
  }
]

export default function SessionCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sessions.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlay(false)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
    setTimeout(() => setIsAutoPlay(true), 1000)
  }

  const handleSwipe = () => {
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % sessions.length)
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + sessions.length) % sessions.length)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sessions.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 1000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sessions.length) % sessions.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 1000)
  }

  return (
    <div className="relative w-full py-8 md:py-12 px-4 md:px-8">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full max-w-4xl mx-auto "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Carousel */}
        <div className="relative h-[600px] md:h-[700px] rounded-xl overflow-hidden shadow-2xl">
          {/* Slide Track */}
          <div className="relative w-full h-full">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-mcgi-gold hover:bg-yellow-300 text-blue-600 p-2 md:p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 font-bold"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-mcgi-gold hover:bg-yellow-300 text-blue-600 p-2 md:p-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 font-bold"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {sessions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index)
                setIsAutoPlay(false)
                setTimeout(() => setIsAutoPlay(true), 1000)
              }}
              className={`h-3 rounded-full transition-all shadow-md ${
                index === currentSlide
                  ? 'bg-mcgi-gold w-8'
                  : 'bg-blue-300 w-3 hover:bg-blue-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-blue-600 text-sm md:text-base font-bold">
          Session {currentSlide + 1} <span className="text-mcgi-gold">of</span> {sessions.length}
        </div>
      </div>

      {/* Info Text */}
    </div>
  )
}
