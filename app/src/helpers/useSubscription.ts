import React, { useCallback, useEffect, useState } from "react";

interface Unsubscribable {
    unsubscribe(): void;
}

export function useSubscription<T extends (...args: any[]) => void | Unsubscribable>
    (action: T, deps: React.DependencyList) {

    const [subscription, setSubscription] = useState<Unsubscribable | null>(null);
    useEffect(() => () => subscription?.unsubscribe(), [subscription]);

    return useCallback((...args: any[]) => {
        const result = action(...args);
        if (result !== undefined) {
            setSubscription(result);
        }
    }, deps) as T;
};