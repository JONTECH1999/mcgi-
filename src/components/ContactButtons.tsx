import { Phone, Mail, MapPin, Share2, Facebook, Youtube } from 'lucide-react'

export default function ContactButtons() {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'MCGI Event',
          text: 'Check out this amazing event! Scan the QR code to learn more.',
          url: window.location.href,
        })
      } else {
        alert('Share this link: ' + window.location.href)
      }
    } catch (err) {
      console.error('Share failed:', err)
    }
  }

  const contactActions = [
    {
      icon: <Phone size={20} />,
      label: 'Call',
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'from-blue-500 to-blue-600',
      action: () => window.location.href = 'tel:+639171234567',
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'from-blue-500 to-blue-600',
      action: () => window.location.href = 'mailto:info@mcgi.org?subject=Event%20Inquiry',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'from-blue-500 to-blue-600',
      action: () => window.open('https://www.google.com/maps/place/MCGI+Ascoville+Caloocan+City/@14.7726592,121.0776164,20.25z/data=!4m10!1m2!2m1!1sQ3FH+657+Quirino+Hwy+Barangay+185+Caloocan+Metro+Manila!3m6!1s0x3397aff823bab345:0xba38a4a12d9ca615!8m2!3d14.7730111!4d121.0778214!15sCjdRM0ZIIDY1NyBRdWlyaW5vIEh3eSBCYXJhbmdheSAxODUgQ2Fsb29jYW4gTWV0cm8gTWFuaWxhkgEGY2h1cmNo4AEA!16s%2Fg%2F11fxvhzm3k?entry=ttu', '_blank'),
    },
    {
      icon: <Facebook size={20} />,
      label: 'Facebook',
      color: 'from-mcgi-gold to-yellow-400',
      hoverColor: 'from-yellow-400 to-yellow-500',
      action: () => window.open('https://web.facebook.com/MCGI.org', '_blank'),
    },
    {
      icon: <Youtube size={20} />,
      label: 'YouTube',
      color: 'from-mcgi-gold to-yellow-400',
      hoverColor: 'from-yellow-400 to-yellow-500',
      action: () => window.open('https://www.youtube.com/@MCGIChannel', '_blank'),
    },
    {
      icon: <Share2 size={20} />,
      label: 'Share',
      color: 'from-blue-400 to-blue-500',
      hoverColor: 'from-blue-500 to-blue-600',
      action: handleShare,
    },
  ]

  return (
    <>
      {/* Mobile Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-50 to-cyan-50 border-t-4 border-mcgi-gold shadow-2xl md:hidden">
        <div className="max-w-md mx-auto">
          {/* Contact Buttons Grid */}
          <div className="grid grid-cols-6 gap-2 px-4 pb-4 pt-3">
            {contactActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`bg-gradient-to-br ${action.color} hover:${action.hoverColor} text-white p-3 rounded-xl transition-all active:scale-95 flex flex-col items-center gap-1 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-semibold`}
                title={action.label}
              >
                {action.icon}
                <span className="text-xs font-bold">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="px-4 pb-4 text-center text-xs text-blue-600 space-y-1 font-semibold">
            <p>📱 Questions? Contact us anytime</p>
            <p className="font-bold text-blue-700 text-sm">+63 (917) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Section */}
      <div className="hidden md:block relative bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-100 border-t-4 border-mcgi-gold py-12 md:py-16 mt-8 md:mt-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">Get in Touch</h2>
              <p className="text-blue-600 font-semibold">Choose your preferred contact method</p>
            </div>

            {/* Contact Buttons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {contactActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`bg-gradient-to-br ${action.color} hover:${action.hoverColor} text-white p-4 md:p-6 rounded-2xl transition-all active:scale-95 flex flex-col items-center gap-3 shadow-md hover:shadow-xl transform hover:-translate-y-2 font-bold`}
                  title={action.label}
                >
                  <div className="md:text-3xl text-2xl">{action.icon}</div>
                  <span className="font-bold text-sm md:text-base">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Contact Info */}
            <div className="text-center mt-10 pt-8 border-t-2 border-blue-300">
              <p className="text-blue-700 font-bold text-lg md:text-xl">Questions? We're here to help!</p>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-3"> +63 (917) 851-2954 </p>
              <p className="text-blue-500 text-xs md:text-sm mt-2">Available 24/7 for inquiries and support</p>
            </div>
          </div>
        </div>

        {/* Add bottom padding to prevent overlap with fixed mobile footer */}
        <div className="h-32 md:hidden"></div>
      </div>
    </>
  )
}
