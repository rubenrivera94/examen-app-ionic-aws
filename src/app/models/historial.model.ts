export class Historial {
    public format: string = "";
    public text: string = "";
    public type: string = "";
    public icon: string = "";
    public created: Date;

    constructor(format: string, text: string) {
        this.format = format;
        this.text = text;
        this.created = new Date();

        this.determinarTipo();
    }

    private determinarTipo() {
        if (!this.text || this.text.length < 4) {
            this.type = 'No reconocido';
            this.icon = 'create';
            return;
        }

        const prefix = this.text.substring(0, 4);
        console.log('TIPO', prefix);

        switch (true) {
            case this.text.startsWith('http'):
                this.type = 'http';
                this.icon = 'globe';
                break;
            case this.text.startsWith('geo:'):
                this.type = 'geo';
                this.icon = 'pin';
                break;
            default:
                this.type = 'No reconocido';
                this.icon = 'create';
                break;
        }
    }
}
