import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  Users, 
  BarChart3,
  Menu,
  X,
  Heart,
  Bell,
  Settings,
  LogOut,
  FlaskConical,
  Brain,
  Cpu
} from 'lucide-react'
import { mockClinician } from '../data/mockData'

const Layout = ({ children }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'PeNote', href: '/penote', icon: FileText, badge: 3 },
    { name: 'PeLoop', href: '/peloop', icon: CheckCircle2, badge: 5 },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Metrics', href: '/metrics', icon: BarChart3 },
  ]

  const advancedNavigation = [
    { name: 'Experiments', href: '/experiments', icon: FlaskConical },
    { name: 'Predictions', href: '/predictions', icon: Brain },
    { name: 'Simulations', href: '/simulations', icon: Cpu },
  ]

  const notifications = [
    { id: 1, type: 'urgent', message: 'Marcus Johnson - Medication check overdue', time: '10m ago' },
    { id: 2, type: 'info', message: 'Sarah Chen - Anxiety log ready for review', time: '1h ago' },
    { id: 3, type: 'success', message: '3 new session notes drafted', time: '2h ago' },
  ]

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-beige-200 backdrop-blur-sm bg-white/95">
        <div className="px-4 py-3.5 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-dark-600 rounded-lg hover:bg-beige-100 focus:outline-none focus:ring-2 focus:ring-accent-400 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/dashboard" className="flex items-center group gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-900 text-white">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-dark-950 tracking-tight">
                    Pe
                  </span>
                  <span className="hidden sm:block px-2 py-0.5 text-xs font-medium text-dark-600 bg-beige-100 rounded border border-beige-300">
                    Presence Engine
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-dark-600 rounded-lg hover:bg-beige-100 focus:outline-none focus:ring-2 focus:ring-accent-400 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-medium border border-beige-200 animate-slide-up">
                    <div className="p-4 border-b border-beige-200">
                      <h3 className="text-sm font-semibold text-dark-950">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-beige-100 hover:bg-beige-50 cursor-pointer transition-colors"
                        >
                          <p className={`text-sm ${
                            notification.type === 'urgent' ? 'text-red-700' : 
                            notification.type === 'success' ? 'text-success-700' : 
                            'text-dark-700'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-dark-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-beige-200">
                      <button className="text-sm text-primary-900 hover:text-primary-950 font-medium w-full text-center">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center gap-3 pl-3 ml-2 border-l border-beige-200">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-dark-950">{mockClinician.name}</p>
                  <p className="text-xs text-dark-600">{mockClinician.specialty}</p>
                </div>
                <div className="w-9 h-9 bg-primary-900 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-soft">
                  {mockClinician.photo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-beige-200`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col">
          <ul className="space-y-1.5 font-medium flex-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                             (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center p-2.5 rounded-lg transition-all duration-150 group ${
                      isActive
                        ? 'bg-primary-900 text-white shadow-soft'
                        : 'text-dark-700 hover:bg-beige-100'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white' : 'text-dark-500 group-hover:text-primary-800'
                    }`} />
                    <span className="ml-3 flex-1 text-sm">{item.name}</span>
                    {item.badge && (
                      <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded ${
                        isActive ? 'bg-accent-400 text-dark-950' : 'bg-accent-100 text-accent-900 border border-accent-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
          
          {/* Advanced Features Section */}
          <div className="pt-4 border-t border-beige-200">
            <p className="px-3 text-xs font-semibold text-dark-600 uppercase tracking-wide mb-3">
              Advanced Features
            </p>
            <ul className="space-y-1.5">
              {advancedNavigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center p-2.5 rounded-lg transition-all duration-150 group ${
                        isActive
                          ? 'bg-accent-400 text-dark-950 shadow-soft'
                          : 'text-dark-700 hover:bg-beige-100'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-dark-950' : 'text-dark-500 group-hover:text-primary-800'
                      }`} />
                      <span className="ml-3 flex-1 text-sm">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-auto pt-4 border-t border-beige-200 space-y-1.5">
            <button className="flex items-center p-2.5 w-full text-dark-700 rounded-lg hover:bg-beige-100 transition-colors group text-sm">
              <Settings className="w-5 h-5 text-dark-500 group-hover:text-primary-800" />
              <span className="ml-3">Settings</span>
            </button>
            <button className="flex items-center p-2.5 w-full text-dark-700 rounded-lg hover:bg-beige-100 transition-colors group text-sm">
              <LogOut className="w-5 h-5 text-dark-500 group-hover:text-red-600" />
              <span className="ml-3">Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'} mt-16`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

