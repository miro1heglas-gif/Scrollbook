# Poskladá project/Main.dc.html z častí v tomto priečinku.
# Použitie (z koreňa repozitára):  python3 zdroje/aplikacia/build.py
import os, re, json, datetime
base = os.path.dirname(os.path.abspath(__file__))
out_path = os.path.join(base, '..', '..', 'project', 'Main.dc.html')
rd = lambda n: open(os.path.join(base, n), encoding='utf-8').read()

tpl = rd('tplA.html') + rd('tplB.html')
tpl = tpl.replace('<span>Playlist čaká na schválenie, preto sa nedá upravovať. Ak chcete niečo zmeniť, vezmite ho späť.</span>', '<span>{{ lockT }}</span>')
css = rd('css.html')
js = ''.join(rd(f) for f in ['js1.js', 'jsR1.js', 'jsR2.js'])
# verzia: číslo je v zdroje/verzia.txt, čas zostavenia sa doplní sám (podľa neho telefón spozná novšiu verziu)
VER = open(os.path.join(base, '..', 'verzia.txt'), encoding='utf-8').read().split()[0]
try:
    from zoneinfo import ZoneInfo
    _now = datetime.datetime.now(ZoneInfo('Europe/Bratislava'))
except Exception:
    _now = datetime.datetime.now()
BUILD = os.environ.get('WZ_BUILD') or _now.strftime('%Y%m%d-%H%M')
js = js.replace('__VER__', VER).replace('__BUILD__', BUILD)
head = '''<!doctype html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="wz-build" content="''' + BUILD + '''">
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
proj = os.path.join(base, '..', '..', 'project')
wr = lambda p, s: open(p, 'w', encoding='utf-8', newline='').write(s)
wr(os.path.join(proj, 'ver.js'), rd('ver.js').replace('__VER__', VER).replace('__BUILD__', BUILD))
wr(os.path.join(proj, 'version.json'), json.dumps({'v': VER, 'b': BUILD}) + '\n')
# i18n.js má kontrolu verzie na konci – prepíše sa aj tam, aby všetky súbory niesli rovnaký čas zostavenia
i18p = os.path.join(proj, 'i18n.js')
if os.path.exists(i18p):
    i18 = open(i18p, encoding='utf-8').read(); mk = '/* Info Designer – kontrola novej verzie'
    wr(i18p, (i18[:i18.index(mk)].rstrip('\n') if mk in i18 else i18.rstrip('\n')) + '\n' + open(os.path.join(proj, 'ver.js'), encoding='utf-8').read())
ip = os.path.join(base, '..', '..', 'index.html')
ix = open(ip, encoding='utf-8').read()
ix = re.sub(r'<meta name="wz-build" content="[^"]*">', '<meta name="wz-build" content="' + BUILD + '">', ix)
ix = re.sub(r'<span id="ver">[^<]*</span>', '<span id="ver">' + VER + ' · ' + BUILD[6:8].lstrip('0') + '. ' + BUILD[4:6].lstrip('0') + '. ' + BUILD[0:4] + ' ' + BUILD[9:11] + ':' + BUILD[11:13] + '</span>', ix)
wr(ip, ix)
print('verzia', VER, 'zostavenie', BUILD)
