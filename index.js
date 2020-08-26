const core = require('@actions/core');
const github = require('@actions/github');
var request = require('request');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const userName = core.getInput('user-name-secret');
  console.log(`Hello Hello1 ${nameToGreet}!`);
  console.log('testing1');
  console.log(userName);
  console.log("test"+core.getInput('user-name-secret'));
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
  authenticate('http://ec2-3-6-118-186.ap-south-1.compute.amazonaws.com/','prasad','password1')
} catch (error) {
  core.setFailed(error.message);
}


function authenticate(CRurl, loginID,password){ 
var userCred={ Username:loginID, Password:password};
   request(
    {headers: {
      'Content-Type': 'application/json'
    },
    url: CRurl+'/v1/authentication',
    body: JSON.stringify(userCred),
    method: 'POST'},
    function (error, response, body) {

        if (!error && response.statusCode == 200) {

           
            thisSession = req.session;
            console.log("results");
            var parsedBody=JSON.parse(body);
            console.log(parsedBody);
    	    	thisSession.token = parsedBody.token;
            //global.thisSessionToken=parsedBody.token;
    		console.log('token'+thisSession.token)
            return thisSession.token;
        }
        else  if (body.code=="UM1110" && response.statusCode != 200 )
        	res.send({status:"Login Failed"});
    }
);
   }