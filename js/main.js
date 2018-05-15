// Universal variables
var raceChoice;
var bestVote = {"score": "0", "name": "Hmm... You should do some more research!", "fileName": "you"};
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
function picColor(party) {
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
function Results() {
    return new Promise((resolve => {
        $(".resultColumn").remove();
        $.getJSON("json-files/races/" + raceChoice + ".json", function (data) {
            $(data.candidates).each(function () {
                var name = this.name;
                ResultsCandidates(name);
            });
        });
    }));
}

// Fills out each candidate's column on the results page
function ResultsCandidates(name) {
    var similar = 0;
    var label = "";
    $.getJSON("json-files/candidates/" + name + ".json", function (data) {
        $("#resultsPictures").append("<div class='col-sm-2 resultColumn'" + picColor(data.party) + "><img src='images/" + name + ".jpg'></div>");
        $("#resultsName").append("<div class='col-sm-2 resultColumn'>" + data.title + " " + data.firstName + " <br>" + data.lastName + "</div>");
        label = data.title + " " + data.firstName + " " + data.lastName;
        $("#resultsAbortion").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.abortion) + "</div>");
        similar += addVotes(data.positions.abortion, abortionAns);
        $("#resultsSSM").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.ssm) + "</div>");
        similar += addVotes(data.positions.ssm, ssmAns);
        $("#resultsImmigration").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.immigration) + "</div>");
        similar += addVotes(data.positions.immigration, immigrationAns);
        $("#resultsTaxes").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.taxes) + "</div>");
        similar += addVotes(data.positions.taxes, taxesAns);
        $("#resultsGuns").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.guns) + "</div>");
        similar += addVotes(data.positions.guns, gunsAns);
        $("#resultsEco").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.eco) + "</div>");
        similar += addVotes(data.positions.eco, ecoAns);
        $("#resultsWeed").append("<div class='col-sm-2 findSource resultColumn' onclick='Sources()'>" + boxMark(data.positions.weed) + "</div>");
        similar += addVotes(data.positions.weed, weedAns);

        // var obj = {};
        // obj["name"] = label;
        // obj["fileName"] = name;
        // obj["score"] = similar;
        // bestVote.push(obj);
        // console.log(bestVote.length + " loop length");

        if (similar > bestVote.score) {
            bestVote.score = similar;
            bestVote.name = label;
            bestVote.fileName = name;
        }
    });
}

// Calculates the best vote
function addVotes(v, u) {
    if (v == u) {
        return 1;
    }
    else {
        return 0;
    }
}
function voteFor() {
    $("#finalPic").html("<img src='images/" + bestVote.fileName + ".jpg'>");
    $("#finalName").html(bestVote.name);
}

// Form validation
function formProcess() {
    var isValid = true;
    var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    var email = $("#email").val();
    if (email == "") {
        $("#emailResponse").text("This field is required!");
        isValid = false;
    }
    else if (!emailPattern.test(email)) {
        $("#emailResponse").text("Must be a valid email address!")
        isValid = false;
    }
    else {
        $("#emailResponse").text("");
    }

    var password = $("#password1").val();
    var passLength = password.length;
    if (password == "") {
        $("#password1Response").text("This field is required!");
        isValid = false;
    }
    else if (passLength < 6) {
        $("#password1Response").text("Password must be more than 6 characters!");
        isValid = false;
    }
    else {
        $("#password1Response").text("");
    }

    var passwordConfirm = $("#password2").val();
    if (passwordConfirm == "") {
        $("#password2Response").text("This field is required!");
        isValid = false;
    }
    else if (passwordConfirm != password) {
        $("#password2Response").text("Passwords must be the same!");
        isValid = false;
    }
    else {
        $("#password2Response").text("");
    }

    if (isValid == false) {
        event.preventDefault();
    }
}

// Sources pop-up
function Sources() {
    $("#sourceDialogue").modal();
}

// Handles each step progression
function StepOne() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    $("#stepOne").show();
    $("#stepTwo").hide();
    $("#stepThree").hide();
    $("#accountRegister").hide();
    $("#success").hide();
}
function StepTwo() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    bestVote = {"score": "0", "name": "Hmm... You should do some more research!", "fileName": "you"};
    $("#stepOne").hide();
    $("#stepTwo").show();
    $("#stepThree").hide();
    raceChoice = $("#raceChoice").val();
}
function StepThree() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    Answers();
    Results().then(voteFor());
    $("#stepOne").hide();
    $("#stepTwo").hide();
    $("#stepThree").show();
}
function RegisterToggle() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0;
    $("#stepOne").hide();
    $("#stepTwo").hide();
    $("#stepThree").hide();
    $("#accountRegister").show();
    $("#back4").click(StepOne);
    $("#submit").submit(formProcess);
}
function RegisterDone() {
    $("#registrationForm").hide();
    $("#success").show();
}

// Document ready
$(document).ready(function () {
    StepOne();
    $("#back2").click(StepOne);
    $("#next1").click(StepTwo);
    $("#back3").click(StepTwo);
    $("#next2").click(StepThree);
    $("#signup").click(RegisterToggle);
});