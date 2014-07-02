# Copyright 2013, Sandia Corporation. Under the terms of Contract
# DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain
# rights in this software.

import numpy
import os
import re
import slycat.web.client
import urlparse

parser = slycat.web.client.option_parser()
parser.add_argument("--auto-image-columns", action="store_true", help="Automatically generate the list of image columns based on their contents.")
parser.add_argument("--image-columns", default=[], nargs="*", help="Image column names.")
parser.add_argument("--image-hostname", default=None, help="Optionally override the hostname where images are stored.")
parser.add_argument("--input-columns", default=[], nargs="*", help="Input column names.")
parser.add_argument("--marking", default="", help="Marking type.  Default: %(default)s")
parser.add_argument("--model-name", default=None, help="New model name.  Default: Based on the result.csv file name.")
parser.add_argument("--output-columns", default=[], nargs="*", help="Output column names.")
parser.add_argument("--project-name", default="Parameter Image Project", help="New project name.  Default: %(default)s")
parser.add_argument("--strip", type=int, default=None, help="Optionally strip N prefix directories from the stored URIs.")
parser.add_argument("input", help="Input CSV file")
arguments = parser.parse_args()

###########################################################################################
# Parse the input CSV file.

rows = [[value.strip() for value in row.split(",")] for row in open(arguments.input, "r")]
columns = []
for column in zip(*rows):
  try:
    columns.append((column[0], numpy.array(column[1:], dtype="float64")))
  except:
    columns.append((column[0], numpy.array(column[1:])))

###########################################################################################
# Identify which columns are image columns ...
if arguments.auto_image_columns:
  expression = re.compile("file://")
  search = numpy.vectorize(lambda x:bool(expression.search(x)))
  for name, column in columns:
    if column.dtype != "float64":
      if numpy.any(search(column)):
        arguments.image_columns.append(name)

###########################################################################################
# Optionally replace image URI hostnames ...

if arguments.image_hostname is not None:
  for name, column in columns:
    if name in arguments.image_columns and column.dtype != "float64":
      for index, uri in enumerate(column):
        uri = urlparse.urlparse(uri)
        hostname = uri.netloc if arguments.image_hostname is None else arguments.image_hostname
        path = uri.path
        uri = "file://%s%s" % (hostname, path)
        column[index] = uri

###########################################################################################
# Optionally strip prefix directories from the image URIs and replace them  ...

if arguments.strip is not None:
  for name, column in columns:
    if name in arguments.image_columns and column.dtype != "float64":
      for index, uri in enumerate(column):
        uri = urlparse.urlparse(uri)
        hostname = uri.netloc
        path = os.path.join(*([os.path.abspath(os.path.dirname(arguments.input))] + uri.path.split(os.sep)[arguments.strip + 1:]))
        uri = "file://%s%s" % (hostname, path)
        column[index] = uri

###########################################################################################
# Ingest the data into Slycat.

# Setup a connection to the Slycat Web Server.
connection = slycat.web.client.connect(arguments)

# Create a new project to contain our model.
pid = connection.find_or_create_project(arguments.project_name)

# Create the new, empty model.
mid = connection.create_model(pid, "parameter-image", arguments.model_name if arguments.model_name is not None else arguments.input, arguments.marking)

# Upload our observations as "data-table".
connection.start_array_set(mid, "data-table")

# Start our single "data-table" array.
attributes = [("%s" % name, "float64" if column.dtype == "float64" else "string") for name, column in columns]
dimensions = [("row", "int64", 0, len(rows)-1)]
connection.start_array(mid, "data-table", 0, attributes, dimensions)

# Upload each column into the array.
for index, (name, column) in enumerate(columns):
  connection.store_array_set_data(mid, "data-table", 0, index, data=column)

# Store the remaining parameters.
connection.store_parameter(mid, "input-columns", [index for index, (name, column) in enumerate(columns) if name in arguments.input_columns and column.dtype == "float64"])
connection.store_parameter(mid, "output-columns", [index for index, (name, column) in enumerate(columns) if name in arguments.output_columns and column.dtype == "float64"])
connection.store_parameter(mid, "image-columns", [index for index, (name, column) in enumerate(columns) if name in arguments.image_columns and column.dtype != "float64"])

# Signal that we're done uploading data to the model.  This lets Slycat Web
# Server know that it can start computation.
connection.finish_model(mid)
# Wait until the model is ready.
connection.join_model(mid)

# Supply the user with a direct link to the new model.
slycat.web.client.log.info("Your new model is located at %s/models/%s" % (arguments.host, mid))
