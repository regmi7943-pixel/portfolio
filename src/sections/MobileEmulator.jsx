import React, { useEffect, useMemo, useState, useRef } from 'react'

export default function MobileEmulator() {
  const [overlay, setOverlay] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState([])
  const [recentApps, setRecentApps] = useState([])
  const [appPreviews, setAppPreviews] = useState({})
  const [showRecents, setShowRecents] = useState(false)
  const [now, setNow] = useState(new Date())

  const handleAppOpen = (app) => {
    if (!app) return
    // Add to navigation history when opening an app
    setNavigationHistory(prev => [...prev, overlay].filter(Boolean))
    // Add to recent apps list
    setRecentApps(prev => {
      const filtered = prev.filter(a => a !== app)
      return [app, ...filtered].slice(0, 6) // Keep last 6 apps
    })
    setShowRecents(false)
    setOverlay(app)
  }

  const handleBack = () => {
    // Capture preview of current app before navigating
    if (overlay) {
      captureAppPreview(overlay)
    }
    
    if (navigationHistory.length > 0) {
      // Go back to previous app
      const previousApp = navigationHistory[navigationHistory.length - 1]
      setNavigationHistory(prev => prev.slice(0, -1))
      setOverlay(previousApp)
    } else {
      // No history, go to home
      setOverlay(null)
    }
  }

  const captureAppPreview = (app) => {
    // Create a mock preview showing partial app interface
    const previews = {
      phone: { 
        bg: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute top-1 left-1 right-1 h-2 bg-white/20 rounded-sm"></div>
            <div className="absolute top-4 left-1 right-1 grid grid-cols-3 gap-0.5">
              <div className="h-1 bg-emerald-500 rounded"></div>
              <div className="h-1 bg-white/30 rounded"></div>
              <div className="h-1 bg-white/30 rounded"></div>
            </div>
            <div className="absolute bottom-2 left-1 right-1 space-y-1">
              <div className="h-1.5 bg-white/40 rounded w-3/4"></div>
              <div className="h-1.5 bg-white/30 rounded w-1/2"></div>
            </div>
          </div>
        )
      },
      calculator: { 
        bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute top-1 right-1 text-right text-white/60 text-xs">123</div>
            <div className="absolute bottom-1 left-1 right-1 grid grid-cols-4 gap-0.5">
              <div className="h-2 bg-white/20 rounded-sm"></div>
              <div className="h-2 bg-white/20 rounded-sm"></div>
              <div className="h-2 bg-white/20 rounded-sm"></div>
              <div className="h-2 bg-orange-500/60 rounded-sm"></div>
            </div>
          </div>
        )
      },
      chrome: { 
        bg: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute top-1 left-1 right-1 h-1.5 bg-white/30 rounded-full"></div>
            <div className="absolute top-3.5 left-1 right-1 space-y-0.5">
              <div className="h-1 bg-white/40 rounded w-full"></div>
              <div className="h-1 bg-white/30 rounded w-2/3"></div>
              <div className="h-1 bg-white/20 rounded w-1/2"></div>
            </div>
          </div>
        )
      },
      maps: { 
        bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-blue-500 rounded"></div>
            <div className="absolute bottom-1 left-1 right-1 h-1.5 bg-white/30 rounded"></div>
          </div>
        )
      },
      messages: { 
        bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden space-y-0.5 p-1">
            <div className="h-1.5 bg-white/40 rounded w-3/4 ml-auto"></div>
            <div className="h-1.5 bg-white/60 rounded w-1/2"></div>
            <div className="h-1.5 bg-white/40 rounded w-2/3 ml-auto"></div>
          </div>
        )
      },
      weather: {
        bg: 'linear-gradient(135deg, #0ea5e9 0%, #1e3a8a 100%)',
        elements: (
          <div className="w-full h-full relative overflow-hidden p-1 text-white/90">
            <div className="text-xs">Kathmandu</div>
            <div className="flex items-end gap-1">
              <div className="text-2xl font-semibold leading-none">26°</div>
              <div className="text-[10px] mb-0.5">Partly</div>
            </div>
            <div className="absolute bottom-1 left-1 right-1 grid grid-cols-3 gap-0.5 text-[9px]">
              <div className="bg-white/10 rounded px-1 py-0.5 text-center">27°</div>
              <div className="bg-white/10 rounded px-1 py-0.5 text-center">6 km/h</div>
              <div className="bg-white/10 rounded px-1 py-0.5 text-center">58%</div>
            </div>
          </div>
        )
      },
      camera: { 
        bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 border border-white/60 rounded-full"></div>
          </div>
        )
      },
      gallery: { 
        bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden grid grid-cols-3 gap-0.5 p-0.5">
            <div className="bg-white/30 rounded-sm"></div>
            <div className="bg-white/40 rounded-sm"></div>
            <div className="bg-white/20 rounded-sm"></div>
          </div>
        )
      },
      settings: { 
        bg: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', 
        elements: (
          <div className="w-full h-full relative overflow-hidden space-y-1 p-1">
            <div className="flex items-center justify-between">
              <div className="h-1 bg-white/40 rounded w-1/3"></div>
              <div className="w-2 h-1 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-1 bg-white/40 rounded w-1/2"></div>
              <div className="w-2 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        )
      }
    }
    
    setAppPreviews(prev => ({
      ...prev,
      [app]: previews[app] || { 
        bg: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', 
        elements: <div className="w-full h-full flex items-center justify-center text-white/60 text-xs">{app}</div>
      }
    }))
  }

  const handleHome = () => {
    // Capture preview of current app before closing
    if (overlay) {
      captureAppPreview(overlay)
    }
    // Clear history and go to home
    setNavigationHistory([])
    setShowRecents(false)
    setOverlay(null)
  }

  const handleRecents = () => {
    // Toggle recents view
    setShowRecents(!showRecents)
  }

  useEffect(() => {
    if (overlay) {
      const id = setTimeout(() => setShowOverlay(true), 0)
      return () => clearTimeout(id)
    } else {
      setShowOverlay(false)
    }
  }, [overlay])
  // Tick the status bar clock every minute
  useEffect(() => {
    const tick = () => setNow(new Date())
    // align to next minute boundary
    const msToNextMinute = (60 - now.getSeconds()) * 1000 + 50
    const startId = setTimeout(() => {
      tick()
      const intervalId = setInterval(tick, 60 * 1000)
      // store interval on window for cleanup inside this timeout
      ;(window).__em_tick = intervalId
    }, msToNextMinute)
    return () => {
      clearTimeout(startId)
      if ((window).__em_tick) {
        clearInterval((window).__em_tick)
        delete (window).__em_tick
      }
    }
  }, [now])
  const pad = (n)=> String(n).padStart(2,'0')
  const renderIcon = (type) => {
    const common = 'h-6 w-6 text-white';
    switch (type) {
      case 'phone':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C11.4 22 2 12.6 2 1a1 1 0 011-1h3.49a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
          </svg>
        )
      case 'message':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M20 2H4a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/>
          </svg>
        )
      case 'weather':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M6 14a4 4 0 010-8 4 4 0 013.87 2.86A5 5 0 1116 19H7a3 3 0 01-1-5.83V14z"/>
          </svg>
        )
      case 'maps':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        )
      case 'mail':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1.4 4.25l-6.08 3.8a1 1 0 01-1.04 0L5.4 8.25a1 1 0 011.2-1.6l5.4 3.38 5.4-3.38a1 1 0 111.2 1.6z"/>
          </svg>
        )
      case 'play':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7L8 5z"/>
          </svg>
        )
      case 'camera':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M20 5h-3.6l-1.2-1.6A2 2 0 0013.6 2H10.4a2 2 0 00-1.6.8L7.6 5H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2zm-8 12a5 5 0 110-10 5 5 0 010 10z"/>
          </svg>
        )
      case 'settings':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M19.43 12.98a7.996 7.996 0 000-1.96l2.11-1.65a1 1 0 00.24-1.31l-2-3.46a1 1 0 00-1.2-.44l-2.49 1a8.14 8.14 0 00-1.7-.99l-.38-2.65A1 1 0 0012.05 0h-4.1a1 1 0 00-.99.85l-.38 2.65c-.6.24-1.16.56-1.7.99l-2.5-1a1 1 0 00-1.2.44l-2 3.46a1 1 0 00.24 1.31L2.57 11c-.05.32-.07.65-.07.98s.02.66.07.98l-2.11 1.65a1 1 0 00-.24 1.31l2 3.46a1 1 0 001.2.44l2.5-1c.53.43 1.1.76 1.7 1l.38 2.64a1 1 0 00.99.85h4.1a1 1 0 00.99-.85l.38-2.64c.6-.24 1.16-.57 1.7-1l2.49 1a1 1 0 001.2-.44l2-3.46a1 1 0 00-.24-1.31l-2.11-1.65zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"/>
          </svg>
        )
      case 'clock':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 11h-4V7h2v4h2v2z"/>
          </svg>
        )
      case 'photos':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <path d="M21 5H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zm-9 3a2 2 0 11-2 2 2 2 0 012-2zm-8 9l4.5-6 3.5 4.5 2.5-3.5L20 17H4z"/>
          </svg>
        )
      case 'chrome':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2a10 10 0 018.66 5H12a5 5 0 00-4.33 2.5L5.2 6.07A10 10 0 0112 2zm0 20a10 10 0 01-8.66-5h6.16A5 5 0 0014.5 14l2.3 3.93A10 10 0 0112 22zm10-10a10 10 0 01-2.5 6.5L15.34 12A5 5 0 0012 7h9.5A9.95 9.95 0 0122 12z"/>
          </svg>
        )
      case 'calc':
        return (
          <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <rect x="7" y="6" width="10" height="3" rx="1" fill="#fff"/>
            <g fill="#fff">
              <rect x="7" y="11" width="3" height="3" rx="0.5"/>
              <rect x="11" y="11" width="3" height="3" rx="0.5"/>
              <rect x="15" y="11" width="3" height="7" rx="0.5"/>
              <rect x="7" y="15" width="7" height="3" rx="0.5"/>
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div className="w-full max-w-[300px] mx-auto md:mx-0">
        {/* Device frame */}
        <div className="relative mx-auto aspect-[9/18] rounded-[3rem] bg-slate-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
          {/* Side buttons (right) */}
          <div className="absolute -right-1 top-24 h-10 w-0.5 rounded bg-slate-700" />
          <div className="absolute -right-1 top-40 h-16 w-0.5 rounded bg-slate-700" />

          {/* Bezel */}
          <div className="absolute inset-1 rounded-[2.6rem] bg-black overflow-hidden">
            {/* Screen area */}
            <div className="absolute inset-[10px] rounded-[2.1rem] overflow-hidden">
              {/* Wallpaper */}
              <div className={`absolute inset-0 ${overlay ? 'bg-black' : 'bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-rose-500'}`} />

              {/* Glass sheen */}
              {!overlay && (
                <div className="absolute -top-24 -left-16 h-64 w-96 rotate-12 rounded-3xl bg-white/10 blur-2xl" />
              )}

              {/* Teardrop notch */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-6 w-28 z-50 pointer-events-none">
                <div className="mx-auto h-6 w-28 rounded-b-2xl bg-black/80" />
                <div className="absolute left-1/2 -translate-x-1/2 top-1 h-3 w-3 rounded-full bg-slate-700 shadow-inner" />
              </div>

              {/* Status bar */}
              <div className="absolute top-2 left-3 right-3 z-50 pointer-events-none flex items-center justify-between text-[11px] font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                <span>{pad(now.getHours())}:{pad(now.getMinutes())}</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/90" />
                  <span className="h-2 w-3 rounded-sm bg-white/90" />
                  <span className="h-2 w-6 rounded-sm bg-white/90" />
                </div>
              </div>

              {/* Google search pill */}
              <div className="absolute top-12 left-4 right-4">
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[12px] text-slate-700 shadow-lg">
                  <span className="text-[14px]">🔎</span>
                  <span>Search…</span>
                </div>
              </div>

              {/* App grid */}
              <div className="absolute top-28 left-2 right-2 grid grid-cols-4 gap-3 px-2">
                {apps.map((a) => (
                  <div key={a.label} className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleAppOpen(a.open)}
                      className="grid place-items-center h-12 w-12 rounded-2xl shadow-md text-white active:scale-95 transition-transform"
                      style={{ background: a.bg }}
                      aria-label={a.label}
                    >
                      {renderIcon(a.icon)}
                    </button>
                    <span className="text-[10px] text-white/95 drop-shadow-sm truncate w-14 text-center">{a.label}</span>
                  </div>
                ))}
              </div>

              {/* Dock */}
              <div className="absolute bottom-10 left-6 right-6 rounded-3xl bg-white/20 backdrop-blur-md px-4 py-2 flex items-center justify-around">
                {dock.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => handleAppOpen(d.open)}
                    className="grid place-items-center h-12 w-12 rounded-2xl shadow-md text-white active:scale-95 transition-transform"
                    style={{ background: d.bg }}
                    aria-label={d.label}
                  >
                    {renderIcon(d.icon)}
                  </button>
                ))}
              </div>

              {/* Page dots */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-white/90" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              </div>

              {/* Home pill */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-24 rounded-full bg-white/80" />
              {/* Recents overlay */}
              {showRecents && (
                <div className="absolute inset-0 z-10 bg-black/90 backdrop-blur-sm rounded-[2.1rem] overflow-hidden">
                  <div className="h-full flex flex-col p-4 pt-8">
                    <div className="text-white text-lg font-medium mb-6 text-center">Recent Apps</div>
                    
                    {recentApps.length > 0 ? (
                      <div className="flex-1 space-y-3 content-start">
                        {recentApps.map((app, index) => {
                          const preview = appPreviews[app]
                          return (
                            <button
                              key={`${app}-${index}`}
                              onClick={() => handleAppOpen(app)}
                              className="w-full bg-white/5 rounded-2xl p-3 hover:bg-white/10 transition-colors flex items-center gap-4"
                            >
                              {/* App Preview */}
                              <div 
                                className="h-16 w-28 rounded-xl border border-white/10 overflow-hidden"
                                style={{ 
                                  background: preview?.bg || 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
                                }}
                              >
                                {preview?.elements || (
                                  <div className="w-full h-full flex items-center justify-center text-white/60 text-xs">
                                    {titles[app] || app}
                                  </div>
                                )}
                              </div>
                              
                              {/* App Info */}
                              <div className="flex-1 text-left">
                                <div className="text-white font-medium text-base capitalize">{titles[app] || app}</div>
                                <div className="text-white/60 text-sm">Recently used</div>
                              </div>
                              
                              {/* Close button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setRecentApps(prev => prev.filter(a => a !== app))
                                  setAppPreviews(prev => {
                                    const newPreviews = { ...prev }
                                    delete newPreviews[app]
                                    return newPreviews
                                  })
                                }}
                                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
                              >
                                ×
                              </button>
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-white/50 text-center">
                          <div className="text-4xl mb-4">📱</div>
                          <div>No recent apps</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* ButtonRow at phone bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-[70] pointer-events-none">
                    <div className="w-full bg-black rounded-t-3xl px-6 py-1.5">
                      <div className="flex flex-row items-center justify-center gap-12">
                        <button aria-label="Back" onClick={(e)=>{e.stopPropagation(); handleBack()}} className="pointer-events-auto h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center transition-colors text-sm">⟵</button>
                        <button aria-label="Home" onClick={(e)=>{e.stopPropagation(); handleHome()}} className="pointer-events-auto h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center transition-colors text-sm">◯</button>
                        <button aria-label="Recents" onClick={(e)=>{e.stopPropagation(); handleRecents()}} className="pointer-events-auto h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center transition-colors text-sm">▢</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* App overlays */}
              {overlay && !showRecents && (
                <div
                  className="absolute inset-0 z-10 bg-black flex items-center justify-center p-0 rounded-[2.1rem] overflow-hidden"
                  style={{ top: '-0.5px', left: '-0.5px', right: '-0.5px', bottom: '-0.5px', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', willChange: 'opacity' }}
                  onClick={() => setOverlay(null)}
                >
                  <AppWindow title={titles[overlay] || 'App'} onClose={() => setOverlay(null)} show={showOverlay}>
                    {renderAppContent(overlay, (k)=>setOverlay(k), ()=>setOverlay(null))}
                  </AppWindow>
                  {/* ButtonRow at phone bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-[70] pointer-events-none">
                    <div className="w-full bg-black rounded-t-3xl px-6 py-1.5">
                      <div className="flex flex-row items-center justify-center gap-12">
                        <button aria-label="Back" onClick={(e)=>{e.stopPropagation(); handleBack()}} className="pointer-events-auto h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center transition-colors text-sm">⟵</button>
                        <button aria-label="Home" onClick={(e)=>{e.stopPropagation(); handleHome()}} className="pointer-events-auto h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center transition-colors text-sm">◯</button>
                        <button aria-label="Recents" onClick={(e)=>{e.stopPropagation(); handleRecents()}} className="pointer-events-auto h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center transition-colors text-sm">▢</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

// App titles shown in window header
const titles = {
  maps: 'Maps',
  chrome: 'Chrome',
  play: 'Play Store',
  photos: 'Photos',
  camera: 'Camera',
  phone: 'Phone',
  message: 'Messages',
  mail: 'Mail',
  settings: 'Settings',
  weather: 'Weather',
  clock: 'Clock',
}

function AppWindow({ title, onClose, children, show }) {
  return (
    <div
      onClick={(e)=>e.stopPropagation()}
      className={`w-full h-full rounded-none bg-black overflow-hidden flex flex-col relative transform transition-opacity duration-200 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Safe areas: notch and home pill spacing */}
      <div className="pt-7 px-0 pb-4 h-full flex flex-col">
        <div className="flex-1 bg-black rounded-none overflow-hidden">
          {children}
        </div>
      </div>

    </div>
  )
}

function MapApp() {
  const [q, setQ] = useState('Kathmandu')
  const [zoom, setZoom] = useState(12)

  const src = `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed`

  const useMyLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setQ(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const clear = () => setQ('')
  const zoomIn = () => setZoom((z) => Math.min(18, z + 1))
  const zoomOut = () => setZoom((z) => Math.max(5, z - 1))

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* Top search bar */}
      <div className="p-2 bg-slate-900/60 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-3 py-2">
            <span className="text-white/70 text-sm">🔍</span>
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Search places or paste coordinates"
              className="w-full bg-transparent text-white text-sm outline-none placeholder-white/50"
            />
            {q && (
              <button onClick={clear} className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs grid place-items-center">×</button>
            )}
          </div>
          <button onClick={useMyLocation} title="Use my location" className="h-10 w-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white grid place-items-center border border-white/10">📍</button>
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1">
        <iframe title="Maps" src={src} className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

        {/* Floating zoom controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button onClick={zoomIn} className="h-9 w-9 rounded-xl bg-black/50 hover:bg-black/70 text-white text-lg grid place-items-center backdrop-blur-md border border-white/10 shadow">+</button>
          <button onClick={zoomOut} className="h-9 w-9 rounded-xl bg-black/50 hover:bg-black/70 text-white text-lg grid place-items-center backdrop-blur-md border border-white/10 shadow">−</button>
        </div>

        {/* Subtle edge fade */}
        <div className="pointer-events-none absolute inset-0" style={{maskImage:'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, black 8%, black 92%, rgba(0,0,0,0.9) 100%)'}} />
      </div>
    </div>
  )
}

function ChromeApp() {
  const [url, setUrl] = useState('https://example.com')
  const go = () => {
    let u = url.trim()
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u
    setUrl(u)
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-2 bg-slate-900/60 flex items-center gap-2">
        <input defaultValue={url} onBlur={(e)=>setUrl(e.target.value)} placeholder="Enter URL"
               className="w-full rounded-xl bg-white/10 text-white px-3 py-2 text-sm outline-none placeholder-white/50" />
        <button onClick={go} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm">Go</button>
      </div>
      <iframe title="Browser" src={url} className="flex-1 w-full h-full border-0" />
    </div>
  )
}

function PlayApp({ onOpen }) {
  const [q, setQ] = useState('')
  const [installing, setInstalling] = useState({}) // key -> true while installing
  const [installed, setInstalled] = useState({ chrome: true }) // sample preinstalled
  const [detail, setDetail] = useState(null) // selected app object

  const items = [
    { key: 'maps', name: 'Maps', desc: 'Navigation & places', color: '#4285F4', rating: 4.5, downloads: '1B+', size: '35 MB', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    )},
    { key: 'chrome', name: 'Chrome', desc: 'Fast & secure browser', color: '#DB4437', rating: 4.3, downloads: '5B+', size: '50 MB', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
        <path d="M12 16l3.5-6h-7l3.5 6z" fill="white"/>
      </svg>
    )},
    { key: 'photos', name: 'Photos', desc: 'Gallery & backup', color: '#4285F4', rating: 4.4, downloads: '1B+', size: '28 MB', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
       git add .
git commit -m "Initial portfolio commit"
 <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68a.5.5 0 01-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02z"/>
      </svg>
    )},
    { key: 'calc', name: 'Calculator', desc: 'Simple calculator', color: '#0F9D58', rating: 4.1, downloads: '100M+', size: '6 MB', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 14h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        <rect x="7" y="7" width="2" height="2"/>
        <rect x="7" y="11" width="2" height="2"/>
        <rect x="7" y="15" width="2" height="2"/>
        <rect x="11" y="7" width="2" height="2"/>
        <rect x="11" y="11" width="2" height="2"/>
        <rect x="11" y="15" width="2" height="2"/>
      </svg>
    )},
  ]

  const filtered = items.filter(it =>
    it.name.toLowerCase().includes(q.toLowerCase()) ||
    it.desc.toLowerCase().includes(q.toLowerCase())
  )

  const doInstall = (key) => {
    if (installed[key] || installing[key]) return
    setInstalling(s => ({ ...s, [key]: true }))
    setTimeout(() => {
      setInstalling(s => ({ ...s, [key]: false }))
      setInstalled(s => ({ ...s, [key]: true }))
    }, 1200)
  }

  const Card = ({ it }) => (
    <div className="w-full grid grid-cols-[48px_1fr] items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10">
      <button onClick={()=>setDetail(it)} className="h-12 w-12 rounded-2xl grid place-items-center text-white shrink-0" style={{background: it.color}}>
        {it.icon}
      </button>
      <button onClick={()=>setDetail(it)} className="text-left">
        <div className="text-white text-sm font-medium">{it.name}</div>
        <div className="text-white/70 text-xs flex items-center gap-2">
          <span>{it.desc}</span>
          <span>•</span>
          <span>⭐ {it.rating}</span>
          <span>•</span>
          <span>{it.downloads}</span>
        </div>
      </button>
    </div>
  )

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* Header */}
      <div className="p-2 bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border-b border-white/10 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-3 py-2">
            <span className="text-white/70 text-sm">🔎</span>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search apps"
                   className="w-full bg-transparent text-white text-sm outline-none placeholder-white/50" />
            {q && <button onClick={()=>setQ('')} className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs grid place-items-center">×</button>}
          </div>
        </div>
      </div>

      {/* Content list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3 no-scrollbar">
        {filtered.map(it => (
          <Card key={it.key} it={it} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-white/60 text-sm py-6">No results</div>
        )}
      </div>

      {/* Detail sheet */}
      {detail && (
        <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm grid place-items-end" onClick={()=>setDetail(null)}>
          <div className="w-full rounded-t-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-black/80 p-4 space-y-4" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl grid place-items-center text-white" style={{background: detail.color}}>
                {detail.icon}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{detail.name}</div>
                <div className="text-white/70 text-xs">⭐ {detail.rating} • {detail.downloads} • {detail.size}</div>
              </div>
            </div>

            {/* Screenshots (mocked with CSS — no external screenshots) */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 w-64 rounded-xl overflow-hidden border border-white/10 bg-black/10 shrink-0 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${detail.color} 0%, rgba(0,0,0,0.25) 100%)` }}
                >
                  <div className="w-full h-full p-3 text-white flex flex-col">
                    <div className="h-6 w-3/4 bg-white/20 rounded mb-3" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-white/20 rounded w-full" />
                      <div className="h-3 bg-white/15 rounded w-5/6" />
                      <div className="h-3 bg-white/10 rounded w-2/3" />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <div className="h-8 w-8 bg-white/20 rounded" />
                      <div className="h-8 w-8 bg-white/10 rounded" />
                      <div className="h-8 w-8 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-white/80 text-xs leading-relaxed">
              Experience {detail.name} with a clean, fast UI. This is a mock detail sheet for demo purposes.
            </div>

            <div className="flex justify-end">
              <button onClick={()=>setDetail(null)} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CameraApp() {
  const [permissionState, setPermissionState] = useState('prompt') // 'prompt' | 'granted' | 'denied'
  const [cameraMode, setCameraMode] = useState('back') // 'back' | 'front'
  const [flashMode, setFlashMode] = useState('off') // 'off' | 'on' | 'auto'

  const requestPermission = () => {
    setPermissionState('granted')
  }

  if (permissionState === 'prompt') {
    return (
      <div className="h-full flex flex-col bg-black">
        {/* Permission Dialog */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/10 grid place-items-center text-white">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"/>
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-white text-lg font-medium">Camera Access</div>
                <div className="text-white/70 text-sm">Allow this app to use your camera?</div>
              </div>
            </div>
            <div className="space-y-2">
              <button 
                onClick={requestPermission}
                className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
              >
                Allow
              </button>
              <button 
                onClick={() => setPermissionState('denied')}
                className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                Don't Allow
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (permissionState === 'denied') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-black p-6">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-white/10 grid place-items-center text-white mx-auto mb-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"/>
              <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            </svg>
          </div>
          <div className="text-white text-lg font-medium">Camera Access Required</div>
          <div className="text-white/70 text-sm">Please enable camera access in your settings to use this feature.</div>
          <button 
            onClick={() => setPermissionState('prompt')}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Camera Preview */}
      <div className="flex-1 relative">
        {/* Mock camera view with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Subtle lens flare effect */}
          <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-2xl top-1/4 -right-16 animate-pulse" />
          <div className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-2xl bottom-1/4 -left-12 animate-pulse" />
        </div>

        {/* Camera UI Overlay */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top controls */}
          <div className="p-4 flex justify-between items-start">
            <button 
              onClick={() => setFlashMode(m => m === 'off' ? 'on' : 'off')}
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur text-white grid place-items-center"
            >
              {flashMode === 'off' ? '⚡️' : '⚡️'}
            </button>
            <button 
              onClick={() => setCameraMode(m => m === 'back' ? 'front' : 'back')}
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur text-white grid place-items-center"
            >
              🔄
            </button>
          </div>

          {/* Bottom controls */}
          <div className="mt-auto p-6 flex justify-between items-center">
            <button className="h-14 w-14 rounded-full bg-black/50 backdrop-blur text-white grid place-items-center">
              🖼
            </button>
            <button className="h-20 w-20 rounded-full border-4 border-white grid place-items-center">
              <div className="h-16 w-16 rounded-full bg-white"></div>
            </button>
            <button className="h-14 w-14 rounded-full bg-black/50 backdrop-blur text-white grid place-items-center">
              {cameraMode === 'back' ? '🌆' : '😊'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhotosApp() {
  const pics = ['/projects/p1.jpg','/projects/p2.jpg','/projects/p3.jpg']
  const [active, setActive] = useState(null)
  return (
    <div className="w-full h-full p-3">
      {active ? (
        <div className="relative w-full h-full">
          <img src={active} alt="photo" className="object-contain w-full h-full" />
          <button onClick={()=>setActive(null)} className="absolute top-2 right-2 bg-black/50 text-white rounded-full h-8 w-8 grid place-items-center">×</button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          {pics.map(p => (
            <button key={p} onClick={()=>setActive(p)} className="aspect-square overflow-hidden rounded-xl bg-white/5">
              <img src={p} alt="photo" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DialerApp({ onCloseApp }) {
  const [tab, setTab] = useState('KEYPAD') // FAVORITES | RECENTS | CONTACTS | KEYPAD
  const [num, setNum] = useState('')
  const [calling, setCalling] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [selectedContact, setSelectedContact] = useState(null)
  const [favorites, setFavorites] = useState([
    { name: 'Mom', number: '01 441 2345' },
    { name: 'John', number: '+977 985-1111222' }
  ])
  const [recents, setRecents] = useState([
    { name: 'Alex', number: '+977 984-1234567', time: 'Yesterday' },
    { name: 'Mom', number: '01 441 2345', time: '2 days ago' },
  ])
  const [contacts, setContacts] = useState([
    { name: 'Aarav', number: '+977 981-0001111' },
    { name: 'Alex', number: '+977 984-1234567' },
    { name: 'David', number: '+977 982-3334444' },
    { name: 'Emma', number: '+977 983-5556666' },
    { name: 'John', number: '+977 985-1111222' },
    { name: 'Kiran', number: '01 555 7788' },
    { name: 'Lisa', number: '+977 986-7778888' },
    { name: 'Mike', number: '+977 987-9990000' },
    { name: 'Nina', number: '+977 988-1112222' },
    { name: 'Sita', number: '+977 980-2223333' },
  ].sort((a, b) => a.name.localeCompare(b.name)))

  const add = (d) => setNum((n) => (n + d).slice(0, 20))
  const back = () => setNum((n) => n.slice(0, -1))
  const clear = () => setNum('')
  const call = () => {
    if (!num) return
    setCalling(true)
    setCallDuration(0)
    
    // Simulate call duration timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    
    // Auto end call after 5 seconds
    setTimeout(() => {
      clearInterval(timer)
      setCalling(false)
      setCallDuration(0)
      setRecents((r) => [{ name: 'Unknown', number: format(num), time: 'Just now' }, ...r].slice(0, 10))
      setNum('')
    }, 5000)
  }
  
  const endCall = () => {
    setCalling(false)
    setCallDuration(0)
    setRecents((r) => [{ name: 'Unknown', number: format(num), time: 'Just now' }, ...r].slice(0, 10))
    setNum('')
  }
  
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  const format = (s) => s.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')

  const tabs = ['RECENTS', 'CONTACTS', 'KEYPAD']
  
  const addToFavorites = (contact) => {
    if (!favorites.find(f => f.number === contact.number)) {
      setFavorites(prev => [...prev, { name: contact.name, number: contact.number }])
    }
  }
  
  const removeFromFavorites = (contact) => {
    setFavorites(prev => prev.filter(f => f.number !== contact.number))
  }
  
  const saveContact = (recentCall) => {
    const existingContact = contacts.find(c => c.number === recentCall.number)
    if (!existingContact) {
      const newContact = { name: recentCall.name, number: recentCall.number }
      setContacts(prev => [...prev, newContact].sort((a, b) => a.name.localeCompare(b.name)))
    }
  }
  
  const callContact = (contact) => {
    setNum(contact.number.replace(/\D/g, ''))
    setTab('KEYPAD')
    setTimeout(() => {
      setCalling(true)
      setCallDuration(0)
      
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      
      setTimeout(() => {
        clearInterval(timer)
        setCalling(false)
        setCallDuration(0)
        setRecents((r) => [{ name: contact.name, number: contact.number, time: 'Just now' }, ...r].slice(0, 10))
        setNum('')
      }, 5000)
    }, 500)
  }

  const Key = ({d, sub}) => (
    <button
      onClick={() => add(String(d))}
      className="h-14 rounded-2xl bg-white/10 active:bg-white/20 text-white flex flex-col items-center justify-center"
    >
      <div className="text-xl font-medium leading-none">{d}</div>
      {sub && <div className="text-[10px] opacity-70 mt-0.5">{sub}</div>}
    </button>
  )

  const handleBack = () => {
    if (tab !== 'KEYPAD') {
      setTab('KEYPAD')
      return
    }
    if (num) {
      back()
      return
    }
    onCloseApp && onCloseApp()
  }

  // Show contact detail view
  if (selectedContact) {
    const isFavorite = favorites.find(f => f.number === selectedContact.number)
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-black">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <button 
            onClick={() => setSelectedContact(null)} 
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors"
          >
            ←
          </button>
          <div className="text-white font-medium">Contact</div>
        </div>
        
        {/* Contact Info */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl mb-6">
            {selectedContact.name[0]}
          </div>
          
          <div className="text-white text-2xl font-light mb-2">{selectedContact.name}</div>
          <div className="text-white/60 text-lg mb-8">{selectedContact.number}</div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-6 mb-8">
            <button 
              onClick={() => callContact(selectedContact)}
              className="h-16 w-16 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center text-2xl transition-colors"
            >
              📞
            </button>
            <button 
              onClick={() => { setNum(selectedContact.number.replace(/\D/g,'')); setTab('KEYPAD'); setSelectedContact(null) }}
              className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-2xl transition-colors"
            >
              💬
            </button>
            <button 
              onClick={() => isFavorite ? removeFromFavorites(selectedContact) : addToFavorites(selectedContact)}
              className={`h-16 w-16 rounded-full ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white flex items-center justify-center text-2xl transition-colors`}
            >
              {isFavorite ? '💔' : '⭐'}
            </button>
          </div>
          
          {/* Action Labels */}
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="w-16 text-center">Call</div>
            <div className="w-16 text-center">Message</div>
            <div className="w-16 text-center">{isFavorite ? 'Remove' : 'Favorite'}</div>
          </div>
        </div>
      </div>
    )
  }

  // Show calling screen when calling
  if (calling) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black relative">
        {/* Calling contact info */}
        <div className="text-center mb-8">
          <div className="text-white/60 text-sm mb-2">Calling</div>
          <div className="text-white text-2xl font-light mb-1">{format(num)}</div>
          <div className="text-white/80 text-lg">Unknown</div>
        </div>
        
        {/* Call duration */}
        <div className="text-white/60 text-lg mb-12">
          {formatDuration(callDuration)}
        </div>
        
        {/* Animated call button */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
          <button 
            onClick={endCall}
            className="relative h-16 w-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-red-700 transition-colors"
          >
            📞
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Tabs */}
      <div className="grid grid-cols-3 text-xs font-medium text-white/80 mt-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-2 ${tab===t? 'text-white border-b-2 border-emerald-500' : 'border-b border-white/10'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 pt-2 pb-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">

        {tab === 'KEYPAD' && (
          <div className="flex flex-col h-full">
            {/* Bottom block: number display + keypad + actions pushed to bottom */}
            <div className="mt-auto mb-8">
              {/* Number display (centered) */}
              <div className="mb-2">
                <div className="text-center text-white text-xl tracking-wider h-8 leading-tight">
                  {num || '‒‒‒‒‒‒‒‒‒'}
                </div>
              </div>
              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Key d={1} sub={''} />
                <Key d={2} sub={'ABC'} />
                <Key d={3} sub={'DEF'} />
                <Key d={4} sub={'GHI'} />
                <Key d={5} sub={'JKL'} />
                <Key d={6} sub={'MNO'} />
                <Key d={7} sub={'PQRS'} />
                <Key d={8} sub={'TUV'} />
                <Key d={9} sub={'WXYZ'} />
                <Key d={'*'} />
                <Key d={0} sub={'+'} />
                <Key d={'#'} />
              </div>
              {/* Action row */}
              <div className="flex items-center justify-center gap-4 pt-4 mb-0">
                <button onClick={back} className="h-12 w-12 rounded-full bg-white/10 text-white grid place-items-center">⌫</button>
                <button disabled={!num} onClick={call} className={`h-14 w-14 rounded-full grid place-items-center text-white ${num ? 'bg-emerald-600 active:scale-95' : 'bg-white/10 text-white/40'}`}>📞</button>
                {num && <button onClick={clear} className="h-12 px-3 rounded-full bg-white/10 text-white">Clear</button>}
              </div>
            </div>
          </div>
        )}

        {tab === 'RECENTS' && (
          <div className="space-y-1">
            {recents.map((r, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedContact(r)}
                className="w-full bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                      {r.name[0]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-white font-medium text-base">{r.name}</div>
                    <div className="text-white/60 text-sm">{r.number}</div>
                    <div className="text-white/40 text-xs mt-1">{r.time}</div>
                  </div>
                </div>
              </button>
            ))}
            {!recents.length && (
              <div className="text-center py-12">
                <div className="text-white/30 text-6xl mb-4">📞</div>
                <div className="text-white/50 text-lg">No recent calls</div>
              </div>
            )}
          </div>
        )}

        {tab === 'CONTACTS' && (
          <div className="space-y-1">
            {/* Favorites section */}
            {favorites.length > 0 && (
              <div className="mb-6">
                <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-3 px-2">Favorites</div>
                <div className="space-y-1">
                  {favorites.map((f) => (
                    <button 
                      key={f.number} 
                      onClick={() => setSelectedContact(f)}
                      className="w-full bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 hover:bg-yellow-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-semibold text-lg">
                            {f.name[0]}
                          </div>
                          <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">★</div>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-white font-medium text-base">{f.name}</div>
                          <div className="text-white/60 text-sm">{f.number}</div>
                        </div>
                            </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* All contacts section */}
            <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-3 px-2">All Contacts</div>
            <div className="space-y-1">
              {contacts.map((c) => {
                const isFavorite = favorites.find(f => f.number === c.number)
                return (
                  <button 
                    key={c.number} 
                    onClick={() => setSelectedContact(c)}
                    className="w-full bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                          {c.name[0]}
                        </div>
                        {isFavorite && (
                          <div className="absolute -top-1 -right-1 h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">★</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-white font-medium text-base">{c.name}</div>
                        <div className="text-white/60 text-sm">{c.number}</div>
                      </div>
                        </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function MessagesApp() {
  const [currentChat, setCurrentChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const [showCompose, setShowCompose] = useState(false)
  const [newContactName, setNewContactName] = useState('')
  const [newContactNumber, setNewContactNumber] = useState('')
  const [composeMode, setComposeMode] = useState('new') // 'new' or 'select'
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Mom',
      avatar: 'M',
      avatarBg: 'from-pink-500 to-rose-600',
      lastMessage: 'Don\'t forget to call me tonight!',
      time: '2:30 PM',
      unread: 2,
      messages: [
        { id: 1, me: false, text: 'Hi honey! How was your day?', time: '2:15 PM' },
        { id: 2, me: true, text: 'It was good mom! Just working on some projects', time: '2:20 PM' },
        { id: 3, me: false, text: 'That\'s great! Don\'t forget to call me tonight!', time: '2:30 PM' },
      ]
    },
    {
      id: 2,
      name: 'John',
      avatar: 'J',
      avatarBg: 'from-blue-500 to-indigo-600',
      lastMessage: 'See you tomorrow at 10 AM',
      time: '1:45 PM',
      unread: 0,
      messages: [
        { id: 1, me: true, text: 'Hey John, are we still meeting tomorrow?', time: '1:30 PM' },
        { id: 2, me: false, text: 'Yes! See you tomorrow at 10 AM', time: '1:45 PM' },
      ]
    },
    {
      id: 3,
      name: 'Alex',
      avatar: 'A',
      avatarBg: 'from-green-500 to-emerald-600',
      lastMessage: 'Thanks for your help! 🙏',
      time: '12:20 PM',
      unread: 0,
      messages: [
        { id: 1, me: false, text: 'Hey, can you help me with the project?', time: '12:00 PM' },
        { id: 2, me: true, text: 'Sure! What do you need help with?', time: '12:05 PM' },
        { id: 3, me: false, text: 'Thanks for your help! 🙏', time: '12:20 PM' },
      ]
    },
    {
      id: 4,
      name: 'Work Group',
      avatar: 'W',
      avatarBg: 'from-purple-500 to-violet-600',
      lastMessage: 'Meeting moved to 3 PM',
      time: '11:30 AM',
      unread: 5,
      messages: [
        { id: 1, me: false, text: 'Good morning everyone!', time: '9:00 AM' },
        { id: 2, me: false, text: 'Meeting moved to 3 PM', time: '11:30 AM' },
      ]
    }
  ])

  const createNewChat = () => {
    if (!newContactName.trim() || !newContactNumber.trim()) return
    
    const newChat = {
      id: conversations.length + 1,
      name: newContactName,
      number: newContactNumber,
      avatar: newContactName[0].toUpperCase(),
      avatarBg: `from-${['blue', 'green', 'purple', 'orange', 'red', 'indigo'][Math.floor(Math.random() * 6)]}-500 to-${['blue', 'green', 'purple', 'orange', 'red', 'indigo'][Math.floor(Math.random() * 6)]}-600`,
      lastMessage: '',
      time: '',
      unread: 0,
      messages: []
    }
    
    setConversations(prev => [newChat, ...prev])
    setCurrentChat(newChat)
    setShowCompose(false)
    setNewContactName('')
    setNewContactNumber('')
  }

  const availableContacts = [
    { name: 'David', number: '+977 982-3334444' },
    { name: 'Emma', number: '+977 983-5556666' },
    { name: 'Lisa', number: '+977 986-7778888' },
    { name: 'Mike', number: '+977 987-9990000' },
    { name: 'Nina', number: '+977 988-1112222' },
    { name: 'Sita', number: '+977 980-2223333' },
  ].filter(contact => !conversations.find(conv => conv.number === contact.number))

  const selectContact = (contact) => {
    const newChat = {
      id: conversations.length + 1,
      name: contact.name,
      number: contact.number,
      avatar: contact.name[0].toUpperCase(),
      avatarBg: `from-${['blue', 'green', 'purple', 'orange', 'red', 'indigo'][Math.floor(Math.random() * 6)]}-500 to-${['blue', 'green', 'purple', 'orange', 'red', 'indigo'][Math.floor(Math.random() * 6)]}-600`,
      lastMessage: '',
      time: '',
      unread: 0,
      messages: []
    }
    
    setConversations(prev => [newChat, ...prev])
    setCurrentChat(newChat)
    setShowCompose(false)
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.closest('.overflow-y-auto')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !currentChat) return
    
    const newMsg = {
      id: currentChat.messages.length + 1,
      me: true,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    // Update both current chat and conversations list
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMsg],
      lastMessage: newMessage,
      time: newMsg.time
    }
    
    setCurrentChat(updatedChat)
    
    // Update conversations list
    setConversations(prev => prev.map(conv => 
      conv.id === currentChat.id ? updatedChat : conv
    ))
    
    setNewMessage('')
    
    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! 😊",
        "Got it!",
        "Sounds good to me",
        "I'll get back to you soon",
        "Perfect! 👍",
        "That works for me",
        "Sure thing!",
        "Absolutely!",
        "No problem at all",
        "Looking forward to it!"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const responseMsg = {
        id: updatedChat.messages.length + 2,
        me: false,
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      const finalUpdatedChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, responseMsg],
        lastMessage: randomResponse,
        time: responseMsg.time
      }
      
      setCurrentChat(finalUpdatedChat)
      
      // Update conversations list with response
      setConversations(prev => prev.map(conv => 
        conv.id === currentChat.id ? finalUpdatedChat : conv
      ))
    }, 1500 + Math.random() * 2000) // Random delay between 1.5-3.5 seconds
  }

  // Chat list view
  if (!currentChat) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-black">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-xl font-semibold">Messages</h1>
            <button 
              onClick={() => setShowCompose(true)}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              ✏️
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              placeholder="Search messages"
              className="w-full rounded-full bg-white/10 text-white px-4 py-3 pl-10 text-sm outline-none placeholder-white/50"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">🔍</div>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.15) transparent'
        }}>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setCurrentChat(conv)}
              className="w-full p-4 hover:bg-white/5 transition-colors border-b border-white/5"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${conv.avatarBg || 'from-blue-500 to-purple-600'} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                  {conv.avatar}
                </div>
                
                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white font-medium">{conv.name}</div>
                    <div className="text-white/60 text-sm">{conv.time}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white/70 text-sm truncate pr-2">{conv.lastMessage}</div>
                    {conv.unread > 0 && (
                      <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-medium">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Compose Modal */}
        {showCompose && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.15) transparent'
            }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-lg font-semibold">New Message</h2>
                <button 
                  onClick={() => {
                    setShowCompose(false)
                    setComposeMode('new')
                    setNewContactName('')
                    setNewContactNumber('')
                  }}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
              
              {/* Mode Toggle */}
              <div className="flex mb-4 bg-white/5 rounded-xl p-1 shadow-inner">
                <button
                  onClick={() => setComposeMode('new')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                    composeMode === 'new' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  New Contact
                </button>
                <button
                  onClick={() => setComposeMode('select')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                    composeMode === 'select' 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Select Contact
                </button>
              </div>

              {composeMode === 'new' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm block mb-2">Contact Name</label>
                    <input
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      placeholder="Enter contact name"
                      className="w-full rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white px-4 py-3 text-sm outline-none placeholder-white/50 transition-colors border border-white/5 focus:border-blue-500/50"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/70 text-sm block mb-2">Phone Number</label>
                    <input
                      value={newContactNumber}
                      onChange={(e) => setNewContactNumber(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && createNewChat()}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white px-4 py-3 text-sm outline-none placeholder-white/50 transition-colors border border-white/5 focus:border-blue-500/50"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowCompose(false)
                        setNewContactName('')
                        setNewContactNumber('')
                      }}
                      className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border border-white/10 hover:border-white/20 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createNewChat}
                      disabled={!newContactName.trim() || !newContactNumber.trim()}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none font-medium"
                    >
                      Create
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.15) transparent'
                }}>
                  {availableContacts.length > 0 ? (
                    availableContacts.map((contact, index) => (
                      <button
                        key={index}
                        onClick={() => selectContact(contact)}
                        className="group w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 text-left border border-white/5 hover:border-white/10 hover:shadow-lg hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                            {contact.name[0]}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium text-base">{contact.name}</div>
                            <div className="text-white/60 text-sm">{contact.number}</div>
                          </div>
                          <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            →
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-white/50 text-sm">No available contacts</div>
                      <div className="text-white/30 text-xs mt-1">All contacts already have conversations</div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      setShowCompose(false)
                      setComposeMode('new')
                    }}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border border-white/10 hover:border-white/20 font-medium shadow-sm hover:shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Chat view
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-black">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentChat(null)}
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            ←
          </button>
          <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${currentChat.avatarBg || 'from-blue-500 to-purple-600'} flex items-center justify-center text-white font-semibold flex-shrink-0`}>
            {currentChat.avatar}
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">{currentChat.name}</div>
            <div className="text-white/60 text-sm">Active now</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.15) transparent'
      }}>
        {currentChat.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
              msg.me 
                ? 'bg-blue-600 text-white rounded-br-md' 
                : 'bg-white/10 text-white rounded-bl-md'
            }`}>
              <div className="text-sm">{msg.text}</div>
              <div className={`text-xs mt-1 ${msg.me ? 'text-blue-100' : 'text-white/60'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 pb-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            🖼️
          </button>
          <div className="flex-1 relative">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="w-full rounded-full bg-white/10 text-white px-4 py-3 pr-12 text-sm outline-none placeholder-white/50"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
              😊
            </button>
          </div>
          <button
            onClick={sendMessage}
            className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

function MailApp() {
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(null)
  const [showCompose, setShowCompose] = useState(false)
  const [composeDraft, setComposeDraft] = useState({ to: '', subject: '', body: '' })
  const [showMore, setShowMore] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentFolder, setCurrentFolder] = useState('inbox') // inbox | sent | archive | trash

  const [mails, setMails] = useState([
    { id: 1, s:'LinkedIn', t:'Welcome to LinkedIn', d:'Thanks for joining our community. Here are a few tips to get started…', time:'08:45', unread: true, archived: false, folder: 'inbox' },
    { id: 2, s:'GitHub', t:'Security alert', d:'A new sign-in to your account was detected from a new device.', time:'Yesterday', unread: false, archived: false, folder: 'inbox' },
    { id: 3, s:'Notion', t:'You were mentioned in Tasks', d:'Alex mentioned you in “Portfolio polish checklist”', time:'Tue', unread: true, archived: false, folder: 'inbox' },
    { id: 4, s:'Figma', t:'Your file has been shared', d:'Kiran shared “Mobile Emulator UI” with you.', time:'Mon', unread: false, archived: false, folder: 'inbox' },
  ])

  const isInFolder = (m, f) => (
    f === 'inbox' ? m.folder === 'inbox' : m.folder === f
  )
  const filtered = mails
    .filter(m => isInFolder(m, currentFolder))
    .filter(m => [m.s, m.t, m.d].some(x => x.toLowerCase().includes(q.toLowerCase())))

  const counts = mails.reduce((acc, m) => {
    acc[m.folder] = (acc[m.folder] || 0) + 1
    return acc
  }, {})

  const initials = (name='') => name.split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase()
  const colorFor = (name='') => {
    const hues = [220, 200, 260, 340, 20, 150, 300]
    let h = 0; for (let i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i)) % hues.length
    return `linear-gradient(135deg, hsl(${hues[h]} 80% 55% / 1), hsl(${(hues[h]+30)%360} 80% 50% / 1))`
  }

  const compose = () => { setComposeDraft({ to:'', subject:'', body:'' }); setShowCompose(true) }

  const archiveSelected = () => {
    if (!selected) return
    setMails(prev => prev.map(m => m.id === selected.id ? { ...m, archived: true, folder: 'archive' } : m))
    setSelected(null)
    setShowMore(false)
  }

  const toggleReadSelected = () => {
    if (!selected) return
    setMails(prev => prev.map(m => m.id === selected.id ? { ...m, unread: !m.unread } : m))
    setShowMore(false)
  }

  const deleteSelected = () => {
    if (!selected) return
    setMails(prev => prev.map(m => m.id === selected.id ? { ...m, folder: 'trash' } : m))
    setSelected(null)
    setShowMore(false)
  }

  const forwardSelected = () => {
    if (!selected) return
    const m = selected
    setComposeDraft({
      to: '',
      subject: `Fwd: ${m.t}`,
      body: `\n\n---------- Forwarded message ----------\nFrom: ${m.s}\nTime: ${m.time}\nSubject: ${m.t}\n\n${m.d}`,
    })
    setShowCompose(true)
  }

  const replySelected = () => {
    if (!selected) return
    const m = selected
    setComposeDraft({
      to: m.s,
      subject: m.t.startsWith('Re:') ? m.t : `Re: ${m.t}`,
      body: `\n\nOn ${m.time}, ${m.s} wrote:\n> ${m.d}`,
    })
    setShowCompose(true)
  }

  const unarchiveSelected = () => {
    if (!selected) return
    setMails(prev => prev.map(m => m.id === selected.id ? { ...m, archived: false, folder: 'inbox' } : m))
    setSelected(null)
    setShowMore(false)
  }

  const sendCompose = () => {
    const nextId = (mails.reduce((max, m) => Math.max(max, m.id), 0) || 0) + 1
    const newMail = {
      id: nextId,
      s: `To: ${composeDraft.to || 'Recipient'}`,
      t: composeDraft.subject || '(No subject)',
      d: composeDraft.body || '',
      time: 'Now',
      unread: false,
      archived: false,
      folder: 'sent',
    }
    setMails(prev => [newMail, ...prev])
    setShowCompose(false)
    setComposeDraft({ to: '', subject: '', body: '' })
  }

  const chooseFolder = (f) => {
    setCurrentFolder(f)
    setShowSidebar(false)
    setSelected(null)
  }

  if (selected) {
    const m = selected
    return (
      <div className="w-full h-full flex flex-col relative">
        {/* Header */}
        <div className="p-3 flex items-center gap-3 border-b border-white/10 bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 sticky top-0 z-10">
          <button onClick={()=>setSelected(null)} className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center">←</button>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full" style={{background: colorFor(m.s)}} />
            <div>
              <div className="text-white text-sm font-medium">{m.s}</div>
              <div className="text-white/60 text-xs">{m.time}</div>
            </div>
          </div>
        </div>

        {/* Sidebar overlay (detail) */}
        {showSidebar && (
          <div className="absolute inset-0 z-30" onClick={()=>setShowSidebar(false)}>
            <div className="absolute inset-y-0 left-0 w-64 bg-black/90 border-r border-white/10 p-3" onClick={(e)=>e.stopPropagation()}>
              <div className="text-white font-medium mb-2">📬 Mail</div>
              <div className="space-y-1">
                {[
                  {key:'inbox', label:'Inbox', icon:'📥'},
                  {key:'sent', label:'Sent', icon:'📤'},
                  {key:'archive', label:'Archive', icon:'🗄️'},
                  {key:'trash', label:'Trash', icon:'🗑️'},
                ].map(f => (
                  <button key={f.key} onClick={()=>chooseFolder(f.key)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border border-white/10 ${currentFolder===f.key?'bg-white/10':'bg-transparent hover:bg-white/5'} text-white text-sm`}>
                    <span className="flex items-center gap-2"><span>{f.icon}</span>{f.label}</span>
                    <span className="text-white/70 text-xs">{counts[f.key]||0}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 pb-24 space-y-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 72px)' }}>
          <div className="text-white text-base font-semibold max-w-[92%] mx-auto">{m.t}</div>
          <div className="text-white/80 text-sm leading-relaxed max-w-[92%] mx-auto">
            {m.d} <br /><br />
            This is a mock email body to showcase the detail view styling. You can add more sections, links, and attachments here for a richer preview.
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 flex items-center gap-2 border-t border-white/10 bg-black/60 absolute inset-x-0 z-20" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 56px)' }}>
          <button onClick={replySelected} className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm">💬 Reply</button>
          <button onClick={forwardSelected} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm">📤 Forward</button>
          <div className="ml-auto relative">
            <button onClick={()=>setShowMore(v=>!v)} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm">⋯ More</button>
            {showMore && (
              <div className="absolute right-0 bottom-full mb-2 w-44 rounded-xl border border-white/10 bg-black/90 backdrop-blur p-1 shadow-lg z-30">
                <button onClick={toggleReadSelected} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white text-sm">{selected?.unread ? 'Mark as read' : 'Mark as unread'}</button>
                {selected?.folder === 'archive' ? (
                  <button onClick={unarchiveSelected} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white text-sm">Unarchive</button>
                ) : (
                  <button onClick={archiveSelected} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white text-sm">Archive</button>
                )}
                <button onClick={deleteSelected} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-red-300 text-sm">Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="p-2 bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border-b border-white/10 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={()=>setShowSidebar(true)} className="h-10 w-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white grid place-items-center">☰</button>
          <div className="flex-1 flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-3 py-2">
            <span className="text-white/70 text-sm">🔎</span>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search mail"
                   className="w-full bg-transparent text-white text-sm outline-none placeholder-white/50" />
            {q && <button onClick={()=>setQ('')} className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs grid place-items-center">×</button>}
          </div>
        </div>
      </div>

      {/* Sidebar overlay (list) */}
      {showSidebar && (
        <div className="absolute inset-0 z-30" onClick={()=>setShowSidebar(false)}>
          <div className="absolute inset-y-0 left-0 w-64 bg-black/90 border-r border-white/10 p-3" onClick={(e)=>e.stopPropagation()}>
            <div className="text-white font-medium mb-2">📬 Mail</div>
            <div className="space-y-1">
              {[
                {key:'inbox', label:'Inbox', icon:'📥'},
                {key:'sent', label:'Sent', icon:'📤'},
                {key:'archive', label:'Archive', icon:'🗄️'},
                {key:'trash', label:'Trash', icon:'🗑️'},
              ].map(f => (
                <button key={f.key} onClick={()=>chooseFolder(f.key)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border border-white/10 ${currentFolder===f.key?'bg-white/10':'bg-transparent hover:bg-white/5'} text-white text-sm`}>
                  <span className="flex items-center gap-2"><span>{f.icon}</span>{f.label}</span>
                  <span className="text-white/70 text-xs">{counts[f.key]||0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-2 pb-24 space-y-2" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
        {filtered.map(m => (
          <button key={m.id} onClick={()=>setSelected(m)}
                  className={`w-full text-left rounded-2xl border border-white/10 px-3 py-3 bg-white/5 hover:bg-white/10 transition-all shadow-sm hover:shadow ${m.unread ? 'ring-1 ring-white/20' : ''}`}>
            <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3">
              <div className="h-10 w-10 rounded-full grid place-items-center text-white text-sm font-medium" style={{background: colorFor(m.s)}}>
                {initials(m.s)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-white text-sm ${m.unread ? 'font-semibold' : 'font-medium'}`}>{m.s}</span>
                  {m.unread && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">Unread</span>}
                </div>
                <div className={`text-white/90 text-sm line-clamp-1 ${m.unread ? 'font-semibold' : 'font-normal'}`}>{m.t}</div>
                <div className="text-white/60 text-xs line-clamp-1">{m.d}</div>
              </div>
              <div className="text-white/60 text-[11px] font-mono tracking-tight flex flex-col items-end gap-1">
                <span>{m.time}</span>
                {m.unread && <span className="h-2 w-2 rounded-full bg-indigo-400" />}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-white/60 text-sm py-6">No mail found</div>
        )}
      </div>

      {/* Floating compose + */}
      <button onClick={compose} aria-label="Compose" title="Compose"
              className="absolute right-4 z-20 h-12 w-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-2xl shadow-lg border border-white/10 grid place-items-center"
              style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}>+
      </button>

      {/* Compose sheet (mock) */}
      {showCompose && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm grid place-items-center">
          <div className="w-[92%] rounded-2xl border border-white/10 bg-black p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-white text-sm font-medium">New message</div>
              <button onClick={()=>setShowCompose(false)} className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center">×</button>
            </div>
            <input value={composeDraft.to} onChange={e=>setComposeDraft(d=>({...d,to:e.target.value}))} placeholder="To" className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-3 py-2 text-sm outline-none placeholder-white/50" />
            <input value={composeDraft.subject} onChange={e=>setComposeDraft(d=>({...d,subject:e.target.value}))} placeholder="Subject" className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-3 py-2 text-sm outline-none placeholder-white/50" />
            <textarea value={composeDraft.body} onChange={e=>setComposeDraft(d=>({...d,body:e.target.value}))} placeholder="Message" rows={5} className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-3 py-2 text-sm outline-none placeholder-white/50" />
            <div className="flex items-center justify-end gap-2 pt-1">
              <button onClick={()=>setShowCompose(false)} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm">Cancel</button>
              <button onClick={sendCompose} className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SettingsApp() {
  const [wifi, setWifi] = useState(true)
  const [bt, setBt] = useState(false)
  const Row = ({label, val, setVal}) => (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      <span className="text-white">{label}</span>
      <button onClick={()=>setVal(v=>!v)} className={`w-12 h-6 rounded-full ${val?'bg-emerald-500':'bg-slate-600'} relative`}>
        <span className={`absolute top-0.5 ${val?'right-0.5':'left-0.5'} h-5 w-5 rounded-full bg-white`} />
      </button>
    </div>
  )
  return (
    <div>
      <Row label="Wi‑Fi" val={wifi} setVal={setWifi} />
      <Row label="Bluetooth" val={bt} setVal={setBt} />
      <div className="px-4 py-3 text-white/70 text-sm">Mock settings only.</div>
    </div>
  )
}

function WeatherApp() {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [units, setUnits] = useState('metric') // 'metric' | 'imperial'
  const [query, setQuery] = useState('Kathmandu')
  const [loc, setLoc] = useState(null) // { lat, lon, name }
  const [current, setCurrent] = useState(null)
  const [hourly, setHourly] = useState([])
  const [daily, setDaily] = useState([])
  const [sugs, setSugs] = useState([])
  const [sugsLoading, setSugsLoading] = useState(false)
  const [showSugs, setShowSugs] = useState(false)
  const sugBoxRef = useRef(null)
  const hourlyRef = useRef(null)

  const placeLabel = (p) => {
    const name = p?.name || ''
    const state = p?.state && p.state !== name ? p.state : ''
    const country = p?.country || ''
    return `${name}${state ? ', ' + state : ''}${country ? ', ' + country.toUpperCase() : ''}`
  }

  const placeKey = (p) => `${(p?.name||'').toLowerCase().trim()}|${(p?.state||'').toLowerCase().trim()}|${(p?.country||'').toUpperCase()}`
  const dedupePlaces = (arr=[]) => {
    const seen = new Set()
    const out = []
    for (const p of arr) {
      const k = placeKey(p)
      if (seen.has(k)) continue
      seen.add(k)
      out.push(p)
    }
    return out
  }
  const sortPlaces = (arr=[]) => arr.slice().sort((a,b)=>{
    const npA = (a.country||'').toUpperCase()==='NP' ? 1 : 0
    const npB = (b.country||'').toUpperCase()==='NP' ? 1 : 0
    if (npA !== npB) return npB - npA
    const stA = a.state ? 1 : 0
    const stB = b.state ? 1 : 0
    if (stA !== stB) return stB - stA
    return (a.name||'').localeCompare(b.name||'')
  })

  const iconFor = (id) => {
    if (id >= 200 && id < 300) return '⛈️'
    if (id >= 300 && id < 500) return '🌦️'
    if (id >= 500 && id < 600) return '🌧️'
    if (id >= 600 && id < 700) return '❄️'
    if (id >= 700 && id < 800) return '🌫️'
    if (id === 800) return '☀️'
    if (id > 800) return '⛅'
    return '🌡️'
  }

  const dayName = (dt, tzOffsetSec) => {
    const d = new Date((dt + tzOffsetSec) * 1000)
    return d.toLocaleDateString(undefined, { weekday: 'short' })
  }

  const hourLabel = (dt, tzOffsetSec) => {
    const d = new Date((dt + tzOffsetSec) * 1000)
    return d.toLocaleTimeString([], { hour: 'numeric' })
  }

  const fetchByCity = async (city) => {
    const u = units
    const base = 'https://api.openweathermap.org/data/2.5'
    // First: current and coords
    const res = await fetch(`${base}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${u}`)
    if (!res.ok) throw new Error('City not found')
    const w = await res.json()
    const { coord, name, sys } = w
    // Forecast 5-day/3h
    const resF = await fetch(`${base}/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=${u}`)
    if (!resF.ok) throw new Error('Forecast fetch failed')
    const f = await resF.json()
    return { w, f, meta: { name, country: sys?.country, coord, tz: f?.city?.timezone || 0 } }
  }

  const geocode = async (q, limit=5) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${API_KEY}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Geocoding failed')
    return await res.json() // [{name, state, country, lat, lon}, ...]
  }

  const fetchByCoords = async (lat, lon) => {
    const u = units
    const base = 'https://api.openweathermap.org/data/2.5'
    const res = await fetch(`${base}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${u}`)
    if (!res.ok) throw new Error('Weather fetch failed')
    const w = await res.json()
    const resF = await fetch(`${base}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${u}`)
    if (!resF.ok) throw new Error('Forecast fetch failed')
    const f = await resF.json()
    return { w, f, meta: { name: w?.name, country: w?.sys?.country, coord: { lat, lon }, tz: f?.city?.timezone || 0 } }
  }

  const computeFrom = (w, f, meta) => {
    const c = {
      temp: Math.round(w.main.temp),
      condition: w.weather?.[0]?.description?.replace(/\b\w/g, (m) => m.toUpperCase()) || '—',
      location: `${meta.name || '—'}${meta.country ? ', ' + meta.country : ''}`,
      feelsLike: Math.round(w.main.feels_like),
      wind: Math.round(windIn(units, w.wind.speed)),
      humidity: w.main.humidity,
      icon: iconFor(w.weather?.[0]?.id || 800),
    }

    const tz = meta.tz || 0
    // Build next ~24h from forecast list (3-hourly)
    const nextHours = (f.list || []).slice(0, 8).map((h, idx) => ({
      t: idx === 0 ? 'Now' : hourLabel(h.dt, tz),
      temp: Math.round(h.main.temp),
      icon: iconFor(h.weather?.[0]?.id || 800)
    }))

    // Group by day for next 7 days
    const byDay = {}
    for (const item of f.list || []) {
      const d = new Date((item.dt + tz) * 1000)
      const key = d.toISOString().slice(0, 10)
      const temp = item.main.temp
      const id = item.weather?.[0]?.id || 800
      if (!byDay[key]) byDay[key] = { hi: -Infinity, lo: Infinity, ids: {} }
      byDay[key].hi = Math.max(byDay[key].hi, temp)
      byDay[key].lo = Math.min(byDay[key].lo, temp)
      byDay[key].ids[id] = (byDay[key].ids[id] || 0) + 1
    }
    const days = Object.keys(byDay).slice(0, 7).map((key) => {
      const [y, m, d] = key.split('-').map(Number)
      const dt = Date.UTC(y, m - 1, d) / 1000 - 0 // UTC seconds
      const id = Object.entries(byDay[key].ids).sort((a,b)=>b[1]-a[1])[0][0]
      return {
        d: dayName(dt, tz),
        hi: Math.round(byDay[key].hi),
        lo: Math.round(byDay[key].lo),
        icon: iconFor(Number(id))
      }
    })

    return { c, nextHours, days }
  }

  const windIn = (u, speed) => (u === 'imperial' ? speed : speed) // already in chosen units via API

  useEffect(() => {
    if (!API_KEY) {
      setError('Missing VITE_OPENWEATHER_API_KEY. Add it to your .env and restart dev server.')
      setLoading(false)
      return
    }
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        let data
        // Geolocation with strict timeout fallback
        const geolocateWithTimeout = () => new Promise((resolve) => {
          let settled = false
          const t = setTimeout(() => {
            if (settled) return
            settled = true
            resolve(null)
          }, 2500)
          if (!navigator.geolocation) {
            clearTimeout(t)
            settled = true
            resolve(null)
            return
          }
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              if (settled) return
              settled = true
              clearTimeout(t)
              try {
                resolve(await fetchByCoords(pos.coords.latitude, pos.coords.longitude))
              } catch {
                resolve(null)
              }
            },
            () => {
              if (settled) return
              settled = true
              clearTimeout(t)
              resolve(null)
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
          )
        })

        const geoData = await geolocateWithTimeout()
        if (geoData) data = geoData
        else data = await fetchByCity(query)
        if (cancelled) return
        const { w, f, meta } = data
        setLoc({ ...meta.coord, name: meta.name, country: meta.country })
        const { c, nextHours, days } = computeFrom(w, f, meta)
        setCurrent(c)
        setHourly(nextHours)
        setDaily(days)
        setLoading(false)
      } catch (e) {
        if (cancelled) return
        setError(e.message || 'Failed to load weather')
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_KEY, units])

  const search = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    try {
      setShowSugs(false); setSugs([])
      setLoading(true)
      setError('')
      // Prefer geocoding to get exact coords
      let place = null
      try {
        const res = await geocode(query.trim(), 1)
        place = res && res[0]
      } catch {}
      let data
      if (place) {
        data = await fetchByCoords(place.lat, place.lon)
        data.meta.name = `${place.name}${place.state ? ', ' + place.state : ''}`
        data.meta.country = place.country
      } else {
        data = await fetchByCity(query.trim())
      }
      const { w, f, meta } = data
      const { c, nextHours, days } = computeFrom(w, f, meta)
      setLoc({ ...meta.coord, name: meta.name, country: meta.country })
      setCurrent(c)
      setHourly(nextHours)
      setDaily(days)
      setLoading(false)
    } catch (e2) {
      setError(e2.message || 'Search failed')
      setLoading(false)
    }
  }

  // Debounced suggestions as user types
  useEffect(() => {
    if (!API_KEY) return
    const q = query.trim()
    if (q.length < 2) { setSugs([]); setShowSugs(false); return }
    let active = true
    const t = setTimeout(async () => {
      try {
        setSugsLoading(true)
        const res = await geocode(q, 8)
        if (!active) return
        const cleaned = sortPlaces(dedupePlaces(res||[])).slice(0,6)
        setSugs(cleaned)
        // Do not auto-open here; opening is controlled by input focus/change
      } catch {
        if (!active) return
        setSugs([])
        setShowSugs(false)
      } finally {
        if (active) setSugsLoading(false)
      }
    }, 300)
    return () => { active = false; clearTimeout(t) }
  }, [query, API_KEY])

  // Close suggestions on outside click
  useEffect(() => {
    if (!showSugs) return
    const onDown = (e) => {
      if (!sugBoxRef.current) return
      if (!sugBoxRef.current.contains(e.target)) {
        setShowSugs(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [showSugs])

  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-900 to-black text-white flex flex-col">
      {/* Header / Search */}
      <div className="px-3 pt-3 relative z-10" ref={sugBoxRef}>
        <form onSubmit={search} className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e)=>{ setQuery(e.target.value); setShowSugs(true) }}
            onFocus={()=> setShowSugs(s=>sugs.length>0 || sugsLoading)}
            onBlur={()=>{ setTimeout(()=>setShowSugs(false), 150) }}
            onKeyDown={(e)=>{ if(e.key==='Escape'){ setShowSugs(false) } }}
            placeholder="Search city"
            className="flex-1 rounded-xl bg-white/10 text-white px-3 py-2 text-sm outline-none placeholder-white/50 focus:ring-2 focus:ring-sky-500/60"
          />
          <button type="submit" className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm">Go</button>
          <button type="button" onClick={()=>setUnits(u=>u==='metric'?'imperial':'metric')} className="px-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">
            {units==='metric'?'°C':'°F'}
          </button>
        </form>
        {showSugs && (sugsLoading || sugs.length > 0) && (
          <div className="absolute left-3 right-3 mt-2 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md shadow-xl overflow-hidden max-h-56 overflow-y-auto">
            {sugsLoading && <div className="px-3 py-2 text-white/60 text-sm">Searching…</div>}
            {!sugsLoading && sugs.length === 0 && <div className="px-3 py-2 text-white/60 text-sm">No matches</div>}
            {!sugsLoading && sugs.map((p, idx) => (
              <button
                key={`${p.lat},${p.lon},${idx}`}
                className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10"
                onClick={async ()=>{
                  setQuery(placeLabel(p))
                  setShowSugs(false); setSugs([])
                  try {
                    setLoading(true); setError('')
                    const data = await fetchByCoords(p.lat, p.lon)
                    data.meta.name = placeLabel(p)
                    data.meta.country = p.country
                    const { w, f, meta } = data
                    const { c, nextHours, days } = computeFrom(w, f, meta)
                    setLoc({ ...meta.coord, name: meta.name, country: meta.country })
                    setCurrent(c); setHourly(nextHours); setDaily(days)
                    setLoading(false)
                  } catch (e) {
                    setError(e.message || 'Failed to load city'); setLoading(false)
                  }
                }}
              >
                {placeLabel(p)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="flex-1 grid place-items-center">
          <div className="animate-pulse text-white/70">Loading weather…</div>
        </div>
      )}
      {!loading && error && (
        <div className="flex-1 grid place-items-center px-4 text-center">
          <div>
            <div className="text-rose-300 mb-2">{error}</div>
            <div className="text-white/60 text-sm">Ensure your API key is set and network is available.</div>
          </div>
        </div>
      )}

      {!loading && !error && current && (
        <>
          {/* Current */}
          <div className="px-4 pt-4 pb-3">
            <div className="text-white/80 text-sm">{current.location}</div>
            <div className="mt-1 flex items-end gap-3">
              <div className="text-6xl font-semibold leading-none">{current.temp}°</div>
              <div className="mb-1 text-white/80 flex items-center gap-1">{current.icon}<span>{current.condition}</span></div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-2 text-center">
                <div className="text-white/60">Feels like</div>
                <div className="text-white font-medium">{current.feelsLike}°</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-2 text-center">
                <div className="text-white/60">Wind</div>
                <div className="text-white font-medium">{current.wind} {units==='metric'?'m/s':'mph'}</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-2 text-center">
                <div className="text-white/60">Humidity</div>
                <div className="text-white font-medium">{current.humidity}%</div>
              </div>
            </div>
          </div>

          {/* Hourly slider */}
          <div className="px-3">
            <div className="text-white/80 text-xs mb-2">Hourly forecast</div>
            <div className="relative">
              {/* Left arrow */}
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => hourlyRef.current?.scrollBy({ left: -140, behavior: 'smooth' })}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white grid place-items-center backdrop-blur-md border border-white/10"
              >
                ‹
              </button>

              {/* Scroll container */}
              <div
                ref={hourlyRef}
                className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 no-scrollbar snap-x snap-mandatory"
                style={{ maskImage: 'linear-gradient(90deg, transparent, white 12%, white 88%, transparent)' }}
              >
                {hourly.map((h, i) => (
                  <div key={i} className="min-w-[72px] snap-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-2 text-center hover:bg-white/20 transition">
                    <div className="text-[10px] text-white/70">{h.t}</div>
                    <div className="text-lg leading-none my-1">{h.icon}</div>
                    <div className="text-sm font-medium">{h.temp}°</div>
                  </div>
                ))}
              </div>

              {/* Right arrow */}
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => hourlyRef.current?.scrollBy({ left: 140, behavior: 'smooth' })}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white grid place-items-center backdrop-blur-md border border-white/10"
              >
                ›
              </button>
            </div>
          </div>

          {/* 3‑day */}
          <div className="mt-3 px-3 pb-4">
            <div className="text-white/80 text-xs mb-2">3‑day forecast</div>
            <div className="space-y-1.5">
              {daily.slice(0,3).map((d, i) => (
                <div key={i} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2">
                  <div className="text-white/80 text-xs">{d.d}</div>
                  <div className="text-base">{d.icon}</div>
                  <div className="text-xs text-white/90">
                    <span className="font-medium">{d.hi}°</span>
                    <span className="text-white/60"> / {d.lo}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ClockApp() {
  const [now, setNow] = useState(new Date())
  useEffect(()=>{ const id=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(id) },[])
  const pad = (n)=> String(n).padStart(2,'0')
  return (
    <div className="h-full grid place-items-center text-white">
      <div className="text-6xl font-bold">{pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}</div>
    </div>
  )
}



function renderAppContent(key, open, closeApp) {
  switch (key) {
    case 'maps': return <MapApp />
    case 'chrome': return <ChromeApp />
    case 'play': return <PlayApp onOpen={(k)=> open(k)} />
    case 'photos': return <PhotosApp />
    case 'camera': return <CameraApp />
    case 'phone': return <DialerApp onCloseApp={closeApp} />
    case 'message': return <MessagesApp />
    case 'mail': return <MailApp />
    case 'settings': return <SettingsApp />
    case 'weather': return <WeatherApp />
    case 'clock': return <ClockApp />
    case 'calc': return <Calculator />
    default: return <div className="h-full grid place-items-center text-white/70">Coming soon…</div>
  }
}

const apps = [
  { icon: 'phone', label: 'Phone', bg: 'linear-gradient(135deg,#34d399,#059669)', open: 'phone' },
  { icon: 'message', label: 'Messages', bg: 'linear-gradient(135deg,#60a5fa,#2563eb)', open: 'message' },
  { icon: 'weather', label: '1Weather', bg: 'linear-gradient(135deg,#fbbf24,#f59e0b)', open: 'weather' },
  { icon: 'maps', label: 'Maps', bg: 'linear-gradient(135deg,#a78bfa,#7c3aed)', open: 'maps' },
  { icon: 'mail', label: 'Mail', bg: 'linear-gradient(135deg,#60a5fa,#2563eb)', open: 'mail' },
  { icon: 'play', label: 'Play', bg: 'linear-gradient(135deg,#34d399,#10b981)', open: 'play' },
  { icon: 'camera', label: 'Camera', bg: 'linear-gradient(135deg,#f472b6,#ec4899)', open: 'camera' },
  { icon: 'settings', label: 'Settings', bg: 'linear-gradient(135deg,#cbd5e1,#94a3b8)', open: 'settings' },
  { icon: 'clock', label: 'Clock', bg: 'linear-gradient(135deg,#fdba74,#fb923c)', open: 'clock' },
  { icon: 'photos', label: 'Photos', bg: 'linear-gradient(135deg,#f472b6,#a78bfa)', open: 'photos' },
  { icon: 'chrome', label: 'Chrome', bg: 'linear-gradient(135deg,#22c55e,#ef4444)', open: 'chrome' },
  { icon: 'calc', label: 'Calc', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', open: 'calc' },
]

const dock = [
  { icon: 'phone', label: 'Phone', bg: 'linear-gradient(135deg,#34d399,#059669)', open: 'phone' },
  { icon: 'message', label: 'Messages', bg: 'linear-gradient(135deg,#60a5fa,#2563eb)', open: 'message' },
  { icon: 'chrome', label: 'Chrome', bg: 'linear-gradient(135deg,#22c55e,#ef4444)', open: 'chrome' },
  { icon: 'camera', label: 'Camera', bg: 'linear-gradient(135deg,#f472b6,#ec4899)', open: 'camera' },
]

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)

  const input = (v) => {
    setDisplay((d) => (d === '0' && v !== '.' ? v : (d.includes('.') && v === '.' ? d : d + v)))
  }
  const clear = () => { setDisplay('0'); setPrev(null); setOp(null) }
  const back = () => setDisplay((d) => (d.length <= 1 ? '0' : d.slice(0, -1)))
  const percent = () => setDisplay((d) => String((parseFloat(d) || 0) / 100))

  const chooseOp = (nextOp) => {
    if (op && prev != null) {
      equals()
      setOp(nextOp)
      return
    }
    setPrev(parseFloat(display) || 0)
    setDisplay('0')
    setOp(nextOp)
  }

  const equals = () => {
    if (op == null || prev == null) return
    const a = prev
    const b = parseFloat(display) || 0
    let res = 0
    switch (op) {
      case '+': res = a + b; break
      case '-': res = a - b; break
      case '×': res = a * b; break
      case '÷': res = b === 0 ? NaN : a / b; break
    }
    setDisplay(Number.isFinite(res) ? String(res) : 'Error')
    setPrev(null)
    setOp(null)
  }

  const key = (k) => () => input(k)

  const Btn = ({ children, onClick, className = '' }) => (
    <button type="button" onClick={onClick} className={`h-12 rounded-xl text-white text-lg active:scale-95 transition ${className}`}>
      {children}
    </button>
  )

  return (
    <div className="h-full p-4">
      <div className="text-right text-3xl text-white font-semibold min-h-[2.5rem] mb-2 truncate">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        <Btn onClick={clear} className="bg-slate-700">AC</Btn>
        <Btn onClick={back} className="bg-slate-700">⌫</Btn>
        <Btn onClick={percent} className="bg-slate-700">%</Btn>
        <Btn onClick={() => chooseOp('÷')} className="bg-indigo-600">÷</Btn>

        <Btn onClick={key('7')} className="bg-slate-800">7</Btn>
        <Btn onClick={key('8')} className="bg-slate-800">8</Btn>
        <Btn onClick={key('9')} className="bg-slate-800">9</Btn>
        <Btn onClick={() => chooseOp('×')} className="bg-indigo-600">×</Btn>

        <Btn onClick={key('4')} className="bg-slate-800">4</Btn>
        <Btn onClick={key('5')} className="bg-slate-800">5</Btn>
        <Btn onClick={key('6')} className="bg-slate-800">6</Btn>
        <Btn onClick={() => chooseOp('-')} className="bg-indigo-600">−</Btn>

        <Btn onClick={key('1')} className="bg-slate-800">1</Btn>
        <Btn onClick={key('2')} className="bg-slate-800">2</Btn>
        <Btn onClick={key('3')} className="bg-slate-800">3</Btn>
        <Btn onClick={() => chooseOp('+')} className="bg-indigo-600">+</Btn>

        <Btn onClick={key('0')} className="bg-slate-800 col-span-2">0</Btn>
        <Btn onClick={key('.')} className="bg-slate-800">.</Btn>
        <Btn onClick={equals} className="bg-emerald-600">=</Btn>
      </div>
    </div>
  )
}
