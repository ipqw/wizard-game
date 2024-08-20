import { makeAutoObservable } from 'mobx';

class Storage {
    constructor() {
        makeAutoObservable(this);
    }
    _leftWizardHits: number = 0;
    get leftWizardHits() {
        return this._leftWizardHits;
    }
    increaseLeftWizardHits = () => {
        this._leftWizardHits++;
    };

    _rightWizardHits: number = 0;
    get rightWizardHits() {
        return this._rightWizardHits;
    }
    increaseRightWizardHits = () => {
        this._rightWizardHits++;
    };
}

export const store = new Storage();
