$(function() {
  // write your code here
  let bikeCards = $("#bike-cards");
  $.ajax({
    method: "GET",
    url: "https://json-project3.herokuapp.com/products",
    dataType: "json"
  }).done(function(data) {

    renderCards(data);


    let maleBikes, femaleBikes, leGrandeBikes, krossBikes,
      explorerBikes, visitorBikes, ponyBikes, forceBikes, eBike, idealBikes;

    let allBikes = $(".bike").length;
    $(".show-all-badge").text(allBikes)

    calcBadgeNumOfGender(".male-badge", maleBikes, "MALE", data);
    calcBadgeNumOfGender(".female-badge", femaleBikes, "FEMALE", data);
    calcBadgeNumOfBrand(".le-grand-badge", leGrandeBikes, "LE GRAND BIKES", data);
    calcBadgeNumOfBrand(".kross-badge", krossBikes, "KROSS", data);
    calcBadgeNumOfBrand(".explorer-badge", explorerBikes, "EXPLORER", data);
    calcBadgeNumOfBrand(".visitor-badge", visitorBikes, "VISITOR", data);
    calcBadgeNumOfBrand(".pony-badge", ponyBikes, "PONY", data);
    calcBadgeNumOfBrand(".force-badge", forceBikes, "FORCE", data);
    calcBadgeNumOfBrand(".e-bike-badge", eBike, "E-BIKES", data);
    calcBadgeNumOfBrand(".ideal-badge", idealBikes, "IDEAL", data);

    console.log(allBikes);
    $("#show-all").on("click", function() {
      $(".filter").removeClass("active-filter")
      $(this).addClass("active-filter");
      renderCards(data);
    });

    $("#male").on("click", function() {
      let maleArr = data.filter(bike => bike.gender === "MALE");
      $(".filter").removeClass("active-filter")
      $(this).addClass("active-filter");
      renderCards(maleArr)
    });
    $("#female").on("click", function() {
      let femaleArr = data.filter(bike => bike.gender === "FEMALE")
      renderCards(femaleArr);
      $(".filter").removeClass("active-filter")
      $(this).addClass("active-filter");
    });
    let leGrandArr, krossArr, explorerArr, visitorArr, ponyArr, forceArr, eBikeArr, idealArr;
    showAndHideBrandCards("#le-grand", leGrandArr, "LE GRAND BIKES", data);
    showAndHideBrandCards("#kross", krossArr, "KROSS", data);
    showAndHideBrandCards("#explorer", explorerArr, "EXPLORER", data);
    showAndHideBrandCards("#visitor", visitorArr, "VISITOR", data);
    showAndHideBrandCards("#pony", ponyArr, "PONY", data);
    showAndHideBrandCards("#force", forceArr, "FORCE", data);
    showAndHideBrandCards("#e-bike", eBikeArr, "E-BIKES", data);
    showAndHideBrandCards("#ideal", idealArr, "IDEAL", data);

  });

  function renderCards(data) {
    bikeCards.html("");

    $.map(data, function(bike, i) {
      bikeCards.append(`<div class="col-4 mb-4 bike">
      <a  href="#" class="card">
      <img id="bike-img" src="img/${bike.image}.png" class="card-img-top" alt="">
      <div class="card-body">
      <h6 class="card-title text-uppercase font-weight-bold" id="bike-name">${bike.name}</h6>
      <p class="card-text" id="price">${bike.price} $</p>
      </div>
      </a></div>`);
    });
  }

  function showAndHideBrandCards(link, arr, typeOfBike, data) {
    $(link).on("click", function() {
      arr = data.filter(bike => bike.brand === typeOfBike);
      $(".filter").removeClass("active-filter");
      $(this).addClass("active-filter");
      renderCards(arr);
    });
  }

  function calcBadgeNumOfGender(badgeClass, name, typeOfBike, data) {
    name = data.filter(bike => bike.gender === typeOfBike).length
    $(badgeClass).text(name);
  }

  function calcBadgeNumOfBrand(badgeClass, name, typeOfBike, data) {
    name = data.filter(bike => bike.brand === typeOfBike).length
    $(badgeClass).text(name);
  }

});
