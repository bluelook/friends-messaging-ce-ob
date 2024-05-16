/*exp 3: competitive empathy one block version*/
$(document).ready(function(){
    //whether in the testing mode
    var testing = true;
    //Initial Experiment Parameters
    var ip=0;
   $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data){
        var temp = JSON.stringify(data, null, 2);
        temp = JSON.parse([temp]);
        ip = temp.geobytesremoteip;
        console.log('ip: '+ip);        
    });
    
    //disable exp for mobile if detected
    var mobile=false;
    var md = new MobileDetect(window.navigator.userAgent);
    if(md.mobile() && md.phone()){
        mobile = true;
        console.log('mobile');
        MobileNotice();
    }

    if(!testing)
    {
        if(!window.console) window.console = {};
        var methods = ["log", "debug", "warn", "info"];
        for(var i=0;i<methods.length;i++)
        {
            console[methods[i]] = function(){};
        }
    }
    //for real experiment num of trials is 40, other numbers are for testing
    var NumTrials = 40;
    console.log("number of trials per experiment is " + NumTrials);

    //probability of preferring one of two options
    var prob = 0.8;
    var SubID = CreateCode(); //randomize subject number for experiment
    console.log("SubID is: "+ SubID);

    var partID = null; //amazon MT/prolific/other
    var participant_gender = null;
  
    var exp_type = null;
    var stimuliType = null;
    
    var jsonData = null;
 
    var whatsAppWindow = null;
    var strategy1 = null; 
    var strategy2 = null;
    var situation = null;
    var response1 = null;
    var response2 = null;
    var advisorResponse = null;

    var currentActor = null;
    var actor_name = null;
    var actor_1_avatar = null;
    var actor_2_avatar = null;
    var ClientPic = null;

    var advisor_name = null;
    var participant_avatar = null;
    var advisor_avatar = null;

    var score_participant = 0.5;
    var score_advisor = 0.5;
    var RT_advisor = null;

    var RandomNum = null; //related to preferred selection
    var preferred = null;
    var preferredName = null;

    var emoji = null;
    
    /* average speed advisor */
    var min_rt = 7000;
    var max_rt = 9000; 

    /*pilot variations - very fast advisor 
    var min_rt = 3500;
    var max_rt = 4500;*/

    /*very slow advisor
    var min_rt = 9000;
    var max_rt = 10000;*/    

    /*randomize type of experiment between participants: 1 - dist, 2 - reap
    var randExpType = Math.random();
    if (randExpType < 0.5) {
        exp_type = 1;
    } else {
        exp_type = 2;
    } */
    //static experiment type: 1 - dist, 2 - reap
    exp_type = 1;
    console.log("experiment type is: " + exp_type); 

    //which strategy advisor advises same as exp type or opposite: 1 - dist, 2 - reap
    var advisor_type = exp_type; // 3 - exp_type;
    console.log("advisor type is: " + advisor_type); 

    //randomize type of stimuli between participants, in this case of actors
    var stimuliType = (Math.random() <= 0.5) ? 1 : 2; 
    console.log("stimuli type is: " + stimuliType);

    Survey.StylesManager.applyTheme("modern");

    if(testing){
        NumTrials = 40;
        console.log("number of testing trials per experiment is " + NumTrials);
        participant_gender = "woman";
        //participant_gender = "man";
        retrieveExpData(participant_gender);
        partID =CreateCode();//randomize testing part id number for experiment
        console.log("testing PartID is: "+ partID);

        //Welcome();
        //Information();//Start with information sheet 
        //AvatarSelection();    
        //genInstructions(1);
        actor_1_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Light';
        actor_2_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Light';
        participant_avatar = "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Default&skinColor=Pale";
        advisor_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Black';
        ClientPic = actor_1_avatar;
        actor_name = 'Amy';
        advisor_name = 'Zoe';
        Instructions(1);
        //Options(1);
        //SurveyPageDetails(InsertQCAE, QCAEJson);//temp to start from QCAE questionnaire
        //SurveyPageDetails(InsertPTM, PTMJson);//temp to start from QCAE questionnaire
        //SurveyPageDetails(InsertSPIN, SPINJson);//temp to start from SPIN questionnaire
        //RatingSurveyPageDetails(InsertRating, RatingJson)
        //End();

    }else{
       if(!mobile){
            Welcome();//Start with welcome screen
            //retrieveExpData("woman");
            //genInstructions(1); 
            //Instructions(2, "mood");
            //Options(1);
        }
    }
   
   //welcome screen
    function Welcome() {
        CreateDiv('Stage','TextBoxDiv');
        var Html1 = '<div class="container">\n\
                        <div class="row">\n\
                            <div class="col-md-12 text-center">\n\
                                <div class="page header"><h4 class="text-on-pannel text-primary" align="center">Welcome to the "Friends Messaging" experiment.<br>\n\
                                    It\'s nice to meet you!</h4></div>\n\
                                    <div class="row ">\n\
                                        <div class="col-md-3"></div>\n\
                                        <div class="col-md-6 col-md-offset-2 text-left">\n\
                                        <p class="lead"><br>This experiment contains the following parts</p>\n\
                                        <ul class="list-group">\n\
                                                <li class="list-group-item list-group-item-primary">1. Forms</li>\n\
                                                <li class="list-group-item list-group-item-light">Sign a consent form and fill your details</li>\n\
                                                <li class="list-group-item list-group-item-primary">2. The experiment game</li>\n\
                                                <li class="list-group-item list-group-item-light">Play the \"Friends Messaging\" Game </li>\n\
                                                <li class="list-group-item list-group-item-primary">3. Questionnaires</li>\n\
                                                <li class="list-group-item list-group-item-light">Answer questionnaires</li></ul>\n\
                                                <br><p class="lead">Overall the experiment is expected to take about 20 minutes.</p>\n\
                                                <p class="lead"><b>The experiment is expected to perform optimally when the browser zoom level is set to 100%. <br>\n\
                                                In the event that you encounter difficulties progressing to the next page, please consider reducing the zoom level to 75%.</b></p>\n\
                                                <p class="lead">Ready? Press below to start!</p>\n\
                                        </div>\n\
                                        <div class="col-md-3"></div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>';

        $('#TextBoxDiv').html(Html1);
        var Buttons = '<div align="center"><input align="center" type="button" class="btn btn-dark btn-lg" id="toInformation" value="Start" ></div>';
        $('#Bottom').html(Buttons);

        $('#toInformation').click(function() {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Information();
        });
    }

    //information incl. ethics
    function Information() {
        CreateDiv('Stage', 'TextBoxDiv');
        $('#TextBoxDiv').addClass("col");
        var title = '<div class="page header p-2">\n\
                        <h4 class="text-on-pannel text-primary" align="center">First, some information about the experiment</h4></div>';
        var info = '<div class="row p-2">\n\
                        <div class="col-1"></div>\n\
                        <div class="col-10">\n\
                            <h6><strong>Project name:</strong> Friends Messaging Game</h6>\n\
                        </div>\n\
                        <div class="col-1"></div>\n\
                    </div>\n\
                    <div class="row p-2">\n\
                        <div class="col-1"></div>\n\
                        <div class="col-10">\n\
                            This study has been approved by the University of Haifa, Faculty of Social Sciences Research Ethics Committee, as Project ID Number: 100/21. <br>\n\
                            The purpose of this study is to understand people\'s behavior.<br>\n\
                            All data will be kept anonymous (your name will not appear in any publication related to this study and will not be shared with any other parties). Only researchers working with <a href="https://sans.hevra.haifa.ac.il/" target="_blank">the SANS Lab</a> and <a href="https://www.socialdecisionlab.net/" target="_blank">the Social Decision Making Lab</a> will have access to data files containing identifying information (participant ID, IP address, etc.). The legal basis for processing your data is your consent.<br>\n\
                            Completely de-identified data files (no participant ID, no IP address) will be shared online following open-science practices. If you do not consent to de-identified data being shared, please close your browser window and do not submit the task. Once de-identified data has been shared, it may be difficult or impossible to withdraw consent for your anonymous data to be used. Please only continue if you are happy for your anonymous data to be used in this way. <br> \n\
                            By continuing, you consent to allow  <a href="https://sans.hevra.haifa.ac.il/" target="_blank">the SANS Lab</a> and <a href="https://www.socialdecisionlab.net/" target="_blank">the Social Decision Making Lab</a> to use your study responses for academic purposes and agreeing for your anonymized data to be shared. If you do not wish to participate or change your mind during the study, please close your browser window and do not submit the task.\n\
                        </div>\n\
                        <div class="col-1"></div>\n\
                    </div>\n\
                    <div class="row p-2">\n\
                        <div class="col-1"></div>\n\
                        <div class="col-10">\n\
                            <strong>Additional information:</strong><br>\n\
                            Ms. Elena Kozakevich Arbel, Ph.D. Student<br>\n\
                            Department of Psychology<br>\n\
                            University of Haifa<br>\n\
                            Haifa, Israel 31905<br>\n\
                            <a href = "mailto: ekozakev@campus.haifa.ac.il">ekozakev@campus.haifa.ac.il</a>\n\
                        </div>\n\
                        <div class="col-1"></div>\n\
                    </div>';
        $('#TextBoxDiv').html('<div class="panel panel-primary">' + title + info + '</div>');
        var Buttons = '<div align="center">\n\
                            <button type="button" class="btn btn-dark btn-lg" id="toWelcome">Back</button>\n\<input align="center" type="button" class="btn btn-dark btn-lg" id="toConsent" value="Next">\n\
                        </div>';
        $('#Bottom').html(Buttons);

        $('#toWelcome').click(function() {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Welcome();
        });

        $('#toConsent').click(function() {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Consent();
        });
    }
    
    //consent and part ID
    function Consent() {
        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<div class="row">\n\
                        <div class="col-md-12 text-center">\n\
                            <div class="page header"><h4 class="text-on-pannel text-primary" align="center">Consent form</h4></div>\n\
                        </div>\n\
                    </div>';
        var Info = '<div class="row">\n\
                        <div class="col-md-10 col-md-offset-1 text-left">Thank you for your interest in taking part in this research.<br>\n\
                            If you have any questions arising from the Information Page that you have already seen, please contact the experimenter before deciding whether to continue. You can go back to the Information Page by clicking the \'Back\' button below.<br><br>\n\
                        </div>\n\
                        <div class="col-2"></div>\n\
                    </div> \n\
                    <div class="row">\n\
                        <div class="col-md-12 col-md-offset-1 text-left"><b>Please confirm the following:</b>\n\
                        </div>\n\
                    </div>';
        var Ticks = '<div class="row">\n\
                        <div class="col-md-10 col-md-offset-1 text-left">\n\
                            <form data-toggle="validator" class="needs-validation" role="form" id="ConsentForm">\n\
                    <div class="form-check">\n\
                    <input class="form-check-input" type="checkbox" id="terms1" required> \n\
                    <label class="form-check-label">I have read the information page, and I consent to take part in this study.</label>\n\
                    <div class="help-block with-errors"></div>\n\
                    </div>\n\
                    <div class="form-check">\n\
                    <input class="form-check-input" type="checkbox" id="terms2" required> \n\
                    <label class="form-check-label"> I understand that anonymous data that cannot be traced back to me individually may be used in academic publications and shared following open science guidelines, and I consent to this.</label>\n\
                                   <div class="help-block with-errors"></div>\n\
                    </div>\n\
                    <div class="form-check">\n\
                    <input class="form-check-input" type="checkbox" id="terms3" required> \n\
                    <label class="form-check-label">I understand that the legal basis for processing any personal information about me is my consent.</label>\n\
                    <div class="help-block with-errors"></div>\n\
                    </div>\n\
                    <div class="form-check">\n\
                    <input class="form-check-input" type="checkbox" id="terms4" required> \n\
                    <label class="form-check-label">I understand that I can withdraw at any time from the study by closing my browser window, but that it will be difficult or impossible to remove my data once the task has been submitted.</label>\n\
                    <div class="help-block with-errors"></div>\n\
                    </div>\n\
                    <div class="form-check">\n\
                    <input class="form-check-input" type="checkbox" id="terms5" required> \n\
                    <label class="form-check-label"> I confirm that I am over 18 years of age.</label>\n\
                    <div class="help-block with-errors"></div>\n\
                    </div>\n\
                    <div class="form-group row p-2">\n\
                                    <div class="form-group col-sm-4">\n\
                                        <label for="CodeBox" class="control-label"><strong>Participant ID</strong></label>\n\
                                        <input type="text" class="form-control" id="CodeBox" maxlength="30" required>\n\
                                        <small id="idHelpBlock" class="form-text text-muted">Please copy and paste; any errors will mean that we won\'t be able to pay your compensation.</small>\n\
                    </div>\n\
                                    <div class="form-group col-sm-8"></div>\n\
                                </div>\n\
                                <div align="center">\n\
                                    <button type="button" class="btn btn-dark btn-lg" id="ToInformation">Back</button>\n\
                                    <button type="submit" class="btn btn-dark btn-lg">Submit</button>\n\
                                </div>\n\
                            </form>\n\
                        </div>\n\
                        <div class="col-2"></div>\n\
                    </div>';
       
        $('#TextBoxDiv').html(Title + Info + Ticks);

        var form = document.getElementById('ConsentForm');
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }

        function processForm(e) {
            if (e.preventDefault){
                e.preventDefault();
            }
            var form = document.getElementById('ConsentForm');
            partID = form.elements[5].value;
            console.log("real PartID is: "+ partID);


            $('#TextBoxDiv').remove();
            $('#CheckAlert').remove();
            $('#Stage').empty();            
            checkDuplicateParticipant(); //check if the participant already participated and present with demographic info
            return false;
        }

        $('#ToInformation').click(function () {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Information();
        });
    }

    function AvatarSelection(){
        CreateDiv('Stage','TextBoxDiv');
        CreateDiv('Bottom','Avatar');
        CreateDiv('Bottom','Button');

        $('#TextBoxDiv').addClass("col p-2");
        $('#Avatar').addClass("row p-1");
        $('#Button').addClass("p-2"); 

        var title = '<div class="row page header p-2">\n\
                        <h3 class="text-on-pannel text-primary" align="center">Create your avatar</h3></div>';
        var instructions = '<div class="row p-2">\n\
                                <div class="col-1"></div>\n\
                                <div class="col-10 d-flex justify-content-center"><h4>Please create your avatar by selecting the relevant features.<br> You can play with the features till you reach the desired avatar.<br> This will be the face presented to the other participants.</h4>\n\
                                </div>\n\
                                <div class="col-1"></div>\n\
                            </div>';
        var avatarSelection = '<form id="avatar" class="row">\n\
             <div class="row form-group">\n\
                <div class="col-sm-4"></div>\n\
                <label class="col-sm-1 form-label" for="topType">Top</label>\n\
                    <div class="col-sm-3">\n\
                        <select id="topType" class="form-control" control-id="ControlID-3">\n\
                            <option value="LongHairCurly">Long Hair Curly</option>\n\
                            <option value="LongHairStraight">Long Hair Straight</option>\n\
                             <option value="LongHairBigHair">Long Hair Big Hair</option>\n\
                            <option value="ShortHairShortCurly">Short Hair Curly</option>\n\
                            <option value="ShortHairShortFlat">Short Hair Flat</option>\n\
                            <option value="ShortHairSides">Short Hair Sides</option>\n\
                            <option value="ShortHairShortRound">Short Hair Round</option>\n\
                            <option value="NoHair">No hair</option>\n\
                            <option value="Hat">Hat</option>\n\
                        </select>\n\
                    </div>\n\
                    <div class="col-sm-4"></div>\n\
            </div>\n\
            <div class="row form-group">\n\
                <div class="col-sm-4"></div>\n\
                <label class="col-sm-1 form-label" for="accessoriesType">Accessories</label>\n\
                <div class="col-sm-3">\n\
                    <select id="accessoriesType" class="form-control" control-id="ControlID-4">\n\
                        <option value="Blank">No accessories</option>\n\
                        <option value="Round">Glasses</option>\n\
                        <option value="Sunglasses">Sunglasses</option>\n\
                    </select>\n\
                </div>\n\
                <div class="col-sm-4"></div>\n\
            </div>\n\
            <div class="row form-group">\n\
                <div class="col-sm-4"></div>\n\
                <label class="col-sm-1 form-label" for="hairColor">Hair Color</label>\n\
                    <div class="col-sm-3">\n\
                        <select id="hairColor" class="form-control" control-id="ControlID-5">\n\
                            <option value="Black">Black</option>\n\
                            <option value="Blonde">Blonde</option>\n\
                            <option value="Brown">Brown</option>\n\
                            <option value="Red">Red</option>\n\
                            <option value="SilverGray">SilverGray</option>\n\
                            </select>\n\
                        </div>\n\
                        <div class="col-sm-4"></div>\n\
            </div>\n\
            <div class="row form-group">\n\
                <div class="col-sm-4"></div>\n\
                <label class="col-sm-1 form-label" for="facialHairType">Facial Hair</label>\n\
                    <div class="col-sm-3">\n\
                        <select id="facialHairType" class="form-control" control-id="ControlID-6">\n\
                            <option value="Blank">No hair</option>\n\
                            <option value="BeardLight">Beard</option>\n\
                            <option value="MoustacheMagnum">Moustache</option>\n\
                        </select>\n\
                    </div>\n\
                    <div class="col-sm-4"></div>\n\
                </div>\n\
            <div class="row form-group">\n\
                <div class="col-sm-4"></div>\n\
                <label class="col-sm-1 form-label" for="skinColor">Skin</label>\n\
                <div class="col-sm-3">\n\
                    <select id="skinColor" class="form-control" control-id="ControlID-11">\n\
                        <option value="Pale">Pale</option>\n\
                        <option value="Light">Light</option>\n\
                        <option value="Brown">Brown</option>\n\
                        <option value="DarkBrown">DarkBrown</option>\n\
                        <option value="Black">Black</option>\n\
                    </select>\n\
                </div>\n\
                <div class="col-sm-4"></div>\n\
            </div>\n\
                <div align="center" class="p-2">\n\
                    <button type="submit" class="btn btn-dark">Submit</button>\n\
                </div>\n\
            </form>';
        
        // if( participant_avatar!= null){
        //     actor_2_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType='+top+'&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor='+skin;
        // }
        $('#TextBoxDiv').html(title+instructions+avatarSelection);
        var button = '<div class="col-12" style="text-align:center;">\n\
                            <input type="button"  class="btn btn-dark" id="Next" value="Next" disabled>\n\
                        </div>';

        var form = document.getElementById('avatar');
        if (form.attachEvent) {
            form.attachEvent("submit", processForm);
        } else {
            form.addEventListener("submit", processForm);
        }
        var top = null;
        var accessories = null;
        var hair_color = null;
        var facial = null;
        var skin = null;

        function processForm(e) {
            if (e.preventDefault){
                e.preventDefault();
            }
            var form = document.getElementById('avatar');
            var top = form.elements[0].value;
            var accessories = form.elements[1].value;
            var hair_color = form.elements[2].value;
            var facial = form.elements[3].value;
            var skin = form.elements[4].value;
            
            participant_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType='+top+'&accessoriesType='+ accessories+'&hairColor='+hair_color+'&facialHairType='+facial+'&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Default&skinColor='+skin;
            advisor_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Prescription02&hairColor='+hair_color+'&facialHairType='+facial+'&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor='+skin;
            actor_1_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType='+top+'&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Serious&skinColor='+skin;
            actor_2_avatar = 'https://avataaars.io/?avatarStyle=Transparent&topType='+top+'&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray02&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor='+skin;

            currentActor = stimuliType; 
            //decide upon the actor and his/her name
            if(currentActor == 1) {//  Amy, Ben
                if(participant_gender == "woman"){
                    actor_name = 'Amy';
                    advisor_name = 'Zoe'
                } else {
                    actor_name = "Ben"; 
                    advisor_name = 'Tom';
                }
                ClientPic = actor_1_avatar;
            } else { // 2 - Liv, Joe
                if(participant_gender == "woman"){
                    actor_name = 'Liv';
                    advisor_name = 'Zoe'
                } else {
                    actor_name = "Joe";
                    advisor_name = 'Tom';                 
                }
                ClientPic = actor_2_avatar;
            }
            console.log("current actor is: "+ currentActor);
            console.log("actor name is: " + actor_name);

            $('#Avatar').html('<div class="col text-center"><img src='+participant_avatar+'></div>');
            //enable "next" button
            $('#Next').prop("disabled", false);

            return false;
        }
            
        $('#Button').html(button);

        var Press = 0;
        $('#Next').click(function() {
            if (Press===0){
                Press=1; 
                $('#TextBoxDiv').remove();
                $('#Stage').empty();
                $('#Bottom').empty();
                genInstructions(1); //present general instructions screen
            }
        });
    }
    
    //gen instructions about the experiment, blocks, trials, etc.
    function genInstructions(PageNum) {
        var NumPages = 1;//number of pages of instructions
        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<div class="page header"><h3 class="text-on-pannel text-primary" align="center">General Instructions</h3></div>';
        var Info = '<div class="row p-4"><div class="col-2"></div><div class="col-8">';
        Info = Info + '<h4> You are about to start the "Friends Messaging" game!<br>\n\
                       The experiment contains '+ NumTrials + ' direct messaging conversations. <br>\n\
                       Before the start of the experiment detailed instructions will be provided.\n\
                       You can go back and forth between the instruction screens.</h4></div><div class="col-2"></div></div>';

        $('#TextBoxDiv').html(Title + Info);
        var Buttons = '<div class="col-4"></div>\n\
                            <div class="col-4 center-block" style="text-align:center;">\n\
                                <input type="button"  class="btn btn-dark" id="Next" value="Next" >\n\
                            </div>\n\
                        <div class="col-4"></div>';

        $('#Bottom').html(Buttons);

        
        $('#Next').click(function() {
                $('#TextBoxDiv').remove();
                $('#Stage').empty();
                $('#Bottom').empty();
                Instructions(1); //start the instructions
             });
    }

    //specific instructions, dynamic per block
    function Instructions(PageNum) { 
        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<div class="page header"><h3 class="text-on-pannel text-primary" align="center">Instructions - Page ' + PageNum +' </h3></div>';
        var Info = '<div class="row p-2"><div class="col-2"></div><div class="col-8">';       
        var a1_actor = null;
        var a2_actor = null;  
        var him_her = null;
        var advisor = null;
        var ThisImage = null;

        if (participant_gender != "man"){//all the other types of gender will see the woman version
            participant_gender = "woman";
        }
        //define actors based on participant gender
        switch(participant_gender){
            case "woman":
                a1_actor = "Amy";
                a2_actor = "Liv";
                him_her = "her";
                his_her = "her";
                he_she = "she";
                advisor = "Zoe"
                break;
            case "man":
                a1_actor = "Ben";
                a2_actor = "Joe";
                him_her = "him";
                his_her = "his";
                he_she = "he";
                advisor = "Tom";
                break;
            default:                
                break;
        }

        var actor_avatar = null;
        var actor = null;
        if(stimuliType == 1){
            actor_avatar = actor_1_avatar;
            actor = a1_actor;
        } else {
            actor_avatar = actor_2_avatar;
            actor = a2_actor;
        }
        //present page by page for all blocks
        var NumPages = 9;//number of pages of instructions
        var whatsappHeader = '<div id="whatsAppHeader" class="row p-2">\n\
                                <div class="col-1">\n\
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n\
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>\n\
                                </div>\n\
                                <div class="col-1">\n\
                                    <img id = "mainStimuli" src=' + advisor_avatar + ' class="rounded-circle" width="25" height="25">\n\
                                </div>\n\
                                <div class="col-1">\n\
                                    <img id = "mainStimuli" src=' + participant_avatar + ' class="rounded-circle" width="25" height="25">\n\
                                </div>\n\
                                <div class="col-1">\n\
                                    <img id = "mainStimuli" src=' + actor_avatar + ' class="rounded-circle" width="25" height="25">\n\
                                </div>\n\
                                <div class="col-4" align-self-center=""><h6> Friends Forever</h6>' + advisor + ', you, ' + actor + '</div>\n\
                                <div class="col-2 align-self-center">\n\
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">\n\
                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"></path></svg>\n\
                                </div>\n\
                                <div class="col-2 align-self-center">\n\
                                    <svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="32" height="32" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">\n\
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path></svg>\n\
                                </div>\n\
                            </div>';
        
        switch (PageNum) {
            case 1:
                Info = Info + '<h4> Imagine that ' + actor + ' is a friend of yours.</h4>';
                ThisImage = '<div class="row p-2">\n\
                                <div class="col-2"></div>\n\
                                <div class="col-8 border border-light bg-light">\n\
                                    <div class="row">\n\
                                        <div class="col text-center"><h1>' + actor + '</h1></div>\n\
                                    </div>\n\
                                    <div class="row">\n\
                                        <div class="col text-center"><img src=' + actor_avatar + '></div>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="col-2"></div>\n\
                            </div><br>';
                break;
            case 2:
                Info = Info + '<h4>'+ actor +' is experiencing potentially emotionally stressfull events: some of them are interpersonal (e.g., "argument with significant other") and some of them are non-interpersonal (e.g., "an accident or a money problem") in nature.</h4>';
                ThisImage = '<div class="row">\n\
                                <div class="col-1"></div>\n\
                                <div class="col-10 justify-content-center"><img class= "img" src="images/inst_f_m_' + participant_gender + '_2.png">\n\
                            </div><div class="col-1"></div></div>'
                break;
            case 3:
                Info = Info + '<h4>' + actor +' may feel angry or sad following '+ his_her + ' distressing experience.</h4>';
                ThisImage = '<div class="row">\n\
                            <div class="col-1"></div>\n\
                            <div class="col-10 table-responsive">\n\
                                <table class="table table-bordered">\n\
                                    <thead>\n\
                                        <tr class="table-light">\n\
                                            <th scope="col" class="text-center"><h1>Angry</h1></th>\n\
                                            <th scope="col" class="text-center"><h1>Sad</h1></th>\n\
                                        </tr>\n\
                                    </thead>\n\
                                    <tbody>\n\
                                        <tr class="table-light">\n\
                                          <td class="text-center"><h1 class="display-1">\&\#x1f620</h1></td>\n\
                                          <td class="text-center"><h1 class="display-1">\&\#9785</h1></td>\n\
                                        </tr>\n\
                                    </tbody>\n\
                                </table>\n\
                            </div><div class="col-1"></div></div><br>';
                break;
            case 4:
                Info = Info + '<h4> You and another player '+ advisor +' are both members of a support group with ' + actor + '. Both of you assist ' + actor + ' in ' + his_her +' distress.</h4>' ; 
                ThisImage = '<div class="row p-1 ">\n\
                                <div class="col-2"></div>\n\
                                <div class="col-8 table-responsive border border-light bg-light">\n\
                                    <div class="row p-3">\n\
                                        <div class="col text-center"><h1> "Friends Forever" support group </h1></div>\n\
                                    </div>\n\
                                    <div class="row">\n\
                                        <div class="col text-center"><h2>' + advisor + '</h2></div>\n\
                                        <div class="col text-center"><h2> You </h2></div>\n\
                                        <div class="col text-center"><h2>' + actor + '</h2></div>\n\
                                    </div>\n\
                                    <div class="row">\n\
                                        <div  class="col text-center"><img src=' + advisor_avatar + '></div>\n\
                                        <div  class="col text-center"><img src=' + participant_avatar + '></div>\n\
                                        <div  class="col text-center"><img src=' + actor_avatar + '></div>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="col-2"></div>\n\
                            </div><br>';
                           
                break;    
            case 5:                
                Info = Info + '<h4> On each trial, you and another player ' + advisor + ' will be presented with a text message from '+ actor +' describing '+ his_her+' distress.</h4>';
                ThisImage = '<div id="main" class="row p-1 border border-light bg-light">\n\
                            <div id="left" class="col-4"></div>\n\
                            <div id="middle" class="col-4 border border-dark rounded">' + whatsappHeader +'<div id="situation" class="container bg-image" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(\'images\/whatsapp_background.jpg\'); height: 50vh">\n\
                            <div class="row speech-wrapper align-items-end">\n\
                                <div class="col-2"><img id="mainStimuli" src='+ actor_avatar+' class="rounded-circle border border-light bg-gradient" width="30" height="30"></div>\n\
                                <div class="col-10 bubble">\n\
                                    <div class="txt">\n\
                                        <p class="name">' + actor +'</p>\n\
                                        <p class="message">I was suspended from my University studies <span style="font-size:22px">\&\#9785</span></p>\n\
                                        <p></p><span class="timestamp">14:56:00</span>\n\
                                    </div>\n\
                                <div class="bubble-arrow"></div>\n\
                              </div>\n\
                            </div>\n\
                            </div></div>\n\
                            <div id="right" class="col-4"></div>\n\
                        </div>';
                break;       
            case 6:
                Info = Info + '<h4> The text message will be followed by two options to assist '+ actor + '. <br>Each option has some probability of helping ' + him_her+'.\n\
                    <br> While some individuals may prefer one form of assistance, others may favor alternative options. <br>Your task, along with the other player '+ advisor+ ', is to provide maximum support to ' + actor + ' in distress and identify '+ his_her+' preferred type of help.\n\
                    <br>Both of you should select a response. <br>Choose the response that will be most helpful to '+ actor+ ' by using your mouse.</h4>';
                ThisImage = '<div class="row p-1 border border-light bg-light">\n\
                                <div id="left" class="col-4">\n\
                                    <div class="msg border">\n\
                                        <div class="col-10 bubble alt">\n\
                                            <div class="txt"><p class="message follow">Let\'s go to a cafe this afternoon. We can order delicious and comforting food there</p><span class="timestamp">14:56:10</span></div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                                <div id="middle" class="col-4 border border-dark rounded">' + whatsappHeader +'<div id="situation" class="container bg-image" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(\'images\/whatsapp_background.jpg\'); height: 50vh">\n\
                                        <div class="row speech-wrapper align-items-end">\n\
                                            <div class="col-2">\n\
                                                <img id="mainStimuli" src='+ actor_avatar+' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                            </div>\n\
                                            <div class="col-10 bubble">\n\
                                                <div class="txt">\n\
                                                    <p class="name">'+ actor +'</p>\n\
                                                    <p class="message">I was suspended from my University studies <span style="font-size:22px">\&\#9785</span></p>\n\
                                                    <p></p><span class="timestamp">14:56:00</span>\n\
                                                </div>\n\
                                            <div class="bubble-arrow"></div>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                                <div id="right" class="col-4">\n\
                                    <div class="msg border">\n\
                                        <div id="bubble" class="bubble alt">\n\
                                        <div class="txt"><p id="strategy2" class="message follow">This is a very demanding degree. Another field of study might suit you much more</p><span class="timestamp">14:56:10</span></div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>';
                break; 
            case 7:
                Info = Info + '<h4> After selecting a response, you will see the other player\'s message in the chat. You can know who replied first by the order of appearance and by checking the timestamp of the message.\n\
                <br><br>In the example below, you reponded first.</h4>';
                ThisImage = '<div id="main" class="row p-1 border border-light bg-light">\n\
                                <div id="left-1" class="col-2 align-self-center"><div class="row"><h4> Your response </h4></div><div class="row p-4"></div></div>\n\
                                <div id="left-2" class="col-2 align-self-center"><div class="row"><img src="images/arrow-right" width="150"></div><div class="row p-4"></div></div>\n\
                                <div id="middle" class="col-4 border border-dark rounded">' + whatsappHeader +'<div id="situation" class="container bg-image" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(\'images\/whatsapp_background.jpg\'); height: 50vh">\n\
                                <div class="row speech-wrapper align-items-end">\n\
                                    <div class="col-2"><img id="mainStimuli" src='+ actor_avatar+' class="rounded-circle border border-light bg-gradient" width="30" height="30"></div>\n\
                                    <div class="col-10 bubble">\n\
                                        <div class="txt">\n\
                                            <p class="name">' + actor +'</p>\n\
                                            <p class="message">I was suspended from my University studies <span style="font-size:22px">\&\#9785</span></p>\n\
                                            <p></p><span class="timestamp">14:56:00</span>\n\
                                        </div>\n\
                                    <div class="bubble-arrow"></div>\n\
                                  </div>\n\
                                </div>\n\
                                <div id="response1" class="msg row border border-primary rounded border-2">\n\
                                    <div id="bubble" class="col-10 bubble alt right">\n\
                                        <div class="txt">\n\
                                            <p id="strategy1" class="message follow">Let\'s go to a cafe this afternoon. We can order delicious and comforting food there</p>\n\
                                            <span class="timestamp border border-warning">14:56:10</span>\n\
                                        </div>\n\
                                        <div class="bubble-arrow-you"></div>\n\
                                    </div>\n\
                                </div>\n\
                                <div id="advisorResponse" class="speech-wrapper align-items-end row border border-primary rounded border-2">\n\
                                    <div class="col-2">\n\
                                        <img id="mainStimuli" src="https://avataaars.io/?avatarStyle=Transparent&amp;topType=ShortHairShaggyMullet&amp;accessoriesType=Prescription02&amp;hairColor=Black&amp;facialHairType=Blank&amp;clotheType=ShirtCrewNeck&amp;clotheColor=Black&amp;eyeType=Default&amp;eyebrowType=Default&amp;mouthType=Default&amp;skinColor=Pale" class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                    </div>\n\
                                    <div class="col-10 bubble">\n\
                                        <div class="txt">\n\
                                            <p class="name" style="color: rgb(226, 0, 15);"> ' + advisor +' </p>\n\
                                            <p class="message"></p><p id="strategy1" class="message follow">Try not to think about it too much. Play a challenging online game, such as Sudoku.</p><p></p>\n\
                                            <span class="timestamp border border-warning">14:56:15</span>\n\
                                        </div>\n\
                                        <div class="bubble-arrow"></div>\n\
                                    </div>\n\
                                </div>\n\
                                </div></div>\n\
                                <div id="right-2" class="col-2 align-self-center"><div class="row p-4"></div><div class="row p-4"></div><div class="row p-4"></div><div class="row"></div><div class="row"><img src="images/arrow-left" width="150"></div></div>\n\
                                <div id="right-1" class="col-2 align-self-center"><div class="row p-4"></div><div class="row p-4"></div><div class="row p-4"></div><div class="row"><h4> '+ advisor+'\'s response </h4></div></div>\n\
                            </div>';
                break; 
            case 8:
                Info = Info + '<h4>' + actor + ' replies after both of you have selected your responses and listens to the advice from one of you. <br>How will you know who '+ actor + ' listened to? Based on who ' + actor + ' quoted in ' + his_her +' response. \n\
                <br>Also, ' + actor + ' shows if the advice helped ' + him_her + ' or not. <br>\n\
                How will you know if it helped? According to the emoji in ' + actor + '\'s reply. <br><br> In the examples below, '+ actor + ' responded to your advice and ignored ' + advisor + '\'s advice';
                ThisImage = '<div id="main" class="row p-1 border border-light bg-light">\n\
                                <div class="row p-2">\n\
                                    <div class="col-md text-center">\n\
                                            <h4>If it did help, you would see a positive change in ' + actor + '\'s reply.</h4>\n\
                                    </div>\n\
                                    <div class="col-md text-center">\n\
                                            <h4>If it did not help, '+ actor+'\'s reply would reflect that '+ he_she + ' is still upset.</h4>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="row p-2">\n\
                                    <div id="left" class="col-1"></div>\n\
                                    <div id="middle" class="col-4 border border-dark rounded">\n\
                                        <div id="message" class="speech-wrapper align-items-end row">\n\
                                            <div class="col-2">\n\
                                                <img id="mainStimuli" src='+ actor_avatar + ' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                            </div>\n\
                                            <div class="col-10 bubble">\n\
                                                <div class="txt reply">\n\
                                                    <p class="name">'+ a1_actor + '</p>\n\
                                                </div>\n\
                                                <div id="bubble" class="bubble alt right reply">\n\
                                                    <div class="txt">\n\
                                                        <p class="you">You</p><p id="strategy1" class="message follow">Let\'s go to a cafe this afternoon. We can order delicious and comforting food there.</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div class="txt">\n\
                                                    <p class="message" style="font-size:22px">&#128524</p><span class="timestamp">14:56:20</span>\n\
                                                </div>\n\
                                                <div class="bubble-arrow"></div>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div id="right" class="col-1"></div>\n\
                                    <div id="left" class="col-1"></div>\n\
                                    <div id="middle" class="col-4 border border-dark rounded">\n\
                                        <div id="message" class="speech-wrapper align-items-end row">\n\
                                            <div class="col-2">\n\
                                                <img id="mainStimuli" src='+ actor_avatar + ' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                            </div>\n\
                                            <div class="col-10 bubble">\n\
                                                <div class="txt reply">\n\
                                                    <p class="name">'+ a1_actor + '</p>\n\
                                                </div>\n\
                                                <div id="bubble" class="bubble alt right reply">\n\
                                                    <div class="txt">\n\
                                                        <p class="you">You</p><p id="strategy1" class="message follow">Let\'s go to a cafe this afternoon. We can order delicious and comforting food there.</p>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div class="txt">\n\
                                                    <p class="message" style="font-size:22px">&#9785</p><span class="timestamp">14:56:20</span>\n\
                                                </div>\n\
                                                <div class="bubble-arrow"></div>\n\
                                            </div>\n\
                                        </div>\n\
                                    </div>\n\
                                    </div>\n\
                                    <div id="right" class="col-1"></div>\n\
                                </div>\n\
                            </div>\n\
                         </div>';                              
                break;
            case 9:
                Info = Info +'<h4>How does ' + actor +' choose to listen to you or the other player '+ advisor + '?<br> ' + actor + ' chooses to listen to one of you based on how succesfull your responses were and how quickly you responded in the past. <br> \n\
                Once '+ actor +' has replied, the "Next" button will become available for you to proceed to the next trial. <b>If the button is not visible on the screen, please consider reducing your browser\'s zoom level to 75%.</b> <br>There are ' + NumTrials + ' trials \n\
                in this experiment. Good luck!</h4>';
                ThisImage = '<div class="row">\n\
                                <div class="col-2"></div>\n\
                                <div class="col-8 justify-content-center">\n\
                                    <div id="main" class="row p-1 border border-light bg-light">\n\
                                        <div id="left" class="col-3"></div>\n\
                                        <div id="middle" class="col-6 border border-dark rounded">' + whatsappHeader +'\n\
                                            <div id="situation" class="container bg-image" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(\'images\/whatsapp_background.jpg\'); height: 50vh">\n\
                                                <div class="row speech-wrapper align-items-end">\n\
                                                    <div class="col-2">\n\
                                                        <img id="mainStimuli" src='+ actor_avatar+' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                                    </div>\n\
                                                    <div class="col-10 bubble">\n\
                                                        <div class="txt">\n\
                                                            <p class="name">' + actor + '</p>\n\
                                                            <p class="message">I was suspended from my University studies <span style="font-size:22px">\&\#9785</span></p>\n\
                                                            <p></p><span class="timestamp">14:56:00</span>\n\
                                                        </div>\n\
                                                        <div class="bubble-arrow"></div>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div id="response1" class="msg row border">\n\
                                                    <div id="bubble" class="col-10 bubble alt right">\n\
                                                        <div class="txt"><p id="strategy1" class="message follow">Let\'s go to a cafe this afternoon. We can order delicious and comforting food there.</p>\n\
                                                        <span class="timestamp">14:56:10</span>\n\
                                                        </div>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div id="advisorResponse" class="speech-wrapper align-items-end row">\n\
                                                <div class="col-2">\n\
                                                    <img id="mainStimuli" src="https://avataaars.io/?avatarStyle=Transparent&amp;topType=ShortHairShaggyMullet&amp;accessoriesType=Prescription02&amp;hairColor=Black&amp;facialHairType=Blank&amp;clotheType=ShirtCrewNeck&amp;clotheColor=Black&amp;eyeType=Default&amp;eyebrowType=Default&amp;mouthType=Default&amp;skinColor=Pale" class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                                </div>\n\
                                                <div class="col-10 bubble">\n\
                                                    <div class="txt">\n\
                                                        <p class="name" style="color: rgb(226, 0, 15);"> ' + advisor +' </p>\n\
                                                        <p class="message"></p><p id="strategy1" class="message follow">Try not to think about it too much. Play a challenging online game, such as Sudoku.</p><p></p>\n\
                                                        <span class="timestamp">14:56:15</span>\n\
                                                    </div>\n\
                                                    <div class="bubble-arrow"></div>\n\
                                                </div>\n\
                                            </div>\n\
                                                <div id="message" class="speech-wrapper align-items-end row">\n\
                                                    <div class="col-2">\n\
                                                        <img id="mainStimuli" src='+ actor_avatar + ' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                                    </div>\n\
                                                    <div class="col-10 bubble">\n\
                                                        <div class="txt reply">\n\
                                                            <p class="name">'+ a1_actor + '</p>\n\
                                                        </div>\n\
                                                        <div id="bubble" class="bubble alt right reply">\n\
                                                            <div class="txt">\n\
                                                                <p class="you">You</p><p id="strategy1" class="message follow">Let\'s go to a cafe this afternoon. We can order delicious and comforting food there.</p>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="txt">\n\
                                                            <p class="message" style="font-size:22px">&#128524</p><span class="timestamp">14:56:20</span>\n\
                                                        </div>\n\
                                                        <div class="bubble-arrow"></div>\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                        </div>\n\
                                        <div id="right" class="col-3"></div>\n\
                                    </div>\n\
                                    <div class="row justify-content-center p-2">\n\
                                        <div class="col-auto border border-primary border-5">\n\
                                            <input type="button" class="btn btn-lg btn-dark text-white" value="Next">\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                                <div class="col-2"></div>\n\
                            </div>'
                break;
            default:
                Info;
        }         

        $('#TextBoxDiv').html(Title + Info + '</div><div class="col-2"></div></div>' + ThisImage);

        var Buttons = '<div class="col-4"></div>\n\
                            <div class="col-4 center-block" style="text-align:center;">\n\
                                <input type="button" class="btn btn-dark" id="Back" value="Back" >\n\
                                <input type="button"  class="btn btn-dark" id="Next" value="Next" >\n\
                                <input type="button"  class="btn btn-dark" id="Start" value="Start!" >\n\
                            </div>\n\
                        <div class="col-4"></div>';
    
        $('#Bottom').html(Buttons);

        if (PageNum === 1) {
            $('#Back').hide();
        }
        
        if (PageNum === NumPages) {
            $('#Next').hide();
        }
        
        if (PageNum < NumPages) {
            $('#Start').hide();
        }
        
        $('#Back').click(function() {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Instructions(PageNum - 1);

        });
        $('#Next').click(function() {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Instructions(PageNum + 1);

        });
        $('#Start').click(function() {
            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            setTimeout(function() {
                $('#Stage').addClass("justify-content-center");
                $('#Stage').html('<H1 align = "center">Ready</H1>');
                setTimeout(function() {
                    $('#Stage').html('<H1 align = "center">Steady</H1>');
                    setTimeout(function() {
                        $('#Stage').html('<H1 align = "center">Go!</H1>');
                        setTimeout(function() {
                            $('#Stage').empty();
                            Options(1);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 10);
        });
    }

    // stage 1 advisor selection
    function SelectAdvisor(TrialNum, prev_reward_participant, prev_reward_advisor, RT_advisor, RT_participant) {
        
        //calculate the probability of choosing participant as advisor
        if(prev_reward_participant == 0){
            prev_reward_participant = -1;
        }
        if(prev_reward_advisor == 0){
            prev_reward_advisor = -1;
        }
        var beta = 1;
        var alpha = 0.5
        score_participant = Math.round((score_participant*(1-alpha) + alpha*prev_reward_participant*Math.max(10 - RT_participant/1000,0))*100)/100;
        score_advisor = Math.round((score_advisor*(1-alpha) + alpha*prev_reward_advisor*Math.max(10 - RT_advisor/1000,0))*100)/100;
        p_participant = Math.round(1/(1 + Math.exp(beta*(score_advisor - score_participant)))*100)/100;
        
        console.log("participant RT is: " + RT_participant);
        console.log("advisor RT is: " + RT_advisor);
        console.log("participant score is: " + score_participant);
        console.log("advisor score is: " + score_advisor);
        console.log("p of participant is : " + p_participant);

        var Who=null;
        var WhoNum = 0;
        if (Math.random() < p_participant) {
            Who = 'You';
            WhoNum = 1;
        } else {
            Who = advisor_name;
            WhoNum = -1;
        }

        console.log("WhoNum you=1, WhoNum advisor=-1 : " + WhoNum);
        return WhoNum;
    }
   
    //present options of the block
    function Options(TrialNum) {
                
        var RandPosition = Math.random();

        CreateDiv('Stage','TextBoxDiv');
        $('#TextBoxDiv').addClass("col");        
        
        //display progress bar
        var percentageComplete = Math.round((TrialNum/NumTrials*100 + Number.EPSILON) * 100) / 100;
        var trialCount = '<div class="progress col-12" style="height: 30px; padding: 8px;">\n\
                        <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: '
                        + percentageComplete + '%;" aria-valuenow="'
                        + percentageComplete +'" aria-valuemin="0" aria-valuemax="100">'+ percentageComplete +'%</div></div>';

        var mood_name = null;
        //randomize type of mood between participants: 
        var mood_type = (Math.random() <= 0.5) ? 1 : 2; // 1 - angry, 2 - sad
        
        //decide upon the mood name and the emoji
        if(mood_type == 1)// 1 - angry
        {
            emoji = '\&\#x1f620'; //angry
            mood_name = 'angry';
        }
        else { //2 - sad
            emoji = '\&\#9785'; //sad 
            mood_name = "sad"; 
        }
        console.log("current mood is: "+ mood_type + '-' + mood_name);

        var situationName = jsonData[TrialNum-1].situation; 
        var situationType = jsonData[TrialNum-1].situation_type;
        console.log("current situation type is: " + situationType);        

        strategy1 = '<p id="strategy1" class="message follow">'+ jsonData[TrialNum-1].strategy_1 +'</p>';  //distraction
        strategy2 = '<p id="strategy2" class="message follow">'+ jsonData[TrialNum-1].strategy_2 +'</p>';  //reappraisal
        
        var today = new Date();
        whatsAppWindow = '<div id="whatsAppHeader" class="row p-2">\n\
                            <div class="col-1">\n\
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n\
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>\n\
                            </div>\n\
                            <div class="col-1">\n\
                                <img id = "mainStimuli" src=' + advisor_avatar + ' class="rounded-circle" width="25" height="25">\n\
                            </div>\n\
                            <div class="col-1">\n\
                                <img id = "mainStimuli" src=' + participant_avatar + ' class="rounded-circle" width="25" height="25">\n\
                            </div>\n\
                            <div class="col-1">\n\
                                <img id = "mainStimuli" src=' + ClientPic + ' class="rounded-circle" width="25" height="25">\n\
                            </div>\n\
                            <div class="col-4" align-self-center><h6> Friends Forever</h6>' + advisor_name + ', you, ' + actor_name + '</div>\n\
                            <div class="col-2 align-self-center">\n\
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">\n\
                                <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/></svg>\n\
                            </div>\n\
                            <div class="col-2 align-self-center">\n\
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">\n\
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>\n\
                            </div>\n\
                        </div>';

        situation ='<div id="situation" class="container bg-image" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.6) 100%), url(\'images/whatsapp_background.jpg\'); height: 55vh;">\n\
                        <div class="row speech-wrapper align-items-end">\n\
                            <div class="col-2"><img id="mainStimuli" src='+ ClientPic +' class="rounded-circle border border-light bg-gradient" width="30" height="30"></div>\n\
                            <div class="col-10 bubble">\n\
                                <div class="txt">\n\
                                    <p class="name">'+ actor_name +'</p>\n\
                                    <p class="message">' + situationName + '<span style="font-size:22px">'+ emoji + '</p>\n\
                                    <p></p><span class="timestamp">' + today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit', hour12: false}) + '</span>\n\
                                </div>\n\
                            <div class="bubble-arrow"></div>\n\
                          </div>\n\
                        </div>\n\
                    </div>';

        response1 = '<div id="response1" class="msg row border">\n\
                        <div id="bubble" class="col-10 bubble alt">\n\
                            <div class="txt">' + strategy1 + '<span class="timestamp"></span>\n\
                            </div>\n\
                            <div class="bubble-arrow-you"></div>\n\
                        </div>\n\
                    </div>';
        response2 = '<div id="response2" class="msg border">\n\
                      <div id="bubble" class="bubble alt">\n\
                        <div class="txt">' + strategy2 + '<span class="timestamp"></span>\n\
                        </div>\n\
                        <div class="bubble-arrow-you"></div>\n\
                      </div>\n\
                    </div>';
        
        var Images = '<div id="main" class="row p-1">\n\
                             <div class="col-1"></div>\n\
                             <div id="left" class="col-3"></div>\n\
                             <div id="middle" class="col-4 border border-dark rounded">'
                                + whatsAppWindow + situation +
                            '</div>\n\
                            <div id="right" class="col-3">\n\
                            <div class="col-1"></div>\n\
                            </div>\n\
                        </div>';
        
        $('#TextBoxDiv').html(trialCount + Images);//Title + 

        //randomize response 1 and 2 sides
        if (RandPosition < 0.5) {
            Images = '<div id="main" class="row p-1">\n\
                        <div id="left" class="col-4">' 
                        + response2 + 
                        '</div>\n\
                        <div id="middle" class="col-4 border border-dark rounded">'
                        + whatsAppWindow + situation +
                        '</div>\n\
                        <div id="right" class="col-4">'
                        + response1 +
                        '</div>\n\
                    </div>';
        } else {
            Images = '<div id="main" class="row p-1">\n\
                        <div id="left" class="col-4">'
                        + response1 + 
                        '</div>\n\
                        <div id="middle" class="col-4 border border-dark rounded">'
                        + whatsAppWindow + situation +
                        '</div>\n\
                        <div id="right" class="col-4">'
                        + response2 + 
                        '</div>\n\
                    </div>';
        }
        
        $('#Bottom').html('<div class="col-1" align="right"><input type="button" class="btn btn-dark btn-lg" id="toNextTrial" value="Next" disabled></div>');
        
        //delay the appearance of the strategies 
        setTimeout(function() {
            $('#TextBoxDiv').html(trialCount + Images);//Title + 
        }, 2500);

        var InitTime = (new Date()).getTime();
        RT_advisor = Math.floor(Math.random() * (max_rt - min_rt + 1)) + min_rt;
        advisor_time = InitTime + RT_advisor;

        var Press=0;
        var ThisTime = 0;
        setTimeout(function() {
            $('#response1').click(function() {
                if (Press===0){
                    Press=1; 
                    ThisTime = (new Date()).getTime(); //record the global time of the click, to determine RT with offset from init time      
                    $('#response2').fadeOut(500, function(){});
                    $('#response1').fadeOut(500, function(){
                        today = new Date();
                        Reward(TrialNum, 1, Sign(RandPosition-0.5), ThisTime-InitTime, mood_type, mood_name, emoji, situationType, situationName, today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second: '2-digit', hour12: false}), (new Date(advisor_time)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second: '2-digit', hour12: false}),RT_advisor);
                     });
                }
            });
            $('#response2').click(function() {
                if (Press===0){
                    Press=1;          
                    ThisTime = (new Date()).getTime(); //record the global time of the click, to determine RT with offset from init time 
                    $('#response1').fadeOut(500, function(){});
                    $('#response2').fadeOut(500, function(){
                        today=new Date();
                        Reward(TrialNum, 2, Sign(0.5-RandPosition), ThisTime-InitTime, mood_type, mood_name, emoji, situationType, situationName, today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second: '2-digit', hour12: false}),(new Date(advisor_time)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second: '2-digit', hour12: false}), RT_advisor);
                     });              
                }
            }); 
        }, 3000);        
    }

    //advisor policy
    function OtherChoice(){
        //create probability for advisor advice, means the advisor is mostly correct/incorrect (in e.g. 80% of the cases as prob)
        var advisorProb = Math.round((Math.random() + Number.EPSILON)*100)/100;
        var advisor_choice=null;

        if((advisorProb < prob && advisor_type == 1) || (advisorProb > prob && advisor_type == 2)) {
            //advisor_choice = 2; // preferred option is 2 - reappraisal (will be normalized to 0) - opposite of the target in 80% experiment type 1 and 20% experiment type 2
            advisor_choice = 1; //preferred option is 1 - distraction (will be normalized to 1) - same as the target in 80% experiment type 1 and 20% experiment type 2
         
        } else{ 
       //reappraisal: probability (e.g. 80%) of cases for block 2 or in probability (e.g. 20%) of cases for block 1
            //advisor_choice = 1; //preferred option is 1 - distraction (will be normalized to 1) - opposite of the target in 80% experiment type 2 and 20% experiment type 1
            advisor_choice = 2; // preferred option is 2 - reappraisal (will be normalized to 0) - same as the target in 80% experiment type 2 and 20% experiment type 1
        }    
        console.log("advisor choice is: "+ advisor_choice);

        return advisor_choice; 
    }
    
    function DefinePreferredPolicy(){
        //create random probability for current trial
        RandomNum = Math.round((Math.random() + Number.EPSILON)*100)/100;
        //console.log("random num is: "+ RandomNum);
        //var advisor_choice = null;
        //decide about the reward policy according to block number, so distraction has a higher reward probability in block 1
        //in probability (e.g. 80%) of cases for block 1 or in probability (e.g. 20%) of cases for block 2
        if((RandomNum < prob && exp_type == 1) || (RandomNum > prob && exp_type == 2)) {
            preferred = 1; // preferred option is 1 - distraction (will be normalized to 1) 
            preferredName = "dist";  
            //advisor_choice = 2; // preferred option is 2 - reappraisal (will be normalized to 0) - opposite of the target in 80% experiment type 1 and 20% experiment type 2                 
        } else{ 
        //in probability (e.g. 80%) of cases for block 2 or in probability (e.g. 20%) of cases for block 1
            preferred = 2; //preferred option is 2 - reappraisal (will be normalized to 0)
            preferredName = "reap";
            //advisor_choice = 1; //preferred option is 1 - distraction (will be normalized to 1) - opposite of the target in 80% experiment type 2 and 20% experiment type 1
        }  

        console.log("preferred choice is: "+ preferred + ", " + preferredName); 
    }

    //Side= -1(left) ------ 1 (right), 1 - distraction, 2 - reapraisal
    function Reward(TrialNum, Choice, Side, RT_participant, moodType, moodName, emoji, situationType, situationName, participant_timestamp, advisor_timestamp, RT_advisor) {      
        console.log("clicked choice is: "+ Choice);
        DefinePreferredPolicy();

        //decide if the participant earns the reward according to the clicked option and there is a relief or not
        var participant_reward = 0;        
        if(Choice == preferred) { //choice matches the preferred = correct choice
            participant_reward = 1;  
        }

        // create a node for response1 message
        var response1Node = document.createElement('div'); 
        response1Node.innerHTML = response1; //add to the node the html code
        response1Node.firstElementChild.firstElementChild.classList.add('right');
        response1Node.childNodes[0].childNodes[1].childNodes[1].childNodes[1].innerHTML=participant_timestamp;
        //var randomColorRes1 = Math.floor(Math.random()*16777215).toString(16);

        // create a node for response2 message
        var response2Node = document.createElement('div'); 
        response2Node.innerHTML = response2; //add to the node the html code
        response2Node.firstElementChild.firstElementChild.classList.add('right'); 
        response2Node.childNodes[0].childNodes[1].childNodes[1].childNodes[1].innerHTML=participant_timestamp;
        
        var strategy=null;
        var responseNode = null;

        if(Choice == 1) {//strategy1 (response1) - distraction
            strategy=strategy1;
            responseNode = response1Node;
        }
        else {//strategy2 (response2) - reappraisal
            strategy=strategy2;
            responseNode = response2Node;
        }
        
        //construct the reply from the advisor : create the advisor strategy based on the advisor choice and decide upon reward
        var advisor_choice = OtherChoice();
        
        var advisor_reward = 0;
        if(advisor_choice == preferred) { //advisor choice matches the preferred = correct choice
            advisor_reward = 1;
        } 

        if(advisor_choice == 1){
            advisor_strategy = strategy1;            
        } else {
            advisor_strategy = strategy2;
        }
                                           
        // create a node for advisor message
        var responseAdvisorNode = document.createElement('div'); 
        responseAdvisorNode.innerHTML = '<div id="advisorResponse" class="speech-wrapper align-items-end row">\n\
                                        <div class="col-2">\n\
                                            <img id="mainStimuli" src='+ advisor_avatar +' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                        </div>\n\
                                        <div class="col-10 bubble">\n\
                                            <div class="txt">\n\
                                                <p class="name" style="color: #E2000F";> ' + advisor_name + ' </p>\n\
                                                <p class="message">' + advisor_strategy + '</p>\n\
                                                <span class="timestamp">' + advisor_timestamp + '</span>\n\
                                            </div>\n\
                                            <div class="bubble-arrow"></div>\n\
                                        </div>\n\
                                    </div>';

        //add to the whatsapp window the response from the participant and the advisor according to the RT
        var situationElement = document.getElementById("situation");
        if( RT_participant < RT_advisor){
            //add the participant response into the whatsapp window 
            setTimeout(function() { 
                    situationElement.appendChild(responseNode);
            }, 500); 
            
            //add the advisor response into the whatsapp window 
            setTimeout(function() { 
                    situationElement.appendChild(responseAdvisorNode);
            }, 1500);
        } else {
            //add the participant response into the whatsapp window 
            setTimeout(function() { 
                situationElement.appendChild(responseAdvisorNode);
            }, 500); 
        
            //add the advisor response into the whatsapp window 
            setTimeout(function() { 
                    situationElement.appendChild(responseNode);
            }, 1500);
        }
        
        //construct the reply from the actor
        var actor_timestamp = (new Date((new Date()).getTime() + 7500)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second: '2-digit', hour12: false});
        //construct the reply from the actor
        var message_part_1 = '<div id="message" class="speech-wrapper align-items-end row">\n\
                                <div class="col-2">\n\
                                    <img id="mainStimuli" src=' + ClientPic + ' class="rounded-circle border border-light bg-gradient" width="30" height="30">\n\
                                </div>\n\
                                <div class="col-10 bubble">\n\
                                    <div class="txt reply">\n\
                                        <p class="name">' + actor_name +'</p>\n\
                                    </div>\n\
                                <div id="bubble" class="bubble alt right reply">\n\
                                <div class="txt">\n\
                                    <p class="you" class="message follow">';
        var message_part_2 = '<span class="timestamp">' + actor_timestamp + '</span>\n\
                                    </div>\n\
                                    <div class="bubble-arrow"></div>\n\
                                </div>\n\
                                </div>';    
        //if the participant helped
        var changedMessage_you =   message_part_1 + 'You</p>'
                                            + strategy +
                                        '</div>\n\
                                      </div>\n\
                                        <div class="txt">\n\
                                            <p class="message" style="font-size:22px">&#128524</p>'+message_part_2;
        
        //if the participant didn't help
        var sameMessage_you = message_part_1 + 'You</p>'
                                            + strategy +
                                        '</div>\n\
                                      </div>\n\
                                        <div class="txt">\n\
                                            <p class="message" style="font-size:22px">'+emoji+'</p>'+message_part_2;
        //if the advisor helped
        var changedMessage_advisor =  message_part_1 + advisor_name +'</p>'
                                            + advisor_strategy +
                                        '</div>\n\
                                      </div>\n\
                                        <div class="txt">\n\
                                            <p class="message" style="font-size:22px">&#128524</p>'+message_part_2;
        //if the advisor didn't help
        var sameMessage_advisor = message_part_1 + advisor_name +'</p>'
                                            + advisor_strategy +
                                        '</div>\n\
                                      </div>\n\
                                        <div class="txt">\n\
                                            <p class="message" style="font-size:22px">'+emoji+'</p>'+message_part_2;                                      
   
        
        //decide who the actor replies to WhoNum = 1 -> you, WhoNum = -1 -> other
        var WhoNum = SelectAdvisor(TrialNum, participant_reward, advisor_reward, RT_advisor, RT_participant); 
        var delay = 3000;
        var sameMessageNode = document.createElement('div'); // create a node for non-relief message
        var changedMessageNode = document.createElement('div'); // create a node for relief message

        //if the reply goes to the participant
        if(WhoNum == 1){
           sameMessageNode.innerHTML = sameMessage_you; //add to the node the html code of the participant response 
           changedMessageNode.innerHTML = changedMessage_you;     //add to the node the html code of the participant response
           if(participant_reward == 1) { // correct choice         
                //show relief with a delay
                setTimeout(function() { 
                    situationElement.appendChild(changedMessageNode);
                    //enable "next" button
                    $('#toNextTrial').prop("disabled", false).removeClass('btn-dark').addClass('btn-dark text-white');
                },delay);                          
            }//incorrect choice
            else
            {
                //show unchanged (still angry/sad) with a delay
                setTimeout(function() { 
                    situationElement.appendChild(sameMessageNode);
                    //enable "next" button
                    $('#toNextTrial').prop("disabled", false).removeClass('btn-dark').addClass('btn-dark text-white');
                }, delay);
            }       

        } else{ //the reply goes to the advisor
            sameMessageNode.innerHTML = sameMessage_advisor; //add to the node the html code of the advisor response
            sameMessageNode.firstElementChild.childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.color = "#E2000F"; //change the color of the name
            changedMessageNode.innerHTML = changedMessage_advisor;     //add to the node the html code 
            changedMessageNode.firstElementChild.childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.color = "#E2000F"; //change the color of the name
            if(advisor_reward == 1) { // correct choice         
                //show relief with a delay
                setTimeout(function() { 
                    situationElement.appendChild(changedMessageNode);
                    //enable "next" button
                    $('#toNextTrial').prop("disabled", false).removeClass('btn-dark').addClass('btn-dark text-white');
                }, delay);                          
            }//incorrect choice
            else
            {
                //show unchanged (still angry/sad) with a delay
                setTimeout(function() { 
                    situationElement.appendChild(sameMessageNode);
                    //enable "next" button
                    $('#toNextTrial').prop("disabled", false).removeClass('btn-dark').addClass('btn-dark text-white');
                }, delay);

            }       
        }
        //update DB with this trial choice
        InsertDataAjax(TrialNum, Choice, advisor_choice, Side, RT_participant, RT_advisor, participant_reward, advisor_reward, moodType, moodName, situationType, situationName, preferred, preferredName,RandomNum, WhoNum, score_participant, score_advisor, p_participant);
        
        var Press = 0;
        $('#toNextTrial').click(function() {   
            if (Press===0){
                Press=1;  
                toNextTrial(TrialNum, participant_reward, advisor_reward,RT_participant, RT_advisor);
                console.log("trial number is: " + TrialNum);
            }
        });
                       
    }

    function toNextTrial(TrialNum, participant_reward, advisor_reward, RT_participant, RT_advisor){
        if (TrialNum < NumTrials) {            
            setTimeout(function() {
                $('#Container1').fadeOut(500);
                setTimeout(function() {
                    $('#Bottom').empty();
                    $('#Stage').empty();
                    Options(TrialNum+1);
                }, 500);
            }, 500);
        } else { //finished all trials, move to the next block
            setTimeout(function() {
                $('#Container1').fadeOut(500);
                setTimeout(function() {
                    $('#Stage').empty();
                    $('#Bottom').empty();
                    End(); 
                }, 500);
            }, 1500);
        }
    }

    function End() {
        var Title = null;
        CreateDiv('Stage', 'TextBoxDiv');
        setTimeout(function() { 
            Title = '<div class="col-md-12 text-center">\n\
                             <div class="page-header">\n\
                                 <h1> You have finished the game!</h1></div></div> <div class="col-md-12 text-center"><div class="page-header"><h2> Next you have one survey and three questionnaires to fill. Thank you!</h2>\n\
                                 </div></div>';
            $('#TextBoxDiv').html(Title);
            setTimeout(function() {
                    RatingSurveyPageDetails(InsertRating, RatingJson);//show rating Questionnaire at the end of the block
                    //SurveyPageDetails(InsertQCAE, QCAEJson);//show QCAE Questionnaire        
                }, 3000);
            }, 1000);   
    }
     
    //Utility Functions - returns a random number rounded
    function randomArrayShuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function shuffleBlocks(nestedBlocks){
     
      randomArrayShuffle(nestedBlocks);
      //console.log(nestedBlocks);
      var blocks_shuffled = new Array(nestedBlocks.length * nestedBlocks[0].length);
      var i=0;
      var k=0;
      //console.log(nestedBlocks[i]);
      for (var j=0; j < nestedBlocks[i].length; j++)
      {
        for (i; i < nestedBlocks.length; i++) 
        {
          blocks_shuffled[k] = nestedBlocks[i][j];
          k++;
        }
        i=0;
      }
        return blocks_shuffled;
    }

    function CreateCode() {
        return Math.floor(Math.random() * 10000000000);
    }

    function Sign(x) {
        return x > 0 ? 1 : x < 0 ? -1 : 0;
    }

    function CreateDiv(ParentID, ChildID) {
        var d = $(document.createElement('div')).attr("id", ChildID);
        var container = document.getElementById(ParentID);
        d.appendTo(container);
    }

    function SurveyPageDetails(insertSurveyFunc, jsonDet){       
        var JsonDetails =  JSON.parse(JSON.stringify(jsonDet));
        var survey_details = new Survey.Model(JsonDetails);
        $('#Bottom').empty();
        $("#Stage").Survey({
            model: survey_details,
            onComplete: insertSurveyFunc
        });
    }

    //retrieve and suffle the data, so the order of situations is random
    function retrieveExpData(gender){

        if(gender == "man"){ 
            jsonData =  randomArrayShuffle(JSON.parse(JSON.stringify(data_male)).data);
        }
        else{
            jsonData =  randomArrayShuffle(JSON.parse(JSON.stringify(data_female)).data);
        }       
    }

    function InsertRating(survey) {
        $('#TextBoxDiv').remove();
        $('#Stage').empty();
        //send Ajax request to your web server.
        var Json1=[survey.data];
        var csv = ConvertToCSV_quest(Json1);
        //console.log("The results are:" +csv);

        $.ajax({
            type: 'POST',
            data: {
                ID: SubID,
                partID: partID,
                responses:csv
            },
            //async: false,
            url: 'php/InsertSurveyData.php',
            dataType: 'json',
            success: function(r) {
                if (r[0].ErrorNo > 0) {
                    Error();
                } 
                else {
                    var Title = '<h2 align = "center"><p>You have completed end of experiment survey.</p><p>Starting questionnaire 1.</p></h2>';
                    setTimeout(function() { 
                        $('#Stage').html(Title);
                        setTimeout(function() {
                            SurveyPageDetails(InsertQCAE, QCAEJson);//show QCAE Questionnaire        
                        }, 3000);
                    }, 1000);
                    //$('#Main').removeClass('container-fluid').addClass('container');
                    //$('#Stage').removeClass('row-fluid').addClass('row');
                    //$('#Stage').empty();
                    //$('#Bottom').empty();
                    //SurveyPageDetails(InsertQCAE, QCAEJson);//show QCAE Questionnaire        

                }
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            });
    }

    function InsertDemog(survey) {
        $('#TextBoxDiv').remove();
        $('#Stage').empty();
        var Json1=[survey.data];
        var csv = ConvertToCSV_quest(Json1);
        //console.log("The results are:" +csv);
        //save participant's gender
        participant_gender = Json1[0]["question2"];//woman, man, non-binary, prefer not to say
        console.log("Participant's gender is " + participant_gender);
        retrieveExpData(participant_gender);
        $.ajax({
                type: 'POST',
                data: {
                    ID:SubID,
                    partID: partID,
                    Responses:csv
                },
                //async: false,
                url: 'php/InsertDemogData.php',
                dataType: 'json',
                success: function(r) {
                    if (r[0].ErrorNo > 0) {
                        Error();
                    } else {
                        $('#Stage').empty();
                        $('#Bottom').empty();
                        //genInstructions(1); //present general instructions screen
                        AvatarSelection();
                    }
                }, 
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            });
    }

    function InsertQCAE(survey) {
        $('#TextBoxDiv').remove();
        $('#Stage').empty();
        //send Ajax request to your web server.
        var Json1=[survey.data];
        var csv = ConvertToCSV_quest(Json1);
        //console.log("The results are:" +csv);        
        $.ajax({
            type: 'POST',
            data: {
                ID:SubID,
                partID: partID,
                Responses:csv
            },
            //async: false,
            url: 'php/InsertQCAEData.php',
            dataType: 'json',
            success: function(r) {
                if (r[0].ErrorNo > 0) {
                    Error();
                } 
                else {
                    var Title = '<h2 align = "center"><p>You have completed questionnaire 1 out of 3.</p><p>Starting questionnaire 2.</p></h2>';
                    setTimeout(function() { 
                        $('#Stage').html(Title);
                        setTimeout(function() {
                            SurveyPageDetails(InsertPTM, PTMJson);//show PTM Questionnaire          
                        }, 3000);
                    }, 1000);  
                            
                }
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            });
    }

    function InsertPTM(survey) {
        $('#TextBoxDiv').remove();
        $('#Stage').empty();
        //send Ajax request to your web server.
        var Json1=[survey.data];
        var csv = ConvertToCSV_quest(Json1);
        //console.log("The results are:" +csv);        
        $.ajax({
            type: 'POST',
            data: {
                ID:SubID,
                partID: partID,
                Responses:csv
            },
            //async: false,
            url: 'php/InsertPTMData.php',
            dataType: 'json',
            success: function(r) {
                if (r[0].ErrorNo > 0) {
                    Error();
                } 
                else {
                    var Title = '<h2 align = "center"><p>You have completed questionnaire 2 out of 3.</p><p>Starting questionnaire 3.</p></h2>';
                    setTimeout(function() { 
                        $('#Stage').html(Title);
                        setTimeout(function() {
                            SurveyPageDetails(InsertSPIN, SPINJson);//show SPIN Questionnaire          
                        }, 3000);
                    }, 1000);  
                            
                }
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            });
    }

    function InsertSPIN(survey) {
        $('#TextBoxDiv').remove();
        $('#Stage').empty();
        //send Ajax request to your web server.
        var Json1=[survey.data];
        var csv = ConvertToCSV_quest(Json1);
        //console.log("The results are:" +csv);
        $.ajax({
            type: 'POST',
            data: {
                ID:SubID,
                partID: partID,
                Responses:csv
            },
            //async: false,
            url: 'php/InsertSPINData.php',
            dataType: 'json',
            success: function(r) {
                if (r[0].ErrorNo > 0) {
                    Error();
                } else {
                    //insert data to finished table, incl bonus
                    InsertFinishedAjax();

                    //$('#Stage').empty();
                    $('#Bottom').empty();
                    CreateDiv('Stage', 'TextBoxDiv');
                    //var Title = '<div class="col-md-12 text-center"><div class="page-header"><h2>Thanks for participating!</div></div></h2><div class="col-md-12 text-center"><div class="page-header"><h2> Your completion code is: '+SubID +'<h2></div></div>';
                    var Title = '<div class="col-12 text-center">\n\
                                    <div class="page-header"><h2>Thanks for participating!<br>';
                    
                    Title = Title + '<div class="col-12 text-center">\n\
                                    <div class="page-header"><h2>To confirm your participation, press <a href="https://app.prolific.co/submissions/complete?cc=44789873" target="_blank">here</a> to return to Prolific.<h2></div></div>';
                    $('#TextBoxDiv').html(Title); 
                }
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });
    }
   
    function ConvertToCSV_quest(objArray){
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    var num = index.match(/\d+/g);
                    /*if (line !== '') {
                     line += ',' ;
                    } */
    //console.log(num);                  
                line += index+','+array[i][index]+'\r\n';                  
            }
            str += line + '\r\n';      
      }
        return str;
    }
 
    function checkDuplicateParticipant(){
        $.ajax({
            type: 'POST',
            data: {partID: partID},
            //async: false,
            url: 'php/CheckPartId.php',
            dataType: 'json',
            success: function (r) {
                console.log("dupl check result: "+ (r == true));
                if (r == true) {
                    Duplicate();
                } else {
                    SurveyPageDetails(InsertDemog, DemogJson); //show demographic survey
                };
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });      
    }

    function InsertDataAjax(TrialNum, Choice, advisor_choice, Side, RT_participant, RT_advisor, participant_reward, advisor_reward, moodType, moodName, situationType, situationName, Preferred, preferredName, RandomNum, who_chosen, participant_score, advisor_score, p_participant){
        var  ThisTime = (new Date()).getTime(); 
        $.ajax({
            type: 'POST',
            data: {
                ID:SubID, 
                partID: partID, 
                trial_num:TrialNum, 
                choice:Choice,
                stimuli_type: stimuliType,
                exp_type: exp_type,
                advisor_choice: advisor_choice, 
                side:Side, 
                participant_reward:participant_reward,
                advisor_reward:advisor_reward, 
                RT_participant:RT_participant,
                RT_advisor:RT_advisor, 
                client_time:ThisTime, 
                actor:currentActor,  
                actor_name: actor_name, 
                mood_type: moodType, 
                mood_name: moodName, 
                situation_type: situationType,
                situation_name: situationName, 
                preferred:Preferred, 
                preferred_name: preferredName,
                random_num: RandomNum,
                who_chosen: who_chosen,
                participant_score: participant_score,
                advisor_score: advisor_score,
                p_participant: p_participant
            },
            cache: false,
            url: 'php/InsertTrialData.php',
            dataType: 'json',
            success: function(r) {
               if (r[0].ErrorNo > 0) {
                    Error();
                }           
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });        
    }

    function InsertFinishedAjax(){     
        $.ajax({
            type: 'POST',
            data: {ID:SubID, partID: partID, gender: participant_gender, part_avatar: participant_avatar, exp_type: exp_type, advisor_type: advisor_type},
            //async: false,
            url: 'php/FinishCode.php',
            dataType: 'json',
            success: function(r) {
                if (r[0].ErrorNo > 0) {
                    Error();
                } 
            }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            }
        });         
    }
     
    function Duplicate(){
        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<h3 align = "center">It looks like you have already participated in this experiment. <br>Please contact us if this is not the case (<a href = "mailto: ekozakev@campus.haifa.ac.il">ekozakev@campus.haifa.ac.il</a>).<br><h1 align = "center">Thank you!</h3>';
        $('#TextBoxDiv').html(Title );       
    }

    function MobileNotice(){       
        CreateDiv('Stage', 'TextBoxDiv');
        var Title = '<h3 align = "center">You seem to attempt to perform the experiment on your smartphone. <br> <br> This experiment does not display well on a smartphone. Please try again using a desktop or a laptop. <br><h1 align = "center">Thank you!</h3>';
        $('#TextBoxDiv').html(Title );   
    }    

    function repeatSequence(sequences, times) {
        // times has to be a multiple of sequences.length
        if (times % sequences.length !== 0)
            return console.log("times has to be a multiple of sequences.length");

        // Remap our sequence-array so we can store the count it has been used
        var seqmap = [];
        for (var seqid = 0; seqid < sequences.length; seqid++)
            // Push the current sequence n times; n = times/sequences.length
            for (var idx = 0; idx < times/sequences.length; idx++)
                seqmap.push(sequences[seqid]);
        //console.log(seqmap);

        var resultmap = [];
        // Now just select and remove a random sequence from our seqmap, until it is empty
        while (!seqmap.length == 0) {
            // Select a random element
            //var randomidx = Math.floor(Math.random()*seqmap.length);
            var randomidx = 0;
            var currentElement = seqmap[randomidx];
            // remove the random element from seqmap...
            seqmap.splice(randomidx, 1);
            // .. and push it to the resultmap
            resultmap.push(currentElement);
            randomidx= randomidx + 1;
        }

        // now our resultmap looks like [[1],[2],[3]]... just flatten it!
        var result = resultmap.reduce( function(a, b) {
            return a.concat(b);
        });

        return result;      
    }

    function RatingSurveyPageDetails(insertSurveyFunc, jsonDet){
        var JsonDetails =  JSON.parse(JSON.stringify(jsonDet));
        var survey_details = new Survey.Model(JsonDetails);
        var title_pref_response = 'If YOU had to choose the most suitable response for';
        var title_ending = ' in distress, it would be';
        var target_title = title_pref_response + ' YOUR FRIEND ' + actor_name + title_ending;
        var advisor_title = title_pref_response + ' the OTHER PLAYER ' + advisor_name + title_ending;
        var advisor_adv_title = 'If the OTHER PLAYER ' + advisor_name + ' had to choose the most suitable response for your MUTUAL FRIEND '+ actor_name + title_ending;
        var new_target_title = title_pref_response + ' your ANOTHER FRIEND Sam' + title_ending;
        var helping = "Rate " + advisor_name + ",  the OTHER PLAYER, as a good friend who helps others in distress.";
        var liking = "How much did you like interacting with " + advisor_name + ", the OTHER PLAYER?";
        var distraction = "How much do you think suggesting 'doing something to be distracted from the situation' is a good approach to help others in distress?";
        var reappraisal = "How much do you think suggesting 'rethinking the situation from a different viewpoint' is a good approach to help others in distress?";
        //how much did you feel connected to the other player
        //how much would you like to participate in the same group again with the other player
        //how much would like to know the other player better
        //how much do you feel that you can understand the other player
        //how much do you identify with the other player
        
        survey_details.setVariable("participant_avatar", participant_avatar);
        survey_details.setVariable("target_title", target_title);
        survey_details.setVariable("target_name", actor_name);
        survey_details.setVariable("advisor_title", advisor_title);
        survey_details.setVariable("advisor_name", advisor_name);
        survey_details.setVariable("target_title", target_title);
        survey_details.setVariable("new_target_title", new_target_title);
        survey_details.setVariable("advisor_adv_title", advisor_adv_title);
        survey_details.setVariable("target_pic", ClientPic);
        survey_details.setVariable("advisor_pic", advisor_avatar);
        survey_details.setVariable("new_target_pic", 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Prescription02&hairColor=Brown&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light');
        survey_details.setVariable("liking", liking);
        survey_details.setVariable("helping", helping);
        survey_details.setVariable("distraction", distraction);
        survey_details.setVariable("reappraisal", reappraisal);
        
        $('#Main').removeClass('container').addClass('container-fluid');
        $('#Stage').removeClass('row').addClass('row-fluid');
        $("#Stage").Survey({
            model: survey_details,
            onComplete: insertSurveyFunc
        });
        $('#Bottom').empty();
    }

         //change the text color of the response
                //$(this).parent().addClass('text-white'); 
});