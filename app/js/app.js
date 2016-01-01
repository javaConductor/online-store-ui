define("online-store",
  ["jquery",'model'],
  function($, Model) {







    //Define data object in here.
    return {
      init: dataService.getProducts,

    }

  }

)
