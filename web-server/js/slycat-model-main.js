/* Copyright (c) 2013, 2018 National Technology and Engineering Solutions of Sandia, LLC . Under the terms of Contract
 DE-NA0003525 with National Technology and Engineering Solutions of Sandia, LLC, the U.S. Government
 retains certain rights in this software. */

define("slycat-model-main", ["slycat-web-client", "knockout", "URI"], function(client, ko, URI)
{
  var module = {};

  module.start = function()
  {
    // Enable knockout
    var mid = URI(window.location).segment(-1);
    var page = {};
    page.title = ko.observable();
    client.get_model(
    {
      mid: mid,
      success: function(result)
      {
        page.title(result.name + " - Slycat Model");
      },
      error: function()
      {
        console.log("Error retrieving model.");
      }
    });
    ko.applyBindings(page, document.querySelector("head"));
    ko.applyBindings(page, document.querySelector("slycat-navbar"));
  };

  return module;
});
