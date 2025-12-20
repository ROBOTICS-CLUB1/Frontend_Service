import { useState } from 'react'
import { Calendar, Check, Clock, Users, ShieldCheck, Zap, XCircle, LayoutDashboard, UserCheck, Menu, X, Settings,BookOpen } from 'lucide-react'

// Mock data
const adminMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Developer', squad: 'Engineering', status: 'Active' },
  { id: 2, name: 'Bob Smith', role: 'Designer', squad: 'Design', status: 'Active' },
  { id: 3, name: 'Carol White', role: 'Manager', squad: 'Operations', status: 'Pending' },
]

const joinRequests = [
  { id: 1, name: 'John Doe', email: 'john@example.com', interest: 'Development', note: 'Experienced', submitted: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', interest: 'Design', note: 'Portfolio attached', submitted: '2024-01-16' },
]

const events = [
  { id: 1, title: 'Team Meeting', date: '2024-01-20', status: 'upcoming', location: 'Office A' },
  { id: 2, title: 'Product Launch', date: '2024-01-25', status: 'upcoming', location: 'Conference Hall' },
  { id: 3, title: 'Workshop', date: '2023-12-15', status: 'completed', location: 'Room 301' },
]

type TabKey = 'overview' | 'members' | 'requests' | 'events' | 'settings' | 'projects'
 | 'blogs'
const stats = [
  { label: 'Active Members', value: '58', icon: Users },
  { label: 'Pending Requests', value: joinRequests.length.toString(), icon: Clock },
  { label: 'Upcoming Events', value: events.filter((e) => e.status === 'upcoming').length.toString(), icon: Calendar },
  { label: 'Projects Live', value: '12', icon: Zap },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [actionMessage, setActionMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleRequestAction = (name: string, action: 'approved' | 'rejected') => {
    setActionMessage(`Request for ${name} ${action}. (Demo only, no backend yet.)`)
  }

  const menuItems = [
    { key: 'overview' as TabKey, label: 'Overview', icon: LayoutDashboard },
    { key: 'members' as TabKey, label: 'Members', icon: Users },
    { key: 'requests' as TabKey, label: 'Join Requests', icon: UserCheck },
    { key: 'events' as TabKey, label: 'Events', icon: Calendar },
    { key: 'projects' as TabKey, label: 'Projects', icon: Zap },
    { key: 'blogs' as TabKey, label: 'Blogs', icon: BookOpen },
    { key: 'settings' as TabKey, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Admin</h1>
                <p className="text-xs text-slate-500">Control Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key)
                  setActionMessage('')
                  setSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === item.key
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-700">Need help?</p>
              <p className="mt-1 text-xs text-slate-500">Check our documentation</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {menuItems.find((item) => item.key === activeTab)?.label}
                </h2>
                <p className="text-sm text-slate-500">
                  Manage your organization effectively
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900">Admin User</p>
                <p className="text-xs text-slate-500">admin@example.com</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {actionMessage && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
              {actionMessage}
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                          {item.value}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <item.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pipeline Card */}
              <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">Member Pipeline</p>
                    <p className="text-sm text-slate-500">
                      Track approvals, onboarding, and squad placement.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      Approvals: {joinRequests.length}
                    </span>
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                      Active: 58
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Squad</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {adminMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-slate-900">{member.name}</td>
                        <td className="px-6 py-4 text-slate-600">{member.role}</td>
                        <td className="px-6 py-4 text-slate-600">{member.squad}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                              member.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            <ShieldCheck className="h-4 w-4" />
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              className="px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                              onClick={() => setActionMessage(`Updated permissions for ${member.name}. (Demo only)`)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 rounded-md transition-colors"
                              onClick={() => setActionMessage(`Member ${member.name} suspended. (Demo only)`)}
                            >
                              Suspend
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Interest</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Note</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Submitted</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {joinRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-slate-900">{request.name}</td>
                        <td className="px-6 py-4 text-slate-600">{request.email}</td>
                        <td className="px-6 py-4 text-slate-600">{request.interest}</td>
                        <td className="px-6 py-4 text-slate-600">{request.note}</td>
                        <td className="px-6 py-4 text-slate-600">{request.submitted}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                              onClick={() => handleRequestAction(request.name, 'approved')}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Approve
                            </button>
                            <button
                              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                              onClick={() => handleRequestAction(request.name, 'rejected')}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Location</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-slate-900">{event.title}</td>
                        <td className="px-6 py-4 text-slate-600">{event.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                              event.status === 'upcoming'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{event.location}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              className="px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                              onClick={() => setActionMessage(`Updated event "${event.title}". (Demo only)`)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 rounded-md transition-colors"
                              onClick={() => setActionMessage(`Published updates for "${event.title}". (Demo only)`)}
                            >
                              Publish
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}