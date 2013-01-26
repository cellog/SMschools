(function(){
 var schools = document.body.innerHTML.match(/escuelas_paises\.php\?[^"]+/g);
 for (var i = 0; i < schools.length; i++) {
  var school = schools[i];
  var data = school.match(/id=(\d+)&amp;idpais=(\d+)/);
  if (!data) continue;
  (function() {
   var idpais = data[2];
   $.ajax({
    url: school.replace('&amp;', '&'),
    success: function(response) {
     // find the data:
     var doc = document.implementation.createHTMLDocument("stuff");
     var date;
     doc.documentElement.innerHTML = response;
     var tr = doc.getElementsByTagName('tbody');
     for (var j = 0; j < tr.length; j++) {
      if (tr[j].className == 'pijama') {
       continue;
      }
      date = tr[j].lastElementChild.lastElementChild.innerHTML;
      break;
     }
     // find the place to put the data:
     var tr = document.getElementsByTagName('tr');
     for (var j = 0; j < tr.length; j++) {
      if (tr[j].attributes['id_pais'] && tr[j].attributes['id_pais'].nodeValue == idpais) {
       var container = tr[j].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
       container.innerHTML = date;
       break;
      }
     }
    }
   });
  })();
 }
 document.getElementsByTagName('th')[5].firstElementChild.innerHTML = 'Next juv.';
})();