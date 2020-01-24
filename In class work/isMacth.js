//write the isMatch function
//isMatch takes two objects
//if the first object has all the properties of the second object return true
//other wise return false
//isMatch({ foo: true, bar: 1}, { foo: true });//true
//isMatch({ foo: 42, bazz: 19}, {});//true
//isMatch({ foo: 42, bazz: 11}, { foo: 43 });//false
//isMatch({ }, { foo: 11 });//false

const isMatch = (obj1, obj2) =>
{
    const entries2 = Object.entries(obj2);
    /* or...
    
    entries.forEach(entry)=>
    {
        const [key,value] = entries2[i];
        let match = true;
        if(obj1[key]!=value)
        {
            return false;
            break;
        }
        return match;
    }
    */
    for(let i=0; i<entries2.length; i++)
    {
        const [key,value] = entries2[i];
        if(obj1[key]!=value)
        {
            return false;
        }
    }
    return true;
}