const KanyeMax = 18
const TaylorMax = 5
let KanyeFirst = false

function getFile(max, person) {
    return new Promise((resolve, reject) => {
      let randNum = Math.floor(Math.random() * (max - 1));
      fetch("https://raw.githubusercontent.com/HeyImCub/TKanye/main/"+person+"_output_"+randNum+".txt")
        .then(response => response.text())
        .then(data => {
          const lines = data.split('\n'); // Split data into an array of lines
          const randomLine = lines[Math.floor(Math.random() * lines.length)]; // Select a random line
  
          resolve(randomLine); // Resolve the Promise with the random line
        })
        .catch(error => {
          reject(error); // Reject the Promise with the error
        });
    });
  }
    




async function SetLyrics(){
    try {
        const Kanye = await getFile(KanyeMax,"Kanye")
        const Taylor = await getFile(TaylorMax,"Taylor")
        let num = Math.random() < 0.5 ? 0 : 1;
        
        if(num == 0){
            KanyeFirst = true
            
            document.getElementById("Lyric1").textContent = Kanye
            document.getElementById("Lyric2").textContent = Taylor
            
        }else{
            document.getElementById("Lyric1").textContent = Taylor
            document.getElementById("Lyric2").textContent = Kanye
        }
    } catch (error) {
        console.log("Error", error)
    }
}


function CalculateGame(){
    const people1Guess = document.getElementById("People1").value;
    const people2Guess = document.getElementById("People2").value;
    if(people1Guess == people2Guess){
        return alert("Please select two seperate artists")
    }
    console.log(KanyeFirst)
    if(KanyeFirst) {
        if (people1Guess == "Kanye"){
            document.getElementById("Result").textContent = "Correct!"
        }else{
            document.getElementById("Result").textContent = "Incorrect"
        }
    }else{
        if (people1Guess == "Taylor"){
            document.getElementById("Result").textContent = "Correct!"
        }else{
            document.getElementById("Result").textContent = "Incorrect"
        }
    }
}

function setSelectedArtist(buttonId, artist) {
    const button = document.getElementById(buttonId);
    button.textContent = artist;
}

document.addEventListener("click", function(event) {
    const dropdownItem = event.target;
    const dropdownMenu = dropdownItem.closest(".dropdown-menu");
    
    // Check if the clicked element is inside a dropdown menu
    if (dropdownMenu) {
      const button = dropdownMenu.previousElementSibling;
      const artist = dropdownItem.textContent.trim();
      const buttonId = button.id;
      
      setSelectedArtist(buttonId, artist);
    }
  });
