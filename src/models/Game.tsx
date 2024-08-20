import { Wizard } from './Wizard';

export class Game {
    width: number;
    height: number;
    wizards: Wizard[] = [];
    context: CanvasRenderingContext2D | null;
    constructor(width: number, height: number, context: CanvasRenderingContext2D | null) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.wizards.push(new Wizard('left', this));
        this.wizards.push(new Wizard('right', this));
    }

    update = () => {
        this.wizards.forEach((wizard) => {
            if (this.context) {
                wizard.update();
            }
        });
    };
    draw = () => {
        this.context?.clearRect(0, 0, this.width || 0, this.height || 0);
        this.wizards.forEach((wizard) => {
            if (this.context) {
                wizard.draw(this.context);
            }
        });
    };
}
