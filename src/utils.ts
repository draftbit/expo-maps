import isEqual from "lodash.isequal";
import React from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Flattens array of components to remove any React.Fragment's (<> </>) and returns the fragment's children in its place
 * This is useful for operations that depend on a particular child type that would otherwise not match when wrapped in a fragment
 */
export function flattenReactFragments(
  components: React.ReactElement[]
): React.ReactElement[] {
  const flattened = [];
  for (const component of components) {
    if (component.type === React.Fragment) {
      const children = React.Children.toArray(
        (component as any).props?.children
      ) as React.ReactElement[];

      for (const child of children) {
        flattened.push(...flattenReactFragments([child]));
      }
    } else {
      flattened.push(component);
    }
  }

  return flattened;
}

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef<any>(undefined);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

/**
 * useMemo counterpart that does a deep compare on the dependency list
 */
export function useDeepCompareMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(factory, deps?.map(useDeepCompareMemoize));
}

/**
 * useEffect counterpart that does a deep compare on the dependency list
 */
export function useDeepCompareEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useEffect(effect, deps?.map(useDeepCompareMemoize));
}
