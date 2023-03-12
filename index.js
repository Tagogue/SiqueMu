// Variables
const musics = document.querySelector('.musics');
const beginButton = document.getElementById('begin');
const startButton = document.getElementById('start');
const arrowButton = document.querySelectorAll('.arrow');
const search = document.querySelector('.search');
let start = false;
let begin = false;
let audio = null;
let currentIndex = 0;

function system() {
    console.clear();
    // Variables
    const logoMusic = document.querySelector('.logo-music');
    // Ranger les musiques de façon aléatoire
    Musics.sort(() => Math.random() - 0.5);
    
    // Boucle à travers les musiques pour les ajouter à l'élément "musics"
    Musics.forEach((music, index) => {
        // Ajouter une div avec la classe "music"
        musics.innerHTML += `
            <div class="music" data-index="${index}"></div>
        `;
        // Sélectionner le dernier élément ajouté avec la classe "music"
        const musicLast = musics.querySelector('.music:last-child');
        // Ajouter une image et un titre de musique à l'intérieur de l'élément sélectionné
        musicLast.innerHTML += `
            <img src="${music[0]}" alt="">
            <h2>${music[1]}</h2>
        `;
        
        musics.querySelectorAll('.music' || '.music h2' || '.music img').forEach(music => {
            music.addEventListener('click', event => {
              // Ajout de la classe pour le style et suppression des autres
              musics.querySelectorAll('.music' || '.music h2' || '.music img').forEach(music => {
                music.classList.remove('music-click');
              })
              music.classList.add('music-click');
              // Logique de traitement de l'événement
              let parent = event.target.closest('.music');
              let img = parent.querySelector('img');
              if (img) {
                  logoMusic.style.background = `url(${img.src}) no-repeat center/cover`;
              }
              playSong(parent.dataset.index)
            });
        });
    });

    function playSong(index) {

        if (audio && !audio.paused) {
            audio.pause();

            // start
            startButtonFunction();
            // Begin
            beginButtonFunction();
            // Arrow
            // arrowButtonsFonction();
          } else {
            if (start == false) {
                start = true;
                startButton.classList.add('background-pink');
            } else {
                start = false;
                startButton.classList.remove('background-pink');
            }
        }

        // Mettre en rose la div correspondant à l'index
        currentIndex = index;
        const musicDivs = document.querySelectorAll('.music');
        musicDivs.forEach(div => {
            if (div.getAttribute('data-index') === currentIndex.toString()) {
                div.classList.add('music-click');
            } else {
                div.classList.remove('music-click');
            }
        });


        // Afficher l'image correspondant à l'index
        const currentMusic = Musics[index];
        // Récupérer l'élément img de la musique
        const musicImage = document.querySelector(`[data-index="${index}"] img`);

        // Vérifier si l'élément img existe et si oui, attribuer l'image à l'élément `logoMusic`
        if (musicImage) {
            logoMusic.style.backgroundImage = `url('${currentMusic[0]}')`;
        } else {
            // Si l'élément img n'existe pas, supprimer l'image de l'élément `logoMusic`
            logoMusic.style.backgroundImage = "";
        }


        // Faire remonter le son qui est entrain d'être jouer
        // musicDivs.forEach(div => {
        //     if (div.getAttribute('data-index') === currentIndex.toString()) {
        //         div.classList.add('music-click');
        //     } else {
        //         div.classList.remove('music-click');
        //     }
        // });

        // // Déplacer la div du son cliqué en haut de la liste
        // const clickedMusicDiv = document.querySelector(`[data-index="${index}"]`);
        // window.scrollTo(0, 0);
        // musics.insertBefore(clickedMusicDiv, musics.firstChild);

    

        audio = new Audio(Musics[index][2]);
        audio.play();
    
        const range = document.getElementById('range');

        audio.ontimeupdate = function() {
            range.value = audio.currentTime / audio.duration * 100;
        };

        range.addEventListener('input', function() {
            audio.currentTime = range.value / 100 * audio.duration;
        });

        currentIndex = index;

        audio.addEventListener("ended", function() {
            if (begin == true) {
                audio.currentTime = 0; // remet le temps de lecture à 0 pour boucler la musique
                audio.play();
            } else {
                if (currentIndex == Musics.length - 1) {
                    currentIndex = 0; // si c'est la dernière musique, revenir à la première
                } else {
                    currentIndex = (currentIndex + 1) % Musics.length;
                }
                playSong(currentIndex);
            }
        });        
        
        // Ajoute un écouteur d'événement de click sur beginButton
        function beginButtonFunction() {
            beginButton.addEventListener('click', () => {
                // Si begin est égal à false
                if (begin == false) {
                    // Définit begin à true
                    begin = true;
                
                    // Ajoute la classe 'background-pink' à beginButton
                    beginButton.classList.add('background-pink');
                } else {
                    // Définit begin à false
                    begin = false;
                    // Supprime la classe 'background-pink' de beginButton
                    beginButton.classList.remove('background-pink');
                    
                    audio.addEventListener("ended", function(e) {
                        audio.currentTime = 0; // remet le temps de lecture à 0 pour éviter qu'elle ne reprenne là où elle s'est arrêtée 
                    });
                }
            }); 
        }    

        beginButtonFunction();
        
        function startButtonFunction() {
            startButton.addEventListener('click', () => {
                // Si start est égal à false
                if (start == false) {
                    // Définit start à true
                    start = true;
                    // Ajoute la classe 'background-pink' à startButton
                    startButton.classList.add('background-pink');
    
                    audio.play();
                    
                } else {
                    // Définit start à false
                    start = false;
                    // Supprime la classe 'background-pink' de startButton
                    startButton.classList.remove('background-pink');
                    audio.pause();
                }
            });
        }

        startButtonFunction();

        // ----------------------------------------------
        // Problème !!!
        // Pour chaque élément dans arrowButton
        function arrowButtonsFonction() {
            arrowButton.forEach(arrow => {
                // Ajouter un écouteur d'événement de click sur l'élément
                arrow.addEventListener('click', (e) => {
                    // Ajouter la classe 'background-pink' à l'élément
                    arrow.classList.add('background-pink');
    
    
                    if(e.target.id == 'right') {
                        if(currentIndex != Musics.length) {
                            currentIndex = (currentIndex + 1) % Musics.length;
                            playSong(currentIndex);
                        }
                    } else {
                        if(currentIndex != 0) {
                            currentIndex = (currentIndex - 1) % Musics.length;
                            playSong(currentIndex);
                        }
                    }
    
                    // Après 250ms, exécuter une fonction anonyme qui supprime la classe 'background-pink' de l'élément
                    setTimeout(() => {
                        arrow.classList.remove('background-pink');
                    }, 250)
                });
            });
        }

        // arrowButtonsFonction();
        // ----------------------------------------------
    }
};


// -----------------------------------------------------------------
// Other
// Efface la console
console.clear();

// Affiche un message dans la console
setTimeout(() => {
    console.log("SiqueMu || Tagogue || Discord : https://discord.gg/auvqCezfqT");
    console.log("Nombre de musique : " + Musics.length);
}, 200)

// Search
search.addEventListener('input', (e) => {
    if (e.target.value !== "") {
        const searchValue = e.target.value.toLowerCase();
        musics.querySelectorAll('.music').forEach(music => {
            const title = music.querySelector('h2').textContent.toLowerCase();
            if (!title.includes(searchValue)) {
                music.style.display = "none";
            } else {
                music.style.display = "";
            }
        });
    } else {
        musics.querySelectorAll('.music').forEach(music => {
            music.style.display = "";
        });
    }
});