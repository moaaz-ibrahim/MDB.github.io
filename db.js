// what is this : 
// Database build using concepts of file system in node js 
// and the concepts of json files 
const fs =require('fs');
const file = require('fs-extra/lib/ensure/file');
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;
// file length -2
var rowId = 0 ;
var rows =[];
var passArr =[];
const dbDirectory = './database.json';
function insert(username , password , mail){
var file = readFile('./database.json' , 'utf-8');


if (file.length == 63)
{
 writeFile(dbDirectory ,file.replace("," , " "))
}
else {
    rowId = file[file.length-2];
    if (isNaN(file[file.length-3]))
    ;
    else {
        rowId = file[file.length-3] + file[file.length-2]
       }
   
       rowId++;
}
 rowId = ' r:'+rowId;
// console.log(rowId)
// if (file == '')
// writeFile(dbDirectory , '[]')


var write = `
{
    "username": "${username}",
    "password":"${password}",
    "email":"${mail}"
},`;
// console.log(file[file.length-1])
if (file[(file.length)-1] == "]")
{
    // console.log(true);
file = file.replace(file[(file.length)-1] , " ");
writeFile(dbDirectory , file);
write =`,{
    "username": "${username}",
    "password":"${password}",
    "email":"${mail}"
}
]` 
// if (file.length == 63)
// {
//  writeFile(dbDirectory ,file.replace(file[2] , " "))
// }

}
else console.log (false)

    writeFile(dbDirectory , write, {flag:'a'})
//     if (file.length == 63)
// {
//  writeFile(dbDirectory ,file.replace(file[2] , " "))
// }

}

function clearDb (){
    writeFile(dbDirectory , '');
}
function findDb (user,pass){
    var file = readFile(dbDirectory , 'utf-8');
   file = JSON.parse(file);
   for (i=0;i<file.length;i++){
       if (file[i].username == user && file[i].password == pass)
       return true;
   }
}
function regAuth(username , password , mail){
    var file = readFile(dbDirectory , 'utf-8');
    if (file == ''){

        writeFile(dbDirectory , '[]')
        insert(username , password,mail)
    }
    file = JSON.parse(file);
    for (i=0;i<file.length;i++){
        if (file[i].username == username ||  file[i].email == mail)
        return true
        
    }

}


function register (username , password , mail){
    
    if (regAuth(username , password , mail) == true)
    {
        console.log('ther is a user with the same username or email ');
        return false
    }
    else {
        insert(username , password , mail);
        
        return true;

    }

}
function login (username , password){
    if (findDb(username ,password)){
        // console.log(i)
        console.log('Succeccfully Logged in ');
        return 1 ;
    }
    else {console.log('Wrong inputs')
return 0 ;
};
}
function firstSearch (){

    var file = readFile(dbDirectory , 'utf-8');
    var checker  ;
    checker = file.slice(0,file.match('\n').index)
    file = file.replace(checker , '');
    console.log(file)
    console.log(checker)
}
function search(){
    var file = readFile(dbDirectory , 'utf-8');
    var checker  ;
    checker = file.slice(file.match('\n'),file.match('\n').index)
    file = file.replace(checker , '');
    console.log(file)
    console.log(checker)
}
function an(){
    var file = readFile(dbDirectory , 'utf-8');
//    file = JSON.parse(file)
    console.log(file[2])
}



module.exports={
    add: insert,
    clear: clearDb,
    Search: search,
    firstSearch: firstSearch,
    login:login,
    register:register
}



