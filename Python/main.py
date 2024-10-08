import sys
import cv2
from cv2 import IMREAD_GRAYSCALE
import imutils
import pytesseract

pytesseract.pytesseract.tesseract_cmd = 'C:\Program Files\Tesseract-OCR\\tesseract'
image = cv2.imread(sys.argv[1])
image = imutils.resize(image, width = 400)

# cv2.imshow("Original Image", image)
# cv2.waitKey(0)

greyImage = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# cv2.imshow("GRAY IMAGE", greyImage)
# cv2.waitKey(0)

greyImage = cv2.bilateralFilter(greyImage, 11, 17, 17)
# cv2.imshow("FILTERED GRAY IMAGE", greyImage)
# cv2.imwrite("greyImage.png", greyImage)
# cv2.waitKey(0)

edged = cv2.Canny(greyImage, 30, 200) 
# cv2.imshow("edged image", edged)
# cv2.imwrite("greyEdged.png", edged)
# cv2.waitKey(0)

cnts,new = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
image1=image.copy()
cv2.drawContours(image1,cnts,-1,(0,255,0),3)
# cv2.imshow("contours",image1)
# cv2.imwrite("image1.png", image1)
# cv2.waitKey(0)

cnts = sorted(cnts, key = cv2.contourArea, reverse = True) [:30]
screenCnt = None
image2 = image.copy()
cv2.drawContours(image2,cnts,-1,(0,255,0),3)
# cv2.imshow("Top 30 contours",image2)
# cv2.imwrite("image2.png", image2)
# cv2.waitKey(0)


i=7
for c in cnts:
        perimeter = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.018 * perimeter, True)
        if len(approx) == 4: 
                screenCnt = approx
                x,y,w,h = cv2.boundingRect(c) 
                new_img=image[y:y+h,x:x+w]
                cv2.imwrite('./'+str(i)+'.png',new_img)
                i+=1
                break

cv2.drawContours(image, [screenCnt], -1, (0, 255, 0), 3)
# cv2.waitKey(0)

Cropped_loc = "nameplate" + sys.argv[1]
# cv2.imshow("cropped", cv2.imread(Cropped_loc))
plate = pytesseract.image_to_string(Cropped_loc, lang='eng')
print(plate)
# cv2.waitKey(0)
# cv2.destroyAllWindows()