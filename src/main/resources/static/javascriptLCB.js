// Menu caché
function openNav() {
	  document.getElementById("mySidenav").style.width = "250px";
	  $("#bouton_connexion").show();
	  // sert a aller récuperer en cache l'info de connexion //
	    let user = sessionStorage.getItem('Mail')
	    if ( user == null){
	        $("#bouton_deconnexion").hide();               
	    }
	    else {
	        $("#bouton_connexion").hide();
	        if ($("#pseudo").length == 0){
	            getPseudo();
	        }
	    }
	}
	function closeNav() {
	  document.getElementById("mySidenav").style.width = "0";
	}

// fonction vérifiant la connexion en cas de click sur le menu favori et recette. 
//Si l'user n'est pas connecté, une redirection vers la page de connexion se produit //
function update(url){
    let pseudo = sessionStorage.getItem('Mail');
    connection(pseudo, url);
    }
function connection(pseudo, url){
    if (pseudo == null){
        document.location.href="connexion.html";
    }
    else{
        document.location.href=""+url+".html";
        }
    }

// Supprime les informations de connexion du cache //
function deconnexion(){
    sessionStorage.clear();
    closeNav();
    $("#pseudo").remove();
    location.href = 'index.html';
    }

// Fonction barre de recherche //
function search() {
    let recherche = $("#search").val();
        $.ajax({
            url: "http://localhost:8080/recette/search",
            headers: { "lib": recherche },
            type: 'GET',
            dataType: "json",
            timeout: 15000
            }).done(
                function (data) {              
                    $("#card-deck").empty();                    
                    for (let i=0; i < data.length;i++){                     
                 	   $("#card-deck").append('<div class="col-lg-4 cardRecette"><div class="thumbnail"><div class="card-image-container"><img class="cardImageRecette" id="image'+i+'" alt="Image'+i+'"></div><div class="caption"><h3 class="cardTitreRecette card-title" id="title'+i+'">'+data[i].lib+'</h3><p class="cardTextRecette card-text" id="text'+i+'">'+data[i].instruction+'</p></div><div class="cardLinkRecette"><a class="LinkRecette'+i+'">Voir la recette ...</a></div></div></div>');
                       $("#image"+i).attr("src", data[i].image);
                       $(".LinkRecette"+i).attr("href",data[i].urlRecette);
                    }
                });                    
                }


// Va chercher les 3 premières recettes dans la db et les affiche//
function image() {
    $.ajax({
        url: "http://localhost:8080/recette/homePageRecette",
        type: 'GET',
        dataType: "json",
        timeout: 15000
                   }).done(
                       function (data) {
                           for (let i = 0; i < data.length; i++) {
                         	   $("#card-deck").append('<div class="col-lg-4 cardRecette"><div class="thumbnail"><div class="card-image-container"><img class="cardImageRecette" id="image'+i+'" alt="Image'+i+'"></div><div class="caption"><h3 class="cardTitreRecette card-title" id="title'+i+'">'+data[i].lib+'</h3><p class="cardTextRecette card-text" id="text'+i+'">'+data[i].instruction+'</p></div><div class="cardLinkRecette"><a class="LinkRecette'+i+'">Voir la recette ...</a></div></div></div>');
                        	   $("#image"+i).attr("src", data[i].image);
                               $(".LinkRecette"+i).attr("href",data[i].urlRecette);
                           }
                       });                           
                   }

// va chercher le pseudo de l'utilisateur quand il est connecté //
function getPseudo() {
    let tempMail = sessionStorage.getItem('Mail');
    let tempPassword = sessionStorage.getItem('Password');
                       
    $.ajax({ 
        url: "http://localhost:8080/utilisateur/connexion", 
        headers: { "mail" : tempMail , "password" : tempPassword},
        type: 'GET',
        dataType:"json",
        timeout: 15000
            }).done(
                    function(data) { 
                        $("#mySidenav").prepend("<p id='pseudo'>Bienvenue <br/>"+data.pseudo+"");
                    });
}

// va chercher les recettes crées par l'utilisateur et les affiche 
function onloadUserRecette() {
    $.ajax({
        url: "http://localhost:8080/recette/userRecette",
        headers: { "mail": sessionStorage.getItem('Mail'), "password": sessionStorage.getItem('Password') },
        type: 'GET',
        dataType: "json",
        timeout: 15000
    }).done(
        function (data) {
        	
            $("#card-deck").empty();
            if (data.length == 0){
            	$("#card-deck").html("<h2>Il n'y a pas encore de recette ici ! N'hésitez pas à en créer.</h2>");
            }
            for (let i=0; i < data.length;i++){
          	   $("#card-deck").append('<div class="col-lg-4 cardRecette"><div class="thumbnail"><div class="card-image-container"><img class="cardImageRecette" id="image'+i+'" alt="Image'+i+'"></div><div class="caption"><h3 class="cardTitreRecette card-title" id="title'+i+'">'+data[i].lib+'</h3><p class="cardTextRecette card-text" id="text'+i+'">'+data[i].instruction+'</p></div><div class="cardLinkRecette"><a class="LinkRecette'+i+'">Voir la recette ...</a></div></div></div>');
         	   $("#image"+i).attr("src", data[i].image);
               $(".LinkRecette"+i).attr("href",data[i].urlRecette);
            }
            }
        );
      }



// retourne les recettes favorites de l'utilisateur 
function onloadUserFavoris() {
    $.ajax({
        url: "http://localhost:8080/recette/userFavoris",
        headers: { "mail": sessionStorage.getItem('Mail'), "password": sessionStorage.getItem('Password') },
        type: 'GET',
        dataType: "json",
        timeout: 15000
        }).done(
            function (data) {
              $("#card-deck").empty();
              if (data.length == 0){
              	$("#card-deck").html("<h2>Vous n'avez pas encore de recettes favorites.</h2>");
              }
                  for (let i=0; i < data.length;i++){
                   $("#card-deck").append('<div class="col-lg-4 cardRecette"><div class="thumbnail"><div class="card-image-container"><img class="cardImageRecette" id="image'+i+'" alt="Image'+i+'"></div><div class="caption"><h3 class="cardTitreRecette card-title" id="title'+i+'">'+data[i].lib+'</h3><p class="cardTextRecette card-text" id="text'+i+'">'+data[i].instruction+'</p></div><div class="cardLinkRecette"><a class="LinkRecette'+i+'">Voir la recette ...</a></div></div></div>');
               	   $("#image"+i).attr("src", data[i].image);
                   $(".LinkRecette"+i).attr("href",data[i].urlRecette);
                  }
            });
}

function createAccountToggle() {
    $("#connexion_form> .statique").toggle();
    $("#connexion").slideUp();
    $("#cree_compte").slideDown();
    $("#cree_compte_form> .statique").toggle();
}

function haveAccountToggle() {
    
    $("#cree_compte_form> .statique").toggle();
    $("#cree_compte").slideUp();
    $("#connexion").slideDown();
    $("#connexion_form> .statique").toggle();
}


/// fonction pour page connexion.html //

function connection(){

    var idUtilisateur = $("#idUtilisateur").val();
    var motDePasse = $("#motDePasse").val();
    console.log(idUtilisateur);
    $.ajax({ 
        url: "http://localhost:8080/utilisateur/connexion", 
        headers: { "mail" : idUtilisateur , "password" : motDePasse},
        type: 'GET',
        dataType:"json",
        timeout: 15000
    }).done(
        function(data) { 
            
            tokenMail = idUtilisateur;
            tokenPassword = motDePasse;
            saveConnexion();
            document.location.href="mes_recettes.html";
        }
    ).fail(function(jqXHR, textStatus, errorThrown){
        $("#accountsInfos").text("Connexion impossible. Cause probable : erreur sur le pseudonyme ou sur le mot de passe");
    });
}

function createAccount(){
    var pseudoNew = $("#pseudoNew").val();
    var prenomNew = $("#prenomNew").val();
    var nomNew = $("#nomNew").val();
    var mailNew = $("#mailNew").val();
    var passwordNew = $("#passwordNew").val();
    
    $.ajax({
        url: "http://localhost:8080/utilisateur",
        type: 'POST',
        headers: { "pseudo" : pseudoNew , "mail" : mailNew , "motDePasse" : passwordNew , "prenom" : prenomNew , "nom" : nomNew }                    
    }).done(function(data){                                        
        $("#accountInfos").text("Votre compte à bien été crée !");
    }).fail(function(jqXHR, textStatus, errorThrown){
    	$("#accountInfos").text("Nous n'avons pas pu créer votre compte. Cause probable :le pseudonyme est déjà utilisé");
    });
}

function saveConnexion(){
	window.sessionStorage.setItem('Mail', tokenMail);
	window.sessionStorage.setItem('Password', tokenPassword);
}