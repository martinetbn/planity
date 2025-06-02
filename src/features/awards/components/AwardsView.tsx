import { useAwards } from '../hooks/useAwards';
import { useTasks } from '../../tasks/hooks/useTasks';
import { Award } from '../../../lib/types';
import { Icon } from '@iconify/react';
import { cn } from '../../../lib/utils';

export default function AwardsView() {
  const { 
    unlockedAwards, 
    lockedAwards, 
    achievements, 
    getAwardProgress,
    stats: awardStats 
  } = useAwards();
  const { stats } = useTasks();

  const AwardCard = ({ award, isUnlocked }: { award: Award; isUnlocked: boolean }) => {
    const progress = getAwardProgress(award);

    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105",
        isUnlocked 
          ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-lg hover:shadow-xl" 
          : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 shadow-sm hover:shadow-md"
      )}>
        {/* Unlock Effect */}
        {isUnlocked && (
          <div className="absolute top-2 right-2">
            <Icon icon="mdi:check-circle" className="h-6 w-6 text-green-500" />
          </div>
        )}

        {/* Award Icon */}
        <div className={cn(
          "flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto",
          isUnlocked 
            ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg" 
            : "bg-gray-200 text-gray-400"
        )}>
          <Icon 
            icon={award.icon} 
            className={cn(
              "h-8 w-8",
              isUnlocked ? "text-white" : "text-gray-400"
            )} 
          />
        </div>

        {/* Award Info */}
        <div className="text-center space-y-2">
          <h3 className={cn(
            "font-bold text-lg",
            isUnlocked ? "text-gray-900" : "text-gray-500"
          )}>
            {award.name}
          </h3>
          
          <p className={cn(
            "text-sm",
            isUnlocked ? "text-gray-600" : "text-gray-400"
          )}>
            {award.description}
          </p>

          {/* Progress */}
          {!isUnlocked && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{progress.current}</span>
                <span>{progress.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Unlock Date */}
          {isUnlocked && award.unlockedAt && (
            <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full mt-3">
              Desbloqueado {new Date(award.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Icon icon="mdi:check-all" className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Completadas</p>
              <p className="text-2xl font-bold text-blue-900">{achievements.totalCompleted}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Icon icon="mdi:trophy" className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Logros</p>
              <p className="text-2xl font-bold text-purple-900">{awardStats.unlockedCount}/{awardStats.totalAwards}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Icon icon="mdi:percent" className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-600 font-medium">Progreso</p>
              <p className="text-2xl font-bold text-orange-900">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Awards */}
      {unlockedAwards.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Icon icon="mdi:trophy" className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Logros Desbloqueados</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-yellow-300 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedAwards.map(award => (
              <AwardCard key={award.id} award={award} isUnlocked={true} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Awards */}
      {lockedAwards.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Icon icon="mdi:lock" className="h-6 w-6 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900">Próximos Logros</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAwards.map(award => (
              <AwardCard key={award.id} award={award} isUnlocked={false} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {unlockedAwards.length === 0 && lockedAwards.length === 0 && (
        <div className="text-center py-12">
          <Icon icon="mdi:trophy-outline" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">No hay logros disponibles</h3>
          <p className="text-gray-400">Completa tareas para desbloquear logros increíbles.</p>
        </div>
      )}
    </div>
  );
} 