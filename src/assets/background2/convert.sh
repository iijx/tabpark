#!/bin/bash
for f in *.heic
do
    sips -s format png "$f" --out "./png-dist/${f%.heic}.png"
    sips -s format jpeg "$f" --out "./jpeg-dist/${f%}.jpeg"
    sips -s format webp "$f" --out "./webp-dist/${f%}.webp"
done
