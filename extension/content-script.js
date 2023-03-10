let input = document.getElementsByTagName('input')
if(input){
    console.log(input)
    for (el of input){
        console.log(el)
        let type = el.getAttribute("type");
        let id = el.getAttribute("id")
        if (type.toLowerCase().includes("password") || id.toLowerCase().includes("password")){
            console.log("is password")
            el.value = "ihateni"
        }
        console.log("Input form")
    }
}else{
    console.log("no inputs")
}