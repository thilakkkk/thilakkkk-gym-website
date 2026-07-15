export default function Membership() {
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      features: ["Gym Access", "Locker Facility", "Free Wi-Fi"],
      popular: false
    },
    {
      name: "Premium",
      price: "₹1,999",
      features: ["Everything in Basic", "Personal Trainer", "Nutrition Guidance"],
      popular: true
    },
    {
      name: "Elite",
      price: "₹2,999",
      features: ["Everything in Premium", "24/7 Access", "VIP Support"],
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-[#1E1E1E] text-white border-t border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
            MEMBERSHIP <span className="text-orange-500">PLANS</span>
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 text-lg">
            Choose the plan that fits your fitness journey. Transparent pricing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${
                plan.popular 
                  ? "bg-zinc-900/60 border-2 border-orange-500 shadow-2xl shadow-orange-950/10 scale-105 z-10" 
                  : "bg-zinc-900/20 border border-zinc-800/80"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold uppercase tracking-wider text-zinc-400 mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black">{plan.price}</span>
                  <span className="text-zinc-500 text-sm ml-2">/month</span>
                </div>
              </div>

              {/* Dividers */}
              <div className="border-t border-zinc-800/60 my-4" />

              {/* Plan Feature Items */}
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-zinc-300 text-sm">
                    <span className="text-orange-500 mr-3 font-extrabold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button 
                className={`w-full py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all ${
                  plan.popular 
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/10 hover:scale-[1.02]" 
                    : "bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 text-zinc-300"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}