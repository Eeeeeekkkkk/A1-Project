"use strict";

/** This object sets up the word search game, as well as button functions (for solving
 * and for refreshing/setting up a new game).
 *
 * @author Noor Aftab
 *	
 * @param {String} gameId ID of the word search game div (where the actual grid of letters goes)
 * @param {String} listId ID of the div where the list of words to find goes
 * @param {String} solveId ID for button to solve the puzzle
 * @param {String} newGameId ID for button to start a new game
 * @param {String} instructionsId ID for the h2 heading (to allow us to update it's text with ease)
 * @param {String} themeId ID for part of the h3 heading (to show the theme of the word search)
 */

function WordSearchController(gameId, listId, solveId, newGameId, instructionsId, themeId) {

	//an object containing various themes/words for the game
	var searchTypes = {

		"Ink of Memory": [["personal", "cultural", "story", "behind"],
			["family", "tattoo", "element", "symbolism"],
			["represent", "fine line", "black", "dream"],
			["taemong", "connection", "generation", "life"],
			["tradition",  "values",  "refers", "significant"]],

		"History of Tattoos in Korean Culture": [["history", "brand", "viewed", "transitioning"],
			["expression", "time", "ancient", "joseon"], 
			["occupation", "modern", "war", "trends"],
			["influenced", "art", "form", "protect"],
			["medical", "against", "public", "rule"]],

		"Symbolism of Hanbok": [["korean", "hanbok", "heritage", "cultural"],
			["identity", "connects", "color", "signify"],
			["harmony", "nature", "balance", "design"],
			["natural", "beauty", "simple", "occasions"],
			["life", "event", "national", "key"]],

		"Tattoos Across Cultures": [["data", "symbolism", "global", "celtic"],
			["scotland", "eternal life", "animals", "spiritual"],
			["stories", "link", "history", "samoan"],
			["honour", "generations", "tribal", "japanese"],
			["irezumi", "maori", "form", "path"]],

		"Tattoo Symbolism": [["western", "christianity", "cross", "angel"],
			["dove", "hope", "greek", "gods"],
			["tree", "athena", "celtic", "knots"],
			["life", "chinese", "dragon", "phoenix"],
			["rebirth", "tigers", "magpies", "feathers"]],

		"First Tattoo Age-Related Trends": [["usa", "uk", "south korea", "japan"],
			["time line", "self expression", "life", "generational"],
			["differences", "view", "trends", "link"],
			["personal", "acceptance", "journey", "meaningful"],
			["event", "loved ones", "symbols", "identity"]]

	};

	//variables to store game logic and it's view
	var game;
	var view;

	//instructions to display in h2 header
	var mainInstructions = "Search for the list of words inside the box and click-and-drag to select them!";

	//function call to start the word search game
	setUpWordSearch();

	/** randomly chooses a word theme and sets up the game matrix and the game 
	 * view to reflect that theme
	 */
	function setUpWordSearch() {

		//generates a random theme 
		var searchTypesArray = Object.keys(searchTypes); //converts theme object to array
		var randIndex = Math.floor(Math.random()*searchTypesArray.length); //generates random number/index
		var listOfWords = searchTypes[searchTypesArray[randIndex]]; //retrieves the matrix of words from random index

		//converts letters to uppercase
		convertToUpperCase(listOfWords); 

		//sets the headings to reflect the instructions and themes
		updateHeadings(mainInstructions, searchTypesArray[randIndex]);

		//runs the logic of the game using a close of the word list (to avoid the actual object being altered)
		game = new WordSearchLogic(gameId, listOfWords.slice());
		game.setUpGame();

		//generates the view of the game and sets up mouse events for clicking and dragging
		view = new WordSearchView(game.getMatrix(), game.getListOfWords(), gameId, listId, instructionsId);
		view.setUpView();
		view.triggerMouseDrag();

	}

	/** converts a given 2D array of words to all uppercase
	 *
	 * @param {String[][]} wordList a matrix of words to convert to uppercase
	 */
	function convertToUpperCase(wordList)  {

		for (var i = 0; i < wordList.length; i++) {

			for(var j = 0; j < wordList[i].length; j++) {

				wordList[i][j] = wordList[i][j].toUpperCase();

			}

		}

	}

	/** updates the instructions (h2) and theme (h3) headings according to the given
	 * text parameters
	 *
	 * @param {String} instructions text to set the h2 heading to
	 * @param {String} theme text to set the h3 theme element to
	 */
	function updateHeadings(instructions, theme) {

		$(instructionsId).text(instructions);
		$(themeId).text(theme);

	}

	/** solves the word search puzzle when the solve button is clicked
	 *
	 * @event WordSearchController#click
	 * @param {function} function to execute on mouse click
	 */
	$(solveId).click(function() {

		view.solve(game.getWordLocations(), game.getMatrix());

	});

	/** empties the game and list divs and replaces them with a new setup, modelling
	 * a 'refresh' effect when button is clicked
	 *
	 * @param {function} function to execute on mouse click to generate a new puzzle
	 */
	$(newGameId).click(function() {

		//empties the game and list elements, as well as the h3 theme span element
		$(gameId).empty();
		$(listId).empty();
		$(themeId).empty();

		//calls the set up to create a new word search game
		setUpWordSearch();

	})

}