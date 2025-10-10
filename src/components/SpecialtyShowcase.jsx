import React from 'react'
import { 
  Heart, 
  Activity, 
  Stethoscope,
  Baby,
  UserRound,
  Brain,
  Scissors,
  AlertCircle
} from 'lucide-react'

const SpecialtyShowcase = () => {
  const specialties = [
    { 
      name: "Behavioral Health", 
      icon: Brain, 
      color: "bg-purple-50 text-purple-700 border-purple-200",
      physicians: "500K+",
      peValue: "Empathy measurement critical"
    },
    { 
      name: "Oncology", 
      icon: Activity, 
      color: "bg-red-50 text-red-700 border-red-200",
      physicians: "15K+",
      peValue: "Emotional support essential"
    },
    { 
      name: "Cardiology", 
      icon: Heart, 
      color: "bg-blue-50 text-blue-700 border-blue-200",
      physicians: "28K+",
      peValue: "Continuity saves lives"
    },
    { 
      name: "Primary Care", 
      icon: Stethoscope, 
      color: "bg-green-50 text-green-700 border-green-200",
      physicians: "210K+",
      peValue: "Largest burnout crisis"
    },
    { 
      name: "Pediatrics", 
      icon: Baby, 
      color: "bg-pink-50 text-pink-700 border-pink-200",
      physicians: "67K+",
      peValue: "Family-centered care"
    },
    { 
      name: "OB/GYN", 
      icon: UserRound, 
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      physicians: "48K+",
      peValue: "Life moments matter"
    },
    { 
      name: "Surgery", 
      icon: Scissors, 
      color: "bg-orange-50 text-orange-700 border-orange-200",
      physicians: "120K+",
      peValue: "Pre/post-op empathy"
    },
    { 
      name: "Emergency Med", 
      icon: AlertCircle, 
      color: "bg-red-50 text-red-700 border-red-200",
      physicians: "45K+",
      peValue: "Crisis communication"
    },
  ]

  return (
    <div className="card bg-gradient-to-br from-beige-50 to-white">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-dark-950 mb-2">Pe Works for ALL Physicians</h3>
        <p className="text-dark-600 text-sm">
          From behavioral health to surgery — every specialty benefits from presence measurement and care continuity
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {specialties.map((specialty) => (
          <div
            key={specialty.name}
            className={`p-4 rounded-lg border-2 hover:shadow-medium transition-all cursor-pointer group ${specialty.color}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <specialty.icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{specialty.name}</h4>
              <p className="text-xs opacity-75 mb-2">{specialty.physicians} physicians</p>
              <p className="text-xs font-medium">{specialty.peValue}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-950 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold mb-1">Total Addressable Market</p>
            <p className="text-3xl font-bold">1.1M+ Physicians</p>
            <p className="text-sm text-primary-200 mt-1">Across all U.S. medical specialties</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-200 mb-1">Revenue Potential</p>
            <p className="text-2xl font-bold">$5.5B ARR</p>
            <p className="text-xs text-primary-300">@ $5K/physician/year</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialtyShowcase

