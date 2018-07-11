/* Copyright (c) 2013, 2018 National Technology and Engineering Solutions of Sandia, LLC . Under the terms of Contract
 DE-NA0003525 with National Technology and Engineering Solutions of Sandia, LLC, the U.S. Government
 retains certain rights in this software. */

// CSS resources
import "css/namespaced-bootstrap.less";
import "css/slycat.css";

import React from "react";
import ReactDOM from "react-dom";
import ProjectsList from 'components/ProjectsList';
import client from 'js/slycat-web-client';
import ga from "js/slycat-ga";
import "bootstrap";

// These next 2 lines are required render the navbar using knockout. Remove them once we convert it to react.
import ko from 'knockout';
import "js/slycat-navbar";

// Wait for document ready
$(document).ready(function() {

  client.get_projects({
    success: function(result) {
      const projects_list = <ProjectsList projects={result.projects} />
      ReactDOM.render(
        projects_list,
        document.getElementById('slycat-projects')
      );
    },
    error: function(request, status, reason_phrase) {
      console.log("Unable to retrieve project.");
    }
  });

  // These next 2 lines render the navbar using knockout. Remove them once we convert it to react.
  var page = {}
  ko.applyBindings(page, document.querySelector("html"));

});