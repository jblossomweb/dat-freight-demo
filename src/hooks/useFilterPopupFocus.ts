import { useCallback, useRef } from 'react';

interface FilterPopupFocusOptions {
  selector?: string;
}

const useFilterPopupFocus = ({
  selector = '[role="combobox"]',
}: FilterPopupFocusOptions = {}) => {
  const focusRef = useRef<HTMLDivElement | null>(null);
  const focusTimeoutRef = useRef<number | null>(null);

  const afterGuiAttached = useCallback(() => {
    if (focusTimeoutRef.current !== null) {
      window.clearTimeout(focusTimeoutRef.current);
    }

    focusTimeoutRef.current = window.setTimeout(() => {
      const focusRoot = focusRef.current;
      const focusTarget = focusRoot?.querySelector<HTMLElement>(selector);

      (focusTarget ?? focusRoot)?.focus();
      focusTimeoutRef.current = null;
    });
  }, [selector]);

  const afterGuiDetached = useCallback(() => {
    if (focusTimeoutRef.current !== null) {
      window.clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = null;
    }
  }, []);

  return {
    focusRef,
    afterGuiAttached,
    afterGuiDetached,
  };
};

export default useFilterPopupFocus;
