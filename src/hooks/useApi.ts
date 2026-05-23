import { useState, useCallback } from 'react';

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useApi<T>(apiCall: () => Promise<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, [apiCall]);

  return { ...state, execute };
}

export function useDashboardData() {
  const { dashboardApi } = require('@/services/api');
  const [dashboard, setDashboard] = useState(null);
  const [accuracyStats, setAccuracyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [dashData, statsData] = await Promise.all([
        dashboardApi.getDashboard(),
        dashboardApi.getAccuracyStats(),
      ]);
      setDashboard(dashData);
      setAccuracyStats(statsData);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dashboard,
    accuracyStats,
    loading,
    error,
    fetchDashboardData,
  };
}

export function useQuizApi() {
  const { quizApi } = require('@/services/api');
  const [quiz, setQuiz] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = useCallback(async (topic: string, numQuestions = 5) => {
    try {
      setLoading(true);
      const data = await quizApi.generateQuiz(topic, numQuestions);
      setQuiz(data);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate quiz';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitQuizResult = useCallback(async (topic: string, score: number, total: number) => {
    try {
      setLoading(true);
      const data = await quizApi.submitQuizResult(topic, score, total);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit quiz result';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecommendation = useCallback(async () => {
    try {
      setLoading(true);
      const data = await quizApi.recommendQuiz();
      setRecommendation(data);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get quiz recommendation';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    quiz,
    recommendation,
    loading,
    error,
    generateQuiz,
    submitQuizResult,
    getRecommendation,
  };
}

export function useStudyPlanApi() {
  const { studyPlanApi } = require('@/services/api');
  const [plans, setPlans] = useState([]);
  const [todayPlan, setTodayPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = useCallback(
    async (goal: string, days = 7, hoursPerDay = 2, level = 'beginner') => {
      try {
        setLoading(true);
        const data = await studyPlanApi.generatePlan(goal, days, hoursPerDay, level);
        setError(null);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to generate study plan';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPlans = useCallback(async () => {
    try {
      setLoading(true);
      const data = await studyPlanApi.getPlans();
      setPlans(data.data || []);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch study plans';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTodayPlan = useCallback(async () => {
    try {
      setLoading(true);
      const data = await studyPlanApi.getTodayPlan();
      setTodayPlan(data.data || data);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch today\'s plan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeDay = useCallback(async (planId: string, dayNumber: number) => {
    try {
      setLoading(true);
      const data = await studyPlanApi.completeDay(planId, dayNumber);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete day';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    plans,
    todayPlan,
    loading,
    error,
    generatePlan,
    getPlans,
    getTodayPlan,
    completeDay,
  };
}
