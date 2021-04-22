#!/bin/bash

TOKEN="anandan"
REMOTE="wss://taglist-mirror.herokuapp.com"
LOCALPORT=80

inlets client --url=$REMOTE --upstream=http://127.0.0.1:$LOCALPORT --token $TOKEN
