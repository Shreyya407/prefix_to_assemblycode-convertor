
document.getElementById("convertBtn").addEventListener("click", function() {
    const prefixExpression = document.getElementById("prefixExpression").value.trim();
    
    if (prefixExpression === "") {
        alert("Please enter a prefix expression.");
        return;
    }
    
    const assemblyCode = convertPrefixToAssembly(prefixExpression);
    document.getElementById("assemblyCode").innerText = assemblyCode;
});

document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("prefixExpression").value = "";
    document.getElementById("assemblyCode").innerText = "";
});


function convertPrefixToAssembly(prefix) {
    const stack = [];
    const operators = ["+", "-", "*", "/"];
    const assemblyInstructions = [];
    let tempVarCount = 0;

   
    for (let i = prefix.length - 1; i >= 0; i--) {
        const char = prefix[i];

        
        if (!operators.includes(char)) {
            stack.push(char);
        } else {
           
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            const tempVar = `T${tempVarCount++}`;

           
            switch (char) {
                case '+':
                    assemblyInstructions.push(`MOV R1, ${operand1}        ; Load ${operand1} into R1`);
                    assemblyInstructions.push(`ADD R1, ${operand2}        ; Add ${operand2} to R1`);
                    assemblyInstructions.push(`MOV ${tempVar}, R1         ; Store result in ${tempVar}`);
                    break;
                case '-':
                    assemblyInstructions.push(`MOV R1, ${operand1}        ; Load ${operand1} into R1`);
                    assemblyInstructions.push(`SUB R1, ${operand2}        ; Subtract ${operand2} from R1`);
                    assemblyInstructions.push(`MOV ${tempVar}, R1         ; Store result in ${tempVar}`);
                    break;
                case '*':
                    assemblyInstructions.push(`MOV R1, ${operand1}        ; Load ${operand1} into R1`);
                    assemblyInstructions.push(`MUL R1, ${operand2}        ; Multiply R1 by ${operand2}`);
                    assemblyInstructions.push(`MOV ${tempVar}, R1         ; Store result in ${tempVar}`);
                    break;
                case '/':
                    assemblyInstructions.push(`MOV R1, ${operand1}        ; Load ${operand1} into R1`);
                    assemblyInstructions.push(`DIV R1, ${operand2}        ; Divide R1 by ${operand2}`);
                    assemblyInstructions.push(`MOV ${tempVar}, R1         ; Store result in ${tempVar}`);
                    break;
            }

            
            stack.push(tempVar);
        }
    }

   
    return assemblyInstructions.join('\n');
}
