
// Define a global variable to store the script path (extensionRoot)
var scriptPath; 

// Define the function to set the script path from index.html
function setScriptPath(path) {
    scriptPath = path;
}

// Function to check if a text layer is selected AEFT
function isTextLayerSelected() {
  var comp = app.project.activeItem;
  if (comp && comp instanceof CompItem) {
    var selectedLayers = comp.selectedLayers;
    for (var i = 0; i < selectedLayers.length; i++) {
      if (selectedLayers[i] instanceof TextLayer) {
        return true;
      }
    }
  }
  return false;
}

