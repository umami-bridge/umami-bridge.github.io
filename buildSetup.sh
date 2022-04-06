cp -rf build/_next/static build/static
sed 's/\/_next/./g' build/index.html > build/temp.html
rm -rf build/index.html
mv build/temp.html build/index.html