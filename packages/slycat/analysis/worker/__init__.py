# Copyright 2013, Sandia Corporation. Under the terms of Contract
# DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain
# rights in this software.

import copy
import numpy

from slycat.analysis.worker.api import log, pyro_object, array, array_iterator, null_array_iterator, worker_chunks
import slycat.analysis.worker.aggregate
import slycat.analysis.worker.apply
import slycat.analysis.worker.build
import slycat.analysis.worker.chunk_map
import slycat.analysis.worker.csv_file
import slycat.analysis.worker.join
import slycat.analysis.worker.materialize
import slycat.analysis.worker.project
import slycat.analysis.worker.prn_file
import slycat.analysis.worker.redimension

class factory(pyro_object):
  """Top-level factory for worker objects."""
  def __init__(self):
    pyro_object.__init__(self)
  def shutdown(self):
    log.info("Client requested shutdown.")
    self._pyroDaemon.shutdown()
  def require_object(self, uri):
    """Lookup a Pyro URI, returning the corresponding Python object."""
    return self._pyroDaemon.objectsById[uri.asString().split(":")[1].split("@")[0]]
  def aggregate(self, worker_index, source, expressions):
    return self.pyro_register(slycat.analysis.worker.aggregate.aggregate_array(worker_index, self.require_object(source), expressions))
  def apply(self, worker_index, source, attributes):
    return self.pyro_register(slycat.analysis.worker.apply.apply_array(worker_index, self.require_object(source), attributes))
  def array(self, worker_index, initializer, attribute):
    return self.pyro_register(array_array(worker_index, initializer, attribute))
  def attributes(self, worker_index, source):
    return self.pyro_register(attributes_array(worker_index, self.require_object(source)))
  def build(self, worker_index, shape, chunk_sizes, attributes):
    return self.pyro_register(slycat.analysis.worker.build.build_array(worker_index, shape, chunk_sizes, attributes))
  def chunk_map(self, worker_index, source):
    return self.pyro_register(slycat.analysis.worker.chunk_map.chunk_map_array(worker_index, self.require_object(source)))
  def csv_file(self, worker_index, path, chunk_size, format):
    return self.pyro_register(slycat.analysis.worker.csv_file.csv_file_array(worker_index, path, chunk_size, format))
  def dimensions(self, worker_index, source):
    return self.pyro_register(dimensions_array(worker_index, self.require_object(source)))
  def join(self, worker_index, array1, array2):
    return self.pyro_register(slycat.analysis.worker.join.join_array(worker_index, self.require_object(array1), self.require_object(array2)))
  def materialize(self, worker_index, source):
    return self.pyro_register(slycat.analysis.worker.materialize.materialize_array(worker_index, self.require_object(source)))
  def prn_file(self, worker_index, path, chunk_size):
    return self.pyro_register(slycat.analysis.worker.prn_file.prn_file_array(worker_index, path, chunk_size))
  def project(self, worker_index, source, attributes):
    return self.pyro_register(slycat.analysis.worker.project.project_array(worker_index, self.require_object(source), attributes))
  def random(self, worker_index, shape, chunk_sizes, seed, attributes):
    return self.pyro_register(random_array(worker_index, shape, chunk_sizes, seed, attributes))
  def rename(self, worker_index, source, attributes, dimensions):
    return self.pyro_register(rename_array(worker_index, self.require_object(source), attributes, dimensions))
  def redimension(self, worker_index, source, dimensions, attributes):
    return self.pyro_register(slycat.analysis.worker.redimension.redimension_array(worker_index, self.require_object(source), dimensions, attributes))
  def zeros(self, worker_index, shape, chunk_sizes, attributes):
    return self.pyro_register(zeros_array(worker_index, shape, chunk_sizes, attributes))

class array_array(array):
  def __init__(self, worker_index, initializer, attribute):
    array.__init__(self, worker_index)
    self.chunk = numpy.array(initializer, dtype=attribute["type"])
    self.attribute = attribute
  def dimensions(self):
    return [{"name":"d%s" % index, "type":"int64", "begin":0, "end":size, "chunk-size":size} for index, size in enumerate(self.chunk.shape)]
  def attributes(self):
    return [self.attribute]
  def iterator(self):
    if 0 == self.worker_index:
      return self.pyro_register(array_array_iterator(self))
    else:
      return self.pyro_register(null_array_iterator(self))

class array_array_iterator(array_iterator):
  def __init__(self, owner):
    array_iterator.__init__(self, owner)
    self.iterations = 0
  def next(self):
    if self.iterations:
      raise StopIteration()
    self.iterations += 1
  def coordinates(self):
    return numpy.array([0], dtype="int64")
  def shape(self):
    return self.owner.chunk.shape
  def values(self, attribute):
    return self.owner.chunk

class attributes_array(array):
  def __init__(self, worker_index, source):
    array.__init__(self, worker_index)
    self.source_attributes = source.attributes()
  def dimensions(self):
    return [{"name":"i", "type":"int64", "begin":0, "end":len(self.source_attributes), "chunk-size":len(self.source_attributes)}]
  def attributes(self):
    return [{"name":"name", "type":"string"}, {"name":"type", "type":"string"}]
  def iterator(self):
    if 0 == self.worker_index:
      return self.pyro_register(attributes_array_iterator(self))
    else:
      return self.pyro_register(null_array_iterator(self))

class attributes_array_iterator(array_iterator):
  def __init__(self, owner):
    array_iterator.__init__(self, owner)
    self.iterations = 0
  def next(self):
    if self.iterations:
      raise StopIteration()
    self.iterations += 1
  def coordinates(self):
    return numpy.array([0], dtype="int64")
  def shape(self):
    return numpy.array([len(self.owner.source_attributes)], dtype="int64")
  def values(self, attribute):
    if attribute == 0:
      return numpy.array([attribute["name"] for attribute in self.owner.source_attributes], dtype="string")
    elif attribute == 1:
      return numpy.array([attribute["type"] for attribute in self.owner.source_attributes], dtype="string")

class rename_array(array):
  def __init__(self, worker_index, source, attribute_map, dimension_map):
    array.__init__(self, worker_index)
    self.source = source
    self.attribute_map = attribute_map
    self.dimension_map = dimension_map
  def dimensions(self):
    results = []
    for index, dimension in enumerate(self.source.dimensions()):
      name = dimension["name"]
      type = dimension["type"]
      begin = dimension["begin"]
      end = dimension["end"]
      chunk_size = dimension["chunk-size"]
      if index in self.dimension_map:
        name = self.dimension_map[index]
      elif name in self.dimension_map:
        name = self.dimension_map[name]
      results.append({"name":name, "type":type, "begin":begin, "end":end, "chunk-size":chunk_size})
    return results
  def attributes(self):
    results = []
    for index, attribute in enumerate(self.source.attributes()):
      name = attribute["name"]
      type = attribute["type"]
      if index in self.attribute_map:
        name = self.attribute_map[index]
      elif name in self.attribute_map:
        name = self.attribute_map[name]
      results.append({"name":name, "type":type})
    return results
  def iterator(self):
    return self.source.iterator()

class dimensions_array(array):
  def __init__(self, worker_index, source):
    array.__init__(self, worker_index)
    self.source_dimensions = source.dimensions()
  def dimensions(self):
    return [{"name":"i", "type":"int64", "begin":0, "end":len(self.source_dimensions), "chunk-size":len(self.source_dimensions)}]
  def attributes(self):
    return [{"name":"name", "type":"string"}, {"name":"type", "type":"string"}, {"name":"begin", "type":"int64"}, {"name":"end", "type":"int64"}, {"name":"chunk-size", "type":"int64"}]
  def iterator(self):
    if self.worker_index == 0:
      return self.pyro_register(dimensions_array_iterator(self))
    else:
      return self.pyro_register(null_array_iterator(self))

class dimensions_array_iterator(array_iterator):
  def __init__(self, owner):
    array_iterator.__init__(self, owner)
    self.iterations = 0
  def next(self):
    if self.iterations:
      raise StopIteration()
    self.iterations += 1
  def coordinates(self):
    return numpy.array([0], dtype="int64")
  def shape(self):
    return numpy.array([len(self.owner.source_dimensions)], dtype="int64")
  def values(self, attribute):
    if attribute == 0:
      return numpy.array([dimension["name"] for dimension in self.owner.source_dimensions], dtype="string")
    elif attribute == 1:
      return numpy.array([dimension["type"] for dimension in self.owner.source_dimensions], dtype="string")
    elif attribute == 2:
      return numpy.array([dimension["begin"] for dimension in self.owner.source_dimensions], dtype="int64")
    elif attribute == 3:
      return numpy.array([dimension["end"] for dimension in self.owner.source_dimensions], dtype="int64")
    elif attribute == 4:
      return numpy.array([dimension["chunk-size"] for dimension in self.owner.source_dimensions], dtype="int64")

class random_array(array):
  def __init__(self, worker_index, shape, chunk_sizes, seed, attributes):
    array.__init__(self, worker_index)
    self.shape = shape
    self.chunk_sizes = chunk_sizes
    self.seed = seed
    self._attributes = attributes
  def dimensions(self):
    return [{"name":"d%s" % index, "type":"int64", "begin":0, "end":dimension, "chunk-size":chunk_size} for index, (dimension, chunk_size) in enumerate(zip(self.shape, self.chunk_sizes))]
  def attributes(self):
    return self._attributes
  def iterator(self):
    return self.pyro_register(random_array_iterator(self))

class random_array_iterator(array_iterator):
  def __init__(self, owner):
    array_iterator.__init__(self, owner)
    self.iterator = worker_chunks(owner.shape, owner.chunk_sizes, len(owner.siblings))
    self.generator = numpy.random.RandomState()
    self.generator.seed(owner.seed + owner.worker_index)
  def next(self):
    while True:
      chunk_index, worker_index, begin, end = self.iterator.next()
      if worker_index == self.owner.worker_index:
        self._coordinates = begin
        self._shape = end - begin
        self._values = [self.generator.uniform(size=self._shape).astype(attribute["type"]) for attribute in self.owner._attributes]
        break
  def coordinates(self):
    return self._coordinates
  def shape(self):
    return self._shape
  def values(self, index):
    return self._values[index]

class zeros_array(array):
  def __init__(self, worker_index, shape, chunk_sizes, attributes):
    array.__init__(self, worker_index)
    self.shape = shape
    self.chunk_sizes = chunk_sizes
    self._attributes = attributes
  def dimensions(self):
    return [{"name":"d%s" % index, "type":"int64", "begin":0, "end":dimension, "chunk-size":chunk_size} for index, (dimension, chunk_size) in enumerate(zip(self.shape, self.chunk_sizes))]
  def attributes(self):
    return self._attributes
  def iterator(self):
    return self.pyro_register(zeros_array_iterator(self))

class zeros_array_iterator(array_iterator):
  def __init__(self, owner):
    array_iterator.__init__(self, owner)
    self.iterator = worker_chunks(owner.shape, owner.chunk_sizes, len(owner.siblings))
  def next(self):
    while True:
      chunk_index, worker_index, begin, end = self.iterator.next()
      if worker_index == self.owner.worker_index:
        self._coordinates = begin
        self._shape = end - begin
        break
  def coordinates(self):
    return self._coordinates
  def shape(self):
    return self._shape
  def values(self, index):
    return numpy.zeros(self._shape, dtype=self.owner._attributes[index]["type"])

