# Poskladá project/Main.dc.html z častí v tomto priečinku.
# Použitie (z koreňa repozitára):  python3 zdroje/aplikacia/build.py
import os
base = os.path.dirname(os.path.abspath(__file__))
out_path = os.path.join(base, '..', '..', 'project', 'Main.dc.html')
rd = lambda n: open(os.path.join(base, n), encoding='utf-8').read()

tpl = rd('tplA.html') + rd('tplB.html')
tpl = tpl.replace('<span>Playlist čaká na schválenie, preto sa nedá upravovať. Ak chcete niečo zmeniť, vezmite ho späť.</span>', '<span>{{ lockT }}</span>')
css = rd('css.html')
js = ''.join(rd(f) for f in ['js1.js', 'jsR1.js', 'jsR2.js'])
head = '''<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="./ikony/ikona.svg" type="image/svg+xml">
<link rel="icon" href="./ikony/ikona-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="./ikony/apple-touch-icon.png">
<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#F3F6F6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E1313" media="(prefers-color-scheme: dark)">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Info Designer">
<meta name="application-name" content="Info Designer">
<title>Info Designer – mobilná aplikácia</title>
<script src="./support.js"></script>
<script src="./i18n.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
''' + css + '''</helmet>
'''
out = head + tpl + '''</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":390,"height":844},"start":{"editor":"text","default":"home"}}'>
''' + js + '''</script>
</body>
</html>
'''
with open(out_path, 'w', encoding='utf-8', newline='') as f:
    f.write(out)
print('Main.dc.html:', len(out), 'znakov')
