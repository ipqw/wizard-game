import { ILocation, Wizard } from './Wizard';

export class Spell {
    public location: ILocation;
    public direction: 'left' | 'right';
    public speed: number = 3;
    public wizard: Wizard;
    isVisible: boolean = true;

    constructor(location: ILocation, direction: 'left' | 'right', wizard: Wizard) {
        this.location = location;
        this.direction = direction;
        this.wizard = wizard;
    }
    draw = (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.roundRect(this.location.x, this.location.y, 10, 10, 100);
        context.fillStyle = this.isVisible ? 'blue' : '#ffffff';
        context.fill();
        context.closePath();
    };
    update = () => {
        if (this.direction === 'left') {
            this.location.x -= this.speed;
        } else {
            this.location.x += this.speed;
        }
    };
    removeSpell = () => {
        this.location = { x: 0, y: 0 };
        this.wizard.context?.beginPath();
        this.wizard.context?.clearRect(0, 0, 10, 10);
        this.wizard.context?.closePath();
        this.isVisible = false;
    };
    hitWizard = () => {
        if (this.isVisible) {
            this.wizard.hits++;
            this.removeSpell();
        }
    };
}
