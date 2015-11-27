/**
* Represents a committee session
* @param name The name of the committee
* @param topics A list of topic names as strings
* @param countries Optional list of country names as strings
*/
function Debate(name, topics, countries){
  this.name = name;
  this.topics = topics;
  this.countries = countries || [];

  if (this.name === "" || this.topics.length === 0)
    throw new Error("Committee was not initialised correctly");  
}

/**
* Represents a speaker's list
* @param speakingtime Each speaker's allotted time in seconds as an int
* @param instance Indicates whether it is a primary or secondary speaker's 
         list as an int (0 = primary, 1 = secondary)
*/
function SpeakersList(speakingtime, instance){
  this.speakingtime = speakingtime;
  this.instance = instance;
  this.speakers = [];
  if (speakingtime <= 0)
    throw new Error("Invalid speaking time: "+speakingtime);
  if (instance < 0 || instance > 1)
    throw new Error("Invalid speaking time: "+instance);
}
SpeakersList.prototype = Debate;

/** 
* Adds someone to a speaker's list
* @param name The name of the member
*/
SpeakersList.prototype.addSpeaker = function (name){
  if (name === "")
    throw new Error("Invalid name");
  this.speakers.push(name);
}

/**
* Represents a moderated caucus
* @param length The length of the moderated caucus in minutes as an int
* @param speakingtime Each speaker's allotted time in seconds as an int
* @param topic Optional topic as a string
*/
function ModeratedCaucus(length, speakingtime, topic){
  this.length = length;
  this.speakingtime = speakingtime;
  this.topic = topic || "";

  if (this.length === 0 || this.speakingtime === 0)
    throw new Error("Invalid caucus length and/or speaking time");
  if (length % speakingtime !== 0)
    throw new Error("The time is not evenly divisible. Length: "+length+
      "Speaking time: "+speakingtime);

}
ModeratedCaucus.prototype = Debate;

/**
* Extends a moderate caucus
* @param ext The length of the extension in minutes as an int
*/
ModeratedCaucus.prototype.extend = function (ext){
  this.length += ext;
  if (ext <= 0)
    throw new Error("Invalid extension time");
}

/**
* Represents an unmoderated caucus
* @param length The length of the unmod in minutes as an int
*/
function UnmoderatedCaucus(length){
  this.length = length;
  if (this.length === 0)
    throw new Error("Invalid caucus length");
}
UnmoderatedCaucus.prototype = Debate;

/**
* Represents an issue to be voted on
* @param infavor All those in favor
* @param opposed All those opposed
* @param abstaining All those abstaining
* @param type The type of majority vote (0 = simple majority, 1 = 2/3 majority)
*/
function VotingIssue(infavor, opposed, abstaining, type){
  this.infavor = infavor || 0;
  this.opposed = opposed || 0;
  this.abstaining = abstaining || 0;
  this.type = type;
  this.passed = false;
  
  if (this.type !== 0 || this.type !== 1)
    throw new Error("Invalid type of majority");
  
  var total = this.infavor + this.opposed + this.abstaining;
  if (this.type === 0)
    if (total / 2 < this.infavor)
      this.passed = true;
  else
    if (total * 2 / 3 < this.infavor)
      this.passed = true;
}

/** 
* Changes the amount of those in favor
* @param infavor New amount of those in favor
*/
function setInFavor(infavor){
  this.infavor = infavor;
}

/**
* Changes the amount of those opposed
* @param opposed New amount of those opposed
*/
function setOpposed(opposed){
  this.opposed = opposed;
}

/** 
* Changes the amount of those abstaining
* @param abstaining New amount of those abstaining
*/
function setAbstaining(abstaining){
  this.abstaining = abstaining;
}

var debate0 = new Debate("WHO",["Malaria"],["UK","USA","France","Russia"]);
var mod0 = new SpeakersList(1,0);
debug("On the list: "+mod0.speakers);
mod0.addSpeaker("UK");
mod0.addSpeaker("USA");
debug("On the list: "+mod0.speakers);
