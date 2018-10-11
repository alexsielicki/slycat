(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{230:function(n,t){n.exports='\x3c!-- Copyright (c) 2013, 2018 National Technology and Engineering Solutions of Sandia, LLC . Under the terms of Contract  DE-NA0003525 with National Technology and Engineering Solutions of Sandia, LLC, the U.S. Government  retains certain rights in this software. --\x3e\n\n<div id="timeseries-model" style="-webkit-flex:1; flex:1;">\n  <slycat-job-checker></slycat-job-checker>\n\n  <div id="cluster-pane" class="ui-layout-north">\n  \t<div class="center bootstrap-styles" id="controls">\n  \t\t<div id="general-controls" class="btn-group btn-group-xs"></div>\n  \t\t<div id="color-switcher" class="btn-group btn-group-xs"></div>\n  \t</div>\n    <div class="load-status"></div>\n  </div>\n\n\t<div id="dendrogram-pane" class="ui-layout-west">\n    <div id="dendrogram-sparkline-backdrop"></div>\n    <div class="load-status"></div>\n    <svg id="dendrogram-viewer" width="100%" height="100%">\n      <defs>\n        <linearGradient id="subtree-gradient" x1="0%" y1="0%" x2="100%" y2="0%">\n          <stop offset="0%" stop-color="#7767b0" stop-opacity="1" />\n          <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />\n        </linearGradient>\n      </defs>\n    </svg>\n    <div id="dendrogram-controls" class="bootstrap-styles">\n      <div id="dendrogram-general-controls" class="btn-group btn-group-xs">\n        \x3c!-- The following div is only necessary when there is more than one button, so leaving commented out for when we add another button here --\x3e\n        \x3c!-- <div class="btn-group btn-group-xs"> --\x3e\n          <button class="outputs btn btn-default dropdown-toggle" type="button" id="outputs-dropdown" data-toggle="dropdown" aria-expanded="true" title="Change Outputs">\n            <span class="buttonLabel">Outputs</span>\n            <span class="caret"></span>\n          </button>\n          <ul class="outputs dropdown-menu" role="menu" aria-labelledby="outputs-dropdown"></ul>\n        \x3c!-- </div> --\x3e\n      </div>\n    </div>\n  </div>\n\n  <div id="waveform-pane" class="ui-layout-center">\n    <div class="load-status"></div>\n    <svg id="waveform-viewer" width="100%" height="100%" style="position: absolute;">\n    </svg>\n    <div id="waveform-progress">\n      <input class="waveformPie" value="1" />\n    </div>\n    <div id="waveform-selection-progress">\n      <input class="waveformPie" value="1" />\n    </div>\n    <div id="waveform-selector-progress-wrapper">\n    \t<div id="waveform-selector-progress">\n      \t<input class="waveformPie" value="1" />\n        Please wait while we prepare the ability to select waveforms...\n      </div>\n\t  </div>\n  </div>\n\n  <div id="legend-pane" class="ui-layout-east">\n    <div class="load-status"></div>\n    <div id="legend"></div>\n  </div>\n\n  <div id="table-pane" class="ui-layout-south" style="overflow: auto">\n\t  <div class="load-status"></div>\n\t  <div id="table">\n\t  </div>\n\t</div>\n\n</div>\n'}}]);
//# sourceMappingURL=ui_timeseries_template.js.map