//Reverse the keys and values of object and return that object

const invert = (obj) =>
{
    return Object.entries(obj).reduce((acc,entry)=>
    {
        acc[entry[1]] = entry[0];
        return acc;
    }, {})
}