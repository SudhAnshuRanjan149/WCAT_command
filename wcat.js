let fs  = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let optionArr = [];
let filesArr = [];

for(let i = 0; i< inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

//let  filesArr = inputArr;
for(let i = 0;i < filesArr.length; i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans == false){
        console.log("File does not exist");
        return;
    }
}

let content = "";
for(let i = 0;i<filesArr.length;i++){
    
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
    
}

let contentArr = content.split("\r\n");
let NBcheck = false;
for(let i = 0;i<optionArr.length;i++){
    if(optionArr[i] == "-s"){
        SPresent();
    }else if(optionArr[i] == "-n" && NBcheck == false){
        NPresent();
        NBcheck = true;
    }else if(optionArr[i] == "-b" && NBcheck == false){
        BPresent();
        NBcheck = true;
    }

}

// -s check
///let isSPresent = optionArr.includes("-s");
function SPresent(){
    for(let i =1;i<contentArr.length;i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        } 
    }

    let tempArr = [];
    for(let i = 0; i<contentArr.length;i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}
//console.log(contentArr.join("\n"));

//let isNPresent = optionArr.includes("-n");
function NPresent(){
    let tempArr = [];
    for(let i = 0; i<contentArr.length;i++){
        
            tempArr.push((i+1)+"."+contentArr[i]);
        
    }
    contentArr = tempArr;
}

//let isBPresent = optionArr.includes("-b");
function BPresent(){
    let tempArr = [];
    let j =1;
    for(let i = 0; i<contentArr.length;i++){
        if(contentArr[i] != ""){
            tempArr.push((j)+"."+contentArr[i]);
            j++;
        }else{
            tempArr.push(contentArr[i]);
        }
        
    }
    contentArr = tempArr;
}

console.log(contentArr.join("\n"));







