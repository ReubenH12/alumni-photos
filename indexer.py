from pathlib import Path
import glob
import json

filesystem = dict()

for year in Path("images/Years").iterdir():
    # filesystem[year.name] = [f.name for f in Path(f"images/Years{year.name}/").glob("*.jpg")]
    path = "images/Years/" + year.name
    filesystem[year.name] = glob.glob("*.jpg", root_dir=path) + glob.glob("*.JPEG", root_dir=path)

for key in filesystem:
    print(filesystem[key])
    print("\n")

filesystemJSON = json.dumps(filesystem)

print(filesystemJSON)

with open("indexedPhotos.json", "w") as index:
    index.write(filesystemJSON)