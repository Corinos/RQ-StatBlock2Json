$(document).ready(function() {
	function cultSplit(cultLine){
    let cult = {};
    cult.rank = cultLine.substring(0,cultLine.indexOf(' '));
    cult.cultName = cultLine.substring(cultLine.lastIndexOf('of ') + 3);
    return cult;
  }
  function genderAgeClanSplit(genderAgeClanLine){
  	let genderAgeClan = {};
    genderAgeClan.gender = genderAgeClanLine.substring(0,genderAgeClanLine.indexOf(','));
    genderAgeClan.age = genderAgeClanLine.substring(genderAgeClanLine.indexOf(' ',genderAgeClanLine.		indexOf(' ') + 1)+1, genderAgeClanLine.indexOf('.'));
    genderAgeClan.clan = genderAgeClanLine.substring(genderAgeClanLine.indexOf('.') +2, genderAgeClanLine.indexOf('clan')-1);
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
  	return description;  
  }
  function statSplit(inputArray){
    let startIndex = inputArray.findIndex(function(item){
    		return item.indexOf("Characteristics")!==-1;
			});
    let statsString = inputArray[startIndex +1] + ' ' + inputArray[startIndex+2];
    let statsArray = statsString.split(' ');
    let stats = {};
    for (let i = 0; i < statsArray.length; i+=2){
      stats[statsArray[i]] = (statsArray[i+1] != undefined) ? Number(statsArray[i+1]) : {}
    }
    return stats;		
  }
  function runesSplit(inputArray){
    let startIndex = inputArray.findIndex(function(item){
      return item.indexOf("Runes")!==-1;
    });
    let runesString = inputArray[startIndex];
    let runesArray = runesString.split(' ');
    runesArray.splice(0,1);
    let runes={};
    for (let i = 0; i < runesArray.length; i+=2){
      runes[runesArray[i]] = (runesArray[i+1] != undefined) ? Number(runesArray[i+1].replace(/[^\d.-]/g, '')) : {}
      }
    return runes;  
  }
  function spellsSplit(inputArray, spellType){
    let startIndex = inputArray.findIndex(function(item){
      return item.indexOf(spellType)!==-1;
    });
    let spells = {};
    let spellsString = inputArray[startIndex];
    spellsString.replace(':',',');
    let spellsArray = spellsString.split(/:|,/g);
    spellsArray.splice(0,1);
	  for (let i = 0; i < spellsArray.length; i+=1){
      spellsArray[i] = spellsArray[i].trim();
      spellsArray[i] = spellsArray[i].replace('.','');
	  }
    return spellsArray;
  }
  function runePointsSplit(inputArray){
    let startIndex = inputArray.findIndex(function(item){
      return item.indexOf("Rune Points:")!==-1;
    });
    let runePoints = {}
    let runePointsString = inputArray[startIndex];
    let runePointsValue = runePointsString.replace(/\D+/g, '');
    let pointsCult = runePointsString.match(/\((.*?)\)/g);
	  pointsCult[0] = pointsCult[0].replace(/\(/,'');
  	pointsCult[0] = pointsCult[0].replace(/\)/,'');
    runePoints[pointsCult] = runePointsValue; 
  	return runePoints;
  }
  
  function skillsSplit(inputArray) {
      let startIndex = inputArray.findIndex(function(item){
    return item.indexOf("Skills:")!==-1;
  });
  let endIndex = inputArray.findIndex(function(item){
    return item.indexOf("Languages:")!==-1;
  });
  let i = startIndex;
  let skillsString = '';
    while(i<endIndex){
      skillsString = skillsString + inputArray[i];
      if(i< endIndex-1){
      skillsString = skillsString + ' ';
      }
      i++;
    }
  const skillsArray = skillsString.split(', ');
  const skills = {};
  skillsArray[skillsArray.length -1] = skillsArray[skillsArray.length -1].replace('.','');
  skillsArray[0] = skillsArray[0].substring(8);
  skillsArray.forEach(skill => {
    const name = skill.substring(0,skill.length-4);
    skill = skill.replace('%','');
    const percentage = skill.substring(skill.length-2);
    skills[name] = parseInt(percentage, 10);
  });
  return skills;
}
function passionsSplit(inputArray) {
  let startIndex = inputArray.findIndex(function(item){
    return item.indexOf("Passions:")!==-1;
  });
  let endIndex = inputArray.findIndex(function(item){
    return item.indexOf("Armor:")!==-1;
  });
  let i = startIndex;
  let passionsString = '';
    while(i<endIndex){
      passionsString = passionsString + inputArray[i];
      if(i< endIndex-1){
      passionsString = passionsString + ' ';
      }
      i++;
    }
  const passionsArray = passionsString.split(', ');
  const passions = {};
  passionsArray[passionsArray.length -1] = passionsArray[passionsArray.length -1].replace('.','');
  passionsArray[0] = passionsArray[0].substring(10);
  passionsArray.forEach(passion => {
    let name = passion.substring(0,passion.length-4);
    passion = passion.replace('%','');
    const percentage = passion.substring(passion.length-2);
    passions[name] = parseInt(percentage, 10);
  });
  return passions;
}
function split(inputArray,startSection,endSection) {
  let startIndex = inputArray.findIndex(function(item){
    return item.indexOf(startSection)!==-1;
  });
  let endIndex = inputArray.findIndex(function(item){
    return item.indexOf(endSection)!==-1;
  });
  let i = startIndex;
  let splitString = '';
  if(endIndex===-1){
    splitString = inputArray[startIndex];
  }else{
    while(i<endIndex){
      splitString = splitString + inputArray[i];
      if(i< endIndex-1){
      splitString = splitString + ' ';
      }
      i++;
    }
  };
  const splitArray = splitString.split(', ');
  const splitObject = {};
  splitArray[splitArray.length -1] = splitArray[splitArray.length -1].replace('.','');
  splitArray[0] = splitArray[0].replace(startSection+': ','');
  splitArray.forEach(item => {
    item = item.replace('%','');
    let name = item.substring(0,item.length-3);
    const percentage = item.substring(item.length-2);
    splitObject[name] = parseInt(percentage, 10);
  });
  return splitObject;
}
function getRansom(inputArray){
  let startIndex = inputArray.findIndex(function(item){
    return item.indexOf('Ransom')!==-1;
  });
  if(startIndex!=-1){
  let ransomString = inputArray[startIndex];
  let ransom = ransomString.replace('Ransom: ','');
  return ransom;
  }else{
  return 0
  }
}

    
  $('#converterForm').submit(function(event) {
    event.preventDefault();
    // Get the input text
    var inputText = $('#textInput').val();
    var stringArray = inputText.split('\n');
		var cult = cultSplit(stringArray[1]);
    var genderAgeClan = genderAgeClanSplit(stringArray[2]);
    var desc = descriptionSplit(stringArray);
		var stats = statSplit(stringArray);
    var runeSpells = spellsSplit(stringArray, 'Rune Spells');
    var runePoints = runePointsSplit(stringArray);
    var spiritMagic = spellsSplit(stringArray, 'Spirit Magic') ;
		let passions = split(stringArray,"Passions","Armor");
		let skills = split(stringArray,"Skills","Languages");
		let runes = split(stringArray,"Runes","Rune Points");
    let languages = split(stringArray,"Languages","Ransom")
    let ransom = getRansom(stringArray);
    // Define the template for conversion
    var jsonOutput = {
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
      "runes": runes,
      "runePoints": runePoints,
      "runeSpells": runeSpells,
      "spiritMagic": spiritMagic,
      "passions": passions,
      "skills": skills,
      "languages": languages,
      "ransom": ransom
    };

    // Display the JSON output
    $('#output').text(JSON.stringify(jsonOutput));
  });
});
