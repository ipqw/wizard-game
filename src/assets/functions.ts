import { ILocation } from '../models/Wizard';

export const getCursorPosition = (
    canvas: HTMLCanvasElement | null,
    event: MouseEvent,
): ILocation => {
    const rect = canvas?.getBoundingClientRect();
    const x = event.clientX - Number(rect?.left);
    const y = event.clientY - Number(rect?.top);
    return { x, y };
};
