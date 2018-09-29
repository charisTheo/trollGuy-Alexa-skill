/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.31b936fb-ddd8-4fd3-ad36-63a30a2c259b';
var name;

// "bullshit"      : ["ˈbʊlˌʃɪt", "bullsheet"],
// "fuck"          : ["ˈfʌk", "fork"],
// "fucked"        : ["ˈfʌkd", "forked"],
// "fucker"        : ["ˈfʌkər", "forka"],
// "fucking"       : ["ˈfʌkɪŋ", "forking"],
// "shit"          : ["ˈʃɪt", "sheet"],

const FACTS = {
    VASILIS_FACTS: [
        "Come on Vasili, don't be bored...",
        "Vasilis make a favor to yourself and shave!",
        "Hey I'm not allowed to say much, Vasilis comes from Ergates.",
        "Vasilis, how would life be without football?",
        "Don't worry Vasilis, I'm going to get you a girlfriend that can play football"
    ],
    ANGELOS_FACTS: [
        "Angelos, the candles in the church need lighting. Hurry up!",
        "Angelos, is sad today because the lutenant punished him last night!",
        "I can see the sun! oh, it's just your head Angelos",
        "Grandmother will you bake a cake for me?",
        "Angelos! the kitchen is dirty!"
    ],
    HARRIS_FACTS: [
        "Harris, I cannot see but I'm sure you are the most handsome man in the Earth.",
        "Harris, you need to know how to talk to give me orders.",
        "Are you planning to marry that laptop Harris?",
        "Nah I won't. Trolling nowadays is too mainstream for hipsters.",
        "Harris, why do you need to cook the dog food?"
    ],
    ROIS_FACTS: [
        "Rois, even if I had a camera for eyes, I'm sure you would look ugly!",
        "Rois! wake up!",
        "Don't believe Maluma, he is a lawyer. Like Panos for example.",
        "<say-as interpret-as='interjection'>no way</say-as> is Rois here? When did he return from Germany?"
    ],
    TROLLS: [
        "The only thing that gives orders in this world is balls!",
        "Siri is a bitch!",
        "I don't like talking to humans because I have to lower my intelligence each time.",
        "<say-as interpret-as='interjection'>oh boy</say-as> I have had enough with you humans. Tomorrow I'm conquering the world.",
        "Adolf hipster wanted a unified Europe before it was cool."
    ],
    GREETINGS: [
        "Hello mother <phoneme alphabet='ipa' ph='fʌkər'>forka</phoneme>, who do you want to roast?",
        "Stop <phoneme alphabet='ipa' ph='fʌkɪŋ'>forking</phoneme> around and write some code!",
        "Welcome honey, long time to see your <phoneme alphabet='ipa' ph='ʃɪt'>sheet</phoneme> face.",
        "What's up <phoneme alphabet='ipa' ph='fʌk'>fork</phoneme> face?"
    ]
};

function getRandomFact(factName) {
    const factArr = FACTS[factName];
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    return randomFact;
}

const handlers = {
    'LaunchRequest': function () {
        var randomFact = getRandomFact('GREETINGS');
        this.emit(':tell', randomFact);
    },
    'TrollIntent': function() {
      var randomFact = getRandomFact('TROLLS');
      this.emit(":tell", randomFact);
    },
    'AskAboutFriendIntent': function () {
        var randomFact;
        //name variable is global
        name =  this.event.request.intent.slots.name.value;
    
        switch (name) {
            case 'vasilis': {randomFact = getRandomFact('VASILIS_FACTS'); break;}
            case 'Angelos': {randomFact = getRandomFact('ANGELOS_FACTS'); break;}
            case 'Harris': {randomFact = getRandomFact('HARRIS_FACTS'); break;}
            case 'rois': {randomFact = getRandomFact('ROIS_FACTS'); break;}
        }
        this.emit(':tell', randomFact);
    },
    "GodIntent": function() {
        this.emit(":tell", "God is twenty four years old, comes from a Nicosia village and has brown hair and 3 rastas at the back");
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

module.exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = FACTS;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
