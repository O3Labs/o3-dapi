//utils section
function hex2str(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.hex2str(document.getElementById(inputElement).value)
}

function str2hex(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.str2hex(document.getElementById(inputElement).value)
}


function hex2int(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.hex2int(document.getElementById(inputElement).value)
}

function int2hex(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.int2hex(document.getElementById(inputElement).value)
}

function reverseHex(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.reverseHex(document.getElementById(inputElement).value)
}

function address2scripthash(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.address2scriptHash(document.getElementById(inputElement).value)
}

function scripthash2address(inputElement, resultElem){
	document.getElementById(resultElem).innerHTML =  neoDapi.utils.scriptHash2address(document.getElementById(inputElement).value)
}
