export const numberOnly = (input: string): string => {
    const validated = input.match(/\d+/);
    if (validated) {
        return validated[0];
    }
    return "";
};

export const isExists = (any: string) =>
    any !== undefined && any !== null && any !== "";

export const isNumber = (input: string) => {
    // Convert the input string to a number using the unary plus (+) operator
    const numberValue = +input;

    // Check if the result of the conversion is a valid number
    return !isNaN(numberValue);
};

export const isAlphanumberic = (data: string) => {
    let checkNumber = false;
    let checkCharacter = false;

    for (let i = 0, len = data.length; i < len; i++) {
        let code = data.charCodeAt(i);

        if (code > 47 && code < 58) checkNumber = true;

        if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
            checkCharacter = true;
        }
    }

    if (checkNumber && checkCharacter) return true;
    else return false;
};
