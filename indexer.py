from pathlib import Path
import glob
import json
import re

filesystem = dict()

for year in Path("R:\\Reuben\\alumni-photos").iterdir():
    path = "R:\\Reuben\\alumni-photos\\" + year.name
    filesystem[year.name] = glob.glob("*.*", root_dir=path)
    # Reorders year to put Year 9s at the start
    if int(year.name) > 2002:
        year9s = list()
        for fileName in filesystem[year.name]:
            matches = re.search("\\d{4} 9([a-zA-Z]{3}|[a-zA-Z]{2}).*\\.jpg", fileName)
            if matches:
                year9s.append(fileName)
        for year9 in year9s:
            filesystem[year.name].remove(year9)
        filesystem[year.name] = year9s + filesystem[year.name]

filesystemJSON = json.dumps(filesystem)

with open("js/photoIndex.js", "w") as index:
    index.write("const fileStructure = ")
    index.write(filesystemJSON)
