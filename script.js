   function crackPassword() {
            const targetPassword = document.getElementById('target-password').value.trim();
            const passwordFile = document.getElementById('password-file').files[0];
            const resultDiv = document.getElementById('result');

            if (!targetPassword || !passwordFile) {
                alert('Please provide both a password and a password list.');
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {
                const passwords = event.target.result.split('\n').map(p => p.trim());

                let foundIndex = passwords.indexOf(targetPassword);
                resultDiv.style.display = 'block';

                if (foundIndex !== -1) {
                    resultDiv.innerHTML = `<strong>Password Found:</strong> "${targetPassword}" at line ${foundIndex + 1}`;
                } else {
                    resultDiv.innerHTML = '<strong>Password not found in the list.</strong>';
                }
            };

            reader.onerror = function () {
                alert('Failed to read the file.');
            };

            reader.readAsText(passwordFile);
        }

        async function bruteForceCrack(inputPassword) {
            let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let maxLength = 6; // Prevent long execution time

            async function generateCombinations() {
                for (let length = 1; length <= maxLength; length++) {
                    let possibilities = Math.pow(characters.length, length);
                    for (let i = 0; i < possibilities; i++) {
                        let attempt = "";
                        let num = i;
                        for (let j = 0; j < length; j++) {
                            attempt = characters[num % characters.length] + attempt;
                            num = Math.floor(num / characters.length);
                        }
                        if (attempt === inputPassword) {
                            displayResult(`Password cracked: ${attempt}`);
                            return;
                        }
                        await new Promise(resolve => setTimeout(resolve, 1));
                    }
                }
                displayResult("Password not found with brute-force.");
            }

            displayResult("Started brute-force...");
            await generateCombinations();
        }

        function startBruteForce() {
            let inputPassword = document.getElementById("target-password").value.trim();
            if (inputPassword) {
                bruteForceCrack(inputPassword);
            } else {
                displayResult("Please enter a password to crack.");
            }
        }

        function displayResult(message) {
            let resultElement = document.getElementById("result");
            resultElement.textContent = message;
            resultElement.style.display = 'block';
        }
      
        // Encoding map - Every character gets a unique 3-character sequence
        const encodingMap = {
            "a": "X1@", "b": "Y2#", "c": "Z3$", "d": "A4%", "e": "B5^", "f": "C6&",
            "g": "D7*", "h": "E8(", "i": "F9)", "j": "G0-", "k": "H!_", "l": "I@+",
            "m": "J#=", "n": "K$?", "o": "L%^", "p": "M&*", "q": "N()",
            "r": "O_=", "s": "P+-", "t": "Q?><", "u": "R~`", "v": "S{}",
            "w": "T[]", "x": "U|/", "y": "V;:", "z": "W,.", "A": "XA1", "B": "YB2",
            "C": "ZC3", "D": "AD4", "E": "BE5", "F": "CF6", "G": "DG7", "H": "EH8",
            "I": "FI9", "J": "GJ0", "K": "HK!", "L": "IL@", "M": "JM#", "N": "KN$",
            "O": "LO%", "P": "MP&", "Q": "NQ*", "R": "OR(", "S": "PS)", "T": "QT-",
            "U": "RU_", "V": "SV+", "W": "TW=", "X": "UX?", "Y": "VY^", "Z": "WZ&",
            "0": "0A!", "1": "1B@", "2": "2C#", "3": "3D$", "4": "4E%", "5": "5F^",
            "6": "6G&", "7": "7H*", "8": "8I(", "9": "9J)", "!": "!K_", "@": "@L-",
            "#": "#M+", "$": "$N=", "%": "%O?", "^": "^P,", "&": "&Q.", "*": "*R:",
            "(": "(S;", ")": ")T{", "-": "-U}", "_": "_V[", "=": "=W]", "+": "+X~"
        };

        // Generate decoding map by reversing the encodingMap
        const decodingMap = {};
        for (let key in encodingMap) {
            decodingMap[encodingMap[key]] = key;
        }

        function encodePassword() {
            let password = document.getElementById("password").value;
            if (!password) {
                alert("Please enter a password!");
                return;
            }

            let encodedPassword = password
                .split("")
                .map(char => encodingMap[char] || char)
                .join("");

            document.getElementById("encodedOutput").innerText = "Encoded Password: " + encodedPassword;
        }

        function decodePassword() {
            let encodedText = document.getElementById("encodedText").value;
            if (!encodedText) {
                alert("Please enter an encoded text!");
                return;
            }

            let decodedPassword = "";
            for (let i = 0; i < encodedText.length; i += 3) {
                let chunk = encodedText.substring(i, i + 3);
                if (decodingMap[chunk]) {
                    decodedPassword += decodingMap[chunk];
                } else {
                    alert("Invalid encoded text! Cannot decode.");
                    return;
                }
            }

            document.getElementById("decodedOutput").innerText = "Decoded Password: " + decodedPassword;
        }
   

    