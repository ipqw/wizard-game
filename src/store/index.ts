import { makeAutoObservable } from 'mobx';
import { Wizard } from '../models/Wizard';

class Storage {
    constructor() {
        makeAutoObservable(this);
    }
    _cursorLocation: { x: number; y: number } = { x: 0, y: 0 };
    get cursorLocation() {
        return this._cursorLocation;
    }
    setCursorLocation = (location: { x: number; y: number }) => {
        this._cursorLocation = location;
    };

    // hits
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

    // wizards
    _leftWizard: Wizard | null = null;
    get leftWizard() {
        return this._leftWizard;
    }
    setLeftWizard = (wizard: Wizard) => {
        this._leftWizard = wizard;
    };

    _rightWizard: Wizard | null = null;
    get rightWizard() {
        return this._rightWizard;
    }
    setRightWizard = (wizard: Wizard) => {
        this._rightWizard = wizard;
    };
}

export const store = new Storage();
