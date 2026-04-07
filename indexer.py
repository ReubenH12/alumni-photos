from pathlib import Path
import glob
import json

filesystem = dict()

for year in Path("images/Years").iterdir():
    path = "images/Years/" + year.name
    filesystem[year.name] = glob.glob("*.*", root_dir=path)

for key in filesystem:
    print(filesystem[key])
    print("\n")

filesystemJSON = json.dumps(filesystem)

print(filesystemJSON)

with open("js/photoIndex.js", "w") as index:
    index.write("const fileStructure = ")
    index.write(filesystemJSON)