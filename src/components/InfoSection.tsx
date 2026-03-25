import { Calendar, Clock, MapPin } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface InfoItem {
  icon: React.ReactNode
  label: string
  value: string
}

export default function InfoSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [userTouchedVideo, setUserTouchedVideo] = useState<number | null>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const container1Ref = useRef<HTMLDivElement>(null)
  const container2Ref = useRef<HTMLDivElement>(null)

  // Setup Intersection Observer for videos
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5, // 50% of the video must be visible
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only auto-set active video if user hasn't manually touched any video
          if (userTouchedVideo === null) {
            if (entry.target === container1Ref.current) {
              setActiveVideo(1)
            } else if (entry.target === container2Ref.current) {
              setActiveVideo(2)
            }
          }
        }
      })
    }, observerOptions)

    if (container1Ref.current) observer.observe(container1Ref.current)
    if (container2Ref.current) observer.observe(container2Ref.current)

    return () => observer.disconnect()
  }, [userTouchedVideo])

  // Update play/pause and mute state based on active video
  useEffect(() => {
    if (video1Ref.current) {
      if (activeVideo === 1) {
        video1Ref.current.muted = false
        video1Ref.current.play().catch(() => {
          // Autoplay might be blocked, user needs to interact
        })
      } else {
        video1Ref.current.muted = true
        video1Ref.current.pause()
      }
    }
    if (video2Ref.current) {
      if (activeVideo === 2) {
        video2Ref.current.muted = false
        video2Ref.current.play().catch(() => {
          // Autoplay might be blocked, user needs to interact
        })
      } else {
        video2Ref.current.muted = true
        video2Ref.current.pause()
      }
    }
  }, [activeVideo])

  // Handle video touch/click - when user clicks a video, play it and pause the other
  const handleVideoTouch = (videoNumber: number) => {
    setActiveVideo(videoNumber)
    setUserTouchedVideo(videoNumber)
  }

  const eventDetails: InfoItem[] = [
    {
      icon: <Calendar size={24} />,
      label: 'Date',
      value: 'Saturday, April 15, 2024',
    },
    {
      icon: <Clock size={24} />,
      label: 'Time',
      value: '7:00 PM - 9:00 PM',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'MCGI Ascoville Caloocan City',
    },
  ]

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/place/MCGI+Ascoville+Caloocan+City/@14.7726592,121.0776164,20.25z/data=!4m10!1m2!2m1!1sQ3FH+657+Quirino+Hwy+Barangay+185+Caloocan+Metro+Manila!3m6!1s0x3397aff823bab345:0xba38a4a12d9ca615!8m2!3d14.7730111!4d121.0778214!15sCjdRM0ZIIDY1NyBRdWlyaW5vIEh3eSBCYXJhbmdheSAxODUgQ2Fsb29jYW4gTWV0cm8gTWFuaWxhkgEGY2h1cmNo4AEA!16s%2Fg%2F11fxvhzm3k?entry=ttu', '_blank')
  }

  return (
    <div className="py-6 md:py-8 space-y-4 md:space-y-6 animate-slide-up">
      {/* Video Section 1 */}
      <div 
        className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-mcgi-gold cursor-pointer hover:shadow-2xl transition-shadow" 
        ref={container1Ref}
        onClick={() => handleVideoTouch(1)}
        onTouchStart={() => handleVideoTouch(1)}
      >
        <div className="relative w-full bg-gray-900 aspect-video rounded-2xl overflow-hidden">
          <video
            ref={video1Ref}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
            controlsList="nodownload"
          >
            <source src="/videos/video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Video Section 2 */}
      <div 
        className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-mcgi-gold cursor-pointer hover:shadow-2xl transition-shadow" 
        ref={container2Ref}
        onClick={() => handleVideoTouch(2)}
        onTouchStart={() => handleVideoTouch(2)}
      >
        <div className="relative w-full bg-gray-900 aspect-video rounded-2xl overflow-hidden">
          <video
            ref={video2Ref}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
            controlsList="nodownload"
          >
            <source src="/videos/video-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="space-y-3 md:space-y-4">
        {eventDetails.map((item, index) => (
          <div
            key={index}
            onClick={item.label === 'Location' ? handleLocationClick : undefined}
            className={`bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-5 border-2 border-blue-200 hover:shadow-lg hover:border-mcgi-gold transition-all hover:scale-105 transform ${
              item.label === 'Location' ? 'cursor-pointer active:scale-95' : ''
            }`}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-mcgi-gold to-yellow-300 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 font-bold shadow-md">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-blue-600 font-bold uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-gray-800 font-semibold mt-1 md:mt-2 text-sm md:text-base leading-snug">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add bottom padding for mobile to prevent overlap with fixed footer */}
      <div className="h-32 md:h-0"></div>
    </div>
  )
}
