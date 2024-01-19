import sys
from PIL import Image, ImageChops

database = open("database.txt","r")
userImage = Image.open("img/" + sys.argv[1])

isCounterfeit = False
for line in database.readlines():
    img1 = Image.open("img/" + line[:len(line) - 1])
    diff = ImageChops.difference(img1, userImage)
    img1.close()

    if diff.getbbox() == None:
        isCounterfeit = True

database.close()

if not isCounterfeit:
    database = open("database.txt", "a")
    database.write(sys.argv[1] + "\n")
    database.close()

    print(0)
else:
    print(1)

sys.stdout.flush()
