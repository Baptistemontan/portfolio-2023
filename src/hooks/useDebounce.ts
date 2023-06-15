import { Dispatch, SetStateAction, useState } from "react";


export default function useDebounce<S>(initialState: S | (() => S), timeout: number = 500): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = useState<S>(initialState);
    const [cooldown, setCooldown] = useState(false);

    const debouncer = (val: SetStateAction<S>) => {
        if (!cooldown) {
            if(typeof val === 'function') {
                const cb = val as (v:S) => S;
                setValue(cb(value));
            } else {
                setValue(val);
            }
            setCooldown(true);
            setTimeout(() => setCooldown(false), timeout);
        }
    }

    return [value, debouncer]
}