import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.mapmit
collection = db.locations

with open('locations.txt') as f:
    for line in f.readlines():
    	words = line.strip().split(',')
        collection.insert({'name': words[0].strip(), 'lat': float(words[1]), 'lng': float(words[2])})