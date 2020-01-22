//function returns array of elements that exist in both array arguments

const intersect = (arr1, arr2) =>
{
    const results = [];
    arr1.forEach(elem =>
    {
        if(arr2.includes(elem))
        {
            results.push(elem);
        }
    })

    /*
    OR....
    return arr1.filter(elem =>
    {
        arr2.includes(elem);
    })
    */
    return results;
}