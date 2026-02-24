import React from 'react'

const ValuesSection = () => {
    const values = [
        {
            title: 'Uncompromised Purity',
            description: 'We never add fillers, binders, or artificial ingredients. What you get is 100% nature.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            title: 'Sustainable Harvesting',
            description: 'Our sourcing methods protect the delicate Himalayan ecosystem and support local biodiversity.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: 'Community Empowerment',
            description: 'Fair trade partnerships that provide sustainable livelihoods for remote mountain communities.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ]

    return (
        <section className='py-24 bg-white relative overflow-hidden'>
            {/* Background Texture/Gradient */}
            <div className='absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none'>
                <div className='absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px]'></div>
                <div className='absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2d5f4f]/5 rounded-full blur-[100px]'></div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='text-center mb-20'>
                    <span className='text-sm font-semibold tracking-widest text-[#d4a574] uppercase mb-3 block'>
                        Our Promise
                    </span>
                    <h2 className='text-4xl md:text-5xl font-bold text-[#1e4035] mb-6 font-playfair'>
                        Values That Define Us
                    </h2>
                    <p className='text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed'>
                        We preserve the sanctity of nature in every drop, ensuring that our legacy of wellness respects both the earth and its people.
                    </p>
                </div>

                <div className='grid md:grid-cols-3 gap-8 lg:gap-12'>
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className='group relative p-8 rounded-3xl bg-white border border-[#2d5f4f]/10 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden'
                        >
                            {/* Hover Background Gradient */}
                            <div className='absolute inset-0 bg-gradient-to-br from-[#1e4035] to-[#2d5f4f] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out'></div>

                            {/* Content */}
                            <div className='relative z-10 flex flex-col items-center text-center'>
                                {/* Icon Circle */}
                                <div className='w-16 h-16 rounded-full bg-[#f4f7f6] group-hover:bg-white/10 flex items-center justify-center text-[#2d5f4f] group-hover:text-[#d4a574] mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'>
                                    {value.icon}
                                </div>

                                <h3 className='text-2xl font-bold text-[#1e4035] group-hover:text-white mb-4 transition-colors duration-300 font-playfair'>
                                    {value.title}
                                </h3>

                                <p className='text-gray-600 group-hover:text-gray-200 leading-relaxed transition-colors duration-300'>
                                    {value.description}
                                </p>
                            </div>

                            {/* Decorative Corner Accent */}
                            <div className='absolute top-0 right-0 w-20 h-20 bg-[#d4a574]/10 rounded-bl-[100px] -mr-10 -mt-10 transition-all duration-700 group-hover:bg-[#d4a574]/20 group-hover:scale-150'></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ValuesSection
