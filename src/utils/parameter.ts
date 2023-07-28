export interface IParameter {
    name: string;
    value: any;
}

export class Parameter {
    private url: string;

    private values: IParameter[];

    private addedData: number;

    constructor(url: string, values: IParameter[]) {
        this.addedData = 0;
        this.url = url;
        this.values = values;
        this.generateUrl();
    }

    public getUrl() {
        return this.url;
    }

    private generateUrl() {
        this.values.forEach((param: IParameter) => {
            if (Array.isArray(param.value)) {
                param.value.forEach((value: string) => {
                    this.addData(param.name, value, true);
                });
            } else {
                this.addData(param.name, param.value, false);
            }
        });
    }

    private addData(name: string, value: any, isArray: boolean) {
        if (this.addedData === 0) {
            this.url += `?`;
        } else {
            this.url += `&`;
        }
        this.url += `${name}${isArray ? "[]" : ""}=${value}`;
        this.addedData += 1;
    }
}
