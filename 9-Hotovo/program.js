/* Naprogramuj vlastní hru s panáčkem */

var objektPanacek;
var panacekX;
var panacekY;
var panacekSirka;
var panacekVyska;

/* najdeme panáčka na stránce */
objektPanacek = document.querySelector("#panacek");

/* později budeme potřebovat i rozměry panáčka */
panacekSirka = 64;
panacekVyska = 70;

/* nastavíme panáčka na novou pozici */
panacekX = 400;
panacekY = 300;
objektPanacek.style.left = panacekX + "px";
objektPanacek.style.top = panacekY + "px";



var objektMince;
var minceX;
var minceY;
var minceSirka;
var minceVyska;

/* najdeme minci na stránce a uložíme si její velikost*/
objektMince = document.querySelector("#mince");
minceSirka = 32;
minceVyska = 32;


/* umísti minci na náhodnou pozici */
minceX = Math.floor(Math.random() * (document.documentElement.clientWidth - minceSirka));
minceY = Math.floor(Math.random() * (document.documentElement.clientHeight - minceVyska));
objektMince.style.left = minceX + "px";
objektMince.style.top = minceY + "px";


/* vytvoříme počitadlo skóre a nastavíme ho na nulu */
var pocetSkore;
pocetSkore = 0;

/* najdeme na stránce prvek, kam budeme skóre dopisovat */
var objektSkore;
objektSkore = document.querySelector("#skore");


/* najdeme na stránce zvuk cinknutí mince */
var objektZvuk;
objektZvuk = document.querySelector("#zvukmince");


/* Rozměry okna prohlížeče */
var sirkaOkna;
var vyskaOkna;
sirkaOkna = window.innerWidth;
vyskaOkna = window.innerHeight;


/* Nepřítel */
var objektNepritel;
var nepritelSirka;
var nepritelVyska;
var nepritelX;
var nepritelY;
var nepritelKrokX;
var nepritelKrokY;

objektNepritel = document.querySelector("#nepritel");
nepritelSirka = 51;
nepritelVyska = 51;
nepritelX = 0;
nepritelY = 0;
nepritelKrokX = 10;
nepritelKrokY = 10;

/* každých 20 milisekund (tj. 50x za vteřinu) se zavolá funkce pohniNepritelem */
setInterval(pohniNepritelem, 20);



function priStiskuKlavesy(klavesa) {

  if (klavesa.key === "ArrowRight") {

    panacekX = panacekX + 10;
    objektPanacek.src = "obrazky/panacek-vpravo.png";

  }

  if (klavesa.key === "ArrowLeft") {

    panacekX = panacekX - 10;
    objektPanacek.src = "obrazky/panacek-vlevo.png";

  }

  if (klavesa.key === "ArrowUp") {

    panacekY = panacekY - 10;
    objektPanacek.src = "obrazky/panacek-nahoru.png";

  }

  if (klavesa.key === "ArrowDown") {

    panacekY = panacekY + 10;
    objektPanacek.src = "obrazky/panacek.png";

  }


  // testujeme, zda panáček není mimo hranice okna
  if (panacekX < 0) {
    panacekX = 0;
  }
  if (panacekX > sirkaOkna - panacekSirka) {
    panacekX = sirkaOkna - panacekSirka;
  }
  if (panacekY < 0) {
    panacekY = 0;
  }
  if (panacekY > vyskaOkna - panacekVyska) {
    panacekY = vyskaOkna - panacekVyska;
  }


  objektPanacek.style.left = panacekX + "px";
  objektPanacek.style.top = panacekY + "px";

  // zjistíme, zda docháí ke kolizi mimozemšťana a objektMince
  // tj. zda se překrývají dva obdélníky o známých souřadnicích
  if (!(panacekX + panacekSirka < minceX ||
      minceX + minceSirka < panacekX ||
      panacekY + panacekVyska < minceY ||
      minceY + minceVyska < panacekY)) {

      // Zvětši score o 1
      pocetSkore = pocetSkore + 1;

      // A změníme text skóre na stránce
      objektSkore.textContent = pocetSkore;

      // Přehrajeme zvuk cinknutí
      objektZvuk.play();

      // Přesuň minci na novou náhodnou pozici
      minceX = Math.floor(Math.random() * (document.documentElement.clientWidth - minceSirka));
      minceY = Math.floor(Math.random() * (document.documentElement.clientHeight - minceVyska));
      objektMince.style.left = minceX + "px";
      objektMince.style.top = minceY + "px";
  }

}



function pohniNepritelem() {
  nepritelX = nepritelX + nepritelKrokX;
  nepritelY = nepritelY + nepritelKrokY;

  if (nepritelX < 0) {
    nepritelX = 0;
    nepritelKrokX = -nepritelKrokX;
  }
  if (nepritelX > sirkaOkna - nepritelSirka) {
    nepritelX = sirkaOkna - nepritelSirka;
    nepritelKrokX = -nepritelKrokX;
  }
  if (nepritelY < 0) {
    nepritelY = 0;
    nepritelKrokY = -nepritelKrokY;
  }
  if (nepritelY > vyskaOkna - nepritelVyska) {
    nepritelY = vyskaOkna - panacekVyska;
    nepritelKrokY = -nepritelKrokY;
  }

  // umísti nepřítele na pozici
  objektNepritel.style.left = nepritelX + "px";
  objektNepritel.style.top = nepritelY + "px";
}