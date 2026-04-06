import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Settings, 
  BarChart3, 
  ChevronRight, 
  Lock, 
  Power,
  ArrowDown,
  ArrowUp,
  Clock,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVERS, Server, ConnectionStats } from './types';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [showServerList, setShowServerList] = useState(false);
  const [stats, setStats] = useState<ConnectionStats>({
    download: 0,
    upload: 0,
    duration: '00:00:00',
    ip: '192.168.1.1'
  });

  // Simulate connection process
  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      setStats(prev => ({ ...prev, download: 0, upload: 0 }));
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 2000);
    }
  };

  // Simulate real-time stats
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          download: Math.floor(Math.random() * 50) + 10,
          upload: Math.floor(Math.random() * 20) + 5,
        }));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let seconds = 0;
    if (isConnected) {
      timer = setInterval(() => {
        seconds++;
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        setStats(prev => ({ ...prev, duration: `${h}:${m}:${s}` }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-vpn-bg text-slate-100 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-vpn-primary/20 rounded-xl flex items-center justify-center">
            <Shield className="text-vpn-primary w-6 h-6" />
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight">NexusVPN</h1>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <Settings className="w-6 h-6 text-slate-400" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 pt-8">
        {/* Connection Status Badge */}
        <motion.div 
          initial={false}
          animate={{ 
            backgroundColor: isConnected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: isConnected ? '#10b981' : '#ef4444'
          }}
          className="px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 mb-12"
        >
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-vpn-accent animate-pulse' : 'bg-red-500'}`} />
          {isConnecting ? 'Connecting...' : isConnected ? 'Protected' : 'Not Protected'}
        </motion.div>

        {/* Power Button Visual */}
        <div className="relative mb-12">
          {/* Outer Ring */}
          <div className="absolute inset-0 -m-8 rounded-full border border-slate-800/50" />
          <div className="absolute inset-0 -m-16 rounded-full border border-slate-800/30" />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleConnection}
            disabled={isConnecting}
            className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] ${
              isConnected 
                ? 'bg-vpn-accent shadow-vpn-accent/20' 
                : 'bg-slate-800 shadow-slate-900/50'
            }`}
          >
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"
                />
              ) : (
                <motion.div
                  key="power"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Power className={`w-16 h-16 ${isConnected ? 'text-white' : 'text-slate-500'}`} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Glow Effect */}
            {isConnected && (
              <motion.div 
                layoutId="glow"
                className="absolute inset-0 rounded-full bg-vpn-accent blur-2xl opacity-20 -z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        </div>

        {/* Connection Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <ArrowDown className="w-3 h-3" />
              <span>Download</span>
            </div>
            <div className="text-xl font-display font-bold">
              {stats.download} <span className="text-xs font-normal text-slate-500">Mbps</span>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/30">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <ArrowUp className="w-3 h-3" />
              <span>Upload</span>
            </div>
            <div className="text-xl font-display font-bold">
              {stats.upload} <span className="text-xs font-normal text-slate-500">Mbps</span>
            </div>
          </div>
        </div>

        {/* Server Selector */}
        <button 
          onClick={() => setShowServerList(true)}
          className="w-full bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="text-2xl">{selectedServer.flag}</div>
            <div className="text-left">
              <div className="text-sm font-medium">{selectedServer.name}</div>
              <div className="text-xs text-slate-500">{selectedServer.country}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Zap className="w-3 h-3 text-yellow-500" />
              {selectedServer.latency}ms
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          </div>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="p-6 flex justify-around items-center border-t border-slate-800/50 bg-vpn-bg/80 backdrop-blur-md">
        <button className="flex flex-col items-center gap-1 text-vpn-primary">
          <ShieldCheck className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">VPN</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Stats</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
          <Globe className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Global</span>
        </button>
      </nav>

      {/* Server List Modal */}
      <AnimatePresence>
        {showServerList && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowServerList(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-[32px] z-50 p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-6" />
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Select Location</h2>
                <div className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-800 rounded-md">
                  {SERVERS.length} Servers
                </div>
              </div>

              <div className="space-y-3">
                {SERVERS.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      setSelectedServer(server);
                      setShowServerList(false);
                      if (isConnected) {
                        setIsConnected(false);
                        toggleConnection();
                      }
                    }}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                      selectedServer.id === server.id 
                        ? 'bg-vpn-primary/10 border border-vpn-primary/30' 
                        : 'bg-slate-800/40 border border-transparent hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{server.flag}</div>
                      <div className="text-left">
                        <div className="text-sm font-medium flex items-center gap-2">
                          {server.name}
                          {server.isPremium && (
                            <Lock className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{server.country}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs font-medium text-slate-300">{server.latency}ms</div>
                        <div className="w-16 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              server.load > 70 ? 'bg-red-500' : server.load > 40 ? 'bg-yellow-500' : 'bg-vpn-accent'
                            }`}
                            style={{ width: `${server.load}%` }}
                          />
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedServer.id === server.id ? 'border-vpn-primary bg-vpn-primary' : 'border-slate-700'
                      }`}>
                        {selectedServer.id === server.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Premium Promo */}
              <div className="mt-8 p-5 bg-gradient-to-br from-vpn-primary to-blue-600 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1">Go Premium</h3>
                  <p className="text-sm text-white/80 mb-4">Unlock 50+ locations and ultra-fast 10Gbps servers.</p>
                  <button className="bg-white text-vpn-primary px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                    Upgrade Now
                  </button>
                </div>
                <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Connection Info Overlay */}
      <AnimatePresence>
        {isConnected && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-24 left-6 right-6 flex flex-col items-center gap-1 pointer-events-none"
          >
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{stats.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-vpn-accent text-xs font-medium">
              <MapPin className="w-3 h-3" />
              <span>IP: {stats.ip}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

