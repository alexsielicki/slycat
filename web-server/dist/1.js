(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./web-server/plugins/slycat-cca/ui.html":
/*!***********************************************!*\
  !*** ./web-server/plugins/slycat-cca/ui.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!-- Copyright (c) 2013, 2018 National Technology and Engineering Solutions of Sandia, LLC . Under the terms of Contract  DE-NA0003525 with National Technology and Engineering Solutions of Sandia, LLC, the U.S. Government  retains certain rights in this software. -->\\n\\n<div id=\\\"cca-model\\\" style=\\\"-webkit-flex:1; flex:1;\\\">\\n  <div id=\\\"controls-pane\\\" class=\\\"ui-layout-north\\\">\\n    <div class=\\\"center bootstrap-styles\\\">\\n      <div class=\\\"btn-group btn-group-xs\\\">\\n        <div id=\\\"controls\\\" class=\\\"btn-group btn-group-xs\\\"></div>\\n        <div id=\\\"color-switcher\\\" class=\\\"btn-group btn-group-xs\\\"></div>\\n      </div>\\n    </div>\\n  </div>\\n  <div id=\\\"barplot-pane\\\" class=\\\"ui-layout-west\\\">\\n    <div class=\\\"load-status\\\"></div>\\n    <div id=\\\"barplot-table\\\"></div>\\n  </div>\\n  <div id=\\\"scatterplot-pane\\\" class=\\\"ui-layout-center\\\">\\n    <div class=\\\"load-status\\\"></div>\\n    <canvas id=\\\"scatterplot\\\" width=\\\"300\\\" height=\\\"300\\\" style=\\\"width: 300px; height: 300px;\\\"></canvas>\\n  </div>\\n  <div id=\\\"legend-pane\\\" class=\\\"ui-layout-east\\\">\\n    <div class=\\\"load-status\\\"></div>\\n    <div id=\\\"legend\\\"></div>\\n  </div>\\n  <div id=\\\"table-pane\\\" class=\\\"ui-layout-south\\\">\\n    <div class=\\\"load-status\\\"></div>\\n    <div id=\\\"table\\\">\\n    </div>\\n  </div>\\n</div>\\n\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWItc2VydmVyL3BsdWdpbnMvc2x5Y2F0LWNjYS91aS5odG1sPzEyZDkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOFVBQThVLFFBQVEsK29CQUErb0IsZUFBZSIsImZpbGUiOiIuL3dlYi1zZXJ2ZXIvcGx1Z2lucy9zbHljYXQtY2NhL3VpLmh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLSBDb3B5cmlnaHQgKGMpIDIwMTMsIDIwMTggTmF0aW9uYWwgVGVjaG5vbG9neSBhbmQgRW5naW5lZXJpbmcgU29sdXRpb25zIG9mIFNhbmRpYSwgTExDIC4gVW5kZXIgdGhlIHRlcm1zIG9mIENvbnRyYWN0ICBERS1OQTAwMDM1MjUgd2l0aCBOYXRpb25hbCBUZWNobm9sb2d5IGFuZCBFbmdpbmVlcmluZyBTb2x1dGlvbnMgb2YgU2FuZGlhLCBMTEMsIHRoZSBVLlMuIEdvdmVybm1lbnQgIHJldGFpbnMgY2VydGFpbiByaWdodHMgaW4gdGhpcyBzb2Z0d2FyZS4gLS0+XFxuXFxuPGRpdiBpZD1cXFwiY2NhLW1vZGVsXFxcIiBzdHlsZT1cXFwiLXdlYmtpdC1mbGV4OjE7IGZsZXg6MTtcXFwiPlxcbiAgPGRpdiBpZD1cXFwiY29udHJvbHMtcGFuZVxcXCIgY2xhc3M9XFxcInVpLWxheW91dC1ub3J0aFxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNlbnRlciBib290c3RyYXAtc3R5bGVzXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXAgYnRuLWdyb3VwLXhzXFxcIj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcImNvbnRyb2xzXFxcIiBjbGFzcz1cXFwiYnRuLWdyb3VwIGJ0bi1ncm91cC14c1xcXCI+PC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJjb2xvci1zd2l0Y2hlclxcXCIgY2xhc3M9XFxcImJ0bi1ncm91cCBidG4tZ3JvdXAteHNcXFwiPjwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBpZD1cXFwiYmFycGxvdC1wYW5lXFxcIiBjbGFzcz1cXFwidWktbGF5b3V0LXdlc3RcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkLXN0YXR1c1xcXCI+PC9kaXY+XFxuICAgIDxkaXYgaWQ9XFxcImJhcnBsb3QtdGFibGVcXFwiPjwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGlkPVxcXCJzY2F0dGVycGxvdC1wYW5lXFxcIiBjbGFzcz1cXFwidWktbGF5b3V0LWNlbnRlclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImxvYWQtc3RhdHVzXFxcIj48L2Rpdj5cXG4gICAgPGNhbnZhcyBpZD1cXFwic2NhdHRlcnBsb3RcXFwiIHdpZHRoPVxcXCIzMDBcXFwiIGhlaWdodD1cXFwiMzAwXFxcIiBzdHlsZT1cXFwid2lkdGg6IDMwMHB4OyBoZWlnaHQ6IDMwMHB4O1xcXCI+PC9jYW52YXM+XFxuICA8L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcImxlZ2VuZC1wYW5lXFxcIiBjbGFzcz1cXFwidWktbGF5b3V0LWVhc3RcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkLXN0YXR1c1xcXCI+PC9kaXY+XFxuICAgIDxkaXYgaWQ9XFxcImxlZ2VuZFxcXCI+PC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcInRhYmxlLXBhbmVcXFwiIGNsYXNzPVxcXCJ1aS1sYXlvdXQtc291dGhcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkLXN0YXR1c1xcXCI+PC9kaXY+XFxuICAgIDxkaXYgaWQ9XFxcInRhYmxlXFxcIj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web-server/plugins/slycat-cca/ui.html\n");

/***/ })

}]);