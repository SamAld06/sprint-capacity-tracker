"use client";

import { useState } from "react";

export const useNumberInputChange = (currentValue: number | string = "") => {
    const [value, setValue] = useState<string>(String(currentValue));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {
            setValue(newValue);
        }
    }
    return {value, onChange};
}