export const tile = [2, 22, 42, 62, 82];

export const keyMapping:{[key: string]:number} = {'d': 2,'f': 22,'g': 42,'j': 62,'k': 82};

export const ratio = 10;

export const getColor = (left: number): string => {
    switch (left) {
        case 2:
            return '#bee5be';
        case 22:
            return '#e8d5a7';
        case 42:
            return '#bee5be';
        case 62:
            return '#e8d5a7';
        case 82:
            return '#bee5be';
        default:
            return '#af6d6d';
    }
};

export type Note = {
    id: number;
    top: number;
    left: number;
    clicked: boolean;
};