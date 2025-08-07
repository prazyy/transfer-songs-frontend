import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const alertVariants = {
  success: {
    container: 'bg-green-500/10 border-green-500/20 text-green-400',
    icon: CheckCircle,
    iconColor: 'text-green-400',
  },
  error: {
    container: 'bg-red-500/10 border-red-500/20 text-red-400',
    icon: AlertCircle,
    iconColor: 'text-red-400',
  },
  warning: {
    container: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
  },
  info: {
    container: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    icon: Info,
    iconColor: 'text-blue-400',
  },
};

export default function Alert({ 
  variant = 'info', 
  title, 
  children, 
  onClose, 
  className 
}: AlertProps) {
  const { container, icon: Icon, iconColor } = alertVariants[variant];

  return (
    <div className={cn(
      'p-4 border rounded-xl',
      container,
      className
    )}>
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', iconColor)} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-medium mb-1">
              {title}
            </h4>
          )}
          <div className={cn(
            'text-sm',
            variant === 'success' && 'text-green-300',
            variant === 'error' && 'text-red-300',
            variant === 'warning' && 'text-yellow-300',
            variant === 'info' && 'text-blue-300'
          )}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              'p-1 rounded-md hover:bg-black/10 transition-colors',
              iconColor
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
