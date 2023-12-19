import { Ingridient } from '../shared';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingridients: Ingridient[];

    // get _name(): string {
    //     return this.name;
    // }
    // set _name(value: string) {
    //     this.name = value;
    // }

    // get _description(): string {
    //     return this.description;
    // }
    // set _description(value: string) {
    //     this.description = value;
    // }

    // get _imagePath(): string {
    //     return this.imagePath;
    // }
    // set _imagePath(value: string) {
    //     this.imagePath = value;
    // }

    // get _ingridients(): Ingridient[] {
    //   return this.ingridients;
    // }
    // set _ingridients(ingridients: Ingridient[]) {
    //   this.ingridients = ingridients;
    // }

    constructor(name: string, description: string, imagePath: string, ingridients: Ingridient[] ) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingridients = ingridients;
    }
}
