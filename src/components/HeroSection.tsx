export default function HeroSection() {
  return (
    <div className="relative w-full my-8 md:my-12 px-4 md:px-8 animate-slide-up">
      <div 
        className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(23, 44, 78, 0.9) 30%, rgba(23, 44, 78, 0.5) 100%), url("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 py-8 md:py-0">
          <div className="max-w-xl">
            <h1 className="font-oswald font-bold text-4xl md:text-6xl lg:text-7xl text-white uppercase leading-none mb-3">
              MCGI'S
              <br />
              LIVE MASS
              <br />
              <span className="text-mcgi-gold">INDOCTRINATION</span>
              <br />
              <span className="text-mcgi-gold">GOES ONLINE</span>
            </h1>
          </div>
        </div>

        {/* Footer Logo */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right z-20">
          <div className="text-lg md:text-2xl font-bold text-white tracking-widest">
            MCGI.ORG
          </div>
          <div className="text-xs md:text-sm text-white uppercase tracking-widest opacity-90">
            Cleave to What is Good
          </div>
        </div>
      </div>
    </div>
  )
}
