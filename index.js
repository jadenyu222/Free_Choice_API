var objects = [
    {name: 'films', count: 7,  array: [], subset:  [ 'title', 'episode_id', 'director', 'producer', 'release_date'], displayVal: [ 'Title', 'Episode ID', 'Director', 'Producer', 'Release Date']},
    {name: 'people', count: 87,  array: [], subset: [ 'name', 'birth_year', 'gender'], displayVal: [ 'Name', 'Birth Year', 'Gender']},
    {name: 'planets', count: 61,  array: [], subset: ['name', 'climate', 'gravity', 'population', 'rotation_period', 'orbital_period'], displayVal: ['Name', 'Climate', 'Gravity', 'Population', 'Day Length(hrs)', 'Year length(days)']},
    {name: 'species', count: 37,  array: [{
        "name": "Human",
        "classification": "mammal",
        "designation": "sentient",
        "average_height": "180",
        "skin_colors": "caucasian, black, asian, hispanic",
        "hair_colors": "blonde, brown, black, red",
        "eye_colors": "brown, blue, green, hazel, grey, amber",
        "average_lifespan": "120",
        "homeworld": "https://swapi.co/api/planets/9/",
        "language": "Galactic Basic",
        "people": [
            "https://swapi.co/api/people/1/",
            "https://swapi.co/api/people/4/",
            "https://swapi.co/api/people/5/",
            "https://swapi.co/api/people/6/",
            "https://swapi.co/api/people/7/",
            "https://swapi.co/api/people/9/",
            "https://swapi.co/api/people/10/",
            "https://swapi.co/api/people/11/",
            "https://swapi.co/api/people/12/",
            "https://swapi.co/api/people/14/",
            "https://swapi.co/api/people/18/",
            "https://swapi.co/api/people/19/",
            "https://swapi.co/api/people/21/",
            "https://swapi.co/api/people/22/",
            "https://swapi.co/api/people/25/",
            "https://swapi.co/api/people/26/",
            "https://swapi.co/api/people/28/",
            "https://swapi.co/api/people/29/",
            "https://swapi.co/api/people/32/",
            "https://swapi.co/api/people/34/",
            "https://swapi.co/api/people/43/",
            "https://swapi.co/api/people/51/",
            "https://swapi.co/api/people/60/",
            "https://swapi.co/api/people/61/",
            "https://swapi.co/api/people/62/",
            "https://swapi.co/api/people/66/",
            "https://swapi.co/api/people/67/",
            "https://swapi.co/api/people/68/",
            "https://swapi.co/api/people/69/",
            "https://swapi.co/api/people/74/",
            "https://swapi.co/api/people/81/",
            "https://swapi.co/api/people/84/",
            "https://swapi.co/api/people/85/",
            "https://swapi.co/api/people/86/",
            "https://swapi.co/api/people/35/"
        ],
        "films": [
            "https://swapi.co/api/films/2/",
            "https://swapi.co/api/films/7/",
            "https://swapi.co/api/films/5/",
            "https://swapi.co/api/films/4/",
            "https://swapi.co/api/films/6/",
            "https://swapi.co/api/films/3/",
            "https://swapi.co/api/films/1/"
        ],
        "created": "2014-12-10T13:52:11.567000Z",
        "edited": "2015-04-17T06:59:55.850671Z",
        "url": "https://swapi.co/api/species/1/"
    }], subset: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'language'], displayVal: ['Species Name', 'Classification', 'Designation', 'Average Height(cm)', 'Average Lifespan(yrs):', 'Language']},
    {name: 'starships', count: 37, array: [], subset: ['name', 'model', 'manufacturer', 'starship_class' ,'cost_in_credits', 'crew', 'passengers','length'], displayVal:['Starship Name', 'Model', 'Manufacturer', 'Starship Class' ,'Cost(credits)', 'Crew Size', 'Passengers','Length(meters)']},
    {name: 'vehicles', count: 39, array: [], subset: ['name', 'model', 'manufacturer', 'vehicle_class',  'cost_in_credits', 'crew', 'passengers','length'], displayVal: ['Vehicle Name', 'Model', 'Manufacturer', 'Vehicle Class',  'Cost(credits)', 'Crew Size', 'Passengers','Length']}
];

function checkStore(obj) {
    if (obj.count === 37) {
            var tempObj = obj.results[0];
            if (tempObj.hasOwnProperty('designation')) {
                for (var b = 0; b < obj.results.length; b++) {
                    (objects[3].array).push(obj.results[b]);
                }
            } else {
                for (var v = 0; v < obj.results.length; v++) {
                    (objects[4].array).push(obj.results[v]);
                }
            }
        }else{
            for (var i = 0; i < objects.length; i++) {
        if (obj.count === objects[i].count) {
            for (var c = 0; c < obj.results.length; c++) {
                (objects[i].array).push(obj.results[c]);
            }
        }

    }
    }
}

function nextQuery(string){
    $.ajax({
        url: string,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (result) {
            if((typeof result.next) === "string") {
                checkStore(result);
                queryTest(result.next);
            }
            console.log(result)
        },
        error: function () {
            console.log('failed')}
    });
}

function queryTest(queryString){
        $.ajax({
            url: queryString,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result ) {
               if(queryString.includes('films') === true) {
                   checkStore(result);
                   console.log(result)
               }else {
                   checkStore(result);
                   nextQuery(result.next);
                   console.log(result)
               }
            },
            error: function () {
                console.log('failed')
            }
        });
}

function checkCat(category, number){
    result = "<tr align='center'>";
    console.log(category.array[number][category.subset[0]]);
            for(var j = 0; j < category.subset.length; j++){
                result +='<td>' + (category.array[number])[category.subset[j]] + '</td>';
            }
    result += '</tr>';
    return result;
}

$(document).ready(function(){
    $('#header').fadeIn();
    $('#subheader').fadeIn();
    queryTest("https://swapi.co/api/films/");
    queryTest("https://swapi.co/api/people/");
    queryTest("https://swapi.co/api/planets/");
    queryTest("https://swapi.co/api/starships/");
    queryTest("https://swapi.co/api/species/");
    queryTest("https://swapi.co/api/vehicles/");
    $('#tempInputB').fadeOut();
    $('#subText').fadeOut();
    $('#selectBox').fadeOut();
    $('.searchlist').on('change', function(){
        $('#tempInputA').fadeOut();
        $('#tempInputB').fadeOut();

        if ($(this).val() === "search") {
            $('#tempInputA').fadeIn();
            $('#selectBox').fadeOut();
        } else {
            $('#tempInputB').fadeIn();
            $('#selectBox').fadeIn();
        }
    });
    $('#searchButton').on('click', function(){
        $('#subText').fadeOut();
        var temp = '<table class="table table-condensed" align="center">';
        var term = $('#searchInput').val();
        temp = temp.toLowerCase();
        for(var i = 0; i < objects.length;i ++){
                for (var c = 0; c < objects[i].array.length; c++) {
                    if(((objects[i].array[c][objects[i].subset[0]]).toLowerCase()) === term) {
                        temp+='<tr align="center" class="listHeader">';
                        for(var s = 0; s < objects[i].displayVal.length; s++){
                            temp += '<td>' + objects[i].displayVal[s] + '</td>'
                        }
                        temp += '</tr>';
                        temp += checkCat(objects[i], c);

                    }
                }
        }
        temp += "</table>";
        $('#subText').html(temp);
        $('#subText').fadeIn();
    });
    $('#listButton').on('click', function () {
        $('#subText').fadeOut();
        var temp = "<table class='table table-condensed' align='center' width='60'>";
        for(var i = 0; i < objects.length;i ++){
            if(objects[i].name === $('#selectBox').val()){
                temp+='<tr align="center" class="listHeader">';
                for(var s = 0; s < objects[i].displayVal.length; s++){
                    temp += '<td>' + objects[i].displayVal[s] + '</td>'
                }
                temp += '</tr>';
                for (var c = 0; c < objects[i].array.length; c++) {
                    temp += checkCat(objects[i], c);
                }
            }
        }
        temp +='</table>';
        console.log(temp);
        $('#subText').html(temp);
        $('#subText').fadeIn();
    });
});