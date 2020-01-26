const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];

  const spacer = (text) => 
  {
    if(!text)
    {
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
  }
  
  const findEmployeeByName = (name, emps) =>
  {
      return emps.find(function(elem)
      {
          if(elem.name === name)
          {
              return elem;
          }
      })
  }
  //[pk] ok this workds but the callback you pass to "find" should return a boolean!
  //[pk] yours luckily works because objects (like "elem") are truthy
  //[pk] but just passing the boolean would be much less verbose -- see solution!
  
  const findManagerFor = (emp, emps) =>
  {
      return emps.find(function(elem)
      {
          if(emp.managerId===elem.id)
          {
              return elem;
          }
      })
  }
  //[pk] same
  
  const findCoworkersFor = (emp, emps) =>
  {
      const foundCos = emps.filter(function(elem)
      {
          if(elem.managerId === emp.managerId && elem.name != emp.name)
          {
              return elem;
          }
      })
      return foundCos;
  }
  //[pk] good! same issue as above tho
  
  
  const findManagementChainForEmployee = (emp, emps) =>
  {
    let curEmp = emp;
    let manChain = [];
    while (curEmp.managerId)
    {
      curEmp = findManagerFor(curEmp, emps);
      manChain.push(curEmp);
    }
    return manChain.reverse();
  }
  
  //[pk] noice!
  
  const generateManagementTree = (emps) =>
  {
    let topMan = emps.find(elem => 
    {
      return !elem.managerId;
    })
    for(let i=0; i<emps.length; i++)
    {
      emps[i].reports = [];
      for(let j=i+1; j<emps.length; j++)
      {
        if(emps[j].managerId===emps[i].id)
        {
          emps[i].reports = [...emps[i].reports,emps[j]];
        }
      }
    }
    return topMan;
  }
  //[pk] this does work although it depends on mutating the input. see the solution for a recursive, non-mutating approach
  
  const displayManagementTree = (tree) =>
{
  console.log(tree.name);
  for(let i=0;i<tree.reports.length;i++)
  {
    console.log("-".repeat(i));
    displayManagementTree(tree.reports[i]);  
  } 
}
  
  //[pk] hmm not quite the expected output! see solution.
  
spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
