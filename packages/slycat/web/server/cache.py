# Copyright 2013, Sandia Corporation. Under the terms of Contract
# DE-AC04-94AL85000 with Sandia Corporation, the U.S. Government retains certain
# rights in this software.
import os
import hashlib
import cPickle
import time
import base64
import inspect
import Queue
import threading

__all__ = ["CacheError", "Cache"]

class CacheError(Exception):
  """
  generic cached object error
  """
  pass

class TimeError(CacheError):
  """
  time error used for when the time is in the wrong format
  """
  pass

class LifetimeError(CacheError):
  """
  extention of the cached error where the lifetime of the cache object has expired
  """
  pass

class CachedObjectWrapper(object):
  """
  class used to wrap any object placed in the cache
  """
  def __init__(self, value, expiration=None):
    """
    creates a cached object with a cached items and an expiration
    :param value: item being wrapped
    :param expiration: time until the item is expire
    :return: not used
    """
    self._value = value
    self._expiration = expiration

  @property
  def value(self):
    """
    returns the object that is being wraped by the cache
    :return: object
    """
    return self._value

  @property
  def expiration(self):
    """
    return the expiration time for the cached object, could return none
    if there is no expiration
    :return: experation object
    """
    return self._expiration

  def expired(self):
    """
    return true or false as to weather the object is expired or not
    returns false if none
    :return: boolean
    """
    if self.expiration is None:
      expired = False
    else:
      expired = (self.expiration < time.time())
    return expired

class Cache(object):
  """
  decorator class used to cache
  """

  def __init__(self, fs_cache_path, **kwargs):
    """
    takes a filepath and and the following time stamps
       - years (31,556,900 seconds per year)
       - months (2,629,740 seconds per month)
       - weeks (604,800 seconds per week)
       - days (86,400 seconds per day)
       - hours (3600 seconds per hour)
       - minutes (60 seconds per minute)
       - seconds
       - None
    :param path: path as a string to the
    :param kwargs: time stamp
    """
    if kwargs:
      self._init_expire_time = self.to_seconds(**kwargs)
      # we need a time greater than 0
      if self._init_expire_time <= 0:
        msg = "Lifetime (%s seconds) is 0 or less." % self._init_expire_time
        raise LifetimeError, msg
    else:
      # no expiration time
      self._init_expire_time = None
    # set up an in memory cache
    self._loaded = {}
    # set path for file system
    self._fs_cache_path = os.path.abspath(fs_cache_path)
    if not os.path.exists(self._fs_cache_path):
      os.makedirs(self._fs_cache_path)

  def __getitem__(self, key):
    """
    get the item from the cache
    :param key: hashed key for item in cache
    :return: value associate with key
    """
    if key in self:
      digest = self.digest_hash(key)
      value = self._loaded[digest].value
    else:
      msg = "key not found in cache: '%s'" % key
      raise KeyError(msg)
    return value

  def __setitem__(self, key, value):
    """
    set the key:value in the cache. checks if it already in
    the cache and throws CacheError if found
    :param key: hashed representation of the function
    :param value: stored result from the function
    :return: not used
    """
    digest_hash = self.digest_hash(key)
    path = os.path.join(self._fs_cache_path, digest_hash)
    #check if item exist
    if (digest_hash in self._loaded) or os.path.exists(path):
      tmplt = ("Object for key `%s` exists\n." +
               "Remove the old one before setting the new object.")
      msg = tmplt % str(key)
      raise CacheError, msg
    # item does not exist so lets create one
    cached_contents = CachedObjectWrapper(value, expiration=self.cached_item_expire_time())
    Cache.write(cached_contents, path)
    self._loaded[digest_hash] = cached_contents

  def __delitem__(self, key):
    """
    Removes the object keyed by `k` from memory
    but not from the filesystem. To remove it from both the memory,
    and the filesystem, use `expire`.
    Synonymous with :func:`FSCache.unload`.
    """
    digest = self.digest_hash(key)
    if digest in self._loaded:
      del(self._loaded[digest])
    else:
      msg = "Object for key `%s` has not been loaded" % str(key)
      raise CacheError, msg

  def __contains__(self, item):
    """

    :param item:
    :return:
    """
    digest = self.digest_hash(item)
    if digest in self._loaded:
      contents = self._loaded[digest]
      isin = True
    else:
      try:
        contents = self._load(digest, item)
        isin = True
      except CacheError:
        isin = False
    if isin:
      if contents.expired():
        self.expire(item)
        isin = False
    return isin

  def __call__(self, f):
    m = inspect.getmembers(f)
    try:
      fid = (m.func_name, inspect.getargspec(f))
    except (AttributeError, TypeError):
      fid = (f.__name__, repr(type(f)))

    def _f(*args, **kwargs):
      k = (fid, args, kwargs)
      if k in self:
        result = self[k]
      else:
        result = f(*args, **kwargs)
        self[k] = result
      return result
    return _f

  def expire(self, key):
    """
    Permanently removes the, both in the memory and in the filesystem.
    """
    self._remove(key)
    del self[key]

  def _remove(self, key):
    """
    Removes the cache item keyed by `key` from the file system.
    """
    digest = self.digest_hash(key)
    path = os.path.join(self._fs_cache_path, digest)
    if os.path.exists(path):
      os.remove(path)
    else:
      msg = "No object for key `%s` stored." % str(key)
      raise CacheError, msg

  def load(self, key):
    """
    Causes the object keyed by `k` to be loaded from the
    file system and returned. It therefore causes this object
    to reside in memory.
    """
    return self[key]

  @staticmethod
  def read(filename):
    """
    Helper function that simply pickle loads the first object
    from the file named by `filename`.
    """
    with open(filename, 'rb') as loaded_file:
      loaded_obj = cPickle.load(loaded_file)
    return loaded_obj

  def _load(self, digest, k):
    """
    Loads the :class:`CacheObject` keyed by `k` from the
    file system (residing in a file named by `digest`)
    and returns the object.
    This method is part of the implementation of :class:`FSCache`,
    so don't use it as part of the API.
    """
    path = os.path.join(self._fs_cache_path , digest)
    print path
    if os.path.exists(path):
      contents = Cache.read(path)
    else:
      msg = "Object for key `%s` does not exist." % (k,)
      raise CacheError, msg
    self._loaded[digest] = contents
    return contents

  def cached_item_expire_time(self):
    """
    Returns an expiry for the cache in seconds as if the start
    of the expiration period were the moment at which this
    the method is called.
    >>> import time
    >>> c = Cache('cache/dir', seconds=60)
    >>> round(c.cached_item_expire_time() - time.time(), 3)
    60.0
    """
    if self._init_expire_time is None:
      x = None
    else:
      x = self._init_expire_time + time.time()
    return x

  def digest_hash(self, k):
    """
    Creates a digest suitable for use within an :class:`phyles.FSCache`
    object from the key object `k`.
    >>> adict = {'a' : {'b':1}, 'f': []}
    >>> digest_hash(adict)
    'a2VKynHgDrUIm17r6BQ5QcA5XVmqpNBmiKbZ9kTu0A'
    """
    s = cPickle.dumps(k)
    h = hashlib.sha256(s).digest()
    b64 = base64.urlsafe_b64encode(h)[:-2]
    return b64.replace('-', '=')

  @staticmethod
  def write(obj, filename):
    """
    writes and object to the selected file path
    """
    with open(filename, 'wb') as cache_file:
      cPickle.dump(obj, cache_file, cPickle.HIGHEST_PROTOCOL)

  @staticmethod
  def years_to_seconds(years):
    """
    Converts years to seconds.
    :return: float
    """
    return 3.15569e7 * years

  @staticmethod
  def months_to_seconds(months):
    """
    Converts months to seconds.
    :return: float
    """
    return 2.62974e6 * months

  @staticmethod
  def weeks_to_seconds(weeks):
    """
    Converts weeks to seconds.
    :return: float
    """
    return 604800.0 * weeks

  @staticmethod
  def days_to_seconds(days):
    """
    Converts days to seconds.
    :return: float
    """
    return 86400.0 * days

  @staticmethod
  def hours_to_seconds(hours):
    """
    Converts hours to seconds.
    :return: float
    """
    return 3600.0 * hours

  @staticmethod
  def minutes_to_seconds(minutes):
    """
    Converts minutes to seconds.
    :return: float
    """
    return 60.0 * minutes

  @staticmethod
  def seconds_to_seconds(seconds):
    """
    Converts seconds to seconds as a float.
    :return: float
    """
    return float(seconds)

  @staticmethod
  def to_seconds(**kwargs):
    """
    Converts keyword arguments to seconds.
    >>> Cache.to_seconds(seconds=1, minutes=1, hours=1, days=1, weeks=1, months=1, years=1)
    34881501.0
    >>> Cache.to_seconds(seconds=1, minutes=1)
    61
    :param kwargs:
        The the keyword arguments can have the following keys:
       - years (31,556,900 seconds per year)
       - months (2,629,740 seconds per month)
       - weeks (604,800 seconds per week)
       - days (86,400 seconds per day)
       - hours (3600 seconds per hour)
       - minutes (60 seconds per minute)
       - seconds
    :return: number of seconds as a float
    """
    time_converter_map = {"years": Cache.years_to_seconds,
                             "months": Cache.months_to_seconds,
                             "weeks": Cache.weeks_to_seconds,
                             "days": Cache.days_to_seconds,
                             "hours": Cache.hours_to_seconds,
                             "minutes": Cache.minutes_to_seconds,
                             "seconds": Cache.seconds_to_seconds}
    seconds = []
    for key, value in kwargs.items():
      if key in time_converter_map:
        seconds.append(time_converter_map[key](value))
      else:
        msg = "invalid time argument: %s" % key
        raise TimeError(msg)
    return sum(seconds)

if __name__ == "__main__":
  assert Cache.to_seconds(seconds=1, minutes=1) == 61, "time is not calculated correctly should be 61"
  assert Cache.to_seconds(seconds=1, minutes=1, hours=1, days=1, weeks=1, months=1, years=1) == 34881501.0, "time is not calculated correctly should be 34881501.0"
  try:
    Cache.to_seconds(not_a_key=1, minutes=1)
  except TimeError as e:
    assert e.message == 'invalid time argument: not_a_key', "did not catch bac key"
  cache = Cache("cache/dir", seconds=60)

  @cache
  def hello():
    import random
    print "\nnot cached"
    return "hello"+ str(random.random())

  print hello()
  # print cache[hello()]














