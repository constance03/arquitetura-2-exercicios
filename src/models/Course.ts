export class Course {
    constructor(
        private id: string,
        private name: string,
        private lessons: number
    ) {}

    public getLessons(): number {
        return this.lessons;
    }
    public setLessons(value: number) {
        this.lessons = value;
    }
    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }
    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
}