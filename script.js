const wordlist ={

}


let selectedwords =''
let displaywords =''
let wrongguess =''
let guessedletters=''

function startgame(level){
selectedwords=getrandomword(level)
}
function getrandomword(level){
let filteredwords=wordlist.filter(word=>{
    if(level==='easy') return word.length<=4
})
 return filteredwords{Math.floor(Math.random.filteredwords.length)}
}
selectedwords=getrandomword(level)

