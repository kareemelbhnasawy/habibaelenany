import { motion } from 'framer-motion';
import { shortFormItems } from '../data/shortform';

export function ShortForm() {
  return (
    <main className="min-h-screen pt-24 pb-16" style={{ touchAction: 'pan-y' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-4">
            Short Form Content
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Vertical storytelling for the modern digital landscape.
          </p>
        </motion.div>

        {/* Content Grid - New Layout: Alternating large phone with text + 3 small phones */}
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          {shortFormItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 lg:gap-16"
            >
              {/* Large Mobile Container */}
              <div className={`relative mx-auto md:mx-0 flex items-center justify-center ${
                index % 2 === 1 ? 'md:order-2' : 'md:order-1'
              }`}>
                {/* iPhone-like container - Large */}
                <div className="relative w-[220px] sm:w-[240px] md:w-[260px] lg:w-[300px] shrink-0">
                  {/* Phone frame */}
                  <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl isolate">
                    {/* Notch with camera */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-white rounded-b-3xl z-10 flex items-center justify-start pl-5">
                      {/* Front camera */}
                      <div className="relative w-2.5 h-2.5 mt-1">
                        <div className="absolute inset-0 bg-gray-400 rounded-full" />
                        <div className="absolute inset-0.5 bg-gray-500 rounded-full" />
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-600/50 rounded-full" />
                      </div>
                    </div>

                    {/* Screen */}
                    <div className="relative bg-paper rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable="false"
                      />
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/40 rounded-full" />
                </div>
              </div>

              {/* Text + 3 Small Phones */}
              <div className={`flex flex-col gap-8 ${
                index % 2 === 1 ? 'md:order-1' : 'md:order-2'
              }`}>
                {/* Content/Text Section */}
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4">
                    {item.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto md:mx-0">
                    {item.description}
                  </p>
                  {item.year && (
                    <p className="mt-4 text-sm text-muted/60">
                      {item.year}
                    </p>
                  )}
                </div>

                {/* 3 Small Phones Grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto md:mx-0">
                  {[0, 1, 2].map((i) => {
                    const displayIndex = (index * 3 + i) % shortFormItems.length;
                    const displayItem = shortFormItems[displayIndex];
                    return (
                      <div key={i} className="relative w-full max-w-[100px] sm:max-w-[120px]">
                        {/* Small iPhone-like container */}
                        <div className="relative w-full">
                          {/* Phone frame */}
                          <div className="relative bg-white rounded-[1.5rem] p-1.5 shadow-lg">
                            {/* Notch - smaller */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-3 bg-white rounded-b-2xl z-10 flex items-center justify-start pl-2">
                              {/* Front camera - tiny */}
                              <div className="relative w-1 h-1 mt-0.5">
                                <div className="absolute inset-0 bg-gray-400 rounded-full" />
                              </div>
                            </div>

                            {/* Screen */}
                            <div className="relative bg-paper rounded-[1.2rem] overflow-hidden aspect-[9/19.5]">
                              <img
                                src={displayItem.src}
                                alt={displayItem.alt}
                                className="w-full h-full object-cover pointer-events-none"
                                draggable="false"
                              />
                            </div>
                          </div>

                          {/* Home indicator - tiny */}
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-white/40 rounded-full" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
