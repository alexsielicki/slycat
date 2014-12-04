# Copyright 2013, Sandia Corporation. Under the terms of Contract
# DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain
# rights in this software.

import cherrypy
import hashlib
import os
import threading

class Manager(object):
  """Manages resource bundles."""
  def __init__(self):
    self._bundles = {}
    self._bundle_lock = threading.Lock()
    self._files = {}
    self._file_lock = threading.Lock()

  def add_bundle(self, content_type, paths):
    with self._bundle_lock:
      cherrypy.log.error("Bundling")

      key_hash = hashlib.md5()
      key_hash.update(content_type)
      content = ""

      for path in paths:
        if not os.path.isabs(path):
          path = os.path.join(cherrypy.tree.apps[""].config["slycat"]["root-path"], path)
        cherrypy.log.error("  %s" % path)
        cherrypy.engine.autoreload.files.add(path)
        resource_content = open(path, "rb").read()
        key_hash.update(resource_content)
        content += resource_content + "\n\n"

      key = key_hash.hexdigest()
      self._bundles[key] = (content_type, content)
      cherrypy.log.error("  as %s" % key)

      return key

  def add_directory(self, directory_path, resource_path):
    with self._file_lock:
      if not os.path.isabs(directory_path):
        directory_path = os.path.join(cherrypy.tree.apps[""].config["slycat"]["root-path"], directory_path)
      for file_path in os.listdir(directory_path):
        resource_file_path = os.path.join(resource_path, file_path)
        file_path = os.path.join(directory_path, file_path)
        cherrypy.log.error("Registering resource %s -> %s" % (resource_file_path, file_path))
        self._files[resource_file_path] = file_path

  def add_file(self, file_path, resource_path):
    with self._file_lock:
      if not os.path.isabs(file_path):
        file_path = os.path.join(cherrypy.tree.apps[""].config["slycat"]["root-path"], file_path)
        cherrypy.log.error("Registering resource %s -> %s" % (resource_path, file_path))
        self._files[resource_path] = file_path

  @property
  def bundles(self):
    return self._bundles

  @property
  def files(self):
    return self._files

manager = Manager()