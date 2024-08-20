import { Spell } from './Spell';
import { Wizard } from './Wizard';

export class Game {
    width: number;
    height: number;
    wizards: Wizard[] = [];
    spells: Spell[] = [];
    context: CanvasRenderingContext2D | null;
    constructor(width: number, height: number, context: CanvasRenderingContext2D | null) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.wizards.push(new Wizard('left', this, context));
        this.wizards.push(new Wizard('right', this, context));
    }

    update = () => {
        this.wizards.forEach((wizard) => {
            if (this.context) {
                wizard.update();
            }
            this.spells.forEach((spell) => {
                if (spell.direction === 'right' && spell.isVisible) {
                    if (
                        spell.location.x + 10 >= wizard.location.x &&
                        spell.location.x <= wizard.location.x + 30 &&
                        spell.location.y >= wizard.location.y &&
                        spell.location.y <= wizard.location.y + 30 &&
                        wizard.position === 'right'
                    ) {
                        spell.hitWizard();
                    }
                } else if (spell.direction === 'left' && spell.isVisible) {
                    if (
                        spell.location.x <= wizard.location.x + 30 &&
                        spell.location.x >= wizard.location.x &&
                        spell.location.y >= wizard.location.y &&
                        spell.location.y <= wizard.location.y + 30 &&
                        wizard.position === 'left'
                    ) {
                        spell.hitWizard();
                    }
                }
            });
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
