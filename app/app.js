$(document).ready(function() {

    var movies = {
        action: {
            "0": ["Star Wars: Episode V - The Empire Strikes Back", "Spartacus", "Sicario", "The Lord of the Rings: The Two Towers", "Chicken Run"],
            "1": ["Badlands", "Aguirre, the Wrath of God", "Casino Royale", "Hunt for the Wilderpeople", "The Lego Batman Movie"],
            "2": ["Misison: Impossible Rogue Nation", "Kubo and the Two Strings", "Throne of Blood", "Once Upon a Time in the West", "Captain America: Civil War"],
            "3": ["Star Wars: Episode IV - A New Hope", "The French Connection", "Iron Man", "Marvel's The Avengers", "Aliens"],
            "4": ["The LEGO Movie", "The Searchers", "Star Trek", "Moana", "The Terminator"],
            "5": ["Apocalyse Now", "Harry Potter and the Deathly Hallows-Part 2", "Jaws", "WALL-E", "The Hurt Locker"],
            "6": ["The 39 Steps", "Skyfall", "The Jungle Book", "Spider-Man: Homecoming", "War for the Planet of the Apes"],
            "7": ["The Treasure of Sierra Madre", "Up", "Baby Driver", "Lawrence of Arabia", "The Dark Knight"],
            "8": ["The Adventure of Robin Hood", "Logan", "Star Wars: Episode VII", "Zootopia", "Seven Samurai"],
            "9": ["Mad Max: Fury Road", "Metropolis", "Dunkirk", "Wonder Woman", "King Kong"]
        },
        drama: {
            "0": ["The Wrestler", "La Confidential", "Gone With The Wind", "Open City", "Tokyo Story"],
            "1": ["The Confirmist", "Touch of Evil", "The Dark Knight", "Rebecca", "La La Land"],
            "2": ["A Streecar Named Desire", "The Night of the Hunter", "Lawrence of Arabia", "The Babadook", "Vertigo"],
            "3": ["12 Angry Men", "The 400 Blows", "All Quiet on the Western Front", "Army of Shadows", "Baby Driver"],
            "4": ["Seven Samurai", "Bicycle Thieves", "Hell or High Water", "The Treasure of Sierra Madre", "Arrival"],
            "5": ["Rear Window", "Taxi Driver", "Argo", "M", "Alien"],
            "6": ["Gravity", "Sunset Boulevard", "Selma", "Logan", "Rashoman"],
            "7": ["The Battle of Algiers", "The Maltese Falcon", "12 Years a Slave", "Repulsion", "Spotlight"],
            "8": ["Moonlight", "Casablanca", "Wonder Woman", "La Grande Illusion", "Boyhood"],
            "9": ["Ciizen Kane", "All About Eve", "Metropolis", "The Godfather", "Dunkirk"]
        },
        romance: {
            "0": ["West Side Story", "Say Anything...", "The Apartment", "Elevartor to the Gallows", "Groundhog Day"],
            "1": ["The Happiest Day in the Life of Olli Maki", "Only Yesteerday", "Lost in Translation", "The Crying Game"],
            "2": ["Your Name.", "Crouching Tiger, Hidden Dragon", "Wings of Desire", "Sense and Sensibility", "The Handmaiden"],
            "3": ["The Princess Bride", "Sideways", "Enough Said", "Slumdog Millionaire", "Bull Durham"],
            "4": ["Before Sunrise", "Three Colors: Blue", "Bringing Up Baby", "The Hustler", "Sunrise: A Song of Two Humans"],
            "5": ["Her", "The Umbrellas of Cherbourg", "Beauty and the Beast", "Three Colors: Red", "The Best Years of Our Lives"],
            "6": ["City Lights", "Annie Hall", "Miracle on 34th Street", "Beauty and the Beast", "Gentelman Prefer Blondes"],
            "7": ["An American in Paris", "Before Midnight", "The Red Shoes", "The Artist", "Carol"],
            "8": ["The Philadelphia Story", "Vertigo", "Gone with the Wind", "On the Waterfront", "Roman Holiday"],
            "9": ["It Happened One Night", "Singin' in the Rain", "Casablanca", "The Big Sick", "The Adventures of Robin Hood"]
        },
        horror: {
            "0": ["Dracula", "Zombieland", "It", "Suspiria", "What Ever Happend to Baby Jane"],
            "1": ["Re-Animator", "A Nightmare on Elm Street", "Train to Busan", "The Host", "Shaun of the Dead"],
            "2": ["The Loved Ones", "Nosferatu: Phanton der Nacht", "Room 237", "The Love Witch", 'It Comes at Night'],
            "3": ["The Evil Dead", "Invasion of the Body Snatchers", "Young Frankenstein", "Carrie", "Halloween"],
            "4": ["The Innocents", "Silence of the Lambs", "Cat People", "A Girl Walks Home Alone at Night", "Drag Me to Hell"],
            "5": ["The Cabin in the Woods", "Night of the Living Deaad", "Don't Look Now", "The Vanishing", "Under The Shadow"],
            "6": ["Pan's labyrinth", "Evil Dead 2: Dead by Dawn", "The Birds", "Gojira", "The Witch"],
            "7": ["It Follows", "Let the Right One In", "Aliens", "Freaks", "Eyes Without a Face"],
            "8": ["Repulsion", "The Bride of Frankenstein", "The Babadook", "Frankenstein", "Rosemary's Baby"],
            "9": ["Get Out", "The Cabinet of Dr. Caligari", "Psycho", "Nosferatu, a Symphony of Horror", "King Kong"]
        }
    };
    //global values used for recipe search
    var dietaryVal = [],
        cuisineVal = "",
        includeVal,
        excludeVal = [],
        spicyVal = 0,
        savoryVal = 0,
        saltyVal = 0,
        sweetVal = 0;

    //search terms and key for api

    //this current code is showing the functionality of the movies data structure
    var movieSearch = movies.action["9"][Math.floor(Math.random() * 4)];
    var omdbKey = "40e9cece"
    //omdb query url
    var omdbQueryURL = "http://www.omdbapi.com/?t=" + movieSearch + "&apikey=" + omdbKey;

    //omdb api call
    var omdbCall = $.ajax({
        url: omdbQueryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });

    //search terms and key for api
    var foodSearch = "curry";
    var yummlyKey = "af6e286e83053654370aa379046e6c3b";
    var allowedIngredients = [];
    var excludedIngredients = [];
    var allowedAllergery = [];
    var allowedDiet = [];
    var allowedCuisine = [];
    var excludedCuisine = [];
    var maxTotalTime = 0;
    //api query
    var yummlyQueryURL = "http://api.yummly.com/v1/api/recipes?_app_id=d10c5b70&_app_key=" + yummlyKey + "&q=" + foodSearch + "&requirePicture=true";

    //yummly api call
    var yummlyCall = $.ajax({
        url: yummlyQueryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);

    });

    //New (Mike)-
    //==============================================================
    //object to compile the search query for the api

    function hideMainPage() {
        $("#mainPage").hide();
    };

    function showMainPage() {
        $("#mainPage").show();
    }
    //test array for use with api query functions
    var testIngredientArray = ["cheese", "ham", "bread"]

    //this funciton concatenates the ingredients api query
    function createIngredientsQuery(array) {
        for (var i = 0; i < array.length; i++) {
            var convertedIngredients = "&q=" + array[i];
            includeVal.push(convertedIngredients)
        };
        console.log(includeVal)

    };

    //execute funciton
    createIngredientsQuery(testIngredientArray);

    //this funciton concatenates the excluded api query
    function createExcludedQuery(array) {
        for (var i = 0; i < array.length; i++) {
            var convertedExcluded = "&excludedIngredient[]=" + array[i];
            excludeVal.push(convertedExcluded)
        };
        console.log(excludeVal)
        return excludeVal
    };

    //execute funciton
    createExcludedQuery(testIngredientArray);

    //this function concatenates the diet api query
    //this function needs additional concatenation code
    function createDietQuery(array) {
        if (array.indexOf("atkins") !== -1) {
            console.log("atkins diet added")
            return "atkins"
        };
        if (array.indexOf("gluten-free") !== -1) {
            console.log("gluten-free diet added")
            return "gluten-free"
        }
        if (array.indexOf("paleo") !== -1) {
            console.log("paleo diet added")
            return "paleo"
        }
        if (array.indexOf("pescaterian") !== -1) {
            console.log("pescaterian diet added")
            return "pescaterian"
        }
        if (array.indexOf("vegan") !== -1) {
            console.log("vegan diet added")
            return "vegan"
        }
        if (array.indexOf("vegetarian") !== -1) {
            console.log("vegetarian diet added")
            return "vegetarian"
        }
        if (array.indexOf("south-beach") !== -1) {
            console.log("south-beach diet added")
            return "south-beach"
        }
    }


    //execute function
    createDietQuery(["atkins", "pescaterian", "south-beach"])

    //function for creating the flavor profile api query
    function createFlavorQuery(spicy, sweet, savory, salty) {
        if (spicy == 9) {
            var convertedSpicy = "&flavor.piquant.min=0." + (spicy - 1) + "&flavor.piquant.max=1";
            console.log(convertedSpicy);
        } else if (spicy < 9 && spicy > 2) {
            var convertedSpicy = "&flavor.piquant.min=0." + (spicy - 2) + "&flavor.piquant.max=0." + spicy;
            console.log(convertedSpicy);
        } else {
            var convertedSpicy = "&flavor.piquant.min=0.0&flavor.piquant.max=0." + spicy;
            console.log(convertedSpicy);
        };
        if (sweet == 9) {
            var convertedSweet = "&flavor.piquant.min=0." + (sweet - 1) + "&flavor.piquant.max=1";
            console.log(convertedSweet);
        } else if (sweet < 9 && sweet > 2) {
            var convertedSweet = "&flavor.piquant.min=0." + (sweet - 2) + "&flavor.piquant.max=0." + sweet;
            console.log(convertedSweet);
        } else {
            var convertedSweet = "&flavor.piquant.min=0.0&flavor.piquant.max=0." + sweet;
            console.log(convertedSweet);
        };
        if (savory == 9) {
            var convertedSavory = "&flavor.piquant.min=0." + (savory - 1) + "&flavor.piquant.max=1";
            console.log(convertedSavory);
        } else if (savory < 9 && savory > 2) {
            var convertedSavory = "&flavor.piquant.min=0." + (savory - 2) + "&flavor.piquant.max=0." + savory;
            console.log(convertedSavory);
        } else {
            var convertedSavory = "&flavor.piquant.min=0.0&flavor.piquant.max=0." + savory;
            console.log(convertedSavory);
        };
        if (salty == 9) {
            var convertedSalty = "&flavor.piquant.min=0." + (salty - 1) + "&flavor.piquant.max=1";
            console.log(convertedSalty);
        } else if (salty < 9 && salty > 2) {
            var convertedSalty = "&flavor.piquant.min=0." + (salty - 2) + "&flavor.piquant.max=0." + salty;
            console.log(convertedSalty);
        } else {
            var convertedSalty = "&flavor.piquant.min=0.0&flavor.piquant.max=0." + salty;
            console.log(convertedSalty);
        };
    }

    //test function
    createFlavorQuery(2, 4, 9, 8);

    //this function will determine the movie to searched in the api from the movie data structure
    //not currently working
    function movieFlavorGenerator(spicy, sweet, savory, salty) {
        var convertedMovieSearch = null;

        //if spicy is the dominant flavor
        if (spicy > sweet && spicy > savory && spicy > salty) {
            var num = spicy
            convertedMovieSearch = movies.action[num.toString()][Math.floor(Math.random() * 4)];
            console.log(convertedMovieSearch);

        //if sweet is the dominant flavor
        } else if (sweet > spicy && sweet > savory && sweet > salty) {
            var num = sweet
            convertedMovieSearch = movies.drama[num.toString()][Math.floor(Math.random() * 4)];
            console.log(convertedMovieSearch);

        //if savory is the dominant flavor
        } else if (savory > sweet && savory > savory && spicy > salty) {
            var num = savory
            convertedMovieSearch = movies.romance[num.toString()][Math.floor(Math.random() * 4)];
            console.log(convertedMovieSearch);

        //if salty is the dominant flavor
        } else if (salty > sweet && salty > savory && salty > spicy) {
            var num = salty
            convertedMovieSearch = movies.horror[num.toString()][Math.floor(Math.random() * 4)];
            console.log(convertedMovieSearch);
        };
    }

    //test function
    movieFlavorGenerator(8, 3, 6, 0);

    //this function ties all of the query fuctions together to make one master api search
    function makeRecipeQuery(include,exclude,diet,cuisine,spicy,salty,savory, sweet){
        var newQuery = "http://api.yummly.com/v1/api/recipes?_app_id=d10c5b70&_app_key=af6e286e83053654370aa379046e6c3b&requirePicture=true";
        function concatRecipeValues(){
            debugger;
            var conCattedUrp = newQuery + createIngredientsQuery(include) + createExcludedQuery(exclude) + createDietQuery(diet) + createFlavorQuery(spicy, sweet, savory, salty);
            console.log(newQuery + createIngredientsQuery(include) + createExcludedQuery(exclude) + createDietQuery(diet) + createFlavorQuery(spicy, sweet, savory, salty))
        }
        concatRecipeValues();
    }

    //test run
    makeRecipeQuery(["ham", "pickles"], ["cheese", "bread"], ["paleo"], ["american"],4,6,7,1);

    //rough code to show results of api code for recipe results
    // not working, in need of changes
    function showRecipe() {

        //run the api when you hit the submit button
        console.log(yummlyCall)

        //for loop that itterates through the 10 matches from the api call
        for (var i = 0; i < yummlyCall.responseJSON.matches.length; i++) {
            console.log(yummlyCall.responseJSON.matches[i])
        }
        var recipeConatiner = $("<div>").attr("id", "reicpe");

        var recipeNameDiv = $("<h2>").text("recipe name is:..."),
            ingredientsDiv = $("<h3>").text("ingredients are: ..."),
            prepTimeDiv = $("<h3>").text("prep time is: ..."),
            howToMakeButton = $("<a>").attr("src", "link goes here").html("<button>Learn How To Make</button>");

        recipeConatiner
            .append(recipeNameDiv)
            .append(ingredientsDiv)
            .append(prepTimeDiv)
            .append(howToMakeButton);

        $("#results").append(recipeConatiner);

    };


    //==============================================================
        // (Brelon) Verified that recipe(s) would show up in the console
        console.log(response.matches[0].recipeName);
        // (Brelon)Verified that ingredient(s) would shou up in the console
        console.log(response.matches[0].ingredients);
        // (Brelon) Created a div to 'hold' our recipes
        var recipeDiv = $("<div>");
        // (Brelon) Created a div to 'hold' our ingredients
        var ingDiv = $("<div>");
        // (Brelon) Display the recipe and ingredients on the page
        // hint: make sure recipe is above the ingredients



    })


    //dropdown selections
    $('.ui.dropdown').dropdown();

    // ===========================================================
    // (Star) - I replaced the previous function with these two functions
    // The variables for diet and cuisine now change values based on dropdown selections
    $("#diet").on("change", function() {
        dietaryVal = $("#diet").val();
        console.log(dietaryVal);
    });

    $("#cuisine").on("change", function() {
        cuisineVal = $("#cuisine").val();
        console.log(cuisineVal);
    });

    //============================================================


    //This function runs when you press the submit button on the main page
    $("#submit").click(function(e) {
        e.preventDefault();

        console.log("button test")

        //removes the search etc from main page when button clicked
        // $("#search-form").remove();

        //adds dummy text for recipe results page 
        $("#mainInformationDiv").append("<h1>" + "recipe results...");

        //Creates a new button and appends to the page (for getting recipe)
        var getRecipeButton = $("<input type='button' value='new button'>");
        $("#mainInformationDiv").append(getRecipeButton);

        searchRecipes()
        makeRecipeQuery(["ham"], ["cheese"],4,6,7,1);
        hideMainPage();
        showRecipe();
        yummlyCall;

    });
});

    //========Star===========================================================
    // Function for compiling search criteria and running recipe search
    //========NOT WORKING=============
    function searchRecipes() {
        var includeVal = $("#search").val();
        console.log(includeVal);

        allowedIngredients.push($("#search").val());
        console.log(allowedIngredients);

        var excludeVal = $("#exclude").val();
        console.log(excludeVal);
    }

    // ==================Star=========================================
    // Flavor variables change based on respective slider value
    $(".slider").on("change",function () {
        spicyVal = $("#rangeSlider1").val();
        savoryVal = $("#rangeSlider2").val();
        saltyVal = $("#rangeSlider3").val();
        sweetVal = $("#rangeSlider4").val();
    });

    // Here's some pseudocode to get the ball rolling on how to
    // apply the value of a slider to the movie search api. It needs a lot of work.
    // movieSearch = movies.===whichever slider was used===.====index to match slider value
    // === then use math.random(math.floor) to determine which item in that array will be searched.


    //==================================================================

    $(document).on("click", "#flavorPage", function(event) {
        event.preventDefault();

    });

//================== Chance ===================================

//uses JQuery to grab values of slider when each individual slider moves
$("#rangeSlider1, #rangeSlider2, #rangeSlider3, #rangeSlider4").on('change', function() {

    console.log($("#rangeSlider1").val());
    console.log($("#rangeSlider2").val());
    console.log($("#rangeSlider3").val());
    console.log($("#rangeSlider4").val());
});

//functions that grab slider values and changes value on page
function captureSliderChange1(val) {
    document.getElementById("slider1HTMLUpdate").innerHTML = val;
}

function captureSliderChange2(val) {
    document.getElementById("slider2HTMLUpdate").innerHTML = val;
}

function captureSliderChange3(val) {
    document.getElementById("slider3HTMLUpdate").innerHTML = val;
}

function captureSliderChange4(val) {
    document.getElementById("slider4HTMLUpdate").innerHTML = val;
}

//Returns the value of the variable call like a regular function Ex: userRangeSliderValue1();
//left down here to be used later
var userRangeSliderValue1 = function() {
    return $("#rangeSlider1").val();
}

var userRangeSliderValue2 = function() {
    return $("#rangeSlider2").val();
}

var userRangeSliderValue3 = function() {
    return $("#rangeSlider3").val();
}

var userRangeSliderValue4 = function() {
    return $("#rangeSlider4").val();

 }
 
//=========================================================
