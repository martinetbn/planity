import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { awardsAtom } from '../store/awardsAtoms';
import { useTasks } from '../../tasks/hooks/useTasks';
import { Award } from '../../../lib/types';

export function useAwards() {
  const [awards, setAwards] = useAtom(awardsAtom);
  const { tasks } = useTasks();

  // Calculate current achievements
  const achievements = useMemo(() => {
    const completedTasks = tasks.filter(task => task.isDone);
    const completedSubtasks = tasks.flatMap(task => task.subTasks).filter(subtask => subtask.isDone);
    const totalCompleted = completedTasks.length + completedSubtasks.length;
    
    const categoryStats = {
      'Trabajo': completedTasks.filter(task => task.category === 'Trabajo').length,
      'Personal': completedTasks.filter(task => task.category === 'Personal').length,
      'Estudio': completedTasks.filter(task => task.category === 'Estudio').length,
    };

    return {
      totalCompleted,
      totalTasks: tasks.length,
      categoryStats,
      completedToday: completedTasks.filter(task => {
        const taskDate = new Date(task.updatedAt);
        const today = new Date();
        return taskDate.toDateString() === today.toDateString();
      }).length,
    };
  }, [tasks]);

  // Check and unlock achievements
  useEffect(() => {
    setAwards(prevAwards => 
      prevAwards.map(award => {
        // Skip if already unlocked
        if (award.unlockedAt) return award;

        let shouldUnlock = false;
        
        switch (award.criteria.type) {
          case 'tasksCompleted':
            shouldUnlock = achievements.totalCompleted >= award.criteria.target;
            break;
          case 'tasksCreated':
            shouldUnlock = tasks.length >= award.criteria.target;
            break;
          case 'categoryMastery':
            if (award.criteria.category) {
              const categoryCount = achievements.categoryStats[award.criteria.category] || 0;
              shouldUnlock = categoryCount >= award.criteria.target;
            }
            break;
        }

        if (shouldUnlock) {
          return {
            ...award,
            unlockedAt: new Date().toISOString()
          };
        }

        return award;
      })
    );
  }, [achievements, setAwards]);

  // Get progress for a specific award
  const getAwardProgress = (award: Award) => {
    let current = 0;
    let target = award.criteria.target;

    switch (award.criteria.type) {
      case 'tasksCompleted':
        current = achievements.totalCompleted;
        break;
      case 'tasksCreated':
        current = tasks.length;
        break;
      case 'categoryMastery':
        if (award.criteria.category) {
          current = achievements.categoryStats[award.criteria.category] || 0;
        }
        break;
    }

    return {
      current,
      target,
      percentage: Math.min((current / target) * 100, 100)
    };
  };

  // Get recently unlocked awards (last 7 days)
  const getRecentlyUnlocked = () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return awards.filter(award => 
      award.unlockedAt && new Date(award.unlockedAt) >= weekAgo
    );
  };

  const unlockedAwards = awards.filter(award => award.unlockedAt);
  const lockedAwards = awards.filter(award => !award.unlockedAt);

  return {
    awards,
    unlockedAwards,
    lockedAwards,
    achievements,
    getAwardProgress,
    getRecentlyUnlocked,
    stats: {
      totalAwards: awards.length,
      unlockedCount: unlockedAwards.length,
      completionRate: awards.length > 0 ? Math.round((unlockedAwards.length / awards.length) * 100) : 0
    }
  };
} 