$(document).ready(function() {
	function cultSplit(cultLine){
    console.log(`cultLine: ${cultLine}`);
    let cult = {};
    cult.rank = cultLine.substring(0,cultLine.indexOf(' '));
    console.log(`Rank: ${cult.rank}`);
    cult.cultName = cultLine.substring(cultLine.lastIndexOf('of ') + 3);
    console.log(`Cult: ${cult.cultName}`);
    return cult;
  }
  function genderAgeClanSplit(genderAgeClanLine){
  	console.log(`genderAgeClanLine: ${genderAgeClanLine}`);
  	let genderAgeClan = {};
    genderAgeClan.gender = genderAgeClanLine.substring(0,genderAgeClanLine.indexOf(','));
    console.log(`Gender: ${genderAgeClan.gender}`);
    genderAgeClan.age = genderAgeClanLine.substring(genderAgeClanLine.indexOf(' ',genderAgeClanLine.		indexOf(' ') + 1)+1, genderAgeClanLine.indexOf('.'));
    console.log(`Age: ${genderAgeClan.age}`)
    genderAgeClan.clan = genderAgeClanLine.substring(genderAgeClanLine.indexOf('.') +2, genderAgeClanLine.indexOf('clan')-1);
    console.log(`Clan: ${genderAgeClan.clan}`)
    return genderAgeClan;
  }
  function descriptionSplit(inputArray){
  let endIndex = inputArray.findIndex(function(item){
    return item.indexOf("Characteristics")!==-1;
});
  let i = 3;
  let description = '';
  while(i<endIndex){
		description = description + inputArray[i];
    if(i< endIndex-1){
    description = description + ' ';
    }
    i++;
  	}
    console.log(`Description: ${description}`);
  	return description;  
  }
  function statSplit(inputArray){
    let startIndex = inputArray.findIndex(function(item){
    		return item.indexOf("Characteristics")!==-1;
			});
    let statsString = inputArray[startIndex +1] + ' ' + inputArray[startIndex+2];
    console.log(statsString);
    let statsArray = statsString.split(' ');
    console.log(statsArray);
    let statJson = JSON.parse(statsArray);
    console.log(JSON.stringify(statJson));
    let stats = {};
    var chunks = [];

		for (var i = 0, charsLength = statsString.length; i < charsLength; i += 7) {
    		chunks.push(statsString.substring(i, i + 7));
		}
    chunks.forEach(function(chunk){
 			let newChunks = [];
    	if(chunk.length > 6){
      	chunk = chunk.slice(0,-1);
        newChunks.push(chunk);
      }else{
        value = Number(chunk.substring(3));
        stats[key] = value;
        console.log(`Key: ${key}, Value: ${value}`);
      	newChunks.push(chunk);
      }
    });
    console.log(typeof stats);
    console.log(`Stats: ${JSON.stringify(stats)}`);
    console.log(typeof stats);
    stats.replace(/&quot;/g,'"');

  }
  $('#converterForm').submit(function(event) {
    event.preventDefault();

    // Get the input text
    var inputText = $('#textInput').val();
    var stringArray = inputText.split('\n');
    $('#array').text(stringArray);
		var cult = cultSplit(stringArray[1]);
    var genderAgeClan = genderAgeClanSplit(stringArray[2]);
    var desc = descriptionSplit(stringArray);
		var stats = statSplit(stringArray);
    
    // Define the template for conversion
    var template = {
      "name": inputText.substring(0, inputText.indexOf("\n")),
      "cultRank": cult.rank,
      "cult": cult.cultName,
      "gender": genderAgeClan.gender,
      "age": genderAgeClan.age,
      "clan": genderAgeClan.clan,
      "description": desc,
      "characteristics": {
        "str": stats.STR,
        "con": stats.CON,
        "siz": stats.SIZ,
        "int": stats.INT,
        "dex": stats.DEX,
        "pow": stats.POW,
        "cha": stats.CHA
      },
      "runes": {},
      "runePoints": 0,
      "runeSpells": {},
      "magicPoints": 0,
      "spiritMagic": {},
      "passions": {},
      "armour": {},
      "skills": {},
      "languages": {},
      "ransom": 0
    };

    // Convert the template to JSON
    var jsonOutput = JSON.stringify(template);

    // Display the JSON output
    $('#output').text(jsonOutput);
  });
});
