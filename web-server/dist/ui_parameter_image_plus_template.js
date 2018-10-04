(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{233:function(e,n){e.exports='\x3c!-- Copyright (c) 2013, 2018 National Technology and Engineering Solutions of Sandia, LLC . Under the terms of Contract  DE-NA0003525 with National Technology and Engineering Solutions of Sandia, LLC, the U.S. Government  retains certain rights in this software. --\x3e\n\n<div class="parameter-image" id="parameter-image-plus-layout">\n  <slycat-job-checker></slycat-job-checker>\n\n\t<div id="controls-pane" class="ui-layout-north">\n    <div class="center">\n      <div id="controls"></div>\n      <div id="color-switcher"></div>\n    </div>\n    <div id="set-value-form" class="dialog" title="Set Values" style="display: none;">\n      <p>\n         <label for="value">Set values for <span id="set-value-form-variable">variable</span>:</label>\n         <input type="text" id="value" />\n         <input type="hidden" id="variable-index" />\n         <div class=\'dialogErrorMessage\'></div>\n      </p>\n    </div>\n    <div id="clear-value-form" class="dialog" title="Clear Values" style="display: none;">\n      <p>\n         <label for="variableIndex">Clear values for <span id="clear-value-form-variable">variable</span>?</label>\n         <input type="hidden" id="variable-index" />\n      </p>\n    </div>\n    <div id="csv-save-choice-form" class="dialog" title="Download Choice" style="display: none;">\n      <p>\n         <label id="csv-save-choice-label"></label>\n      </p>\n    </div>\n\t</div>\n\n\t<div id="model-pane" class="ui-layout-center">\n  \t<div id="scatterplot-pane" class="ui-layout-center">\n      <div class="load-status"></div>\n      <div id="scatterplot"></div>\n    </div>\n  </div>\n\n  <div id="dendrogram-pane" class="ui-layout-west">\n    <div id="dendrogram-leaf-backdrop"></div>\n    <div class="load-status"></div>\n    <svg id="dendrogram-viewer" width="100%" height="100%">\n      <defs>\n        <linearGradient id="subtree-gradient" x1="0%" y1="0%" x2="100%" y2="0%">\n          <stop offset="0%" stop-color="#7767b0" stop-opacity="1" />\n          <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />\n        </linearGradient>\n      </defs>\n    </svg>\n  </div>\n\n  <div id="table-pane" class="ui-layout-south">\n    <div class="load-status"></div>\n    <div id="table"></div>\n  </div>\n\n  <div title=\'Remote Login\' id="remote-login-dialog" style="display: none;">\n    <p id=\'remote-error\'></p>\n    <p id=\'remote-hostname\'></p>\n    <form>\n      <fieldset>\n        <label for=\'remote-username\'>Username</label>\n        <input id=\'remote-username\' type=\'text\'/>\n        <label for=\'remote-password\'>Password</label>\n        <input id=\'remote-password\' type=\'password\'/>\n      </fieldset>\n    </form>\n  </div>\n\n</div>\n'}}]);
//# sourceMappingURL=ui_parameter_image_plus_template.js.map