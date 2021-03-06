﻿let prepositionList: any = ['to', 'into', 'off', 'on', 'as', 'under', 'in', 'for'];
var commonIrregularPastTense: any = ['became', 'began', 'broke', 'brought', 'built', 'bought', 'caught', 'chose',
    'came', 'cost', 'cut', 'did', 'drew', 'drank', 'drove', 'ate', 'fell', 'fed', 'felt', 'fought', 'found', 'flew',
    'forgot', 'forgave', 'got', 'gave', 'went', 'grew', 'had', 'heard', 'hid', 'hit', 'held', 'knew', 'learned', 'left',
    'lent', 'lost', 'made', 'meant', 'met', 'paid', 'put', 'read', 'rode', 'rose', 'ran', 'said', 'saw', 'sold', 'sent',
    'set', 'showed', 'sang', 'sat', 'slept', 'spoke', 'spent', 'stood', 'stole', 'swam', 'took', 'taught', 'told', 'thought',
    'threw', 'understood', 'wore', 'won', 'wrote'];
var commonIrregularPastPerfect: any = ['become', 'begun', 'broken', 'brought', 'built', 'bought', 'caught', 'chosen', 'come',
    'cost', 'cut', 'done', 'drawn', 'drunk', 'driven', 'eaten', 'fallen', 'fed', 'felt', 'fought', 'found', 'flown', 'forgotten',
    'forgiven', 'got', 'given', 'gone', 'grown', 'had', 'heard', 'hidden', 'hit', 'held', 'known', 'learnt/learned',
    'left', 'lent', 'lost', 'made', 'meant', 'met', 'paid', 'put', 'read', 'ridden', 'risen', 'run', 'said', 'seen', 'sold', 'sent', 'set',
    'shown', 'sung', 'sat', 'slept', 'spoken', 'spent', 'stood', 'stolen', 'swum', 'taken', 'taught', 'told', 'thought', 'thrown', 'understood',
    'worn', 'won', 'written'];
let splitString: any;
var sample: any;
var result: any;

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    userOutput: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toTimeString();       
        }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toTimeString(), 500);
        sample = sample.append(this.main('Joe Kogawa wrote the novel Obasan.'));
    }

    stop() {
        clearTimeout(this.timerToken);
    }

    /*convert(any : any): any{
        var userInput = document.getElementById('userInput');
        console.log("this should be user input" + userInput);
        result = document.getElementById('result');
        console.log(result);
        //result = result.append("The button was clicked!");
        //result = result.append(this.main(userInput));
    }*/

    main(inputString: string): string {
        let sentences = inputString.split(".");

        if (sentences.length > 1) {
            sentences.splice(sentences.length - 1, 1);
        }
        else return this.sentenceConverter(inputString) + ".";

        let convertedArray: string[] = [];

        for (let i = 0; i < sentences.length; i++) {
            let trimmedSentence = sentences[i].trim();
            convertedArray.push(this.sentenceConverter(trimmedSentence) + ".");
        }
        return convertedArray.join(" ");
    }

    sentenceConverter(inputSentence: any): string {
        splitString = inputSentence.split(" ");

        // deal with active voice that has a clause
        if (inputSentence.includes(",")) {
            let splitCommaString = inputSentence.split(",");
            let newSplitCommaString = splitCommaString[1].trim();
            splitString = newSplitCommaString.split(" ");

            if (splitString[0] == "We" || splitString[0] == "I" || splitString[0] == "we") {
                try {
                    let convertedSecond = this.partialSentenceConverter(newSplitCommaString);
                    if (convertedSecond.charAt(0) !== undefined) {
                        let newConvertedSecond = convertedSecond.charAt(0).toLowerCase() + convertedSecond.slice(1);
                        return splitCommaString[0] + ', ' + newConvertedSecond;
                    }
                    else return splitCommaString[0] + ', ' + convertedSecond;
                }
                catch (error) {
                    return "Sorry, something unexpected just happened"
                }
            }
        }

        else if (splitString[0] == "We" || splitString[0] == "I" || splitString[0] == "we") {
            // deal with regular verbs and irregular verbs.
            return this.partialSentenceConverter(inputSentence);
        }

        // simple sentence
        else if (!inputSentence.includes(',')) {
            let simpleSplitSentence = inputSentence.split(' ');

            if (simpleSplitSentence.includes('was') || simpleSplitSentence.includes('is')) {
                return inputSentence;
            }

            let subject = '';
            let predicate = '';
            let object = '';

            let count = 0;
            for (let i = 0; i < simpleSplitSentence.length; i++) {
                if (commonIrregularPastTense.includes(simpleSplitSentence[i]) || (simpleSplitSentence[i].endsWith('ed'))) {
                    count++;
                    let indexOfPredicate = commonIrregularPastTense.indexOf(simpleSplitSentence[i]);

                    if (commonIrregularPastTense.includes(simpleSplitSentence[i])) {
                        predicate = commonIrregularPastPerfect[indexOfPredicate];
                    }
                    else predicate = simpleSplitSentence[i].toString();

                    let subjectArray = simpleSplitSentence.slice(0, i);
                    let objectArray = simpleSplitSentence.slice(i + 1, simpleSplitSentence.length);
                    subject = objectArray.join(' ').toString();
                    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
                    object = subjectArray.join(' ').toString();
                    return subject + " was " + predicate + " by " + object;
                }
            }

            if (count == 0) {
                return "Sorry, we are not able to process your request"
            }
        }

        //"Joy Kogawa wrote the novel Obasan.";
        else return "Sorry, we can't process your request: " + inputSentence;
    }

    // deal with a sub sentence that contains an and
    andHandler(inputAndString: string): string {
        let splitAnd = inputAndString.split('and');
        let subject1 = '';
        let subject2 = '';
        let predicate1 = '';
        let predicate2 = '';

        console.log(splitAnd[0].trim());
        let firstHalf:any = splitAnd[0].trim();

        for (let i = 0; i < firstHalf.length; i++) {
            if (firstHalf[i].endsWith('ed') || commonIrregularPastTense.includes(firstHalf[i])) {
                let posOfPredicate = i;
                return inputAndString;

            }
        }

    }

    partialSentenceConverter(inputPartialSentence: any): string {
        if (inputPartialSentence.includes("and")) {
            this.andHandler(inputPartialSentence);
        }

        /*
         if (inputPartialSentence.includes("and")) {
         var subject = "";
         var predicate1 = "";
         var predicate2 = "";
         var object = "";
         var beforeAnd = "";
         var afterAnd = "";

         let convertedSubject = "was";

         for (var i = 0; i < splitString.indexOf("and"); i++) {
         if (splitString[i].endsWith("ed") || commonIrregularPastTense.includes(splitString[i])) {
         predicate1 = splitString[i].toString();
         var posOfpredicate1 = i;

         splitString.splice(splitString.indexOf("and") , 0, convertedSubject, );
         splitString.splice(splitString.indexOf("and") , 0, predicate1 );
         splitString.splice(1,2);
         }
         }

         for (var j = splitString.indexOf("and"); j < splitString.length; j++) {
         if (splitString[j].endsWith("ed") || commonIrregularPastTense.includes(splitString[j])) {
         predicate2 = splitString[i].toString();
         var posOfPredicate2 = j;
         if (prepositionList.includes(splitString[i])) {
         let tempIndex = i;
         splitString.splice(posOfPredicate2, 0, predicate2);
         splitString.splice(posOfPredicate2, 0, convertedSubject);
         splitString.splice(posOfPredicate2, 1);
         }
         }
         }

         let joined = splitString.join(" ");
         let converted = joined.toString();
         if (converted.charAt(0) !== undefined){
         return converted.charAt(0).toUpperCase() + converted.slice(1);
         }
         else return converted;

         }
         */

        if (splitString[1].endsWith("ed") || commonIrregularPastTense.includes(splitString[1])) {
            let convertedVerb = splitString[1];

            if (commonIrregularPastTense.includes(splitString[1])) {
                convertedVerb = commonIrregularPastPerfect[(commonIrregularPastTense.indexOf(splitString[1]))];
            }

            for (let i = 0; i < splitString.length; i++) {
                if (prepositionList.includes(splitString[i])) {
                    let tempIndex = i;
                    splitString.splice(tempIndex, 0, convertedVerb);
                    if (splitString[tempIndex - 1].endsWith("s")) {
                        splitString.splice(tempIndex, 0, "were");
                    }
                    else splitString.splice(tempIndex, 0, "was");
                    splitString.splice(0, 2);

                    let joined = splitString.join(" ");
                    let converted = joined.toString();
                    if (converted.charAt(0) !== undefined) {
                        return converted.charAt(0).toUpperCase() + converted.slice(1);
                    }
                    else return converted;
                }
            }
        }
        else return inputPartialSentence;
    }
}


window.onload = () => {
    var el = document.getElementById('content');
    sample = document.getElementById('sample');
    var greeter = new Greeter(el);
    greeter.start();
};

function validateRequest() {
    var luserInput = (<HTMLInputElement>document.getElementById('userInput'));
    var processedInput = luserInput.value;
    console.log("this should be user input: " + processedInput);
    var newProcess = new Greeter(luserInput);
    var results = newProcess.main(processedInput.toString());
    console.log("the response: " + results);

    var textAreaOut = document.getElementById('Output');
    textAreaOut.innerHTML = results;
}

//    background-image: url('https://c1.staticflickr.com/4/3831/11969602484_f796ae0d3b_k.jpg');