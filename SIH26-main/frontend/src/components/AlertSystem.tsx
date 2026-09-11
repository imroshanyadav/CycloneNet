import { useState, useEffect } from 'react';
import { X, AlertTriangle, Info, AlertCircle, CheckCircle } from 'lucide-react';

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  location?: string;
  cycloneName?: string;
  windSpeed?: number;
  category?: string;
}

interface AlertSystemProps {
  open: boolean;
  onClose: () => void;
}

export function AlertSystem({ open, onClose }: AlertSystemProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simulate real-time alerts (in production, this would come from API/WebSocket)
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'CYCLONE WARNING',
        message: 'Severe Cyclonic Storm detected in Arabian Sea. Expected landfall in 48 hours near Gujarat coast.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
        location: 'Arabian Sea',
        cycloneName: 'Biparjoy',
        windSpeed: 120,
        category: 'VSCS'
      },
      {
        id: '2',
        type: 'warning',
        title: 'TRACK UPDATE',
        message: 'Cyclone Biparjoy has intensified. Current track prediction updated with 12% deviation from previous forecast.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
        location: 'Arabian Sea',
        cycloneName: 'Biparjoy',
        windSpeed: 115,
        category: 'VSCS'
      },
      {
        id: '3',
        type: 'info',
        title: 'CLASSIFICATION UPDATE',
        message: 'System reclassified as Very Severe Cyclonic Storm (VSCS). Eye pattern detected with improved confidence.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        location: 'Arabian Sea',
        cycloneName: 'Biparjoy'
      },
      {
        id: '4',
        type: 'warning',
        title: 'COASTAL DISTRICTS ALERT',
        message: 'High alert issued for Kutch, Porbandar, Jamnagar, and Dwarka. Evacuation recommended for low-lying areas.',
        timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        location: 'Gujarat Coast'
      },
      {
        id: '5',
        type: 'success',
        title: 'PREDICTION ACCURACY',
        message: 'Latest track prediction showing 95% confidence level. Error margin reduced to 32km for T+24h forecast.',
        timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      },
      {
        id: '6',
        type: 'info',
        title: 'SATELLITE DATA RECEIVED',
        message: 'New INSAT-3D imagery processed successfully. 81 frames analyzed for historical event Biparjoy 2023.',
        timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-orange-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
    }
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30 hover:bg-red-500/15';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/15';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15';
      case 'success':
        return 'bg-green-500/10 border-green-500/30 hover:bg-green-500/15';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutes

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#0f0f0f] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Alert System</h2>
              <p className="text-xs text-gray-400">Real-time cyclone notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{alerts.filter(a => a.type === 'critical').length}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{alerts.filter(a => a.type === 'warning').length}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Warning</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{alerts.filter(a => a.type === 'info').length}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Info</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{alerts.filter(a => a.type === 'success').length}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Success</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <p className="text-gray-400">No active alerts</p>
              <p className="text-sm text-gray-500 mt-2">System is monitoring normally</p>
            </div>
          ) : (
            alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all ${getAlertStyles(alert.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                        {alert.title}
                      </h3>
                      <button
                        onClick={() => deleteAlert(alert.id)}
                        className="flex-shrink-0 w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        {formatTimestamp(alert.timestamp)}
                      </span>
                      {alert.location && (
                        <span className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                          {alert.location}
                        </span>
                      )}
                      {alert.cycloneName && (
                        <span className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                          <span className="text-cyan-400 font-semibold">{alert.cycloneName}</span>
                        </span>
                      )}
                      {alert.windSpeed && (
                        <span className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                          {alert.windSpeed} kt
                        </span>
                      )}
                      {alert.category && (
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-semibold">
                          {alert.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
            <button
              onClick={() => setAlerts([])}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-400 hover:text-white transition-all"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
