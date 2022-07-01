export const ternaryCheck = (expression, ifValue, elseValue) => {
    return expression ? ifValue : elseValue;
}

export const undefinedCheck = (property, defaultValue) => {
    return property || defaultValue;
}

export const uneCheck = (property) => {
    if(property === undefined || property === null || property === "" ){
      return true;
    }else{
        return false;
    }
}