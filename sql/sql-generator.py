import json
from pprint import pprint 

JSON_DATA_FILE = './states.json';

with open(JSON_DATA_FILE) as f:
    data = json.load(f)


template = "INSERT INTO geom (state, shape) VALUES ('#$#', ST_POLYGONFROMTEXT('POLYGON(($#$))'));";

for i in data:
    query = template;
    state_name = i['state'].upper();
    query = query.replace('#$#', state_name);
    borders = i['border'];
    

    ## TODO: inner list comprehensions
    co_ordinates = [];
    for b in borders:
        position = ' '.join( str(x) for x in b);
        co_ordinates.append(position);
    
    params = str(','.join(co_ordinates));
    query = query.replace("$#$", params);
    print(query);

    
    


