const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./util/generateHtml.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const employees = [];

let isTeamComplete=false;

const validateInput=(userInput)=>{
    if(userInput===""){
        return "please type your answer before proceeding";
    } else {
        return true;
    }
};

const init = async()=>{
    await createManager();
    while(!isTeamComplete){
        const employeeTypeQuestion = [
            {
                type:"list",
                message:"Please select the employee type you wish to add:",
                name:"employeeType",
                choices:[
                    {name:"Engineer",value:"engineer"},
                    {name:"Intern",value:"intern"},
                    {name:"Finish",value:"finish"},
                ]
            }
        ];

        const {employeeType} = await inquirer.prompt(employeeTypeQuestion);
        if(employeeType==="finish"){
            isTeamComplete=true;
            await finishTeam()
        }else {
            if(employeeType==="engineer"){
                await createEngineer();
            }
            if (employeeType==="intern"){
                await createIntern();
            }
        }
    }

    const HTML = generateHTML(employees);
    fs.writeFileSync("team-profile.html", HTML, (err)=>{
        if (err){
            console.log(err);
        }else {
            console.log("HTML file created");
        }
    });
};

const createManager = async()=>{
    const managerQuestions = [
        {
            type:"input",
            message:"Enter manager name",
            name:"name",
    
        },
        {
            type:"input",
            message:"Enter employee ID",
            name:"id",
    
        },
        {
            type:"input",
            message:"Enter your office number",
            name:"officeNumber",
    
        },
        {
            type:"input",
            message:"Enter your work email",
            name:"email",
    
        },
    ]

    const managerAnswer=await inquirer.prompt(managerQuestions);

    const manager = new Manager(managerAnswer);

    employees.push(manager);
    // addMember();
};

// const addMember = ()=>{
//     inquirer.prompt([
//         {
//         type:"list",
//         name:"Questions",
//         choices: ["Add an engineer", "Add an intern", "Finish building your team"]
//         }
//     ]).then((ans)=>{
//         switch (ans.question) {
//             case "Add an engineer":
//                 console.log("Add your engineer!");
//                 createEngineer();
//                 break;
//             case "Add an intern":
//                 console.log("Add your intern!");
//                 createIntern();
//                 break;
//             case "Finish building your team":
//                 console.log("Finished team!");
//                 finishTeam();
//                 break;
//         }
//     })
// }

const createEngineer = async()=>{
    const engineerQuestions = [
        {
            type:"input",
            message:"Please enter engineer name:",
            name:"name",
            
        },
        {
            type:"input",
            message:"Please enter engineer ID:",
            name:"id",
            
        },
        {
            type:"input",
            message:"Please enter engineer email:",
            name:"email",
            
        },
        {
            type:"input",
            message:"Please enter engineer github profile:",
            name:"github",
            
        },
    ];

    const engineerAnswers = await inquirer.prompt(engineerQuestions);
    const engineer = new Engineer(engineerAnswers);
    employees.push(engineer);
};

const createIntern = async()=>{
    const internQuestions = [
        {
            type:"input",
            message:"Please enter intern name:",
            name:"name",
            
        },
        {
            type:"input",
            message:"Please enter intern ID:",
            name:"id",
            
        },
        {
            type:"input",
            message:"Please enter intern email:",
            name:"email",
            
        },
        {
            type:"input",
            message:"Please enter intern school name:",
            name:"school",
            
        },
    ];

    const internAnswers = await inquirer.prompt(internQuestions);
    const intern = new Intern(internAnswers);
    employees.push(intern);
};

const finishTeam = ()=>{
    const htmlContent = generateHTML(employees);
    fs.writeFile("./output/index.html", htmlContent, (err)=> err?console.error(err):console.log("Your team has been generated!"))
};

init();