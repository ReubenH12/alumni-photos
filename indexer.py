from pathlib import Path
import glob
import json

filesystem = dict()

for year in Path("R:\\Reuben\\alumni-photos").iterdir():
    path = "R:\\Reuben\\alumni-photos\\" + year.name
    filesystem[year.name] = glob.glob("*.*", root_dir=path)

filesystemJSON = json.dumps(filesystem)

with open("js/photoIndex.js", "w") as index:
    index.write("const fileStructure = ")
    index.write(filesystemJSON)