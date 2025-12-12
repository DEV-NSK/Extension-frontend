import React from 'react';
import Card from '../Common/Card';
import { FiActivity, FiEye, FiMessageCircle, FiClock } from 'react-icons/fi';
import '../../styles/global.css';

const StatsCard = ({ title, value, icon, trend, subtitle, color = 'primary' }) => {
  const colors = {
    primary: 'from-primary to-primary-dark',
    secondary: 'from-secondary to-purple-600',
    accent: 'from-accent to-cyan-600',
    success: 'from-green-500 to-green-600',
  };

  const icons = {
    activity: FiActivity,
    eye: FiEye,
    message: FiMessageCircle,
    clock: FiClock,
  };

  const IconComponent = icons[icon] || FiActivity;

  return (
    <Card padding={true} hover={true} className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
          {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 mt-4">
          <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
          <span className="text-xs text-text-muted">from yesterday</span>
        </div>
      )}
    </Card>
  );
};

export default StatsCard;