# Python Pillow Image Invert

本文主要是利用Python的第三方库Pillow，实现单通道灰度图像的颜色翻转功能。


```python
    # -*- encoding:utf-8 -*-
    import os
    import sys
    from PIL import Image
    from PIL import ImageOps


    def img_gray_invert(img_path):
        """
        invert input image.
        """
        if not os.path.isfile(img_path):
            print "Error for input file path."
            return
        image = Image.open(img_path)
        image = image.convert("L")
        inverted_image = ImageOps.invert(image)
        return inverted_image


    if __name__ == '__main__':
        argv = sys.argv
        if len(argv) != 3:
            print """Example:
            python gray_invert.py test/htc.png test/htc_inv.png
            """
        else:
            img_file_path = argv[1]
            invert_image = img_gray_invert(img_file_path)
            img_file_out = argv[2]
            invert_image.save(img_file_out)
```



### 参考

[1] [How to invert colors of image with PIL (Python-Imaging)?](https://stackoverflow.com/questions/2498875/how-to-invert-colors-of-image-with-pil-python-imaging)
```