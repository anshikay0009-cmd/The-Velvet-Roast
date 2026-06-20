import { useState, useEffect, useCallback, useRef } from 'react';

// Custom lightweight SWR/React Query lookalike hook to periodically fetch and synchronize data
export function useSWR<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: { refreshInterval: number; onSuccess?: (data: T) => void }
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Use refs to store the latest fetcher and options to completely avoid re-creation issues
  const fetcherRef = useRef(fetcher);
  const optionsRef = useRef(options);

  // Keep references to fetcher and options updated on every run
  useEffect(() => {
    fetcherRef.current = fetcher;
    optionsRef.current = options;
  });

  const revalidate = useCallback(async () => {
    setIsValidating(true);
    try {
      const result = await fetcherRef.current();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
      if (optionsRef.current.onSuccess) {
        optionsRef.current.onSuccess(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsValidating(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    revalidate();

    // Setup periodic automatic polling
    const intervalId = setInterval(() => {
      revalidate();
    }, options.refreshInterval);

    return () => clearInterval(intervalId);
  }, [revalidate, options.refreshInterval]);

  return {
    data,
    error,
    isValidating,
    mutate: revalidate,
    lastUpdated
  };
}
