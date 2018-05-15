// Universal variables
var raceChoice;
var bestVote = [];
var abortionAns;
var ssmAns;
var immigrationAns;
var taxesAns;
var gunsAns;
var ecoAns;
var weedAns;

// Styles results boxes
function boxMark(a) {
    if (a == 1) {
        return "&#10003";
    }
    else if (a == -1) {
        return "X";
    }
    else if (a == 0) {
        return "?";
    }
    else {
        return
    }
}
function picColor (party) {
    if (party == "Democrat") {
        return "style='background-color:blue;'";
    }
    else if (party == "Republican") {
        return "style='background-color:red;'";
    }
    else {
        return "";
    }
}

// Gets user's answers and fills in the first column of the results page
function Answers() {
    abortionAns = $("input[name=abortion]:checked").val();
    ssmAns = $("input[name=ssm]:checked").val();
    immigrationAns = $("input[name=immigration]:checked").val();
    taxesAns = $("input[name=taxes]:checked").val();
    gunsAns = $("input[name=guns]:checked").val();
    ecoAns = $("input[name=eco]:checked").val();
    weedAns = $("input[name=weed]:checked").val();

    $("#results1").html(boxMark(abortionAns));
    $("#results2").html(boxMark(ssmAns));
    $("#results3").html(boxMark(immigrationAns));
    $("#results4").html(boxMark(taxesAns));
    $("#results5").html(boxMark(gunsAns));
    $("#results6").html(boxMark(ecoAns));
    $("#results7").html(boxMark(weedAns));
}

// Finds each candidate in a race, runs ResultsCandidates() on each one
function Results(choice) {
    $.getJSON("json-files/races/" + choice + ".json", function (data) {
        $(data.candidates).each(function () {
            var name = this.name;
            ResultsCandidates(name);
        });
    });
}

// Fills out each candidate's column on the results page
function ResultsCandidates(name) {
    var similar = 0;
    var label = "";
    $.getJSON("json-files/candidates/" + name + ".json", function (data) {
        $("#resultsPictures").append("<div class='col-sm-2'" + picColor(data.party) + "><img src='images/" + name + ".jpg'></div>");
        $("#resultsName").append("<div class='col-sm-2'>" + data.title + " " + data.firstName + " <br>" + data.lastName + "</div>");
        label = data.title + " " + data.firstName + " " + data.lastName;
        $("#resultsAbortion").append("<div class='col-sm-2'>" + boxMark(data.positions.abortion) + "</div>");
        similar += addVotes(data.positions.abortion, abortionAns);
        $("#resultsSSM").append("<div class='col-sm-2'>" + boxMark(data.positions.ssm) + "</div>");
        similar += addVotes(data.positions.ssm, ssmAns);
        $("#resultsImmigration").append("<div class='col-sm-2'>" + boxMark(data.positions.immigration) + "</div>");
        similar += addVotes(data.positions.immigration, immigrationAns);
        $("#resultsTaxes").append("<div class='col-sm-2'>" + boxMark(data.positions.taxes) + "</div>");
        similar += addVotes(data.positions.taxes, taxesAns);
        $("#resultsGuns").append("<div class='col-sm-2'>" + boxMark(data.positions.guns) + "</div>");
        similar += addVotes(data.positions.guns, gunsAns);
        $("#resultsEco").append("<div class='col-sm-2'>" + boxMark(data.positions.eco) + "</div>");
        similar += addVotes(data.positions.eco, ecoAns);
        $("#resultsWeed").append("<div class='col-sm-2'>" + boxMark(data.positions.weed) + "</div>");
        similar += addVotes(data.positions.weed, weedAns);
    });
    bestVote.push({name: label, fileName: name, score: similar});
}
function addVotes(v, u) {
    if (v == u) {
        return 1;
    }
    else {
        return 0;
    }
}

function voteFor() {
    var highScore = 0;
    var highName = "";
    var highFileName = ";"
    for (var i=0;i<bestVote.length;i++) {
        if (bestVote[i].score > highScore) {
            highScore = bestVote[i].score;
            highName = bestVote[i].label;
            highFileName = bestVote[i].fileName;
        }
    };
    $("#finalPic").html("<img src='images/'" + highFileName + ".jpg'>");
    $("#finalName").html(highName);
}

// Handles each step progression
function StepOne() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    $("#stepOne").show();
    $("#stepTwo").hide();
    $("#stepThree").hide();
}
function StepTwo() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    $("#stepOne").hide();
    $("#stepTwo").show();
    $("#stepThree").hide();

    raceChoice = $("#raceChoice").val();
}
function StepThree() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    Answers();
    Results(raceChoice);
    voteFor();
    $("#stepOne").hide();
    $("#stepTwo").hide();
    $("#stepThree").show();
}

// Document ready
$(document).ready(function () {
    $("#back2").click(StepOne);
    $("#next1").click(StepTwo);
    $("#back3").click(StepTwo);
    $("#next2").click(StepThree);
    StepOne();
});