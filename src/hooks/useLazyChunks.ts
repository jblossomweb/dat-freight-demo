import { useEffect, useState } from 'react';

interface LazyLoadedComponent<Props = object> {
  default: React.ComponentType<Props>;
}

// a hook abstracted from FreightLoadsPage to track lazy loading chunks
const useLazyChunks = <Props = object>(
  lazyLoad: () => Promise<LazyLoadedComponent<Props>>,
  errorMessage = 'Failed to load code-split component chunk.',
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    lazyLoad()
      .catch(() => {
        setError(new Error(errorMessage));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lazyLoad, errorMessage]);

  return { isLoading, error };
};

export default useLazyChunks;
