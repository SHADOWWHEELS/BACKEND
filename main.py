from asyncio.windows_events import NULL
import sys
import os
import cv2
from cv2 import IMREAD_GRAYSCALE
import imutils
import pytesseract

pytesseract.pytesseract.tesseract_cmd = 'C:\Program Files\Tesseract-OCR\\tesseract'
image = cv2.imread(sys.argv[1])
image = imutils.resize(image, width = 400)

greyImage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

greyImage = cv2.bilateralFilter(greyImage, 11, 17, 17)

edged = cv2.Canny(greyImage, 30, 200) 

cnts,new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
image1=image.copy()
cv2.drawContours(image1,cnts,-1,(0,255,0),3)

cnts = sorted(cnts, key = cv2.contourArea, reverse = True) [:30]
screenCnt = None
image2 = image.copy()
cv2.drawContours(image2,cnts,-1,(0,255,0),3)


flag = 0;
i=7
for c in cnts:
        perimeter = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.018 * perimeter, True)
        if len(approx) == 4: 
                screenCnt = approx
                x,y,w,h = cv2.boundingRect(c) 
                new_img=image[y:y+h,x:x+w]
                cv2.imwrite(sys.argv[1].split(".")[0] + "NAMEPLATE" + "." + sys.argv[1].split(".")[1], new_img)
                i+=1
                flag = 1
                break

        # cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 3)
if flag == 1:
        Cropped_loc = sys.argv[1].split(".")[0] + "NAMEPLATE" + "." + sys.argv[1].split(".")[1]
        plate = pytesseract.image_to_string(Cropped_loc, lang='eng')
        os.remove(Cropped_loc);
        print(plate)