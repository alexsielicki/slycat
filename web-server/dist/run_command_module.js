(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{211:function(e,t,s){"use strict";(function(e){var t=r(s(62)),n=r(s(15)),a=r(s(25)),o=r(s(2));function r(e){return e&&e.__esModule?e:{default:e}}var m={scripts:[{name:"test",parameters:[{name:"--number",value:2}]}],hpc:{is_hpc_job:!1,parameters:{wckey:"test1",nnodes:"1",partition:"mypartition",ntasks_per_node:"1",time_hours:"01",time_minutes:"30",time_seconds:"30",working_dir:"slycat"}}},i={scripts:[{name:"compute_timeseries",parameters:[{name:"--directory",value:"/home/slycat/src/slycat/web-client/500-times-series"},{name:"--cluster-sample-count",value:50},{name:"--cluster-sample-type",value:"uniform-paa"},{name:"--cluster-type",value:"average"},{name:"--cluster-metric",value:"euclidean"},{name:"--workdir",value:"/home/slycat/workdir"},{name:"--hash",value:"1a2b3c4d5e6f"}]}],hpc:{is_hpc_job:!1,parameters:{wckey:"test1",nnodes:"1",partition:"mypartition",ntasks_per_node:"1",time_hours:"01",time_minutes:"30",time_seconds:"30",working_dir:"slycat"}}},u={scripts:[{name:"timeseries_to_hdf5",parameters:[{name:"--output-directory",value:"/home/slycat/output"},{name:"--inputs-file",value:"/home/slycat/input"},{name:"--inputs-file-delimiter",value:","},{name:"--force",value:""}]}],hpc:{is_hpc_job:!1,parameters:{wckey:"test1",nnodes:"1",partition:"mypartition",ntasks_per_node:"1",time_hours:"01",time_minutes:"30",time_seconds:"30",working_dir:"slycat"}}};function c(e){document.getElementById("command").value="test"===e?(0,t.default)(m):"computer_time_series"===e?(0,t.default)(i):"timeseries_to_hdf5"===e?(0,t.default)(u):"command does not match command in list of commands"}document.getElementById("prettyPrint").addEventListener("click",function(){try{var s=e("#command").val(),n=JSON.parse(s);document.getElementById("command").value=(0,t.default)(n,void 0,4),s=e("#response").val(),n=JSON.parse(s),document.getElementById("response").value=(0,t.default)(n,void 0,4)}catch(e){}},!1),document.getElementById("go").addEventListener("click",function(){var s={command:JSON.parse(e("#command").val())};e.ajax({contentType:"application/json",type:"POST",url:(0,a.default)(n.default+"remotes/"+e("#hostname").val()+"/post-remote-command"),success:function(e){document.getElementById("response").value=(0,t.default)(e)},error:function(e,s,n){console.log("status:"+e.status),400===e.status?document.getElementById("response").value="status: "+e.status+"\n\nmessage: "+e.getResponseHeader("X-Slycat-Message"):document.getElementById("response").value="error response from server:\nerror request:"+(0,t.default)(e,void 0,4)+"\n\n status: "+e.status+"\n\n reason: "+n},data:(0,t.default)(s)})},!1),document.getElementById("getSession").addEventListener("click",function(){o.default.get_session_status({hostname:e("#hostname").val(),success:function(e){document.getElementById("response").value="host session found"},error:function(s,n,a){document.getElementById("response").value="no session found",o.default.post_remotes({hostname:e("#hostname").val(),username:e("#username").val(),password:e("#password").val(),success:function(e){document.getElementById("response").value="host session made sid:"+(0,t.default)(e,void 0,2)},error:function(e,t,s){window.alert("error request:"+e.responseJSON+" status: "+t+" reason: "+s),console.log("error request:"+e.responseJSON+" status: "+t+" reason: "+s)}})}})},!1),document.getElementById("test").addEventListener("click",function(){c("test")},!1),document.getElementById("computeTimeSeries").addEventListener("click",function(){c("computer_time_series")},!1),document.getElementById("timeseriesToHdf5").addEventListener("click",function(){c("timeseries_to_hdf5")},!1)}).call(this,s(1))}}]);
//# sourceMappingURL=run_command_module.js.map