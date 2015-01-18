def register_slycat_plugin(context):
  import os
  context.register_wizard("tracer-image", "New Remote Tracer Image Model", require={"action":"create", "context":"project"})
  context.register_wizard_resource("tracer-image", "ui.js", os.path.join(os.path.dirname(__file__), "ui.js"))
  context.register_wizard_resource("tracer-image", "ui.html", os.path.join(os.path.dirname(__file__), "ui.html"))
