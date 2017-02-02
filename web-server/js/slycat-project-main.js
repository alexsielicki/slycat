/*
Copyright 2013, Sandia Corporation. Under the terms of Contract
DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain
rights in this software.
*/

define("slycat-project-main", ["slycat-server-root", "slycat-web-client", "slycat-markings", "slycat-changes-feed", "slycat-dialog", "slycat-model-names", "knockout", "knockout-mapping", "URI"], function(server_root, client, markings, changes_feed, dialog, model_names, ko, mapping, URI)
{
  var module = {}
  module.start = function()
  {
    var page = {};
    page.server_root = server_root;
    page.project = mapping.fromJS({_id: URI(window.location).segment(-1), name: "", description: "",created: "",creator: "",acl:{administrators:[],writers:[],readers:[]}});
    page.projects = changes_feed.projects().filter(function(project)
    {
      return page.project._id() == project._id();
    });
    page.title = ko.pureComputed(function()
    {
      var projects = page.projects();
      return projects.length ? projects[0].name() + " - Slycat Project" : "";
    });
    page.models = changes_feed.models().filter(function(model)
    {
      return model.project() == page.project._id();
    });
    page.markings = markings.allowed;
    page.badge = function(marking)
    {
      for(var i = 0; i != page.markings().length; ++i)
      {
        if(page.markings()[i].type() == marking)
          return page.markings()[i].badge();
      }
    }

    var references = mapping.fromJS([]);

    page.templates = references.filter(function(reference)
    {
      return reference.bid() && !reference.mid();
    }).map(function(reference)
    {
      return {
        _id: reference._id,
        name: reference.name,
        created: reference.created,
        creator: reference.creator,
        model_type: reference["model-type"] ? reference["model-type"]() : "",
      };
    });
    
    page.model_names = model_names;
    
    page.edit_template = function(reference)
    {
    }
    page.delete_template = function(reference)
    {
      dialog.dialog(
      {
        title: "Delete Template?",
        message: "The template will be deleted immediately and there is no undo.  This will not affect any existing models.",
        buttons: [{className: "btn-default", label:"Cancel"}, {className: "btn-danger",label:"OK"}],
        callback: function(button)
        {
          if(button.label != "OK")
            return;
          client.delete_reference(
          {
            rid: reference._id(),
            success: function()
            {
              page.update_references();
            },
            error: dialog.ajax_error("Couldn't delete template."),
          });
        },
      });
    }

    page.update_references = function()
    {
      client.get_project_references(
      {
        pid: page.project._id(),
        success: function(result)
        {
          mapping.fromJS(result, references);
        }
      });
    }

    page.update_references();

    ko.applyBindings(page, document.querySelector("html"));
  };

  return module;
});
