window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function (json) {
         const topSection = document.getElementById("missionTarget");
         let index = Math.floor(Math.random()*6);
         topSection.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].earth}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">
      `
      });
   });
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotNameInput = document.getElementById("pilotName").value;
      let coPilotNameInput = document.getElementById("copilotName").value;
      let fuelLevelInput = document.getElementById("fuelLevel").value;
      let cargoMassInput = document.getElementById("cargoMass").value;
      let faultyItems = document.getElementById("faultyItems");
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `Co-pilot ${coPilotNameInput} is ready for launch`;

      if (pilotNameInput === "" || coPilotNameInput === "" || fuelLevelInput === "" || cargoMassInput === "") {
         alert("All Fields Are Required!");
      } else if (!isNaN(pilotNameInput) || !isNaN(coPilotNameInput) || isNaN(fuelLevelInput) || isNaN(cargoMassInput)) {
         alert("Make sure to enter valid information for each field"); 
      } else if (fuelLevelInput < 10000) {
         faultyItems.style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
            if (cargoMassInput > 10000) {
               document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
            } else {
               document.getElementById("cargoStatus").innerHTML = "Cargo mass is low enough for launch";
            }
      } else if (cargoMassInput > 10000) {
         faultyItems.style.visibility = "visible";
         document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
         if (fuelLevelInput < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         } else {
            document.getElementById("fuelStatus").innerHTML = "Fuel level is high enough for launch";
         }
      } else if (fuelLevelInput >= 10000 && cargoMassInput <= 10000) {
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "green";
         faultyItems.style.visibility = "hidden";
      }
   });
});